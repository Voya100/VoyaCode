import { Component, EventEmitter, Input, OnDestroy, Output } from '@angular/core';
import { ChessGameService } from '../../logic/services/chess-game.service';

@Component({
  selector: 'chess-winner-dialog',
  templateUrl: 'chess-winner-dialog.component.html',
  styleUrls: ['chess-winner-dialog.component.scss']
})
export class ChessWinnerDialogComponent implements OnDestroy{
    
  // Tells owner to open another dialog
  @Output() switchDialogEvent: EventEmitter<string> = new EventEmitter<string>();

  winner: string;
  
  constructor(public game: ChessGameService){
    this.winner = game.winner;
  }
  
  ngOnDestroy(){
    this.game.gamePaused = false;
  }

  switchDialog(dialogName: string){
    this.switchDialogEvent.emit(dialogName);
    this.game.state.winner = null;
  }

  winnerText(){
    if(this.game.victoryReason === 'max-rounds'){
      return 'Round limit reached,\nit\'s a tie!';
    }else if(this.game.victoryReason === 'stalemate'){
      return this.game.activePlayer.color + ' has no moves left,\nit\'s a stalemate.';
    }else if(this.game.victoryReason === 'check-mate'){
      return 'King has been check mated,\n' + this.winner + ' wins!';
    }else{
      return this.winner + ' wins!';
    }
  }
}
