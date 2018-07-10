import {Component, OnInit} from '@angular/core';
import {User, USER_TYPE} from '../../models/interfaces';
import {BackendService} from '../../services/backend.service';
import {SessionValues} from '../../models/constants';
import {Router} from '@angular/router';

@Component({
  selector: 'app-manage-users',
  templateUrl: './manage-users.component.html',
  styleUrls: ['./manage-users.component.scss']
})
export class ManageUsersComponent implements OnInit {
  users: User[] = [];
  userTypes: string[] = [USER_TYPE[USER_TYPE.ADMIN], USER_TYPE[USER_TYPE.RIGHT1], USER_TYPE[USER_TYPE.MINIMUM]];

  constructor(private backendService: BackendService,
              private sessionValues: SessionValues,
              private router: Router) {
  }

  ngOnInit() {
    let user: User = JSON.parse(sessionStorage.getItem(this.sessionValues.SESSION_KEY));
    if (user) {
      if (user.type.toString() === USER_TYPE[USER_TYPE.ADMIN]) {
        this.backendService.get(`/users`).subscribe(users => {
          this.users = users;
        });
      } else {
        this.router.navigate(['/LogIn']);
      }
    } else {
      this.router.navigate(['/LogIn']);
    }

  }

  deleteUser(user: User) {
    this.backendService.delete(`/delete/${user.id}`).subscribe();
  }

  addData(user: User, userType: string) {
    user.type = this.convertFromStringToUserType(userType);
    this.backendService.put('/update', user).subscribe();
  }

  convertFromStringToUserType(userType: string): any {
    switch (userType) {
      case 'ADMIN': {
        return USER_TYPE[USER_TYPE.ADMIN];
      }
      case 'RIGHT1': {
        return USER_TYPE[USER_TYPE.RIGHT1];
      }
      default: {
        return USER_TYPE[USER_TYPE.MINIMUM];
      }
    }
  }
}
