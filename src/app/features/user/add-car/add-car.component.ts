import { Component, OnInit } from "@angular/core";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import { NgForOf, NgIf } from "@angular/common";
import { MatIconModule } from "@angular/material/icon";
import { CarService, Car } from "../../../services/car.service";
import {Router} from "@angular/router";

@Component({
  selector: "app-add-car",
  templateUrl: "./add-car.component.html",
  styleUrls: ["./add-car.component.scss"],
  standalone: true,
  imports: [NgForOf, NgIf, MatIconModule, ReactiveFormsModule]
})
export class AddCarComponent implements OnInit {

  carForm: FormGroup;
  useObd: boolean = true;


  obdYears: number[] = [];
  obdMakes: string[] = [];
  obdModels: string[] = [];
  obdStyles: string[] = [];



  constructor(
    private fb: FormBuilder,
    private carService: CarService,
    private router: Router
  ) {
    this.carForm = this.fb.group({
      year: ["", Validators.required],
      make: ["", Validators.required],
      model: ["", Validators.required],
      bodyType: ["", Validators.required],
      millage: ["", [Validators.required, Validators.min(0)]],
      entryType: ["obd", Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadObdYears();

    this.carForm.get("entryType")?.valueChanges.subscribe((value) => {
      this.useObd = (value === "obd");
    });

    this.carForm.get("year")?.valueChanges.subscribe((year: number) => {
      if (this.useObd && year) {
        this.loadObdMakes(year);
      }
    });
    this.carForm.get("make")?.valueChanges.subscribe((make: string) => {
      const year = this.carForm.get("year")?.value;
      if (this.useObd && year && make) {
        this.loadObdModels(year, make);
      }
    });
    this.carForm.get("model")?.valueChanges.subscribe((model: string) => {
      const year = this.carForm.get("year")?.value;
      const make = this.carForm.get("make")?.value;
      if (this.useObd && year && make && model) {
        this.loadObdStyles(year, make, model);
      }
    });
  }

  loadObdYears(): void {
    this.carService.getYears().subscribe((years) => {
      this.obdYears = years;
    });
  }

  loadObdMakes(year: number): void {
    this.carService.getMakes(year).subscribe((makes) => {
      this.obdMakes = makes;
    });
  }

  loadObdModels(year: number, make: string): void {
    this.carService.getModels(year, make).subscribe((models) => {
      this.obdModels = models;
    });
  }

  loadObdStyles(year: number, make: string, model: string): void {
    this.carService.getStyles(year, make, model).subscribe((styles) => {
      this.obdStyles = styles;
    });
  }

  selectBodyType(type: string): void {
    this.carForm.patchValue({ bodyType: type });
  }

  resetForm(): void {
    this.carForm.reset();
    this.obdMakes = [];
    this.obdModels = [];
    this.obdStyles = [];
  }

  onSubmit(): void {
    if (this.carForm.valid) {
      const formValue = this.carForm.value;
      const newCar: Car = {
        id : 0,
        year: formValue.year,
        make: formValue.make,
        model: formValue.model,
        body_Style: [formValue.bodyType], // Send as a list
        millage: formValue.millage
      };
      this.carService.addCar(newCar).subscribe({
        next: (car) => {
          console.log("Vehicle added successfully", car);
          this.resetForm();
          this.router.navigate(['/vehicle']);
        },
        error: (error) => {
          console.error("Error adding vehicle", error);
        }
      });
    } else {
      this.markFormGroupTouched(this.carForm);
    }
  }

  markFormGroupTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();
    });
  }
}
