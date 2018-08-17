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

  name: string;
  email: string;
  address: string;
  description: string;
  image: string;
  category: any;

  companyCategory: any[] = [];

  disabled = true;
  loggedUser: User;

  constructor(private backendService: BackendService, private sanitizer: DomSanitizer) {
  }

  ngOnInit() {
    this.loadLoggedUserWithCompany();
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

  saveActions() {
    this.setAttributes(true);
    this.backendService.put('/company/update', this.loggedUser.company).subscribe();
    this.loadLoggedUserWithCompany(true);
    this.loadLoggedUserWithCompany();
  }

  private loadLoggedUserWithCompany(inverse ?: any) {
    this.companyCategory = Object.keys(CategoryEnum).map(key => CategoryEnum[key]).filter(key => isNaN(key));
    this.loggedUser = this.backendService.getSessionUser();
    this.backendService.get(`/getUser/${this.loggedUser.id}`).subscribe((response) => {
      this.loggedUser = response;
      this.setAttributes();
    });
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
    this.setAttributes();
  }

  private setAttributes(inverse ?: any) {
    if (inverse) {
      this.loggedUser.company.name = this.name;
      this.loggedUser.company.email = this.email;
      this.loggedUser.company.address = this.address;
      this.loggedUser.company.description = this.description;
      this.loggedUser.company.image = this.image;
      this.loggedUser.company.category = this.category;
    } else {
      this.name = this.loggedUser.company.name;
      this.email = this.loggedUser.company.email;
      this.address = this.loggedUser.company.address;
      this.description = this.loggedUser.company.description;
      this.image = this.loggedUser.company.image;
      this.category = this.loggedUser.company.category;
    }
  }

}
