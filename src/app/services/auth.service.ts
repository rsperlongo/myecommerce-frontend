import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { User } from '../interfaces/user';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private http = inject(HttpClient);
  private readonly TOKEN_KEY = 'auth_token';
  private readonly API_URL = 'https://api.example.com';


  isAuthenticated = signal(false);

  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  constructor() {
    const token = this.getToken();
    if (token) {
      this.isAuthenticated.set(true);
    }
  }

  login(credentials: { email: string; password: string }): Observable<any> {
    return this.http.post(`${this.API_URL}/auth/login`, credentials, httpOptions).pipe(
      tap((response: any) => {
        if (response.token) {
          localStorage.setItem(this.TOKEN_KEY, response.token);
          this.isAuthenticated.set(true);
        }
      })
    );
  }

  logout(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    this.isAuthenticated.set(false);
    this.currentUserSubject.next(null);
  }

  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  // Mock login for demo (remove when API is ready)
  mockLogin(credentials: { email: string; password: string }): Observable<any> {
    // Simulate API call
    return new Observable(observer => {
      setTimeout(() => {
        if (credentials.email === 'test@example.com' && credentials.password === 'password') {
          const mockResponse = { token: 'mock-jwt-token' };
          localStorage.setItem(this.TOKEN_KEY, mockResponse.token);
          this.isAuthenticated.set(true);
          observer.next(mockResponse);
          observer.complete();
        } else {
          observer.error({ message: 'Invalid credentials' });
        }
      }, 1000);
    });
  }
}
