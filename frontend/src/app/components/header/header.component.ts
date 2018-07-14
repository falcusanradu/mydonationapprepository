import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {BackendService} from '../../services/backend.service';
import {SessionValues} from '../../models/constants';
import {TranslateService} from '@ngx-translate/core';
import {Translate} from '../../services/translate.service';
import {DomSanitizer} from '@angular/platform-browser';
import {HttpClient} from '@angular/common/http';
import {Http} from '@angular/http';

interface Base64Img {
  login: string;
  logout: string;
  home: string;
  germanyFlag: string;
  britishFlag: string
}

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  private apiHost: string = './assets/images-base64/log-in-out.json';

  private images: Base64Img;

  constructor(private translateService: Translate, private router: Router, private backendService: BackendService,
              private sessionValues: SessionValues, private sanitizer: DomSanitizer, private http: Http) {
  }

  ngOnInit() {
    if (sessionStorage.getItem(this.sessionValues.LANGUAGE) === null) {
      sessionStorage.setItem(this.sessionValues.LANGUAGE, this.sessionValues.EN);
    }
    this.getImages();
  }

  /**
   * logout
   */
  public logout(): void {
    sessionStorage.removeItem(this.sessionValues.SESSION_KEY);
    // sessionStorage.clear();
    this.router.navigate(['/LogIn']);
  }

  /**
   * Verify if a user is logged in.
   * @returns {boolean}
   */
  isSession(): boolean {
    if (sessionStorage.getItem(this.sessionValues.SESSION_KEY) !== null) {
      return true;
    }
    return false;
  }

  /**
   * It switches the language to german.
   */
  switchToGerman() {
    if (sessionStorage.getItem(this.sessionValues.LANGUAGE) !== this.sessionValues.DE) {
      sessionStorage.setItem(this.sessionValues.LANGUAGE, this.sessionValues.DE);
      this.translateService.Language = this.sessionValues.DE;
    }
  }

  /**
   * it switches the language to english.
   */
  switchToEnglish() {
    if (sessionStorage.getItem(this.sessionValues.LANGUAGE) !== this.sessionValues.EN) {
      sessionStorage.setItem(this.sessionValues.LANGUAGE, this.sessionValues.EN);
      this.translateService.Language = this.sessionValues.EN;
    }
  }

  /**
   * It switches the language.
   */
  switchLanguage() {
    if (sessionStorage.getItem(this.sessionValues.LANGUAGE) === this.sessionValues.EN) {
      sessionStorage.setItem(this.sessionValues.LANGUAGE, this.sessionValues.DE);
      this.translateService.Language = this.sessionValues.DE;
    } else if (sessionStorage.getItem(this.sessionValues.LANGUAGE) === this.sessionValues.DE) {
      sessionStorage.setItem(this.sessionValues.LANGUAGE, this.sessionValues.EN);
      this.translateService.Language = this.sessionValues.EN;
    }
  }


  /**
   * All images from the json file
   * @returns {Promise<Object>}
   */
  public getImages(): Promise<Object> {
    return this.http.get(this.apiHost)
      .toPromise()
      .then((response) => {
        this.images = response.json();
        return response.json();
      }).catch((err) => {
        console.log(err);
      });
  }

  /**
   * Get images.
   */
  getLoginImage() {
    if (this.images)
      return this.sanitizer.bypassSecurityTrustResourceUrl('data:image/png;base64, ' + this.images.login);
  }

  getLogoutImage() {
    if (this.images)
      return this.sanitizer.bypassSecurityTrustResourceUrl('data:image/png;base64, ' + this.images.logout);

  }

  getHomeImage() {
    if (this.images)
      return this.sanitizer.bypassSecurityTrustResourceUrl('data:image/png;base64, ' + this.images.home);
  }

  getGermanyFlagImage() {
    if (this.images)
      return this.sanitizer.bypassSecurityTrustResourceUrl('data:image/png;base64, ' + this.images.germanyFlag);
  }

  getBritishFlagImage() {
    if (this.images)
      return this.sanitizer.bypassSecurityTrustResourceUrl('data:image/png;base64, ' + this.images.britishFlag);
  }

}
