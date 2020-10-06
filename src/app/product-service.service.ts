import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import {Product} from "../assets/products";
//import {content} from '../assets/products.json'; 

@Injectable({
  providedIn: 'root'
})
export class ProductServiceService {

  constructor(private http: HttpClient) { }
  
  
  getProducts(): Observable<any> {
    //return content

    return this.http.get<any>('http://localhost:4200/assets/products.json');
  }
}
