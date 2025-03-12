import { Component, OnInit } from '@angular/core';
import { LoginService } from '../login/login.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { tick } from '@angular/core/testing';
import * as bcrypt from 'bcryptjs';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  signUpForm: any;
  constructor(private service: LoginService,
    private router: Router,
    private formBuild: FormBuilder,
  ) { }
  ngOnInit(): void {
    this.signUpForm = this.formBuild.group({
      // emailId: ['', Validators.required],
      userName: ['', Validators.required],
      password: ['', Validators.required],
      email: ['', Validators.required],
      mobile: ['', Validators.required],
      role: ['', Validators.required]

    });
  }

  // hashingPassword(password:string):string{
  //   const salt = bcrypt.genSalt(10);
  //   const hashPassword = bcrypt.hashSync(password,salt);
  //   return hashPassword;
  // }

  onSubmit() {
    const salt = bcrypt.genSaltSync(10);
    const hashPassword = bcrypt.hashSync(this.signUpForm.value.password, salt);
    console.log("Password ",hashPassword);

    if (this.signUpForm.valid) {
      const payload = {
        username: this.signUpForm.value.userName,
        email: this.signUpForm.value.email,
        mobile: this.signUpForm.value.mobile,
        role: this.signUpForm.value.role,
        password: bcrypt.hashSync(this.signUpForm.value.password, salt)
      }

      this.service.userRegister(payload).subscribe((resp) => {
        console.log(resp);

        if (resp) {
          console.log(`User registered successfully...`)
          this.router.navigate(['/main']);
        } else {
          console.log("Invalid user details!...");
        }

      })
    } else {
      console.log("Form is Invalid!");
    }
  }

}
