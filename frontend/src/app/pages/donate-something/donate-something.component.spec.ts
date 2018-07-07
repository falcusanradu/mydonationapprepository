import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DonateSomethingComponent } from './donate-something.component';

describe('DonateSomethingComponent', () => {
  let component: DonateSomethingComponent;
  let fixture: ComponentFixture<DonateSomethingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DonateSomethingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DonateSomethingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
