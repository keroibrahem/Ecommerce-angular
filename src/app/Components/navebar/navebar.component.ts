import { Component, OnInit, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CartService } from '../../../core/services/cart.service';

declare var bootstrap: any;

@Component({
  selector: 'app-navebar',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './navebar.component.html',
  styleUrl: './navebar.component.scss'
})
export class NavebarComponent implements OnInit, AfterViewInit {
  cartLength: number = 0;
  searchQuery: string = '';
  showSearch: boolean = false;
  @ViewChild('userDropdown') userDropdown!: ElementRef;
  dropdownInstance: any;

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    const userid = localStorage.getItem('userid') || '';
    if (userid) {
      this.cartService.getCartByUser(userid).subscribe((cart) => {
        this.cartLength = cart.length;
      });

      this.cartService.cartCount$.subscribe((count) => {
        this.cartLength = count;
      });
    }
  }

  ngAfterViewInit() {
    this.dropdownInstance = new bootstrap.Dropdown(this.userDropdown.nativeElement);
  }

  toggleSearch(): void {
    this.showSearch = !this.showSearch;
    if (this.showSearch) {
      setTimeout(() => {
        const searchInput = document.querySelector('.search-input') as HTMLInputElement;
        if (searchInput) searchInput.focus();
      }, 100);
    }
  }

  onSearch(event: Event): void {
    event.preventDefault();
    if (this.searchQuery.trim()) {
      // Implement search logic here
      console.log('Searching for:', this.searchQuery);
      this.searchQuery = '';
    }
  }

  toggleDropdown(event: Event) {
    event.preventDefault();
    if (this.dropdownInstance) {
      this.dropdownInstance.toggle();
    }
  }

  logout(): void {
    if (this.dropdownInstance) {
      this.dropdownInstance.hide();
    }
    localStorage.removeItem('userid');
    
    localStorage.removeItem('token');
    window.location.href = '/login';
  }
}
