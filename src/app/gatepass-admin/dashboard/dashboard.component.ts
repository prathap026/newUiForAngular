import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonService } from '../../services/common.service';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  companyResult: any[] = [];

  constructor(private getdate: CommonService) {}
  ngOnInit(): void {
    this.customData();
  }
  // MatTable Configuration
  displayedColumns: string[] = [
    'companyName',
    'companyShortName',
    'mobileNumber',
    'email',
    'landlineNumber',
    'websiteUrl',
    'status',
  ];
  dataSource = new MatTableDataSource<any>(this.companyResult);

  // Pagination
  itemsPerPage = 10;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  // Handle Page Change
  onPageChange(event: PageEvent): void {
    this.itemsPerPage = event.pageSize;
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
        // Update the dataSource with the new data
        this.dataSource = new MatTableDataSource<any>(this.companyResult);
        // Reassign the paginator to the updated dataSource
        this.dataSource.paginator = this.paginator;
      } else {
        this.companyResult = [];
        // Update the dataSource with an empty array
        this.dataSource = new MatTableDataSource<any>(this.companyResult);
      }
    });
  }
}
