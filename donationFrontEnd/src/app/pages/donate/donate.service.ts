import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Headers, RequestOptions, ResponseContentType} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import {User} from '../../models/user';

@Injectable()
export class DonateService {

  headers = new Headers({'Content-Type': 'images/jpeg'});
  options = new RequestOptions({headers: this.headers});


  constructor(private http: HttpClient) {
  }

  getProducts(url): Observable<any> {
    return this.http.get(url);
  }

  getProducts2(url): Observable<any> {
    return this.http.get(url, {responseType: 'text'});
  }
}
