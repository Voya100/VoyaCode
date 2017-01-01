<!DOCTYPE html>
<html dir="ltr" lang="en">
<head>
<title>Voya Code</title>
<?php include 'head.inc';?>
<link type="text/css" href='styles/homepage.css' rel="stylesheet"></link>
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<script src='project_slider.js' type="text/javascript"></script>
<script src='projects/snow/snow.js' type="text/javascript"></script>
</head>
<body>
<?php include 'header.inc';?>

<article>
<div id="left">
	<h1>Projects</h1>
	<div id="content_view">
		<img src='images/arrow_left.png' id='previous' title='Previous'><img src='images/arrow_right.png' id='next' title='Next'>
		
		<a href='projects/rock_paper_scissors' id="project0">
			<div title='Rock, paper, scissors' style="background-image:url('images/rock_paper_scissors_banner.jpg')"></div>
		</a>
		<a href='projects/slay_the_dragon' id="project1">
			<div title='Slay the Dragon' style="background-image:url('images/slay_the_dragon_banner.jpg');"></div>
		</a>          
		<a href='projects/chess' id="project2">
			<div title='Chess' style="background-image:url('images/chess_banner.jpg');"></div>
		</a>
		<a href='projects/snow' id="project3">
			<div title='Snow Machine' style="background-image:url('images/snow_machine_banner.jpg');display:block;"></div>
		</a>
		<a href='projects/hangman' id="project4">
			<div title='Hangman' style="background-image:url('images/hangman_banner.jpg');display:block;"></div>
		</a>
		
	</div>
	          
	<h1>Newest Blog</h1>
	<div id="blogs">
	<?php
	include_once("admin/mysql.php");
	
	$query = "SELECT name, text FROM blogs ORDER BY id DESC LIMIT 1";
	$search = mysqli_query($sql, $query);
	$row = mysqli_fetch_array($search);
		$id = $row['id'];
		$name = $row['name'];
		$text = $row['text'];
		echo "<table><tbody>
	                <tr>
	                  <th id='$id'>$name</th>
	                </tr>
	                <tr>
	                  <td>$text</td>
	                </tr>
	              </tbody>
	            </table>";
	?>            
	</div>
</div>

<div id="right">
	<h1>Welcome!</h1>
	<p>Hello and welcome to my website! This website is intended for my
	   personal coding projects, which may include games and other random
	   stuff. Feel free to test them out and leave feedback in the comments!
	</p>

	<h1>About me:</h1>
	<p>I'm a 20-year-old Finnish university student, with a huge passion for
	   coding. At the moment I have experience in HTML, Javascript, PHP,
	   Scala, Python and C++.<br>
	</p>          
	<a href="blogs/blogs.rss"><img alt="RSS" title="RSS" src="images/rss.png"></a>
	</div>
</div>

</article>

<?php include 'footer.inc';?>

</body></html>