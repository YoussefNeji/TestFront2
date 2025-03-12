import { Component } from "@angular/core"
import {MatIcon} from "@angular/material/icon";
import {NgForOf, NgIf} from "@angular/common";
import {Router, RouterLink} from "@angular/router";

interface PremiumPlan {
  name: string
  price: number
  interval: string
  features: string[]
  recommended?: boolean
}

@Component({
  selector: "app-premium",
  templateUrl: "./premium.component.html",
  styleUrls: ["./premium.component.scss"],
  imports: [
    MatIcon,
    NgForOf,
    NgIf,
  ]
})
export class PremiumComponent {
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
  ]

  constructor(private router: Router) {}

  selectPlan(plan: PremiumPlan) {
    this.router.navigate(['/payment'], { queryParams: { plan: plan.name } });
  }
}

