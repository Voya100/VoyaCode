import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AdminComponent } from './admin.component';

const routes: Routes = [
  { path: '', component: AdminComponent, children: [

    { path: 'blogs', loadChildren: './blogs/admin-blogs.module#AdminBlogsModule', data: {title: 'Admin'}}
    
  ]}
  
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
