import {Component} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {SessionValues} from './models/constants';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'app 2';

  constructor(private translate: TranslateService, private sessionValues: SessionValues) {
    translate.setDefaultLang('en');
    sessionStorage.setItem(sessionValues.LANGUAGE, 'en');
  }
}
