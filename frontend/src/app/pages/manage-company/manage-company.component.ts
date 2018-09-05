import {Component, OnInit} from '@angular/core';
import {CategoryEnum, User} from '../../models/interfaces';
import {BackendService} from '../../services/backend.service';
import {DomSanitizer} from '@angular/platform-browser';
import {DonateService} from '../manage donations/donate.service';
import {SessionValues} from '../../models/constants';
import {Router} from '@angular/router';
import {TranslateService} from '@ngx-translate/core';
import {Translate} from '../../services/translate.service';

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
  // for upload file
  file: File = null;

  // sessionStorage.setItem(this.sessionValues.SESSION_KEY, JSON.stringify(data));

  companyCategory: any[] = [];

  disabled = true;
  loggedUser: User;

  errorMsg = this.translate.getTranslatedItem('Fields must not be empty');
  error = false;

  constructor(private sessionValues: SessionValues, private backendService: BackendService, private sanitizer: DomSanitizer,
              private donateService: DonateService, private router: Router,  private translate: Translate) {
  }


  ngOnInit() {
    if (!sessionStorage.getItem(this.sessionValues.SESSION_KEY)) {
      this.router.navigate(['LogIn']);
    }
    this.init();
  }

  trustImage(image) {
    return this.sanitizer.bypassSecurityTrustResourceUrl('data:image/png;base64, ' + image);
  }

  edit() {
    this.disabled = false;
  }

  cancel() {
    this.setAttributes();
    this.error = false;
    this.disabled = true;
  }

  hasCompany() {
    this.loggedUser = this.backendService.getSessionUser();
    if (!this.loggedUser.company) {
      return false;
    }
    if (this.loggedUser.company.idCompany) {
      return true;
    }
    return false;
  }

  fieldsNotEmpty(): boolean {
    const nullCheck: boolean = this.name != null && this.email != null && this.address != null && this.description != null && this.category != null;
    if (nullCheck == false) {
      return false;
    }
    const emptyCheck: boolean = this.name.length > 0 && this.email.length > 0 && this.address.length > 0 && this.description.length > 0;
    return nullCheck && emptyCheck;
  }

  saveActions() {
    if (!this.fieldsNotEmpty()) {
      this.error = true;
    } else {
      this.error = false;
    }
    if (!this.error) {
      this.setInverseAttributes();
      this.backendService.put('/company/update', this.loggedUser.company).subscribe(() => {
        this.uploadFile();
        // this.loadLoggedUserWithCompany();
        this.init();
      });
    }
  }

  onFileSelected(event) {
    this.file = event.target.files[0];
  }

  uploadFile() {
    this.loadLoggedUserWithCompany();
    if (this.file) {
      this.backendService.post(`/company/uploadFile/${this.file.name}/${this.loggedUser.company.idCompany}`, this.file).subscribe();
    }
  }

  onSelectionChangeRadio(category: any) {
    this.category = category;
  }

  isCompanyDisplayed() {
    if (!this.loggedUser || !this.loggedUser.company) {
      return false;
    }
    if (this.loggedUser.company.idCompany && this.loggedUser.company.name) {
      return true;
    }
    return false;
  }

  deleteCompany() {
    this.backendService.delete(`/deleteByUser/${this.loggedUser.id}`).subscribe(() => {
      this.router.navigate(['/home']);
      this.init();
    });
  }

  private loadLoggedUserWithCompany() {
    this.backendService.get(`/findByUsername/${this.loggedUser.username}`).subscribe((response => {

      sessionStorage.setItem(this.sessionValues.SESSION_KEY, JSON.stringify(response));
      this.companyCategory = Object.keys(CategoryEnum).map(key => CategoryEnum[key]).filter(key => isNaN(key));
      this.loggedUser = response;
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
    }));
  }

  private setAttributes() {
    if (this.loggedUser.company) {
      this.name = this.loggedUser.company.name;
      this.email = this.loggedUser.company.email;
      this.address = this.loggedUser.company.address;
      this.description = this.loggedUser.company.description;
      this.image = this.loggedUser.company.image;
      this.category = this.loggedUser.company.category;
    }
  }

  private setInverseAttributes() {
    if (this.loggedUser.company) {
      this.loggedUser.company.name = this.name;
      this.loggedUser.company.email = this.email;
      this.loggedUser.company.address = this.address;
      this.loggedUser.company.description = this.description;
      this.loggedUser.company.category = this.category;
    }
  }

  private init() {
    this.backendService.get(`/getUser/${this.backendService.getSessionUser().id}`).subscribe((data) => {
      sessionStorage.setItem(this.sessionValues.SESSION_KEY, JSON.stringify(data));
      this.loadLoggedUserWithCompany();
      if (!this.loggedUser.company.name) {
        this.disabled = false;
      }
    });
  }


}
