<ul id="pgc-contact-footer-block">
  <?php if($title): ?>
  <li class="title"><?php print $title; ?></li>
  <?php endif; ?>
  <?php
    $first = ' first';
    foreach($lines as $key => $line) {
      if(strlen($line['title'])) {
        if(!$line['link'])
          $line['link'] = '#';
        $icon = strtolower($line['icon']);
        print '<li class="'.$key.$first.'">';
        print '<a href="'.$line['link'].'" title="'.$line['title'].'"><span class="icon-'.$icon.'"></span>'.$line['title'].'</a>';
        print '</li>';
      }
      $first = '';
    }
  ?>
</ul>
<div class="clear"></div>