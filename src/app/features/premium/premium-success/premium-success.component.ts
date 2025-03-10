import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PaymentService } from '../../../services/payment.service';

@Component({
  selector: 'app-premium-success',
  template: `
    <div class="container">
      <h2>Processing Your Premium Upgrade...</h2>
      <p>Please wait while we confirm your payment.</p>
    </div>
  `,
  styles: [`
    .container {
      text-align: center;
      margin-top: 50px;
    }
  `]
})
export class PremiumSuccessComponent implements OnInit {
  constructor(private route: ActivatedRoute, private paymentService: PaymentService, private router: Router) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      const sessionId = params['session_id'];
      console.log('session_id', sessionId);
      if (sessionId) {
        this.paymentService.updateUpgradeStatus(sessionId).subscribe({
          next: () => {
            this.router.navigate(['/dashboard']);
          },
          error: (err) => {
            console.error("Upgrade failed:", err);
            this.router.navigate(['/payment']);
          }
        });
      } else {
        alert("Invalid session ID.");
        // this.router.navigate(['/']); // Redirect to home
      }
    });
  }
}
