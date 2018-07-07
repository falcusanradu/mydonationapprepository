import {Component, OnInit} from '@angular/core';
import {User} from '../../models/interfaces';
import {BackendService} from '../../services/backend.service';
import {SessionValues} from '../../models/constants';

@Component({
  selector: 'app-manage-users',
  templateUrl: './manage-users.component.html',
  styleUrls: ['./manage-users.component.scss']
})
export class ManageUsersComponent implements OnInit {

  users: User[] = [];
  editMode: boolean = false;

  constructor(private backendService: BackendService, private sessionValues: SessionValues) {
  }

  ngOnInit() {
    let user: User;
    if (sessionStorage.getItem(this.sessionValues.SESSION_KEY))
      this.backendService.get(`/users`).subscribe(users => this.users = users);
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
