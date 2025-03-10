import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-resetpassword',
  imports: [FormsModule, CommonModule],
  templateUrl: './resetpassword.component.html',
  styleUrl: './resetpassword.component.scss'
})
export class ResetpasswordComponent {
  email = '';
  token = '';
  newPassword = '';
  message = '';

  constructor(private authService: AuthService, private route: ActivatedRoute) {}

  ngOnInit() {
    this.email = this.route.snapshot.queryParams['email'];
    this.token = this.route.snapshot.queryParams['token'];
  }

  resetPassword() {
    this.authService.resetPassword(this.email, this.token, this.newPassword).subscribe({
      next: () => this.message = 'Password reset successful.',
      error: () => this.message = 'Error resetting password.'
    });
  }
}