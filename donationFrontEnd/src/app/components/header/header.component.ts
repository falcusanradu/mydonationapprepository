import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {BackendService} from '../../services/backend.service';
import {SessionValues} from '../../models/constants';
import {TranslateService} from '@ngx-translate/core';
import {Translate} from '../../services/translate.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private translateService: Translate, private router: Router, private backendService: BackendService,
              private sessionValues: SessionValues) {
  }

  ngOnInit() {
    if (sessionStorage.getItem(this.sessionValues.LANGUAGE) === null) {
      sessionStorage.setItem(this.sessionValues.LANGUAGE, this.sessionValues.EN);
    }
  }

  public logout(): void {
    sessionStorage.removeItem(this.sessionValues.SESSION_KEY);
    // sessionStorage.clear();
    this.router.navigate(['/LogIn']);
  }

  isSession(): boolean {
    if (sessionStorage.getItem(this.sessionValues.SESSION_KEY) !== null) {
      return true;
    }
    return false;
  }


  switchLanguage() {
    if (sessionStorage.getItem(this.sessionValues.LANGUAGE) === this.sessionValues.EN) {
      sessionStorage.setItem(this.sessionValues.LANGUAGE, this.sessionValues.DE);
      this.translateService.Language = this.sessionValues.DE;
    } else if (sessionStorage.getItem(this.sessionValues.LANGUAGE) === this.sessionValues.DE) {
      sessionStorage.setItem(this.sessionValues.LANGUAGE, this.sessionValues.EN);
      this.translateService.Language = this.sessionValues.EN;
    }
  }

}
