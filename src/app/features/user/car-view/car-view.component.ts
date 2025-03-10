import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Car, CarService } from '../../../services/car.service';
import { NgForOf, NgIf } from '@angular/common';
import {MatIcon} from "@angular/material/icon";

@Component({
  selector: 'app-car-view',
  templateUrl: './car-view.component.html',
  styleUrls: ['./car-view.component.scss'],
  imports: [
    NgIf,
    NgForOf,
    MatIcon
  ]
})
export class CarViewComponent implements OnInit {
  car: Car | null = null;
  maintenanceItems: string[] = [];

  constructor(
    private route: ActivatedRoute,
    private carService: CarService,
  ) {}

  ngOnInit() {
    const carId = this.route.snapshot.paramMap.get('id');
    if (carId) {
      this.loadCarDetails(+carId);
    }
  }

  loadCarDetails(carId: number) {
    this.carService.getCarById(carId).subscribe(
      (car) => {
        this.car = car;
        this.getMaintenanceSuggestions();
      },
      (error) => console.error('error loading car details:', error),
    );
  }

  getMaintenanceSuggestions() {
    if (this.car) {

      this.carService
        .getMaintenanceSuggestions(this.car.year.toString(), this.car.make, this.car.model, this.car.millage.toString())
        .subscribe(
          (suggestions) => {
            this.maintenanceItems = suggestions;
          },
          (error) => console.error('error getting maintenance suggestions:', error)
        );
    }
  }
}
