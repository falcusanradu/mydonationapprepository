import {Component, AfterViewInit, ElementRef} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {SessionValues} from './models/constants';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {

  title = 'app 2';

  constructor(private translate: TranslateService, private sessionValues: SessionValues, private elementRef: ElementRef) {
    translate.setDefaultLang('en');
    sessionStorage.setItem(sessionValues.LANGUAGE, 'en');
  }

  // for the background color
  ngAfterViewInit(): void {
    this.elementRef.nativeElement.ownerDocument.body.style.backgroundColor = '#F8FDFF';

  }

}
