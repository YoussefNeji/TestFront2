import { Component, OnInit } from '@angular/core';
import { CarService, Car } from '../../../services/car.service';
import { NgClass, NgForOf } from '@angular/common';
import {RouterLink} from "@angular/router";

interface Vehicle {
  id: number;
  make: string;
  model: string;
  year: number;
  bodyType: string[];
  mileage: number;
  lastCheck: string;
  condition: 'Excellent' | 'Good' | 'Fair' | 'Need Check';
  insuranceValidUntil: string;
}

@Component({
  selector: 'app-vehicles',
  templateUrl: './vehicles.component.html',
  styleUrls: ['./vehicles.component.scss'],
  imports: [NgClass, NgForOf, RouterLink]
})
export class VehiclesComponent implements OnInit {
  vehicles: Vehicle[] = [];
  filteredVehicles: Vehicle[] = [];
  manufacturers: string[] = [];

  constructor(private carService: CarService) { }

  ngOnInit(): void {
    this.loadVehicles();
    this.loadAllManufacturers();
  }

  loadVehicles(): void {
    this.carService.getCars().subscribe(
      (cars: Car[]) => {
        this.vehicles = cars.map(car => ({
          id: car.id,
          make: car.make,
          model: car.model,
          year: car.year,
          bodyType: car.body_Style,
          mileage: car.millage,
          lastCheck: '',
          condition: 'Good',
          insuranceValidUntil: ''
        }));
        this.filteredVehicles = this.vehicles;
      },
      error => {
        console.error('Error loading vehicles', error);
      }
    );
  }

  onSearch(event: Event): void {
    const searchTerm = (event.target as HTMLInputElement).value.toLowerCase();
    this.filteredVehicles = this.vehicles.filter(vehicle =>
      vehicle.make.toLowerCase().includes(searchTerm) ||
      vehicle.model.toLowerCase().includes(searchTerm)
    );
  }


  onEditVehicle(vehicle: Vehicle): void {
  }

  onDeleteVehicle(vehicle: Vehicle): void {
    this.carService.deleteCar(vehicle.id).subscribe(() => {
      this.vehicles = this.vehicles.filter(v => v !== vehicle);
      this.filteredVehicles = this.filteredVehicles.filter(v => v !== vehicle);
    });
  }

  onFilterChange(event: Event, filterType: string): void {
    const filterValue = (event.target as HTMLSelectElement).value;
    if (filterType === 'manufacturer') {
      this.filteredVehicles = this.vehicles.filter(vehicle =>
        filterValue ? vehicle.make === filterValue : true
      );
    } else if (filterType === 'status') {
      this.filteredVehicles = this.vehicles.filter(vehicle =>
        filterValue ? vehicle.condition === filterValue : true
      );
    }
  }

  onSortChange(event: Event): void {
    const sortValue = (event.target as HTMLSelectElement).value;
    if (sortValue === 'newest') {
      this.filteredVehicles.sort((a, b) => b.year - a.year);
    } else if (sortValue === 'oldest') {
      this.filteredVehicles.sort((a, b) => a.year - b.year);
    } else if (sortValue === 'mileageLow') {
      this.filteredVehicles.sort((a, b) => a.mileage - b.mileage);
    } else if (sortValue === 'mileageHigh') {
      this.filteredVehicles.sort((a, b) => b.mileage - a.mileage);
    }
  }


  loadAllManufacturers(): void {
    this.carService.getAllMakes().subscribe((makes) => {
      this.manufacturers = makes;
    });
  }
}
