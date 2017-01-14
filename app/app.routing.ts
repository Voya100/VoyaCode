import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', loadChildren: 'app/home/home.module#HomeModule' },
  { path: 'blogs', loadChildren: 'app/blogs/blogs.module#BlogsModule'}
];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes);