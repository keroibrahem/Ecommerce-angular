import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../interfaces/user.model';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/users';

  constructor(private http: HttpClient) { }

  register(userData: User) {
    return this.http.post(this.apiUrl, userData);
  }

  getUsers() {
    return this.http.get<User[]>(this.apiUrl);
  }

  // دالة تسجيل الدخول
  login(email: string, password: string): Observable<User | undefined> {
    return this.getUsers().pipe(
      map(users => users.find(user => user.email === email && user.password === password))
    );
  }
}