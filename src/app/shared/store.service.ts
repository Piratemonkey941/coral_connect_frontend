import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '.././models/product.modal';

// const STORE_BASE_URL = 'https://fakestoreapi.com';
const STORE_BASE_URL = 'http://localhost:3000/api/v1';
@Injectable({
  providedIn: 'root'
})
export class StoreService {

  constructor( private httpClient: HttpClient) { }

  getAllProducts(
    limit = '12',
    sort = 'desc',
    category?: string
  ): Observable<Array<Product>> {
    let queryParams = `?sort=${sort}&limit=${limit}`;
    if (category && category !== '') {
      queryParams += `&category=${encodeURIComponent(category)}`;
    }

    return this.httpClient.get<Array<Product>>(`${STORE_BASE_URL}/products${queryParams}`);
  }


  getAllCategories(): Observable<Array<string>> {
    return this.httpClient.get<Array<string>>(
      `${STORE_BASE_URL}/products/categories`
    );
  }

  // getAllCategories(): Observable<Array<string>> {
  //   return this.httpClient.get<Array<string>>(
  //     `${STORE_BASE_URL}/products/categories`
  //   );
  // }
}


// private baseUrl = 'https://fakestoreapi.com/products';

// constructor(private http: HttpClient) {}

// getAllProducts(count: string, sort: string, category?: string): Observable<Product[]> {
//   let url = `${this.baseUrl}?limit=${count}&sort=${sort}`;
//   if (category) {
//     url += `&category=${category}`;
//   }
//   return this.http.get<Product[]>(url);
// }

// getAllCategories(): Observable<Array<string>> {
//   return this.http.get<Array<string>>(`${this.baseUrl}/products/categories`);
// }
