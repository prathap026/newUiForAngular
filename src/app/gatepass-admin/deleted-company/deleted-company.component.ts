import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-deleted-company',
  templateUrl: './deleted-company.component.html',
  styleUrls: ['./deleted-company.component.css'],
})
export class DeletedCompanyComponent implements OnInit {
  deletedCompanyResult: any[] = [];
  // Pagination properties
  p: number = 1; // Current page
  itemsPerPage: number = 7;

  constructor(private getdate: CommonService) {}
  ngOnInit(): void {
    this.customData();
  }

  customData() {
    const req = {
      dataCode: 'GETALL_DELETED_COMPANY_DETAILS',
      placeholderKeyValueMap: {},
    };
    this.getdate.commonData(req).subscribe((res) => {
      console.log(res);
      if (res.statusCode == 0) {
        this.deletedCompanyResult = res.responseContent;
      } else {
        this.deletedCompanyResult = [];
      }
    });
  }
}
