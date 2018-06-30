import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfirmationDialogComponent } from './confirmation-dialog/confirmation-dialog.component';
import { MatDialogModule } from '@angular/material';

@NgModule({
  imports: [MatDialogModule],
  exports: [],
  entryComponents: [ConfirmationDialogComponent],
  declarations: [ConfirmationDialogComponent],
  providers: []
})
export class MaterialModule { }
