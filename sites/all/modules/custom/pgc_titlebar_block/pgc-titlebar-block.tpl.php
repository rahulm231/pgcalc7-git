<div id="titlebar-links">
  <div class="pgc-font-size">
    <a href="javascript:void(0);" class="increase">Text +</a><a href="javascript:void(0);" class="decrease">Text -</a>
  </div>
  <div class="pgc-share pgc-title-btn">
    <span class="icon-share"></span>
    <div class="addthis_toolbox addthis_default_style ">
      <a class="addthis_counter addthis_pill_style"></a>
    </div>
    <script type="text/javascript" src="//s7.addthis.com/js/300/addthis_widget.js#pubid=xa-52af07597042ea76"></script>
  </div>
  <div class="pgc-print pgc-title-btn">
  	<!-- <a href="#" target="_blank"><span class="icon-print"></span></a> Commented and replaced by below line for PGCS-896 -->
    <a href="/pgc-print/<?php print arg(1);?>" target="_blank"><span class="icon-print"></span></a>
  </div>
  <div class="pgc-email pgc-title-btn">
    <a href="mailto:?subject=<?php print htmlspecialchars($email_subject); ?>&body=<?php print htmlspecialchars($email_body); ?>"><span class="icon-email"></span></a>
  </div>
</div>
