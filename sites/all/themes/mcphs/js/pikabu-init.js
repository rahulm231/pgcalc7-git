jQuery(document).ready(function(){

	// creates new left nav panel at 70% wide
	pikabu = new Pikabu({
		widths: {left: '70%' },
		//add class to fix the fixed height on resize
		onInit: function() {jQuery('html').addClass('m-pikabu-closed')}, 
		onOpened: function() {jQuery('html').removeClass('m-pikabu-closed')},
		onClosed: function() {jQuery('html').addClass('m-pikabu-closed')}
  	});
	
	// close nav panel when window is resized only if nav is open
    jQuery( window ).resize(function() {
		if((jQuery( window ).width()>768) && pikabu.activeSidebar){
			pikabu.closeSidebars();  
		}
	});
	
	//Close Button
	jQuery('#nav-close-btn').on('click', function(){
		pikabu.closeSidebars();
	});
	
});