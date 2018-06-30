import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { LoginComponent } from './login.component';

import { routing } from './login.routing';

@NgModule({
  imports: [CommonModule, FormsModule, routing],
  declarations: [LoginComponent],
  providers: []
})
export class LoginModule { }
