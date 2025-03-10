import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  private apiUrl = 'https://localhost:7202/api/premium';

  constructor(private http: HttpClient) {}

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }

  createPaymentSession(): Promise<any> {
    const headers = this.getAuthHeaders().set('Content-Type', 'application/json');
    return this.http.post<any>(`${this.apiUrl}/upgrade`, {}, { headers }).toPromise();
  }

  getPaymentStatus(): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.get<any>(`${this.apiUrl}/status`, { headers });
  }


  updateUpgradeStatus(sessionId: string): Observable<void> {
    const headers = this.getAuthHeaders();
    return this.http.post<void>(`${this.apiUrl}/upgrade/success?session_id=${sessionId}`, null, { headers });
  }


  cancelPayment(): Observable<void> {
    const headers = this.getAuthHeaders();
    return this.http.post<void>(`${this.apiUrl}/cancel`, null, { headers });
  }
}
