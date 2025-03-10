import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'https://localhost:7202/api/jwtauth/auth';

  constructor(private http: HttpClient) {}

  login(username: string | null | undefined, password: string | null | undefined) {
    return this.http.post<any>(`${this.apiUrl}/login`, { username, password });
  }

  register(username: string, email: string, password: string): Observable<string> {
    const body = { username, email, password };
    return this.http.post(this.apiUrl + '/register', body, { responseType: 'text' });
  }

  getToken() {
    return localStorage.getItem('token');
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }
  logout() {
    localStorage.removeItem('token');
  }
}
