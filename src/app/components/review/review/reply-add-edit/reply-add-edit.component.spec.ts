import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReplyAddEditComponent } from './reply-add-edit.component';

describe('ReplyAddEditComponent', () => {
  let component: ReplyAddEditComponent;
  let fixture: ComponentFixture<ReplyAddEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReplyAddEditComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReplyAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
