import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {Router, RouterLink} from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatIcon} from "@angular/material/icon";
import {MatButton} from "@angular/material/button";
import {jwtDecode} from "jwt-decode";
import {MatCheckbox} from "@angular/material/checkbox";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  imports: [
    ReactiveFormsModule,
    MatLabel,
    MatFormField,
    MatInput,
    MatIcon,
    MatButton,
    RouterLink,
    MatCheckbox
  ],
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  userName: string | null = '';
  loginForm: FormGroup;
  hidePassword = true;

  constructor(private fb: FormBuilder, private router: Router, private authService: AuthService) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      rememberMe: [false]
    });
  }


  ngOnInit() {}



  signInWithFacebook() {
    this.authService.loginWithFacebook();
  }
  signInWithGitHub() {
    this.authService.loginWithGitHub();
  }

  signInWithGoogle() {
    this.authService.loginWithGoogle();
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      this.authService.login(email, password).subscribe({
        next: (response) => {
          localStorage.setItem('token', response.token);
          this.router.navigate(['/dashboard']);
        },
        error: (err) => {
          console.error(err);
          this.router.navigate(['/register']);
        },
      });
    }
  }

  signInWithApple() {

  }
}
