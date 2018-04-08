import {Component, OnInit} from '@angular/core';
import {Product} from '../../models/product';
import {BackendService} from '../../backend.service';
import {DonateService} from './donate.service';
import {Subscription} from 'rxjs/Subscription';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'app-donate',
  templateUrl: './donate.component.html',
  styleUrls: ['./donate.component.scss']
})
export class DonateComponent implements OnInit {

  products: Product[];
  test: string = '';

  yrl: any = '';

  constructor(private donateService: DonateService, private sanitizer: DomSanitizer) {
  }


  ngOnInit() {
    this.donateService.getProducts('http://localhost:8080/getAllProducts').subscribe(value => this.receivedData(value));
    // this.donateService.getProducts2('http://localhost:8080/getAllProducts').subscribe((value:string) =>
    //   this.yrl = this.sanitizer.bypassSecurityTrustResourceUrl('data:image/png;base64, ' + value));
  }


  receivedData(data: Product[]) {
    // this.products = data;

    this.products = data;
    this.products.forEach(p => {
      p.image = this.sanitizer.bypassSecurityTrustResourceUrl('data:image/png;base64, ' + p.image);
    });
    console.log(this.products)
    console.log('middle');
    // let sanitizedUrl = this.sanitizer.bypassSecurityTrustUrl(this.test);
    // // console.log(this.products)
    // console.log('subs')
    // this.yes = true;
    // this.img = this.products[0].image;
  }

}
