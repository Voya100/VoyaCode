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
    ]),
    trigger('fadeInFast', [
      state('true', style({ opacity: 1 })),
      state('void', style({ opacity: 0 })),
      transition('* => *', animate('150ms'))
    ])
  ]
})
export class ChessBoardComponent implements OnDestroy {

  selectedPiece: Piece;
  latestMove: MoveAction = {piece: null, tile: null};
  checkColor: string = 'black';
  isChecked: boolean = false;

  // Coordinates for each tile
  tiles: number[][][] = Array(8).fill(1).map((x, j) => Array(8).fill(1).map((_, i) => [i, j]));

  checkSubscription: Subscription;
  moveSubscription: Subscription;

  constructor(public game: ChessGameService, public settings: ChessSettingsService){

    // Shows check text on screen briefly on turn change, if in check
    this.checkSubscription = game.isChecked.subscribe((color: string) => {
      // Small delay before animation start
      setTimeout(() => {
        this.checkColor = color;
        this.isChecked = true;
        // Hide after small delay
        setTimeout(() => this.isChecked = false, 750);
      }, 300);
    })

    this.moveSubscription = game.latestMoveChanged.subscribe((latestMove: MoveAction) => {
      this.latestMove = latestMove;
      this.selectedPiece = null;
    });
  }

  ngOnDestroy(){
    this.moveSubscription.unsubscribe();
  }

  // Returns color of the tile in tilePosition
  tileColor([x, y]: number[]){
    if(this.isReversed()){
      y = 7 - y;
    }
    // console.log('board', this.game.board);
    const tile: Tile = this.game.board[y][x];
    
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

  isReversed(){
    return !this.game.whitePlayer.isPlayable && this.game.blackPlayer.isPlayable;
  }

  // Distance from top side of the board (in percentages)
  pieceTopLocation(piece: Piece){
    if(this.isReversed()){
      return this.coordinateToPercentage(7 - piece.y);
    }else{
      return this.coordinateToPercentage(piece.y);
    }
  }
  // Distance from left side of the board (in percentages)
  pieceLeftLocation(piece: Piece){
    return this.coordinateToPercentage(piece.x);
  }

  pieceImageUrl(piece: Piece){
    return 'images/chess/' + piece.color + '-' + piece.type + '.png';
  }

  coordinateToPercentage(coordinate: number){
    return (coordinate * 12.5) + '%';
  }

  selectTile([x, y]: number[]){
    if(this.isReversed()){
      y = 7 - y;
    }
    const activePlayer = this.game.activePlayer;
    if(this.game.isInteractive && activePlayer.isPlayable){
      const tile = this.game.board[y][x];
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
