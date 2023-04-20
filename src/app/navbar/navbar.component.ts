import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { AuthService } from '.././shared/auth.service';
import { User } from '../models/user.model';
import { UserService } from '../shared/user.service';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  currentUser: User;
  isSmallScreen: boolean;

  constructor
  (
    private breakpointObserver: BreakpointObserver,
    private userService: UserService,
    private authService: AuthService
  )
  {
    this.checkScreenSize();
  }

  ngOnInit(): void {
    this.userService.currentUserSubject.subscribe((user: User) => {
      // console.log(user);
      this.currentUser = user;
    })
}

logout() {
  this.authService.logout();
}

  checkScreenSize() {
    this.breakpointObserver
      .observe([Breakpoints.XSmall, Breakpoints.Small])
      .subscribe((result) => {
        this.isSmallScreen = result.matches;
      });
  }
}
