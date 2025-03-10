import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import {map} from "rxjs/operators";

export interface Car {
  id: number;
  make: string;
  model: string;
  year: number;
  body_Style: string[];
  millage: number;
}

@Injectable({
  providedIn: 'root'
})
export class CarService {
  private apiUrl = 'https://localhost:7202/api/car';
  private apiUrl2 = 'https://localhost:7202/api/AllCars';



  constructor(private http: HttpClient) {}

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }

  getCars(): Observable<Car[]> {
    const headers = this.getAuthHeaders();
    return this.http.get<Car[]>(`${this.apiUrl}/GetCars`, { headers });
  }

  getAllMakes(): Observable<string[]> {
    return this.http.get<string[]>(`${this.apiUrl2}/all-makes`);
  }

  addCar(car: Car): Observable<Car> {
    const headers = this.getAuthHeaders().set('Content-Type', 'application/json');
    return this.http.post<Car>(`${this.apiUrl}/AddCar`, car, { headers });
  }

  getMaintenanceSuggestions(year: string, make: string, model: string, millage: string): Observable<string[]> {
    const headers = this.getAuthHeaders().set('Content-Type', 'application/json');
    const body = { year, make, model, millage };
    return this.http.post<{ suggestions: string | string[] }>(`${this.apiUrl}/GetMaintenanceSuggestions`, body, { headers })
      .pipe(
        map(response => {
          const suggestions = response.suggestions;
          if (Array.isArray(suggestions)) {
            return suggestions;
          } else if (typeof suggestions === 'string') {
            return suggestions.split('\n').filter(item => item.trim() !== '');
          }
          return [];
        })
      );
  }


  updateCar(carId: number, newMileage: number): Observable<Car> {
    const headers = this.getAuthHeaders().set('Content-Type', 'application/json');
    return this.http.put<Car>(`${this.apiUrl}/UpdateCar/${carId}`, newMileage, { headers });
  }


  deleteCar(carId: number): Observable<void> {
    const headers = this.getAuthHeaders();
    return this.http.delete<void>(`${this.apiUrl}/DeleteCar/${carId}`, { headers });
  }

  getYears(): Observable<number[]> {
    return this.http.get<number[]>(`${this.apiUrl2}/years`);
  }

  getMakes(year: number): Observable<string[]> {
    return this.http.get<string[]>(`${this.apiUrl2}/makes?year=${year}`);
  }

  getModels(year: number, make: string): Observable<string[]> {
    return this.http.get<string[]>(`${this.apiUrl2}/models?year=${year}&make=${make}`);
  }

  getStyles(year: number, make: string, model: string): Observable<string[]> {
    return this.http.get<string[]>(`${this.apiUrl2}/styles?year=${year}&make=${make}&model=${model}`);
  }

  getCarById(carId: number): Observable<Car> {
    const headers = this.getAuthHeaders();
    return this.http.get<Car>(`${this.apiUrl}/GetCar/${carId}`, { headers });
  }
}
