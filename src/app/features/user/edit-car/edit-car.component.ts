import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { CommonModule } from '@angular/common';
import { CarService } from "../../../services/car.service";

@Component({
  selector: "app-edit-car",
  templateUrl: "./edit-car.component.html",
  styleUrls: ["./edit-car.component.scss"],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ]
})
export class EditCarComponent implements OnInit {
  carForm: FormGroup;
  carId!: number;
  car: any;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private carService: CarService,
  ) {
    this.carForm = this.fb.group({
      year: ["", [Validators.required, Validators.min(1900), Validators.max(new Date().getFullYear() + 1)]],
      make: ["", Validators.required],
      model: ["", Validators.required],
      bodyStyle: ["", Validators.required],
      mileage: ["", [Validators.required, Validators.min(0)]],
    });
  }

  ngOnInit() {
    this.carId = +this.route.snapshot.paramMap.get("id")!;
    this.loadCarDetails();
  }

  loadCarDetails() {
    this.carService.getCarById(this.carId).subscribe(
      (car) => {
        this.car = car;
        this.carForm.patchValue({
          year: car.year,
          make: car.make,
          model: car.model,
          bodyStyle: car.body_Style && car.body_Style.length ? car.body_Style[0] : "",
          mileage: car.millage,
        });
      },
      (error) => console.error("Error loading car details:", error)
    );
  }

  onSubmit() {
    if (this.carForm.valid) {
      const newMileage = this.carForm.value.mileage;
      this.carService.updateCar(this.carId, newMileage).subscribe(
        () => {
          this.router.navigate(['/vehicle']);
        },
        (error) => console.error("Error updating car mileage:", error)
      );
    }
  }

  onCancel() {
    this.router.navigate(['/vehicle']);
  }
}
