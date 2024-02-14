import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app//services/login/auth.service'; 
import { StorageService } from 'src/app//services/login/storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: any = {
    username: null,
    password: null
  };
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];

  constructor() { }

  ngOnInit(): void {
    // if (this.storageService.isLoggedIn()) {
    //   this.isLoggedIn = true;
    //   this.roles = this.storageService.getUser().roles;
    // }
    console.log("login.component.ts ngOnInit");
  }

  // onSubmit(): void {
  //   const { username, password } = this.form;

  //   this.authService.login(username, password).subscribe({
  //     next: data => {
  //       this.storageService.saveUser(data);

  //       this.isLoginFailed = false;
  //       this.isLoggedIn = true;
  //       this.roles = this.storageService.getUser().roles;
  //       this.reloadPage();
  //     },
  //     error: err => {
  //       this.errorMessage = err.error.message;
  //       this.isLoginFailed = true;
  //     }
  //   });
  // }

  // reloadPage(): void {
  //   window.location.reload();
  // }
}