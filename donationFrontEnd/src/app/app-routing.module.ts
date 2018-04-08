import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {ContactComponent} from './pages/contact/contact.component';
import {HomeComponent} from './pages/home/home.component';
import {LogInComponent} from './pages/log-in/log-in.component';
import {ManageDonationRequestsComponent} from './pages/manage-donation-requests/manage-donation-requests.component';
import {ResetPasswordComponent} from './pages/reset-password/reset-password.component';
import {AuthGuard, CanNotActivate} from './user-page-access/authentification.service';
import {DonateComponent} from './pages/donate/donate.component';

const routes: Routes = [
  //TODO: AuthGuard
  {
    path: '', redirectTo: 'home', pathMatch: 'full'
  },
  {
    path: 'home', component: HomeComponent
  },
  {
    path: 'contact', component: ContactComponent
  },
  {
    path: 'app-donate', component: DonateComponent
  },
  {
    path: 'LogIn', component: LogInComponent
  },
  {
    path: 'manageDonations', component: ManageDonationRequestsComponent
  },
  {
    path: 'reset-password', component: ResetPasswordComponent
  },
  //TODO: AuthGuard
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
