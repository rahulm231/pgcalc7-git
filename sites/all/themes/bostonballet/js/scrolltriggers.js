if ($('.home').length ) {
  var controller1 = new ScrollMagic.Controller();

  var scene1 = new ScrollMagic.Scene({triggerElement: ".img-block", duration: 200})
  .addTo(controller1)
  //.addIndicators()
  .on("enter", function(e) {
    $('.img-block .neg-top.wrap img').addClass('slide-left');
    $('.img-block .nested-left.wrap').addClass('slide-up');
    $('.white-border .details').addClass('move-up');
  });
}

if ($('.prod-detail').length ) {
  var controller2 = new ScrollMagic.Controller();

  var scene2 = new ScrollMagic.Scene({triggerElement: ".prod-detail .button-cent", duration: 300})
  .offset(300)
  .addTo(controller2)
  //.addIndicators()
  .on("enter", function(e) {
    $('.img-holder .wrap.slide img').addClass('slide-left-more');
  });
}

if ($('.story-slides .quote.centered').length ) {
  var controller4 = new ScrollMagic.Controller();

  var scene4 = new ScrollMagic.Scene({triggerElement: ".story-slides .quote.centered", duration: 200})
  .offset(-500)
  .addTo(controller4)
  //.addIndicators()
  .on("enter", function(e) {
    if ( $( window ).width() > 1025 ) {
      $('.story-slides .quote.centered .item').addClass('animated fadeInUp');
    }
  });
}

if ($('.img-content .wrap.slide').length ) {
  var controller5 = new ScrollMagic.Controller();

  var scene5 = new ScrollMagic.Scene({triggerElement: ".img-content .wrap.slide img", duration: 200})
  .offset(200)
  .addTo(controller5)
  //.addIndicators()
  .on("enter", function(e) {
    $('.img-content .wrap.slide img').addClass('slide-up');
  });
}

if ($('.img-content .to-left.bottom').length ) {
  var controller6 = new ScrollMagic.Controller();

  var scene6 = new ScrollMagic.Scene({triggerElement: ".img-content .to-left.bottom img", duration: 200})
  .addTo(controller6)
  //.addIndicators()
  .on("enter", function(e) {
    $('.img-content .to-left.bottom img').addClass('slide-up');
  });
}

if ($('.two-image-block').length ) {
  var controller7 = new ScrollMagic.Controller();

  var scene7 = new ScrollMagic.Scene({triggerElement: ".two-image-block .img-left", duration: 200})
  .offset(200)
  .addTo(controller7)
  //.addIndicators()
  .on("enter", function(e) {
    $('.two-image-block .img-right').addClass('slide-up');
    $('.two-image-block .wrap img').addClass('slide-up');
    $('.two-image-block .two-img-ph-p').addClass('slide-up');
  });
}

if ($('header.home').length ) {
  var controller8 = new ScrollMagic.Controller();

  var scene8 = new ScrollMagic.Scene({triggerElement: ".two-image-block .img-left", duration: 200})
  .offset(200)
  .addTo(controller8)
  //.addIndicators()
  .on("enter", function(e) {
    $('.two-image-block .img-right').addClass('slide-up');
    $('.two-image-block .wrap img').addClass('slide-up');
  });
}
