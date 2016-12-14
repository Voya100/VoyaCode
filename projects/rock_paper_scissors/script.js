$(document).ready(function(){
var pelaajaP=0
var tietokoneP=0
var kierrosmaara=3
var pelaajanimi="Player"
var pelikerrat=0
var voitot = 0
var tasapelit = 0
var tappiot =0
var pelaajaVoittaa
var pelaajaValinta
var skenaario
var tietokonearvonta = function(){
    var arvonta = Math.random();
    if (arvonta < 0.34) {
	return "kivi";
} else if(arvonta <= 0.67) {
	return "paperi";
} else {
	return "sakset";
}}
var tietokoneValinta

var voittajaTarkistus = function(){
    if(pelaajaP>=kierrosmaara || tietokoneP>=kierrosmaara){
    if(pelaajaP===kierrosmaara && tietokoneP===kierrosmaara){
    $('#pelitulosp').html("It's a tie!");
    pelikerrat +=1;
    tasapelit +=1;
    }
    else if(pelaajaP>=kierrosmaara){
    $('#pelitulosp').html(pelaajanimi+' wins!');
    pelikerrat +=1;
    voitot +=1;}
    else if(tietokoneP>=kierrosmaara){
    $('#pelitulosp').html('Computer wins.');
    pelikerrat +=1;
    tappiot +=1;}
    
    $('#pelitulos').fadeIn('slow');
    }
    else{
        $('#valintaruutu').fadeIn('slow');
};}


var taistelu = function(){
    tietokoneValinta = tietokonearvonta();
    skenaario=pelaajaValinta.substring(0,1)+tietokoneValinta.substring(0,1);
    //animaatiot
        $('#img1').html("<img src='img/kasi1.png'/>")
        $('#img2').html("<img src='img/kasi2.png'/>")
        $('#img3').html("<img src='img/"+skenaario+".png'/>")
        $('#img1').fadeIn(5,function(){
            $(this).effect('bounce', {times:3}, 2000, function(){
                $(this).fadeOut(0);
                })
            
        $('#img2').fadeIn(5,function(){
            $(this).effect('bounce', {times:3}, 2000, function(){
                $(this).fadeOut(0, function(){
                    

    switch(pelaajaValinta.substring(0,1)){
        case 'k':
        $('#img1').html("<img src='img/kivi1.png'/>");
        break;
        case 'p':
        $('#img1').html("<img src='img/paperi1.png'/>");
        break;
        case 's':
        $('#img1').html("<img src='img/sakset1.png'/>");
        break;
        }; 
    switch(tietokoneValinta.substring(0,1)){
        case 'k':
        $('#img2').html("<img src='img/kivi2.png'/>");
        break;
        case 'p':
        $('#img2').html("<img src='img/paperi2.png'/>");
        break;
        case 's':
        $('#img2').html("<img src='img/sakset2.png'/>");
        break;
        }; 
$('#img1').fadeIn('slow', function(){
        $(this).delay(800).fadeOut('slow')
        })
$('#img2').fadeIn('slow', function(){
        $(this).delay(800).fadeOut('slow')
        })})
    
    switch(skenaario){
    case 'kk':
    case 'pp':
    case 'ss':
     $('#kierrostulosp').html("It's a tie, both players get 0.5 points.");
     pelaajaP += 0.5;
     tietokoneP += 0.5;
     break;
    case 'kp':
    $('#kierrostulosp').html("Paper beats rock, computer gets a point.");
     tietokoneP += 1;
    break;
    case 'ks':
    $('#kierrostulosp').html("Rock beats scissors, "+pelaajanimi+" gets a point.");
     pelaajaP += 1;
     break;
    case 'pk':
    $('#kierrostulosp').html("Paper beats rock, "+pelaajanimi+" gets a point.");
     pelaajaP += 1;
     break;
    case 'ps':
        $('#kierrostulosp').html("Scissors beat paper, computer gets a point.");
     tietokoneP += 1;
     break;
    case 'sk':
        $('#kierrostulosp').html("Rock beats scissors, computer gets a point.");
     tietokoneP += 1;
     break;
    case 'sp':
        $('#kierrostulosp').html("Scissors beat paper, "+pelaajanimi+" gets a point.");
     pelaajaP += 1;
     break;
    default: 
    $('#pelaajanimi').html("error");
    };                    });
                })
            });

    
    $('#kierrostulos').delay(4200).fadeIn('slow', function(){
        $('#img3').fadeIn('slow');
        $('#pistetaulu1').html(pelaajaP);
        $('#pistetaulu2').html(tietokoneP);
        $('#kierrostulos').delay(2000).fadeOut('slow', function(){$('#img3').fadeOut(5);
            voittajaTarkistus();})});
    
    };   


$('#aloitusnaytto ol').selectable();
     
    $('#nimi').click(function(){
        $('#kierrosmaara').fadeOut(0);
        $('#saannot').fadeOut(0);
        $('#kirjoitaNimi').fadeIn('fast');
        $('#tilastot').fadeOut(0);})
    $('#kierrokset').click(function(){
        $('#kirjoitaNimi').fadeOut(0);
        $('#saannot').fadeOut(0);
        $('#tilastot').fadeOut(0);
        $('#kierrosmaara').fadeIn('fast');})
    $('#saannotpainike').click(function(){
        $('#kirjoitaNimi').fadeOut(5);
        $('#kierrosmaara').fadeOut(5);
        $('#saannot').fadeIn('fast');
        $('#tilastot').fadeOut(0);})
    $('#tilastotpainike').click(function(){
        $('#tilastot').html("<p>Play times: "+pelikerrat+"<br>Victories: "+voitot+"<br>Ties: "+tasapelit+"<br>Losses: "+tappiot+"</p>");
        $('#kirjoitaNimi').fadeOut(0);
        $('#kierrosmaara').fadeOut(0);
        $('#saannot').fadeOut(0);
        $('#tilastot').fadeIn('fast');})
    $('#nimi').click(function(){
        $('#kirjoitaNimi').fadeIn('fast');
        $('#kierrosmaara').fadeOut('fast');
        $('#saannot').fadeOut('fast');
        $('#tilastot').fadeOut('fast');})
    $('#palaaPaavalikkoon').click(function(){
        $('#pelitulos').fadeOut('fast', function(){
        $('#keskitys').fadeIn('slow');})
     })
        
  
    
    $('#nappi').click(function(){
        pelaajanimi = $('input[name=nimiteksti]').val();
        $('#pelaajanimi').html(pelaajanimi);
        })
    $('#plus').click(function(){
        if(kierrosmaara>0 && kierrosmaara < 99){kierrosmaara +=1};
        $('#kierrosluku').html(kierrosmaara);
        });
    $('#minus').click(function(){
        if(kierrosmaara>1){kierrosmaara -=1};
        $('#kierrosluku').html(kierrosmaara);
        });
 
   
    $('.aloita').click(function(){
        pelaajaP=0;
        tietokoneP=0;
        $('#pistetaulu1').html(pelaajaP);
        $('#pistetaulu2').html(tietokoneP);
        $('#kirjoitaNimi').fadeOut('fast');
        $('#kierrosmaara').fadeOut('fast');
        $('#saannot').fadeOut('fast');
        $('#tilastot').fadeOut('fast');
        $('#pelitulos').fadeOut(2);
        $('#keskitys').fadeOut('slow', function(){$('#valintaruutu').fadeIn('slow');})
    });

    $('#kivi').click(function(){
        pelaajaValinta = "kivi";
        $('#valintaruutu').fadeOut(1, function(){taistelu()});
        });
   $('#paperi').click(function(){
        pelaajaValinta = "paperi";
        $('#valintaruutu').fadeOut(1, function(){taistelu()});
        });
    $('#sakset').click(function(){
        pelaajaValinta = "sakset";
        $('#valintaruutu').fadeOut(1, function(){taistelu()});
        });}
);