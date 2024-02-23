import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeahComponent } from './leah.component';

describe('LeahComponent', () => {
  let component: LeahComponent;
  let fixture: ComponentFixture<LeahComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LeahComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LeahComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
