import 'rxjs/add/operator/map';
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {BackendService} from './backend.service';
import {RequestOptions} from '@angular/http';
import {Headers} from '@angular/http';
import {User} from '../models/user';

@Injectable()
export class UserService {

  headers = new Headers({'Content-Type': 'application/json'});
  options = new RequestOptions({headers: this.headers});


  constructor(private backendService: BackendService, private http: HttpClient) {
  }

  login(username, password): Observable<any> {
    const user: any = {
      'username': username,
      'password': password
    };
    return this.backendService.post('/login/', user);
  }

  register(username, password, email): Observable<any> {
    const user: any = {
      'username': username,
      'password': password,
      'email': email,
    };
    return this.http.post('http://localhost:8080/register/', user);
  }


}
