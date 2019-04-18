<div id="node-<?php print $node->nid; ?>" class="<?php print $classes; ?> pg-node"<?php print $attributes; ?>>
  <div class="content clearfix"<?php print $content_attributes; ?>>
    <div class="pg-content-body">
      <?php print render($content['body']); ?>
    </div>
      <?php if(count($how_gift_helps_items) || $how_gift_helps_overview): ?>
     <div class="pg-how-gift-helps">
      <h2>How Your Gift Helps</h2>
      <?php endif; ?>
      <?php if($how_gift_helps_overview): ?>
      <div class="pg-how-gift-helps-overview">
        <?php print render($how_gift_helps_overview); ?>
      </div>
      <?php endif; ?>
      <?php if(count($how_gift_helps_items)): ?>
      <?php
        switch(count($how_gift_helps_items)) {
          case 1:
            $width = "100%";
            $padding = "0";
            break;
          case 2:
            $width = "45%";
            $padding = "5%";
            break;
          // Default case is 3 or some multiple of 3
          case 3:
          default:
            $width = "30%";
            $padding = "5%";
            break;
        }
        $i = 1;
      ?>
        <div class="pg-how-gift-helps-items">
          <?php foreach($how_gift_helps_items as $item): ?>
            <?php
            $style = 'width:'.$width.';';
            $style .= 'padding-right:'.$padding.';';
            ?>
            <div class="pg-how-gift-helps-item" style="<?php print $style; ?>">
              <?php if($item['image']): ?>
              <img src="<?php print $item['image']; ?>" />
              <?php endif; ?>
              <?php if($item['text']): ?>
              <div class="pg-how-gift-helps-item-text">
                <?php print render($item['text']); ?>
              </div>
              <?php endif; ?>
            </div>
          <?php $i++; ?>
          <?php endforeach; ?>
          <div class="clear"></div>
        </div>
    </div>
    <?php endif; ?>
    <?php
    if(strlen($gift_details['#markup']) || strlen($gift_example['#markup'])): ?>
    <div class="pg-gift-details">
      <h2 class="accordion-switch"><a href="javascript:void(0);">Show More Details <span class="icon-arrow-down"></span></a></h2>
      <div class="accordion-items">
        <?php if(strlen($gift_details['#markup'])): ?>
        <div class="pg-gift-details-body accordion-item"><?php print render($gift_details); ?></div>
        <?php endif; ?>
        <?php if(strlen($gift_example['#markup'])): ?>
        <h2>Example</h2>
        <div class="pg-gift-example-body accordion-item"><?php print render($gift_example); ?></div>
        <?php endif; ?>
      </div>
    </div>
    <?php endif; ?>
  </div>
</div>
