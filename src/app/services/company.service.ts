import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CompanyService {
  baseUrls = (environment as any).baseUrl;
  constructor(private http: HttpClient, private router: Router) {}


  addOrganization(path: any, req: any) {
    const url = this.baseUrls + path;
    return this.http.post<any>(url, req);
  }


  sendEmailInvite(path: any, req: any) {
    const url = this.baseUrls + path;
    return this.http.post<any>(url, req);
  }
}
