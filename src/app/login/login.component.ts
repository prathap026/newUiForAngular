import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from './login.service';
import { AlertService } from '../services/alert.service';
import { CommonService } from '../services/common.service';
// import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  passwordFieldType: string = 'password';
  passwordToggleIcon: string = 'far fa-eye-slash';

  constructor(
    private route: Router,
    private formBuild: FormBuilder,
    private loginService: LoginService,
    private alert: AlertService,
    private eservice: CommonService
  ) {}

  ngOnInit(): void {
    this.loginForm = this.formBuild.group({
      // emailId: ['', Validators.required],
      userName: ['', Validators.required],
      password: ['', Validators.required],
    });

  }

  signUp() {
    this.route.navigate(['/register']);
  }

  onTogglePasswordVisibility() {
    this.passwordFieldType =
      this.passwordFieldType === 'password' ? 'text' : 'password';
    this.passwordToggleIcon =
      this.passwordToggleIcon === 'far fa-eye-slash'
        ? 'far fa-eye'
        : 'far fa-eye-slash';
  }

  // onSubmit1() {
  //   if (this.loginForm.valid) {
  //     const payload = {
  //       userName: this.loginForm.value.userName,
  //       password: this.loginForm.value.password,
  //     };
  //     this.loginService.userLogin(payload).subscribe((resp) => {
  //       console.log(resp);
  //       if (resp) {
  //         localStorage.setItem('Token', resp.Token.trim());
  //         localStorage.setItem('Role', resp.Role);
  //         localStorage.setItem('Username', resp.username);
  //         localStorage.setItem('email', resp.email);

  //         sessionStorage.setItem('Token', resp.Token.trim());
  //         sessionStorage.setItem('Role', resp.Role);
  //         sessionStorage.setItem('Username', resp.username);
  //         sessionStorage.setItem('email', resp.email);

  //         // this.authService.login();

  //         if (resp.Role === 'USER' || resp.Role === 'ADMIN,USER') {
  //           this.route.navigate(['/main']);
  //         }
  //       } else {
  //         console.log('Invalid user login');
  //       }
  //     });
  //   } else {
  //     console.log('Form is invalid');
  //   }
  // }

  //Sample Response
  // resp = {
  //   statusCode: 0,
  //   errorMessage: null,
  //   responseContent: {
  //     role: 'GATEPASS_ADMIN',
  //     phone: '9345749329',
  //     accessToken:
  //       'eyJhbGciOiJIUzI1NiJ9.eyJyb2xlcyI6WyJST0xFX0dBVEVQQVNTX0FETUlOIl0sInN1YiI6InByYXRoYXBzaGFubXVnYW01IiwiaWF0IjoxNzQxODQwNzM0LCJleHAiOjE3NDE5MjcxMzR9.2se5Co8kVdVkBxwHRz_o1afwGt-czobfBlFd5V4CG-0',
  //     userName: 'prathapshanmugam5',
  //     email: 'prathapshanmugam5@gmail.com',
  //     refreshToken:
  //       'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJwcmF0aGFwc2hhbm11Z2FtNSIsImlhdCI6MTc0MTg0MDczNCwiZXhwIjoxNzQyMDEzNTM0fQ.GJ0BPDa4spmzIGdv_e0yv0U0k7SOjxJIVguti3_c-48',
  //   },
  // };

  onSubmit() {
    if (this.loginForm.valid) {
      const payload = {
        usernameOrEmailOrPhone: this.loginForm.value.userName,
        password: this.loginForm.value.password,
      };
      this.eservice.getLogin('/auth/login', payload).subscribe((resp: any) => {
        console.log(resp);

        if (
          resp?.statusCode === 0 &&
          resp?.responseContent?.role === 'GATEPASS_ADMIN'
        ) {
          localStorage.setItem('role', resp?.responseContent?.role);
          localStorage.setItem('phone', resp?.responseContent?.phone);
          localStorage.setItem(
            'accessToken',
            resp?.responseContent?.accessToken
          );
          localStorage.setItem('userName', resp?.responseContent?.userName);
          localStorage.setItem('email', resp?.responseContent?.email);
          localStorage.setItem(
            'refreshToken',
            resp.responseContent.refreshToken
          );

          this.route.navigate(['gatapass-admin', 'dashboard']);
          this.alert.showCustomPopup('success', 'Login Successful');
        } else if (
          resp?.statusCode === 0 &&
          resp?.responseContent?.role === 'ORGANIZATION_ADMIN'
        ) {
          localStorage.setItem('role', resp?.responseContent?.role);
          localStorage.setItem('phone', resp?.responseContent?.phone);
          localStorage.setItem(
            'accessToken',
            resp?.responseContent?.accessToken
          );
          localStorage.setItem('userName', resp?.responseContent?.userName);
          localStorage.setItem('email', resp?.responseContent?.email);
          localStorage.setItem(
            'refreshToken',
            resp.responseContent.refreshToken
          );
          localStorage.setItem('orgId', resp?.responseContent?.orgId);
          this.route.navigate(['organization-admin', 'dashboard']);
          this.alert.showCustomPopup('success', 'Login Successful');
        } else {
          this.alert.showCustomPopup('error', resp.errorMessage);
        }
      });
    } else {
      if (this.loginForm.get('userName')?.hasError('required')) {
        this.alert.showCustomPopup('error', 'Plese enter UserName');
      } else {
        this.alert.showCustomPopup('error', 'Plese enter Password');
      }
    }
  }
}
