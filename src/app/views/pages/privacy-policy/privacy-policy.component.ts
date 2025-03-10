import { Component } from "@angular/core"
import { CommonModule } from "@angular/common"
import { MatExpansionModule } from "@angular/material/expansion"
import { MatButtonModule } from "@angular/material/button"
import { MatIconModule } from "@angular/material/icon"

@Component({
  selector: "app-privacy-policy",
  standalone: true,
  imports: [CommonModule, MatExpansionModule, MatButtonModule, MatIconModule],
  templateUrl: "./privacy-policy.component.html",
  styleUrls: ["./privacy-policy.component.scss"],
})
export class PrivacyPolicyComponent {
  policyPoints = [
    {
      title: "Information We Collect",
      content:
        "We collect personal information that you provide to us, such as your name, email address, and vehicle details. We also collect data about your vehicle's performance and maintenance history when you use our services.",
    },
    {
      title: "How We Use Your Information",
      content:
        "We use your information to provide and improve our services, communicate with you, and personalize your experience. This includes scheduling maintenance, providing vehicle insights, and sending relevant notifications.",
    },
    {
      title: "Data Sharing and Disclosure",
      content:
        "We may share your data with partner garages to facilitate maintenance services. We do not sell your personal information to third parties. We may disclose information if required by law or to protect our rights and safety.",
    },
    {
      title: "Data Security",
      content:
        "We implement industry-standard security measures to protect your data from unauthorized access, alteration, or destruction. This includes encryption, secure data storage, and regular security audits.",
    },
    {
      title: "Your Rights and Choices",
      content:
        "You have the right to access, correct, or delete your personal information. You can also opt-out of certain data processing activities. Contact us to exercise these rights.",
    },
  ]

  deletionSteps = [
    "Log in to your AutoCare account",
    'Navigate to the "Account Settings" page',
    'Scroll down to the "Data Management" section',
    'Click on the "Request Data Deletion" button',
    "Confirm your decision by entering your password",
    "Submit the request and await confirmation email",
  ]
  currentDate: Date = new Date();
}

