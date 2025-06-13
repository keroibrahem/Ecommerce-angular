// import { Component, OnInit } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { FormsModule } from '@angular/forms';
// import { RouterModule } from '@angular/router';
// import { ProductService } from '../../services/product.service';
// import { UserService } from '../../services/user.service';
// import { Product } from '../../models/product.model';
// import { User } from '../../models/user.model';

// @Component({
//   selector: 'app-profail',
//   standalone: true,
//   imports: [CommonModule, FormsModule, RouterModule],
//   templateUrl: './profail.component.html',
//   styleUrl: './profail.component.scss'
// })
// export class ProfailComponent implements OnInit {
//   user: User | null = null;
//   userProducts: Product[] = [];
//   showAddProductForm: boolean = false;
//   showImageEdit: boolean = false;
//   imageUrl: string = '';
//   defaultAvatar = 'https://icons.veryicon.com/png/o/miscellaneous/cust-background-icon/default-avatar-3.png';
//   selectedFile: File | null = null;
//   usrerId=localStorage.getItem('userid') || '';
//   newProduct: Product = {
//     id: 0,
//     title: '',
//     description: '',
//     price: 0,
//     category: '',
//     image: '',
//     userId: 0
//   };

//   constructor(
//     private userService: UserService,
//     private productService: ProductService
//   ) {}

//   ngOnInit(): void {
//     this.loadUserProfile();
//     this.loadUserProducts();
//   }

//   loadUserProfile(): void {
//     this.userService.getCurrentUser().subscribe({
//       next: (user) => {
//         this.user = user;
//         console.log('User loaded:', user);
//       },
//       error: (error) => {
//         console.error('Error loading user:', error);
//       }
//     });
//   }

//   loadUserProducts(): void {
//     if (this.usrerId) {
//       this.productService.getUserProducts(this.usrerId).subscribe({
//         next: (products) => {
//           this.userProducts = products;
//           console.log('Products loaded:', products);
//         },
//         error: (error) => {
//           console.error('Error loading products:', error);
//         }
//       });
//     }
//   }

//   toggleImageEdit(): void {
//     this.showImageEdit = !this.showImageEdit;
//     this.imageUrl = '';
//     this.selectedFile = null;
//   }

//   onFileSelected(event: Event): void {
//     const input = event.target as HTMLInputElement;
//     if (input.files && input.files[0]) {
//       const file = input.files[0];
//       if (file.type.startsWith('image/')) {
//         if (file.size <= 5 * 1024 * 1024) { // 5MB limit
//           this.selectedFile = file;
//           this.uploadProfileImage();
//         } else {
//           alert('File size should be less than 5MB');
//         }
//       } else {
//         alert('Please select an image file');
//       }
//     }
//   }

//   uploadProfileImage(): void {
//     if (this.selectedFile && this.user?.id) {
//       const formData = new FormData();
//       formData.append('image', this.selectedFile);
//       formData.append('userId', this.user.id.toString());

//       this.userService.updateProfileImage(formData).subscribe({
//         next: (response) => {
//           if (this.user) {
//             this.user.profileImage = response.imageUrl;
//             this.showImageEdit = false;
//             this.selectedFile = null;
//             // Clear the file input
//             const fileInput = document.getElementById('profile-image-input') as HTMLInputElement;
//             if (fileInput) {
//               fileInput.value = '';
//             }
//           }
//         },
//         error: (error) => {
//           console.error('Error uploading image:', error);
//           alert('Failed to upload image. Please try again.');
//         }
//       });
//     }
//   }

//   updateImageUrl(): void {
//     if (this.imageUrl && this.user?.id) {
//       this.userService.updateProfileImageUrl(this.imageUrl).subscribe({
//         next: (response) => {
//           if (this.user) {
//             this.user.profileImage = response.imageUrl;
//             this.showImageEdit = false;
//             this.imageUrl = '';
//           }
//         },
//         error: (error) => {
//           console.error('Error updating image URL:', error);
//           alert('Failed to update image URL. Please try again.');
//         }
//       });
//     }
//   }

//   handleImageError(event: Event): void {
//     const img = event.target as HTMLImageElement;
//     img.src = this.defaultAvatar;
//   }

//   addNewProduct(): void {
//     if (this.user?.id) {
//       const productToAdd = {
//         ...this.newProduct,
//         userId: this.user.id
//       };

//       this.productService.createProduct(productToAdd).subscribe({
//         next: (createdProduct) => {
//           this.userProducts.push(createdProduct);
//           this.newProduct = {
//             id: 0,
//             title: '',
//             description: '',
//             price: 0,
//             category: '',
//             image: '',
//             userId: 0
//           };
//           this.showAddProductForm = false;
//           console.log('Product added:', createdProduct);
//         },
//         error: (error) => {
//           console.error('Error adding product:', error);
//           alert('Failed to add product. Please try again.');
//         }
//       });
//     }
//   }

//   editProduct(product: Product): void {
//     // Implement edit functionality
//     console.log('Edit product:', product);
//   }

//   deleteProduct(productId: number): void {
//     if (confirm('Are you sure you want to delete this product?')) {
//       this.productService.deleteProduct(productId).subscribe({
//         next: () => {
//           this.userProducts = this.userProducts.filter(p => p.id !== productId);
//           console.log('Product deleted:', productId);
//         },
//         error: (error) => {
//           console.error('Error deleting product:', error);
//           alert('Failed to delete product. Please try again.');
//         }
//       });
//     }
//   }
// }


