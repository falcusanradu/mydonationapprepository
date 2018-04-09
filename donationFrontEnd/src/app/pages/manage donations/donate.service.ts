import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Headers, RequestOptions} from '@angular/http';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class DonateService {

  headers = new Headers({'Content-Type': 'images/jpeg'});
  options = new RequestOptions({headers: this.headers});


  constructor(private http: HttpClient) {
  }

  getProducts(url): Observable<any> {
    return this.http.get(url);
  }

  uploadFile(url: string, body): Observable<any> {
    // this.headers.append('Access-Control-Allow-Origin','*');
    return this.http.post(url, body);
  }
}
