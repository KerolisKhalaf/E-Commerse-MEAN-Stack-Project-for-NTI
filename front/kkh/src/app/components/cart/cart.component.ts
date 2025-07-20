import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { OrderService } from '../../services/order.service';
import { AuthService } from '../../services/auth.service';
import { Cart, CartItem } from '../../interfaces/cart.interface';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit {
  cart: Cart = { items: [], total: 0, itemCount: 0 };

  constructor(
    private cartService: CartService,
    private orderService: OrderService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.cartService.getCart().subscribe(cart => {
      this.cart = cart;
    });
  }

  updateQuantity(productId: string, newQuantity: number): void {
    if (newQuantity < 1) {
      alert('Quantity cannot be less than 1');
      return;
    }
    this.cartService.updateQuantity(productId, newQuantity);
  }

  removeItem(productId: string): void {
    const item = this.cart.items.find(item => item.product._id === productId);
    const productName = item ? item.product.name : 'this product';
    
    const confirmDelete = confirm(`Are you sure you want to remove "${productName}" from cart?`);
    
    if (confirmDelete) {
      this.cartService.removeFromCart(productId);
    }
  }

  clearCart(): void {
    if (this.cart.items.length === 0) {
      alert('Cart is already empty!');
      return;
    }
    
    const confirmClear = confirm('Are you sure you want to clear the entire cart?\n\nAll items will be removed from cart.');
    
    if (confirmClear) {
      this.cartService.clearCart();
      alert('Cart cleared successfully!');
    }
  }

  checkout(): void {
    if (!this.authService.isLoggedIn()) {
      alert('Please login to checkout');
      this.router.navigate(['/login']);
      return;
    }

    if (this.cart.items.length === 0) {
      alert('Your cart is empty');
      return;
    }

    const currentUser = this.authService.getCurrentUser();
    if (currentUser) {
      this.orderService.createOrder(this.cart, currentUser).subscribe({
        next: (order) => {
          alert('Order placed successfully!');
          this.cartService.clearCart();
          this.router.navigate(['/']);
        },
        error: (error) => {
          console.error('Error creating order:', error);
          if (error.error?.error) {
            alert(error.error.error);
          } else {
            alert('Failed to place order. Please try again.');
          }
        }
      });
    }
  }
}
