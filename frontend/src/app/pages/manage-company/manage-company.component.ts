import {Component, OnInit} from '@angular/core';
import {CategoryEnum} from '../../models/interfaces';

@Component({
  selector: 'app-manage-company',
  templateUrl: './manage-company.component.html',
  styleUrls: ['./manage-company.component.scss']
})
export class ManageCompanyComponent implements OnInit {

  companyCategory: any[] = [];

  constructor() {
  }

  ngOnInit() {
    this.companyCategory = Object.keys(CategoryEnum).map(key => CategoryEnum[key]).filter(key => isNaN(key));
  }

}
