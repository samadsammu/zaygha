import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';

export interface CartItem {
    id: string; // Product _id is string
    name: string;
    price: number;
    quantity: number;
    image: string;
}

@Injectable({
    providedIn: 'root'
})
export class CartService {
    private cartItemsSubject = new BehaviorSubject<CartItem[]>([]);
    cartItems$ = this.cartItemsSubject.asObservable();

    constructor() { }

    getCartItems() {
        return this.cartItems$;
    }

    addToCart(product: any) {
        const currentItems = this.cartItemsSubject.value;
        const existingItem = currentItems.find(item => item.id === product._id);

        if (existingItem) {
            existingItem.quantity += 1;
            this.cartItemsSubject.next([...currentItems]);
        } else {
            const newItem: CartItem = {
                id: product._id,
                name: product.name,
                price: product.price,
                quantity: 1,
                image: product.imageUrl || '' // Handle null image
            };
            this.cartItemsSubject.next([...currentItems, newItem]);
        }
    }

    removeFromCart(id: string) {
        const currentItems = this.cartItemsSubject.value;
        this.cartItemsSubject.next(currentItems.filter(item => item.id !== id));
    }

    updateQuantity(id: string, change: number) {
        const currentItems = this.cartItemsSubject.value;
        const item = currentItems.find(i => i.id === id);

        if (item) {
            const newQty = item.quantity + change;
            if (newQty > 0) {
                item.quantity = newQty;
                this.cartItemsSubject.next([...currentItems]);
            }
        }
    }

    getCartTotal() {
        return this.cartItems$.pipe(
            map(items => items.reduce((total, item) => total + (item.price * item.quantity), 0))
        );
    }

    getCartCount() {
        return this.cartItems$.pipe(
            map(items => items.reduce((count, item) => count + item.quantity, 0))
        );
    }
}
