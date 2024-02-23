import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrentProjectOneComponent } from './current-project-one.component';

describe('CurrentProjectOneComponent', () => {
  let component: CurrentProjectOneComponent;
  let fixture: ComponentFixture<CurrentProjectOneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CurrentProjectOneComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CurrentProjectOneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
