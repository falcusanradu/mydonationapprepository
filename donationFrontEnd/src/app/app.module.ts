import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';

import {AppComponent} from './app.component';
import {ContactComponent} from './pages/contact/contact.component';
import {HeaderComponent} from './components/header/header.component';
import {HomeComponent} from './pages/home/home.component';
import {SignUpComponent} from './pages/sign-up/sign-up.component';
import {FooterComponent} from './components/footer/footer.component';
import {LogInComponent} from './pages/log-in/log-in.component';
import {FormsModule} from '@angular/forms';
import {UserService} from './services/user.service';
import {HttpClientModule} from '@angular/common/http';
import {BackendService} from './backend.service';
import {AuthGuard} from './authentification.service';
import { ManageDonationRequestsComponent } from './pages/manage-donation-requests/manage-donation-requests.component';


@NgModule({
  declarations: [
    AppComponent,
    ContactComponent,
    HeaderComponent,
    HomeComponent,
    SignUpComponent,
    FooterComponent,
    LogInComponent,
    ManageDonationRequestsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [UserService, BackendService, AuthGuard, LogInComponent],
  bootstrap: [AppComponent]
})
export class AppModule {
}
