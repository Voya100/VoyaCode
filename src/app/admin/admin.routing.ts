import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AdminComponent } from './admin.component';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      { path: '', redirectTo: 'blogs' },
      {
        path: 'blogs',
        loadChildren: () => import('./blogs/admin-blogs.module').then(m => m.AdminBlogsModule),
        data: { title: 'Admin' }
      }
    ]
  }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
