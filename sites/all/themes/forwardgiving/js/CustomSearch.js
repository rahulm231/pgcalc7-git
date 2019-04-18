(function ($) {
	Drupal.behaviors.all_quorum_status = {
		attach: function(context, settings) {


			$(document).keypress(function(e){
			  if(e.which == 13 && $('#CSU-search-box').is(':focus')){
				e.preventDefault();
				$('#Search_Clayton_State_University').click(); 
			  }
			});
			$('#Search_Clayton_State_University').click(function(){
			  if($('#CSU-search-box').val() != ''){
				var searchText = $('#CSU-search-box').val();
				searchText = searchText.replace('"', '%22').replace("'", "%27").replace(' ', '%20');
				var url = window.location.protocol + '//' + window.location.hostname + '/search/node/' + searchText;
				window.location.href = url;
			  }
			});
	
			if(window.location.pathname=='/about-us'){
				$('#stamatsMenu a#ddrmenu_link_1').addClass('active');			
			}
			if(window.location.pathname=='/details'){
				$('#stamatsMenu a#ddrmenu_link_2').addClass('active');		
			}
			if(window.location.pathname=='/planning-opportunities'){
				$('#stamatsMenu a#ddrmenu_link_3').addClass('active');		
			}
			if(window.location.pathname=='/comparisons'){
				$('#stamatsMenu a#ddrmenu_link_4').addClass('active');		
			}
			if(window.location.pathname=='/case-studies'){
				$('#stamatsMenu a#ddrmenu_link_5').addClass('active');		
			}
			if(window.location.pathname=='/faqs'){
				$('#stamatsMenu a#ddrmenu_link_6').addClass('active');		
			}
			if(window.location.pathname=='/contact'){
				$('#stamatsMenu a#ddrmenu_link_7').addClass('active');		
			}

	
	   }
	}
})(jQuery);