import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GarageService {
  private apiUrl = 'https://localhost:7202/api/Garage';

  constructor(private http: HttpClient) {}

  getGarages(): Observable<any> {
    return this.http.get(`${this.apiUrl}/GetGarages`);
  }

  addGarage(garage: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/AddGarage`, garage);
  }

  deleteGarage(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/DeleteGarage/${id}`);
  }

  updateGarage(id: any,garage: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/UpdateGarage/${id}`, garage);
  }



}
