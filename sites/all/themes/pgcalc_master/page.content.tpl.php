<?php
// Due to metatag module weirdness, this needs
// to be rendered here to show up in the head tag
render($page['content']['metatags']);
// This page is included directly, not using Drupal's theme system, so we cannot
// do this with a preprocess function.
if ($title == '<none>' || $title == '&lt;none&gt;') {
  $title = '';
}
?>
<div class="pg-wrap">
  <div class="pg-page-header">
  	<?php print render($page['titlebar_blocks']); ?>    
  </div>
  <div class="pg-content-top"><?php print render($page['content_top']); ?></div>
  <?php print $messages; ?>
  <?php if ($tabs): ?>
    <div id="tabs-wrapper" class="clearfix">
    <?php print render($tabs); ?>
    </div>
  <?php endif; ?>
  <?php print render($tabs2); ?>
  <div class="pg-content-inline-blocks"><?php print render($page['content_inline_blocks']); ?></div>
  <div class="pg-content-body"><?php print render($page['content_body']); ?></div>
  <div class="pg-content-footer"><?php print render($page['content_footer']); ?></div>
</div>
