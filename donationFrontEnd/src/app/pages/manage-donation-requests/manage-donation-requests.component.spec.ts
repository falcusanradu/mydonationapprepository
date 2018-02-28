import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageDonationRequestsComponent } from './manage-donation-requests.component';

describe('ManageDonationRequestsComponent', () => {
  let component: ManageDonationRequestsComponent;
  let fixture: ComponentFixture<ManageDonationRequestsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageDonationRequestsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageDonationRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
