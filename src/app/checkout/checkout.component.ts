import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-checkout',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './checkout.component.html',
    styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent {
    subtotal = 6100; // Mock total based on cart dummy data
    shipping = 0;
    total = 6100;

    placeOrder() {
        alert('Order placed successfully! (Simulation)');
    }
}
