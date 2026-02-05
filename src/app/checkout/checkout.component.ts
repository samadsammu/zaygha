import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CartService } from '../services/cart.service';
import { OrderService } from '../services/order.service';
import { Observable, take } from 'rxjs';
import { Router } from '@angular/router';
import { SnackbarService } from '../shared/snackbar/snackbar.service';

@Component({
    selector: 'app-checkout',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './checkout.component.html',
    styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent {
    cartTotal$: Observable<number>;
    cartCount$: Observable<number>;

    formData = {
        fullName: '',
        address: '',
        city: '',
        zip: '',
        email: ''
    };

    constructor(
        private cartService: CartService,
        private orderService: OrderService,
        private router: Router,
        private snackbar: SnackbarService
    ) {
        this.cartTotal$ = this.cartService.getCartTotal();
        this.cartCount$ = this.cartService.getCartCount();
    }

    placeOrder() {
        this.cartService.getCartItems().pipe(take(1)).subscribe(items => {
            if (items.length === 0) {
                this.snackbar.show('Your cart is empty!', 'Shop', () => this.router.navigate(['/jewellery']));
                return;
            }

            const total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

            const orderData = {
                user: {
                    name: this.formData.fullName || 'Guest',
                    address: this.formData.address || 'Not provided',
                    city: this.formData.city || 'Not provided',
                    zip: this.formData.zip || '00000',
                    email: this.formData.email
                },
                items: items.map(item => ({
                    productId: item.id,
                    name: item.name,
                    price: item.price,
                    quantity: item.quantity,
                    image: item.image
                })),
                totalAmount: total,
                paymentMethod: 'Credit Card' // Mock payment
            };

            this.snackbar.show('Processing order...', undefined, undefined, 1000);

            this.orderService.createOrder(orderData).subscribe({
                next: (res) => {
                    this.cartService.clearCart();
                    this.snackbar.show('Order placed successfully! Check your email.', 'Home', () => this.router.navigate(['/']));
                    this.router.navigate(['/']);
                },
                error: (err) => {
                    console.error(err);
                    this.snackbar.show('Failed to place order. Please try again.');
                }
            });
        });
    }
}
