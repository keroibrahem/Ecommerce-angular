import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../../core/services/product.service';
import { Product } from '../../../core/interfaces/product';
import { CartService } from '../../../core/services/cart.service';
import {CartItem} from "../../../core/interfaces/product";
import Swal from 'sweetalert2';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss'
})
export class CategoriesComponent implements OnInit {
  categoryName: string = '';
  products: Product[] = [];
  isLoading: boolean = true;
  


  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private router: Router,
    private cartService: CartService
  ) {}

  iduser = localStorage.getItem('userid') || '';
  ngOnInit() {
    this.route.params.subscribe(params => {
      this.categoryName = params['category'];
      this.loadProductsByCategory();
    });
  }

  loadProductsByCategory() {
    this.isLoading = true;
    this.productService.getProductsByCategory(this.categoryName).subscribe({
      next: (data: any) => {
        this.products = data;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error fetching products:', error);
        this.isLoading = false;
      }
    });
  }

  goToProduct(productId: number) {
    this.router.navigate(['/products', productId]);
  }

  addToCart(product: any, event: Event) {
     event.stopPropagation();
     const cartItem: CartItem = {
       idUser: this.iduser,
       idProduct: product.id,
       quantity: 1,
     };
 
     this.cartService.getCartByUser(this.iduser).subscribe((cart) => {
       const found = cart.find((item) => item.idProduct === product.id);
       if (found) {
         this.cartService
           .updateCart(found, (found.quantity += 1))
           .subscribe(() => {
             this.cartService.refreshCartCount(this.iduser);
           });
       } else {
         this.cartService.addToCart(cartItem).subscribe(() => {
           this.cartService.refreshCartCount(this.iduser);
         });
         Swal.fire({
           icon: 'success',
           title: 'Success',
           text: 'Product added to cart!',
           background: '#222',
           color: '#ffd700',
           showConfirmButton: false, 
           timer: 1000, 
           timerProgressBar: true,
           // position: 'top-right',
         });
       }
     });
   }
  onImageError(event: Event): void {
  (event.target as HTMLImageElement).src = 'assets/images/placeholder.png';
}

}
