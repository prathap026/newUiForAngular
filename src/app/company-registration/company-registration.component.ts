import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonService } from '../services/common.service';

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

  constructor(private fb: FormBuilder, private getData: CommonService) {
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
