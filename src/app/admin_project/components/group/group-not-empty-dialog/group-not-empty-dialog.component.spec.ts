import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupNotEmptyDialogComponent } from './group-not-empty-dialog.component';

describe('GroupNotEmptyDialogComponent', () => {
  let component: GroupNotEmptyDialogComponent;
  let fixture: ComponentFixture<GroupNotEmptyDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GroupNotEmptyDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupNotEmptyDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
