import {Component, OnInit, ViewChild} from '@angular/core';
import {MyGroupService} from '../../../services/student/my-group.service';
import {Student} from '../../../models/student/student.model';
import {TokenStorageService} from '../../../auth/token-storage.service';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {SelectionModel} from '@angular/cdk/collections';
import {CdkTextareaAutosize} from '@angular/cdk/text-field';
import {UserDto} from "../../../admin_project/models/user-dto.model";

@Component({
  selector: 'app-my-group',
  templateUrl: './my-group.component.html',
  styleUrls: ['./my-group.component.css']
})
export class MyGroupComponent implements OnInit{

  public displayedColumns: string[] = ['FirstName', 'LastName', "Email", "Check"];
  @ViewChild('scheduledOrdersPaginator') paginator: MatPaginator;

  listData: MatTableDataSource<any> = new MatTableDataSource<any>();
  selection = new SelectionModel<Student>(true, []);
  mess: string = '';

  allstudents: Student[] = [];

  curStudent: Student = {
    id: '',
    firstName: '',
    lastName: '',
    email: '',
    roles: [],
    groupId: '',
    groupName: '',
    position: 0
  };

  ngOnInit(): void {
    this.getStudent(Number(this.tokenStorage.getId()));
  }

  constructor(
    private tokenStorage: TokenStorageService,
    private MyGroupService: MyGroupService,
  ) { }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.allstudents.length;
    return numSelected === numRows;
  }

  masterToggle() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }

    this.selection.select(...this.listData.data);
  }

  checkboxLabel(row?: Student): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
  }

  getAllStudentsInGroup(id: number): void {
    this.MyGroupService.getStudentsByGroupId(id).subscribe(data => {
        this.allstudents = data;
        this.listData = new MatTableDataSource(this.allstudents);
        setTimeout(() => this.listData.paginator = this.paginator);
      },
      error => {
        console.log(error);
      }
    );
  }

  getStudent(id: number): void {
    this.MyGroupService.get(id).subscribe(data => {
        this.curStudent = data;
        this.getAllStudentsInGroup(+this.curStudent.groupId);
      },
      error => {
        console.log(error);
      }
    );
  }

  sendMail(): void {
    if (this.selection.selected.length == 0 ) {
      alert("No one selected !!! ")
      console.log("No one selected !!! ");
    }
    else if (this.mess == ""){
      alert("No message entered !!! ")
      console.log("No message entered !!! ");
    } else {
      for (var j in this.selection.selected) {
        console.log(this.selection.selected[j].email);
        console.log(this.mess);

        //this.selection.deselect(this.selection.selected[j]);
      }

      this.MyGroupService.sendMail(this.selection.selected).subscribe(data => {

        },
        error => {
          console.log(error);
        }
      );
    }
    return;
  }

}
