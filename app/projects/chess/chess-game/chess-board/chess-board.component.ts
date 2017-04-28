import { Component } from '@angular/core';
import { ChessGameService } from '../../chess-game.service';
import { Tile } from '../../classes/tile';
import { Piece } from '../../classes/piece';

const whiteTileColor = "#e6cfaf";
const blackTileColor = "#9b7b40";
const highlightTileColor = "orange";
const movableTileColor = "yellow";

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
        if(tile.highlighted()){
            return highlightTileColor;
        }else if(tile.markedMovable()){
            return movableTileColor;
        }else{
            return (tile.x + tile.y) % 2 == 0 ? blackTileColor : whiteTileColor;
        }
    }

    pieceTopLocation(piece: Piece){
        return this.coordinateToPercentage(piece.tile.y);
    }

    pieceLeftLocation(piece: Piece){
        return this.coordinateToPercentage(piece.tile.x);
    }

    pieceImageUrl(piece: Piece){
        return "images/chess/" + piece.color + "-" + piece.type + ".png";
    }

    coordinateToPercentage(coordinate: number){
        return (coordinate * 12.5) + "%";
    }

    selectTile(tile: Tile){
        tile.select(this.game.activePlayer);
    }


}
