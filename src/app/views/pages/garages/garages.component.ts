import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import {HeaderComponent} from "../../../layout/header/header.component";
import {FooterComponent} from "../../../layout/footer/footer.component";

@Component({
  selector: 'app-garages',
  standalone: true,
  imports: [CommonModule, MatButtonModule, HeaderComponent, FooterComponent],
  templateUrl: './garages.component.html',
  styleUrls: ['./garages.component.scss']
})
export class GaragesComponent {
  garages = [
    {
      name: 'AutoCare Express',
      location: 'New York, NY',
      rating: 4.8,
      image: '/assets/images/garage1.jpg'
    },
    {
      name: 'Precision Auto Works',
      location: 'Los Angeles, CA',
      rating: 4.7,
      image: '/assets/images/garage2.jpg'
    },
    {
      name: 'Elite Car Service',
      location: 'Chicago, IL',
      rating: 4.9,
      image: '/assets/images/garage3.jpg'
    },
    {
      name: 'TurboTech Garage',
      location: 'Houston, TX',
      rating: 4.6,
      image: '/assets/images/garage4.jpg'
    }
  ];
}
