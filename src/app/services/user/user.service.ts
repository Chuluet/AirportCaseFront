import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SafeResourceUrl } from '@angular/platform-browser';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/user.model';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  private api_url='http://localhost:3000/api/user'

  constructor(private http: HttpClient) { }


  addUser(user: User): Observable<any>{
    const endpoint = `${this.api_url}/addUser`;
    return this.http.post(endpoint, user);
  }

  getUsers(): Observable<User[]>{
    const endpoint = this.api_url;
    const headers = {
      'Content-Type':"application/json",
      'Authorization': `Bearer ${localStorage.getItem('AuthToken')}`
    }
    return this.http.get<User[]>(endpoint,{headers});
  }

  changeUserStatus(userId?: string, state?: string){
    const endpoint = `${this.api_url}/ChangeState/${userId}`;
    const headers = {
      'Content-Type':"application/json",
      'Authorization': `Bearer ${localStorage.getItem('AuthToken')}`
    }
    const body = {state};
    return this.http.post<User[]>(endpoint,body,{headers});
  }


  getUserById(id:string){
    const endpoint = `${this.api_url}/${id}`;
    const headers = {
      'Content-Type':"application/json",
      'Authorization': `Bearer ${localStorage.getItem('AuthToken')}`
    }
    return this.http.get<User>(endpoint,{headers});
  }

  udpateUser(userId:string, userData: User){
    const endpoint = `${this.api_url}/${userId}`;
    const headers = {
      'Content-Type':"application/json",
      'Authorization': `Bearer ${localStorage.getItem('AuthToken')}`
    }
    return this.http.post<User>(endpoint,userData,{headers});
  }
  deleteUser(userId:string){
    const endpoint = `${this.api_url}/delete/${userId}`;
    const headers = {
      'Authorization': `Bearer ${localStorage.getItem('AuthToken')}`
    }
    return this.http.delete<User>(endpoint,{headers});
  }
}
