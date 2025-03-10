import { Component } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { AdminAuthService } from '../../../services/admin-auth.service';
import { Router, RouterLink } from '@angular/router';
@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.scss'],
  imports: [
    ReactiveFormsModule
],
})
export class AdminLoginComponent {
  loginForm: FormGroup;
  hidePassword = true;

  constructor (private fb: FormBuilder,private router: Router, private AdminAuthService: AdminAuthService) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      rememberMe: [false]
    });
  }
  ngOnInit(): void {
    console.log('Hello from AdminLoginComponent');
    
  }

  onSubmit() {
    console.log('Form:', this.loginForm.value);
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      this.AdminAuthService.login(email, password).subscribe({
        next: (response) => {
          localStorage.setItem('token', response.token);
          this.router.navigate(['/dashboard-admin']);
        },
        error: (err) => {
          console.error(err);
          console.log('Error:', err);
        },
      });
    }
  }


}
