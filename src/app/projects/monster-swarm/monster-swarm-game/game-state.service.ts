import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GameStateService {
  async fetchGameState() {
    // TODOA: Fetch from server
    return JSON.parse(window.localStorage.getItem('monster-swarm-game-state'));
  }

  async saveGameState(gameState) {
    // TODO: Save this to server
    window.localStorage.setItem('monster-swarm-game-state', JSON.stringify(gameState));
  }
}
