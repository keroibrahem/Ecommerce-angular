import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../../../core/services/product.service';
import { Product } from '../../../core/interfaces/product';
import { Router } from '@angular/router';
import { CartService } from '../../../core/services/cart.service';
import { CartItem } from '../../../core/interfaces/product';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];
  filteredProducts: Product[] = [];
  displayedProducts: Product[] = [];
  categories: string[] = [];
  brands: string[] = [];
  isLoading: boolean = true;
  
  // Pagination
  currentPage: number = 1;
  itemsPerPage: number = 8;
  totalPages: number = 0;

  // Filters
  selectedCategory: string = '';
  selectedBrand: string = '';
  priceRange = {
    min: 0,
    max: 10000
  };
  selectedRating: number = 0;
  showFilters: boolean = false;

  constructor(
    private productService: ProductService,
    private router: Router,
    private cartService: CartService
  ) {}

  iduser = localStorage.getItem('userid') || '';

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.productService.getProducts().subscribe({
      next: (data: any) => {
        this.products = data;
        this.filteredProducts = [...this.products];
        
        // Get unique categories
        this.categories = Array.from(
          new Set(this.products.map((product) => product.category))
        ).sort();

        // Get unique brands
        this.brands = Array.from(
          new Set(this.products.map((product) => product.brand))
        ).sort();

        // Set initial price range
        const prices = this.products.map(p => p.price);
        this.priceRange.min = Math.min(...prices);
        this.priceRange.max = Math.max(...prices);

        this.applyFilters();
        this.isLoading = false;
      },
      error: (error: any) => {
        console.error('Error fetching products:', error);
        this.isLoading = false;
      },
    });
  }

  applyFilters() {
    this.filteredProducts = this.products.filter(product => {
      const categoryMatch = !this.selectedCategory || product.category === this.selectedCategory;
      const brandMatch = !this.selectedBrand || product.brand === this.selectedBrand;
      const priceMatch = product.price >= this.priceRange.min && product.price <= this.priceRange.max;
      const ratingMatch = !this.selectedRating || product.rating >= this.selectedRating;

      return categoryMatch && brandMatch && priceMatch && ratingMatch;
    });

    this.totalPages = Math.ceil(this.filteredProducts.length / this.itemsPerPage);
    this.currentPage = 1; // Reset to first page when filters change
    this.updateDisplayedProducts();
  }

  resetFilters() {
    this.selectedCategory = '';
    this.selectedBrand = '';
    this.selectedRating = 0;
    const prices = this.products.map(p => p.price);
    this.priceRange.min = Math.min(...prices);
    this.priceRange.max = Math.max(...prices);
    this.applyFilters();
  }

  toggleFilters() {
    this.showFilters = !this.showFilters;
  }

  updateDisplayedProducts() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.displayedProducts = this.filteredProducts.slice(startIndex, endIndex);
  }

  goToPage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.updateDisplayedProducts();
    }
  }

  getPageNumbers(): number[] {
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }

  getRatingStars(rating: number): number[] {
    return Array(5).fill(0).map((_, index) => index < Math.round(rating) ? 1 : 0);
  }

  goToProduct(productId: number) {
    this.router.navigate(['/products', productId]);
  }

  onImageError(event: Event): void {
    (event.target as HTMLImageElement).src = 'assets/images/placeholder.png';
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
        });
      }
    });
  }
}
