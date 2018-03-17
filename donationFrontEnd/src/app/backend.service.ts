import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {HttpClient} from '@angular/common/http';
import {Headers, RequestOptions} from '@angular/http';

@Injectable()
export class BackendService {

  headers = new Headers({'Content-Type': 'application/json'});
  options = new RequestOptions({headers: this.headers});

  loggedUsername: string;
  userRole: string;

  constructor(private http: HttpClient) {
  }

  public get(url: string, request?: any): Observable<any> {
    if (!request) {
      return this.http.post(url, this.options);
    }
    return this.http.get(url, request);
  }

  public put(url: string, request?: any): Observable<any> {
    if (!request) {
      return this.http.post(url, this.options);
    }
    return this.http.put(url, request);
  }

  public post(url: string, request?: any): Observable<any> {
    if (!request) {
      return this.http.post(url, this.options);
    }
    return this.http.post(url, request);
  }


}
