(function ($) {
  $(document).ready(function () {
    $(".search-collapse-btn").click(function () {
      $(this).toggleClass("in");
      $(this).prevAll("#block-search-form").toggleClass("in");
    });
  });
  $(document).click(function (e) {
    var container = $("#block-search-form, .search-collapse-btn");
    // if the target of the click isn't the container nor a descendant of the container
    if (!container.is(e.target) && container.has(e.target).length === 0)
    {
      $(".search-collapse-btn").removeClass("in").prevAll("#block-search-form").removeClass("in");
    }
  });
})(jQuery);;
