import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AdminService } from './admin.service';

import * as XLSX from 'xlsx';

@Component({
    selector: 'app-admin',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './admin.component.html',
    styleUrls: ['./admin.component.css']
})
export class AdminComponent {
    product: any = {
        name: '',
        description: '',
        price: null,
        purchasedPrice: null,
        category: 'Earrings',
        imageUrl: '',
        inStock: true
    };

    activeTab: 'add' | 'stock' = 'stock'; // Default to stock view
    stockProducts: any[] = [];
    filteredStock: any[] = [];
    paginatedStock: any[] = []; // Current page items
    filterText: string = '';
    selectedCategory: string = ''; // Filter by category

    // Pagination State
    currentPage: number = 1;
    itemsPerPage: number = 10;

    categories = ['Earrings', 'Necklaces', 'Bangles', 'Rings', 'Sets', 'Dresses', 'Crafts'];

    message = '';
    isError = false;

    constructor(private adminService: AdminService) {
        this.fetchStock();
    }

    switchTab(tab: 'add' | 'stock') {
        this.activeTab = tab;
        if (tab === 'stock') {
            this.fetchStock();
        }
    }

    fetchStock() {
        this.adminService.getProducts().subscribe({
            next: (data) => {
                this.stockProducts = data;
                console.log(this.stockProducts);
                this.filterStock();
            },
            error: (err) => console.error('Error fetching stock', err)
        });
    }

    filterStock() {
        let filtered = this.stockProducts;

        // Filter by Category
        if (this.selectedCategory) {
            filtered = filtered.filter(p => p.category === this.selectedCategory);
        }

        // Filter by Search Text
        if (this.filterText) {
            const lowerInfo = this.filterText.toLowerCase();
            filtered = filtered.filter(p =>
                p.name.toLowerCase().includes(lowerInfo)
            );
        }

        this.filteredStock = filtered;
        this.currentPage = 1; // Reset to first page
        this.updatePagination();
    }

    updatePagination() {
        const startIndex = (this.currentPage - 1) * this.itemsPerPage;
        const endIndex = startIndex + this.itemsPerPage;
        this.paginatedStock = this.filteredStock.slice(startIndex, endIndex);
    }

    changePage(page: number) {
        if (page >= 1 && page <= this.totalPages) {
            this.currentPage = page;
            this.updatePagination();
        }
    }

    get totalPages(): number {
        return Math.ceil(this.filteredStock.length / this.itemsPerPage);
    }

    calculateProfit(product: any): number {
        const sell = product.price || 0;
        const buy = product.purchasedPrice || 0;
        return sell - buy;
    }

    onSubmit() {
        console.log("Submitting Product:", this.product);

        if (!this.product.name || !this.product.price) {
            this.showMessage('Please fill in required fields.', true);
            return;
        }

        this.adminService.addProduct(this.product).subscribe({
            next: (response) => {
                alert('Product added successfully!');
                this.showMessage('Product added successfully!', false);
                this.resetForm();
                this.fetchStock(); // Update stock in background
            },
            error: (error) => {
                console.error('Error adding product:', error);
                this.showMessage('Failed to add product. Ensure backend is running.', true);
            }
        });
    }

    // Excel Logic
    downloadTemplate() {
        const dummyData = [
            {
                name: 'Sample Product',
                description: 'Product Description',
                price: 999,
                purchasedPrice: 500,
                category: 'Earrings',
                imageUrl: 'http://example.com/image.jpg',
                inStock: true
            }
        ];

        const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(dummyData);
        const wb: XLSX.WorkBook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Products');

        XLSX.writeFile(wb, 'Zaygha_Product_Template.xlsx');
    }

    onFileChange(evt: any) {
        const target: DataTransfer = <DataTransfer>(evt.target);
        if (target.files.length !== 1) {
            this.showMessage('Cannot upload multiple files', true);
            return;
        }

        const reader: FileReader = new FileReader();
        reader.onload = (e: any) => {
            const bstr: string = e.target.result;
            const wb: XLSX.WorkBook = XLSX.read(bstr, { type: 'binary' });

            const wsname: string = wb.SheetNames[0];
            const ws: XLSX.WorkSheet = wb.Sheets[wsname];

            const data = XLSX.utils.sheet_to_json(ws);
            console.log('Parsed Excel Data:', data);

            this.processBulkUpload(data);
        };
        reader.readAsBinaryString(target.files[0]);
    }

    processBulkUpload(data: any[]) {
        if (!data || data.length === 0) {
            this.showMessage('File is empty or invalid', true);
            return;
        }

        // Basic Validation Filter
        const validProducts = data.filter(item => item.name && item.price);

        if (validProducts.length === 0) {
            this.showMessage('No valid products found in file.', true);
            return;
        }

        this.adminService.addProductsBulk(validProducts).subscribe({
            next: (res: any) => {
                const msg = `Bulk Upload Successful! Added ${res.count} products.`;
                this.showMessage(msg, false);
                alert(msg);
                this.fetchStock();
            },
            error: (err) => {
                console.error('Bulk upload error', err);
                this.showMessage('Failed to upload products. Check console.', true);
            }
        });
    }



    showMessage(msg: string, isErr: boolean) {
        this.message = msg;
        this.isError = isErr;
        setTimeout(() => this.message = '', 5000);
    }

    resetForm() {
        this.product = {
            name: '',
            description: '',
            price: null,
            purchasedPrice: null,
            category: 'Earrings',
            imageUrl: '',
            inStock: true
        };
    }
}
