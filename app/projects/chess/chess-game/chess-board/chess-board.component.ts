import { Component, OnDestroy } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { Subscription } from 'rxjs/Subscription';

import { ChessGameService } from '../../logic/services/chess-game.service';
import { ChessSettingsService } from '../../logic/services/chess-settings.service';

import { Piece } from '../../logic/pieces/piece';
import { Tile } from '../../logic/tile';
import { HumanPlayer } from '../../logic/players/human-player';
import { MoveAction } from '../../logic/chess-interfaces';

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
export class ChessBoardComponent implements OnDestroy {

  selectedPiece: Piece;
  latestMove: MoveAction = {piece: null, tile: null};
  subscription: Subscription;

  constructor(public game: ChessGameService, public settings: ChessSettingsService){
    this.subscription = game.latestMoveChanged.subscribe((latestMove: MoveAction) => {
      this.latestMove = latestMove;
      this.selectedPiece = null;
    });
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

  // Returns color of the tile in tilePosition
  tileColor(tilePosition: number[]){
    const tile: Tile = this.game.board[tilePosition[1]][tilePosition[0]];
    
    if(tile.piece !== null && tile.piece === this.selectedPiece){
      // Selected piece
      return highlightTileColor;
    }else if(tile.piece !== null && tile.piece === this.latestMove.piece && this.selectedPiece === null){
      // Piece that moved on previous turn (if a piece isn't selected)
      return highlightTileColor;
    }else if(this.selectedPiece && this.selectedPiece.canMove(tile)){
      if(tile.isEmpty()){
        // Move tiles of selected piece
        return movableTileColor;
      }else{
        // Move tile of selected oiece that has enemy on it
        return enemyTileColor;
      }
    }else{
      // Default color
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
    const activePlayer = this.game.activePlayer;
    if(this.game.isInteractive && activePlayer instanceof HumanPlayer){
      const tile = this.game.board[tilePosition[1]][tilePosition[0]];
      const piece = tile.piece;
      if(piece && piece.color === activePlayer.color){
        this.selectedPiece = piece;
      }else if(this.selectedPiece && this.selectedPiece.canMove(tile)){
        activePlayer.makeAction(this.selectedPiece, tile);
      }else{
        this.selectedPiece = null;
      }
    }
  }

}
