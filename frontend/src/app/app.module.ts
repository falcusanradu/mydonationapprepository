import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HeaderComponent} from './components/header/header.component';
import {HomeComponent} from './pages/home/home.component';
import {FooterComponent} from './components/footer/footer.component';
import {LogInComponent} from './pages/log-in/log-in.component';
import {FormsModule} from '@angular/forms';
import {UserService} from './services/user.service';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {BackendService} from './services/backend.service';
import {ResetPasswordComponent} from './pages/reset-password/reset-password.component';
import {AuthGuard, CanNotActivate} from './user-page-access/authentification.service';
import {StoredUser} from './user-page-access/stored-user';
import {SessionValues} from './models/constants';
import {HttpModule, Http} from '@angular/http';
import {TranslateModule, TranslateLoader} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {Translate} from './services/translate.service';
import {DonateComponent} from './pages/manage donations/donate.component';
import {DonateService} from './pages/manage donations/donate.service';
import {DonateSomethingComponent} from './pages/donate-something/donate-something.component';
import {NgxPaginationModule} from 'ngx-pagination';
import {ChatComponent} from './pages/chat/chat.component';
import {ManageUsersComponent} from './pages/manage-users/manage-users.component';
import {ManageCompanyComponent} from './pages/manage-company/manage-company.component';
import {WebSocketService} from './services/webSocket';

export function createTranslateLoader(http_: HttpClient) {
  return new TranslateHttpLoader(http_, 'assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    FooterComponent,
    LogInComponent,
    ResetPasswordComponent,
    DonateComponent,
    DonateSomethingComponent,
    ChatComponent,
    ManageUsersComponent,
    ManageCompanyComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    HttpModule,
    NgxPaginationModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [Http]
      }
    })
  ],
  providers: [WebSocketService, UserService, BackendService, AuthGuard, LogInComponent, ResetPasswordComponent, CanNotActivate, StoredUser, SessionValues,
    Translate, DonateService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
