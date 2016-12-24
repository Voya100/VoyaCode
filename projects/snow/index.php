<!DOCTYPE html>
<html dir="ltr" lang="en">
<head>
  <title>Voya Code - Snow Machine</title>
  <?php include '../../head.inc';?>
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="stylesheet" href="snow_app/styles.css">
  <script src="http://www.voyacode.com/node_modules/core-js/client/shim.min.js"></script>
  <script src="http://www.voyacode.com/node_modules/zone.js/dist/zone.js"></script>
  <script src="http://www.voyacode.com/node_modules/reflect-metadata/Reflect.js"></script>
  <script src="http://www.voyacode.com/node_modules/systemjs/dist/system.src.js"></script>
  <script src="systemjs.config.js"></script>
  <script>
    System.import('app').catch(function(err){ console.error(err); });
  </script>
</head>
<body>
<?php include '../../header.inc';?>

<article>
  <my-app>Loading...</my-app>
</article>

<?php include '../../footer.inc';?>

</body></html>