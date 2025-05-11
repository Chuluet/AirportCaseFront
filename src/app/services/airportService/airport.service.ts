import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SafeResourceUrl } from '@angular/platform-browser';
import { Observable } from 'rxjs';
import { airportService } from 'src/app/models/airportservice.model';


@Injectable({
  providedIn: 'root'
})
export class Airportservice {
  private api_url='http://localhost:3000/api/airportService'

  constructor(private http: HttpClient) { }


  addAirportService(airportservice: airportService): Observable<any>{
    const endpoint = `${this.api_url}/add`;
    return this.http.post(endpoint, airportservice);
  }

  getAirportService(): Observable<airportService[]>{
    const endpoint = this.api_url;
    const headers = {
      'Content-Type':"application/json",
      'Authorization': `Bearer ${localStorage.getItem('AuthToken')}`
    }
    return this.http.get<airportService[]>(endpoint,{headers});
  }

  changeAirportServiceStatus(serviceId: string, state: boolean){
    const endpoint = `${this.api_url}/changeStatus/${serviceId}`;
    const headers = {
      'Content-Type':"application/json",
      'Authorization': `Bearer ${localStorage.getItem('AuthToken')}`
    }
    const body = {isActive:state};
    return this.http.post<airportService[]>(endpoint,body,{headers});
  }


  getAirportServiceById(id:string){
    const endpoint = `${this.api_url}/${id}`;
    const headers = {
      'Content-Type':"application/json",
      'Authorization': `Bearer ${localStorage.getItem('AuthToken')}`
    }
    return this.http.get<airportService>(endpoint,{headers});
  }

  udpateAirportService(serviceId:string, serviceData: airportService){
    const endpoint = `${this.api_url}/update/${serviceId}`;
    const headers = {
      'Content-Type':"application/json",
      'Authorization': `Bearer ${localStorage.getItem('AuthToken')}`
    }
    return this.http.post<airportService>(endpoint,serviceData,{headers});
  }
  deleteAirportService(serviceId:string){
    const endpoint = `${this.api_url}/delete/${serviceId}`;
    const headers = {
      'Authorization': `Bearer ${localStorage.getItem('AuthToken')}`
    }
    return this.http.delete<airportService>(endpoint,{headers});
  }
}
