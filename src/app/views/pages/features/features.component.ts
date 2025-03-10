import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import {HeaderComponent} from "../../../layout/header/header.component";
import {FooterComponent} from "../../../layout/footer/footer.component";

@Component({
  selector: 'app-features',
  standalone: true,
  imports: [CommonModule, MatIconModule, HeaderComponent, FooterComponent],
  templateUrl: './features.component.html',
  styleUrls: ['./features.component.scss']
})
export class FeaturesComponent {
  features = [
    {
      icon: 'calendar_today',
      title: 'Smart Scheduling',
      description: 'AI-powered maintenance scheduling based on your vehicle\'s specific needs and usage patterns.'
    },
    {
      icon: 'notifications',
      title: 'Timely Reminders',
      description: 'Get personalized alerts for upcoming maintenance tasks, inspections, and renewals.'
    },
    {
      icon: 'history',
      title: 'Maintenance History',
      description: 'Keep a detailed digital record of all maintenance activities and repairs for your vehicles.'
    },
    {
      icon: 'local_gas_station',
      title: 'Fuel Efficiency Tracking',
      description: 'Monitor and optimize your vehicle\'s fuel consumption with our advanced analytics.'
    },
    {
      icon: 'build',
      title: 'Garage Integration',
      description: 'Seamlessly schedule appointments with our network of trusted partner garages.'
    },
    {
      icon: 'dashboard',
      title: 'Comprehensive Dashboard',
      description: 'Get a clear overview of all your vehicles\' status and maintenance needs in one place.'
    }
  ];
}
