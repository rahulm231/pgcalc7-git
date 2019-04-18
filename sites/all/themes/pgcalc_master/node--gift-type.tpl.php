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
<?php
          foreach($how_gift_helps_items as $item):
            $style = "width: $width;";
            if (($i % count($how_gift_helps_items)) || theme_get_setting('pgcalc_master_tweak_padding')):
              $style .= " padding-right: $padding;";
            endif;
?>
            <div class="pg-how-gift-helps-item" style="<?php print $style; ?>">
              <?php if($item['image']): ?>
                <?php if($item['link']): ?><a href="<?php print render($item['link']); ?>" <?php if($open_new==1){ ?> target="_blank" <?php }?>><?php endif; ?>
              	  <img src="<?php print $item['image']; ?>"  alt="<?php print $item['alt_tag']; ?>"/>
              	<?php if($item['link']): ?></a><?php endif; ?>
              <?php endif; ?>
              <?php if($item['text']): ?>
              <div class="pg-how-gift-helps-item-text">
                <?php print render($item['text']); ?>
              </div>
              <?php endif; ?>
            </div>
<?php
            $i++;
            endforeach;
?>
          <div class="clear"></div>
        </div>
    </div>
    <?php endif; ?>
    <?php
    if(strlen($gift_details['#markup']) || strlen($gift_example['#markup'])): ?>
    <div class="pg-gift-details">
      <!-- #MSE-7 - Starts -->
      <!--<h2 class="accordion-switch"><a href="javascript:void(0);">Show More Details <span class="icon-arrow-down"></span></a></h2>-->
      <h2 class="accordion-switch">
      	<a href="javascript:void(0);">
      	  <?php if(strlen($accordion_collapsed_text['#markup'])){
      		      print $accordion_collapsed_text['#markup'];
			    } else{
			  	  print "Show More Details";
		        }?>
	      <span class="icon-arrow-down"></span>
	    </a>
	  </h2>
      <h2 class="accordion-switch accordion-expand">
      	<a href="javascript:void(0);">
      	  <?php if(strlen($accordion_expanded_text['#markup'])){
      		      print $accordion_expanded_text['#markup'];
			    } else{
			  	  print "Hide Details";
		        }?>
	      <span class="icon-arrow-up"></span>
	    </a>
	  </h2>
      <!-- #MSE-7 - Ends -->
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
    <?php if(strlen($additional_details['#markup'])): ?>
      <div class="pg-additional-details"><?php print render($additional_details); ?></div>
    <?php endif; ?>
  </div>
</div>