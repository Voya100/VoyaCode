var $textarea = null; 
var range;
$(document).ready(function(){
	$textarea = $('#message')[0];	
});
function setCaretPosition(caretPos) {
    var elem = $textarea;
    if(elem != null) {
        if(elem.createTextRange) {
            var range = elem.createTextRange();
            range.move('character', caretPos);
            range.select();
        }
        else {
            if(elem.selectionStart) {
                elem.focus();
                elem.setSelectionRange(caretPos, caretPos);
            }
            else
                elem.focus();
        }
    }
}
function add_tag(startTag,endTag){
	if($textarea != null){
	var beginning = $textarea.selectionStart;
	var ending = $textarea.selectionEnd;
	var text = $textarea.value;
	if(beginning != null){
		var start = text.substring(0,beginning);
		var middle;
		if(beginning != ending){
			middle = text.substring(beginning, ending)
		} else{
			middle="";
		}
		var end = text.substring(ending);
		$textarea.value = start + startTag + middle + endTag + end;
		//$textarea.focus();
		setCaretPosition(start.length + startTag.length);
	} else {
		alert("Error");
	}
  }
}

function tag(tag){
	switch(tag){
	case "b":
	case "i":
	case "u":
		add_tag("[" + tag + "]","[/" + tag + "]")
		break;
	case "url":
	case "color":
		add_tag("[" + tag + "=]","[/" + tag + "]");
	}
}

function nameCheck(){
	var name = $('#name')[0].value;
	name = name.toLowerCase();
	if((name == "voya" && admin == false) || name == "admin"){
		$('#name').css({ "background-color": "#F56A6A"});
		$('#name_error').html("Name not allowed.");
		return false;
	}else if(name.length < 4){
		$('#name').css({ "background-color": "#F56A6A"});
		$('#name_error').html("Name too short.");
		return false;
	}else if(name.indexOf('<') !== -1 || name.indexOf('>') !== -1){
		$('#name').css({ "background-color": "#F56A6A"});
		$('#name_error').html("Your name can't include symbols \"<\" or \">\".");
		return false;
	}else{
		$('#name').css({ "background-color": "white"});
		$('#name_error').html("");
		return true;
	}
}

function messageTest(id){
	if(typeof id === "undefined" && nameCheck() == false){
		return false;
	}
	if(typeof id == "undefined"){
		$area = $textarea;
	}else{
		$area = $('#editarea' + id)[0];
	}
	if($area.value.length < 5){
		$('#message_error').html("Comment is too short!");
		return false;
	}else{
		return true;
	}	
}

$(document).ready(function(){
	$("#name").keyup(nameCheck);
});