import {Component, OnInit} from '@angular/core';
import {BackendService} from '../../backend.service';
import {User} from '../../models/user';
import {Router} from '@angular/router';
import {SessionValues} from '../../models/constants';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {

  emailSent: boolean = false;
  emailToSend: string;
  // for chnage password
  username: string;
  oldPassword: string;
  newPassword: string;
  newPasswordConfirm: string;

  constructor(private sessionValues: SessionValues, private backendService: BackendService, private router: Router) {
  }

  ngOnInit() {
    if (sessionStorage.getItem(this.sessionValues.LANGUAGE) === null) {
      sessionStorage.setItem(this.sessionValues.LANGUAGE, this.sessionValues.EN);
    }
  }

  submit() {
    console.log(this.emailToSend);
    let user: User = new User();
    user.email = this.emailToSend;
    this.sendRequest('http://localhost:8080/resetPassword/', user, 'email');
  }

  changePass() {
    if (this.confirmPassword()) {
      let user: User = new User();
      user.email = this.emailToSend;
      user.username = this.username;
      user.password = this.newPassword;
      this.sendRequest('http://localhost:8080/changePassword/', user, 'password');
      this.router.navigate(['/LogIn']);
      alert('success!!');
    }
  }

  confirmPassword() {
    if (this.newPassword === this.newPasswordConfirm) {
      return true;
    }
    return false;
  }

  sendRequest(url: string, user: User, invalidation) {
    this.backendService.post(url, user).subscribe(r => {
      if (r == false) {
        alert('Invalid ' + invalidation + '!');
        if ('email' === invalidation) {
          this.emailSent = false;
        }
      } else {
        if ('email' === invalidation) {
          this.emailSent = true;
        }
      }
    });
  }

}