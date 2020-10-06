import { Component, OnInit } from '@angular/core';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import {Product} from "../../assets/products";
import {ProductServiceService} from '../product-service.service'; 

@Component({
  selector: 'app-product-search',
  templateUrl: './product-search.component.html',
  styleUrls: ['./product-search.component.css']
})

@Injectable()
export class ProductSearchComponent implements OnInit {

  constructor(private productService : ProductServiceService) { }

  products: Product[];
  
  ngOnInit(): void {
	this.productService.getProducts().subscribe(products => {
      this.products = products.content;
    })
  }
  
  selectedProduct: Product;
  
  onClickedProduct(product: Product): void {
	this.selectedProduct = product;
	//console.log("clicked");
  }
}
