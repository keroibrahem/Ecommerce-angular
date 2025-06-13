import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  URL = 'http://localhost:3000/products';
  URLOfars = 'http://localhost:3000/ofars';
  constructor(private http: HttpClient) { }
  getProducts() {
    return this.http.get(this.URL);
  }

  getOfars() {
    return this.http.get(this.URLOfars);
  }
  getProductById(id: number) {
    return this.http.get(`${this.URL}?id=${id}`);
  }
  getProductsByCategory(category: string) {
    return this.http.get(`${this.URL}?category=${category}`);
  }
  addProduct(product: any) {
    return this.http.post(this.URL, product);
  }
  updateProduct(id: number, product: any) {
    return this.http.put(`${this.URL}/${id}`, product);
  }
  deleteProduct(id: number) {
    return this.http.delete(`${this.URL}/${id}`);
  }
  searchProducts(query: string) {
    return this.http.get(`${this.URL}?q=${query}`);
  }
  getProductsByPriceRange(min: number, max: number) {
    return this.http.get(`${this.URL}?price_gte=${min}&price_lte=${max}`);
  }
  getProductsByRating(rating: number) {
    return this.http.get(`${this.URL}?rating_gte=${rating}`);
  }
  getProductsByBrand(brand: string) {
    return this.http.get(`${this.URL}?brand=${brand}`);
  }
  getUserProducts(userId: number) {
    return this.http.get(`${this.URL}?userId=${userId}`);
  }
  




}
