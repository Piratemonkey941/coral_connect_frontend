import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

import { Router } from '@angular/router';
import { AuthService } from '../../shared/auth.service';


@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  private authService: AuthService
  private route: Router

  signUpForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.signUpForm = this.fb.group({
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      password: ['', Validators.required],
      password_confirmation: ['', Validators.required]

    });
  }

  ngOnInit(): void {
  }

  onSubmit() {
    this.authService.signup(this.signUpForm.value).subscribe((res: any) => {
      if (res.success) {
        this.route.navigate(['/home']);
      }
    })
  }
}
