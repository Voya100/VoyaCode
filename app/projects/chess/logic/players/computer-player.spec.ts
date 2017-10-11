// TODO: More tests in the future?

import { chessGame, setBoard } from '../test-helpers';
import { ComputerPlayer } from './computer-player';

// tslint:disable:whitespace

const game = chessGame;

describe('#ComputerPlayer', function(){

  describe('chooseTarget()', function(){
    it('should capture valuable threat instead of blocking when in check, if possible', function(){
      setBoard(game, [
        [' ' ,'BK' ,'BB','BQ','BX','BB',' ' ,' '],
        ['BR',' ' ,' ' ,' ' ,'BP','BP',' ' ,' ' ],
        ['BP',' ' ,' ' ,' ' ,' ' ,' ' ,' ' ,' ' ],
        [' ' ,'WQ',' ' ,' ' ,'BP',' ' ,' ' ,' ' ],
        [' ' ,' ' ,' ' ,' ' ,' ' ,' ' ,' ' ,' ' ],
        [' ' ,' ' ,' ' ,' ' ,' ' ,' ' ,' ' ,' ' ],
        [' ' ,' ' ,' ' ,' ' ,' ' ,' ' ,' ' ,' ' ],
        [' ' ,' ' ,' ' ,' ' ,' ' ,' ' ,' ' ,' ' ]
      ]);
      
      const player = <ComputerPlayer> game.blackPlayer;
      const expectedPiece = game.getPiece(0,2);
      const expectedTarget = game.board[3][1];

      player.chooseTarget();
      expect(player.pieceDecision.state).toBe(expectedPiece.state);
      expect(player.tileDecision).toBe(expectedTarget);
    });
  });

});
