import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {ContactComponent} from './pages/contact/contact.component';
import {HomeComponent} from './pages/home/home.component';
import {LogInComponent} from './pages/log-in/log-in.component';
import {AuthGuard} from './authentification.service';
import {ManageDonationRequestsComponent} from './pages/manage-donation-requests/manage-donation-requests.component';

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
    path: 'LogIn', component: LogInComponent
  },
  {
    path: 'manageDonations', component: ManageDonationRequestsComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
