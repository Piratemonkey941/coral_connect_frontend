import { Injectable } from '@angular/core';
import { HttpClient, HttpBackend } from '@angular/common/http';
import { UserService } from './user.service';
import { Router } from '@angular/router';
import { User } from '../models/user.model';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
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
    private httpBackend: HttpBackend,
    )
    {
      this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
      this.currentUser = this.currentUserSubject.asObservable();

      // Bypass interceptors for AuthService HttpClient instance
      this.http = new HttpClient(this.httpBackend);

      this.autoLogin();
    }


signup(user: any) {                                       // This function sends a POST request to create a new user account with the details provided in the user object
  return this.http.post(this.baseUrl + 'create', user);   // Send the HTTP request to the server to create a new user account
}

// This function sends a POST request to authenticate the user with the credentials provided in the user object

login(user: any) {
  // Send the HTTP request to the server to authenticate the user
  // Apply the 'map' operator to modify the server's response before returning it
  return this.http.post(this.baseUrl + 'login', user).pipe(map((response: any) => {
    // Set the current user in the application's authentication service
    console.log('Login response:', response);

    // Store the token in the localStorage
    this.setToken(response.payload.token); // Add this line to store the token

    this.currentUserSubject.next(response.payload.user);
    console.log('User set in AuthService (currentUserSubject):', this.currentUserSubject.value);

    this.userService.setCurrentUser(response.payload.user);
    console.log('User set in AuthService (userService):', this.userService.currentUserSubject.value);

    // Return the modified server's response
    return response;
  }));
}



// This function stores the token object in the browser's local storage
setToken(token: any) {
  localStorage.setItem('token', JSON.stringify(token));
  console.log('Token set:', token);
}

// This function automatically logs in the user if a valid token is stored in local storage
autoLogin() {
  const token = this.getToken();      // Get the token from local storage

  console.log('autoLogin() - Token:', token); // Add this line to check the token value

  if (token == null) {                // Check if a token exists
    this.route.navigate(['/login']);  // If no token exists, navigate to the login page
  } else {                            // If a token exists, send a GET request to the server to get the user object associated with the token
    this.http.get(this.baseUrl + 'me', {
      headers: {
        Authorization: `Bearer ${token.value}`  // Set the 'Authorization' header to include the token value
      }
    }).subscribe((user: User) => {              // If the server returns a valid user object, set the current user in the application's authentication service
        console.log('autoLogin() - User:', user); // Add this line to check the user object
        this.userService.setCurrentUser(user);
        this.currentUserSubject.next(user); // Add this line to set currentUserSubject in AuthService
        // this.route.navigate(['/landing']);         // Navigate to the home page

    }, (error) => {
      // If an error occurs (e.g. the token is invalid), handle the error here, such as navigating to the login page or showing an error message.
      console.error('Auto-login failed:', error);
      this.route.navigate(['/login']);
    });
  }
}


logout() {
const token = this.getToken();                // Get the token from local storage

  if (token) {
    // If a token exists, send a DELETE request to the server to invalidate the token
    this.http.delete(this.baseUrl + 'logout', {
      headers: {
        Authorization: `Bearer ${token.value}` // Set the 'Authorization' header to include the token value
      }
    }).subscribe((res: any) => {
      if (res.success) {
        // If the server returns a successful response, log the user out by clearing the token and current user data and navigating to the login page
        this.setToken(null);
        this.userService.setCurrentUser(null);
        this.currentUserSubject.next(null);
        this.route.navigate(['/login']);
      }
    }, (error) => {
      console.error('Logout failed:', error);   // Optionally, handle the error here, such as showing an error message to the user.
    });
  }
  console.log('User logged out');
}

getToken() {
  const token = localStorage.getItem('token');  // Get the token string from local storage

  if (token != null) {
    const parsedToken = JSON.parse(token);
    console.log('Retrieved token:', parsedToken); // Log the retrieved token
    return parsedToken;                           // If a token string exists, parse it from a stringified JSON object and return it
  } else {
    return null;                                  // If no token string exists, return null
  }
}


isLoggedIn(): boolean {
  const token = this.getToken();
  console.log('Is logged in:', this.currentUserValue !== null && token !== null, 'User:', this.currentUserValue, 'Token:', token);
  return this.currentUserValue !== null && token !== null;
}


  getCurrentUserId(): number {
    const currentUser = this.userService.currentUserSubject.value;
    console.log('getCurrentUserId - currentUser:', currentUser);
    if (currentUser && currentUser.id) {
      return currentUser.id;
    }
    return null;
  }

  deleteAccount() {
    const token = this.getToken();
    const userId = this.getCurrentUserId();

    if (token && userId) {
      this.http.delete(`${this.baseUrl}${userId}`, {
        headers: {
          Authorization: `Bearer ${token.value}`
        }
      }).subscribe((res: any) => {
        if (res.success) {
          this.logout();
          console.log('Account deleted successfully');
        }
      }, (error) => {
        console.error('Account deletion failed:', error);
      });
    }
  }

}
