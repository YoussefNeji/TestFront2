import { Component, OnInit } from '@angular/core';
import { PaymentService } from '../../../services/payment.service';
import { loadStripe } from '@stripe/stripe-js';
import {MatProgressSpinner} from "@angular/material/progress-spinner";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  imports: [
    MatProgressSpinner,
    NgIf
  ],
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {
  loading = false;

  constructor(private paymentService: PaymentService) {}

  async ngOnInit() {
    this.loading = true;
    try {
      const response = await this.paymentService.createPaymentSession();
      const { sessionId } = response;

      const stripe = await loadStripe('pk_test_51QzZUgIBYAIeRrAyJhWwm7K9BweK4ipPpnalU3adGcFvbrE8c8bXrMZJmHkNcwPcgcJClrnuoreAMutiIZrO8iGG006lIr9H5E');
      if (stripe) {
        const { error } = await stripe.redirectToCheckout({ sessionId });
        if (error) {
          console.error('Error redirecting to Stripe:', error.message);
        }
      }
    } catch (error) {
      console.error('Error creating payment session:', error);
    } finally {
      this.loading = false;
    }
  }
}
