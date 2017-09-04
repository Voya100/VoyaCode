import { Component } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';

import { ChessGameService } from '../../chess-game.service';
import { Piece } from '../../classes/piece';
import { ChessSettingsService } from '../../chess-settings.service';
import { HumanPlayer } from '../../classes/human-player';
import { Tile } from '../../classes/tile';

const whiteTileColor = '#e6cfaf';
const blackTileColor = '#9b7b40';
const highlightTileColor = 'orange';
const movableTileColor = 'yellow';
const enemyTileColor = 'rgb(189, 104, 53)';

@Component({
  selector: 'chess-board',
  templateUrl: 'chess-board.component.html',
  styleUrls: ['chess-board.component.scss'],
  animations: [
    trigger('fadeIn', [
      state('true', style({ opacity: 1 })),
      state('void', style({ opacity: 0 })),
      transition('* => *', animate('300ms'))
    ])
  ]
})
export class ChessBoardComponent {

  constructor(public game: ChessGameService, public settings: ChessSettingsService){
  }

  // Returns color of the tile in tilePosition
  tileColor(tilePosition: number[]){
    const tile: Tile = this.game.board[tilePosition[1]][tilePosition[0]];
    
    if(tile.highlighted()){
      return highlightTileColor;
    }else if(tile.markedMovable()){
      if(tile.empty()){
        return movableTileColor;
      }else{
        return enemyTileColor;
      }
    }else{
      return (tile.x + tile.y) % 2 === 0 ? whiteTileColor : blackTileColor;
    }
  }

  // Distance from top side of the board (in percentages)
  pieceTopLocation(piece: Piece){
    if(!this.settings.boardReversed){
      return this.coordinateToPercentage(piece.tile.y);
    }else{
      return this.coordinateToPercentage(piece.tile.x);
    }
  }
  // Distance from left side of the board (in percentages)
  pieceLeftLocation(piece: Piece){
    if(!this.settings.boardReversed){
      return this.coordinateToPercentage(piece.tile.x);
    }else{
      return this.coordinateToPercentage(this.settings.boardSize - 1 - piece.tile.y);
    }
  }

  pieceImageUrl(piece: Piece){
    return 'images/chess/' + piece.color + '-' + piece.type + '.png';
  }

  coordinateToPercentage(coordinate: number){
    return (coordinate * 12.5) + '%';
  }

  selectTile(tilePosition: number[]){
    if(!this.game.gamePaused && this.game.activePlayer instanceof HumanPlayer){
      const tile = this.game.board[tilePosition[1]][tilePosition[0]];
      tile.select(this.game.activePlayer);
    }
  }

}
