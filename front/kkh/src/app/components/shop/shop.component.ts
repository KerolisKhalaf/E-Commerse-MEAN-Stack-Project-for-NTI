import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../../services/product.service';
import { CartService } from '../../services/cart.service';
import { Product } from '../../interfaces/product.interface';

@Component({
  selector: 'app-shop',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.css'
})
export class ShopComponent implements OnInit {
  products: Product[] = [];
  filteredProducts: Product[] = [];
  selectedCategory = 'all';
  categories: string[] = [];
  isLoading = false;

  constructor(
    private productService: ProductService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.isLoading = true;
    this.productService.getAllProducts().subscribe({
      next: (products) => {
        this.products = products;
        this.filteredProducts = products;
        this.categories = [...new Set(products.map(p => p.category))];
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading products:', error);
        this.isLoading = false;
        alert('Failed to load products. Please try again.');
      }
    });
  }

  filterProducts(): void {
    if (this.selectedCategory === 'all') {
      this.filteredProducts = this.products;
    } else {
      this.filteredProducts = this.products.filter(p => p.category === this.selectedCategory);
    }
  }

  addToCart(product: Product): void {
    if (product.quantity <= 0) {
      alert('This product is out of stock!');
      return;
    }

    this.cartService.addToCart(product);
    alert(`${product.name} added to cart!`);
  }

  getQuantityClass(quantity: number): string {
    if (quantity === 0) return 'bg-danger';
    if (quantity <= 5) return 'bg-warning';
    return 'bg-success';
  }

  getQuantityText(quantity: number): string {
    if (quantity === 0) return 'Out of Stock';
    if (quantity <= 5) return 'Low Stock';
    return 'In Stock';
  }
}
