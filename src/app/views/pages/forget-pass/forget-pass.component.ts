import { Component, isStandalone } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { CommonModule } from '@angular/common'; 

@Component({
  selector: 'app-forget-pass',
  imports: [FormsModule, CommonModule],
  templateUrl: './forget-pass.component.html',
  styleUrl: './forget-pass.component.scss',
  standalone: true,
})
export class ForgetPassComponent {

    email = '';
    message = '';
  
    constructor(private authService: AuthService) {}
  
    sendResetLink() {
      this.authService.forgotPassword(this.email).subscribe({
        
        next: () => this.message = 'A password reset link has been sent to your email.',
        
        //error: () => this.message = 'Error sending reset link.'
      });
      console.log(this.email);
    }
  }
