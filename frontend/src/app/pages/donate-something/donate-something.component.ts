import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {SessionValues} from '../../models/constants';

@Component({
  selector: 'app-donate-something',
  templateUrl: './donate-something.component.html',
  styleUrls: ['./donate-something.component.scss']
})
export class DonateSomethingComponent implements OnInit {
  constructor(private sessionValue: SessionValues, private router: Router) {
  }

  ngOnInit() {
    if (sessionStorage.getItem(this.sessionValue.SESSION_KEY)) {
      this.router.navigate(['LogIn']);
    }
  }

}
