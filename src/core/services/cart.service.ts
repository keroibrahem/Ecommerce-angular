import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, forkJoin, Observable, switchMap, tap } from 'rxjs';



export interface CartItem {
  id?: number;        
  idUser: string;      
  idProduct: number;   
  quantity: number;
}

@Injectable({
  providedIn: 'root'
})
export class CartService {


  constructor(private http: HttpClient) { }
  private cartCountSubject = new BehaviorSubject<number>(0);
  cartCount$ = this.cartCountSubject.asObservable();

  private URL = 'http://localhost:3000/Cart';

   getCartByUser(idUser: string): Observable<CartItem[]> {
    return this.http.get<CartItem[]>(`${this.URL}?idUser=${idUser}`);
  }

   addToCart(item: CartItem): Observable<CartItem> {
    return this.http.post<CartItem>(this.URL, item).pipe(
      tap(() => this.refreshCartCount(item.idUser))
    );
  }

  updateCart(item: CartItem, quantity: number): Observable<CartItem> {
    item.quantity = quantity;
    return this.http.put<CartItem>(`${this.URL}/${item.id}`, item).pipe(
      tap(() => this.refreshCartCount(item.idUser))
    );
  }
  refreshCartCount(idUser: string) {
    this.getCartByUser(idUser).subscribe(cart => {
      this.cartCountSubject.next(cart.length);
    });
  }

  removeFromCart(id: number): Observable<void> {
    return this.http.delete<void>(`${this.URL}/${id}`);
  }

  clearCart(userId: string): Observable<any> {
  return this.http.get<any[]>(`http://localhost:3000/Cart?idUser=${userId}`).pipe(
    switchMap(items => {
      const deleteRequests = items.map(item =>
        this.http.delete(`http://localhost:3000/Cart/${item.id}`)
      );
      return forkJoin(deleteRequests);
    })
  );
}


}
