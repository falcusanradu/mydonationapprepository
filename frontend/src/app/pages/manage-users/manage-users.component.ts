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
  editMode: boolean = false;

  constructor(private backendService: BackendService, private sessionValues: SessionValues, private router: Router) {
  }

  ngOnInit() {
    // let user: User = JSON.parse(sessionStorage.getItem(this.sessionValues.SESSION_KEY));
    // if (user.type === USER_TYPE.ADMIN) {
      this.backendService.get(`/users`).subscribe(users => this.users = users);
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
}
