import {Component, OnInit} from '@angular/core';
import {BackendService} from '../../backend.service';
import {User} from '../../models/user';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {

  emailSent: boolean = false;
  emailToSend: string;

  constructor(private backendService: BackendService) {
  }

  ngOnInit() {
  }

  submit() {
    this.emailSent = true;
    console.log(this.emailToSend);
    let user: User = new User();
    user.email = this.emailToSend;
    this.backendService.post('http://localhost:8080/resetPassword/', user).subscribe(r => {
      if (r == false) {
        alert('something went wrong!');
      }
    });
  }


}
