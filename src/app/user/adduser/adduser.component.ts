import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/login/login.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-adduser',
  templateUrl: './adduser.component.html',
  styleUrls: ['./adduser.component.css']
})
export class AdduserComponent implements OnInit {

  userRegistrationForm!: FormGroup;
  genders: any;
  roles: any;

  constructor(private fb: FormBuilder,
    private service: LoginService,
    private route: Router
  ) { }

  ngOnInit(): void {
    this.userRegistrationForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(3), Validators.pattern('^[a-zA-Z]+$')]],
      lastName: ['', [Validators.required, Validators.minLength(3), Validators.pattern('^[a-zA-Z]+$')]],
      emailId: ['', [Validators.required, Validators.email]],
      userName: ['', [Validators.required, Validators.minLength(3)]],
      gender: ['', Validators.required],
      designation: ['', Validators.required],
      // role: ['', Validators.required]
    });

    this.getRoleData();
    this.getGenderData();


  }

  // validation purpose 

  getForm(){
    return this.userRegistrationForm
  }

  get firstName() { return this.userRegistrationForm.get('firstName')!; }
  get lastName() { return this.userRegistrationForm.get('lastName')!; }
  get emailId() { return this.userRegistrationForm.get('emailId')!; }
  get userName() { return this.userRegistrationForm.get('userName')!; }
  get gender() { return this.userRegistrationForm.get('gender')!; }
  get designation() { return this.userRegistrationForm.get('designation')!; }
  // get role() { return this.userRegistrationForm.get('role')!; }




  onSubmit() {
    if (this.userRegistrationForm.valid) {

      const formData: FormData = new FormData();
      const payload = {
       
        firstName: this.userRegistrationForm.value.firstName,
        lastName: this.userRegistrationForm.value.lastName,
        email: this.userRegistrationForm.value.emailId,
        userName: this.userRegistrationForm.value.userName,
        genderId: this.userRegistrationForm.value.gender,
        role: "ROLE_OFFICER",
        designation: this.userRegistrationForm.value.designation
      }
    
      formData.append('userRequest',JSON.stringify(payload));
      this.service.postUser(payload).subscribe((resp)=>{
        if(resp){
          this.route.navigate(['/main/user']);
        }else{
          console.error("Error while registering the user");
        }
      })
    }
  }

  getGenderData() {

    const payload = {
      dataCode: "SELECT_GENDER_DROPDOWN",
      placeholderKeyValueMap: {}
    }
    this.service.getData(payload).subscribe((resp) => {
      console.log(resp);
      this.genders = resp.response;
    })
  }

  getRoleData() {
    const payload = {
      dataCode: "SELECT_ROLE_DROPDOWN",
      placeholderKeyValueMap: {}
    }
    this.service.getData(payload).subscribe((resp) => {
      console.log(resp);
      this.roles = resp.response;
    })
  }

  onCancel(){
    this.route.navigate(['/main/user']);
  }


  // allows only numbers
  onlyNumbers(press:any): boolean {

    const charCode = (press.which) ? press.which : press.keyCode;

    if (charCode >= 48 && charCode <= 57) {
      return true;
    }
    console.log('charCode is ' + charCode);
    return false;
 
  }
// allows only alphabet
  onlyAlphabet(value: { which: any; keyCode: any; }):boolean{
    const charCode=(value.which)?value.which:value.keyCode;
    if(charCode >= 48 && charCode <= 57 && charCode >=65 && charCode<=90 || charCode>=97 && charCode<=122)
    {
      return true;
    }
      console.log('charCode is'+ charCode);
      return false;
    
  }
}


