import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ProjectsComponent } from './projects.component';

const routes: Routes = [
  { path: '', component: ProjectsComponent },
  
  { path: 'other-projects', loadChildren: './other-projects/other-projects.module#OtherProjectsModule', data: {title: 'Other Projects'}},
  
  { path: 'rock-paper-scissors', loadChildren: './rock-paper-scissors/rock-paper-scissors.module#RockPaperScissorsModule', 
    data: {title: 'Rock, Paper, Scissors'}},
  
  { path: 'slay-the-dragon', loadChildren: './slay-the-dragon/slay-the-dragon.module#SlayTheDragonModule', 
    data: {title: 'Slay the Dragon'}},
  
  { path: 'chess', loadChildren: './chess/chess.module#ChessModule', data: {title: 'Chess'}},
  
  { path: 'snow-machine', loadChildren: './snow-machine/snow-machine.module#SnowMachineModule', data: {title: 'Snow Machine'}},
  
  { path: 'hangman', loadChildren: './hangman/hangman.module#HangmanModule', data: {title: 'Hangman'}}
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
