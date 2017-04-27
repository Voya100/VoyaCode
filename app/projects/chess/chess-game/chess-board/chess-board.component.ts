import { Component } from '@angular/core';
import { ChessGameService } from '../../chess-game.service';
import { Tile } from '../../classes/tile';
import { Piece } from '../../classes/piece';

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

    pieceTopLocation(piece: Piece){
        return this.coordinateToPercentage(piece.tile.x);
    }

    pieceLeftLocation(piece: Piece){
        return this.coordinateToPercentage(piece.tile.y);
    }

    pieceImageUrl(piece: Piece){
        return "images/chess/" + piece.color + "-" + piece.type + ".png";
    }

    coordinateToPercentage(coordinate: number){
        return (coordinate * 12.5) + "%";
    }


}
