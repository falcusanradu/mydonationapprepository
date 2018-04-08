import {Component, OnInit} from '@angular/core';
import {UserService} from '../../services/user.service';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/catch';
import {User} from '../../models/user';
import {Router} from '@angular/router';
import {BackendService} from '../../backend.service';
import {SessionValues} from '../../models/constants';
import {Translate} from '../../translate.service';

enum errorMsgEnum {
  OCNFIRMATION_INCORRECT = 'confirmation password incorrect!',
  // REGISTER_SUCCESS = 'register succes',
  USERNAME_EXISTS = 'username exists',
  EMAIL_EXISTS = 'email exists',
  INVALID_USERNAME_OR_PASSWORD = 'Invalid username or password',
  LOGIN_FAILED = 'login failed',
  USERNAME_OR_PASSWORD_CANNOT_BE_NULL = 'username or password can\'t be null',
};

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.scss']
})
export class LogInComponent implements OnInit {

  // login
  loginUsername: string;
  LoginPassword: string;
  // register
  registerUsername: string;
  registerPassword: string;
  confirmPassword: string;
  registerEmail: string;
  loading = false;

  errorMessageLogin: string;
  errorMessageRegister: string;
  registerSuccessMsg: boolean = false;


  constructor(private userService: UserService, private router: Router, private backendService: BackendService,
              private sessionValues: SessionValues, private translateService: Translate) {
  }

  ngOnInit() {
    if (sessionStorage.getItem(this.sessionValues.LANGUAGE) === null) {
      sessionStorage.setItem(this.sessionValues.LANGUAGE, this.sessionValues.EN);
    }
  }

  register() {
    if (!this.registerUsername || !this.registerPassword) {
      this.errorMessageRegister = errorMsgEnum.USERNAME_OR_PASSWORD_CANNOT_BE_NULL;
    } else if (this.registerPassword !== this.confirmPassword) {
      this.errorMessageRegister = errorMsgEnum.OCNFIRMATION_INCORRECT;
    } else {
      this.userService.register(this.registerUsername, this.registerPassword, this.registerEmail).subscribe(response => this.registerSuccess(response));
    }
    this.registerSuccessMsg = false;
  }

  registerSuccess(data: User) {
    if (data === null) {
      this.errorMessageRegister = errorMsgEnum.USERNAME_EXISTS;
    } else if (data.username === null && data.email === null) {
      this.errorMessageRegister = errorMsgEnum.EMAIL_EXISTS;
    } else {
      this.registerSuccessMsg = true;
      // this.errorMessageRegister = errorMsgEnum.REGISTER_SUCCESS;
    }
  }


  login() {
    this.loading = true;
    this.errorMessageLogin = null;
    this.userService.login(this.loginUsername, this.LoginPassword).subscribe(response => {
      this.loginSuccess(response);
    });
  }

  loginSuccess(data: User) {
    console.log('I\'m in loginSuccess()');
    this.loading = false;
    if (data != null) {
      // this.backendService.loggedUsername = this.loginUsername;
      sessionStorage.setItem(this.sessionValues.SESSION_KEY, JSON.stringify(data));

      console.log('login succes!!!!!');
      this.router.navigate(['/home']);
    } else {
      console.log('failed!!!!!');
      this.errorMessageLogin = errorMsgEnum.INVALID_USERNAME_OR_PASSWORD;
    }
  }

  loginError() {
    this.loading = false;
    this.errorMessageLogin = errorMsgEnum.LOGIN_FAILED;
  }



}