import {Component, OnInit} from '@angular/core';
import {SessionValues} from '../../models/constants';
import {Router} from '@angular/router';
import {BackendService} from '../../services/backend.service';
import {WebSocketService} from '../../services/webSocket';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {

  users = [];
  message = '';
  usernameToSend = '';
  notifications = ['312321', 'sadddddddddddsadddddddddddddddddddddddddddddadsaddddddddddddddddddddddddddddsadddddddddddddddddddddddddddddadsaddddddddddddddddddddddddddddsadddddddddddddddddddddddddddddadsaddddddddddddddddddddddddddddddddddddddddddddddadsadddddddddddddddddddddddddddd'];

  constructor(private sessionValue: SessionValues, private router: Router, private backendService: BackendService,
              private webSocketService: WebSocketService) {
  }

  ngOnInit() {
    // if (sessionStorage.getItem(this.sessionValue.SESSION_KEY)) {
    //   this.router.navigate(['LogIn']);
    // }
    this.backendService.get('/users').subscribe((users) => this.users = users);
    this.backendService.get(`/notification/notifications`).subscribe((response) => this.notifications = response);
  }


  checkUser() {
    this.backendService.get(`/findByUsername/${this.usernameToSend}`).subscribe((response) => {
      if (!response) {
        alert('username not good');
      } else {
        let notification: Notification = {
          idNotification: null,
          message: this.message,
          read: false,
          userTo : this.backendService.getSessionUser();


        };
        this.backendService.post(`/notification/save`,);
        const stompClient = this.webSocketService.connect();

        stompClient.connect({}, frame => {

          console.log('before subs');
          stompClient.subscribe('/topic/notification', notifications => {
            console.log('before subs');
            this.notifications = JSON.parse(notifications.body).count;
            this.backendService.get(`/notification/notifications`).subscribe((response) => this.notifications = response);
          });

        });
      }
    });
  }


}
