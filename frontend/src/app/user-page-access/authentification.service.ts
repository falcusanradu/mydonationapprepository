import {Injectable} from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {StoredUser} from './stored-user';
import {SessionValues} from '../models/constants';
import {BackendService} from '../services/backend.service';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private backendService: BackendService, private router: Router, private sessionValues: SessionValues) {
  }

  canActivate() {
    if (sessionStorage.getItem(this.sessionValues.SESSION_KEY)) {
      return true;
    }
    this.router.navigate(['LogIn']);
    return false;
  }

}

@Injectable()
export class CanNotActivate implements CanActivate {

  constructor(private storedUser: StoredUser, private router: Router, private sessionValues: SessionValues) {
  }

  canActivate() {
    if (!sessionStorage.getItem(this.sessionValues.SESSION_KEY)) {
      return true;
    } else {
      this.router.navigate(['home']);
      return false;
    }
  }

}

