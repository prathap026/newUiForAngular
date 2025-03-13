import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-redis',
  templateUrl: './redis.component.html',
  styleUrls: ['./redis.component.css'],
})
export class RedisComponent implements OnInit {
  redisResult: any[] = [];
  // Pagination properties
  p: number = 1; // Current page
  itemsPerPage: number = 7;
  constructor(private getdate: CommonService) {}
  ngOnInit(): void {
    this.getAllStoredRedisKeysAndItsValues();
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
      } else {
        this.redisResult = [];
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
