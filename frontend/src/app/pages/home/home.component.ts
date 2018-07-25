import {Component, OnInit} from '@angular/core';
import {SessionValues} from '../../models/constants';
import {Translate} from '../../services/translate.service';
import {Company} from '../../models/interfaces';
import {BackendService} from '../../services/backend.service';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {


  companies: Company[] = [];

  constructor(private sessionValues: SessionValues, private translateService: Translate, private backendService: BackendService,
              private sanitizer: DomSanitizer) {
  }

  ngOnInit() {
    if (sessionStorage.getItem(this.sessionValues.LANGUAGE) === null) {
      sessionStorage.setItem(this.sessionValues.LANGUAGE, this.sessionValues.EN);
    }

    this.backendService.get('/company/companies').subscribe(companies =>{
      companies.forEach(c => {
        c.image = this.sanitizer.bypassSecurityTrustResourceUrl('data:image/png;base64, ' + c.image);
      });
      console.log(companies)
      this.companies = companies
    });
    console.log(this.companies);
  }


}
