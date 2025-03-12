import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CommonService {
  baseUrls = (environment as any).baseUrl;
  constructor(private http: HttpClient) {}

  commonData(req: any): Observable<any> {
    const url = this.baseUrls + '/customdata/getdata';
    return this.http.post<any>(url, req);
  }
}
