import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {LogInComponent} from './pages/log-in/log-in.component';
import {BackendService} from './backend.service';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private backendService: BackendService, private router: Router) {
  }

  canActivate() {
    if (this.backendService.loggedUsername != null) {
      return true;
    }
    this.router.navigate(['LogIn']);
    return false;
  }

}
