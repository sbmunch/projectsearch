import { Component, OnInit } from '@angular/core';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError, Subject } from 'rxjs';
import { catchError, retry, debounceTime, distinctUntilChanged, filter, map, switchMap } from 'rxjs/operators';
import {Product} from "../../assets/products";
import {ProductServiceService} from '../product-service.service';

@Component({
  selector: 'app-product-search',
  templateUrl: './product-search.component.html',
  styleUrls: ['./product-search.component.css']
})

@Injectable()
export class ProductSearchComponent implements OnInit {

  constructor(private productService : ProductServiceService) {  }

  products$: Observable<Product[]>;
  
  ngOnInit(): void {
	this.products$ = this.searchStringCopy
		.pipe(
			debounceTime(150)
			,distinctUntilChanged()
			,switchMap(model => {
				return this.productService.getProducts()
				.pipe(
					map(content => content
						.filter(item => this.titleTextcompare(item.title.toLowerCase(),model.toLowerCase())
						)
					)
				);
			}
			)
		);
  }
 
  titleTextcompare(title: string, inputstring: string): boolean {
	  if (!title && !inputstring) {
		  return true;
	  }
	  if (title && !inputstring) {
		  //return false; // do I want empty search to give all or none?
		  return true;
	  }
	  if (!title && inputstring) {
		  return false;
	  }
	  
	  var res: boolean = true;
	  for (let word of inputstring.split(" ")) {
		  if (!title.includes(word)) {
			res = false;
		  }
	  }
	  // alternative free text search might need to give a "score" based on title and text similarity.
	  return res;
	  
  }
  
  selectedProduct: Product;

  onClickedProduct(product: Product): void {
	this.selectedProduct = product;
  }
  
  searchStringCopy: Subject<string> = new Subject<string>();
  searchString: string;

  productSearch(searchinput:string): void {

	this.searchStringCopy.next(searchinput);
		
	//this.products$ = this.productService.getProducts()
	//.pipe(
	//	debounceTime(150)
	//	,distinctUntilChanged()
	//	,map(content => content
	//	.filter(item => this.titleTextcompare(item.title.toLowerCase(),searchinput.toLowerCase())
	//	)
	//	)
	//);

  }
  
  pageNRp: number = 1;
  pageNrEventCatch($event) {
	  this.pageNRp = $event;
  }
  
}
