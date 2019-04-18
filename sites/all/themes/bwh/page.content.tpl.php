<div class="pg-wrap">
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
