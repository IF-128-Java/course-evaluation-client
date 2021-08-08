import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupCourseListComponent } from './group-course-list.component';

describe('GroupCourseListComponent', () => {
  let component: GroupCourseListComponent;
  let fixture: ComponentFixture<GroupCourseListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GroupCourseListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupCourseListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
