import { Component } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { RouterLink } from "@angular/router";
import { CommonModule } from "@angular/common";

@Component({
  selector: "app-home",
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule, RouterLink]
})
export class HomeComponent {
  features = [
    {
      icon: "speed",
      title: "Real-time Monitoring",
      description:
        "Track your vehicle's performance, location, and health status in real-time with advanced IoT sensors.",
    },
    {
      icon: "trending_up",
      title: "Predictive Maintenance",
      description:
        "Stay ahead of potential issues with AI-powered predictions and proactive maintenance recommendations.",
    },
    {
      icon: "bolt",
      title: "Smart Diagnostics",
      description: "Get instant, detailed insights into your vehicle's condition with our advanced diagnostic tools.",
    },
    {
      icon: "eco",
      title: "Fuel Efficiency Optimization",
      description:
        "Reduce fuel consumption and costs with our intelligent route planning and driving behavior analysis.",
    },
    {
      icon: "security",
      title: "Enhanced Security",
      description: "Protect your fleet with advanced theft detection, geofencing, and remote immobilization features.",
    },
    {
      icon: "insert_chart",
      title: "Comprehensive Analytics",
      description: "Make data-driven decisions with our powerful analytics dashboard and customizable reports.",
    },
  ];

  benefits = [
    {
      title: "Cost Reduction",
      description: "Minimize maintenance costs and fuel consumption through predictive analytics and optimization.",
    },
    {
      title: "Increased Uptime",
      description: "Reduce vehicle downtime with proactive maintenance and quick issue resolution.",
    },
    { title: "Improved Safety", description: "Enhance driver safety with real-time monitoring and behavior analysis." },
    {
      title: "Streamlined Operations",
      description: "Optimize fleet operations with data-driven insights and automated processes.",
    },
  ];

  testimonials = [
    {
      quote:
        "AutoCare has revolutionized our fleet management. We've seen a 30% reduction in maintenance costs and significant improvement in vehicle uptime.",
      author: "John Smith",
      company: "LogiTech Solutions",
    },
    {
      quote:
        "The real-time monitoring and predictive maintenance features have been game-changers for our business. AutoCare is an indispensable tool for modern fleet management.",
      author: "Sarah Johnson",
      company: "GreenTransport Inc.",
    },
    {
      quote:
        "AutoCare's user-friendly interface and comprehensive analytics have made managing our large fleet effortless. It's an excellent investment for any company with a vehicle fleet.",
      author: "Michael Chen",
      company: "Metro Delivery Services",
    },
  ];
}
