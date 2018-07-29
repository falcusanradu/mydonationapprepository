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
  allCompanies: Company[] = [];

  // for filter
  searchInput: string;
  selectedItem: any;

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
      this.allCompanies = this.companies;
    });
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

  OnFilter(event) {
    // console.log(this.companies[0].category);
    console.log(event.path[0].id);
    if (event.path[0].id === 'all') {
      this.companies = this.allCompanies;
    } else {
      this.companies = this.filter(this.allCompanies, 'category', event.path[0].id);
    }
  }

  OnSort(index: number) {
    this.sort(this.companies, this.tableHeaders[index], this.ascendingSort);
    this.ascendingSort = !this.ascendingSort;

  }

}
