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

  getLogin(path: any, req: any) {
    const url = this.baseUrls + path;
    return this.http.post<any>(url, req);
  }

  getAll(path: any) {
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
    };
    return this.http.get<any>(`${this.baseUrls}${path}`, { headers });
  }

  deleteByKey(path: any,value:any) {
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
    };
    return this.http.delete<any>(`${this.baseUrls}${path}/${value}`, { headers });
  }
}
