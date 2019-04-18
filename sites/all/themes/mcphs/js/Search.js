jQuery(document).ready(function($){
  var searchBox = jQuery("#ContentSearch input");
  jQuery(searchBox).on("keypress", function(e){
    var input = jQuery(searchBox).val();
    var key=e.keyCode || e.which;
    if (key==13){
      e.preventDefault();
       window.location.href = "http://www.alumni.mcphs.edu/s/1022/index.aspx?sid=1022&gid=1&page_id=253&pgid=253&cid=645&ecid=3665&search=" + input;
    }
  });
});
