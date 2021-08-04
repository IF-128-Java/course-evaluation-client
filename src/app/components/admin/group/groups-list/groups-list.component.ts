import {Component, OnInit} from '@angular/core';
import {Group} from '../../models/group.model';
import {GroupService} from '../../services/group.service';
import {NgbActiveModal, NgbModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'ngbd-modal-content',
  template: `
    <div class="modal-header">
      <h4 class="modal-title">Create new group</h4>
      <button type="button" class="close" aria-label="Close" (click)="activeModal.dismiss('Cross click');;refresh()">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div class="modal-body">
      <form name="form" (ngSubmit)="f.form.valid && onSubmit()" #f="ngForm" novalidate>
        <div class="form-group">
          <label>Group name</label>
          <input
            type="text"
            class="form-control"
            name="groupName"
            [(ngModel)]="form.groupName" #groupName="ngModel" required
          />
          <div *ngIf="groupName.errors">Group name is required</div>
          <div *ngIf="isSignedUp && group">Group {{group.groupName}} has added!</div>
        </div>
        <div class="form-group">
          <button class="btn btn-primary btn-block">Add</button>
        </div>
      </form>
    </div>
    <div class="modal-footer">
      <button type="button" class="btn btn-outline-dark" (click)="activeModal.close('Close click');refresh()">Close
      </button>
    </div>
  `
})
export class NgbdModalContent {
  form: any = {};
  group: Group | undefined;
  isSignedUp = false;
  isSignUpFailed = false;
  errorMessage = '';

  constructor(private groupService: GroupService, public activeModal: NgbActiveModal) {
  }

  onSubmit() {
    this.group = new Group('', this.form.groupName);

    this.groupService.create(this.group).subscribe(
      data => {
        console.log(data);
        this.isSignedUp = true;
        this.isSignUpFailed = false;
      },
      error => {
        console.log(error);
        this.errorMessage = error.error.message;
        this.isSignUpFailed = true;
      }
    );
  }

  public refresh() {
    window.location.reload();
  }
}

@Component({
  selector: 'app-groups-list',
  templateUrl: './groups-list.component.html',
  styleUrls: ['./groups-list.component.css']
})
export class GroupsListComponent implements OnInit {

  groups: Group[] = [];

  constructor(private groupService: GroupService, private modalService: NgbModal) {
  }

  ngOnInit() {
    this.groupService.getGroups().subscribe(
      data => {
        this.groups = data;
      }
    );
  }

  deleteRoom(group: Group) {
    this.groupService.delete(group).subscribe(d => {
      this.groups = this.groups.filter(h => h != group)
    });
  }

  open() {
    const modalRef = this.modalService.open(NgbdModalContent);
    modalRef.componentInstance.name = 'World';
  }

}
