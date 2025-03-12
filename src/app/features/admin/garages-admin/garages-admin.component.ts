import { Component, ViewChild, AfterViewInit, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators, FormsModule } from '@angular/forms';
import { GarageService } from './../../../services/garage.service';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { catchError, of, tap } from 'rxjs';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-garages',
  templateUrl: './garages-admin.component.html',
  styleUrls: ['./garages-admin.component.scss'],
  imports: [CommonModule, ReactiveFormsModule,FormsModule]
})
export class GaragesAdminComponent implements OnInit, AfterViewInit {
  [x: string]: any;
  garageadminForm!: FormGroup;
  garageadminForm2!: FormGroup;
  garages: any[] = [];
  displaygarages: any[] = [];
  openingHours: any[] = [];
  openingHours2: any[] = [];
  text = "&nbsp;";
  maxOpeningHours = 6;
  selectedDays: string[] = [];
  selectedDays2: string[] = [];
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
      openingHours: this.fb.array([])
    });

    this.loadGarages();
  }

  loadGarages(): void {
    this.garageService.getGarages().subscribe((data: any) => {
      this.displaygarages = data;
      
      // Ensure each garage has an openingHours array
      this.displaygarages.forEach(garage => {
        if (!garage.openingHours) {
          garage.openingHours = [];
        }
      });
    });
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
    if (this.openingHoursFormArray.length >= 7) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "You can only add up to 7 opening hours (one for each day).",
      });
      return;
    }
    
    const selectedDays = this.openingHoursFormArray.controls.map(control => 
      control.get('day')?.value
    ).filter(day => day);
    
    const availableDay = this.days.find(day => 
      !selectedDays.includes(day)
    ) || '';
    
    const newOpeningHourGroup = this.fb.group({
      idOpeningHour: [''],
      day: [availableDay, [Validators.required, this.validateDaySelection.bind(this)]],
      openingTime: ['09:00', Validators.required],
      closingTime: ['17:00', Validators.required]
    });
    
    this.openingHoursFormArray.push(newOpeningHourGroup);
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
          Swal.fire({
            position: "center",
            icon: "success",
            title: "added successfully",
            showConfirmButton: false,
            timer: 1500
          });
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
      Swal.fire({
        title: "Form Is Not Valid",
        showClass: {
          popup: `
            animate__animated
            animate__fadeInUp
            animate__faster
          `
        },
        hideClass: {
          popup: `
            animate__animated
            animate__fadeOutDown
            animate__faster
          `
        }
      });
    }
  }

  isDaySelected(garage: any, day: string, currentIndex: number): boolean {
  if (!garage.openingHours) return false;
  
  // Check if the day is selected in any other opening hour entry
  return garage.openingHours.some((hour: any, index: number) => 
    hour.day === day && index !== currentIndex
  );
  }

  addOpeningHour2(garage: any): void {
  if (garage.openingHours && garage.openingHours.length >= 7) {
    alert('You can only add up to 7 opening hours (one for each day).');
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "You can only add up to 7 opening hours (one for each day).",
    });
    return;
  }
  
  const availableDay = this.days.find(day => 
    !garage.openingHours.some((hour: any) => hour.day === day)
  ) || '';
  
  const newOpeningHour = {
    day: availableDay,
    openingTime: '09:00',
    closingTime: '17:00'
  };
  
  if (!garage.openingHours) {
    garage.openingHours = [];
  }
  
  garage.openingHours.push(newOpeningHour);
  }
  
  removeOpeningHour2(garage: any, index: number,idd: number): void {
    // Remove the opening hour at the specified index
    console.log("the garage before remove = ",garage);
    console.log("the id  of O_P= ", idd);
    if (garage.openingHours && garage.openingHours.length > index) {
      garage.openingHours.splice(index, 1);
    }
    console.log("the garage after remove = ",garage);
    console.log("the index = ",index);

    this.garageService.DeleteOpeningHour(idd).pipe(
      tap((response: any) => {
        console.log('Opening Hour deleted successfully:', response);
      }),
      catchError((error) => {
        console.error('Error deleting opening hour:', error);
        return of(null);
      })
    ).subscribe();

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
    
    const formArray = this.openingHoursFormArray;
    
    const isDuplicate = formArray.controls.some((formGroup, index) => {
      const dayControl = formGroup.get('day');
      if (dayControl === control) return false;
      return dayControl?.value === control.value;
    });
    
    return isDuplicate ? { dayTaken: true } : null;
  }

  isDaySelectedInForm(day: string, currentIndex: number): boolean {
    return this.openingHoursFormArray.controls.some((formGroup, index) => {
      if (index === currentIndex) return false;
      return formGroup.get('day')?.value === day;
    });
  }

  deleteGarage(id: number): void {
    console.log("the id is  =",id);
    this.garageService.deleteGarage(id).pipe(
      tap((response: any) => {
        console.log('Garage deleted successfully:', response);
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Garage deleted successfully",
          showConfirmButton: false,
          timer: 1500
        });
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
           Swal.fire({
            position: "center",
            icon: "success",
            title: "Garage updated successfully",
            showConfirmButton: false,
            timer: 1500
          });
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


