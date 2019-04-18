<?php print render($page['header']); ?>

<div id="wrapper">
  <div id="container" class="clearfix">

    <div id="header">
      <div id="logo-floater">
      <?php if ($logo || $site_title): ?>
        <?php if ($title): ?>
          <div id="branding"><strong><a href="<?php print $front_page ?>">
          <?php if ($logo): ?>
            <img src="<?php print $logo ?>" alt="" title="" id="logo" />
          <?php endif; ?>
          </a></strong></div>
        <?php else: /* Use h1 when the content title is empty */ ?>
          <h1 id="branding"><a href="<?php print $front_page ?>">
          <?php if ($logo): ?>
            <img src="<?php print $logo ?>" alt="" title="" id="logo" />
          <?php endif; ?>
          </a></h1>
      <?php endif; ?>
      <?php endif; ?>
      </div>
    </div> <!-- /#header -->

    <?php if ($page['menu']): ?>
      <div id="sidebar" class="sidebar">
        <?php print render($page['menu']); ?>
      </div>
    <?php endif; ?>

    <div id="center"><div id="squeeze"><div class="right-corner"><div class="left-corner">
        <?php print $breadcrumb; ?>
        <a id="main-content"></a>
        <?php if ($tabs): ?><div id="tabs-wrapper" class="clearfix"><?php endif; ?>
        <?php if ($title): ?>
          <h1<?php print $tabs ? ' class="with-tabs"' : '' ?>><?php print $title ?></h1>
        <?php endif; ?>
        <?php if ($tabs): ?><?php print render($tabs); ?></div><?php endif; ?>
        <?php print render($tabs2); ?>
        <?php print $messages; ?>
        <?php if ($action_links): ?><ul class="action-links"><?php print render($action_links); ?></ul><?php endif; ?>
        <div class="clearfix">
          <?php print render($page['content']); ?>
        </div>
        <?php print $feed_icons ?>
        <?php print render($page['footer']); ?>
    </div></div></div></div> <!-- /.left-corner, /.right-corner, /#squeeze, /#center -->

  </div> <!-- /#container -->
</div> <!-- /#wrapper -->
