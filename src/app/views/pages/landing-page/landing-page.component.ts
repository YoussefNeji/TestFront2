import {AfterViewInit, Component} from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { RouterLink } from "@angular/router";
import { CommonModule } from "@angular/common";
import {FooterComponent} from "../../../layout/footer/footer.component";
import {HeaderComponent} from "../../../layout/header/header.component";

@Component({
  selector: "app-landing-page",
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss'],
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule, RouterLink, FooterComponent, HeaderComponent]
})
export class LandingPageComponent implements  AfterViewInit {
  features = [
    {
      icon: "calendar_today",
      title: "Smart Scheduling",
      description: "AI-powered maintenance scheduling based on your vehicle's specific needs and usage patterns."
    },
    {
      icon: "notifications",
      title: "Timely Reminders",
      description: "Get personalized alerts for upcoming maintenance tasks, inspections, and renewals."
    },
    {
      icon: "history",
      title: "Maintenance History",
      description: "Keep a detailed digital record of all maintenance activities and repairs for your vehicles."
    },
    {
      icon: "local_gas_station",
      title: "Fuel Efficiency Tracking",
      description: "Monitor and optimize your vehicle's fuel consumption with our advanced analytics."
    },
    {
      icon: "build",
      title: "Garage Integration",
      description: "Seamlessly schedule appointments with our network of trusted partner garages."
    },
    {
      icon: "dashboard",
      title: "Comprehensive Dashboard",
      description: "Get a clear overview of all your vehicles' status and maintenance needs in one place."
    }
  ];

  benefits = [
    {
      title: "Cost Savings",
      description: "Reduce maintenance costs through timely servicing and preventing major breakdowns."
    },
    {
      title: "Extended Vehicle Life",
      description: "Prolong your vehicle's lifespan with regular, optimized maintenance schedules."
    },
    {
      title: "Peace of Mind",
      description: "Never miss an important maintenance task with our smart reminder system."
    },
    {
      title: "Time Efficiency",
      description: "Save time with streamlined maintenance processes and easy garage appointments."
    }
  ];

  testimonials = [
    {
      quote: "AutoCare has transformed how I manage my fleet. We've seen a significant reduction in downtime and maintenance costs.",
      author: "John Smith",
      company: "Smith Logistics"
    },
    {
      quote: "As a busy professional, AutoCare ensures my car is always in top condition without me having to worry about it.",
      author: "Sarah Johnson",
      company: "Tech Innovations Inc."
    },
    {
      quote: "The predictive maintenance feature has saved us from several potential breakdowns. It's an invaluable tool for our business.",
      author: "Michael Chen",
      company: "City Cab Services"
    }
  ];

  ngAfterViewInit() {
    this.initScrollAnimations()
  }

  private initScrollAnimations() {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate")
          }
        })
      },
      { threshold: 0.1 },
    )

    document.querySelectorAll("[data-animate]").forEach((el) => {
      observer.observe(el)
    })
  }
}
