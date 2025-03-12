import { Component } from "@angular/core";
import { MatIcon } from "@angular/material/icon";
import { NgForOf, NgIf } from "@angular/common";
import { Router, RouterLink } from "@angular/router";
import { FooterComponent } from "../../../layout/footer/footer.component";
import { HeaderComponent } from "../../../layout/header/header.component";
import { AuthService } from "../../../services/auth.service";

interface PremiumPlan {
  name: string;
  price: number;
  interval: string;
  features: string[];
  recommended?: boolean;
}

@Component({
  selector: "app-pricing",
  templateUrl: "./pricing.component.html",
  styleUrls: ["./pricing.component.scss"],
  imports: [
    MatIcon,
    NgForOf,
    NgIf,
    FooterComponent,
    HeaderComponent
  ]
})
export class PricingComponent {
  premiumPlans: PremiumPlan[] = [
    {
      name: "AutoCare Pro",
      price: 30.99,
      interval: "year",
      features: [
        "All Basic features",
        "Advanced predictive maintenance",
        "Real-time diagnostics",
        "Up to 5 vehicles",
        "Priority email & chat support",
        "Fuel efficiency tracking",
      ],
      recommended: true,
    }
  ];

  constructor(private router: Router, private authService: AuthService) {}

  selectPlan(plan: PremiumPlan) {
    if (this.authService.isAuthenticated()) {
      this.router.navigate(['/payment'], { queryParams: { plan: plan.name } });
    } else {
      this.router.navigate(['/login']);
    }
  }
}
