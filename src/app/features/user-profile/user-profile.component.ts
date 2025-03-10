import { Component, OnInit } from '@angular/core';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {NgForOf} from "@angular/common";
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {jwtDecode} from "jwt-decode";
import {AuthService} from "../../services/auth.service";
import {CountryService} from "../../services/country.service";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  imports: [
    NgForOf,
    ReactiveFormsModule,
    RouterLink, HttpClientModule, ReactiveFormsModule, MatInputModule, MatButtonModule, MatIconModule, RouterLink, FormsModule
  ],
  standalone: true,
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  userName: string | null = '';
  email: string | null = '';
  userProfileForm: FormGroup;
  countries: any[] = [];
  hidePassword = true;
  hideConfirmPassword = true;

  constructor(private fb: FormBuilder,private route: ActivatedRoute, private authService: AuthService, private router: Router, private countryService: CountryService,) {
    this.userProfileForm = this.fb.group({

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
    this.route.queryParams.subscribe(params => {
      const token = params['token'];
      if (token) {
        localStorage.setItem('token', token);
        const decodedToken: any = jwtDecode(token);
        this.userName = decodedToken.sub;
        this.email= decodedToken.email;
        console.log('userName', this.userName);
        if (this.userName) {
          localStorage.setItem('userName', this.userName);
        }
        if (this.email) {
          localStorage.setItem('email', this.email);}
      }
      console.log('userName', this.userName);
      console.log('email', this.email);
    });
  }


  checkPasswords(group: FormGroup) {
    const pass = group.get('password')?.value;
    const confirmPass = group.get('confirmPassword')?.value;
    return pass === confirmPass ? null : { notSame: true };
  }
  /* onSubmit(): void {
     if (this.userProfileForm.valid) {
       this.http.post('https://localhost:7202/api/user', this.userProfileForm.value).subscribe(response => {
         console.log('register completed successfully');
       });
     }
   }*/
  onSubmit() {
    if (this.userProfileForm.valid) {
      const formData = {
        ...this.userProfileForm.value,
        username: this.userName,
        email: this.email
      };
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
