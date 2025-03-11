import { Component, ViewChild, AfterViewInit, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators, FormsModule } from '@angular/forms';
import { GarageService } from './../../../services/garage.service';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { catchError, of, tap } from 'rxjs';


@Component({
  selector: 'app-garages',
  templateUrl: './garages-admin.component.html',
  styleUrls: ['./garages-admin.component.scss'],
  imports: [CommonModule, ReactiveFormsModule,FormsModule]
})
export class GaragesAdminComponent implements OnInit, AfterViewInit {
  [x: string]: any;
  garageadminForm!: FormGroup;
  garages: any[] = [];
  displaygarages: any[] = [];
  openingHours: any[] = [];
  text = "&nbsp;";
  maxOpeningHours = 6;
  selectedDays: string[] = [];
  days: string[] = [
    'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'
  ];

  @ViewChild('modal') modal: any;
  @ViewChild('closeModal') closeModal: any;

  constructor(private fb: FormBuilder, private garageService: GarageService) {}

  ngOnInit(): void {
    this.garageadminForm = this.fb.group({
      name: ['', Validators.required],
      location: ['', Validators.required],
      contact: ['', Validators.required],
      openingHours: this.fb.array([this.createOpeningHour()])
    });
    this.loadGarages();
  }


  loadGarages(): void {
    this.garageService.getGarages().subscribe((data: any) => {
      this.displaygarages = data;
    }
    );
  }

  ngAfterViewInit() {
    setTimeout(() => {
      if (this.closeModal) {
        this.closeModal.nativeElement.addEventListener('click', () => {
          this.modal?.nativeElement.classList.add('hidden');
        });
      }
    }, 0);
  }

  get openingHoursFormArray(): FormArray {
    return this.garageadminForm.get('openingHours') as FormArray;
  }


  createOpeningHour(): FormGroup {
    return this.fb.group({
      idOpeningHour: [''],
      day: ['', [Validators.required, this.validateDaySelection.bind(this)]],
      openingTime: ['', Validators.required],
      closingTime: ['', Validators.required]
    });
  }

  addOpeningHour(): void {
    if (this.openingHoursFormArray.length < this.maxOpeningHours) {
      this.openingHoursFormArray.push(this.createOpeningHour());
    } else {
      alert('You can only add up to 6 opening hours.');
    }
  }


  removeOpeningHour(index: number): void {
    const removedDay = this.openingHoursFormArray.at(index).value.day;
    this.openingHoursFormArray.removeAt(index);
    this.removeSelectedDay(removedDay);
  }

  onSubmit(): void {
    if (this.garageadminForm.valid) {
      const newGarage = this.garageadminForm.value;
        console.log("Name",newGarage.name);
        console.log("locat",newGarage.location);
        console.log("contact ",newGarage.contact); 
        console.log("the new garage ",newGarage);

      this.garageService.addGarage(newGarage).pipe(
        tap((response: any) => {
          console.log('Garage added successfully:', response);
          this.garages.push(newGarage);
          this.resetForm();
        }),
        catchError((error) => {
          console.error('Error adding garage:', error);
          return of(null);
        })
      ).subscribe();
    } else {
      console.log('Form is not valid');
    }
  }

  resetForm(): void {
    this.garageadminForm.reset();
    this.openingHoursFormArray.clear();
    this.openingHoursFormArray.push(this.createOpeningHour());
    this.selectedDays = [];
  }

  trackSelectedDay(day: string): void {
    if (!this.selectedDays.includes(day)) {
      this.selectedDays.push(day);
    }
  }

  removeSelectedDay(day: string): void {
    const index = this.selectedDays.indexOf(day);
    if (index > -1) {
      this.selectedDays.splice(index, 1);
    }
  }

  validateDaySelection(control: any) {
    if (this.selectedDays.includes(control.value)) {
      return { dayTaken: true };
    }
    return null;
  }


  deleteGarage(id: number): void {
    console.log("the id is  =",id);
    this.garageService.deleteGarage(id).pipe(
      tap((response: any) => {
        console.log('Garage deleted successfully:', response);
        this.garages = this.garages.filter((garage) => garage.id !== id);
      }),
      catchError((error) => {
        console.error('Error deleting garage:', error);
        return of(null);
      })
    ).subscribe();
  }



  editGarage(garage: any): void {
    
    console.log("Updated Garage:", garage);

       const updatedGarage = garage;
       const updatedGarageid = garage.garageId;
      console.log("Updated Garage befor send from the subscribe = ", updatedGarage);

       this.garageService.updateGarage(updatedGarageid, updatedGarage).pipe(
         tap((response: any) => {
           console.log('Garage updated successfully:', response);
         }),
         catchError((error) => {
           console.error('Error updating garage:', error);
             return of(null);
         })
       ).subscribe();


  }

  confirmDelete(id: number): void {
    if (confirm('Are you sure you want to delete this garage?')) {
      this.deleteGarage(id);
    }
  }

}
