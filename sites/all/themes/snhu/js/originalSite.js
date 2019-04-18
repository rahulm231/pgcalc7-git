/* OI - Reggie Brown Custom Javascript
====================================================================
Client: SNHU
Author(s): Reggie Brown
Product(s): BBNC
Created: 02/09/2016
Updated: mm/dd/yyyy


CHANGELOG
====================================================================
mm/dd/yyyy: 
02/09/2016: Document Creation

INSTRUCTIONS
====================================================================
1. Include this file at the layout level on the very last line.
2. Functions should be placed in pageInit, pageRefresh or pageLoad, respectively.
3. Every custom function should have its code wrapped in a conditional, checking for the existence (.length !==0) of the specific part being altered.
*/


var OdysseyInteractive = OdysseyInteractive || {

	// update these values when updating changelog
	Config: {
		version: 1.1,
		updated: '08/24/2015',
		isEditView: !!window.location.href.match('pagedesign')
	},

	Defaults: {
		//rootpath: BLACKBAUD.api.pageInformation.rootPath,
		//pageId: BLACKBAUD.api.pageInformation.pageId
	},

	Methods: {
		// all functions which should run instantly
		pageInit: function () {
			// runs on partial page refresh
			/*
			Sys.WebForms.PageRequestManager.getInstance().add_pageLoaded(function () {
				OdysseyInteractive.Methods.pageRefresh();
			});*/
			$(document).ready(function () {
				OdysseyInteractive.Methods.pageLoad();
			});
		},
		// runs on partial page refresh
		pageRefresh: function () {
			OdysseyInteractive.Methods.mobileMenu();
			OdysseyInteractive.Methods.addClassToRequiredFields();
		},

		// runs on full page load
		pageLoad: function () {

			//Responsive PageLoad scripts
			$(window).resize(function() {
			});
		},

		mobileMenu: function () {
			var sandwichHTML = '<div class="mobile-nav-icon"><span></span><span></span><span></span><span></span></div>';
			$('#headerBanner').append(sandwichHTML);
		},
		
		addClassToRequiredFields: function () {
			if ( $('div[id$="formWizard"]').length ) {
				$('input, select, textarea, table').each(function () {
					// for each one, test if it's a required field
					if ( (($(this).next('span').hasClass('BBFormRequiredFieldMarker')) && ($(this).next('span').attr('style') != 'display:none;')) ) {
						$(this).addClass('required');
						if ($(this).attr('id').indexOf('cboYear') >= 0) {
							// do nothing... it's the year ddl in credit card month/year
						} else if ($(this).attr('id').indexOf('cboMonth') >= 0) {
							$(this).closest('table').parent().prev('td[id$="ExpiryLbl"]').children('label').eq(0).addClass('required');
						} else if ($(this).prev('label').length > 0) {
							$(this).prev('label').addClass('required');
						} else if ($(this).prev('div').children('label').length > 0) {
							$(this).prev('div').children('label').eq(0).addClass('required');
						} else {
							$(this).parent().prev('td').children('label').eq(0).addClass('required');
						}
					}
				});
			}
		}
	}
};

//Run Global Scripts

OdysseyInteractive.Methods.pageInit();