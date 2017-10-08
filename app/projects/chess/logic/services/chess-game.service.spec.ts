import { getBoardLayout } from '../test-helpers';
import { ChessGameService } from './chess-game.service';
import { ChessSettingsService } from './chess-settings.service';
import { Tile } from '../tile'

// tslint:disable:whitespace

describe('#ChessGame', function(){

  let game: ChessGameService;

  beforeEach(function(){
    game = new ChessGameService(new ChessSettingsService());
  });

  describe('setState()', function(){
    const state = {
      pieces: {
        0: {id: 0, type: 'pawn', x: 0, y: 1, owner: 'white'},
        1: {id: 1, type: 'rook', x: 1, y: 5, owner: 'white'},
        4: {id: 4, type: 'bishop', x: 2, y: 5, owner: 'black'},
        999: {id: 999, type: 'king', x: 5, y: 6, owner: 'black'}
      },
      round: 1,
      activePlayer: 'white',
      kingCount: 1,
      roundLimit: 100
    }

    it('should set new state', function(){
      game.setState(state);
      expect(game.state).toBe(state);
    });

    it('should set board', function(){
      game.setState(state);
      const board = game.board;

      expect(board.length).toBe(8);
      expect(board[0].length).toBe(8);
      expect(board[7].length).toBe(8);
      
      const tile = board[1][0];
      expect(tile).toEqual(jasmine.any(Tile));
      expect(tile.x).toBe(0);
      expect(tile.y).toBe(1);
      expect(tile.piece.type).toBe('pawn');
    });

    it('should set pieces', function(){
      game.setState(state);
      const pieces = game.pieces;
      expect(pieces[0].type).toBe('pawn');
      expect(pieces[999].type).toBe('king');
    });
  });

  describe('newGame()', function(){
    it('should set board correctly in default case', function(){
      game.newGame('PPPPPPPP', 'RKBQXBKR', 100);
      const board = getBoardLayout(game);
      expect(board).toEqual([
        ['BR','BK','BB','BQ','BX','BB','BK','BR'],
        ['BP','BP','BP','BP','BP','BP','BP','BP'],
        ['  ','  ','  ','  ','  ','  ','  ','  '],
        ['  ','  ','  ','  ','  ','  ','  ','  '],
        ['  ','  ','  ','  ','  ','  ','  ','  '],
        ['  ','  ','  ','  ','  ','  ','  ','  '],
        ['WP','WP','WP','WP','WP','WP','WP','WP'],
        ['WR','WK','WB','WQ','WX','WB','WK','WR']
      ]);
    });

    it('should set board correctly with empty spots', function(){
      game.newGame('PP PPPP ', 'R BQXB R', 100);
      const board = getBoardLayout(game);
      expect(board).toEqual([
        ['BR','  ','BB','BQ','BX','BB','  ','BR'],
        ['BP','BP','  ','BP','BP','BP','BP','  '],
        ['  ','  ','  ','  ','  ','  ','  ','  '],
        ['  ','  ','  ','  ','  ','  ','  ','  '],
        ['  ','  ','  ','  ','  ','  ','  ','  '],
        ['  ','  ','  ','  ','  ','  ','  ','  '],
        ['WP','WP','  ','WP','WP','WP','WP','  '],
        ['WR','  ','WB','WQ','WX','WB','  ','WR']
      ]);
    });

    it('should set king counts correctly', function(){
      game.newGame('PPPPPPPP', 'RKBQXBKR', 100);
      expect(game.state.kingCount).toBe(1);

      game.newGame('PPP  PPP', 'RKB  QKR', 100);
      expect(game.state.kingCount).toBe(0);
      
      game.newGame('PPPX PPP', 'RKB  QKX', 100);
      expect(game.state.kingCount).toBe(2);

      game.newGame('XXXXXXXX', 'XXXXXXXX', 100);
      expect(game.state.kingCount).toBe(16);
    });

    it('should set roundLimit', function(){
      game.newGame('PPPPPPPP', 'RKBQXBKR', 100);
      expect(game.state.roundLimit).toBe(100);

      game.newGame('PPPPPPPP', 'RKBQXBKR', 5);
      expect(game.state.roundLimit).toBe(5);
    });

    it('should set initial state', function(){
      game.newGame('PPPPPPPP', 'RKBQXBKR', 100);

      expect(game.state.latestMove).toBeFalsy();
      expect(game.state.round).toBe(1);
      expect(game.state.activePlayer).toBe('white');
      expect(game.state.round).toBe(1);
    });

  });

});
