import {Component, OnInit} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {SessionValues} from '../../models/constants';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  constructor(private translate: TranslateService, private sessionValues: SessionValues) {
    translate.setDefaultLang('en');
  }

  switchLanguage() {
    if (sessionStorage.getItem(this.sessionValues.LANGUAGE) === 'en') {
      this.translate.use('de');
      sessionStorage.setItem(this.sessionValues.LANGUAGE, 'de');
    } else {
      this.translate.use('en');
      sessionStorage.setItem(this.sessionValues.LANGUAGE, 'en');
    }
  }
  ngOnInit() {
  }

}
