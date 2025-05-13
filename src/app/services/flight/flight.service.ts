import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Flight } from 'src/app/models/flight.model';

@Injectable({
  providedIn: 'root'
})
export class FlightService {
  private api_url = 'http://localhost:3000/api/flights';

  constructor(private http: HttpClient) { }

  addFlight(flight: Flight): Observable<Flight> {
    const endpoint = `${this.api_url}/addFlight`;
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('AuthToken')}`
    };
  
    return this.http.post<Flight>(endpoint, flight, { headers });
  }

  getFlights(): Observable<Flight[]> {
    const endpoint = this.api_url;
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('AuthToken')}`
    };
    return this.http.get<Flight[]>(endpoint, { headers });
  }

  changeFlightStatus(flightId?: string, status?: string): Observable<Flight[]> {
    const endpoint = `${this.api_url}/ChangeFlightStatus/${flightId}`;
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('AuthToken')}`
    };
    const body = { status };
    return this.http.post<Flight[]>(endpoint, body, { headers });
  }

  updateFlight(flightId: string, flightData: Flight): Observable<Flight> {
    const endpoint = `${this.api_url}/update/${flightId}`;
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('AuthToken')}`
    };
    return this.http.post<Flight>(endpoint, flightData, { headers });
  }

  deleteFlight(flightId: string): Observable<Flight> {
    const endpoint = `${this.api_url}/delete/${flightId}`;
    const headers = {
      'Authorization': `Bearer ${localStorage.getItem('AuthToken')}`
    };
    return this.http.delete<Flight>(endpoint, { headers });
  }
}
