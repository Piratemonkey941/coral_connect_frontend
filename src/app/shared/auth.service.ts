import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl = 'http://localhost:3000/api/v1/users/'

  constructor(private http: HttpClient) { }

  signup(user: any) {
    return this.http.post(this.baseUrl + 'create', user);
  }

  login(user: any) {
    return this.http.post(this.baseUrl + 'login', user);
  }
}
