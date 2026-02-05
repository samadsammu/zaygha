import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { environment } from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class ProductService {
    private apiUrl = `${environment.apiUrl}/products`;

    constructor(private http: HttpClient) { }

    getProducts(): Observable<any[]> {
        return this.http.get<any[]>(this.apiUrl).pipe(
            catchError(error => {
                console.error('API Error, using mock data:', error);
                return of([
                    { _id: '1', name: 'Gold Necklace', price: 12000, category: 'Jewellery', description: 'Elegant gold necklace', imageUrl: 'assets/dummy-necklaces.jpg', createdAt: new Date().toISOString() },
                    { _id: '2', name: 'Diamond Ring', price: 45000, category: 'Jewellery', description: 'Solitaire diamond ring', imageUrl: 'assets/dummy-rings.jpg', createdAt: new Date().toISOString() },
                    { _id: '3', name: 'Silver Bangles', price: 5000, category: 'Jewellery', description: 'Traditional silver bangles', imageUrl: 'assets/dummy-bangles.jpg', createdAt: new Date().toISOString() },
                    { _id: '4', name: 'Pearl Earrings', price: 3000, category: 'Jewellery', description: 'Classic pearl earrings', imageUrl: 'assets/dummy-earrings.jpg', createdAt: new Date().toISOString() },
                    { _id: '5', name: 'Silk Dress', price: 8000, category: 'Dress', description: 'Red silk dress', imageUrl: '', createdAt: new Date().toISOString() }
                ]);
            })
        );
    }
}
