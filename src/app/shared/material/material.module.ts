import { NgModule } from '@angular/core';
import { MatDialogModule } from '@angular/material';

import { ConfirmationDialogComponent } from './confirmation-dialog/confirmation-dialog.component';

@NgModule({
  imports: [MatDialogModule],
  exports: [],
  entryComponents: [ConfirmationDialogComponent],
  declarations: [ConfirmationDialogComponent],
  providers: []
})
export class MaterialModule {}
