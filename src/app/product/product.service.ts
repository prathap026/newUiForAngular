import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http:HttpClient) { }

  postProduct(payload){
    const url = 'http://localhost:5000/api/product/addProduct';
    return this.http.post(url,payload);
  }
}
