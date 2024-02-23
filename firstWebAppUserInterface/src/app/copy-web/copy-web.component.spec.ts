import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CopyWebComponent } from './copy-web.component';

describe('CopyWebComponent', () => {
  let component: CopyWebComponent;
  let fixture: ComponentFixture<CopyWebComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CopyWebComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CopyWebComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
