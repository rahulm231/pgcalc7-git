<div id="node-<?php print $node->nid; ?>" class="<?php print $classes; ?> pg-node"<?php print $attributes; ?>>
  <div class="content clearfix"<?php print $content_attributes; ?>>
    <?php
    // We hide the comments and links now so that we can render them later.
    hide($content['comments']);
    hide($content['links']);
    print render($content);
    ?>
  </div>

</div>