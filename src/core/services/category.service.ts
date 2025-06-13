import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  URL = 'http://localhost:3000/categories';

  constructor(private http: HttpClient) { }

  getCategories() {
    return this.http.get(this.URL);
  }
}
