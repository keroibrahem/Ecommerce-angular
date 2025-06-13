import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from '../../../core/services/cart.service';
import { ProductService } from '../../../core/services/product.service';
import { CuttextPipe } from '../../../core/pipe/cuttext.pipe';
import { HttpClientModule } from '@angular/common/http';

interface CartProduct {
  id: number;
  idProduct: number;
  idUser: string;
  quantity: number;
  product: any;
}

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [HttpClientModule,CommonModule, CuttextPipe],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent implements OnInit {
  cartItems: CartProduct[] = [];
  cartiem: any=[];
  protected: any=[];
  userId = localStorage.getItem('userid') || '';
  totalPrice: number = 0;
  
  
  constructor(
    private cartService: CartService,
    private productService: ProductService
  ) {}

  ngOnInit() {
    this.getCartItems();
  }

  getCartItems() {
    // Assuming we have the user ID stored somewhere (e.g., localStorage)
   
    
    this.cartService.getCartByUser(this.userId).subscribe({
      next: (items) => {
        // For each cart item, fetch the product details
        items.forEach(item => {
          this.productService.getProductById(item.idProduct).subscribe({

            next: (product: any) => {
              this.cartItems.push({
                id: item.id!,
                idUser: this.userId,
                idProduct: item.idProduct,
                quantity: item.quantity,
                product: product[0] // Assuming the API returns an array with one product
              });
              this.calculateTotal();
            }
          });
        });
      }
    });
  }

  calculateTotal() {
    this.totalPrice = this.cartItems.reduce((total, item) => {
      return total + (item.product.price * item.quantity);
    }, 0);
  }

  updateQuantity(item: CartProduct, quantity: number) {
    if (quantity > 0) {
   
      this.cartiem={
        id: item.id,
        idUser: item.idUser,
        idProduct: item.idProduct,
        quantity: item.quantity
      }
     
      this.cartService.updateCart(
        this.cartiem , 
        quantity
      ).subscribe({
        next: () => {
          item.quantity = quantity;
          this.calculateTotal();
        }
      });
    }
  }

  handleQuantityChange(event: Event, item: CartProduct) {
    const input = event.target as HTMLInputElement;
    const newQuantity = parseInt(input.value);
    if (!isNaN(newQuantity)) {
      this.updateQuantity(item, newQuantity);
    }
  }

  removeItem(itemId: number) {
    if (confirm('Are you sure you want to remove this item from your cart?')) {
      this.cartService.removeFromCart(itemId).subscribe({
        next: () => {
          this.cartItems = this.cartItems.filter(item => item.id !== itemId);
          this.calculateTotal();
           this.cartService.refreshCartCount(this.userId);
        }
      });
    }
  }

  clearCart() {
    if (confirm('Are you sure you want to clear your entire cart?')) {
      const userId = localStorage.getItem('userid') || '';
      this.cartService.clearCart(userId).subscribe({
        next: () => {
          this.cartItems = [];
          this.totalPrice = 0;
           this.cartService.refreshCartCount(this.userId);
        }
      });
    }
  }
}
