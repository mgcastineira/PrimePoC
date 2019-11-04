import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RolloffComponent } from './rolloff.component';

describe('RolloffComponent', () => {
  let component: RolloffComponent;
  let fixture: ComponentFixture<RolloffComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RolloffComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RolloffComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
