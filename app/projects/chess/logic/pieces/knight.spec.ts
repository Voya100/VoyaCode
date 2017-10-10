import { testMoveTiles } from '../test-helpers';

// tslint:disable:whitespace

describe('#Knight', function(){

  describe('moveTiles', function(){

    it('should work in center of the board', function(){
      testMoveTiles(4,3,[
        [' ' ,' ' ,' ' ,' ' ,' ' ,' ' ,' ' ,' ' ],
        [' ' ,'  ',' ' ,'X' ,' ' ,'X' ,' ' ,' ' ],
        [' ' ,' ' ,'X' ,' ' ,' ' ,' ' ,'X' ,' ' ],
        [' ' ,' ' ,' ' ,' ' ,'WK' ,' ' ,' ' ,' ' ],
        [' ' ,' ' ,'X' ,' '  ,' ',' ' ,'X' ,' ' ],
        [' ' ,' ' ,' ' ,'X' ,' ' ,'X' ,' ' ,' ' ],
        [' ' ,' ' ,' ' ,' ' ,' ' ,' ' ,'  ',' ' ],
        [' ' ,' ' ,' ' ,' ' ,' ' ,' ' ,' ' ,'  ']
      ]);
    });

    it('should work on corner of the board', function(){
      testMoveTiles(7,0,[
        [' ' ,' ' ,' ' ,' ' ,' ' ,' ' ,' ' ,'WK' ],
        [' ' ,' ' ,' ' ,' ' ,' ' ,'X' ,' ' ,' ' ],
        [' ' ,' ' ,' ' ,' ' ,' ' ,' ' ,'X' ,' ' ],
        [' ' ,' ' ,' ' ,' ' ,' ' ,' ' ,' ' ,' ' ],
        [' ' ,' ' ,' ' ,' '  ,' ',' ' ,' ' ,' ' ],
        [' ' ,' ' ,' ' ,' ' ,' ' ,' ' ,' ' ,' ' ],
        [' ' ,' ' ,' ' ,' ' ,' ' ,' ' ,'  ',' ' ],
        [' ' ,' ' ,' ' ,' ' ,' ' ,' ' ,' ' ,'  ']
      ]);
    });
    
    it('should work on edge of the board', function(){
      testMoveTiles(7,3,[
        [' ' ,' ' ,' ' ,' ' ,' ' ,' ' ,' ' ,' ' ],
        [' ' ,' ' ,' ' ,' ' ,' ' ,' ' ,'X' ,' ' ],
        [' ' ,' ' ,' ' ,' ' ,' ' ,'X' ,' ' ,' ' ],
        [' ' ,' ' ,' ' ,' ' ,' ' ,' ' ,' ' ,'WK' ],
        [' ' ,' ' ,' ' ,' '  ,' ','X' ,' ' ,' ' ],
        [' ' ,' ' ,' ' ,' ' ,' ' ,' ' ,'X' ,' ' ],
        [' ' ,' ' ,' ' ,' ' ,' ' ,' ' ,' ' ,' ' ],
        [' ' ,' ' ,' ' ,' ' ,' ' ,' ' ,' ' ,'  ']
      ]);
    });

    it('should not include friendly tiles', function(){
      testMoveTiles(4,3,[
        ['  ','  ','  ','  ','  ',' ' ,'  ','  '],
        ['  ','  ','  ','X' ,'  ','WK','  ','  '],
        ['  ','  ','X' ,' ' ,'  ','  ','X' ,'  '],
        ['  ','  ','  ','  ','WK','  ','  ','  '],
        ['  ','  ','WP','  ','  ','  ','X' ,'  '],
        ['  ','  ',' ' ,'WP','  ','X' ,'  ','  '],
        ['  ','  ','  ','  ','  ','  ','  ','  '],
        ['  ','  ','  ','  ','  ','  ','  ','  ']
      ]);
    });
    
    it('should include enemy tiles', function(){
      testMoveTiles(4,3,[
        [' ' ,' ' ,' ' ,' ' ,' ' ,' ' ,' ' ,' ' ],
        [' ' ,'  ',' ' ,'X' ,' ' ,'X' ,' ' ,' ' ],
        [' ' ,' ' ,'X' ,' ' ,' ' ,' ' ,'BQ' ,' '],
        [' ' ,' ' ,' ' ,' ' ,'WK' ,' ' ,' ' ,' '],
        [' ' ,' ' ,'X' ,' '  ,' ',' ' ,'X' ,' ' ],
        [' ' ,' ' ,' ' ,'BB',' ' ,'BP' ,' ' ,' '],
        [' ' ,' ' ,' ' ,' ' ,' ' ,' ' ,'  ',' ' ],
        [' ' ,' ' ,' ' ,' ' ,' ' ,' ' ,' ' ,'  ']
      ],[
        [' ' ,' ' ,' ' ,' ' ,' ' ,' ' ,' ' ,' ' ],
        [' ' ,'  ',' ' ,'X' ,' ' ,'X' ,' ' ,' ' ],
        [' ' ,' ' ,'X' ,' ' ,' ' ,' ' ,'X' ,' ' ],
        [' ' ,' ' ,' ' ,' ' ,'WK' ,' ' ,' ' ,' ' ],
        [' ' ,' ' ,'X' ,' '  ,' ',' ' ,'X' ,' ' ],
        [' ' ,' ' ,' ' ,'X' ,' ' ,'X' ,' ' ,' ' ],
        [' ' ,' ' ,' ' ,' ' ,' ' ,' ' ,'  ',' ' ],
        [' ' ,' ' ,' ' ,' ' ,' ' ,' ' ,' ' ,'  ']
      ]);
    });

    it('should jump over other tiles', function(){
      testMoveTiles(4,3,[
        [' ' ,' ' ,' ' ,' ' ,' ' ,' ' ,' ' ,' ' ],
        [' ' ,'  ',' ' ,'BP' ,' ' ,'X' ,' ' ,' ' ],
        [' ' ,' ' ,'X' ,'BP' ,'WP' ,'WP' ,'BQ' ,' '],
        [' ' ,' ' ,' ' ,'BP' ,'WK' ,'WP' ,' ' ,' '],
        [' ' ,' ' ,'X' ,'BP'  ,'BP','WP' ,'X' ,' ' ],
        [' ' ,' ' ,' ' ,'BB',' ' ,'BP' ,' ' ,' '],
        [' ' ,' ' ,' ' ,' ' ,' ' ,' ' ,'  ',' ' ],
        [' ' ,' ' ,' ' ,' ' ,' ' ,' ' ,' ' ,'  ']
      ],[
        [' ' ,' ' ,' ' ,' ' ,' ' ,' ' ,' ' ,' ' ],
        [' ' ,'  ',' ' ,'X' ,' ' ,'X' ,' ' ,' ' ],
        [' ' ,' ' ,'X' ,' ' ,' ' ,' ' ,'X' ,' ' ],
        [' ' ,' ' ,' ' ,' ' ,'WK' ,' ' ,' ' ,' ' ],
        [' ' ,' ' ,'X' ,' '  ,' ',' ' ,'X' ,' ' ],
        [' ' ,' ' ,' ' ,'X' ,' ' ,'X' ,' ' ,' ' ],
        [' ' ,' ' ,' ' ,' ' ,' ' ,' ' ,'  ',' ' ],
        [' ' ,' ' ,' ' ,' ' ,' ' ,' ' ,' ' ,'  ']
      ]);
    });
  });
});