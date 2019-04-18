<?php

/**
 * Override of theme_breadcrumb().
 */
function pgcalc_master_breadcrumb(&$variables) {
  $breadcrumb = $variables['breadcrumb'];

  if (!empty($breadcrumb)) {
    // Provide a navigational heading to give context for breadcrumb links to
    // screen-reader users. Make the heading invisible with .element-invisible.
    $output = '<h2 class="element-invisible">' . t('You are here') . '</h2>';

    $output .= '<div class="pg-breadcrumb-links">' . implode(' » ', $breadcrumb) . '</div>';
    return $output;
  }
}

/**
 * Override or insert variables into the maintenance page template.
 */
function pgcalc_master_preprocess_maintenance_page(&$vars) {
  // While markup for normal pages is split into page.tpl.php and html.tpl.php,
  // the markup for the maintenance page is all in the single
  // maintenance-page.tpl.php template. So, to have what's done in
  // pgcalc_master_preprocess_html() also happen on the maintenance page, it has to be
  // called here.
  pgcalc_master_preprocess_html($vars);
}

/**
 * Override or insert variables into the html template.
 */
function pgcalc_master_preprocess_html(&$vars) {
  // Insert raw, unsanitized HTML from /admin/appearance/settings/%.
  $vars['custom_html'] = theme_get_setting('pgcalc_master_custom_html');
  
  /* PGCS-445*/ 
  if(theme_get_setting('pgcalc_master_font_awesome')===1){
  	drupal_add_css('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css', array('type' => 'external'));
  }  
  /* PGCS-445*/ 

}

/**
 * Override or insert variables into the html template.
 */
function pgcalc_master_process_html(&$vars) {

}

/**
 * Override or insert variables into the page template.
 */
function pgcalc_master_preprocess_page(&$vars) {
//die(print_r($vars));
  // Insert raw, unsanitized HTML from /admin/appearance/settings/%.
  $vars['custom_html'] = theme_get_setting('pgcalc_master_custom_html');
}

/**
 * Override or insert variables into the node template.
 */
function pgcalc_master_preprocess_node(&$vars) {
  $vars['submitted'] = $vars['date'] . ' — ' . $vars['name'];
  switch($vars['type']) {
    case 'homepage':
      $node = node_load($vars['nid'], $vars['vid']);
      // Create clean feature items array
      $vars['featured_links'] = array();	  
      for($i = 1; $i <= 4; $i++) {
        // We expect at least a title or detail
        if($vars['field_featured_item_'.$i.'_title'][0]['value'] || $vars['field_featured_item_'.$i.'_detail'][0]['value']) {
          $link = array();
          $title = field_get_items('node', $node, 'field_featured_item_'.$i.'_title');
          $link['title'] = field_view_value('node', $node, 'field_featured_item_'.$i.'_title', $title[0]);
          $link['link'] = strlen($vars['field_featured_item_'.$i.'_url'][0]['value'])  ? $vars['field_featured_item_'.$i.'_url'][0]['value'] : '#';
          $detail = field_get_items('node', $node, 'field_featured_item_'.$i.'_detail');
          $link['detail'] = field_view_value('node', $node, 'field_featured_item_'.$i.'_detail', $detail[0]);
          $link['image'] = file_create_url($vars['field_featured_item_'.$i.'_image'][0]['uri']);
		  $link['alt_tag'] = $vars['field_featured_item_'.$i.'_image'][0]['alt'];
          $vars['featured_links'][] = $link;
        }
		if(isset($node->field_featured_item_url_open_new[$node->language])){
	  	  $open_new = $node->field_featured_item_url_open_new[$node->language][0]['value'];
	    }else{
	  	  $open_new = 0;
	    }
	    $vars['open_new'] = $open_new;
      }
      break; 

    case 'gift_type':
      $node = node_load($vars['nid'], $vars['vid']);
      $how_gift_helps = field_get_items('node', $node, 'field_how_gift_helps_overview');
      $vars['how_gift_helps_overview'] = isset($vars['field_how_gift_helps_overview'][0]['value']) ? field_view_value('node', $node, 'field_how_gift_helps_overview', $how_gift_helps[0]) : false;
      $vars['how_gift_helps_items'] = array();
      for($i = 1; $i <= 3; $i++) {
        $image = false;
        $text = false;
		$link = false;
		$alt_tag = false;
        if(isset($vars['field_how_gift_helps_image_'.$i][0])) {
          $image = file_create_url($vars['field_how_gift_helps_image_'.$i][0]['uri']);
		  $alt_tag = $vars['field_how_gift_helps_image_'.$i][0]['alt'];
        }
        if(isset($vars['field_how_gift_helps_text_'.$i][0])) {
          $text = field_get_items('node', $node, 'field_how_gift_helps_text_'.$i);
          $text = field_view_value('node', $node, 'field_how_gift_helps_text_'.$i, $text[0]);
        }
		if(isset($vars['field_how_gift_helps_link_'.$i][0])) {
          $link = field_get_items('node', $node, 'field_how_gift_helps_link_'.$i);
          $link = field_view_value('node', $node, 'field_how_gift_helps_link_'.$i, $link[0]);
        }
        if($image || $text)
          $vars['how_gift_helps_items'][] = array('image' => $image, 'alt_tag' => $alt_tag, 'text' => $text, 'link' => $link);
      }
	  if(isset($node->field_image_url_open_new[$node->language])){
	  	  $open_new = $node->field_image_url_open_new[$node->language][0]['value'];
	  }else{
	  	  $open_new = 0;
	  }
	  $vars['open_new'] = $open_new;
      $gift_details = field_get_items('node', $node, 'field_gift_type_details');
      $vars['gift_details'] = field_view_value('node', $node, 'field_gift_type_details', $gift_details[0]);
      $gift_example = field_get_items('node', $node, 'field_gift_type_example');
      $vars['gift_example'] = field_view_value('node', $node, 'field_gift_type_example', $gift_example[0]);
	  // #MSE-10 - Starts
	  $additional_details = field_get_items('node', $node, 'field_additional_details');
      $vars['additional_details'] = field_view_value('node', $node, 'field_additional_details', $additional_details[0]);
	  // #MSE-10 - Ends
	  // #MSE-7 - Starts 
	  $accordion_collapsed_text = field_get_items('node', $node, 'field_accordion_collapsed_text');
      $vars['accordion_collapsed_text'] = field_view_value('node', $node, 'field_accordion_collapsed_text', $accordion_collapsed_text[0]);
      $accordion_expanded_text = field_get_items('node', $node, 'field_accordion_expanded_text');
      $vars['accordion_expanded_text'] = field_view_value('node', $node, 'field_accordion_expanded_text', $accordion_expanded_text[0]);
	  // #MSE-7 - Ends 
      break;

    case 'general_content':

      break;

    case 'contact':

      break;

    case 'landing_page':
	  $node_path = "node/".arg(1); // using it instead of current_path() to make it work for print preview pages too - #PGCS-896
      // Build a list of child pages, based on position in the menu structure - this couldn't be done with Views
      $parentId = db_query("SELECT mlid FROM menu_links WHERE link_path = :link_path AND menu_name = 'main-menu'",
        array(':link_path' => $node_path))->fetchField();
      $query = db_query("SELECT n.nid, n.vid FROM node n JOIN menu_links m ON n.nid = SUBSTRING(m.link_path, 6) WHERE n.status = 1 AND m.plid = :plid ORDER BY m.weight ASC",
        array(':plid' => $parentId))->fetchAll();
      $child_pages = array();
      foreach($query as $result) {
        $node = node_load($result->nid, $result->vid);
        $summary = field_view_field('node', $node, 'body', 'teaser');
		// #MSE-21 - Starts
		$thumbnail_width = "100px";
		$thumbnail_height = "100px";
		// #MSE-21 - Ends
        if(isset($node->field_thumbnail_image[$node->language])){
          $thumbnail = file_create_url($node->field_thumbnail_image[$node->language][0]['uri']);
		  $alt_tag = $node->field_thumbnail_image[$node->language][0]['alt'];	
		  // #MSE-21 - Starts
		  if(isset($node->field_thumbnail_width[$node->language])){
		    $thumbnail_width = $node->field_thumbnail_width[$node->language][0]['value'];
		    if($thumbnail_width!='auto'){
		      $thumbnail_width = $thumbnail_width."px";	
		    }
		  }
		  if(isset($node->field_thumbnail_height[$node->language])){
		  	$thumbnail_height = $node->field_thumbnail_height[$node->language][0]['value'];
			if($thumbnail_height!='auto'){
		      $thumbnail_height = $thumbnail_height."px";	
		    }
		  }
		  // #MSE-21 - Ends
		  
        }else{
          $thumbnail = '';
		  $alt_tag = '';
        }

        $title = $node->title;
        $link = '/'.drupal_get_path_alias('node/'.$node->nid);
		
		// #MSE-21 - Starts
        //$child_pages[] = array('title' => $title, 'summary' => $summary, 'thumbnail' => $thumbnail, 'alt_tag' => $alt_tag, 'link' => $link);
		$child_pages[] = array('title' => $title, 'summary' => $summary, 'thumbnail' => $thumbnail, 'width' => $thumbnail_width, 'height' => $thumbnail_height, 'alt_tag' => $alt_tag, 'link' => $link);
		// #MSE-21 - Ends
      }
      $vars['child_pages'] = $child_pages;
      
      // #MSE-13 - Starts 
      $node = node_load($vars['nid'], $vars['vid']);     
      $view_more_text = field_get_items('node', $node, 'field_view_more_text');
	  $view_more_text = field_view_value('node', $node, 'field_view_more_text', $view_more_text[0]);
	  if(strlen($view_more_text['#markup'])){
	  	$view_more_text = $view_more_text['#markup'];
	  }else{
	  	$view_more_text = "Learn more &raquo;";
	  }
	  
	  $vars['view_more_text'] = $view_more_text;
      // #MSE-13 - Ends
      
      // #MSE-10 - Starts
      $additional_details = field_get_items('node', $node, 'field_additional_details');
	  $additional_details = field_view_value('node', $node, 'field_additional_details', $additional_details[0]);	  
	  $vars['additional_details'] = $additional_details;
      // #MSE-10 - Ends
      
      break;
  }
}

/**
 * Override or insert variables into the comment template.
 */
function pgcalc_master_preprocess_comment(&$vars) {
  $vars['submitted'] = $vars['created'] . ' — ' . $vars['author'];
}

/**
 * Override or insert variables into the block template.
 */
function pgcalc_master_preprocess_block(&$vars) {
  $vars['title_attributes_array']['class'][] = 'title';
  $vars['classes_array'][] = 'clearfix';
  // Appending a "home" icon to the primary nav, if a title is set.
  if ($vars['block']->delta == 'main-menu' or $vars['block']->module == 'menu_block' && $vars['elements']['#config']['menu_name'] == 'main-menu') {
    if (strlen($vars['block']->subject)) {
      $vars['block']->subject = '<a href="/">' . $vars['block']->subject . '</a>';
    }
  }
  
  // Adding classes to blocks
  if ($vars['block']->delta == 'pgc_titlebar_block') {
    $vars['classes_array'][] = drupal_html_class('pg-page-btns');
  }
  
  if ($vars['block']->delta == 'blockify-breadcrumb') {
    $vars['classes_array'][] = drupal_html_class('pg-breadcrumb');
  }
}
/**
 * Override or insert variables into the page template.
 */
function pgcalc_master_process_page(&$vars) {

}

/**
 * Override or insert variables into the region template.
 */
function pgcalc_master_preprocess_region(&$vars) {

}

function pgcalc_master_menu_tree__main_menu($variables){
  return '<ul class="nav" id="main-menu">' . $variables['tree'] . '</ul>';
}

function pgcalc_master_menu_link($variables) {
  $element = $variables['element'];
  $sub_menu = '';

  if ($element['#below']) {
    $sub_menu = drupal_render($element['#below']);
  }
  $output = l($element['#title'], $element['#href'], $element['#localized_options']);
  return '<li' . drupal_attributes($element['#attributes']) . '>' . $output . $sub_menu . "</li>\n";
}
