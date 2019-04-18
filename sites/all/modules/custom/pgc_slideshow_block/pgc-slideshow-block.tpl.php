<div id="pgc-banner" class="<?php print $type; ?>">
  <?php if ($type == 'single'){ ?>
  	<?php if (!empty($links[0])){ ?>
  	  <a href="<?php print $links[0]; ?>" <?php if($open_new==1){ ?> target="_blank" <?php }?>>
  	<?php }?>
  		<img src="<?php print $images[0]; ?>" <?php if (!empty($alt_tag[0])){ ?>alt="<?php print $alt_tag[0]; ?>" <?php }?> width="100%">
  	<?php if (!empty($links[0])){ ?>
  	  </a>
  	<?php }?>
  <?php if (!empty($captions[0])){ ?>
  <p class="caption"><?php print $captions[0]; ?></p>  
  <?php } ?>
  <?php }else{ ?>
  	<div class="rslides">
      <?php $i = 0;
            foreach($images as $img){ ?>
        <?php if (!empty($links[$i])){ ?>
  	      <a href="<?php print $links[$i]; ?>" <?php if($open_new==1){ ?> target="_blank" <?php }?>>
  	    <?php }?>
  	    	<img src="<?php print $img; ?>" <?php if (!empty($alt_tag[$i])){ ?>alt="<?php print $alt_tag[$i]; ?>" <?php }?>>
  	    <?php if (!empty($links[$i])){ ?>
  	      </a>
  	    <?php }?>
      <?php $i++;}?>
    </div>
    <div id="noscript" style="background:white;">
      <noscript>
		If you do not see rotating images and you are using Internet Explorer, your security settings my be blocking a script. Try these simple steps to resolve the problem: <br />
		<ol style="border:1px solid black; color: red;">
		  <li>On the Tools menu, click Internet Options (If you cannot see the Tools menu, press Alt to display the menus)</li>
		  <li>In the Internet Options dialogue box, click the Security tab</li>
		  <li>Click Default Level</li>
		  <li>Click OK</li>
		  <li>Hit Refresh (or F5)</li>
		</ol>
	  </noscript>
	</div>
  <?php }?>
</div>