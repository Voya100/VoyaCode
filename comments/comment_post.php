<?php 
//Tags
function tag($tagname, $text){
	$tag[] = '/\[' . $tagname . '](.*?)\[\/' . $tagname . '\]/i';
	$tag_rep[] = '<' . $tagname . '>$1</' . $tagname . '>';
	$text = preg_replace($tag, $tag_rep, $text);
	return $text;
}
function replace_tags($text){
	$text = str_replace("\n", "<br>",$text);
	$text = tag('b', $text);
	$text = tag('i', $text);
	$text = tag('u', $text);

	$tag[] = '/\[url=(.*?)\](.*?)\[\/url\]/i';
	$tag_rep[] = '<a href="$1" target="_blank">$2</a>';
	$text = preg_replace($tag, $tag_rep, $text);

	$tag[] = '/\[color=(.*?)\](.*?)\[\/color\]/i';
	$tag_rep[] = '<span style="color:$1">$2</span>';
	$text = preg_replace($tag, $tag_rep, $text);

	return $text;
}
/*Database details
 * ID
 * Name
 * Message
 * ip_remote
 * ip_forwarded
 * post_time
 * update_time
 * Private (true/false)
 * Deleted
 * 
 */


//Comment posting
if (isset($_POST['name'])){
	include("../admin/mysql.php");
	
	if (mysqli_connect_error()) {
		$logMessage = 'MySQL Error: ' . mysqli_connect_error();
		// Call your logger here.
		die('Could not connect to the database');
	}
	$post_name = mysqli_real_escape_string($sql,$_POST['name']);
	$text = htmlspecialchars($_POST['message']);
	
	$text = replace_tags($text);
	$post_text = mysqli_real_escape_string($sql,$text);
	if(strlen($post_name) < 3 || strlen($post_text) < 4 || ($post_name == "Voya" && $admin == false)){
		echo "The comment post failed.<br><br>";
		echo "Error";
		mysqli_close($sql);
		return;
	}
	
	$private = $_POST['private'];
	$ip_remote = $_SERVER['REMOTE_ADDR'];
	$ip_forwarded = $_SERVER['HTTP_X_FORWARDED_FOR'];
	$time = time();
	$query = "INSERT INTO comments(name,message,private,ip_remote,ip_forwarded,post_time,update_time) 
	VALUES ('$post_name','$post_text','$private','$ip_remote','$ip_forwarded','$time','$time')";
	$search = mysqli_query($sql, $query);
	if($search == false){
		echo "The comment post failed.<br><br>";
	}else{
		echo "Comment was posted successfully.<br><br>";
	}
	mysqli_close($sql);
}

//Comment update
if(isset($_POST['message']) && isset($_GET['edit']) && $admin == true){
	$id = $_GET['edit'];
	$text = htmlspecialchars($_POST['message']);	
	$text = replace_tags($text);
	
	include("../admin/mysql.php");
	
	if (mysqli_connect_error()) {
		die('Could not connect to the database');
	}
	$edit_text = mysqli_real_escape_string($sql,$text);
	$time = time();
	$query = "Update comments SET message='$edit_text', update_time=$time WHERE id=$id";
	$search = mysqli_query($sql, $query);
	if($search == false){
		echo "The comment edit failed.<br><br>";
	}else{
		echo "Comment was edited successfully.<br><br>";
	}
	mysqli_close($sql);
}



?>