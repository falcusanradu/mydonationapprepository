import {Component, OnInit} from '@angular/core';
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
export class ChatComponent implements OnInit {

  users = [];
  message = '';
  usernameToSend = '';
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
    this.backendService.get('/users').subscribe((users) => this.users = users);
    this.backendService.get(`/notification/notifications`).subscribe((response) => {
      this.notifications = response;
      this.backendService.get(`/notification/notifications`).subscribe((response) => this.notifications = response);
    });
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
          this.webSocketService.notifyTheOtherClients().subscribe();
        });

      }
    });
  }


}
