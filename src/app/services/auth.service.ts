import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable} from "rxjs";
import {Router} from "@angular/router";
import {tap} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'https://localhost:7202/api/jwtauth/auth';

  constructor(private http: HttpClient,private router: Router) {}

  login(email: string | null | undefined, password: string | null | undefined): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, { email, password }).pipe(
      tap(response => {
        localStorage.setItem('token', response.token);
      })
    );
  }


  private apiUrl2 = 'https://localhost:7202/api/account/account';


  forgotPassword(email: string): Observable<any> {
    return this.http.post(`${this.apiUrl2}/forgot-password`, { email });
  }

  resetPassword(email: string, token: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl2}/reset-password`, { email, token, password });
  }


  loginWithFacebook(): void {
    window.location.href = 'https://localhost:7202/api/jwtauth/auth/facebook';
  }
  loginWithGoogle(): void {
    window.location.href = 'https://localhost:7202/api/jwtauth/auth/googlelogin';
  }
  loginWithGitHub(): void {
    window.location.href = 'https://localhost:7202/api/auth/githubauth/login-github';
  }


  register(formData: any): Observable<string> {
    return this.http.post(this.apiUrl + '/register', formData, { responseType: 'text' });
  }

  getToken() {
    return localStorage.getItem('token');
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  logout() {
    console.log('Before logout:', localStorage.getItem('token'), localStorage.getItem('userName'), localStorage.getItem('email'));
    localStorage.removeItem('token');
    localStorage.removeItem('userName');
    localStorage.removeItem('email');
    console.log('After logout:', localStorage.getItem('token'), localStorage.getItem('userName'), localStorage.getItem('email'));
    this.http.post(`${this.apiUrl}/logout`, {}).subscribe(() => {
      this.router.navigate(['/']);
    });
  }
  registerWithGoogle() {
    window.location.href = 'https://localhost:7202/api/jwtauth/auth/signup-google';
  }

  registerWithGitHub() {

    window.location.href = 'https://localhost:7202/api/auth/githubauth/signup-github';
  }
}
