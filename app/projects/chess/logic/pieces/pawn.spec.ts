import { chessGame, compareMoves, setBoard, testMoveTiles } from '../test-helpers';
import { Pawn } from './pawn';

// tslint:disable:whitespace

const game = chessGame;

describe('#Pawn', function(){

  describe('moveTiles', function(){

    it('should have 2 tiles at start', function(){
      testMoveTiles(3,6,[
        [' ' ,' ' ,' ' ,' ' ,' ' ,' ' ,' ' ,' ' ],
        [' ' ,'  ',' ' ,' ' ,' ' ,' ' ,' ' ,' ' ],
        [' ' ,' ' ,' ' ,' ' ,' ' ,' ' ,' ' ,' ' ],
        [' ' ,' ' ,' ' ,' ' ,' ' ,' ' ,' ' ,' ' ],
        [' ' ,' ' ,' ' ,'X'  ,' ',' ' ,' ' ,' ' ],
        [' ' ,' ' ,' ' ,'X' ,' ' ,' ' ,' ' ,' ' ],
        [' ' ,' ' ,' ' ,'WP',' ' ,' ' ,'  ',' ' ],
        [' ' ,' ' ,' ' ,' ' ,' ' ,' ' ,' ' ,'  ']
      ]);
      testMoveTiles(3,1,[
        [' ' ,' ' ,' ' ,' ' ,' ' ,' ' ,' ' ,' ' ],
        [' ' ,'  ',' ' ,'BP',' ' ,' ' ,' ' ,' ' ],
        [' ' ,' ' ,' ' ,'X' ,' ' ,' ' ,' ' ,' ' ],
        [' ' ,' ' ,' ' ,'X' ,' ' ,' ' ,' ' ,' ' ],
        [' ' ,' ' ,' ' ,' '  ,' ',' ' ,' ' ,' ' ],
        [' ' ,' ' ,' ' ,' ' ,' ' ,' ' ,' ' ,' ' ],
        [' ' ,' ' ,' ' ,' ' ,' ' ,' ' ,'  ',' ' ],
        [' ' ,' ' ,' ' ,' ' ,' ' ,' ' ,' ' ,'  ']
      ]);
    });

    it('should have 1 tile after moving', function(){
      setBoard(game, [
        [' ' ,' ' ,' ' ,' ' ,' ' ,' ' ,' ' ,' ' ],
        [' ' ,'  ',' ' ,' ' ,' ' ,'BP',' ' ,' ' ],
        [' ' ,' ' ,' ' ,' ' ,' ' ,' ' ,' ' ,' ' ],
        [' ' ,' ' ,' ' ,' ' ,' ' ,' ' ,' ' ,' ' ],
        [' ' ,' ' ,' ' ,' '  ,' ',' ' ,' ' ,' ' ],
        [' ' ,' ' ,' ' ,' ' ,' ' ,' ' ,' ' ,' ' ],
        [' ' ,' ' ,' ' ,'WP',' ' ,' ' ,'  ',' ' ],
        [' ' ,' ' ,' ' ,' ' ,' ' ,' ' ,' ' ,'  ']
      ]);
      const whitePawn = game.getPiece(3,6);
      const blackPawn = game.getPiece(5,1);
      
      game.movePiece(whitePawn, game.board[4][3]);
      game.movePiece(blackPawn, game.board[3][5]);
      game.changeTurn();

      compareMoves(3,4, game, [
        [' ' ,' ' ,' ' ,' ' ,' ' ,' ' ,' ' ,' ' ],
        [' ' ,' ' ,' ' ,' ' ,' ' ,' ' ,' ' ,' ' ],
        [' ' ,' ' ,' ' ,' ' ,' ' ,' ' ,' ' ,' ' ],
        [' ' ,' ' ,' ' ,'X' ,' ' ,' ' ,' ' ,' ' ],
        [' ' ,' ' ,' ' ,'WP' ,' ',' ' ,' ' ,' ' ],
        [' ' ,' ' ,' ' ,' ' ,' ' ,' ' ,' ' ,' ' ],
        [' ' ,' ' ,' ' ,' ' ,' ' ,' ' ,'  ',' ' ],
        [' ' ,' ' ,' ' ,' ' ,' ' ,' ' ,' ' ,'  ']
      ]);
      
      compareMoves(5,3, game, [
        [' ' ,' ' ,' ' ,' ' ,' ' ,' ' ,' ' ,' ' ],
        [' ' ,'  ',' ' ,' ' ,' ' ,' ' ,' ' ,' ' ],
        [' ' ,' ' ,' ' ,' ' ,' ' ,' ' ,' ' ,' ' ],
        [' ' ,' ' ,' ' ,' ' ,' ' ,'BP',' ' ,' ' ],
        [' ' ,' ' ,' ' ,' ' ,' ' ,'X' ,' ' ,' ' ],
        [' ' ,' ' ,' ' ,' ' ,' ' ,' ' ,' ' ,' ' ],
        [' ' ,' ' ,' ' ,' ' ,' ' ,' ' ,'  ',' ' ],
        [' ' ,' ' ,' ' ,' ' ,' ' ,' ' ,' ' ,'  ']
      ]);
    });
    
    it('should be able to capture enemy pieces', function(){
      testMoveTiles(3,6, [
        [' ' ,' ' ,' ' ,' ' ,' ' ,' ' ,' ' ,' ' ],
        [' ' ,'  ',' ' ,' ' ,' ' ,' ', ' ' ,' ' ],
        [' ' ,' ' ,' ' ,' ' ,' ' ,' ' ,' ' ,' ' ],
        [' ' ,' ' ,' ' ,' ' ,' ' ,' ' ,' ' ,' ' ],
        [' ' ,' ' ,' ' ,' '  ,' ',' ' ,' ' ,' ' ],
        [' ' ,' ' ,'BB',' ' ,'BB',' ' ,' ' ,' ' ],
        [' ' ,' ' ,' ' ,'WP',' ' ,' ' ,'  ',' ' ],
        [' ' ,' ' ,' ' ,' ' ,' ' ,' ' ,' ' ,'  ']
      ],[
        [' ' ,' ' ,' ' ,' ' ,' ' ,' ' ,' ' ,' ' ],
        [' ' ,'  ',' ' ,' ' ,' ' ,' ', ' ' ,' ' ],
        [' ' ,' ' ,' ' ,' ' ,' ' ,' ' ,' ' ,' ' ],
        [' ' ,' ' ,' ' ,' ' ,' ' ,' ' ,' ' ,' ' ],
        [' ' ,' ' ,' ' ,'X'  ,' ',' ' ,' ' ,' ' ],
        [' ' ,' ' ,'X' ,'X' ,'X' ,' ' ,' ' ,' ' ],
        [' ' ,' ' ,' ' ,'WP',' ' ,' ' ,'  ',' ' ],
        [' ' ,' ' ,' ' ,' ' ,' ' ,' ' ,' ' ,'  ']
      ]);

      testMoveTiles(3,1, [
        [' ' ,' ' ,' ' ,' ' ,' ' ,' ' ,' ' ,' ' ],
        [' ' ,'  ',' ' ,'BP',' ' ,' ', ' ' ,' ' ],
        [' ' ,' ' ,'WB',' ' ,'WB',' ' ,' ' ,' ' ],
        [' ' ,' ' ,' ' ,' ' ,' ' ,' ' ,' ' ,' ' ],
        [' ' ,' ' ,' ' ,' '  ,' ',' ' ,' ' ,' ' ],
        [' ' ,' ' ,' ' ,' ' ,' ' ,' ' ,' ' ,' ' ],
        [' ' ,' ' ,' ' ,' ' ,' ' ,' ' ,'  ',' ' ],
        [' ' ,' ' ,' ' ,' ' ,' ' ,' ' ,' ' ,'  ']
      ],[
        [' ' ,' ' ,' ' ,' ' ,' ' ,' ' ,' ' ,' ' ],
        [' ' ,'  ',' ' ,'BP',' ' ,' ', ' ' ,' ' ],
        [' ' ,' ' ,'X' ,'X' ,'X' ,' ' ,' ' ,' ' ],
        [' ' ,' ' ,' ' ,'X' ,' ' ,' ' ,' ' ,' ' ],
        [' ' ,' ' ,' ' ,' '  ,' ',' ' ,' ' ,' ' ],
        [' ' ,' ' ,' ' ,' ' ,' ' ,' ' ,' ' ,' ' ],
        [' ' ,' ' ,' ' ,' ' ,' ' ,' ' ,'  ',' ' ],
        [' ' ,' ' ,' ' ,' ' ,' ' ,' ' ,' ' ,'  ']
      ]);
    });

    it('should not be able to capture friendly pieces', function(){
      testMoveTiles(3,6, [
        [' ' ,' ' ,' ' ,' ' ,' ' ,' ' ,' ' ,' ' ],
        [' ' ,'  ',' ' ,' ' ,' ' ,' ', ' ' ,' ' ],
        [' ' ,' ' ,' ' ,' ' ,' ' ,' ' ,' ' ,' ' ],
        [' ' ,' ' ,' ' ,' ' ,' ' ,' ' ,' ' ,' ' ],
        [' ' ,' ' ,' ' ,'X'  ,' ',' ' ,' ' ,' ' ],
        [' ' ,' ' ,'WB','X' ,'WB',' ' ,' ' ,' ' ],
        [' ' ,' ' ,' ' ,'WP',' ' ,' ' ,'  ',' ' ],
        [' ' ,' ' ,' ' ,' ' ,' ' ,' ' ,' ' ,'  ']
      ]);

      testMoveTiles(3,1, [
        [' ' ,' ' ,' ' ,' ' ,' ' ,' ' ,' ' ,' ' ],
        [' ' ,'  ',' ' ,'BP',' ' ,' ', ' ' ,' ' ],
        [' ' ,' ' ,'BB','X' ,'BB',' ' ,' ' ,' ' ],
        [' ' ,' ' ,' ' ,'X' ,' ' ,' ' ,' ' ,' ' ],
        [' ' ,' ' ,' ' ,' '  ,' ',' ' ,' ' ,' ' ],
        [' ' ,' ' ,' ' ,' ' ,' ' ,' ' ,' ' ,' ' ],
        [' ' ,' ' ,' ' ,' ' ,' ' ,' ' ,'  ',' ' ],
        [' ' ,' ' ,' ' ,' ' ,' ' ,' ' ,' ' ,'  ']
      ]);
    });
  });

  describe('en passant', function(){

    it('should work in normal situation', function(){
      setBoard(game, [
        [' ' ,' ' ,' ' ,' ' ,' ' ,' ' ,' ' ,' ' ],
        [' ' ,'  ',' ' ,' ' ,' ' ,'BP',' ' ,' ' ],
        [' ' ,' ' ,' ' ,' ' ,' ' ,' ' ,' ' ,' ' ],
        [' ' ,' ' ,' ' ,' ' ,' ' ,' ' ,'WP',' ' ],
        [' ' ,' ' ,' ' ,' ' ,'BP',' ' ,' ' ,' ' ],
        [' ' ,' ' ,' ' ,' ' ,' ' ,' ' ,' ' ,' ' ],
        [' ' ,' ' ,' ' ,'WP',' ' ,' ' ,'  ',' ' ],
        [' ' ,' ' ,' ' ,' ' ,' ' ,' ' ,' ' ,'  ']
      ]);
      const whitePawnTarget = game.getPiece(3,6);
      const blackPawnTarget = game.getPiece(5,1);
      
      const blackPawn = <Pawn> game.getPiece(4,4);
      const whitePawn = <Pawn> game.getPiece(6,3);

      blackPawn.hasMoved = true;
      whitePawn.hasMoved = true;

      game.movePiece(whitePawnTarget, game.board[4][3]);
      game.changeTurn();
  
      compareMoves(4,4, game, [
        [' ' ,' ' ,' ' ,' ' ,' ' ,' ' ,' ' ,' ' ],
        [' ' ,' ' ,' ' ,' ' ,' ' ,' ' ,' ' ,' ' ],
        [' ' ,' ' ,' ' ,' ' ,' ' ,' ' ,' ' ,' ' ],
        [' ' ,' ' ,' ' ,' ' ,' ' ,' ' ,' ' ,' ' ],
        [' ' ,' ' ,' ' ,'WP','BP',' ' ,' ' ,' ' ],
        [' ' ,' ' ,' ' ,'X' ,'X' ,' ' ,' ' ,' ' ],
        [' ' ,' ' ,' ' ,' ' ,' ' ,' ' ,'  ',' ' ],
        [' ' ,' ' ,' ' ,' ' ,' ' ,' ' ,' ' ,'  ']
      ]);

      game.movePiece(blackPawn, game.board[5][3]);

      game.changeTurn();
      game.changeTurn();

      game.movePiece(blackPawnTarget, game.board[3][5]);
      game.changeTurn();

      compareMoves(6,3, game, [
        [' ' ,' ' ,' ' ,' ' ,' ' ,' ' ,' ' ,' ' ],
        [' ' ,' ' ,' ' ,' ' ,' ' ,' ' ,' ' ,' ' ],
        [' ' ,' ' ,' ' ,' ' ,' ' ,'X' ,'X' ,' ' ],
        [' ' ,' ' ,' ' ,' ' ,' ' ,'BP','WP',' ' ],
        [' ' ,' ' ,' ' ,' ' ,' ' ,' ' ,' ' ,' ' ],
        [' ' ,' ' ,' ' ,' ' ,' ' ,' ' ,' ' ,' ' ],
        [' ' ,' ' ,' ' ,' ' ,' ' ,' ' ,'  ',' ' ],
        [' ' ,' ' ,' ' ,' ' ,' ' ,' ' ,' ' ,'  ']
      ]);

      game.movePiece(whitePawn, game.board[2][5]);

      // Pieces should be eaten
      expect(game.getPiece(3,4)).toBeNull();
      expect(game.getPiece(5,3)).toBeNull();

    });
    
    it('should work on edge of the board', function(){
      setBoard(game, [
        [' ' ,' ' ,' ' ,' ' ,' ' ,' ' ,' ' ,' ' ],
        [' ' ,'  ',' ' ,' ' ,' ' ,' ' ,' ' ,' ' ],
        [' ' ,' ' ,' ' ,' ' ,' ' ,' ' ,' ' ,' ' ],
        [' ' ,' ' ,' ' ,' ' ,' ' ,' ' ,' ' ,' ' ],
        [' ' ,' ' ,' ' ,' ' ,' ',' ' ,' ' ,'BP' ],
        [' ' ,' ' ,' ' ,' ' ,' ' ,' ' ,' ' ,' ' ],
        [' ' ,' ' ,' ' ,' ' ,' ' ,' ' ,'WP',' ' ],
        [' ' ,' ' ,' ' ,' ' ,' ' ,' ' ,' ' ,' ' ]
      ]);
      const whitePawnTarget = game.getPiece(6,6);
      const blackPawn = <Pawn> game.getPiece(7,4);

      blackPawn.hasMoved = true;

      game.movePiece(whitePawnTarget, game.board[4][6]);
      game.changeTurn();
  
      compareMoves(7,4, game, [
        [' ' ,' ' ,' ' ,' ' ,' ' ,' ' ,' ' ,' ' ],
        [' ' ,' ' ,' ' ,' ' ,' ' ,' ' ,' ' ,' ' ],
        [' ' ,' ' ,' ' ,' ' ,' ' ,' ' ,' ' ,' ' ],
        [' ' ,' ' ,' ' ,' ' ,' ' ,' ' ,' ' ,' ' ],
        [' ' ,' ' ,' ' ,' ' ,' ' ,' ' ,' ' ,'BP'],
        [' ' ,' ' ,' ' ,' ' ,' ' ,' ' ,'X' ,'X' ],
        [' ' ,' ' ,' ' ,' ' ,' ' ,' ' ,'  ',' ' ],
        [' ' ,' ' ,' ' ,' ' ,' ' ,' ' ,' ' ,' ' ]
      ]);
    });

    it('should not work after a turn has passed since double move', function(){
      setBoard(game, [
        [' ' ,' ' ,' ' ,' ' ,' ' ,' ' ,' ' ,' ' ],
        [' ' ,'  ',' ' ,' ' ,' ' ,'BP',' ' ,' ' ],
        [' ' ,' ' ,' ' ,' ' ,' ' ,' ' ,' ' ,' ' ],
        [' ' ,' ' ,' ' ,' ' ,' ' ,' ' ,'WP',' ' ],
        [' ' ,' ' ,' ' ,' ' ,'BP',' ' ,' ' ,' ' ],
        [' ' ,' ' ,' ' ,' ' ,' ' ,' ' ,' ' ,' ' ],
        [' ' ,' ' ,' ' ,'WP',' ' ,' ' ,'  ',' ' ],
        [' ' ,' ' ,' ' ,' ' ,' ' ,' ' ,' ' ,'  ']
      ]);
      const whitePawnTarget = game.getPiece(3,6);
      const blackPawnTarget = game.getPiece(5,1);
      
      const blackPawn = <Pawn> game.getPiece(4,4);
      const whitePawn = <Pawn> game.getPiece(6,3);

      blackPawn.hasMoved = true;
      whitePawn.hasMoved = true;

      game.movePiece(whitePawnTarget, game.board[4][3]);

      game.changeTurn();
      game.changeTurn();
  
      compareMoves(4,4, game, [
        [' ' ,' ' ,' ' ,' ' ,' ' ,' ' ,' ' ,' ' ],
        [' ' ,' ' ,' ' ,' ' ,' ' ,' ' ,' ' ,' ' ],
        [' ' ,' ' ,' ' ,' ' ,' ' ,' ' ,' ' ,' ' ],
        [' ' ,' ' ,' ' ,' ' ,' ' ,' ' ,' ' ,' ' ],
        [' ' ,' ' ,' ' ,'WP','BP',' ' ,' ' ,' ' ],
        [' ' ,' ' ,' ' ,' ' ,'X' ,' ' ,' ' ,' ' ],
        [' ' ,' ' ,' ' ,' ' ,' ' ,' ' ,'  ',' ' ],
        [' ' ,' ' ,' ' ,' ' ,' ' ,' ' ,' ' ,'  ']
      ]);

      game.movePiece(blackPawnTarget, game.board[3][5]);

      game.changeTurn();

      compareMoves(6,3, game, [
        [' ' ,' ' ,' ' ,' ' ,' ' ,' ' ,' ' ,' ' ],
        [' ' ,' ' ,' ' ,' ' ,' ' ,' ' ,' ' ,' ' ],
        [' ' ,' ' ,' ' ,' ' ,' ' ,' ' ,'X' ,' ' ],
        [' ' ,' ' ,' ' ,' ' ,' ' ,'BP','WP',' ' ],
        [' ' ,' ' ,' ' ,' ' ,' ' ,' ' ,' ' ,' ' ],
        [' ' ,' ' ,' ' ,' ' ,' ' ,' ' ,' ' ,' ' ],
        [' ' ,' ' ,' ' ,' ' ,' ' ,' ' ,'  ',' ' ],
        [' ' ,' ' ,' ' ,' ' ,' ' ,' ' ,' ' ,'  ']
      ]);

    });
  });

  describe('promotion', function(){

    it('should promote white and black pawns to queens', function(){
      setBoard(game, [
        [' ' ,' ' ,' ' ,' ' ,' ' ,' ' ,' ' ,' ' ],
        [' ' ,'  ',' ' ,' ' ,'WP',' ' ,' ' ,' ' ],
        [' ' ,' ' ,' ' ,' ' ,' ' ,' ' ,' ' ,' ' ],
        [' ' ,' ' ,' ' ,' ' ,' ' ,' ' ,' ' ,' ' ],
        [' ' ,' ' ,' ' ,' ' ,' ' ,' ' ,' ' ,' ' ],
        [' ' ,' ' ,' ' ,' ' ,' ' ,' ' ,' ' ,' ' ],
        [' ' ,' ' ,' ' ,' ' ,'BP',' ' ,' ' ,' ' ],
        [' ' ,' ' ,' ' ,' ' ,' ' ,' ' ,' ' ,' ' ]
      ]);
      const whitePawn = game.getPiece(4,1);
      const blackPawn = game.getPiece(4,6);
  
      game.movePiece(whitePawn, game.board[0][4]);
      game.movePiece(blackPawn, game.board[7][4]);

      const whiteQueen = game.getPiece(4, 0);
      const blackQueen = game.getPiece(4, 7);
      expect(whiteQueen.type).toBe('queen');
      expect(blackQueen.type).toBe('queen');
    });

  });

});
