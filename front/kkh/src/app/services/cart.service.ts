import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Cart, CartItem } from '../interfaces/cart.interface';
import { Product } from '../interfaces/product.interface';
import { ProductService } from './product.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private apiUrl = 'http://localhost:5000/api/cart';
  private cartSubject = new BehaviorSubject<Cart>({
    items: [],
    total: 0,
    itemCount: 0
  });
  public cart$ = this.cartSubject.asObservable();

  constructor(
    private productService: ProductService,
    private http: HttpClient
  ) {
    // Load cart from localStorage
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      this.cartSubject.next(JSON.parse(savedCart));
    }
  }

  addToCart(product: Product, quantity: number = 1): void {
    // Check if product is available
    if (product.quantity === 0) {
      alert('This product is currently out of stock!');
      return;
    }

    // Check if requested quantity is available
    if (quantity > product.quantity) {
      alert(`Sorry, only ${product.quantity} items available.`);
      return;
    }

    const currentCart = this.cartSubject.value;
    const existingItem = currentCart.items.find(item => item.product._id === product._id);

    if (existingItem) {
      const newQuantity = existingItem.quantity + quantity;
      if (newQuantity > product.quantity) {
        alert(`Sorry, only ${product.quantity} items available.`);
        return;
      }
      existingItem.quantity = newQuantity;
    } else {
      currentCart.items.push({ product, quantity });
    }

    this.updateCart(currentCart);
  }

  removeFromCart(productId: string): void {
    const currentCart = this.cartSubject.value;
    currentCart.items = currentCart.items.filter(item => item.product._id !== productId);
    this.updateCart(currentCart);
  }

  updateQuantity(productId: string, quantity: number): void {
    const currentCart = this.cartSubject.value;
    const item = currentCart.items.find(item => item.product._id === productId);
    
    if (item) {
      if (quantity <= 0) {
        this.removeFromCart(productId);
      } else if (quantity > item.product.quantity) {
        alert(`Sorry, only ${item.product.quantity} items available.`);
        return;
      } else {
        item.quantity = quantity;
        this.updateCart(currentCart);
      }
    }
  }

  clearCart(): void {
    const emptyCart: Cart = {
      items: [],
      total: 0,
      itemCount: 0
    };
    this.updateCart(emptyCart);
  }

  private updateCart(cart: Cart): void {
    cart.total = cart.items.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
    cart.itemCount = cart.items.reduce((sum, item) => sum + item.quantity, 0);
    
    this.cartSubject.next(cart);
    localStorage.setItem('cart', JSON.stringify(cart));
  }

  getCart(): Observable<Cart> {
    return this.cart$;
  }

  getCartItemCount(): Observable<number> {
    return new Observable(observer => {
      this.cart$.subscribe(cart => {
        observer.next(cart.itemCount);
      });
    });
  }

  // API methods for backend integration
  saveCartToBackend(cart: Cart): Observable<any> {
    return this.http.post(this.apiUrl, cart);
  }

  getCartFromBackend(): Observable<Cart> {
    return this.http.get<Cart>(this.apiUrl);
  }
}
