import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Order } from '../interfaces/order.interface';
import { Cart } from '../interfaces/cart.interface';
import { User } from '../interfaces/user.interface';
import { ProductService } from './product.service';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private apiUrl = 'http://localhost:5000/api/order';
  private ordersSubject = new BehaviorSubject<Order[]>([]);
  public orders$ = this.ordersSubject.asObservable();

  constructor(
    private productService: ProductService,
    private http: HttpClient
  ) {
    this.loadOrders();
  }

  private loadOrders(): void {
    this.getOrders().subscribe({
      next: (orders) => {
        this.ordersSubject.next(orders);
      },
      error: (error) => {
        console.error('Error loading orders:', error);
        this.ordersSubject.next([]);
      }
    });
  }

  createOrder(cart: Cart, user: User): Observable<Order> {
    const orderData = {
      user: user._id,
        items: cart.items,
        total: cart.total,
      status: 'pending'
    };

    return this.http.post<Order>(this.apiUrl, orderData);
  }

  getOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(this.apiUrl);
  }

  getAllOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(`${this.apiUrl}/all`);
  }

  getOrdersByUser(userId: string): Observable<Order[]> {
    return this.http.get<Order[]>(`${this.apiUrl}/user/${userId}`);
  }

  updateOrderStatus(orderId: string, status: Order['status']): Observable<Order> {
    return this.http.patch<Order>(`${this.apiUrl}/${orderId}/status`, { status });
  }

  getOrderById(orderId: string): Observable<Order> {
    return this.http.get<Order>(`${this.apiUrl}/${orderId}`);
  }
}
