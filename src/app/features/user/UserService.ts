import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrlypdate = 'https://localhost:7202/api/Profile/update';

  constructor(private http: HttpClient) {}

  updateUserByEmail(email: string, userData: any): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.put<any>(`${this.apiUrlypdate}?email=${email}`, userData, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }});
  }
}
