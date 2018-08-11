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
  userTypes: string[] = [USER_TYPE[USER_TYPE.admin], USER_TYPE[USER_TYPE.company], USER_TYPE[USER_TYPE.normal]];

  constructor(private backendService: BackendService,
              private sessionValues: SessionValues,
              private router: Router) {
  }

  ngOnInit() {
    const user: User = JSON.parse(sessionStorage.getItem(this.sessionValues.SESSION_KEY));
    if (user) {
      if (user.type.toString() === USER_TYPE[USER_TYPE.admin]) {
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

  changeUserType(user: User, userType: string) {
    user.type = this.convertFromStringToUserType(userType);
    if (user.companies) {
      this.backendService.delete(`/delete${user.companies[0].idCompany}`).subscribe();
    }
    this.backendService.put('/update', user).subscribe();
  }

  convertFromStringToUserType(userType: string): any {
    switch (userType) {
      case 'admin': {
        return USER_TYPE[USER_TYPE.admin];
      }
      case 'company': {
        return USER_TYPE[USER_TYPE.company];
      }
      default: {
        return USER_TYPE[USER_TYPE.normal];
      }
    }
  }
}
