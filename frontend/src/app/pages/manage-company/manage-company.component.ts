import {Component, OnInit} from '@angular/core';
import {CategoryEnum, User} from '../../models/interfaces';
import {BackendService} from '../../services/backend.service';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'app-manage-company',
  templateUrl: './manage-company.component.html',
  styleUrls: ['./manage-company.component.scss']
})
export class ManageCompanyComponent implements OnInit {

  companyCategory: any[] = [];

  disabled = true;
  loggedUser: User;

  constructor(private backendService: BackendService, private sanitizer: DomSanitizer) {
  }

  ngOnInit() {
    this.companyCategory = Object.keys(CategoryEnum).map(key => CategoryEnum[key]).filter(key => isNaN(key));
    this.loggedUser = this.backendService.getSessionUser();
    if (this.loggedUser.company) {
      this.disabled = true;
    } else {
      this.disabled = false;
      this.loggedUser.company = {
        idCompany: null,
        image: null,
        description: '',
        email: '',
        address: '',
        category: null,
        userCompany: null,
        name: ''
      };
    }
  }

  trustImage(image) {
    return this.sanitizer.bypassSecurityTrustResourceUrl('data:image/png;base64, ' + image);
  }

  edit() {
    this.disabled = false;
  }

  cancel() {
    this.disabled = true;
  }

  hasCompany() {
    if (this.loggedUser.company.idCompany) {
      return true;
    }
    return false;
  }


}
