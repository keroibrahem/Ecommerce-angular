import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../../core/services/product.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { CartService } from '../../../core/services/cart.service';
import { CartItem } from '../../../core/interfaces/product';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-detalis',
  imports: [CommonModule, HttpClientModule],
  providers: [ProductService],
  templateUrl: './detalis.component.html',
  styleUrl: './detalis.component.scss',
})
export class DetalisComponent implements OnInit {
  product: any;
  id: any;
  mainImg: any;
  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private cartService: CartService
  ) {}

  iduser = localStorage.getItem('userid') || '';

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    this.productService.getProductById(this.id).subscribe((data) => {
      this.product = data;

      if (this.product && this.product.length) {
        this.mainImg = this.product[0].thumbnail || this.product[0].image;
      }
    });
  }
  getRoundedRating(rating: number): number {
    return Math.round(rating);
  }
  carouselIndex = 0;

  nextImg(images: string[]) {
    if (this.carouselIndex < images.length - 1) {
      this.carouselIndex++;
      this.mainImg = images[this.carouselIndex];
    }
  }
  prevImg(images: string[]) {
    if (this.carouselIndex > 0) {
      this.carouselIndex--;
      this.mainImg = images[this.carouselIndex];
    }
  }
  goToImg(idx: number, images: string[]) {
    this.carouselIndex = idx;
    this.mainImg = images[idx];
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
      } else {
        this.cartService.addToCart(cartItem).subscribe(() => {
          this.cartService.refreshCartCount(this.iduser);
        });
      }
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
    });
  }
}
