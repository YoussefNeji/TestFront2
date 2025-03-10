import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { MatCheckbox } from "@angular/material/checkbox";
import { MatOption, MatSelect } from "@angular/material/select";
import { MatRadioButton, MatRadioGroup } from "@angular/material/radio";
import { MatDatepicker, MatDatepickerInput, MatDatepickerToggle } from "@angular/material/datepicker";
import { MatButtonToggle, MatButtonToggleGroup } from "@angular/material/button-toggle";
import {NgForOf, NgIf} from "@angular/common";
import { HttpClientModule } from '@angular/common/http';
import {CountryService} from "../../../services/country.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  standalone: true,
  imports: [HttpClientModule, ReactiveFormsModule, MatInputModule, MatButtonModule, MatIconModule, RouterLink, FormsModule, MatCheckbox, MatSelect, MatOption, MatRadioButton, MatRadioGroup, MatDatepickerToggle, MatDatepickerInput, MatDatepicker, MatButtonToggle, MatButtonToggleGroup, NgForOf, NgIf]
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  hidePassword = true;
  hideConfirmPassword = true;
  countries: any[] = [];

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router, private countryService: CountryService,) {
    this.registerForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [
        /*Validators.required,
        Validators.minLength(8),
        Validators.pattern(/^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/),
     */ ]],
      confirmPassword: ['', Validators.required],
      phone: ['', Validators.required],
      cin: ['', Validators.required],
      dateOfBirth: ['', Validators.required],
      gender: ['', Validators.required],
      country: ['', Validators.required],
      address: ['', Validators.required],
      terms: [false, Validators.requiredTrue]
    }, { validator: this.checkPasswords });

  }

  ngOnInit(): void {
    this.countryService.getCountries().subscribe(data => {
      this.countries = data;
    });
  }

  checkPasswords(group: FormGroup) {
    const pass = group.get('password')?.value;
    const confirmPass = group.get('confirmPassword')?.value;
    return pass === confirmPass ? null : { notSame: true };
  }

  signInWithGoogle() {
    this.authService.registerWithGoogle();
  }

  signInWithGitHub() {
    this.authService.registerWithGitHub();
  }
  signInWithApple() {
  }

  onSubmit() {
    if (this.registerForm.valid) {
      const formData = this.registerForm.value;
      this.authService.register(formData).subscribe({
        next: (response) => {
          console.log('Registration successful', response);
          this.router.navigate(['/login']);
        },
        error: (err) => {
          console.error('Registration failed', err);
        }
      });
    }
  }
}
