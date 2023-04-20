import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {


  currentUserSubject = new BehaviorSubject<User>(null);

  constructor() {
    this.currentUserSubject.subscribe();
  }

  setCurrentUser(user: User) {
    // console.log('Before setting current user:', this.currentUserSubject.value);
    this.currentUserSubject.next(user);
    // console.log('After setting current user:', this.currentUserSubject.value);
  }

  getCurrentUser(): User | null {
    return this.currentUserSubject.value;
  }

  getCurrentUserId(): number | null {
    const user = this.getCurrentUser();
    return user ? user.id : null;
  }
}
