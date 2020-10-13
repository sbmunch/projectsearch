import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry, shareReplay, map } from 'rxjs/operators';
import {Product} from "../assets/products";

const Cache_size = 1;

@Injectable({
  providedIn: 'root'
})
export class ProductServiceService {

  constructor(private http: HttpClient) { }
  
  obsProducts: Observable<Product[]>;
  
  getProducts(): Observable<Product[]> {

	if (this.obsProducts) {
		return this.obsProducts;
	}
	this.requestProducts();
    return this.obsProducts;
  }
  
  requestProducts() {
	  this.obsProducts = this.http.get<any>('http://localhost:4200/assets/products.json')
	  .pipe(map(data => data.content)
	  ,shareReplay(Cache_size));
  }
}
