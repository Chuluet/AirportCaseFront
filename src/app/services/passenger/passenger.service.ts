import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SafeResourceUrl } from '@angular/platform-browser';
import { Observable } from 'rxjs';
import { Passenger } from 'src/app/models/passenger.model';


@Injectable({
  providedIn: 'root'
})
export class PassengerService {
  private api_url='http://localhost:3000/api/passenger'

  constructor(private http: HttpClient) { }


  addPassenger(passenger: Passenger): Observable<any>{
    const endpoint = `${this.api_url}/add`;
    const headers = {
      'Authorization': `Bearer ${localStorage.getItem('AuthToken')}`
    }
    return this.http.post(endpoint, passenger, {headers});
  }

  getPassenger(): Observable<Passenger[]>{
    const endpoint = this.api_url;
    const headers = {
      'Content-Type':"application/json",
      'Authorization': `Bearer ${localStorage.getItem('AuthToken')}`
    }
    return this.http.get<Passenger[]>(endpoint,{headers});
  }

  changePassenger(id: string, state: boolean){
    const endpoint = `${this.api_url}/changerStatus/${id}`;
    const headers = {
      'Content-Type':"application/json",
      'Authorization': `Bearer ${localStorage.getItem('AuthToken')}`
    }
    const body = {isActive:state};
    return this.http.post<Passenger[]>(endpoint,body,{headers});
  }


  getPassengerById(id:string){
    const endpoint = `${this.api_url}/${id}`;
    const headers = {
      'Content-Type':"application/json",
      'Authorization': `Bearer ${localStorage.getItem('AuthToken')}`
    }
    return this.http.get<Passenger>(endpoint,{headers});
  }

  udpatePassenger(id:string, passengerData: Passenger){
    const endpoint = `${this.api_url}/update/${id}`;
    const headers = {
      'Content-Type':"application/json",
      'Authorization': `Bearer ${localStorage.getItem('AuthToken')}`
    }
    return this.http.post<Passenger>(endpoint,passengerData,{headers});
  }
  deletePassenger(id:string){
    const endpoint = `${this.api_url}/delete/${id}`;
    const headers = {
      'Authorization': `Bearer ${localStorage.getItem('AuthToken')}`
    }
    return this.http.delete<Passenger>(endpoint,{headers});
  }
}
