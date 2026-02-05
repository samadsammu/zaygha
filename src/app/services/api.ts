import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = 'http://localhost:5000/api';

  constructor(private http: HttpClient) { }

  login(credentials: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/users/login`, credentials);
  }

  getProducts(): Observable<any> {
    return this.http.get(`${this.baseUrl}/products`);
  }

  addProduct(product: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/products`, product);
  }
}
