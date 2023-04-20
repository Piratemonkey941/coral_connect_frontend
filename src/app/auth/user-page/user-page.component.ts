import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../shared/auth.service';
import { User } from '../../models/user.model';
import { Router } from '@angular/router';
import { NgZone } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UpdateDialogComponent } from '../update-dialog/update-dialog.component';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.scss']
})
export class UserPageComponent implements OnInit {
  currentUser: User;
  private destroy$ = new Subject<void>();

  constructor(
    private authService: AuthService,
    // private userService: UserService,
    private router: Router,
    private ngZone: NgZone,
    public dialog: MatDialog
    ) {
    this.currentUser = authService.currentUserValue;
    // this.currentUser = userService.getCurrentUser();
  }

  ngOnInit(): void {
    this.authService.currentUser
      .pipe(takeUntil(this.destroy$))
      .subscribe(user => {
        this.currentUser = user;
        console.log('UserPageComponent - Current user:', this.currentUser);
      });
  }


  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onUpdateAccount() {
    this.openUpdateDialog();
  }

  openUpdateDialog(): void {
    const dialogRef = this.dialog.open(UpdateDialogComponent, {
      width: '400px',
      data: { email: this.currentUser.email }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Updated user information:', result);
        // Implement the logic to update user information using authService
      }
    });
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
