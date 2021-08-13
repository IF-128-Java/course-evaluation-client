import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupAddCourseComponent } from './group-add-course.component';

describe('GroupAddCourseComponent', () => {
  let component: GroupAddCourseComponent;
  let fixture: ComponentFixture<GroupAddCourseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GroupAddCourseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupAddCourseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
