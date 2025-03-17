import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  dataCodeResult: any;

    // Pagination properties
    p: number = 1; // Current page
    itemsPerPage: number = 7;

  constructor(private commonapi: CommonService) {}
  ngOnInit(): void {
    this.getUserHistory();
  }
  getUserHistory() {
    const req = {
      dataCode: 'GETALL_USER_DETAILSBY_ORGID',
      placeholderKeyValueMap: {
        orgId: localStorage.getItem('orgId'),
      },
    };

    this.commonapi.commonData(req).subscribe((res) => {
      this.dataCodeResult = res.responseContent;
      console.log(this.dataCodeResult);

    });
  }
}
