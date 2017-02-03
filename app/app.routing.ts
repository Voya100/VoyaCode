import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', loadChildren: 'app/home/home.module#HomeModule', pathMatch: 'full', data: {title: ''} },
  { path: 'home', loadChildren: 'app/home/home.module#HomeModule', data: {title: 'Home'} },
  { path: 'blogs', loadChildren: 'app/blogs/blogs.module#BlogsModule', data: {title: 'Blogs'}},
  { path: 'projects', loadChildren: 'app/projects/projects.module#ProjectsModule', data: {title: 'Projects'}},
  { path: 'comments', loadChildren: 'app/comments/comments.module#CommentsModule', data: {title: 'Comments'}},
  // Project paths
  { path: 'projects/other-projects', loadChildren: 'app/projects/other-projects/other-projects.module#OtherProjectsModule', data: {title: 'Other Projects'}},
  { path: 'projects/rock-paper-scissors', loadChildren: 'app/projects/rock-paper-scissors/rock-paper-scissors.module#RockPaperScissorsModule', data: {title: 'Rock, Paper, Scissors'}},
  { path: 'projects/slay-the-dragon', loadChildren: 'app/projects/slay-the-dragon/slay-the-dragon.module#SlayTheDragonModule', data: {title: 'Slay the Dragon'}},
  { path: 'projects/chess', loadChildren: 'app/projects/chess/chess.module#ChessModule', data: {title: 'Chess'}},
  { path: 'projects/snow-machine', loadChildren: 'app/projects/snow-machine/snow-machine.module#SnowMachineModule', data: {title: 'Snow Machine'}},
  { path: 'projects/hangman', loadChildren: 'app/projects/hangman/hangman.module#HangmanModule', data: {title: 'Hangman'}},
  // 404
  { path: '404', loadChildren: 'app/not-found/not-found.module#NotFoundModule', data: {title: 'Page not found'}},
  { path: '**', redirectTo: '/404'}
];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes);