import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  ValidationErrors,
  AbstractControl,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService } from '../services/alert.service';
import { CommonService } from '../services/common.service';
import { CompanyService } from '../services/company.service';

@Component({
  selector: 'app-userregistration',
  templateUrl: './userregistration.component.html',
  styleUrls: ['./userregistration.component.css'],
})
export class UserregistrationComponent implements OnInit {
  registerForm: FormGroup;
  countryResult: any[] = [];

  stateResult: any[] = [];
  cityResult: any[] = [];

  passwordFieldType: string = 'password';
  passwordToggleIcon: string = 'far fa-eye-slash';

  reenterPasswordFieldType: string = 'password';
  reenterPasswordToggleIcon: string = 'far fa-eye-slash';
  orgId: any ;
  role: any ;

  constructor(
    private fb: FormBuilder,
    private getData: CommonService,
    private alert: AlertService,
    private company: CompanyService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.registerForm = this.fb.group(
      {
        userName: ['', Validators.required],
        password: ['', Validators.required],
        reenterPassword: ['', Validators.required],
        countryOfIncorporation: ['', Validators.required],
        emailId: ['', [Validators.required, Validators.email]],
        cityId: ['', Validators.required],
        stateId: ['', Validators.required],
        countryId: ['', Validators.required],
        alternateContactNumber: [
          '',
          [Validators.required, Validators.maxLength(10)],
        ],
        street: ['', Validators.required],
        zipCode: ['', Validators.required],
      },
      { validators: this.passwordMatchValidator }
    );

    // Listen for changes in countryOfIncorporation and update countryId
    this.registerForm
      .get('countryOfIncorporation')
      ?.valueChanges.subscribe((value) => {
        this.registerForm.patchValue({ countryId: value });
      });
  }
  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      console.log(params); // Log all query params

      this.orgId = params['orgId'];
      this.role = params['role'];
      console.log(`Organization ID: ${this.orgId}, Role: ${this.role}`);
    });
    this.getAllCountryDetails();
  }

  onSubmit() {
    if (this.registerForm.valid) {
      console.log(this.registerForm.value);

      const payload = {
        username: this.registerForm.value.userName,
        password: this.registerForm.value.password,
        countryOfIncorporation: this.registerForm.value.countryOfIncorporation,
        phone: this.registerForm.value.alternateContactNumber,
        createdDate: new Date().toISOString(),
        modifiedDate: new Date().toISOString(),
        email: this.registerForm.value.emailId,
        orgId:this.orgId,
        role:this.role,
        accountStatus: true,
        addressDTO: {
          street: this.registerForm.value.street,
          cityId: this.registerForm.value.cityId,
          stateId: this.registerForm.value.stateId,
          zipCode: this.registerForm.value.zipCode,
          countryId: this.registerForm.value.countryOfIncorporation,
          createdAt: new Date().toISOString(), // Current date and time
          updatedAt: new Date().toISOString(), // Current date and time
        },
      };

      console.log(payload);

      // this.company
      //   .addOrganization('/organization/add', payload)
      //   .subscribe((res) => {
      //     console.log(res);
      //     if (res.statusCode == 0) {
      //       this.alert.showCustomPopup('success', res.responseMessage);
      //       this.router.navigate(['/']);
      //     } else {
      //       this.alert.showCustomPopup('error', res.responseMessage);
      //     }
      //   });
    } else {
      this.showValidationErrors();
    }
  }

  passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
    const password = control.get('password')?.value;
    const confirmPassword = control.get('reenterPassword')?.value;
    return password === confirmPassword ? null : { passwordMismatch: true };
  }

  showValidationErrors() {
    if (this.registerForm.get('userName')?.invalid) {
      this.alert.showCustomPopup('error', 'Please enter user name');
    } else if (this.registerForm.get('password')?.invalid) {
      this.alert.showCustomPopup('error', 'Please enter password');
    } else if (this.registerForm.get('reenterPassword')?.invalid) {
      this.alert.showCustomPopup('error', 'Please enter reenterPassword');
    } else if (this.registerForm.get('countryOfIncorporation')?.invalid) {
      this.alert.showCustomPopup(
        'error',
        'Please select a country of incorporation'
      );
    } else if (this.registerForm.get('emailId')?.invalid) {
      this.alert.showCustomPopup('error', 'Please enter a valid email');
    } else if (this.registerForm.get('cityId')?.invalid) {
      this.alert.showCustomPopup('error', 'Please select a city');
    } else if (this.registerForm.get('stateId')?.invalid) {
      this.alert.showCustomPopup('error', 'Please select a state');
    } else if (this.registerForm.get('countryId')?.invalid) {
      this.alert.showCustomPopup('error', 'Please select a country');
    } else if (this.registerForm.get('alternateContactNumber')?.invalid) {
      this.alert.showCustomPopup('error', 'Please enter a valid mobile number');
    } else if (
      this.registerForm.get('password')?.value !=
      this.registerForm.get('reenterPassword')?.value
    ) {
      this.alert.showCustomPopup('error', 'Passwords do not match');
    } else if (this.registerForm.get('street')?.invalid) {
      this.alert.showCustomPopup('error', 'Please enter street details');
    } else if (this.registerForm.get('zipCode')?.invalid) {
      this.alert.showCustomPopup('error', 'Please enter a valid ZIP code');
    }
  }

  getAllCountryDetails() {
    const req = {
      dataCode: 'GET_ALL_COUNTRY_DETAILS',
      placeholderKeyValueMap: {},
    };
    this.getData.commonData(req).subscribe((res) => {
      if (res.statusCode == 0) {
        this.countryResult = res.responseContent;
      } else {
        this.countryResult = [];
      }
    });
  }

  getStateDetailByCountryId(event: Event) {
    console.log(event);

    const id = (event?.target as HTMLInputElement).value;
    console.log(typeof id);

    const req = {
      dataCode: 'GET_STATE_DETAILS_BY_COUNTRYID',
      placeholderKeyValueMap: {
        countryId: id,
      },
    };
    this.getData.commonData(req).subscribe((res) => {
      if (res.statusCode == 0) {
        this.stateResult = res.responseContent;
      } else {
        this.stateResult = [];
      }
    });
  }

  getCityDetailByStateId(event: Event) {
    console.log(event);

    const id = (event?.target as HTMLInputElement).value;
    console.log(typeof id);

    const req = {
      dataCode: 'GET_CITY_DETAILS_BY_STATEID',
      placeholderKeyValueMap: {
        stateId: id,
      },
    };
    this.getData.commonData(req).subscribe((res) => {
      if (res.statusCode == 0) {
        this.cityResult = res.responseContent;
      } else {
        this.cityResult = [];
      }
    });
  }

  onTogglePasswordVisibility() {
    this.passwordFieldType =
      this.passwordFieldType === 'password' ? 'text' : 'password';
    this.passwordToggleIcon =
      this.passwordToggleIcon === 'far fa-eye-slash'
        ? 'far fa-eye'
        : 'far fa-eye-slash';
  }

  onToggleReenterPasswordVisibility() {
    this.reenterPasswordFieldType =
      this.reenterPasswordFieldType === 'password' ? 'text' : 'password';
    this.reenterPasswordToggleIcon =
      this.reenterPasswordToggleIcon === 'far fa-eye-slash'
        ? 'far fa-eye'
        : 'far fa-eye-slash';
  }
}
