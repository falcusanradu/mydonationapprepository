import {Component, OnInit} from '@angular/core';
import {SessionValues} from '../../models/constants';

@Component({
  selector: 'app-manage-donation-requests',
  templateUrl: './manage-donation-requests.component.html',
  styleUrls: ['./manage-donation-requests.component.scss']
})
export class ManageDonationRequestsComponent implements OnInit {

  constructor(private sessionValues: SessionValues) {
  }

  ngOnInit() {
    if (sessionStorage.getItem(this.sessionValues.LANGUAGE) === null) {
      sessionStorage.setItem(this.sessionValues.LANGUAGE, this.sessionValues.EN);
    }
  }

}
