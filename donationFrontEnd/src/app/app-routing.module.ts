import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {ContactComponent} from './pages/contact/contact.component';
import {HomeComponent} from './pages/home/home.component';
import {LogInComponent} from './pages/log-in/log-in.component';
import {ManageDonationRequestsComponent} from './pages/manage-donation-requests/manage-donation-requests.component';
import {ResetPasswordComponent} from './pages/reset-password/reset-password.component';
import {AuthGuard, CanNotActivate} from './user-page-access/authentification.service';

const routes: Routes = [
  {
    path: '', redirectTo: 'home', pathMatch: 'full', canActivate: [AuthGuard]
  },
  {
    path: 'home', component: HomeComponent, canActivate: [AuthGuard]
  },
  {
    path: 'contact', component: ContactComponent, canActivate: [AuthGuard]
  },
  {
    path: 'LogIn', component: LogInComponent, canActivate: [CanNotActivate]
  },
  {
    path: 'manageDonations', component: ManageDonationRequestsComponent
  },
  {
    path: 'reset-password', component: ResetPasswordComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
