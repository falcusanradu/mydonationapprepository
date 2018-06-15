import {Component, OnInit} from '@angular/core';
import {Product} from '../../models/product';
import {BackendService} from '../../services/backend.service';
import {DonateService} from './donate.service';
import {Subscription} from 'rxjs/Subscription';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'app-donate',
  templateUrl: './donate.component.html',
  styleUrls: ['./donate.component.scss']
})
export class DonateComponent implements OnInit {

  file: File = null;
  products: Product[];
  test: string = '';


  constructor(private donateService: DonateService, private sanitizer: DomSanitizer, private backendService: BackendService) {
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
  }


  onFileSelected(event){
    this.file = event.target.files[0];
  }


  uploadFile() {
    if (this.file) this.donateService.uploadFile('http://localhost:8080/uploadFile/' +  this.file.name, this.file).subscribe(response=>{
      console.log('ok')
    });

  }

}
