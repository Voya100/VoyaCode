import { NgModule } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { ConfirmationDialogComponent } from './confirmation-dialog/confirmation-dialog.component';

@NgModule({
  imports: [MatDialogModule, MatSnackBarModule],
  exports: [],
  entryComponents: [ConfirmationDialogComponent],
  declarations: [ConfirmationDialogComponent],
  providers: []
})
export class MaterialModule {}
