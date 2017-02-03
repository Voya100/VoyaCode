import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', loadChildren: 'app/home/home.module#HomeModule', pathMatch: 'full', data: {title: ''} },
  { path: 'home', loadChildren: 'app/home/home.module#HomeModule', data: {title: 'Home'} },
  { path: 'blogs', loadChildren: 'app/blogs/blogs.module#BlogsModule', data: {title: 'Blogs'}},
  { path: 'projects', loadChildren: 'app/projects/projects.module#ProjectsModule', data: {title: 'Projects'}},
  { path: 'comments', loadChildren: 'app/comments/comments.module#CommentsModule', data: {title: 'Comments'}},
  { path: '404', loadChildren: 'app/not-found/not-found.module#NotFoundModule', data: {title: 'Page not found'}},
  { path: '**', redirectTo: '/404'}
];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes);