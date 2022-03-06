import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  constructor(private router: Router, private authService: AuthService) {}
  loginForm = new FormGroup({
    username: new FormControl('', [Validators.required, Validators.minLength(1)]),
    password: new FormControl('', [Validators.required, Validators.minLength(1)]),
  });

  ngOnInit(): void {}

  onSubmit() {
    const loginPromise = this.authService
      .login(this.loginForm.controls['username'].value, this.loginForm.controls['password'].value)
      .catch((error) => {
        this.showError(error);
      })
      .then(() => {
        this.router.navigate(['/admin/stills']);
      });
  }

  showError(error: any): void {
    console.error(error);
    alert('Invalid username or password');
  }
}
