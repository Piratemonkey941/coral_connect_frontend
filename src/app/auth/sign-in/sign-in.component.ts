import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/shared/user.service';
import { AuthService } from '../../shared/auth.service';


@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class LoginComponent {
  loginForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl('')
  });

  constructor(private authService: AuthService, private route: Router, private userService: UserService) {}


  onSubmit() {
     this.authService.login(this.loginForm.value).subscribe((res: any) => {
      if (res.success) {
        this.userService.setCurrentUser(res.payload.user);
        this.authService.setToken(res.payload.token);
        this.route.navigate(['/home']);
      }
     });
  }

}
