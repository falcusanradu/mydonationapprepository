import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {HttpClient} from '@angular/common/http';
import {Headers, RequestOptions} from '@angular/http';

const DEFAULT_URL = 'http://localhost:8080';

@Injectable()
export class BackendService {

  headers = new Headers({'Content-Type': 'application/json'});
  options = new RequestOptions({headers: this.headers});

  constructor(private httpClient: HttpClient) {
  }

  public get(url: string): Observable<any> {
    console.log('myconsole log', DEFAULT_URL + url);
    return this.httpClient.get(DEFAULT_URL + url);
  }

  public put(url: string, request?: any): Observable<any> {
    if (!request) {
      return this.httpClient.put(DEFAULT_URL + url, this.options);
    }
    return this.httpClient.put(DEFAULT_URL + url, request);
  }

  public post(url: string, request?: any): Observable<any> {
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


}
