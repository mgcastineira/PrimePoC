import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RollonComponent } from './rollon.component';

describe('RollonComponent', () => {
  let component: RollonComponent;
  let fixture: ComponentFixture<RollonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RollonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RollonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
