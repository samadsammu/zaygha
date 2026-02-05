import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../services/api';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './admin.html',
  styleUrls: ['./admin.css'] // Using CSS file we will create next
})
export class AdminComponent1 {
  isLoggedIn = false;
  loginData = { username: '', password: '' };

  newProduct = {
    name: '',
    price: null,
    category: 'Dress',
    description: '',
    imageUrl: ''
  };

  products: any[] = [];
  categories = ['Dress', 'Crafts', 'Jewellery'];

  constructor(private apiService: ApiService) { }

  onLogin() {
    this.apiService.login(this.loginData).subscribe({
      next: (res) => {
        this.isLoggedIn = true;
        this.loadProducts();
      },
      error: (err) => {
        alert('Login Failed');
        console.error(err);
      }
    });
  }

  loadProducts() {
    this.apiService.getProducts().subscribe({
      next: (data) => {
        this.products = data;
      },
      error: (err) => console.error(err)
    });
  }

  addProduct() {
    this.apiService.addProduct(this.newProduct).subscribe({
      next: (res) => {
        alert('Product Added Successfully');
        this.products.push(res);
        this.newProduct = { name: '', price: null, category: 'Dress', description: '', imageUrl: '' };
      },
      error: (err) => {
        alert('Failed to add product');
        console.error(err);
      }
    });
  }
}
