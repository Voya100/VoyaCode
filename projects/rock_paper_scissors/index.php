<!DOCTYPE html>
<html>
<head>
<title>Rock, paper, scissors</title>
<?php include '../../head.inc';?>
<link type="text/css" href='../../styles/projects/rock_paper_scissors.css' rel="stylesheet"></link>
<script src="http://code.jquery.com/jquery-1.9.1.min.js"></script>
<script src="//ajax.googleapis.com/ajax/libs/jqueryui/1.9.1/jquery-ui.min.js"></script>
<script type="text/javascript" src="script.js"></script>
</head>
<body>
<?php include_once("../../header.inc");?>
<article>
<div id="preload" style="display:none;">
   <img src="img/kasi1.png" width="1" height="1" alt="" />
   <img src="img/kasi2.png" width="1" height="1" alt="" />
   <img src="img/kivi1.png" width="1" height="1" alt="" />
   <img src="img/kivi2.png" width="1" height="1" alt="" />
   <img src="img/paperi1.png" width="1" height="1" alt="" />
   <img src="img/paperi2.png" width="1" height="1" alt="" />
   <img src="img/sakset1.png" width="1" height="1" alt="" />
   <img src="img/sakset2.png" width="1" height="1" alt="" />
   <img src="img/kk.png" width="1" height="1" alt="" />
   <img src="img/kp.png" width="1" height="1" alt="" />
   <img src="img/ks.png" width="1" height="1" alt="" />
   <img src="img/pk.png" width="1" height="1" alt="" />
   <img src="img/ps.png" width="1" height="1" alt="" />
   <img src="img/sk.png" width="1" height="1" alt="" />
   <img src="img/sp.png" width="1" height="1" alt="" />   
</div>

<div id=sisalto>
<div id="ylaosa">
<div class="pelaajatiedot">
<img src="img/ihmispelaaja.png"/>
<p id="pelaajanimi">Player</p></div>

<div class="pistetaulu" id="pistetaulu1">0</div>
<div id="otsikko">Rock, paper, scissors</div>
<div class="pistetaulu" id="pistetaulu2">0</div>

<div class="tietokonetiedot"><img src="img/tietokonepelaaja.png"/>
<p id="tietokonenimi">Computer</p></div>

</div>

<hr>
<div id="alaosa">
<div id='img'><div id='img1'><img src='img/kasi1.png'/></div>
<div id='img2'><img src='img/kasi2.png'/></div>
<div id='img3'><img src='img/ps.png'/></div></div>
<div id="keskitys">
<div id="aloitusnaytto"><ol><li class="aloita">Start
       <li id="nimi">Username
       <li id="kierrokset">Winning conditions
       <li id="saannotpainike">Rules
       <li id="tilastotpainike">Statistics</ol>
</div>
<div id="tilastonaytto">

 <div id="kirjoitaNimi"><p>Write your name here</p><form name="nimiform"><input type="text" name="nimiteksti"/>
		</form><div id="nappi">Save</div></div>

<div id='kierrosmaara'>
	<p><strong>Points needed to win</strong></p>
	<div id=plus class="noselect">+</div>
	<div id=kierrosluku id="kierroslukumaara">3</div>
	<div id=minus class="noselect">-</div>
</div>


<div id='saannot'><p><strong>Rules:</strong><br>The players choose either rock, paper or scissors on every turn. Rock beats scissors, scissors beat paper and paper beats rock.<br><br>The winner of the round gets one point. If it's a tie, both players get 0.5 points.<br><br>You can change the required points to win in the "winning conditions" section.</p></div>
<div id='tilastot'><p>Play times: 0<br>Wins: 0<br>Ties: 0<br>Losses: 0</p></div>

</div>
       </div>
<div id=valintaruutu><p>Make your choice</p><ol id="valinta"><li id="kivi">Rock
 <li id="paperi">Paper
 <li id="sakset">Scissors</div>

<div id="kierrostulos"><p id="kierrostulosp"></p></div>
<div id="pelitulos"><p id="pelitulosp"></p>
<ol><li class="aloita">Play again
    <li id="palaaPaavalikkoon">Return to front page</div>


</div>
</div>
<div id='kuvaus'><h1>Description:</h1>
<p>In this game you fight against the computer in (more or less) traditional game of
rock, paper, scissors. Using the game settings you can choose how many rounds one game will take. The game will also keep track of your wins, losses and ties (as long as you don't leave the website).
<br><br>This game is made with Javascript/jQuery, originally in summer 2014. Code was revised in January 2016, when it was put to the website. All graphics in the game are made by me.
</div>
</article>
</body>
</html>
