<!DOCTYPE html>
<html dir="ltr" lang="en">
<head>
	<title>Slay the Dragon!</title>
	<?php include '../../head.inc';?>
	<link type="text/css" href='../../styles/projects/slay_the_dragon.css' rel="stylesheet"></link>
	<script src="//code.jquery.com/jquery-1.10.2.js"></script>
	<script src="//code.jquery.com/ui/1.11.0/jquery-ui.js"></script>
	<link rel="stylesheet" href="//code.jquery.com/ui/1.11.0/themes/smoothness/jquery-ui.css">
	<script src="http://code.jquery.com/jquery-1.9.1.min.js"></script>
	<script src="//ajax.googleapis.com/ajax/libs/jqueryui/1.9.1/jquery-ui.min.js"></script>
	<script type="text/javascript" src="slay_the_dragon.js"></script>
</head>
<body>
    <?php include_once("../../header.inc");?>
    <article>
    <h1 style="text-align:center;">Slay the Dragon!</h1>
	<div id='game'>

		<div id="preload" style="display: none;">
			<img src="img/woodswordarm.png" width="1" height="1" alt="" /> <img
				src="img/woodsword.png" width="1" height="1" alt="" /> <img
				src="img/map.png" width="1" height="1" alt="" /> <img
				src="img/player1_left.png" width="1" height="1" alt="" /> <img
				src="img/player1_right.png" width="1" height="1" alt="" /> <img
				src="img/player2_left.png" width="1" height="1" alt="" /> <img
				src="img/player2_right.png" width="1" height="1" alt="" /> <img
				src="img/player3_left.png" width="1" height="1" alt="" /> <img
				src="img/player3_right.png" width="1" height="1" alt="" /> <img
				src="img/player4_left.png" width="1" height="1" alt="" /> <img
				src="img/player4_right.png" width="1" height="1" alt="" /> <img
				src="img/shield.png" width="1" height="1" alt="" /> <img
				src="img/mountain.png" width="1" height="1" alt="" /> <img
				src="img/battlefield1.png" width="1" height="1" alt="" /> <img
				src="img/character_body.png" width="1" height="1" alt="" /> <img
				src="img/character_shieldbody.png" width="1" height="1" alt="" /> <img
				src="img/metalsword.png" width="1" height="1" alt="" /> <img
				src="img/metalswordarm.png" width="1" height="1" alt="" /> <img
				src="img/giant_rat.png" width="1" height="1" alt="" /> <img
				src="img/fireball.png" width="1" height="1" alt="" /> <img
				src="img/bandit_body.png" width="1" height="1" alt="" /> <img
				src="img/bandit_arm.png" width="1" height="1" alt="" /> <img
				src="img/battlefield2.png" width="1" height="1" alt="" /> <img
				src="img/skeleton_body.png" width="1" height="1" alt="" /> <img
				src="img/heal.png" width="1" height="1" alt="" /> <img
				src="img/heal.png" width="1" height="1" alt="" /> <img
				src="img/drain.png" width="1" height="1" alt="" /> <img
				src="img/dragon_body.png" width="1" height="1" alt="" /> <img
				src="img/dragon_mouth.png" width="1" height="1" alt="" />
		</div>
		<audio id="sword_sound" type="audio/wav" src="sound/sword.wav" preload="auto"></audio>
       <audio id="chest_sound" type="audio/wav" src="sound/chest.wav" preload="auto"></audio>
		<audio id="wood_blade_sound" type="audio/wav" src="sound/wood_blade.wav" preload="auto"></audio>
		<audio id="rat_hit_sound" type="audio/wav" src="sound/rat_hit.wav" preload="auto"></audio>
		<audio id="dragon_roar_sound" type="audio/wav" src="sound/dragon_roar.wav" preload="auto"></audio>
		<audio id="drain_sound" type="audio/wav" src="sound/drain.wav" preload="auto"></audio>
		<audio id="fireball_sound" type="audio/wav" src="sound/fireball.wav" preload="auto"></audio>
		<audio id="heal_sound" type="audio/wav" src="sound/heal.wav" preload="auto"></audio>
		
		<div id=menuscreen>
			<h1 style="text-align: center">Slay the Dragon!</h1>
			<hr>
			<div id=menuoptions>
				<ol>
					<li id=newGame>New Game</li>
					<li id=continue>Continue</li>
					<li id=usernameEnter>Username</li>
					<li id=credits>Credits</li>
					<strong style="margin-left: 50px;">How to Play</strong>
					<li id=basics>Basics</li>
					<li id=controls>Controls</li>
					<li id=skills>Skills</li>
					<li id=battleCommandsguide>Battle Commands
				
				</ol>
			</div>
			<div id=howtoplaytext></div>
			<div id=name>
				<strong>Write your name here:</strong><br>
				<br>
				<form name="nameform">
					<input type="text" name="nametext"
						style="height: 30px; width: 200px;" /><span id="saveMessage" style="margin-left:25px; display:none;">Name saved</span>
				</form>
				<ol>
					<li id="namebutton" style="margin-left: -45px;">Submit</li>
				</ol>
			</div>
		</div>
		
		<div id='maingame'>

		<div id='top'>
			<div id='playername'>
				<p id=username>Adventurer</p>
			</div>
			<div id='playerbarstats'>
					HP <span id=pHP>10/10</span>
				
				
				<div class="playerBar" id="playerHealthBar"></div>
				MP <span id=pMP>10/10</span>
				<div class="playerBar" id="playerManaBar"></div>
			</div>
			<div id='playerstats'>
				<table>
					<tbody>
						<tr>
							<td id>Attack</td>
							<td id=pAtt>1</td>
						</tr>
						<tr>
							<td>Magic</td>
							<td id=pMag>1</td>
						</tr>
						<tr>
							<td>Defence</td>
							<td id=pDef>1</td>
						</tr>
					</tbody>
				</table>

			</div>

			<div id='monsterstats'>
				<table>
					<tbody>
						<tr>
							<td id>Attack</td>
							<td id=mAtt>1</td>
						</tr>
						<tr>
							<td>Magic</td>
							<td id=mMag>1</td>
						</tr>
						<tr>
							<td>Defence</td>
							<td id=mDef>1</td>
						</tr>
					</tbody>
				</table>
			</div>
			<div id='monsterbarstats'>
					HP <span id=mHP>10/10</span>
				
				
				<div class="playerBar" id="monsterHealthBar"></div>
				MP <span id=mMP>10/10</span>
				<div class="playerBar" id="monsterManaBar"></div>
			</div>

			<div id='monstername'>
				<p>Monster</p>
			</div>
		</div>

		<div id='gamescreen'>
			
			<div id=mountain></div>
			<div id=player></div>

			<div id=battlescreen>
				<div id=playerCharacter>
					<div id=playerArm></div>
					<div id=playerDrain class=drain></div>
				</div>
				<div id=fireball></div>
				<div id=dragonfire></div>
				<div id=monster>
					<div id=monsterDrain class=drain></div>
					<div id=monsterBody></div>
					<div id=monsterArm></div>
					<div id=dragonMouth></div>
				</div>
				<div id=playerhit></div>
				<div id=playermanaheal></div>
				<div id=monsterhit></div>

			</div>
		</div>
		<div id='bottom'>
			<div id='battleCommands'>
				<div>
					<li id=attack>1. Attack
					
					<li id=heal>3. Heal 5MP
					
					<li id=rest>5. Rest
				
				</div>

				<div id=magicCommands>
					<li id=fire>2. Fire 3MP
					
					<li id=drain>4. Drain 8MP
					
					<li id=flee>6. Flee
				
				</div>
			</div>
			<div id=items>
				Items:<br>
				<div id=sword></div>
				<img id=shield
					src="img/shield.png" />
			</div>
			<div id=itemInfo></div>
			<div id=other>
				<li id=menubutton>Menu
				<li id=mute>Mute sounds			
			</div>
		</div>
		</div>
		<div id=infoScreen>
				<p id=infoText></p>
				<li>Continue</li>
			</div>
		<div id=xptable>
			<h1 style="color: ivory; margin-top: 12px;">Battle Results</h1>
			<p id=xptablecontinue>Continue</p>
			<table>
				<thead>
					<tr>
						<td></td>
						<td>Xp gained</td>
						<td>Total xp</td>
						<td>Xp to next lvl</td>
						<td>Level</td>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td>Attack</td>
						<td id=roundattxp></td>
						<td id=attXp></td>
						<td id=attxptolvlup></td>
						<td id=pAttLvl></td>
					</tr>
					<tr>
						<td>Magic</td>
						<td id=roundmagxp></td>
						<td id=magXp></td>
						<td id=magxptolvlup></td>
						<td id=pMagLvl></td>
					</tr>
					<tr>
						<td>Defence</td>
						<td id=rounddefxp></td>
						<td id=defXp></td>
						<td id=defxptolvlup></td>
						<td id=pDefLvl></td>
					</tr>
			
			</table>
		</div>
		<div id='victory'>
			<div id='victoryscreen'>
				<h1>You have slain the dragon!</h1>
				<p>
					You managed to steal all the gold the dragon had in her cave. By
					slaughtering this innocent creature, who has never done harm to
					anyone, you now have enough money to get yourself and your family a
					big house with many swimming pools. I hope you are proud of your
					accomplishments.<br>
					<br>With all the money you have left, you can afford either a time
					machine or a memory refresher. With a time machine you can return
					to the past with your current skills and murder the dragon again.
					Memory refresher can be used to relive the events of your first
					dragon kill.<br>
					<br> Which one will you choose?
				</p>
				<div id='timeMachine'>
					A Time Machine<br>(Play again with all your skills and items)
				</div>
				<div id='enoughSlaying'>
					Enough dragon slaying for one day!<br>
					<br>
				</div>
				<div id='memoryRefresher'>
					A Memory Refresher<br>(Play again from the beginning)
				</div>
			</div>
			<div id='victorystatistics'>
				<h1 style="font-size: 25px">Statistics</h1>
				<table>
					<tr>
						<td>Battles started:</td>
						<td id='battlesStarted'>0</td>
					</tr>
					<tr>
						<td>Creatures brutally murdered:</td>
						<td id='monsterKills'>0</td>
					</tr>
					<tr>
						<td>Fights cowardly fled:</td>
						<td id='battleEscapes'>0</td>
					</tr>
					<tr>
						<td>Times saved by a stranger:</td>
						<td id='battleDeaths'>0</td>
					</tr>
				</table>
				<table>
					<tr>
						<td>Pet rats killed:</td>
						<td id='giantRatKills'>0</td>
					</tr>
					<tr>
						<td>Bandit fathers murdered:</td>
						<td id='banditKills'>0</td>
					</tr>
					<tr>
						<td>Necromancer victims crushed:</td>
						<td id='skeletonKills'>0</td>
					</tr>
					<tr>
						<td>Dragons slain:</td>
						<td id='dragonKills'>0</td>
				
				</table>
			</div>
		</div>

		<div id='battleactioninfo'></div>
		
	</div>
	<div id='description'><h1>Description:</h1>
<p>In this game you have one objective: Slay the Dragon! In order to do that you will need to obtain the dragon slaying equipment,
level up your skills and defeat all enemies that stand in your way. Game instructions are in the game.
<br><br>Made with Javascript/jQuery in summer 2014. Sound effects added and bug fixes made in January 2016.
<br><br>Note: Sound effects don't work in Internet explorer.
<br><br>Update (13.1.2016): Mute button added</p></div>
</article>
	<?php include '../../footer.inc';?>
	</body>

</html>