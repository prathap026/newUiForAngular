import { Component, OnInit } from '@angular/core';
import { CommonService } from '../../services/common.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  companyResult: any[]=[];
   // Pagination properties
   p: number = 1; // Current page
   itemsPerPage: number = 7;

  constructor(private getdate: CommonService) {}
  ngOnInit(): void {
    this.customData();
  }
  customData() {

    const req = {
      dataCode: 'GETALL_COMPANY_DETAILS_WITH_LOG',
      placeholderKeyValueMap: {},
    };
    this.getdate.commonData(req).subscribe((res) => {
      console.log(res);
      if (res.statusCode == 0) {
        this.companyResult = res.responseContent;
      } else {
        this.companyResult = [];
      }
    });
  }
}
