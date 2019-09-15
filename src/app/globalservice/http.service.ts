import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Headers, Http, Response } from '@angular/http';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpRequest } from '@angular/common/http';
import { AppUrlsConst } from '../app.config';
@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) {
    //this.getrefreshtoken();

  }
  
  
  /**
   * 
   * @param data 
   * @param url 
   * @param method 
   * @param opt 
   */
  sendHttpCall(data: any = '', url: any, method: any, opt: HttpHeaders = null) {
    switch (method) {
      case "post":
        return this.http.post<any>(AppUrlsConst.API_URL + url, (data), { headers: opt });
      case "get":
        return this.http.get<any>(AppUrlsConst.API_URL + url);
      case "put":
        return this.http.put<any>(AppUrlsConst.API_URL + url, (data));
      case "delete":
        return this.http.delete<any>(AppUrlsConst.API_URL + url);
      default:
        confirm("Add Method");
    }
  }
  
}
