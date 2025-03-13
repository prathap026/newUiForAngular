import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonService } from '../services/common.service';
import { AlertService } from '../services/alert.service';

@Component({
  selector: 'app-company-registration',
  templateUrl: './company-registration.component.html',
  styleUrls: ['./company-registration.component.css'],
})
export class CompanyRegistrationComponent implements OnInit {
  registerForm: FormGroup;
  countryResult: any[] = [];

  stateResult: any[] = [];
  cityResult: any[] = [];

  constructor(
    private fb: FormBuilder,
    private getData: CommonService,
    private alert: AlertService
  ) {
    this.registerForm = this.fb.group({
      companyName: ['', Validators.required],
      companyShortName: ['', Validators.required],
      dateOfEstablishment: ['', Validators.required],
      countryOfIncorporation: ['', Validators.required],
      emailId: ['', [Validators.required, Validators.email]],
      cityId: ['', Validators.required],
      stateId: ['', Validators.required],
      countryId: ['', Validators.required],
      alternateContactNumber: [
        '',
        [Validators.required, Validators.maxLength(10)],
      ],
      registrationNumber: ['', Validators.required],
      gst: ['', Validators.required],
      landlineNumber: ['', Validators.required],
      websiteUrl: ['', Validators.required],
      businessPanCard: ['', Validators.required],
      street: ['', Validators.required],
      zipCode: ['', Validators.required],
      comment: ['', Validators.required],
    });

    // Listen for changes in countryOfIncorporation and update countryId
    this.registerForm
      .get('countryOfIncorporation')
      ?.valueChanges.subscribe((value) => {
        this.registerForm.patchValue({ countryId: value });
      });
  }
  ngOnInit(): void {
    this.getAllCountryDetails();
  }

  onSubmit() {
    if (this.registerForm.valid) {
      console.log(this.registerForm.value);
      alert('Registration Successful!');
    } else {
      this.showValidationErrors();
    }
  }

  showValidationErrors() {
    if (this.registerForm.get('companyName')?.invalid) {
      this.alert.showCustomPopup('error', 'Please enter company name');
    }
    else if (this.registerForm.get('companyShortName')?.invalid) {
      this.alert.showCustomPopup('error', 'Please enter company short name');
    }
    else if (this.registerForm.get('dateOfEstablishment')?.invalid) {
      this.alert.showCustomPopup(
        'error',
        'Please enter the date of establishment'
      );
    }
    else if (this.registerForm.get('countryOfIncorporation')?.invalid) {
      this.alert.showCustomPopup(
        'error',
        'Please select a country of incorporation'
      );
    }
    else if (this.registerForm.get('emailId')?.invalid) {
      this.alert.showCustomPopup('error', 'Please enter a valid email');
    }
    else if (this.registerForm.get('cityId')?.invalid) {
      this.alert.showCustomPopup('error', 'Please select a city');
    }
    else if (this.registerForm.get('stateId')?.invalid) {
      this.alert.showCustomPopup('error', 'Please select a state');
    }
    else if (this.registerForm.get('countryId')?.invalid) {
      this.alert.showCustomPopup('error', 'Please select a country');
    }
    else if (this.registerForm.get('alternateContactNumber')?.invalid) {
      this.alert.showCustomPopup('error', 'Please enter a valid mobile number');
    }
    else if (this.registerForm.get('registrationNumber')?.invalid) {
      this.alert.showCustomPopup(
        'error',
        'Please enter the registration number'
      );
    }
    else if (this.registerForm.get('gst')?.invalid) {
      this.alert.showCustomPopup('error', 'Please enter GST details');
    }
    else if (this.registerForm.get('landlineNumber')?.invalid) {
      this.alert.showCustomPopup('error', 'Please enter a landline number');
    }
    else if (this.registerForm.get('websiteUrl')?.invalid) {
      this.alert.showCustomPopup('error', 'Please enter a valid website URL');
    }
    else if (this.registerForm.get('businessPanCard')?.invalid) {
      this.alert.showCustomPopup(
        'error',
        'Please enter a valid PAN card number'
      );
    }
    else if (this.registerForm.get('street')?.invalid) {
      this.alert.showCustomPopup('error', 'Please enter street details');
    }
    else if (this.registerForm.get('zipCode')?.invalid) {
      this.alert.showCustomPopup('error', 'Please enter a valid ZIP code');
    }
    else if (this.registerForm.get('comment')?.invalid) {
      this.alert.showCustomPopup('error', 'Please enter additional comments');
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
}
