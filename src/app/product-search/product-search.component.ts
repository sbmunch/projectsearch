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

  products: Product[];
  
  ngOnInit(): void {
  }
  
  insertProducts(): void {
	this.productService.getProducts()
	.pipe(
//	debounceTime(150), //debounce should not be here, it should be on text input.
	map(content => content
	.filter(item => item.title.includes(this.searchString))
	)  // working!
	)
	.subscribe(data => {
		this.products = data;
	})
  }
  
  // pass observable through a new function checking the search term(s), and pass that as input to the ngfor
//  obsFilterSerach(inputObs: Observable<Product[]>): Observable<Product[]> {
//	  return inputObs.pipe(
//	  map(content => content.filter(item => item.title.includes(this.searchString)))
//	  );
//  }
  
  selectedProduct: Product;

  onClickedProduct(product: Product): void {
	this.selectedProduct = product;
  }
  
  searchStringCopy: Subject<string> = new Subject<string>();
  searchString: string;
  
  productSearch(searchinput:string): void {
	//console.log(this.searchString);
	
	this.searchStringCopy.next(searchinput);
	
	if (this.products) {
		
		this.searchStringCopy
		.pipe(
		debounceTime(150)
		,distinctUntilChanged()
		)
		.subscribe(model => {
			this.searchString = model;
			this.insertProducts();
		});
		
	} else {
		this.insertProducts();
	}
	
  }
  
  pageNRp: number = 1;
  pageNrEventCatch($event) {
	  this.pageNRp = $event;
  }
  
}
