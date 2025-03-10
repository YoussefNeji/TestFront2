import { Component } from "@angular/core"
import { CommonModule } from "@angular/common"
import { MatCardModule } from "@angular/material/card"
import { MatButtonModule } from "@angular/material/button"
import { MatIconModule } from "@angular/material/icon"
import { trigger, transition, style, animate } from "@angular/animations"
import {HeaderComponent} from "../../../layout/header/header.component";
import {FooterComponent} from "../../../layout/footer/footer.component";

@Component({
  selector: "app-about-us",
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, MatIconModule, HeaderComponent, FooterComponent],
  templateUrl: "./about-us.component.html",
  styleUrls: ["./about-us.component.scss"],
  animations: [
    trigger("fadeIn", [
      transition(":enter", [
        style({ opacity: 0, transform: "translateY(20px)" }),
        animate("0.5s ease-out", style({ opacity: 1, transform: "translateY(0)" })),
      ]),
    ]),
  ],
})
export class AboutUsComponent {
  teamMembers = [
    {
      name: "John Doe",
      position: "CEO & Founder",
      image:
        "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=256&q=80",
      bio: "John has over 20 years of experience in the automotive industry and is passionate about leveraging technology to improve vehicle maintenance.",
      social: {
        linkedin: "#",
        twitter: "#",
      },
    },
    {
      name: "Jane Smith",
      position: "CTO",
      image:
        "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=256&q=80",
      bio: "Jane is a seasoned software engineer with expertise in AI and machine learning, driving the technological innovations at AutoCare.",
      social: {
        linkedin: "#",
        twitter: "#",
      },
    },
    {
      name: "Mike Johnson",
      position: "Head of Operations",
      image:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=256&q=80",
      bio: "Mike ensures smooth operations and partnerships with garages, bringing efficiency to every aspect of AutoCare.",
      social: {
        linkedin: "#",
        twitter: "#",
      },
    },
    {
      name: "Sarah Lee",
      position: "Lead UX Designer",
      image:
        "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=256&q=80",
      bio: "Sarah is dedicated to creating intuitive and user-friendly interfaces, making vehicle maintenance management a breeze for our users.",
      social: {
        linkedin: "#",
        twitter: "#",
      },
    },
  ]

  stats = [
    { number: "50K+", label: "Active Users" },
    { number: "1000+", label: "Partner Garages" },
    { number: "98%", label: "Customer Satisfaction" },
    { number: "24/7", label: "Support Available" },
  ]

  values = [
    {
      icon: "lightbulb",
      title: "Innovation",
      description: "Constantly pushing the boundaries of what's possible in vehicle maintenance technology.",
    },
    {
      icon: "verified",
      title: "Reliability",
      description: "Providing dependable, accurate information and services our users can trust.",
    },
    {
      icon: "eco",
      title: "Sustainability",
      description: "Promoting practices that reduce environmental impact and improve vehicle efficiency.",
    },
    {
      icon: "visibility",
      title: "Transparency",
      description: "Offering clear, understandable insights into vehicle health and maintenance needs.",
    },
  ]
}

