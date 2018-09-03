import {Component, DoCheck, HostBinding, KeyValueDiffer, KeyValueDiffers, OnInit} from '@angular/core';
import {SessionValues} from '../../models/constants';
import {Translate} from '../../services/translate.service';
import {Company, User} from '../../models/interfaces';
import {BackendService} from '../../services/backend.service';
import {DomSanitizer} from '@angular/platform-browser';
import {AbstractTable} from '../abstractTable';
import {Router} from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent extends AbstractTable implements OnInit, DoCheck {

  tableHeaders = ['name', 'image', 'description', 'email', 'address', 'category', 'contact'];
  ascendingSort = true;
  companies: Company[] = [];
  allCompanies: Company[] = [];

  // for filter
  searchInput = '';
  oldSearchInput = '';
  dropDownItems: string [] = ['name', 'description', 'email', 'address', 'category', 'contact'];
  selectedItem: any;

  constructor(private sessionValues: SessionValues, private translateService: Translate, private backendService: BackendService,
              private sanitizer: DomSanitizer, private differs: KeyValueDiffers, private router: Router) {
    super();
  }

  ngDoCheck() {
    if (this.searchInput !== this.oldSearchInput) {
      this.OnFilter();
      this.oldSearchInput = this.searchInput;
    }
  }


  ngOnInit() {
    if (!sessionStorage.getItem(this.sessionValues.SESSION_KEY)) {
      this.router.navigate(['LogIn']);
    }
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
      this.setContact();
    });
    this.selectedItem = this.dropDownItems[0];
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

  OnFilter() {
    this.companies = this.filter(this.allCompanies, this.selectedItem, this.searchInput);
  }

  OnSort(index: number) {
    this.companies = this.sort(this.companies, this.tableHeaders[index], this.ascendingSort);
    this.ascendingSort = !this.ascendingSort;

  }

  changeSelectedItem(item) {
    this.selectedItem = item;
    this.companies = this.allCompanies;
    this.searchInput = '';
  }

  private setContact() {
    this.backendService.get(`/users`).subscribe(users => {
      users.forEach(u => {
        this.allCompanies.forEach(c => {
          if (u.company && c.idCompany === u.company.idCompany) {
            c.contact = u.username;
          }
        });
      });

    });
  }

  hasContactAssigned(company) {
    if (company.contect) {
      return true;
    }
    return false;
  }

}
