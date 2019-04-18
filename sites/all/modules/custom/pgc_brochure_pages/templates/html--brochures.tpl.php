<!DOCTYPE html>
<html lang="en" dir="ltr">
  <head>
    <title><?php print $head_title; ?></title>
    <meta charset="UTF-8">
    <link rel="stylesheet" href="/<?php print drupal_get_path('theme', 'pgcalc_master');?>/icons.css" type="text/css">    
    <link rel="stylesheet" href="/<?php print drupal_get_path('module', 'pgc_brochure_pages');?>/css/brochure.css" type="text/css">
    <link rel="stylesheet" href="/<?php print drupal_get_path('theme', $GLOBALS['theme']);?>/overrides.css" type="text/css">
    <link rel="stylesheet" href="/<?php print drupal_get_path('theme', $GLOBALS['theme']);?>/custom.css" type="text/css">
  </head>
  <body class="pgc-brochure <?php print render($classes); ?>">
  	<?php print $page;?>
  </body>
</html>