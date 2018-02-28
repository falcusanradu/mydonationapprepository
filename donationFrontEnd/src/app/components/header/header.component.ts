import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {BackendService} from '../../backend.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private router: Router, private backendService: BackendService) {
  }

  ngOnInit() {
  }

  public goHome(): void {
    this.router.navigate(['/home']);
  }

  public logout(): void {
    this.backendService.loggedUsername = null;
    this.backendService.userRole = null;
    sessionStorage.clear();
    this.router.navigate(['/LogIn']);
  }


}
