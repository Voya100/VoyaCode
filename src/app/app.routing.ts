import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './authentication/auth.guard';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },

  { path: 'login', loadChildren: './login/login.module#LoginModule', data: {title: 'Login'} },
  { path: 'admin', loadChildren: './admin/admin.module#AdminModule', canActivate: [AuthGuard], data: {title: 'Admin'} },

  { path: 'home', loadChildren: './home/home.module#HomeModule', data: {title: 'Home'} },
  { path: 'blogs', loadChildren: './blogs/blogs.module#BlogsModule', data: {title: 'Blogs'}},
  { path: 'projects', loadChildren: './projects/projects.module#ProjectsModule', data: {title: 'Projects'}},
  { path: 'comments', loadChildren: './comments/comments.module#CommentsModule', data: {title: 'Comments'}},
  { path: 'cookie-policy', loadChildren: './cookie-policy/cookie-policy.module#CookiePolicyModule', data: {title: 'Cookie Policy'}},
  { path: '404', loadChildren: './not-found/not-found.module#NotFoundModule', data: {title: 'Page not found'}},
  { path: '**', redirectTo: '/404'}
];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes);
