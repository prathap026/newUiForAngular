import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from './login.service';
// import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  passwordFieldType:string='password';
  passwordToggleIcon:string='far fa-eye-slash';


  constructor(
    private route: Router,
    private formBuild: FormBuilder,
    private loginService: LoginService,
    // private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.loginForm = this.formBuild.group({
      // emailId: ['', Validators.required],
      userName: ['', Validators.required],
      password: ['', Validators.required]

    });
  }

  signUp() {
    this.route.navigate(['/register']);
  }

  onTogglePasswordVisibility(){
    this.passwordFieldType = this.passwordFieldType === 'password'?'text':'password'
    this.passwordToggleIcon = this.passwordToggleIcon === 'far fa-eye-slash'? 'far fa-eye':'far fa-eye-slash'
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

  onSubmit() {
    if (this.loginForm.valid) {
      const payload = {
        username: this.loginForm.value.userName,
        password: this.loginForm.value.password
      }
      this.loginService.userLogin(payload).subscribe((resp:any)=>{
        console.log(resp);
        
        if(resp){
          localStorage.setItem('Token',resp.Token) // storing the response locally
          localStorage.setItem('Username',resp.user.username)
          localStorage.setItem('Role',resp.user.role)

          sessionStorage.setItem('Token',resp.token) // storing the response in session
          sessionStorage.setItem('Username',resp.user.username)
          sessionStorage.setItem('Role',resp.user.role)

          this.route.navigate(['/main']);
        }else{
          console.log("Invalid credentials");
        }
      })

    } else {
      console.log("Form is Invalid!");
    }
  }


}
