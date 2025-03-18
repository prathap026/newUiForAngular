import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-redis',
  templateUrl: './redis.component.html',
  styleUrls: ['./redis.component.css'],
})
export class RedisComponent implements OnInit {
  redisResult: any[] = [];

  constructor(private getdate: CommonService) {}
  ngOnInit(): void {
    this.getAllStoredRedisKeysAndItsValues();
    this.dataSource.paginator = this.paginator;
  }

  // MatTable Configuration
  displayedColumns: string[] = ['key', 'value', 'delete'];
  dataSource = new MatTableDataSource<any>(this.redisResult);

  // Pagination
  itemsPerPage = 10;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  onPageChange(event: PageEvent): void {
    this.itemsPerPage = event.pageSize;
  }

  getAllStoredRedisKeysAndItsValues() {
    this.getdate.getAll('/redis/getAllkeys').subscribe((res: any) => {
      // Use 'any' for the response type
      console.log(res);
      if (res.statusCode === 0) {
        // Transform responseContent into an array of key-value pairs
        this.redisResult = Object.entries(res.responseContent).map(
          ([key, value]) => ({
            key,
            value:
              (value as { appValue?: string; queryContent?: string })
                .appValue ||
              (value as { queryContent?: string }).queryContent ||
              JSON.stringify(value), // Fallback to stringifying the value
          })
        );
        this.dataSource = new MatTableDataSource<any>(this.redisResult);
        this.dataSource.paginator = this.paginator;
      } else {
        this.redisResult = [];
        this.dataSource = new MatTableDataSource<any>(this.redisResult);
        this.dataSource.paginator = this.paginator;
      }
    });
  }

  deleteRedisvalueFromKey(item: any) {
    this.getdate
      .deleteByKey('/redis/deletebykey', item)
      .subscribe((res: any) => {
        console.log(res);
        if (res.statusCode === 0) {
          this.getAllStoredRedisKeysAndItsValues();
        }
      });
  }
}
