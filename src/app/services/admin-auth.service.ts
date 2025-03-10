import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable} from "rxjs";
import {Router} from "@angular/router";
import {tap} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class AdminAuthService {
  private apiUrl = 'https://localhost:7202/api/AdminAuth';

  constructor(private http: HttpClient,private router: Router) {}

  login(email: string | null | undefined, password: string | null | undefined): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, { email, password }).pipe(
      tap(response => {
        localStorage.setItem('token', response.token);
        console.log ('Token:', response.token);
      })
    );
  }

}
