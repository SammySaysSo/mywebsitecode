import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainComponComponent } from './main-compon.component';

describe('MainComponComponent', () => {
  let component: MainComponComponent;
  let fixture: ComponentFixture<MainComponComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MainComponComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MainComponComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
