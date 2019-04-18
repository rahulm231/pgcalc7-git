<div id="node-<?php print $node->nid; ?>" class="<?php print $classes; ?> pg-node"<?php print $attributes; ?>>
  <div class="content clearfix"<?php print $content_attributes; ?>>
    <?php
    // Comments and links are disabled
    hide($content['comments']);
    hide($content['links']);
    hide($content['field_top_image']);
    print render($content);
    ?>
    <div class="child-pages">
      <?php
      $i = 0;
      foreach($child_pages as $child_page) {
        $class = '';
        if($i == 0)
          $class = 'first';
        elseif($i == (count($child_pages)-1))
          $class = 'last';
        $i++;
		/* #PGCS-1085 - Starts here
        if($child_page['thumbnail'])
          $padding = 'padding-left: 125px;';
        else
          $padding = '';
		 */
		$paddingclass = '';
		if($child_page['thumbnail']){
		  $thumbnail_width = str_replace('px', '', $child_page['width']);
		  if($thumbnail_width > 100){
		  	$padding = $thumbnail_width+25;
			$padding = 'padding-left: '.$padding.'px';			
			$paddingclass = 'no-padding-mobile';
		  }else{
		  	$padding = 'padding-left: 125px;';
		  }          
		}else{
          $padding = '';
		}
		// #PGCS-1085 - Ends here
        ?>
        <div class="child-page <?php print $class; ?>">
          <?php if($child_page['thumbnail']): ?>
          <div class="thumbnail">
          	<img src="<?php print $child_page['thumbnail']; ?>" alt="<?php print $child_page['alt_tag']; ?>" style="width:<?php print $child_page['width']; ?>; height:<?php print $child_page['height']; ?>";>
          </div>
          <?php endif; ?>
          <div class="details <?php print $paddingclass;?>" style="<?php print $padding; ?>" >
            <h2><a href="<?php print $child_page['link']; ?>" title="<?php print render($child_page['title']); ?>"><?php print $child_page['title']; ?></a></h2>
            <div class="summary"><?php print render($child_page['summary']); ?></div>
            <div class="link"><a href="<?php print $child_page['link']; ?>" title="<?php print $view_more_text;?>"><?php print $view_more_text;?></a></div>
          </div>
          <div class="clear"></div>
        </div>
      <?php
      }
      ?>
    </div>
    <?php if(strlen($additional_details['#markup'])): ?>
      <div class="pg-additional-details"><?php print render($additional_details); ?></div>
    <?php endif; ?>
  </div>
</div>