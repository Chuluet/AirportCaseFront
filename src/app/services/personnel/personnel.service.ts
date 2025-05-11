import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SafeResourceUrl } from '@angular/platform-browser';
import { Observable } from 'rxjs';
import { Personnel } from 'src/app/models/personnel.model';


@Injectable({
  providedIn: 'root'
})
export class PersonnelService {
  private api_url='http://localhost:3000/api/personnel'

  constructor(private http: HttpClient) { }


  addPersonnel(personnel: Personnel): Observable<any>{
    const endpoint = `${this.api_url}/add`;
    const headers = {
      'Authorization': `Bearer ${localStorage.getItem('AuthToken')}`
    }
    return this.http.post(endpoint, personnel, {headers});
  }

  getPersonnel(): Observable<Personnel[]>{
    const endpoint = this.api_url;
    const headers = {
      'Content-Type':"application/json",
      'Authorization': `Bearer ${localStorage.getItem('AuthToken')}`
    }
    return this.http.get<Personnel[]>(endpoint,{headers});
  }

  changePersonnel(id: string, state: boolean){
    const endpoint = `${this.api_url}/changeStatus/${id}`;
    const headers = {
      'Content-Type':"application/json",
      'Authorization': `Bearer ${localStorage.getItem('AuthToken')}`
    }
    const body = {isActive:state};
    return this.http.post<Personnel[]>(endpoint,body,{headers});
  }


  getPersonnelById(id:string){
    const endpoint = `${this.api_url}/${id}`;
    const headers = {
      'Content-Type':"application/json",
      'Authorization': `Bearer ${localStorage.getItem('AuthToken')}`
    }
    return this.http.get<Personnel>(endpoint,{headers});
  }

  udpatePersonnel(id:string, personnelData: Personnel){
    const endpoint = `${this.api_url}/update/${id}`;
    const headers = {
      'Content-Type':"application/json",
      'Authorization': `Bearer ${localStorage.getItem('AuthToken')}`
    }
    return this.http.post<Personnel>(endpoint,personnelData,{headers});
  }
  deletePersonnel(id:string){
    const endpoint = `${this.api_url}/delete/${id}`;
    const headers = {
      'Authorization': `Bearer ${localStorage.getItem('AuthToken')}`
    }
    return this.http.delete<Personnel>(endpoint,{headers});
  }
}
