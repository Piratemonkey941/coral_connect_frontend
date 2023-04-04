import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserService } from './user.service';
import { Router } from '@angular/router';
import { User } from '../models/user.model';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;
  private baseUrl = 'http://localhost:3000/api/v1/users/'

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  constructor(
    private http: HttpClient,
    private userService: UserService,
    private route: Router,
    )
    {
      this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
      this.currentUser = this.currentUserSubject.asObservable();
    }

  signup(user: any) {
    return this.http.post(this.baseUrl + 'create', user);
  }

  login(user: any) {
    return this.http.post(this.baseUrl + 'login', user);
  }

  setToken(token: any) {
    localStorage.setItem('token', JSON.stringify(token));
  }

  autoLogin() {
    const token = this.getToken();

    if (token == null) {
      this.route.navigate(['/login']);
    } else {
      this.http.get(this.baseUrl + 'me', {
        headers: {
          Authorization: `Bearer ${token.value}`
        }
      }).subscribe((user: User) => {
        this.userService.setCurrentUser(user);
        this.route.navigate(['/home']);
      });
    }
  }

  logout() {
    const token = this.getToken();

    if (token) {
      this.http.delete(this.baseUrl + 'logout', {
        headers: {
          Authorization: `Bearer ${token.value}`
        }
      }).subscribe((res: any) => {
        if (res.success) {
          this.setToken(null);
          this.userService.setCurrentUser(null);
          this.route.navigate(['/login']);
        }
      })
    }
  }

  getToken() {
    const token = localStorage.getItem('token');

    if (token != null) {
      return JSON.parse(token);
    } else {
      return null;
    }
  }

  isLoggedIn(): boolean {
    return !!this.currentUserValue; // Returns true if there's a user object, false otherwise
  }

  getCurrentUserId(): number | null {
    return this.currentUserValue ? this.currentUserValue.id : null; // Returns the user ID if there's a user object, null otherwise
  }
}
