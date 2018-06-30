import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AdminBlogsComponent } from './admin-blogs.component';
import { AddBlogComponent } from './add-blog/add-blog.component';
import { EditBlogComponent } from './edit-blog/edit-blog.component';

const routes: Routes = [
  { path: '', component: AdminBlogsComponent },
  { path: 'add', component: AddBlogComponent },
  { path: 'edit/:id', component: EditBlogComponent }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
