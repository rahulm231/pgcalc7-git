<div class="pgc-brochure-wrap">
  <div class="pg-brochure-page-btns pgc-print pgc-title-btn" >
  	  <a href="javascript:void;" onclick="window.print();" class="pgc-font-color1"><span class="icon-print"></span></a>
  </div>
  
  <div class="pgc-brochure-header">
      <div class="pgc-brochure-bg-top pgc-bg-color1"></div>
      <div class="pgc-brochure-top-middle">
      	<?php if( !empty($node->field_header_text) ){ ?>
      	<div class="pgc-brochure-header-container">
      		<div class="pgc-brochure-header-text pgc-bg-color2">
      			<?php print render(field_view_field('node', $node, 'field_header_text', array('label' => 'hidden')));?>
      		</div>
      	</div>   
      	<?php }?> 
      	<?php if($brochure_logo!==''){ ?>
        <div class="pgc-brochure-logo">
        	<img src="<?php print $brochure_logo;?>">
        </div>
        <?php }?>
      </div>      	
    </div>
    <div class="clearfix"></div>
    <?php if( !empty($node->body) ){ ?>
    <div class="pgc-brochure-content">
    	<?php print render(field_view_field('node', $node, 'body',array('label' => 'hidden')));?>
    </div>
    <?php }?>
    <?php if( !empty($node->field_gift_type_image) ){ ?>
  	<div class="pgc-brochure-gift-type-img">
  		<?php print render(field_view_field('node', $node, 'field_gift_type_image',array('label' => 'hidden')));?>
  	</div>  	
    <?php }?>  	
    <?php if( !empty($node->field_footer_text) ){ ?>
  	<footer class="pgc-brochure-footer-text pgc-bg-color1">
  		<?php print render(field_view_field('node', $node, 'field_footer_text', array('label' => 'hidden')));?>		
  	</footer>
  	<?php }?>
</div>