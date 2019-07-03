import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ProjectsComponent } from './projects.component';

const routes: Routes = [
  { path: '', component: ProjectsComponent },
  {
    path: 'other-projects',
    loadChildren: () => import('./other-projects/other-projects.module').then(m => m.OtherProjectsModule),
    data: { title: 'Other Projects' }
  },
  {
    path: 'rock-paper-scissors',
    loadChildren: () => import('./rock-paper-scissors/rock-paper-scissors.module').then(m => m.RockPaperScissorsModule),
    data: { title: 'Rock, Paper, Scissors' }
  },
  {
    path: 'slay-the-dragon',
    loadChildren: () => import('./slay-the-dragon/slay-the-dragon.module').then(m => m.SlayTheDragonModule),
    data: { title: 'Slay the Dragon' }
  },
  {
    path: 'chess',
    loadChildren: () => import('./chess/chess.module').then(m => m.ChessModule),
    data: { title: 'Chess' }
  },
  {
    path: 'snow-machine',
    loadChildren: () => import('./snow-machine/snow-machine.module').then(m => m.SnowMachineModule),
    data: { title: 'Snow Machine' }
  },
  {
    path: 'hangman',
    loadChildren: () => import('./hangman/hangman.module').then(m => m.HangmanModule),
    data: { title: 'Hangman' }
  },
  {
    path: 'color-picker',
    loadChildren: () => import('./color-picker/color-picker.module').then(m => m.ColorPickerModule),
    data: { title: 'Color picker' }
  },
  {
    path: 'monster-swarm',
    loadChildren: () => import('./monster-swarm/monster-swarm.module').then(m => m.MonsterSwarmModule),
    data: { title: 'Monster Swarm' }
  }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
