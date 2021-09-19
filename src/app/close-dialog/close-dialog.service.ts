import {Injectable} from '@angular/core';

import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

import {ConfirmationDialogComponent} from './../confirmation-dialog/confirmation-dialog.component';
import {CloseDialogComponent} from "./close-dialog.component";

@Injectable()
export class CloseDialogService {

  constructor(private modalService: NgbModal) { }

  public confirm(
    title: string,
    message: string,
    btnOkText: string = 'OK',
    btnCancelText: string = 'Close',
    dialogSize: 'sm'|'lg' = 'lg'): Promise<boolean> {
    const modalRef = this.modalService.open(CloseDialogComponent, { size: dialogSize });
    modalRef.componentInstance.title = title;
    modalRef.componentInstance.message = message;
    modalRef.componentInstance.btnOkText = btnOkText;
    modalRef.componentInstance.btnCancelText = btnCancelText;

    return modalRef.result;
  }

}
