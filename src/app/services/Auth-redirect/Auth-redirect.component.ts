import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-auth-redirect',
  templateUrl: './Auth-redirect.component.html',
  styleUrls: ['./Auth-redirect.component.scss'],
})
export class AuthRedirectComponent implements OnInit {
  email: string | null = '';

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const token = params['token'];
      const email = params['email'];
      if (token) {
        localStorage.setItem('token', token);
        const decodedToken: any = jwtDecode(token);
        console.log('Decoded token:', decodedToken);
      }
      if (email) {
        this.email = email;
        console.log('User email from auth redirect:', this.email);

        if (this.email) {
          localStorage.setItem('email', this.email);
          
        }
      }
      console.log('Token from user profile:', token);
      this.router.navigate(['/dashboard']);
    });
  }
}
