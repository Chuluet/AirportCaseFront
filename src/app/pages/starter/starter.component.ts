// starter.component.ts
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../material.module';

interface Flight    { flightNo: string; destination: string; time: string; status: string; }
interface Staff     { name: string; role: string; shift: string; }
interface Passenger { name: string; flight: string; seat: string; }
interface Gallery   { title: string; url: string; }

@Component({
  selector: 'app-starter',
  standalone: true,
  imports: [
    CommonModule,
    MaterialModule
  ],
  templateUrl: './starter.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class StarterComponent implements OnInit {
  flightColumns    = ['flightNo', 'destination', 'time', 'status'];
  staffColumns     = ['name', 'role', 'shift'];
  passengerColumns = ['name', 'flight', 'seat'];

  flights: Flight[] = [
    { flightNo: 'AR123', destination: 'Buenos Aires', time: '08:30', status: 'On Time' },
    { flightNo: 'LA456', destination: 'Santiago',     time: '09:15', status: 'Delayed' },
    { flightNo: 'AA789', destination: 'Miami',        time: '11:00', status: 'In Flight' },
  ];

  staff: Staff[] = [
    { name: 'María Pérez',   role: 'Controller',    shift: 'Morning' },
    { name: 'Juan Gómez',    role: 'Pilot',         shift: 'Afternoon' },
    { name: 'Laura Sánchez', role: 'Ground Crew',   shift: 'Night' },
  ];

  passengers: Passenger[] = [
    { name: 'Pedro López',   flight: 'AR123', seat: '12A' },
    { name: 'Ana Fernández', flight: 'LA456', seat: '7C'  },
    { name: 'Luis Martínez', flight: 'AA789', seat: '3F'  },
  ];

  gallery: Gallery[];

  ngOnInit() {
    this.gallery = [
      { title: '',      url: 'assets/images/destinations/vuelo.jpg' },
      { title: '',  url: 'assets/images/destinations/sp.jpg'   },
      { title: '',        url: 'assets/images/destinations/avion.jpg' },
    ];
  }
}
