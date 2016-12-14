<?php //Comment listing

include("../admin/mysql.php");

if($admin){
	$private_query = "";
}else{
	$private_query = "AND private=0";
}

$query = "SELECT id, name, message, private, update_time, post_time FROM comments WHERE deleted=0 $private_query ORDER BY id";
$search = mysqli_query($sql, $query);
mysqli_close($sql);
while ($row = mysqli_fetch_array($search)) {
	$id = $row['id'];
	$name = $row['name'];
	if($name == "Voya"){
		$name .= "<br>Site Admin";
	}
	$message = $row['message'];
	$time = $row['post_time'];
	$updateTime = "";
	if($row['post_time'] != $row['update_time']){
		$updateTime = ", edited at " . date("d.m.Y H:i:s",$row['update_time']); 
	}
	$time = date("d.m.Y H:i:s",$time) . $updateTime;
	
	//Editing tools
	if($admin){
		$edit = "<div style='float:right;display:inline-block;'><input type='button' value='Edit' class='edit' onclick='edit($id)'></div>";
	}else{
		$edit = "";
	}
	
	if($row['private'] == 0){
		$class = "comment";
	}else{
		$class = "private_comment";
		$title = "<br><i>Private message</i>";
	}
	
	echo "<tr class='$class' id='comment$id'>
	<td class='comment_name'>$name $title</td>
	<td class='comment_text'><span class='post_date'>$time</span>$edit
	<hr>
	<span class='message'>$message</span></td>
</tr>";
	
}
if(isset($_POST['name']) && $private == 1){
	$time = date("d.m.Y H:i:s");
	$post_text = str_replace('\r',"",$post_text);
	echo "<tr class='private_comment'>
	<td class='comment_name'>$post_name<br><i>Private message</i></td>
	<td class='comment_text'><span class='post_date'>$time</span>
	<hr>
	<span class='message'>$post_text</span></td>
	</tr>";
}
?>