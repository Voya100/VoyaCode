var pHealth =10;
var pMana =10;
var pMaxHealth=10;
var mMaxHealth;
var pMaxMana=10;
var mMaxMana;
var mHealth;
var mMana;
var pAttLvl=1;
var pMagLvl=1;
var pDefLvl=1;
var attXp=0;
var magXp=0;
var defXp=0;
var mAtt;
var mDef;
var mMag;
var loc = [2,7];
var username = "Adventurer";
var items=1;
var battleActive=false;
var active=false;
var yourTurn=false;
var enemyType=1;
var pDamage;
var mDamage;
var roundattxp=0;
var roundmagxp=0;
var rounddefxp=0;
var attacktype='melee';
var xpTable = [0,0,10,30,55,80,110,145,185,230,280,355,460,600,800,1050,1400,1800,2500,3500,9001];
var attLvlUp=" ";
var defLvlUp=" ";
var magLvlUp=" ";
var enemyChance =0;
var battlesStarted=0;
var monsterKills=0;
var giantRatKills=0;
var banditKills=0;
var skeletonKills=0;
var dragonKills=0;
var battleEscapes=0;
var battleDeaths=0;
var infoTextActive=false;
var monsterName='Monster';
var gameStarted=false;

$(document).ready(function(){
if(active===false){
$('#itemInfo').fadeOut(0);
$('#monsterbarstats').fadeOut(0);
$('#monsterstats').fadeOut(0);
$('#battleCommands').fadeOut(0);
$('#magicCommands').fadeOut(0);
$('#playerDrain').fadeOut(0);
$('#monsterDrain').fadeOut(0);
active=true;}

$( "#playerHealthBar" ).progressbar({
value: pHealth/pMaxHealth*100
});
$( "#playerManaBar" ).progressbar({
value: pMana/pMaxMana*100
});
$( "#monsterHealthBar" ).progressbar({
value: 100
});
$( "#monsterManaBar" ).progressbar({
value: 100
});

$([$('li'),$('#timeMachine'),$('#enoughSlaying'),$('#memoryRefresher')]).each(function(){
    this.hover(
    function(){
    $(this).addClass('active');
    },
    function(){
        $(this).removeClass('active');
    }
  );});
  
  var startBattle = function(){
      if(Math.random()<enemyChance){
          battle();
          enemyChance=0;
      }else{
          enemyChance+= 0.075;
      }
  };
  

 var infoScreenOff=  function(){
    $('#infoScreen').fadeOut(400, function(){
        $(this).css('width','400px');
        $(this).css('height','150px');
        $(this).css('top','65px');        
        $(this).css('left','190px');
        });
    infoTextActive=false;
    battleActive=false;
    };
  $('#infoScreen li').click(infoScreenOff);

var moveLeft = function(){
    $('#player').animate({left:'-=40px'}, 100);
    loc[0]-=1;
    startBattle();};
var moveRight = function(){
    $('#player').animate({left:'+=40px'}, 100);
    loc[0]+=1;
    startBattle();};
var moveUp = function(){
    $('#player').animate({top:'-=40px'}, 100);
    loc[1]+=1;
    startBattle();};
var moveDown = function(){
    $('#player').animate({top:'+=40px'}, 100);
    loc[1]-=1;
    startBattle();};

var obstacle = [11,12,13,14,15,16,17,18,19,21,28,29,31,36,37,38,39,41,49,51,59,61,69,71,74,75,76,79,81,84,85,86,89,91,94,95,96,99,101,104,105,106,109,111,114,115,116,119,121,124,125,126,127,128,129,131,134,135,136,137,138,139,141,149,150,151,159,161,163,164,165,166,167,168,169,171,173,179,181,183,185,186,189,191,195,196,199,201,202,203,204,205,206,207,208,209];
var stop =false;

var testObstacles = function(direction){

    for (var i=0; i<obstacle.length; i+=1){
        if(obstacle[i]===loc[0]*10+loc[1]||battleActive===true){i=obstacle.length;
            stop=true;
        }}
        if(stop===false){
        if(152===loc[0]*10+loc[1]){
            enemyType=2;
            $('#battlescreen').css('background','url(img/battlefield1.png)');
            $('#mountain').fadeOut(1200,function(){
                $(this).css('background','none');
                });
    }
    if(162===loc[0]*10+loc[1]){
        $('#battlescreen').css('background','url(img/battlefield2.png)');
            enemyType=3;
    }
    if(26===loc[0]*10+loc[1]){
        $('#battlescreen').css('background','url(img/battlefield1.png)');
            enemyType=1;
    }
    if(62===loc[0]*10+loc[1] && loc[0]*10+loc[1]===63){
            enemyType=1;
    }
    if(72===loc[0]*10+loc[1] || loc[0]*10+loc[1]===73){
            enemyType=2;
        }
    }

};

var inProgress =false;

var infoText= function(text){
    if(infoTextActive===false){
                $('#infoText').html(text);
                $('#infoScreen').fadeIn(800);
                function infoTextActiveTrue(){ infoTextActive=true;}
                setTimeout(infoTextActiveTrue,1100);
    }
};

$('#sword').hover(function(){
    if(items===1 || items===3){
    $('#itemInfo').html("A Wood sword<br> attack +2");}
    else{$('#itemInfo').html("A steel sword<br> attack +4");}
        $('#itemInfo').fadeIn(0);},function(){
    $('#itemInfo').fadeOut(0);});
    
    
$('#shield').hover(function(){
    $('#itemInfo').html("Anti-dragon shield<br>defence +3");
    $('#itemInfo').fadeIn(0);},function(){
    $('#itemInfo').fadeOut(0);});

$(document).keydown(function(key){
    if(inProgress===false){
        inProgress=true;
    switch(parseInt(key.which,10)){
        case 32:
            if(battleActive===false){
            if(loc[0]*10+loc[1]===118 && items!==2 && items!==4){
                infoText("You found a steel sword!");
                $('#sword').css("background",'url(img/metalsword.png)');
                $('#playerArm').css('background','url(img/metalswordarm.png)');
                if(items===1){
                    items=2;
                }else{items=4;}
            }
            if(loc[0]*10+loc[1]===158 && items!==3 && items!==4){
                $('#shield').fadeIn(0);
                $('#playerCharacter').css('background','url(img/character_shieldbody.png)');
                infoText("You found an anti-dragon shield!");
                if(items===1){
                    items=3;
                }else{items=4;}
            }
            if(loc[0]*10+loc[1]===27){
                infoText("You can't return home before you have killed the dragon. Coward!");}
             if(188===loc[0]*10+loc[1]){
            enemyType=4;
            battle();
    }
            if(infoTextActive){infoScreenOff();}
            }
            break;
        case 37:
        case 65:
            loc[0]-=1;
            testObstacles('left');
            loc[0]+=1;
            $('#player').css("background","url('img/player"+items+"_left.png')");
            if(stop===false){moveLeft();}
            stop=false;
            break;
        case 38:
        case 87:
            loc[1]+=1;
            testObstacles('up');
            if(stop===false){moveUp();}
            stop=false;
            loc[1]-=1;
            break;
        case 39:
        case 68:
            loc[0]+=1;
            testObstacles('right');
            loc[0]-=1;
            $('#player').css("background","url('img/player"+items+"_right.png')");
            if(stop===false){moveRight();}
            stop=false;
            break;
        case 40:
        case 83:
            loc[1]-=1;
            testObstacles('down');
            loc[1]+=1;
            if(stop===false){moveDown();}
            stop=false;
            break;
        case 49:
            if(yourTurn){
        $('#attack').addClass('active');
        setTimeout(function(){
        $('#attack').removeClass('active');},1000);}
            attack();
            break;
        case 53:
        if(yourTurn){
        $('#rest').addClass('active');
        setTimeout(function(){
        $('#rest').removeClass('active');
            },1000);}
            rest();
            break;
        case 54:
            if(yourTurn){
        $('#flee').addClass('active');
        setTimeout(function(){
        $('#flee').removeClass('active');
            },1000);}
            flee();
            break;
        case 50:
            if(yourTurn){
            $('#fire').addClass('active');
        setTimeout(function(){
        $('#fire').removeClass('active');
            },1000);}
            fire();
            break;
        case 52:
            if(yourTurn){
        $('#drain').addClass('active');
        setTimeout(function(){
        $('#drain').removeClass('active');
            },1000);}
            drain();
            break;
        case 51:
            if(yourTurn){
        $('#heal').addClass('active');
        setTimeout(function(){
        $('#heal').removeClass('active');
            },1000);}
            heal();
            break;
    }
    function setProgressFalse(){inProgress=false;}
    setTimeout(setProgressFalse, 140);
        }
    });
    
var playerDamage = function(){
    if(pHealth-mDamage<0){
        pHealth=0;
    }else{pHealth-=mDamage;}
    $('#playerhit').css('color','red');
    $('#playerhit').html("-"+mDamage);
    $('#playerhit').show('bounce',{times:3},300,function(){$(this).fadeOut(300,playerDeathTest());});
    rounddefxp+=mDamage*2;  
    $('#pHP').html(pHealth+"/"+pMaxHealth);
    $( "#playerHealthBar" ).progressbar({
value: pHealth/pMaxHealth*100
});
};
var playerHeal = function(){
    if(pHealth+pDamage > pMaxHealth){
        pHealth=pMaxHealth;
    }else{pHealth+=pDamage;
}
    $('#playerhit').css('color','green');
    $('#playerhit').html("+"+pDamage);
    $('#playerhit').fadeIn(900,function(){$(this).delay(500).fadeOut(600);});

    roundmagxp+=pDamage;   
    $('#pHP').html(pHealth+"/"+pMaxHealth);
    $( "#playerHealthBar" ).progressbar({
value: pHealth/pMaxHealth*100
});
};
var monsterDamage = function(){
    if(enemyType===4 && items !==2 && items!==4){
        pDamage=0;
    }
    if(mHealth-pDamage<0){
        mHealth=0;
    }else{mHealth-=pDamage;}
    if(attacktype==='magic'){roundmagxp+=pDamage;
    attacktype='melee';}
    else{roundattxp+=pDamage;}
    $('#monsterhit').css('color','red');
    $('#monsterhit').html("-"+pDamage);

    $('#monsterhit').show('bounce',{times:3},300,function(){$(this).fadeOut(300);});
    $('#mHP').html(mHealth+"/"+mMaxHealth);
    $( "#monsterHealthBar" ).progressbar({
value: mHealth/mMaxHealth*100

});
};
var monsterHeal = function(){
    if(mHealth+mDamage>mMaxHealth){
        mHealth=mMaxHealth;
    }else{mHealth+=mDamage;}
    $('#monsterhit').css('color','green');
    $('#monsterhit').html("-"+mDamage);
    $('#monsterhit').fadeIn(300,function(){$(this).fadeOut(300,function(){
        if(pHealth!==0){
        yourTurn=true;}});});
    $('#mHP').html(mHealth+"/"+mMaxHealth);
    $( "#monsterHealthBar" ).progressbar({
value: mHealth/mMaxHealth*100
});
};    
var playermiss = function(){
    $('#monsterhit').css('color','gray');
    $('#monsterhit').html("miss");
    $('#monsterhit').fadeIn(900,function(){$(this).delay(1100).fadeOut(600);});
};

var monstermiss = function(){
    $('#playerhit').css('color','gray');
    $('#playerhit').html("miss");
    $('#playerhit').fadeIn(300,function(){$(this).delay(600).fadeOut(300,playerDeathTest());});
};

var battleactioninfo = function(infotext,delayt){
        $('#battleactioninfo').html(infotext);
        $('#battleactioninfo').fadeIn(500,function(){
            $(this).delay(delayt).fadeOut(500);
            });
};

var escapeBattle = function(){
roundattxp=0;
roundmagxp=0;
rounddefxp=0;
    pHealth=pMaxHealth;
    pMana=pMaxMana;
    $('#pHP').html(pHealth+"/"+pMaxHealth);
    $( "#playerHealthBar" ).progressbar({
value: 100
});
    $('#pMP').html(pMana+"/"+pMaxMana);
    $( "#playerManaBar" ).progressbar({
value: 100
});
    $([$('#battlescreen'),$('#playerCharacter'),$('#battleCommands'),$('#magicCommands'),$('#monsterbarstats'),$('#monsterstats')
    ]).each(function(){
        this.fadeOut(500);
        });

$('#gamescreen').fadeTo(500, 0.3, function()
{
    $(this).css('background-image', 'url(img/map.png)');
}).delay(300).fadeTo('slow', 1);


    $([$("#player"),$("#mountain")]).each(function(){
        this.delay(500).fadeIn(0);

        });
        battleActive=false;
};
var playerDeathTest=function(){
if(pHealth===0){
    $('#playerCharacter').fadeOut(1500, function(){
        
        battleDeaths+=1;
        $('#gamescreen').css("background","black");
        $('#player').css("top","80px");
        $('#player').css("left","40px");
        loc = [2,7];
        $('#battlescreen').fadeOut(0);
        $('#infoScreen').css('height','200px');   
    infoText("You are too injured to keep fighting and fall into unconsciousness. Luckily a random  traveller managed to drag you back to safety. You wake up in your village fully recovered.");


setTimeout(escapeBattle,2500);});}else{
    setTimeout(function(){yourTurn=true;},500);}
};
var checkWinner = function(){
    yourTurn=false;
    if(mHealth>0){        
              if(mMana>=8 && enemyType>2 && Math.random()<0.25){
        mDamage = 2+ Math.ceil((Math.random()*0.6+0.5)*mMag*0.8);
        if(mDamage<0){mDamage=0;}
    $('#username').html(username);
        mMana-=8; 
        $('#mMP').html(mMana+"/"+mMaxMana);
        $( "#monsterManaBar" ).progressbar({
value: mMana/mMaxMana*100
});
        //animation
            $('#playerDrain').css('background', 'url(img/drain.png)');
            $('#playerDrain').fadeIn(1000,function(){
            $(this).delay(200).fadeOut(1500, function(){
                $('#playerDrain').css('background', 'url(img/heal.png)');
                });
            });
            $('#monsterDrain').css('background', 'url(img/heal.png)');
         $('#monsterDrain').fadeIn(1000,function(){
            $(this).delay(200).fadeOut(1500, function(){
                $('#monsterDrain').css('background', 'url(img/drain.png)');
                });
            });        
        setTimeout(monsterHeal,600);
        setTimeout(playerDamage,1000);}else{
        
        var playerDef=pDefLvl;
        if(items===3||items===4){
            playerDef=pDefLvl+3;
        }
        mDamage = Math.ceil((Math.random()+0.5)*(1+mAtt*0.6-0.3*playerDef));
        if(mDamage<0){mDamage=0;}
        
        var accuracyRandom =Math.random();

var accuracy =0.7+0.06*mAtt-0.04*playerDef;

var monsterhit= function(delayt){if(accuracy<accuracyRandom){setTimeout(monstermiss,delayt);}else{
setTimeout(playerDamage,delayt);}};
        //animation
        switch(enemyType){
            case 1:
          $('#monster').stop().animate({rotation: 30},
  {
    duration: 400,
    step: function(now, fx) {
      $(this).css({"transform": "rotate("+now+"deg)"});
    }
    
  });
        $('#monster').animate({left:'-=350px', top:'-=50px'}, 700, function(){
            monsterhit();
           $(this).animate({rotation: 0},
  {
    duration: 500,
    step: function(now, fx) {
      $(this).css({"transform": "rotate("+now+"deg)"});
    }
    
  });
            $(this).animate({top:'+=50px'},200,function(){
            $(this).animate({left:'+=350px'},800);});});
            break;
    case 2:
    case 3:
        $('#monsterArm').stop().animate(
  {rotation: 110},
  {
    duration: 500,
    step: function(now, fx) {
      $(this).css({"transform": "rotate("+now+"deg)"});
    }
    
  }
);
$('#monster').stop().animate({left:'-=350px'}, 1000);
$('#monsterArm').delay(400).animate(
  {rotation: -80},
  {
    duration: 200,
    step: function(now, fx) {
      $(this).css({"transform": "rotate("+now+"deg)"});
    }
    
  }
);
monsterhit(1200); //stuff
$('#monster').delay(1200).animate({left:'+=350px'}, 1000);
$('#monsterArm').delay(300).animate(
  {rotation: 0},
  {
    duration: 700,
    step: function(now, fx) {
      $(this).css({"transform": "rotate("+now+"deg)"});
    }    
  });
        break;
    case 4:
        $('#dragonMouth').stop().animate(
  {rotation: -25},
  {
    duration: 500,
    step: function(now, fx) {
      $(this).css({"transform": "rotate("+now+"deg)"});
    }

    
  });
  $('#dragonfire').stop().delay(100).fadeIn(500);
  $('#dragonfire').animate({left:'100px', top:'150px'},800, function(){
      $(this).fadeOut(200, function(){      
          $(this).css('left','600px');
      $(this).css('top','85px');});});
      
  $('#dragonMouth').delay(500).animate(
  {rotation: 0},
  {
    duration: 300,
    step: function(now, fx) {
      $(this).css({"transform": "rotate("+now+"deg)"});
    }

    
  });
  if(items===1 || items===2){mDamage=9001;}
        monsterhit(1500);
        break;
}}
    }else{
        $('#monster').effect('shake',600).fadeOut(800);

        attXp+=roundattxp;
        magXp+=roundmagxp;
        defXp+=rounddefxp;
        monsterKills+=1;
        switch(enemyType){
            case 1:
                giantRatKills+=1;
                break;
            case 2:
                banditKills+=1;
                break;
            case 3:
                skeletonKills+=1;
                break;
            case 4:
                dragonKills+=1;
                break;
        }
        while(attXp>=xpTable[pAttLvl+1]){
            pAttLvl++;
            attLvlUp="<span style='color:green'>+</span>";
        }
        while(defXp>=xpTable[pDefLvl+1]){
            pDefLvl++;
            defLvlUp="<span style='color:green'>+</span>";
        }
        while(magXp>=xpTable[pMagLvl+1]){
            pMagLvl++;
            magLvlUp="<span style='color:green'>+</span>";
        }


        $('#pAttLvl').html(pAttLvl+attLvlUp);
        $('#pMagLvl').html(pMagLvl+magLvlUp);
        $('#pDefLvl').html(pDefLvl+defLvlUp);
        $('#roundattxp').html(roundattxp);
        $('#roundmagxp').html(roundmagxp);
        $('#rounddefxp').html(rounddefxp);
        $('#attXp').html(attXp);
        $('#magXp').html(magXp);
        $('#defXp').html(defXp);
        $('#attxptolvlup').html(xpTable[pAttLvl+1]);
        $('#magxptolvlup').html(xpTable[pMagLvl+1]);
        $('#defxptolvlup').html(xpTable[pDefLvl+1]);
        $('#pAtt').html(pAttLvl);
        $('#pDef').html(pDefLvl);
        $('#pMag').html(pMagLvl);
        
        attLvlUp=0;
        magLvlUp=0;
        deflvlUp=0;

        pMaxHealth = 8+pDefLvl*2;
        pMaxMana = 8+pMagLvl*2;
        
        $('#xptable').delay(1000).fadeIn(800);
        
    }
    
    
    };
    
$('#xptablecontinue').click(function(){
    $('#xptable').fadeOut(500);
    escapeBattle();
    if(enemyType===4){
        $('#battlesStarted').html(battlesStarted);
        $('#monsterKills').html(monsterKills);
        $('#battleEscapes').html(battleEscapes);
        $('#battleDeaths').html(battleDeaths);
        $('#giantRatKills').html(giantRatKills);
        $('#banditKills').html(banditKills);
        $('#skeletonKills').html(skeletonKills);
        $('#dragonKills').html(dragonKills);
        
        $('#victory').fadeIn(300);
    }
    });

    var attack= function(){
    if(yourTurn===true){
        yourTurn=false;
        var swordbonus;
        if(items===2||items===4){swordbonus=4;}else{swordbonus=2;}
        pDamage = Math.ceil((Math.random()+0.5)*(2+pAttLvl+swordbonus)*0.5-0.5*mDef);
        if(pDamage<0){pDamage=0;}
        $('#playerArm').stop().animate(
  {rotation: -110},
  {
    duration: 500,
    step: function(now, fx) {
      $(this).css({"transform": "rotate("+now+"deg)"});
    }    
  }
);
$('#playerCharacter').stop().animate({left:'+=350px'}, 1000);
$('#playerArm').delay(400).animate(
  {rotation: 80},
  {
    duration: 200,
    step: function(now, fx) {
      $(this).css({"transform": "rotate("+now+"deg)"});
    }    
  }
);
var totalAtt = pAttLvl+swordbonus;

var accuracyRandom =Math.random();

var accuracy =0.7+0.05*totalAtt-0.05*mDef;

if(accuracy<accuracyRandom){playermiss();}else{
setTimeout(monsterDamage,1100);}
$('#playerCharacter').delay(1200).animate({left:'-=350px'}, 1000);
$('#playerArm').delay(300).animate(
  {rotation: 0},
  {
    duration: 700,
    step: function(now, fx) {
      $(this).css({"transform": "rotate("+now+"deg)"});
    }    
  });
     setTimeout(checkWinner,2200);
    }
    };
    
$('#attack').click(attack);


var fire=function(){
    if(yourTurn===true){yourTurn=false;
        if(pMana>=3){
        attacktype='magic';
        pDamage = Math.ceil(1+(Math.random()+1.4)*pMagLvl*0.6-0.2*mDef);
        if(pDamage<0){pDamage=0;}
        pMana-=3;
        $('#pMP').html(pMana+"/"+pMaxMana);
        $( "#playerManaBar" ).progressbar({
value: pMana/pMaxMana*100
});
        //animaatio
        $('#playerArm').stop().delay(300).animate(
  {rotation: -70},
  {
    duration: 700,
    step: function(now, fx) {
      $(this).css({"transform": "rotate("+now+"deg)"});
    }
  });        
    
      $('#fireball').stop().delay(300).fadeIn(500, function(){
          $('#playerArm').delay(100).animate(
  {rotation: 80},
  {
    duration: 300,
    step: function(now, fx) {
      $(this).css({"transform": "rotate("+now+"deg)"});
    }
  });
  $('#fireball').delay(200).animate({left:'600px', top:'200px'},1000, function(){
      $(this).fadeOut(200, function(){      
          $(this).css('left','100px');
      $(this).css('top','10px');});
      $('#playerArm').animate(
  {rotation: 0},
  {
    duration: 1500,
    step: function(now, fx) {
      $(this).css({"transform": "rotate("+now+"deg)"});
    }
  });
      setTimeout(monsterDamage,100);
        setTimeout(checkWinner,200);
      });
          });

}else{battleactioninfo("You don't have enough MP for this spell.",800);
yourTurn=true;}}};

$('#fire').click(fire);

var heal=function(){
    if(yourTurn===true){
        yourTurn=false;
        if(pMana>=5){
        attacktype='magic';
        pDamage = Math.ceil((Math.random()*2+3)*pMagLvl*0.75);
        if(pDamage<0){pDamage=0;}
        pMana-=5;
        $('#pMP').html(pMana+"/"+pMaxMana);
        $( "#playerManaBar" ).progressbar({
value: pMana/pMaxMana*100
});
        //animaatio
        
        $('#playerDrain').fadeIn(1000,function(){
            $(this).delay(200).fadeOut(1500);
            });
            
        setTimeout(playerHeal,600);
        setTimeout(checkWinner,2600);}else{battleactioninfo("You don't have enough MP for this spell.",800);
        yourTurn=true;}}};
        
$('#heal').click(heal);
        
var drain=function(){
    if(yourTurn===true){
        yourTurn=false;
        if(pMana>=8){
        attacktype='magic';
        pDamage = 2+ Math.ceil((Math.random()*0.6+0.5)*pMagLvl*0.75);
        if(pDamage<0){pDamage=0;}
        pMana-=8;
        $('#pMP').html(pMana+"/"+pMaxMana);
        $( "#playerManaBar" ).progressbar({
value: pMana/pMaxMana*100
});
        //animaatio
         $('#playerDrain').fadeIn(1000,function(){
            $(this).delay(200).fadeOut(1500);
            });
         $('#monsterDrain').fadeIn(1000,function(){
            $(this).delay(200).fadeOut(1500);
            });
        setTimeout(playerHeal,600);
        setTimeout(monsterDamage,1000);
        setTimeout(checkWinner,2600);

}else{battleactioninfo("You don't have enough MP for this spell.",800);
yourTurn=true;}}};
$('#drain').click(drain);
    
var rest=function(){
    if(yourTurn===true){
        yourTurn=false;
        pDamage = Math.ceil(pMaxMana/10);
        if(pDamage<0){pDamage=0;}
        if(pMana+pDamage>pMaxMana){pMana=pMaxMana;}
        else{pMana+=pDamage;}
        $('#playermanaheal').html("+"+pDamage);

        $('#pMP').html(pMana+"/"+pMaxMana);
        $( "#playerManaBar" ).progressbar({
value: pMana/pMaxMana*100
});
        pDamage = Math.ceil(pMaxHealth/10);
        setTimeout(playerHeal,0);
    $('#playermanaheal').fadeIn(900,function(){$(this).delay(500).fadeOut(600);});
        setTimeout(checkWinner,1200);
}};

$('#rest').click(rest);

var flee = function(){    
    if(yourTurn){
        yourTurn=false;
    if(Math.random()<0.75){
        if(enemyType===4){enemyType=3;}
        battleEscapes+=1;
    escapeBattle();}else{
    battleactioninfo("Fleeing failed.",800);
    setTimeout(checkWinner,800);
    }
    }};
    
    

$('#flee').click(flee);

$('#menubutton').click(function(){
    $('#menuscreen').fadeIn(1000);
    });

//If you have come this far, I assume that you are - more or less - interested in what this code contains. If you're an experienced programmer, you may have noticed that it's quite messy. This being only my second programming project (and mostly just a test), I didn't pay much attention to readability or efficiency. There are many things which I could have done with less code, but at the moment I don't think it's worth fixing. I will try to take that into account in my future projects.

var battle = function(){
    battleActive=true;
    $('#battleactioninfo').css('height','60px');
    battlesStarted+=1;

    
switch(enemyType){
    case 1:
        monsterName='Giant rat';
        mMaxMana=0;
        if(items===1){
        mMaxHealth=15;
        mAtt=1;
        mDef=1;
        }else{
        mMaxHealth=20;
        mAtt=Math.floor(Math.random()*3+1);
        mDef=Math.floor(Math.random()*3+1);}
        mMag=0;
        $('#monsterBody').css("background",'url(img/giant_rat.png)'); 
        $('#monsterArm').css('background','none');
        $('#dragonMouth').css('background','none');
    break;
    case 2:
        monsterName='Bandit';
        mMaxHealth=40;
        mMaxMana=0;
        mAtt=Math.floor(Math.random()*2+4);
        mDef=Math.floor(Math.random()*2+4);
        mMag=0;
        $('#monsterBody').css('background','url(img/bandit_body.png)');
        $('#monsterArm').css('background','url(img/bandit_arm.png)');
        $('#dragonMouth').css('background','none');
    break;
    case 3:
        monsterName='Skeleton';
        mMaxHealth=60;
        mMaxMana=16;
        mAtt=Math.floor(Math.random()*2+6);
        mDef=Math.floor(Math.random()*2+6);
        mMag=7;
        $('#monsterBody').css('background','url(img/skeleton_body.png)');
        $('#monsterArm').css('background','url(skeleton_arm.png)');
        $('#dragonMouth').css('background','none');
    break;
    case 4:
        monsterName='Dragon';
        mMaxHealth=100;
        mMaxMana=40;
        mAtt=10;
        mDef=10;
        mMag=10;
        $('#monsterBody').css('background','url(img/dragon_body.png)');
        $('#monsterArm').css('background','none');
        $('#dragonMouth').css('background','url(img/dragon_mouth.png)');
    break;
}


mHealth=mMaxHealth;
mMana=mMaxMana;
$('#mHP').html(mHealth+"/"+mMaxHealth);
$('#mMP').html(mMana+"/"+mMaxMana);
$('#mAtt').html(mAtt);
$('#mDef').html(mDef);
$('#mMag').html(mMag);
        $( "#monsterManaBar" ).progressbar({
value: 100
});
        $( "#monsterHealthBar" ).progressbar({
value: 100
});
$('#monstername').html('<p>'+monsterName+'<p>');
$([$('#monsterbarstats'),$('#monsterstats'),$('#monstername'),$('#battleCommands'),$('#magicCommands')]).each(function(){
    this.fadeIn(1000);});
$('#monsterbarstats').css('display','inline-block');
$('#monsterstats').css('display','inline-block');
$('#battlescreen').show('scale',1500, function(){
    $('#gamescreen').css("background","darkgoldenrod");
    $([$("#player"),$("#mountain")]).each(function(){
        this.fadeOut(0);
        });    
    });
    $([$('#battlescreen'),$('#playerCharacter'),$('#monster')
    ]).each(function(){
        this.fadeIn(2500);
        setTimeout(function(){yourTurn=true;},2550);
        });
//player, background, commands and enemy fadeIn

};

var restart = function(){
    //menu, victory fadeout
    //story beginning screen fadein
    gameStarted=true;
    $('#player').css("top","80px");
    $('#player').css("left","40px");
    loc = [2,7];
    enemyType=1;
    pHealth =10;
    pMana =10;
    pMaxHealth=10;
    pMaxMana=10;
    pAttLvl=1;
    pMagLvl=1;
    pDefLvl=1;
    attXp=0;
    magXp=0;
    defXp=0;
    items=1;
    $('#pAtt').html(pAttLvl);
    $('#pDef').html(pDefLvl);
    $('#pMag').html(pMagLvl);
    $('#shield').fadeOut(0);
        $('#infoScreen').css('width','778px');
        $('#infoScreen').css('height','353px');
        $('#infoScreen').css('top','0px');        
        $('#infoScreen').css('left','0px');
    infoText("Your family has been going through hard times. After your father died, your family lost its only source of income. Now you are in debt and there aren't any jobs available. Your sister will soon die of hunger if a solution can't be found.<br><br>You remember a legend of a dragon living in the mountains guarding a huge treasure. With that you could easily buy food for your family.<br><br>However, to have any chance against a dragon you will need to find a sharper sword and a shield to protect you from dragonfire. With this in mind, you begin your journey.");
    $('#playerCharacter').css('background','url(img/character_body.png)');
    $('#sword').css("background",'url(img/woodsword.png)');
                $('#playerArm').css('background','url(img/woodswordarm.png)');
    $('#mountain').fadeIn(0,function(){
                $(this).css('background','url(img/mountain.png)');
    escapeBattle();
                });
};

$('#enoughSlaying').click(function(){    
    $('#victoryscreen').html('<h1>Thank you for playing!</h1>');
    $('#victoryscreen > h1').css('margin-top','150px');
    $('#victoryscreen > h1').css('font-size','40px');
    });

$('#timeMachine').click(function(){
    $('#player').css("top","80px");
    $('#player').css("left","40px");
    loc = [2,7];
    $('#victory').fadeOut(500);
    escapeBattle();
    });
    
$('#memoryRefresher').click(function(){
    $('#victory').fadeOut(500);
    restart();
    });

var insertHowToPlay =function(text){
    $('#howtoplaytext').html(text);
};
console.log("Test");
$('#basics').click(function(){
	console.log("Test2");
    $('#name').fadeOut(0);
    insertHowToPlay("The object of the game is to slay the dragon. To do that you will first need to travel through the map to find a metal sword and a shield.<br><br>You will also need to train your skills if you want to have a chance against the dragon. Skills can be trained by fighting enemies who appear randomly as you travel. The further you travel, the harder the enemies will become.<br><br>You level up skills by gaining experience (xp) from battles. You get xp at the end of the fight, but only if you don't flee or fall into unconsciousness.");});
$('#controls').click(function(){
    $('#name').fadeOut(0);
    insertHowToPlay("<table style='font-size:25px'><tbody><tr><td>Movement:</td><td> WASD or arrow keys</td></tr><tr><td>Actions:</td><td> Space</td></tr><tr><td>Battle commands:</td><td>1-6 or mouse</td></tr> </tbody></table>");});
$('#skills').click(function(){
    $('#name').fadeOut(0);
    insertHowToPlay("<strong>Attack</strong><br>Attack skill increases accuracy and damage of your normal attacks. You gain attack XP by dealing damage with normal attacks.<br><br><strong>Magic</strong><br>Magic skill increases damage of magic commands and maximum mana points (MP). All magic abilities need MP to use, but they can't miss and have varying effects. You gain magic xp by using magic abilities.<br><br><strong>Defence</strong><br>Defence skill increases your maximum health (HP) and decreases enemy's accuracy and damage. You gain defence xp by taking damage.");});
$('#battleCommandsguide').click(function(){
        $('#name').fadeOut(0);
        insertHowToPlay("<strong>1. Attack</strong><br>Basic attack. Has a chance to miss.<br><strong>2. Fire</strong><br>Magic command, deals high damage. Costs 3 MP.<br><strong>3. Heal</strong><br>Magic command, restores health. Costs 5 MP.<br><strong>4. Drain</strong><br>Magic command, drains health from the enemy.<br> Costs 8 MP.<br><strong>5. Rest</strong><br>Restores a small amount of health and mana points.<br><strong>6. Flee</strong><br>Escape from battle. Has a chance to fail. If succesful, no xp is given from the fight.");});
$('#credits').click(function(){
    $('#name').fadeOut(0);
    insertHowToPlay("<table style='font-size:22px'><tr><td>Programming:</td><td>Voya</td></tr><tr><td>Artwork:</td><td>Voya</td>");});

$('#continue').click(function(){
    if(gameStarted){
        $('#menuscreen').fadeOut(500);
    }else{
    insertHowToPlay("You haven't started the game yet.");
    $('#name').fadeOut(0);}
    });
$('#newGame').click(function(){
    $('#menuscreen').delay(50).fadeOut(600);
    restart();
});
$('#usernameEnter').click(function(){
    insertHowToPlay("");
    $('#name').fadeIn(0);
    });
$('#namebutton').click(function(){
        username = $('input[name=nametext]').val();
        $('#username').html(username);
});
});
