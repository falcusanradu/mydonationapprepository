import {Component, OnInit} from '@angular/core';
import {SessionValues} from '../../models/constants';
import {Translate} from '../../services/translate.service';
import {Company} from '../../models/interfaces';
import {BackendService} from '../../services/backend.service';
import {DomSanitizer} from '@angular/platform-browser';
import {AbstractTable} from '../abstractTable';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent extends AbstractTable implements OnInit {

  tableHeaders = ['name', 'image', 'description', 'email', 'address', 'category'];
  ascendingSort = true;
  companies: Company[] = [];
  // filter by attributes
  showIT = true;
  showOther = true;
  showMarketing = true;

  constructor(private sessionValues: SessionValues, private translateService: Translate, private backendService: BackendService,
              private sanitizer: DomSanitizer) {
    super();
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


  reassignNullValues() {
    this.tableHeaders.forEach(header => {
      this.companies.forEach(company => {
        if (!company[header]) {
          company[header] = '';
        }
      });
    });
  }

  filterBy(event: Event) {
    console.log(this.companies[0].category);
    console.log(event.path[0].id);
    this.companies.filter((c1) => {
      // return
    });

  }


  OnFilter() {
    // TODO change checkboxes
  }

  OnSort(index: number) {
    this.sort(this.companies, this.tableHeaders[index], this.ascendingSort);
    // if (this.ascendingSort) {
    //   this.companies.sort((c1, c2) => {
    //     return c1[this.tableHeaders[index]].toUpperCase() >= c2[this.tableHeaders[index]].toUpperCase();
    //   });
    // } else {
    //   this.companies.sort((c1, c2) => {
    //     return c1[this.tableHeaders[index]].toUpperCase() <= c2[this.tableHeaders[index]].toUpperCase();
    //   });
    // }
    this.ascendingSort = !this.ascendingSort;

  }

}
