import { ChessGameService } from './services/chess-game.service';
import { ChessSettingsService } from './services/chess-settings.service';

export const chessGame = new ChessGameService(new ChessSettingsService());

const pieceTypes = {
  B: 'bishop',
  X: 'king',
  K: 'knight',
  P: 'pawn',
  Q: 'queen',
  R: 'rook'
}

export function setBoard(game: ChessGameService, board: string[][]){
  const state = {
    pieces: {},
    round: 1,
    activePlayer: 'white',
    kingCount: 1,
    roundLimit: 100
  }

  let id = 0;
  board.forEach((row, y) => 
    row.forEach((piece, x) => {
      if(piece !== '  ' && piece.length === 2){
        const type = pieceTypes[piece[1]];
        const owner = piece[0] === 'W' ? 'white' : 'black';
        state.pieces[id] = {id, type, owner, x, y}
        id++;
      }
    })
  );

  game.setState(state);
}

export function getBoardLayout(game: ChessGameService){
  return game.board.map((row) => 
    row.map((tile) => {
      if(tile.isEmpty){ return '  '; }
      const type = tile.piece.type === 'king' ? 'X' : tile.piece.type[0];
      return (tile.piece.color[0] + type).toUpperCase();
    })
  );
}

export function testMoveTiles(x: number, y: number, board: string[][], moveTileBoard: string[][] = board){
  const game = chessGame;
  setBoard(game, board);
  game.doTileChecks();
  compareMoves(x, y, game, moveTileBoard);
}

export function compareMoves(x: number, y: number, game: ChessGameService, moveTileBoard: string[][]){
  const tiles: string[] = [];
  moveTileBoard.forEach((row, j) => {
    row.forEach((tile, i) => {
      if(tile === 'X'){
        tiles.push('(x: ' + i + ', y: ' + j + ')');
      }
    })
  });
  const piece = game.board[y][x].piece;
  const moveTiles = piece.moveTiles.map((tile) => '(x: ' + tile.x + ', y: ' + tile.y + ')');

  expect(moveTiles.sort()).toEqual(tiles.sort());
}
