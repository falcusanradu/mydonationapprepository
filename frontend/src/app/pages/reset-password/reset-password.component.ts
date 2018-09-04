import {Component, OnInit} from '@angular/core';
import {BackendService} from '../../services/backend.service';
import {User} from '../../models/user';
import {Router} from '@angular/router';
import {SessionValues} from '../../models/constants';
import {Translate} from '../../services/translate.service';

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


  modalMessage = '';

  constructor(private sessionValues: SessionValues,
              private backendService: BackendService,
              private router: Router, private translate: Translate) {
  }

  ngOnInit() {
    if (sessionStorage.getItem(this.sessionValues.LANGUAGE) === null) {
      sessionStorage.setItem(
        this.sessionValues.LANGUAGE,
        this.sessionValues.EN
      );
    }
  }

  submit() {
    let user: User = new User();
    user.email = this.emailToSend;
    this.sendRequest(`/resetPassword/`, user, 'email');
  }

  changePass() {
    if (this.confirmPassword()) {
      let user: User = new User();
      user.email = this.emailToSend;
      user.username = this.username;
      user.password = this.oldPassword;
      this.backendService.post(`/login/`, user).subscribe((response) => {
        if (response) {
          user.password = this.newPassword;
          this.backendService.put(`/updateUser`, user).subscribe(() =>
            this.router.navigate(['/LogIn']));
        } else {
          this.modalMessage = this.translate.getTranslatedItem('WRONG_USERNAME_OR_PASSWORD');
          this.openModal();
        }
      });
    } else {
      this.modalMessage = this.translate.getTranslatedItem('OCNFIRMATION_INCORRECT');
      this.openModal();
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
      if (r === false) {
        this.modalMessage = this.translate.getTranslatedItem('Invalid') + ' ' + invalidation + '!';
        this.openModal();
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

  private openModal() {
    const openModalBtn = document.getElementById('openModalBtnResetPassword');
    openModalBtn.click();
  }


}
