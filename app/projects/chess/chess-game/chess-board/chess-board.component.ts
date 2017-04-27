import { Component } from '@angular/core';
import { ChessGameService } from '../../chess-game.service';
import { Tile } from '../../classes/tile';

const whiteTileColor = "#e6cfaf";
const blackTileColor = "#9b7b40";

@Component({
    selector: 'chess-board',
    templateUrl: 'chess-board.component.html',
    styleUrls: ['chess-board.component.css']
})
export class ChessBoardComponent {

    constructor(public game: ChessGameService){
        game.reset();
        console.log(game);
    }

    tileColor(tile: Tile){
        return (tile.x + tile.y) % 2 == 0 ? blackTileColor : whiteTileColor;
    }

}
