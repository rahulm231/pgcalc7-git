<div id="node-<?php print $node->nid; ?>" class="<?php print $classes; ?> pg-node"<?php print $attributes; ?>>
  <div class="content clearfix"<?php print $content_attributes; ?>>
      <div class="pg-content-body">
        <?php print render($content['body']); ?>
      </div>
      <?php if(!empty($featured_links)){?>
      <div class="pg-featured-links">
        <?php
        $even = 'even';
		foreach($featured_links as $featured_link):
          if($even == 'even'):
        ?>
        <div class="break"></div>
        <?php endif; ?>
        <div class="pg-featured-link <?php print $even; ?>" style="float: <?php print $even =='even' ? 'left' : 'right'; ?>;">
          <?php if(strlen($featured_link['title']['#markup'])): ?>
            <h3><a href="<?php print $featured_link['link']; ?>" <?php if($open_new==1){ ?> target="_blank" <?php }?>><?php print render($featured_link['title']); ?></a></h3>
          <?php endif; ?>
          <?php if(strlen($featured_link['image'])): ?>
            <div class="image">
              <a href="<?php print $featured_link['link']; ?>" <?php if($open_new==1){ ?> target="_blank" <?php }?>>
              	<img src="<?php print $featured_link['image']; ?>" alt="<?php print $featured_link['alt_tag']; ?>" width="100%">
              </a>
            </div>
          <?php endif; ?>
          <?php if(strlen($featured_link['detail']['#markup'])): ?>
            <div class="detail"><?php print render($featured_link['detail']); ?></div>
          <?php endif; ?>
        </div>
        <?php
          $even = $even =='even' ? 'odd' : 'even';
          endforeach;
        ?>
        <div class="clear"></div>        
      </div>
      <?php }?>
      <?php print render($content['field_additional_details']); ?>      
  </div>
</div>