import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Apollo, gql } from 'apollo-angular';
import { GET_ALL_COMPANIES_QUERY, GET_COMPANY_BY_ID_QUERY } from '../graphql/queries/company.queries';
import {DELETE_REDIS_KEY, GET_ALL_REDIS_DETAILS} from '../graphql/queries/redis.queries';

@Injectable({
  providedIn: 'root',
})
export class CommonService {
  baseUrls = (environment as any).baseUrl;
  constructor(
    private http: HttpClient,
    private router: Router,
    private apollo: Apollo
  ) {}

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

  deleteByKey(path: any, value: any) {
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
    };
    return this.http.delete<any>(`${this.baseUrls}${path}/${value}`, {
      headers,
    });
  }

  logoutService() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }
  private getGraphQLContext() {
    return {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
    };
  }

  graphqlQuery<T>(query: string, variables?: any) {
    return this.apollo.query<T>({
      query: gql`
        ${query}
      `,
      variables,
      context: this.getGraphQLContext(),
    });
  }

  getCompanies() {
    return this.graphqlQuery<any>(GET_ALL_COMPANIES_QUERY, {});
  }

  getAllRedis() {
    return this.graphqlQuery<any>(GET_ALL_REDIS_DETAILS, {});
  }


  getCompanyById(id: string) {

    return this.graphqlQuery<any>(GET_COMPANY_BY_ID_QUERY, { id });
  }

  searchCompanyByName(companyName: string) {
    const query = `
      query SearchCompany($companyName: String!) {
        findBycompanyName(companyName: $companyName) {
          id
          companyName
          emailId
        }
      }
    `;
    return this.graphqlQuery<any>(query, { companyName });
  }

  deleteRedisKey(key: string) {
    return this.apollo.mutate({
      mutation: DELETE_REDIS_KEY,
      variables: { key },
    });
  }
}
