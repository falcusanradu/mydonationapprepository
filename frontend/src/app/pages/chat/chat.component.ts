import {Component, DoCheck, OnInit} from '@angular/core';
import {SessionValues} from '../../models/constants';
import {Router} from '@angular/router';
import {BackendService} from '../../services/backend.service';
import {WebSocketService} from '../../services/webSocket';
import {Notification} from '../../models/interfaces';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit, DoCheck {

  users = [];
  filteredUsers = [];
  message = '';
  usernameToSend = '';
  usernameToSendBefore = '';
  notifications = [];
  usernameTo = null;

  constructor(private sessionValue: SessionValues, private router: Router, private backendService: BackendService,
              private webSocketService: WebSocketService) {
    const stompClient = this.webSocketService.connect();

    stompClient.connect({}, frame => {
      stompClient.subscribe('/topic/notification', notifications => {
        this.backendService.get(`/notification/notifications`).subscribe((response) => this.notifications = response);
      });

    });
  }


  ngOnInit() {
    // if (sessionStorage.getItem(this.sessionValue.SESSION_KEY)) {
    //   this.router.navigate(['LogIn']);
    // }
    this.loadAllUsers();
    this.loadNotifications();
  }

  private loadNotifications() {
    this.backendService.get(`/notification/notifications`).subscribe((response) => {
      this.notifications = response;
    });
  }

  ngDoCheck(): void {
    if (this.usernameToSend !== this.usernameToSendBefore) {
      this.filteredUsers = this.filterUsers();
      this.usernameToSendBefore = this.usernameToSend;
    }
  }

  autoCompleteAfterClick(value) {
    this.usernameToSend = value;
  }

  checkUser() {
    this.backendService.get(`/findByUsername/${this.usernameToSend}`).subscribe((response) => {
      if (!response) {
        alert('username not good');
      } else {
        this.usernameTo = response.username;
        const notification: Notification = {
            idNotification: null,
            message: this.message,
            read: false,
            usernameTo: this.usernameTo,
            usernameFrom: this.backendService.getSessionUser().username,
            notificationTime: null
          }
        ;
        this.backendService.post(`/notification/save`, notification).subscribe(() => {
          this.filteredUsers = [];
          this.usernameToSendBefore = '';
          this.webSocketService.notifyTheOtherClients().subscribe();
        });

      }
    });
  }

  toThisUser(notification) {
    return notification.usernameTo === this.backendService.getSessionUser().username;
  }

  private filterUsers() {
    return this.users.filter((element) => {
      return element['username'].toUpperCase().includes(this.usernameToSend.toUpperCase());
    });
  }

  private loadAllUsers() {
    this.backendService.get('/users').subscribe((users) => {
      this.users = users;
      this.filteredUsers = this.users;
    });
  }

  notificationRead(notification) {
    notification.read = true;
    this.backendService.post('/notification/saveCheck', notification).subscribe(
      () => this.loadNotifications());
  }

  filterNotifications() {
    const filteredNot = [];
    this.notifications.forEach((n) => {
      if (this.toThisUser(n)) {
        filteredNot.push(n);
      }
    });
    return filteredNot;
  }


}
