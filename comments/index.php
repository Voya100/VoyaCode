<!DOCTYPE html>
<html dir="ltr" lang="en">

<head>
    <?php include '../head.inc';?>
    <title>Comments</title>
    <script>var admin = false;</script>
    <script src="comments.js"></script>
    <link type="text/css" href='../styles/comments.css' rel="stylesheet"></link>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <?php include_once("../header.inc");?>
</head>

<body>
<article>
  <h1>Comments</h1>
  <?php
  date_default_timezone_set("Europe/Helsinki");
  $admin = false;
  include_once 'comment_post.php';
  ?>

  <table class="comment_table">
  <tr class="top_row"><td style="width:20%;">Name</td><td>Comments</td></tr>

  <?php 
  include_once 'comment_list.php';
  ?>
  </table>


  <form method="post" action="http://www.voyacode.com/comments/index.php" onsubmit="return messageTest()">
    <table class="comment_table" id="leave_comment">
      <tr class="top_row"><td colspan="2">Leave a comment:</td></tr>
      <tr class="comment"><td style="width:20%">Name:</td>
        <td><input id="name" type="text" value="" maxlength="25" size="75" name="name" tabindex="1">
        <span id="name_error"></span>
        </td>
      </tr>
      <tr class="comment">
        <td>Message:</td>
        <td>
          <input type="button" onclick="tag('b');" value="B" style="font-weight:bold;">
          <input type="button" onclick="tag('i');" value="i" style="font-style: italic;">
          <input type="button" onclick="tag('u');" value="u" style="text-decoration: underline;">
          <input type="button" onclick="tag('url');" value="URL">
          <input type="button" onclick="tag('color');" value="Color"><br>
          <textarea id="message" rows="8" cols="75" name="message" tabindex="2"></textarea>
          <span id="message_error"></span>
          <br><input type="hidden" name="private" value="0" />
          <span title="If the comment is set as private, only the site admin can see it.">
          <input name="private" value="1" type="checkbox">Private comment</span>
        </td>
      </tr>
      <tr class="comment">
      <td colspan="2" style="text-align:center;"><input type="submit" value="Submit" name="submit"></td>
      </tr>
    </table>
  </form>
</article>

<?php include '../footer.inc';?>

</body>
</html>
