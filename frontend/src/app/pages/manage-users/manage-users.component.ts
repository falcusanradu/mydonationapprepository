import {Component, OnInit} from '@angular/core';
import {User} from '../../models/interfaces';
import {BackendService} from '../../services/backend.service';

@Component({
  selector: 'app-manage-users',
  templateUrl: './manage-users.component.html',
  styleUrls: ['./manage-users.component.scss']
})
export class ManageUsersComponent implements OnInit {

  users: User[] = [];

  constructor(private backendService: BackendService) {
  }

  ngOnInit() {
    this.backendService.get(`/users`).subscribe(users => this.users = users);
  }

}
