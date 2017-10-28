import { Component, Input } from '@angular/core';
import * as _ from 'lodash';

const imageTypes = {
  P: 'white-pawn',
  R: 'white-rook',
  K: 'white-knight',
  B: 'white-bishop',
  Q: 'white-queen',
  X: 'white-king'
};

const imagePath = 'images/chess/';
const whiteTileColor = '#e6cfaf';
const blackTileColor = '#9b7b40';

@Component({
  selector: 'chess-board-layout',
  templateUrl: 'chess-board-layout.component.html',
  styleUrls: ['./chess-board-layout.component.scss']
})
export class ChessBoardLayoutComponent {

  @Input() row1: string;
  @Input() row2: string;
  @Input() tileSize: number;

  readonly white: string = whiteTileColor;
  readonly black: string = blackTileColor;
  readonly repeater: number[] = _.range(0, 8);

  pieceImagePath(type: string){
    const imageType = imageTypes[type];
    return imageType && imagePath + imageType + '.png';
  }

}
