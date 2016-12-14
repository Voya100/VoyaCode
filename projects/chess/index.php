<!DOCTYPE html>
<html dir="ltr" lang="en">
<head>
    <title>Chess</title>
    <?php include '../../head.inc';?>
    <link type="text/css" href='../../styles/projects/chess.css' rel="stylesheet"></link>
    <script src="http://code.jquery.com/jquery-1.9.1.min.js"></script>
    <script src="chess_classes.js"></script>
    <script src="chess.js"></script>
</head>
<body>
<?php include_once("../../header.inc");?>

<article>
<h1>Chess</h1>

<div id="game">
<div id="side_menu" class="interface">
  <table>
    <tr><td style="font-size:" colspan="2"><b>Game stats</b></td></tr>
      <tr><td colspan="2" id="turn">White's turn</td></tr>
      <tr><td>Round:</td><td><span id="round_count">1</span></td></tr>
      <tr><td>White:</td><td><span id="white_count">16</span> pieces</td></tr>
      <tr><td>Black:</td><td><span id="black_count">16</span> pieces</td></tr>
  </table>
  <li class='play_again' title='Resets the game.'>Reset game</li>
  <li class='game_mode_button' title='Choose game mode.'>Game mode</li>
  <li class='settings_button' title='Change piece layout.'>Settings</li>
  <li class='instructions_button' title='Read the instructions.'>Instructions</li>
</div>
<div id="board_area">
<div id="game_mode_screen" class="interface">
    <h1>Game modes</h1>
    <li id="player_vs_computer" title='Play against the computer AI.'>Player vs computer</li>
    <li id="local_multiplayer" title="Challenge a friend to a game of chess.">Local multiplayer</li>
    <li id="computer_vs_computer" title="Watch while computer AIs try to annihilate each other.">Computer vs computer</li>
</div>
<div id="settings_screen" class="interface">
    <h1>Settings</h1>
    Change piece layout<br>
    <form autocomplete="off">
        <table>
            <tr><td>Row 1: <input type='text' id='pieceRow1' maxlength='8' size='8' value='RKBXQBKR'>
                <td rowspan='2'>P: Pawn<br>R: Rook<br>X: King</td>
                <td rowspan='2'>K: Knight<br>B: Bishop<br>Q: Queen</td>
            </tr>
            <tr><td>Row 2: <input type='text' id='pieceRow2' maxlength='8' size='8' value='PPPPPPPP'>
        </table>
    </form>
    <li id="save_settings" title='Changing settings will reset the game.'>Save settings</li>
    <li id="reset_layout" title='Puts pieces to their original places and resets the game.'>Reset layout</li>
</div>
<div id="instructions_screen" class="interface">
    <h1>Instructions</h1>
    The goal of chess is to capture the enemy king. Once that is done, the game will end and the winner declared.
    <br>A player captures an enemy piece by moving their piece to their tile. Captured pieces are removed from the game.
    <br>Each player does always one move each turn. Skipping isn't possible. White player always starts the game.
    <br><h1>Pieces</h1>
    <table>
    <tr>
        <td><img src='img/white_pawn.png'></td>
        <td><b>Pawns</b> are the most common piece. Pawns can move 1 square forward if it isn't occupied by another piece. 
        On the first move they can alternatively move 2 squares.
        <br>Pawns can only capture pieces that are on diagonal squares in front of them.
        <br>Once a pawn reaches other end of the board, it is automatically promoted to queen.</td>
    </tr>
    <tr>
        <td><img src='img/white_knight.png'></td>
        <td><b>Knights</b> can move to any of the closest squares that aren't horizontal, vertical or diagonal. 
        <br>Their moves form L shape: 2 forward, 1 left/right. Knights can jump over other pieces.</td>
    </tr>
    <tr>
        <td><img src='img/white_rook.png'></td>
        <td><b>Rooks</b> can move horizontally and vertically to any direction any number of squares, but can't jump over other pieces.</td>
    </tr>
    <tr>
        <td><img src='img/white_bishop.png'></td>
        <td><b>Bishops</b> can move diagonally to any direction any number of squares, but can't jump over other pieces.</td>
    </tr>
    <tr>
        <td><img src='img/white_queen.png'></td>
        <td><b>Queens</b> have same moves as rooks and bishops (all horizontal, vertical and diagonal squares).</td>
    </tr>
    <tr>
        <td><img src='img/white_king.png'></td>
        <td><b>King</b> is the most valuable piece - once the king is captured, the game ends.
        <br>King can move one square to any direction.</td>
    </tr>
    </table>

</div>
<div id="win_screen" class="interface">
    <h1 id="win_message">White wins!</h1>
    <li class="play_again">Play again</li>
    <li class='game_mode_button' title='Choose game mode.'>Switch game mode</li>
    <li class='settings_button' title='Change piece layout.'>Change settings</li>
</div>
<div id="pieces"></div>
<table id="board">
<?php 
$black = true;

for($row = 0; $row <= 7; $row++){
    echo("<tr>");
    for($col = 0; $col <= 7; $col++){
        if($black) $color = "black"; else $color = "white";
        $black = !$black;
        echo "<td class='$color' id='coord$col" . "$row'></td>";
    }
    echo "</tr>";
    $black = !$black;
}

?>

</table>
</div>
</div>
<div id='description'><h1>Description:</h1>
<p>This chess game has 3 game modes. In <b>Player vs computer</b> you can challenge the computer AI and see if you're smarter than a machine. If you have friends you
want to challenge, you can use <b>Local multiplayer</b> mode (needs to be played on the same monitor). If you feel a little lazy, you can let the computer AI
do the moves for you in <b>Computer vs computer</b> mode.
<br><br>With settings you can change the piece layout and make your own chess game. Ever wondered what it would be like to play chess if all pawns were queens? Now you can find out!
(If there is more than one king, all kings need to be captured. If there aren't any kings, all enemy pieces need to be captured.)
<br><br>This version of chess has some small changes to the traditional rules:
<br>- Castling and En passant special moves are disabled.
<br>- In promotion pawn is automatically promoted to queen.
<br>- The game will only end once the king is captured. Game doesn't prevent players from doing moves which leave king vulnerable.</p></div>
</article>

<?php include '../../footer.inc';?>
  </body>
</html>