import { Component, Inject } from '@angular/core';
import { MD_DIALOG_DATA, MdDialogRef } from '@angular/material';

@Component({
  selector: 'confirmation-dialog',
  templateUrl: 'confirmation-dialog.component.html'
})
export class ConfirmationDialogComponent {
  constructor(@Inject(MD_DIALOG_DATA) public data: any, public dialog: MdDialogRef<ConfirmationDialogComponent>) { }
}
