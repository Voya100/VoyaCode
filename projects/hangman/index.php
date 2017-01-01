<!DOCTYPE html>
<html>
<head>
  <title>Hangman</title>
  <?php include '../../head.inc';?>
  <link type="text/css" href='../../styles/projects/projects.css' rel="stylesheet"></link>
  <script type="text/javascript" src="script.js"></script>
  <style>
    .game_images img{
      width: 24%;
    }
    .google_badge img{
      width: 240px;
    }
    .bordered_box{
      text-align: left;
    }
  </style>
</head>
<body>
<?php include_once("../../header.inc");?>
<article>
  <h1 style="text-align:center;">Hangman</h1>
  <div class='game_images'>
    <img src='img/hangman1.png'>
    <img src='img/hangman2.png'>
    <img src='img/statistics.png'>
    <img src='img/settings.png'>
  </div>
  <a class='google_badge' href='https://play.google.com/store/apps/details?id=com.voyacode.hangman&pcampaignid=MKT-Other-global-all-co-prtnr-py-PartBadge-Mar2515-1'>
    <img alt='Get it on Google Play' src='img/google-play-badge.png'/>
  </a>
  <div class='bordered_box'><h1>Description:</h1>
  <p>
    Hangman is a simple game where you need to guess characters in order to guess a word before the stick figure is hung. The app is available on Google Play for free. More info on the project can be found on <a href='https://github.com/Voya100/Hangman'>Github</a>.
    <br><br>
    Full list of features:
    <br>- Support for several languages
    <br>- 4000+ English words in online mode, 500 words in offline mode
    <br>- 400 Finnish words
    <br>- 250 Swedish words
    <br>- Statistics showing games, wins and losses
    <br>- Settings with options to change app language, dictionary, difficulty and online setting
    <br>- Story that finally explains why you would want to guess words while someone is being hanged
    <br>- Scaling interface
    <br>- Navigation with icons, swiping left/right and back button 
  </p>
  </div>
</article>
</body>
</html>
