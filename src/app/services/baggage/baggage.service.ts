import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SafeResourceUrl } from '@angular/platform-browser';
import { Observable } from 'rxjs';
import { Baggage } from 'src/app/models/baggage.model';


@Injectable({
  providedIn: 'root'
})
export class BaggageService {
  private api_url='http://localhost:3000/api/baggage'

  constructor(private http: HttpClient) { }


  addBaggage(baggage: Baggage): Observable<Baggage> {
    const endpoint = `${this.api_url}/add`;
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('AuthToken')}`
    };
  
    return this.http.post<Baggage>(endpoint, baggage, { headers });
  }

  getBaggage(): Observable<Baggage[]>{
    const endpoint = this.api_url;
    const headers = {
      'Content-Type':"application/json",
      'Authorization': `Bearer ${localStorage.getItem('AuthToken')}`
    }
    return this.http.get<Baggage[]>(endpoint,{headers});
  }
  

  changeBaggageStatus(baggageId?: string, state?: string){
    const endpoint = `${this.api_url}/ChangeStatus/${baggageId}`;
    const headers = {
      'Content-Type':"application/json",
      'Authorization': `Bearer ${localStorage.getItem('AuthToken')}`
    }
    const body = { status: state };

    return this.http.post<Baggage[]>(endpoint,body,{headers});
  }


  changeBaggageIncidentDetails(id?: string, incidentDetails?: string) {
  const endpoint = `${this.api_url}/changeIncidentDetails/${id}`;
  const headers = {
    'Content-Type': "application/json",
    'Authorization': `Bearer ${localStorage.getItem('AuthToken')}`
  };

  
  const body = {
    incidentDetails: incidentDetails
  };

  return this.http.post<Baggage>(endpoint, body, { headers });
}


  updateBaggage(baggageId:string, baggageData: Baggage){
    const endpoint = `${this.api_url}/update/${baggageId}`;
    const headers = {
      'Content-Type':"application/json",
      'Authorization': `Bearer ${localStorage.getItem('AuthToken')}`
    }
    return this.http.post<Baggage>(endpoint,baggageData,{headers});
  }
  deleteBaggage(baggageId:string){
    const endpoint = `${this.api_url}/delete/${baggageId}`;
    const headers = {
      'Authorization': `Bearer ${localStorage.getItem('AuthToken')}`
    }
    return this.http.delete<Baggage>(endpoint,{headers});
  }
}