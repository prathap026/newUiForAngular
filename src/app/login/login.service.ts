import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoginService {



  constructor(private http: HttpClient) {
    const localres = localStorage.getItem('Token');


  }

  userRegister(payload: any): Observable<any> {
    const url = 'http://localhost:5000/api/auth/register'; //   'http://localhost:8080/register';
    return this.http.post<any>(url, payload);
  }

  // userLogin(payload: any): Observable<any> {
  //   const url = 'http://localhost:8089/authenticate'; //'http://localhost:8080/login';
  //   return this.http.post<any>(url, payload);
  // }

  // getUsers(): Observable<any>{

  //   const url = 'http://localhost:8089/getUsers';
  //   return this.http.get(url);
  // }

  userLogin(payload: any): Observable<any> {
    const url = 'http://localhost:5000/api/auth/login';
    return this.http.post(url, payload);
  }

  // http://localhost:8081/getdata 
  getData(payload: any): Observable<any> {
    const url = 'http://192.168.3.56:8081/registration/customdata/getdata';
    return this.http.post(url, payload);
  }

  postUser(payload: any): Observable<any> {
    const url = 'http://192.168.3.56:8081/registration/register/adduser';
    return this.http.post(url, payload)
  }

  // /registration/preregistration/addpreregistartion

}
