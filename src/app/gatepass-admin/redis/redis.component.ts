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
  onPageChange(event: PageEvent): void {
    this.itemsPerPage = event.pageSize;
  }

  getAllStoredRedisKeysAndItsValues() {
    // this.getdate.getAll('/redis/getAllkeys').subscribe((res: any) => {
    //   // Use 'any' for the response type
    //   console.log(res);
    //   if (res.statusCode === 0) {
    //     // Transform responseContent into an array of key-value pairs
    //     this.redisResult = Object.entries(res.responseContent).map(
    //       ([key, value]) => ({
    //         key,
    //         value:
    //           (value as { appValue?: string; queryContent?: string })
    //             .appValue ||
    //           (value as { queryContent?: string }).queryContent ||
    //           JSON.stringify(value), // Fallback to stringifying the value
    //       })
    //     );
    //     this.dataSource = new MatTableDataSource<any>(this.redisResult);
    //     this.dataSource.paginator = this.paginator;
    //   } else {
    //     this.redisResult = [];
    //     this.dataSource = new MatTableDataSource<any>(this.redisResult);
    //     this.dataSource.paginator = this.paginator;
    //   }
    // });
  }

  // getAllRedisDetailsByRedis(){
  //   this.getdate.getAllRedis().subscribe((res: any) => {
  //     console.log(res);
  //     if (res!==null) {
  //       this.redisResult = Object.entries(res.data.getAllRedisKeys).map(
  //         ([key, value]) => ({
  //           key,
  //           value:
  //             (value as { appValue?: string; queryContent?: string })
  //               .appValue ||
  //             (value as { queryContent?: string }).queryContent ||
  //             JSON.stringify(value),
  //         })
  //       );
  //       this.dataSource = new MatTableDataSource<any>(this.redisResult);
  //       this.dataSource.paginator = this.paginator;
  //     } else {
  //       this.redisResult = [];
  //       this.dataSource = new MatTableDataSource<any>(this.redisResult);
  //       this.dataSource.paginator = this.paginator;
  //     }
  //   });
  // }

  // deleteRedisvalueFromKey(item: any) {
  //   this.getdate
  //     .deleteByKey('/redis/deletebykey', item)
  //     .subscribe((res: any) => {
  //       console.log(res);
  //       if (res.statusCode === 0) {
  //         this.getAllStoredRedisKeysAndItsValues();
  //       }
  //     });
  // }

  redisResult: any[] = [];
  displayedColumns: string[] = ['key', 'value', 'delete'];
  dataSource = new MatTableDataSource<any>(this.redisResult);
  itemsPerPage = 10;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private commonService: CommonService) {}

  ngOnInit(): void {
    this.getAllRedisDetailsByRedis();
    this.dataSource.paginator = this.paginator;
  }

  getAllRedisDetailsByRedis() {
    this.commonService.getAllRedis().subscribe((res: any) => {
      if (res && res.data && res.data.getAllRedisKeys) {
        this.redisResult = res.data.getAllRedisKeys.map((item: any) => ({
          key: item.key,
          value: item.value,
        }));
        this.dataSource.data = this.redisResult;
      } else {
        this.redisResult = [];
        this.dataSource.data = this.redisResult;
      }
    });
  }

  deleteRedisvalueFromKey(key: string) {
    this.commonService.deleteRedisKey(key).subscribe(
      (res: any) => {
        if (res.data && res.data.deleteRedisKey === 'Deleted Success') {
          // Remove the deleted item from the local redisResult array
          this.redisResult = this.redisResult.filter(
            (item) => item.key !== key
          );
          // Reassign the dataSource with the updated array
          this.dataSource.data = this.redisResult;
        } else {
          console.error('Delete operation failed');
        }
      },
      (error) => {
        console.error('Error deleting key:', error);
      }
    );
  }
}
