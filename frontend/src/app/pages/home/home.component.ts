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

  tableHeaders = ['name', 'image', 'description', 'email', 'address', 'category'];
  ascendingSort: boolean = true;
  companies: Company[] = [];

  constructor(private sessionValues: SessionValues, private translateService: Translate, private backendService: BackendService,
              private sanitizer: DomSanitizer) {
  }

  ngOnInit() {
    if (sessionStorage.getItem(this.sessionValues.LANGUAGE) === null) {
      sessionStorage.setItem(this.sessionValues.LANGUAGE, this.sessionValues.EN);
    }

    this.backendService.get('/company/companies').subscribe(companies => {
      companies.forEach(c => {
        c.image = this.sanitizer.bypassSecurityTrustResourceUrl('data:image/png;base64, ' + c.image);
      });
      this.companies = companies;
      this.reassignNullValues();
    });
    console.log(this.companies);
  }


  sort(index: number) {
    if (this.ascendingSort) {
      this.companies.sort((c1, c2) => {
        return c1[this.tableHeaders[index]].toUpperCase() >= c2[this.tableHeaders[index]].toUpperCase();
      });
    } else {
      this.companies.sort((c1, c2) => {
        return c1[this.tableHeaders[index]].toUpperCase() <= c2[this.tableHeaders[index]].toUpperCase();
      });
    }
    this.ascendingSort = !this.ascendingSort;

  }


  reassignNullValues() {
    this.tableHeaders.forEach(header => {
      this.companies.forEach(company => {
        if (!company[header]) {
          company[header] = '';
        }
      });
    });
  }
}
