import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {UserDto} from '../../../models/user-dto.model';
import {GroupDto} from '../../../models/group-dto.model';
import {GroupService} from '../../../services/group.service';
import {StudentService} from '../../../services/student.service';
import {ActivatedRoute} from '@angular/router';
import {MatPaginator, PageEvent} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'app-student-list',
  templateUrl: './enrolled-student-list.component.html',
  styleUrls: ['./enrolled-student-list.component.css']
})
export class EnrolledStudentListComponent implements AfterViewInit {
  enrolledStudents: UserDto[] = [];
  candidates: UserDto[] = [];
  group: GroupDto = {};
  groupId?: number;
  candidatesPageIndex: number=0;
  candidatesPageSize?: number;
  candidatesLength?: number;
  candidatesPageEvent: PageEvent = new PageEvent();

  public dataSource: MatTableDataSource<UserDto> = new MatTableDataSource<UserDto>(this.enrolledStudents);
  public displayedColumns: string[] = ['First Name', 'Last Name', 'Actions'];

  @ViewChild(MatPaginator) paginator: any;
  searchCandidates = new FormControl('');
  searchEnrolled = new FormControl('');
  searchCandidatesFilter: string = '';

  constructor(private groupService: GroupService, private studentService: StudentService, private route: ActivatedRoute
  ) {
  }


  ngAfterViewInit(): void {
    this.groupId = parseInt(<string>this.route.snapshot.paramMap.get('id'));
    this.groupService.getById(this.groupId).subscribe(
      data => {
        this.group = data;
        this.enrolledStudents = data.students
        this.dataSource = new MatTableDataSource<UserDto>(this.enrolledStudents);
        this.dataSource.paginator = this.paginator;
      }
    );
    this.getCandidates(this.getCandidatesPageEvent(this.candidatesPageEvent));
  }

  removeStudents(student: UserDto) {
    this.groupService.removeStudent(this.groupId, [student])
      .subscribe(d => this.ngAfterViewInit());

  }

  addStudents(student: UserDto) {
    this.groupService.addStudent(this.groupId, [student])
      .subscribe(d => {
        if (this.candidatesPageEvent.pageIndex!=0 && this.candidates.length==1){
          this.candidatesPageEvent.pageIndex=this.candidatesPageEvent.pageIndex - 1;
        }
        this.ngAfterViewInit()
      });
  }

  getCandidates(event: PageEvent) {
    this.studentService.getStudentCandidates(this.searchCandidatesFilter, event).subscribe(data => {
      this.candidates = data.content;
      this.candidatesPageIndex = data.number;
      this.candidatesPageSize = data.size;
      this.candidatesLength = data.totalElements;
    })
    return event;
  }

  getCandidatesPageEvent(event: PageEvent) {
    if (this.candidatesPageIndex || this.candidatesPageSize) {
      return event;
    }
    event.pageIndex = 0;
    event.pageSize = 10;
    return event;
  }

  filterCandidates(value: string) {
    this.searchCandidatesFilter = value;
    this.candidatesPageEvent.pageIndex = 0;
    this.ngAfterViewInit()
  }

  filterEnrolled(value: string) {
    this.dataSource.filter = value.trim()
  }
}
