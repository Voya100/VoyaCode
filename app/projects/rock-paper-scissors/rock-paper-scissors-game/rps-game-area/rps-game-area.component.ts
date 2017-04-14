import { RpsGameLogicService } from '../../rps-game-logic.service';
import { Component } from '@angular/core';
import { trigger, state, style, animate, transition, keyframes} from '@angular/animations';

@Component({
    selector: 'rps-game-area',
    templateUrl: 'rps-game-area.component.html',
    styleUrls: ['rps-game-area.component.css'],
    animations: [
        trigger('fadeIn', [
            state('true', style({ opacity: 1 })),
            state('void', style({ opacity: 0 })),
            transition('* => *', animate('300ms'))
        ])
    ]
})
export class RpsGameAreaComponent {
    imagePath: string;
    image1: string;
    image2: string;
    image3: string;
    choicesVisible: boolean = true;
    choiceImagesVisible: boolean = false;
    roundResultVisible: boolean = false;
    roundResult: string;
    gameResultVisible: boolean = false;
    gameResult: string;
    gameData: RpsGameLogicService;

    constructor(gameData: RpsGameLogicService){
        this.gameData = gameData;
        this.imagePath = "images/rock-paper-scissors/";
    }

    image(name: string){
        return this.imagePath + name;
    }

    makeChoice(choice: string){
        this.gameData.player1.choice = choice;
        this.gameData.player2.choice = this.gameData.computerChoice();
        this.choicesVisible = false;
    }

    // Callback functions are always called after fade in/out animation has finished
    makeChoiceCallback(){
        if(!this.choicesVisible){
            this.showChoiceImages();
        }
    }

    showChoiceImages(){
        this.image1 = this.image(this.gameData.player1.choice + "1.png");
        this.image2 = this.image(this.gameData.player2.choice + "2.png");
        this.choiceImagesVisible = true;
    }

    choiceImagesCallback(){
        if(this.choiceImagesVisible){
            setTimeout(() => {this.choiceImagesVisible = false;}, 1000);            
        }else{
            this.showRoundResult();
        }
    }

    showRoundResult(){
        let choice1 = this.gameData.player1.choice;
        let choice2 = this.gameData.player2.choice;
        this.image3 = this.image(choice1 + "-" + choice2 + ".png");
        this.gameData.playRound();
        if(this.gameData.isTie()){
            this.roundResult = "It's a tie, both players get 0.5 points."
        }else{
            let winner = this.gameData.roundWinner;
            let loser = this.gameData.getOpponent(winner);
            let winnerChoiceCapitalized = winner.choice[0].toUpperCase() + winner.choice.slice(1); 
            this.roundResult = winnerChoiceCapitalized + " beats " + loser.choice + ", " + winner.name + " gets 1 point.";
        }
        this.roundResultVisible = true;
    }

    roundResultCallback(){
        if(this.roundResultVisible){
            setTimeout(() => {this.roundResultVisible = false;}, 1500);    
        }else{
            this.showChoiceOptions();
        }
    }

    showChoiceOptions(){
        if(this.gameData.gameHasEnded()){
            this.showGameResult();
            return;
        }
        this.choicesVisible = true;
    }

    showGameResult(){
        let winner = this.gameData.getGameWinner();
        if(winner == null){
            this.gameResult = "It's a tie!"
        }else{
            this.gameResult = winner.name + " wins!";
        }
        this.gameData.addGameResultToStatistics();
        this.gameResultVisible = true;
    }

    newGame(){
        this.gameData.newGame();
        this.gameResultVisible = false;
    }

    gameResultCallback(){
        if(!this.gameResultVisible){
            this.choicesVisible = true;
        }
    }
}
