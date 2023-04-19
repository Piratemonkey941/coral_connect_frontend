import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../shared/auth.service';
import { User } from '../../models/user.model';
import { Router } from '@angular/router';
import { NgZone } from '@angular/core';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.scss']
})
export class UserPageComponent implements OnInit {
  currentUser: User;

  constructor(private authService: AuthService, private router: Router, private ngZone: NgZone) {
    this.currentUser = authService.currentUserValue;
  }

  ngOnInit(): void {}

  onUpdateAccount() {
    // Implement account update logic
  }

  onDeleteAccount() {
    this.authService.deleteAccount();
  }

  redirectToLogin() {
    this.ngZone.run(() => {
      this.router.navigate(['/login']);
    });
  }

}
