import { Component } from '@angular/core';
import { ProductService } from '../../../core/services/product.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import {
  Product,
  Categories,
  CartItem,
} from '../../../core/interfaces/product';
import { CuttextPipe } from '../../../core/pipe/cuttext.pipe';
import { CategoryService } from '../../../core/services/category.service';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { Router } from '@angular/router';
import { CartService } from '../../../core/services/cart.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-home',
  imports: [HttpClientModule, CommonModule, CuttextPipe, CarouselModule],
  standalone: true,

  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  products: Product[] = [];
  categories: string[] = [];
  objcategory: Categories[] = [];
  isLoading: boolean = true;

  constructor(
    private productService: ProductService,
    private categoryService: CategoryService,
    private http: HttpClient,
    private router: Router,
    private cartService: CartService
  ) {}
  sectionVisible = false;
  topSectionVisible = true;
  thirdSectionVisible = false;
  iduser = localStorage.getItem('userid') || '';
  cartLength: number = 0;

  ngOnInit(): void {
    this.loadProducts();
    this.getCategoriesObject();
    window.addEventListener('scroll', this.onScroll, true);
  }

  loadProducts(): void {
    this.productService.getProducts().subscribe({
      next: (data: any) => {
        this.products = data;
        this.categories = Array.from(
          new Set(this.products.map((product) => product.category))
        );
        this.categories.sort((a, b) => a.localeCompare(b)); // Sort categories alphabetically
        // console.log('Categories fetched successfully:', this.categories);

        // console.log('Products fetched successfully:', this.products);
        this.isLoading = false;
      },
      error: (error: any) => {
        console.error('Error fetching products:', error);
        this.isLoading = false;
      },
    });
  }
  onImgError(event: Event) {
    const img = event.target as HTMLImageElement;
    // لو الصورة بالفعل هي الافتراضية لا تعيد تعيينها
    if (!img.src.includes('via.placeholder.com')) {
      img.src =
        'https://via.placeholder.com/160x160/181818/ffe082?text=No+Image';
    }
  }
  getSampledProductsPerCategory(limit: number = 2): Product[] {
    const result: Product[] = [];
    const grouped: { [key: string]: Product[] } = {};

    for (const product of this.products) {
      if (!grouped[product.category]) {
        grouped[product.category] = [];
      }
      if (grouped[product.category].length < limit) {
        grouped[product.category].push(product);
        result.push(product);
      }
    }
    return result;
  }

  categoryIndexes: { [key: string]: number } = {};
  offers: any[] = [];

  getProductsByCategory(category: string): Product[] {
    return this.products.filter((p) => p.category === category);
  }

  // عدد الكروت الظاهرة في السلايدر
  visibleCount: number = 4;

  getSliderTransform(category: string): string {
    const idx = this.categoryIndexes[category] || 0;
    return `translateX(-${idx * 312}px)`; // 300px card + 12px margin
  }

  next(category: string) {
    const all = this.getProductsByCategory(category);
    const max = all.length - this.visibleCount;
    this.categoryIndexes[category] = Math.min(
      (this.categoryIndexes[category] || 0) + 1,
      max > 0 ? max : 0
    );
  }

  prev(category: string) {
    this.categoryIndexes[category] = Math.max(
      (this.categoryIndexes[category] || 0) - 1,
      0
    );
  }

  getCategoriesObject() {
    this.categoryService.getCategories().subscribe({
      next: (data: any) => {
        this.objcategory = data;
        // console.log('Categories fetched successfully:', this.objcategory);
      },
      error: (error: any) => {
        console.error('Error fetching categories:', error);
      },
    });
  }
  categoryOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    navSpeed: 700,
    autoplay: true,
    autoplaySpeed: 1200,
    autoplayTimeout: 4000,
    autoplayHoverPause: true,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1,
      },
      400: {
        items: 3,
      },
      740: {
        items: 4,
      },
      940: {
        items: 6,
      },
    },
    nav: true,
  };

  onScroll = () => {
    const topSection = document.querySelector('.full-vh-section');
    if (topSection) {
      const rect = topSection.getBoundingClientRect();
      // اختفاء السكشن عندما يخرج من الشاشة للأعلى
      this.topSectionVisible =
        rect.bottom > 100 && rect.top < window.innerHeight - 100;
    }

    const section = document.querySelector('.fade-in-section');
    if (section) {
      const rect = section.getBoundingClientRect();
      this.sectionVisible =
        rect.top < window.innerHeight - 100 && rect.bottom > 100;
    }

    const thirdSection = document.querySelector('.fade-in-section-2');
    if (thirdSection) {
      const rect = thirdSection.getBoundingClientRect();
      this.thirdSectionVisible =
        rect.top < window.innerHeight - 100 && rect.bottom > 100;
    }
  };
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

  goToCategory(cat: string){
    this.router.navigate([`/category/${cat}`]);
  }

  
}
