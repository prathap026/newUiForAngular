import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-deleted-company',
  templateUrl: './deleted-company.component.html',
  styleUrls: ['./deleted-company.component.css'],
})
export class DeletedCompanyComponent implements OnInit {
  deletedCompanyResult: any[] = [];

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
  dataSource = new MatTableDataSource<any>(this.deletedCompanyResult);

  // Pagination
  itemsPerPage = 10;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  // Handle Page Change
  onPageChange(event: PageEvent): void {
    this.itemsPerPage = event.pageSize;
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

        // Update the dataSource with the new data
        this.dataSource = new MatTableDataSource<any>(
          this.deletedCompanyResult
        );
        // Reassign the paginator to the updated dataSource
        this.dataSource.paginator = this.paginator;
      } else {
        this.deletedCompanyResult = [];
        // Update the dataSource with an empty array
        this.dataSource = new MatTableDataSource<any>(
          this.deletedCompanyResult
        );
      }
    });
  }
}
