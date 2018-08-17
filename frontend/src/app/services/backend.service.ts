import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {HttpClient} from '@angular/common/http';
import {Headers, RequestOptions} from '@angular/http';
import {User} from '../models/interfaces';
import {SessionValues} from '../models/constants';

const DEFAULT_URL = 'http://localhost:8080';

@Injectable()
export class BackendService {

  headers = new Headers({'Content-Type': 'application/json'});
  options = new RequestOptions({headers: this.headers});

  // for upload

  imageHeaders = new Headers({'Content-Type': 'images/jpeg'});
  imageOptions = new RequestOptions({headers: this.headers});


  constructor(private httpClient: HttpClient, private sessionValues: SessionValues) {
  }

  public get(url: string): Observable<any> {
    console.log('myconsole log', DEFAULT_URL + url);
    return this.httpClient.get(DEFAULT_URL + url);
  }

  public put(url: string, request?: any): Observable<any> {
    if (!request) {
      return this.httpClient.put(DEFAULT_URL + url, this.options);
    }
    console.log('URL + request', DEFAULT_URL + url, request);
    return this.httpClient.put(DEFAULT_URL + url, request);
  }

  public post(url: string, request?: any): Observable<any> {
    console.log('posttttttttttttt', DEFAULT_URL + url, request);
    if (!request) {
      return this.httpClient.post(DEFAULT_URL + url, this.options);
    }
    return this.httpClient.post(DEFAULT_URL + url, request);
  }

  public delete(url: string, request?: any): Observable<any> {
    console.log(DEFAULT_URL + url, request);
    if (!request) {
      return this.httpClient.delete(DEFAULT_URL + url);
    }
    return this.httpClient.delete(DEFAULT_URL + url, request);
  }


  getSessionUser(): User {
    return JSON.parse(sessionStorage.getItem(this.sessionValues.SESSION_KEY));
  }


  uploadFile(url: string, body): Observable<any> {
    // this.headers.append('Access-Control-Allow-Origin','*');
    return this.httpClient.post(DEFAULT_URL + url, body);
  }


}
