import {ChatComponent} from './pages/chat/chat.component';
import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {HomeComponent} from './pages/home/home.component';
import {LogInComponent} from './pages/log-in/log-in.component';
import {ResetPasswordComponent} from './pages/reset-password/reset-password.component';
import {DonateComponent} from './pages/manage donations/donate.component';
import {DonateSomethingComponent} from './pages/donate-something/donate-something.component';
import {ManageUsersComponent} from './pages/manage-users/manage-users.component';
import {ManageCompanyComponent} from './pages/manage-company/manage-company.component';

const routes: Routes = [
  //TODO: AuthGuard
  {
    path: '', redirectTo: 'home', pathMatch: 'full'
  },
  {
    path: 'home', component: HomeComponent
  },
  {
    path: 'app-donate', component: DonateComponent
  },
  {
    path: 'LogIn', component: LogInComponent
  },
  {
    path: 'reset-password', component: ResetPasswordComponent
  },
  {
    path: 'app-donate-something', component: DonateSomethingComponent
  },
  {
    path: 'app-chat', component: ChatComponent
  },

  {
    path: 'manage-users', component: ManageUsersComponent
  },
  {
    path: 'manage-company', component: ManageCompanyComponent
  },

  //TODO: AuthGuard
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
