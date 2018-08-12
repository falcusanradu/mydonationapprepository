import {Component, DoCheck, OnInit} from '@angular/core';
import {User, USER_TYPE} from '../../models/interfaces';
import {BackendService} from '../../services/backend.service';
import {SessionValues} from '../../models/constants';
import {Router} from '@angular/router';
import {Translate} from '../../services/translate.service';
import {AbstractTable} from '../abstractTable';

@Component({
  selector: 'app-manage-users',
  templateUrl: './manage-users.component.html',
  styleUrls: ['./manage-users.component.scss']
})
export class ManageUsersComponent extends AbstractTable implements OnInit, DoCheck {

  users: User[] = [];
  userTypes: string[] = [USER_TYPE[USER_TYPE.admin], USER_TYPE[USER_TYPE.company], USER_TYPE[USER_TYPE.normal]];
  allUsers: User[] = [];
  // for filter
  searchInput = '';
  oldSearchInput = '';
  // delete user
  userToDelete ;

  constructor(private backendService: BackendService,
              private sessionValues: SessionValues,
              private router: Router, private translateService: Translate) {
    super();
  }

  ngOnInit() {
    // $('#myModal').modal('toggle');
    // $('#myModal').modal('show');
    // $('#myModal').modal('hide');
    const user: User = JSON.parse(sessionStorage.getItem(this.sessionValues.SESSION_KEY));
    if (user) {
      if (user.type.toString() === USER_TYPE[USER_TYPE.admin]) {
        this.loadUsers();
      } else {
        this.router.navigate(['/LogIn']);
      }
    } else {
      this.router.navigate(['/LogIn']);
    }

  }


  ngDoCheck() {
    if (this.searchInput !== this.oldSearchInput) {
      this.OnFilter();
      this.oldSearchInput = this.searchInput;
    }
  }


  OnFilter() {
    this.users = this.filter(this.allUsers, 'username', this.searchInput);
  }

  OnSort(index: number) {
  }

  private loadUsers() {
    this.backendService.get(`/users`).subscribe(users => {
      this.users = users;
      this.allUsers = this.users;
    });
  }

  deleteUser() {
    this.backendService.delete(`/delete/${this.userToDelete.id}`).subscribe(() => this.loadUsers());

  }

  openModal(user: User) {
    this.userToDelete = user;
    const openModalBtn = document.getElementById('openModalBtn');
    openModalBtn.click();
  }

  changeUserType(user: User, newUserType: string) {
    this.backendService.post(`/update/${this.convertFromStringToUserType(newUserType)}`, user).subscribe(() => this.loadUsers());
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
