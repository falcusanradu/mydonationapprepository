import {Component, OnInit} from '@angular/core';
import {SessionValues} from '../../models/constants';
import {Router} from '@angular/router';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {

  constructor(private sessionValue: SessionValues, private router: Router) {
  }

  ngOnInit() {
    if (sessionStorage.getItem(this.sessionValue.SESSION_KEY)) {
      this.router.navigate(['LogIn']);
    }
  }

}
