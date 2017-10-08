import { chessGame, setBoard } from '../test-helpers';

// tslint:disable:whitespace

const game = chessGame;

describe('#Player', function(){

  describe('isInCheck()', function(){

    it('should be in check when king is threatened', function(){
      setBoard(game, [
        [' ' ,' ' ,' ' ,' ' ,'BR',' ' ,' ' ,' ' ],
        [' ' ,'  ',' ' ,' ' ,' ' ,' ' ,' ' ,' ' ],
        [' ' ,' ' ,' ' ,' ' ,' ' ,' ' ,' ' ,' ' ],
        [' ' ,' ' ,' ' ,' ' ,' ' ,' ' ,' ' ,' ' ],
        [' ' ,' ' ,' ' ,' ' ,' ' ,' ' ,' ' ,' ' ],
        [' ' ,' ' ,' ' ,' ' ,' ' ,' ' ,' ' ,' ' ],
        [' ' ,' ' ,' ' ,' ' ,' ' ,' ' ,'  ',' ' ],
        [' ' ,' ' ,' ' ,' ' ,'WX',' ' ,' ' ,' ' ]
      ])
      const player = game.whitePlayer;
      expect(player.isInCheck()).toBe(true);
    });

    it('should not be in check when king is not threatened', function(){
      setBoard(game, [
        [' ' ,' ' ,' ' ,' ' ,'BP',' ' ,' ' ,' ' ],
        [' ' ,'  ',' ' ,' ' ,' ' ,' ' ,' ' ,' ' ],
        [' ' ,' ' ,' ' ,' ' ,' ' ,' ' ,' ' ,' ' ],
        [' ' ,' ' ,' ' ,' ' ,' ' ,' ' ,' ' ,' ' ],
        [' ' ,' ' ,' ' ,' ' ,' ' ,' ' ,' ' ,' ' ],
        [' ' ,' ' ,' ' ,' ' ,' ' ,' ' ,' ' ,' ' ],
        [' ' ,' ' ,' ' ,' ' ,' ' ,' ' ,'  ',' ' ],
        [' ' ,' ' ,' ' ,' ' ,'WX',' ' ,' ' ,' ' ]
      ])
      const player = game.whitePlayer;
      expect(player.isInCheck()).toBe(false);
    });

  });
  
  describe('isInCheckMate()', function(){
    
    it('should not be in check mate when king can still escape', function(){
      setBoard(game, [
        [' ' ,' ' ,' ' ,' ' ,'BR',' ' ,' ' ,' ' ],
        [' ' ,'  ',' ' ,' ' ,' ' ,' ' ,' ' ,' ' ],
        [' ' ,' ' ,' ' ,' ' ,' ' ,' ' ,' ' ,' ' ],
        [' ' ,' ' ,' ' ,' ' ,' ' ,' ' ,' ' ,' ' ],
        [' ' ,' ' ,' ' ,' ' ,' ' ,' ' ,' ' ,' ' ],
        [' ' ,' ' ,' ' ,' ' ,' ' ,' ' ,' ' ,' ' ],
        [' ' ,' ' ,' ' ,' ' ,' ' ,' ' ,'  ',' ' ],
        [' ' ,' ' ,' ' ,' ' ,'WX',' ' ,' ' ,' ' ]
      ])
      const player = game.whitePlayer;
      expect(player.isInCheckMate()).toBe(false);
    });

    it('should be in check mate when king can not escape', function(){
      setBoard(game, [
        [' ' ,' ' ,' ' ,'BR','BR','BR',' ' ,' ' ],
        [' ' ,'  ',' ' ,' ' ,' ' ,' ' ,' ' ,' ' ],
        [' ' ,' ' ,' ' ,' ' ,' ' ,' ' ,' ' ,' ' ],
        [' ' ,' ' ,' ' ,' ' ,' ' ,' ' ,' ' ,' ' ],
        [' ' ,' ' ,' ' ,' ' ,' ' ,' ' ,' ' ,' ' ],
        [' ' ,' ' ,' ' ,' ' ,' ' ,' ' ,' ' ,' ' ],
        [' ' ,' ' ,' ' ,' ' ,' ' ,' ' ,'  ',' ' ],
        [' ' ,' ' ,' ' ,' ' ,'WX',' ' ,' ' ,' ' ]
      ])
      const player = game.whitePlayer;
      expect(player.isInCheckMate()).toBe(true);
    });
    
    it('should not be in check mate when threat can be blocked', function(){
      setBoard(game, [
        [' ' ,' ' ,' ' ,'BR','BR','BR',' ' ,' ' ],
        [' ' ,'  ',' ' ,' ' ,' ' ,' ' ,' ' ,' ' ],
        [' ' ,' ' ,' ' ,' ' ,' ' ,' ' ,' ' ,' ' ],
        [' ' ,' ' ,' ' ,' ' ,' ' ,' ' ,' ' ,' ' ],
        [' ' ,' ' ,' ' ,' ' ,' ' ,' ' ,' ' ,' ' ],
        [' ' ,' ' ,' ' ,' ' ,' ' ,' ' ,' ' ,' ' ],
        [' ' ,' ' ,' ' ,' ' ,' ' ,' ' ,'  ',' ' ],
        [' ' ,' ' ,' ' ,'WB','WX',' ' ,' ' ,' ' ]
      ])
      const player = game.whitePlayer;
      expect(player.isInCheckMate()).toBe(false);
    });
    
    it('should not be in check mate when threat can be eliminated', function(){
      setBoard(game, [
        [' ' ,' ' ,' ' ,'BR','BR','BR',' ' ,' ' ],
        [' ' ,'  ',' ' ,' ' ,' ' ,' ' ,' ' ,' ' ],
        [' ' ,' ' ,' ' ,' ' ,' ' ,' ' ,' ' ,' ' ],
        [' ' ,'WB' ,' ' ,' ' ,' ' ,' ' ,' ' ,' ' ],
        [' ' ,' ' ,' ' ,' ' ,' ' ,' ' ,' ' ,' ' ],
        [' ' ,' ' ,' ' ,' ' ,' ' ,' ' ,' ' ,' ' ],
        [' ' ,' ' ,' ' ,' ' ,' ' ,' ' ,'  ',' ' ],
        [' ' ,' ' ,' ' ,' ' ,'WX',' ' ,' ' ,' ' ]
      ])
      const player = game.whitePlayer;
      expect(player.isInCheckMate()).toBe(false);
    });
    
    it('should be in check mate when threat can be blocked, but elimination would leave king vulnerable', function(){
      setBoard(game, [
        [' ' ,' ' ,' ' ,'BR','BR','BR',' ' ,' ' ],
        [' ' ,'  ',' ' ,' ' ,' ' ,' ' ,' ' ,' ' ],
        [' ' ,' ' ,' ' ,' ' ,' ' ,' ' ,' ' ,' ' ],
        [' ' ,' ' ,' ' ,' ' ,' ' ,' ' ,' ' ,' ' ],
        [' ' ,' ' ,' ' ,' ' ,' ' ,' ' ,' ' ,' ' ],
        [' ' ,' ' ,' ' ,' ' ,' ' ,' ' ,' ' ,' ' ],
        [' ' ,' ' ,' ' ,' ' ,' ' ,' ' ,'  ',' ' ],
        [' ' ,' ' ,'BR','WB','WX',' ' ,' ' ,' ' ]
      ])
      const player = game.whitePlayer;
      expect(player.isInCheckMate()).toBe(true);
    });
    
    it('should be in check mate when threat can be eliminated, but elimination would leave king vulnerable', function(){
      setBoard(game, [
        [' ' ,' ' ,' ' ,'BR',' ' ,'BR',' ' ,' ' ],
        [' ' ,' ' ,' ' ,' ' ,' ' ,' ' ,' ' ,' ' ],
        [' ' ,' ' ,' ' ,' ' ,' ' ,' ' ,' ' ,' ' ],
        [' ' ,' ' ,' ' ,' ' ,' ' ,' ' ,' ' ,' ' ],
        [' ' ,' ' ,' ' ,' ' ,'BR',' ' ,' ' ,' ' ],
        [' ' ,' ' ,' ' ,' ' ,' ' ,' ' ,' ' ,' ' ],
        [' ' ,' ' ,' ' ,' ' ,' ' ,' ' ,'  ',' ' ],
        ['BR','WR',' ' ,' ' ,'WX',' ' ,' ' ,' ' ]
      ])
      const player = game.whitePlayer;
      expect(player.isInCheckMate()).toBe(true);
    });

  });
});
