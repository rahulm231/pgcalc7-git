<?php
// Due to metatag module weirdness, this needs
// to be rendered here to show up in the head tag
render($page['content']['metatags']);

if ($title == '<none>' || $title == '&lt;none&gt;') {
  $title = '';
}
?>
<div class="pg-page-header">
    <div class="pg-page-btns"><?php print render($page['titlebar_blocks']); ?></div>
    <h1><?php print $title; ?></h1>
    <div class="pg-breadcrumb"><?php print $breadcrumb; ?></div>
    <div class="clear"></div>
  </div>
