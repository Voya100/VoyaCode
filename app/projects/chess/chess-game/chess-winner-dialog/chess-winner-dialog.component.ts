import { Component, EventEmitter, Input, OnDestroy, Output } from '@angular/core';
import { ChessGameService } from '../../services/chess-game.service';

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
    console.log(this.winner)
  }
  
  ngOnDestroy(){
    this.game.gameActive = true;
  }

  switchDialog(dialogName: string){
    this.switchDialogEvent.emit(dialogName);
    this.game.state.winner = null;
  }

  winnerText(){
    if(this.winner === 'Tie'){
      return 'Round limit reached,\nit\'s a tie!';
    }else if(this.game.victoryReason === 'no-moves'){
      return this.game.activePlayer.color + ' has no moves left,\n' + this.winner + ' wins!';
    }else if(this.game.victoryReason === 'check-mate'){
      return 'King has been check mated,\n' + this.winner + ' wins!';
    }else{
      return this.winner + ' wins!';
    }
  }
}
