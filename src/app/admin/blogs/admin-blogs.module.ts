import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../../shared/shared.module';
import { MaterialModule } from '../../shared/material/material.module';

import { AdminBlogsComponent } from './admin-blogs.component';
import { AddBlogComponent } from './add-blog/add-blog.component';
import { EditBlogComponent } from './edit-blog/edit-blog.component';
import { BlogFormComponent } from './blog-form/blog-form.component';

import { routing } from './admin-blogs.routing';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [SharedModule, MaterialModule, CommonModule, FormsModule, routing],
  exports: [],
  declarations: [AdminBlogsComponent, AddBlogComponent, BlogFormComponent, EditBlogComponent],
  providers: []
})
export class AdminBlogsModule { }
