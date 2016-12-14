<!DOCTYPE html>
<html dir="ltr" lang="en">
 <head>
	<meta content="text/html; charset=utf-8" http-equiv="content-type">
	<title>Blogs</title>
	<?php include 'head.inc';?>
	<link type="text/css" href='../styles/blogs.css' rel="stylesheet"></link>
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body>
<?php include '../header.inc';?>

<article>
<h1>Blogs</h1>
<a href="blogs.rss"><img alt="RSS" title="RSS" src="../images/rss.png" style="float:right; margin-top: 12px;"></a>
<?php 
include_once("../admin/mysql.php");

$query = "SELECT id, name, text FROM blogs ORDER BY id DESC";
$search = mysqli_query($sql, $query);
while ($row = mysqli_fetch_array($search)) {
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
	}
?>

</article>

<?php include '../footer.inc';?>

</body>
</html>
