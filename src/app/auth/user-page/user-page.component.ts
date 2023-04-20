import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../shared/auth.service';
import { User } from '../../models/user.model';
import { Router } from '@angular/router';
import { NgZone } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UpdateDialogComponent } from '../update-dialog/update-dialog.component';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.scss']
})
export class UserPageComponent implements OnInit {
  currentUser: User;

  constructor(
    private authService: AuthService,
    private router: Router,
    private ngZone: NgZone,
    public dialog: MatDialog
    ) {
    this.currentUser = authService.currentUserValue;
  }

  ngOnInit(): void {}

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
