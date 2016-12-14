var textHolder = [];

function edit(id){
	var e = $('#comment' + id + " .message");
	var text = e.html();
	
	if(text.substr(0,5) !== "<form"){
		textHolder[id] = text;
		//Tag changes
		console.log(text);
		text = text.replace(/<br>/g,"");
		//text = text.replace("/<br\s*[\/]?>/gi","\n");
		console.log(text);
		text = text.replace(/<b>/g,"[b]");
		text = text.replace(/<\/b>/g,"[/b]");
		text = text.replace(/<i>/g,"[i]");
		text = text.replace(/<\/i>/g,"[/i]");
		text = text.replace(/<u>/g,"[u]");
		text = text.replace(/<\/u>/g,"[/u]");
		text = text.replace(/<a href="/g,'[url=')
		text = text.replace(/" target="_blank">/g,']')
		text = text.replace(/<\/a>/g,"[/url]")
		text = text.replace(/<span style="color:/g,'[color=')
		text = text.replace(/">/g,']')
		text = text.replace(/<\/span>/g,"[/color]")
		
		e.html("<form method='post' action='http://www.voyacode.com/admin/comments_admin.php?edit=" + id + "' onsubmit='return messageTest(" + id + ")'>" +
				"<textarea id='editarea" + id + "' style='width:450px;'rows='8' cols='75' name='message'>" + text + "</textarea>" +
				"<br><input type='submit' value='Save changes' name='submit'></form>");
	}else{
		e.html(textHolder[id]);
	}
	
}