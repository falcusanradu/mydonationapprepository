import {Component, Input, OnInit} from '@angular/core';
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
  editMode: boolean = false;
  userTypes: string[] = [USER_TYPE[0], USER_TYPE[1], USER_TYPE[2]];

  constructor(private backendService: BackendService,
              private sessionValues: SessionValues,
              private router: Router) {
  }

  ngOnInit() {
    // let user: User = JSON.parse(sessionStorage.getItem(this.sessionValues.SESSION_KEY));
    // if (user.type === USER_TYPE.ADMIN) {
    this.backendService.get(`/users`).subscribe(users => (this.users = users));
    // } else {
    //   this.router.navigate(['/LogIn']);
    // }
  }

  edit() {
    this.editMode = true;
  }

  cancel() {
    this.editMode = false;
  }

  deleteUser(user: User) {
    this.backendService.delete(`/delete/${user.id}`).subscribe();
  }

  addData(user: User, userType: string) {
    console.log(USER_TYPE.ADMIN.valueOf());
    user.type = this.convertFromStringToUserType(userType);
  }

  convertFromStringToUserType(userType: string): USER_TYPE {
    switch (userType) {
      case 'ADMIN': {
        return USER_TYPE.ADMIN;
      }
      case 'RIGHT1': {
        return USER_TYPE.RIGHT1;
      }
      default: {
        return USER_TYPE.MINIMUM;
      }
    }
  }
}
