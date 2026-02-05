import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class OrderService {
    private apiUrl = environment.apiUrl + '/orders'; // Assuming environment set up
    // private apiUrl = 'http://localhost:5000/api/orders';

    constructor(private http: HttpClient) { }

    createOrder(orderData: any): Observable<any> {
        return this.http.post(this.apiUrl, orderData);
    }
}
