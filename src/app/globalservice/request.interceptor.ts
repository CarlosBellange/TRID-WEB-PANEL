import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { of } from 'rxjs';
import { map, filter, catchError, mergeMap } from 'rxjs/operators';

//import { Observable } from 'rxjs/Rx';
import "rxjs";
import "rxjs";
import { Router } from "@angular/router";
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from "@angular/common/http";
//import { HttpService } from "./http.service";
import { AppUrlsConst } from "../app.config";


@Injectable()
export class RequestInterceptorService implements HttpInterceptor {
  constructor(private _router: Router) { }

  /**
   * Take any HTTP request made with HttpClient and add the proper outgoing headers for authentication purposes.
   * @param req
   * @param next
   * @returns {Observable<HttpEvent<any>>}
   */

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // modify the request`
    let dt = location.origin.replace('http://', '');
    // console.log(dt);
    // console.log(req);
    
    if (req.url == AppUrlsConst.API_URL + '/api/workersProfiles/upload/docPdf' && req.method == 'POST') {
      // console.log( this.getToken());
      
      var authReq = req.clone({
        headers:
        
        req.headers
          .append("Content-Type", "application/pdf")
          .append("token", "" + this.getToken())
      });
      
    }

   else if (req.url == AppUrlsConst.API_URL + '/api/companyProfiles/upload/images' && req.method == 'POST') {
      var authReq = req.clone({
        headers: req.headers
          .append("token", "" + this.getToken())
      });
    }

    else {
      var authReq = req.clone({
        headers: req.headers
          .append("Content-Type", "application/json")
          .append("token", "" + this.getToken())
          .append("domain", "" + dt)
      });
    }

    // send to the next interceptor or to its final destination

    return next.handle(authReq).pipe(catchError(err => {
      if (err.status === 401) {
        // auto logout if 401 response returned from api
        this.logout();
      }
      // const error = err.error.message || err.statusText;
      return throwError(err);
    }))
  }
  /**
    * @description LOgout
    */
  logout() {
    this.clearModalIfExists();
    this.cleartoken().then((succ) => {
      this._router.navigate(['./home/sign_in']);
    })
  }
  /**
   * @description Promise structure
   */
  cleartoken(): Promise<any> {
    return new Promise((resolve, reject) => {
      localStorage.removeItem('token');
      resolve('Done');
    })
  }
  /**
   * get the jwt token that was saved to local storage when authentication happened.
   * @returns {string|null}
   */
  protected getToken() {
    let obj: any = JSON.parse(localStorage.getItem('user_data'));
    if (obj) {
      return obj.token;
    } else {
      return '';
    }

  }
  protected gettokenType() {
    let obj: any = JSON.parse(localStorage.getItem('token'));
    return obj.tokenType + '';
  }
  /**
   * Clear Modal when logout
   */
  public clearModalIfExists(): void {
    // Remove backdrops
    const allBackdrops: HTMLCollectionOf<Element> = document.getElementsByClassName('modal-backdrop');
    if (allBackdrops.length) {
      for (let index = 0; index < allBackdrops.length; index++) {
        const element: Element = allBackdrops[index];
        element.remove();
      }
    }
    // Remove "modal-open" class from body
    const bodyClasses: DOMTokenList = document.body.classList;
    if (bodyClasses.length) {
      for (let index = 0; index < bodyClasses.length; index++) {
        const className: string = bodyClasses[index];
        if (className === 'modal-open') {
          document.body.classList.remove(className);
        }
      }
    }
  }
}
