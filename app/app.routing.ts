import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', loadChildren: 'app/home/home.module#HomeModule', pathMatch: 'full' },
  { path: 'home', loadChildren: 'app/home/home.module#HomeModule' },
  { path: 'blogs', loadChildren: 'app/blogs/blogs.module#BlogsModule'},
  { path: 'projects', loadChildren: 'app/projects/projects.module#ProjectsModule'},
  { path: 'comments', loadChildren: 'app/comments/comments.module#CommentsModule'},
  // Project paths
  { path: 'projects/other-projects', loadChildren: 'app/projects/other-projects/other-projects.module#OtherProjectsModule'},
  // 404
  { path: '404', loadChildren: 'app/not-found/not-found.module#NotFoundModule'},
  { path: '**', redirectTo: '/404'}
];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes);