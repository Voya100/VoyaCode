import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProjectsComponent } from './projects.component';

const routes: Routes = [
  { path: '', component: ProjectsComponent },
  { path: 'other-projects', loadChildren: 'app/projects/other-projects/other-projects.module#OtherProjectsModule', data: {title: 'Other Projects'}},
  { path: 'rock-paper-scissors', loadChildren: 'app/projects/rock-paper-scissors/rock-paper-scissors.module#RockPaperScissorsModule', data: {title: 'Rock, Paper, Scissors'}},
  { path: 'slay-the-dragon', loadChildren: 'app/projects/slay-the-dragon/slay-the-dragon.module#SlayTheDragonModule', data: {title: 'Slay the Dragon'}},
  { path: 'chess', loadChildren: 'app/projects/chess/chess.module#ChessModule', data: {title: 'Chess'}},
  { path: 'snow-machine', loadChildren: 'app/projects/snow-machine/snow-machine.module#SnowMachineModule', data: {title: 'Snow Machine'}},
  { path: 'hangman', loadChildren: 'app/projects/hangman/hangman.module#HangmanModule', data: {title: 'Hangman'}},
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);