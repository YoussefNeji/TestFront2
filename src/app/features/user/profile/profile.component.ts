import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators,ReactiveFormsModule } from '@angular/forms';
import { UserService } from '../UserService';
import Swal from 'sweetalert2';
import { NgModule } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  standalone : true,
  imports: [ReactiveFormsModule]
})
export class ProfileComponent implements OnInit {
  userInfo: any = {};
  apiUrl: string = 'https://localhost:7202/api/Profile/user-info';
  countries: any[] = [];
  profileForm: FormGroup;

  username: string = '';
  phone: string = '';
  dateOfBirth: string = '';
  gender: string = '';
  country: string = '';
  cin: string = '';
  address: string = '';



  constructor(private fb: FormBuilder,private http: HttpClient, private userService: UserService) {

    this.profileForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      dateOfBirth: ['', Validators.required],
      gender: ['', Validators.required],
      country: ['', Validators.required],
      cin: ['', Validators.required],
      address: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.getUserProfile();
    const token = localStorage.getItem('token');
    console.log('Token while finding user infos :', token);
    const email = localStorage.getItem('email');
    const username = localStorage.getItem('username');
    console.log('Email while finding user infos :', email);
    console.log('Username while finding user infos :', username);


  }



  ngAfterViewInit(): void {
    setTimeout(() => {
      this.populateForm();
    }, 500);
  }

  getUserProfile(): void {
    const token = localStorage.getItem('token');
    console.log('Token in profile compoonent is :', token);


    if (token) {
      this.http.get(this.apiUrl, {
        headers: { 'Authorization': `Bearer ${token}` }
      }).subscribe(
        (data: any) => {
          console.log('Raw API response:', data);
          this.userInfo = data;
          this.populateForm();
        },
        (error) => {
          console.error('Error fetching user profile', error);
        }
      );
    } else {
      console.error('Token is missing!');
    }
  }


  populateForm(): void {
    const { username, email, phone, gender, country,dateOfBirth, address, cin } = this.userInfo;
    console.log('Username:', username);
    console.log('Email:', email);
    console.log('Phone:', phone);
    console.log('Date field:', dateOfBirth);
    console.log('Gender:', gender);
    console.log('Country:', country);
    console.log('Address:', address);
    console.log('CIN:', cin);

    (<HTMLInputElement>document.getElementById('username')).value = username;
    (<HTMLInputElement>document.getElementById('email')).value = email;
    (<HTMLInputElement>document.getElementById('phone')).value = phone;
    (<HTMLInputElement>document.getElementById('dateOfBirth')).value = dateOfBirth ? dateOfBirth.split('T')[0] : '';
    (<HTMLSelectElement>document.getElementById('gender')).value = gender;
    (<HTMLSelectElement>document.getElementById('country')).value = country;
    (<HTMLInputElement>document.getElementById('address')).value = address;
    (<HTMLInputElement>document.getElementById('cin')).value = cin;





  }

  onSubmitupdate() {


    const username = (<HTMLInputElement>document.getElementById('username')).value;
    const phone = (<HTMLInputElement>document.getElementById('phone')).value;
    const dateOfBirth = (<HTMLInputElement>document.getElementById('dateOfBirth')).value;
    const gender = (<HTMLSelectElement>document.getElementById('gender')).value;
    const country = (<HTMLSelectElement>document.getElementById('country')).value;
    const cin = (<HTMLInputElement>document.getElementById('cin')).value;
    const address = (<HTMLInputElement>document.getElementById('address')).value;
    console.log('Collected form values:', {
      username, phone, dateOfBirth, gender, country, cin, address
    });

    const validationErrors: string[] = [];

    // Check if any field is empty
    if (!username) validationErrors.push("Username cannot be empty");
    if (!phone) validationErrors.push("Phone number cannot be empty");
    if (!dateOfBirth) validationErrors.push("Date of birth cannot be empty");
    if (!gender) validationErrors.push("Gender cannot be empty");
    if (!country) validationErrors.push("Country cannot be empty");
    if (!cin) validationErrors.push("CIN cannot be empty");
    if (!address) validationErrors.push("Address cannot be empty");

    if (phone && phone.length < 8) {
      validationErrors.push("Phone number must be at least 8 characters");
    }
    if (cin && cin.length < 8) {
      validationErrors.push("CIN must be at least 8 characters");
    }
    if (validationErrors.length > 0) {
      Swal.fire({
        icon: 'error',
        title: 'Validation Failed',
        html: `<ul>${validationErrors.map(error => `<li>${error}</li>`).join('')}</ul>`,
        confirmButtonText: 'OK',
      });
    }

    const userUpdate = {
      username,
      phone,
      dateOfBirth,
      gender,
      country,
      cin,
      address
    };

    const token = localStorage.getItem('token');

    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    this.http.put('https://localhost:7202/api/Profile/update', userUpdate, { headers })
      .subscribe(
        response => {
          console.log('Profile updated successfully', response);
        },
        error => {
          console.error('Error updating profile:', error);
        }
      );
  }



}
