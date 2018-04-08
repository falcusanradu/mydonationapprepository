import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {ContactComponent} from './pages/contact/contact.component';
import {HeaderComponent} from './components/header/header.component';
import {HomeComponent} from './pages/home/home.component';
import {FooterComponent} from './components/footer/footer.component';
import {LogInComponent} from './pages/log-in/log-in.component';
import {FormsModule} from '@angular/forms';
import {UserService} from './services/user.service';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {BackendService} from './backend.service';
import {ManageDonationRequestsComponent} from './pages/manage-donation-requests/manage-donation-requests.component';
import {ResetPasswordComponent} from './pages/reset-password/reset-password.component';
import {AuthGuard, CanNotActivate} from './user-page-access/authentification.service';
import {StoredUser} from './user-page-access/stored-user';
import {SessionValues} from './models/constants';
import {HttpModule, Http} from '@angular/http';
import {TranslateModule, TranslateLoader} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {Translate} from './translate.service';
import {DonateComponent} from './pages/donate/donate.component';
import {DonateService} from './pages/donate/donate.service';


export function createTranslateLoader(http_: HttpClient) {
  return new TranslateHttpLoader(http_, 'assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
    ContactComponent,
    HeaderComponent,
    HomeComponent,
    FooterComponent,
    LogInComponent,
    ManageDonationRequestsComponent,
    ResetPasswordComponent,
    DonateComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    HttpModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [Http]
      }
    })
  ],
  providers: [UserService, BackendService, AuthGuard, LogInComponent, ResetPasswordComponent, CanNotActivate, StoredUser, SessionValues,
    Translate, DonateService  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}