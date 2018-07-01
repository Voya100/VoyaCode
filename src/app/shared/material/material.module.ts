import { NgModule } from '@angular/core';
import { MatDialogModule, MatSnackBarModule } from '@angular/material';

import { ConfirmationDialogComponent } from './confirmation-dialog/confirmation-dialog.component';

@NgModule({
  imports: [MatDialogModule, MatSnackBarModule],
  exports: [],
  entryComponents: [ConfirmationDialogComponent],
  declarations: [ConfirmationDialogComponent],
  providers: []
})
export class MaterialModule {}
