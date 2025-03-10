import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import {HeaderComponent} from "../../../layout/header/header.component";
import {FooterComponent} from "../../../layout/footer/footer.component";

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [CommonModule, MatIconModule, HeaderComponent, FooterComponent],
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.scss']
})
export class ServicesComponent {
  services = [
    {
      icon: 'build',
      title: 'Routine Maintenance',
      description: 'Regular check-ups and maintenance to keep your vehicle in top condition.'
    },
    {
      icon: 'warning',
      title: 'Diagnostics',
      description: 'Advanced diagnostic services to identify and resolve issues quickly.'
    },
    {
      icon: 'local_gas_station',
      title: 'Fuel System Service',
      description: 'Cleaning and maintenance of your vehicle\'s fuel system for optimal performance.'
    },
    {
      icon: 'ac_unit',
      title: 'A/C Service',
      description: 'Comprehensive air conditioning system check and repair.'
    },
    {
      icon: 'electric_car',
      title: 'Electric Vehicle Service',
      description: 'Specialized maintenance and repair services for electric and hybrid vehicles.'
    },
    {
      icon: 'tire_repair',
      title: 'Tire Service',
      description: 'Tire rotation, balancing, and replacement to ensure safe and efficient driving.'
    }
  ];
}
