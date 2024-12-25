import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComplaintAddEditComponent } from './complaint-add-edit.component';

describe('ComplaintAddEditComponent', () => {
  let component: ComplaintAddEditComponent;
  let fixture: ComponentFixture<ComplaintAddEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ComplaintAddEditComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ComplaintAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
