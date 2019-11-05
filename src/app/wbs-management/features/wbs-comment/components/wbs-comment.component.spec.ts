import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WbsCommentComponent } from './wbs-comment.component';

describe('WbsCommentComponent', () => {
  let component: WbsCommentComponent;
  let fixture: ComponentFixture<WbsCommentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WbsCommentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WbsCommentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
