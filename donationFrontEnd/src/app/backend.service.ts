import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class BackendService {

  loggedUsername: string = null;
  userRole: string = null;

  constructor(private http: HttpClient) {
  }

  public get(url: string, request?: any): Observable<any> {
    return this.http.get(url, request);
  }

  public put(url: string, request?: any): Observable<any> {
    return this.http.put(url, request);
  }

  public post(url: string, request?: any): Observable<any> {
    return this.http.post(url, request);
  }


}
