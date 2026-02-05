import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CartService, CartItem } from '../services/cart.service';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-cart',
    standalone: true,
    imports: [CommonModule, RouterLink],
    templateUrl: './cart.component.html',
    styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
    cartItems$: Observable<CartItem[]>;
    subtotal$: Observable<number>;

    constructor(private cartService: CartService) {
        this.cartItems$ = this.cartService.getCartItems();
        this.subtotal$ = this.cartService.getCartTotal();
    }

    ngOnInit() {
        // Observables handle subscription
    }

    removeItem(id: string) {
        this.cartService.removeFromCart(id);
    }

    updateQuantity(id: string, change: number) {
        this.cartService.updateQuantity(id, change);
    }
}
