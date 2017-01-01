// Note to self: should implement slider with Angular and save projects to JSON file.

$(document).ready(function(){
	var count = 5;
	var i = count;
	var changed = false;
	
	function change(direction){
		$('#project' + i + ' div').fadeOut(500);
		i += direction;
		i = i < 0 ? count -1 : i % count;
		if(i < 0){i = count - 1}else{i = i % count}
	    $('#project' + i + ' div').fadeIn(1200);
	}
	
	function auto_slide(){
		if(changed == false){
			change(-1);
			setTimeout(auto_slide,8000);
		}else{
			//If the user changes slide manually, slider won't change immediately
			changed = false;
			setTimeout(auto_slide,15000);
		}
	}
	auto_slide();
	$('#left').click(function(){changed=true;change(1);});
	$('#right').click(function(){changed=true;change(-1);});
});