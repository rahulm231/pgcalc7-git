<div class="pgc-print-preview" <?php if($print_border!==''){ ?>style="border: 2px solid #<?php print $print_border;?>"<?php }?>>
  <?php if($print_logo!==''){ ?>
    <div class="header">
  	  <div class="pgc-print-logo" style="text-align: center"><img src="<?php print $print_logo;?>"></div>
    </div>
  <?php }?>
  <?php if(!empty($title)){ ?>
    <h1 class="pgc-print-title"><?php print render($title);?></h1>
  <?php }?>
  <div class="pgc-print-body"><?php print render($page['content_body']);?></div>
</div>
