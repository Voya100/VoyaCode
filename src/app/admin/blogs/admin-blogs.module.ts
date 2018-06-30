import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { MaterialModule } from '../../shared/material/material.module';
import { SharedModule } from '../../shared/shared.module';

import { AddBlogComponent } from './add-blog/add-blog.component';
import { AdminBlogsComponent } from './admin-blogs.component';
import { routing } from './admin-blogs.routing';
import { BlogFormComponent } from './blog-form/blog-form.component';
import { EditBlogComponent } from './edit-blog/edit-blog.component';

@NgModule({
  imports: [SharedModule, MaterialModule, CommonModule, FormsModule, routing],
  exports: [],
  declarations: [AdminBlogsComponent, AddBlogComponent, BlogFormComponent, EditBlogComponent],
  providers: []
})
export class AdminBlogsModule {}
