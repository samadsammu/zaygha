import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from '../services/product.service';
import { CartService } from '../services/cart.service';

@Component({
    selector: 'app-jewellery',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './jewellery.component.html',
    styleUrls: ['./jewellery.component.css']
})
export class JewelleryComponent implements OnInit {

   categories = [
        { name: 'Earrings', image: 'assets/dummy-earrings.jpg' },
        { name: 'Necklaces', image: 'assets/dummy-necklaces.jpg' },
        { name: 'Bangles', image: 'assets/dummy-bangles.jpg' },
        { name: 'Rings', image: 'assets/dummy-rings.jpg' }
    ];

    allProducts: any[] = [];
    featuredProducts: any[] = [];   // 🔑 SINGLE SOURCE
    displayedProducts: any[] = [];

    sectionTitle: string = 'New Arrivals';

    currentPage = 1;
    itemsPerPage = 4;
    isFiltered = false;

    constructor(
        private productService: ProductService,
        private cartService: CartService
    ) {}

    ngOnInit() {
        this.productService.getProducts().subscribe({
            next: (data) => {

                // Sort latest first
                this.allProducts = data.sort((a: any, b: any) => {
                    const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
                    const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
                    return dateB - dateA;
                });

                // ✅ LANDING PAGE → LAST 4 PRODUCTS
                this.featuredProducts = this.allProducts.slice(0, 4);
                this.displayedProducts = [...this.featuredProducts];
            },
            error: err => console.error(err)
        });
    }

    addToCart(product: any) {
        this.cartService.addToCart(product);
        alert(`${product.name} added to cart!`);
    }

    // ✅ FILTER
    filterByCategory(category: string) {
        this.isFiltered = true;
        this.sectionTitle = `${category} Collection`;
        this.currentPage = 1;

        this.featuredProducts = this.allProducts.filter(
            p => p.category === category
        );

        this.updatePagination();

        document
            .querySelector('.featured-section')
            ?.scrollIntoView({ behavior: 'smooth' });
    }

    updatePagination() {
        const start = (this.currentPage - 1) * this.itemsPerPage;
        const end = start + this.itemsPerPage;
        this.displayedProducts = this.featuredProducts.slice(start, end);
    }

    changePage(page: number) {
        this.currentPage = page;
        this.updatePagination();
    }

    get totalPages() {
        return Math.ceil(this.featuredProducts.length / this.itemsPerPage);
    }

    get pagesArray() {
        return Array(this.totalPages).fill(0).map((_, i) => i + 1);
    }
}
