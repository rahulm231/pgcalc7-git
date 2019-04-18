(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0];var j=d.createElement(s);var dl=l!='dataLayer'?'&l='+l:'';j.type='text/javascript';j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl+'';j.async=true;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','GTM-NW867C');
;/*})'"*/
;/*})'"*/
(function(e){e('html').removeClass('no-js')})(jQuery);;/*})'"*/
(function(a){var e=a.ajax.prototype.beforeSerialize;a.ajax.prototype.beforeSerialize=function(t,r){e.call(this,t,r);r.data['ajax_page_state[jquery_version]']=a.settings.ajaxPageState.jquery_version}})(Drupal);;/*})'"*/
(function(t){Drupal.progressBar=function(r,i,e,s){var a=this;this.id=r;this.method=e||'GET';this.updateCallback=i;this.errorCallback=s;this.element=t('<div class="progress" aria-live="polite"></div>').attr('id',r);this.element.html('<div class="bar"><div class="filled"></div></div><div class="percentage"></div><div class="message">&nbsp;</div>')};Drupal.progressBar.prototype.setProgress=function(r,i){if(r>=0&&r<=100){t('div.filled',this.element).css('width',r+'%');t('div.percentage',this.element).html(r+'%')};t('div.message',this.element).html(i);if(this.updateCallback){this.updateCallback(r,i,this)}};Drupal.progressBar.prototype.startMonitoring=function(t,r){this.delay=r;this.uri=t;this.sendPing()};Drupal.progressBar.prototype.stopMonitoring=function(){clearTimeout(this.timer);this.uri=null};Drupal.progressBar.prototype.sendPing=function(){if(this.timer){clearTimeout(this.timer)};if(this.uri){var r=this;t.ajax({type:this.method,url:this.uri,data:'',dataType:'json',success:function(t){if(t.status==0){r.displayError(t.data);return};r.setProgress(t.percentage,t.message);r.timer=setTimeout(function(){r.sendPing()},r.delay)},error:function(t){r.displayError(Drupal.ajaxError(t,r.uri))}})}};Drupal.progressBar.prototype.displayError=function(r){var i=t('<div class="messages error"></div>').html(r);t(this.element).before(i).hide();if(this.errorCallback){this.errorCallback(this)}}})(jQuery);;/*})'"*/
/**
 * @file
 * Creates a Ajax 'replace' command.
 *
 * This command is specifically for dc_ajax_add_cart module.
 * Unlike `ajax_command_replace()`, this command will not produce extra div
 * wrapper with 'display: block' style.
 */

(function ($) {
  Drupal.ajax.prototype.commands.dc_ajax_add_cart_html = function(ajax, response, status) {
    // Get information from the response. If it is not there, default to
    // our presets.
    var wrapper = response.selector ? $(response.selector) : $(ajax.wrapper);

    var new_content = $(response.selector).html(response.data);

    // If removing content from the wrapper, detach behaviors first.
    var settings = response.settings || ajax.settings || Drupal.settings;
    Drupal.detachBehaviors(wrapper, settings);

    // Attach all JavaScript behaviors to the new content, if it was successfully
    // added to the page, this if statement allows #ajax['wrapper'] to be
    // optional.
    if (new_content.parents('html').length > 0) {
      // Apply any settings from the returned JSON if available.
      var settings = response.settings || ajax.settings || Drupal.settings;
      Drupal.attachBehaviors(new_content, settings);
    }
  };
})(jQuery);

;/*})'"*/
;/*})'"*/
