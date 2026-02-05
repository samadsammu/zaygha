import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AdminService {
    private apiUrl = 'http://localhost:5000/api/products'; // Adjust port if needed

    constructor(private http: HttpClient) { }

    addProduct(product: any): Observable<any> {
        console.log(product);
        
        return this.http.post(this.apiUrl, product);
    }

    addProductsBulk(products: any[]): Observable<any> {
        return this.http.post(`${this.apiUrl}/bulk`, products);
    }

    getProducts(): Observable<any> {
        return this.http.get(this.apiUrl);
    }
}
