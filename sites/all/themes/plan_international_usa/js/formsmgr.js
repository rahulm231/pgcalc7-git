CustomCommands = new Array();

function selectFormEditAction( se_id, cmd )
{
//---------------------------------------------------------------------------------------------------------
//	Get the action list information
//---------------------------------------------------------------------------------------------------------
	se_obj				= document.getElementById( se_id );
	form_type			= se_obj.getAttribute('formtype');
	page_id				= se_obj.getAttribute('pageid');
	uid					= se_obj.getAttribute('uid');
	target				= "se_details_" + form_type;
	usescrollbars		= '';
	
	//	Is the edit window already opened?
	//	If so focus it
	if ( contentDetailsFocus( target ) )
	{
		return;
	}
	
//---------------------------------------------------------------------------------------------------------
//	Determine if height and width needed
//---------------------------------------------------------------------------------------------------------
	switch ( cmd )
	{
		case "X":
			listview_width	= 400;
			listview_height = 400;
		break;
		
		case "C":
			listview_width	= 1000;
			listview_height = 600;
		break;
		
		case "E":
			listview_width	= 700;
			listview_height = 650;
		break;
		
		default:
			listview_width	= 0;
			listview_height = 0;
	}

//---------------------------------------------------------------------------------------------------------
//	Process the action
//---------------------------------------------------------------------------------------------------------
	//	Is the user doing an edit?
	switch( cmd )
	{
		//	All submissions
		case 'V':
			url = "/formsmgr/formfinder_listview.php?fby=t_" + form_type;
		break;

		//	Conversions
		case 'C':
			url = "/consolemgr/view.php?app=trackingmgr&view=ConversionSource&parms=%7B%22type%22%3A%22" + form_type + "%22%2C%22page%22%3A" + page_id + "%7D";
		break;
		
		//	Export
		case 'X':
			url = "/formsmgr/formsmgr_getparms.php?uid=" + uid;
		break;
		
		//	Settings
		case 'E':
			url = "/formsmgr/settings_getparms.php?uid=" + uid;
		break;

		//	Needs to be confirmed
		default:
			url = "";
		break;
	}

	//	Is there a custom command set for this action?
	if (CustomCommands[cmd])
	{
		url = CustomCommands[cmd];
	}

	//	Open the details window
	contentDetails( url, target, listview_width, listview_height, '0' );
}


//*********************************************************************************************************
//	Function: toggleSelectEdit()
//
//*********************************************************************************************************
var last_se_id = '';
var timeout_id = 0;

function toggleFormSelectEdit( se_obj, form_id )
{
//---------------------------------------------------------------------------------------------------------
//	Get the select edit list
//---------------------------------------------------------------------------------------------------------
	se_list_obj	= document.getElementById( 'se' );

//---------------------------------------------------------------------------------------------------------
//	
//---------------------------------------------------------------------------------------------------------
	//	No article id?
	if ( !form_id )
	{
		//	Celar any timeout if one active
		if ( timeout_id )
		{
			clearTimeout( timeout_id );
			timeout_id = 0;
		}

		//	Nope, is it being displayed?
		if ( se_list_obj.style.visibility == 'visible' );
		{
			//	Yep, close it
			se_list_obj.style.visibility = 'hidden';
			last_se_id  = '';
		}

		//	Do not allow zero article id
		return;
	}

//---------------------------------------------------------------------------------------------------------
//	Get the select edit list object, one for all select edit links
//---------------------------------------------------------------------------------------------------------
	se_id	= 'se_' + form_id;

//---------------------------------------------------------------------------------------------------------
//	Did the user click on another select edit while one was open for another article
//---------------------------------------------------------------------------------------------------------
	if ( se_id != last_se_id ) 
	{
		//	Another SE for article clicked?
		if ( se_list_obj.style.visibility == 'visible' )
		{
			//	Yep, open it
			se_list_obj.style.visibility = 'hidden';
		}

		//	Set the last se id clicked
		last_se_id = se_id;
	}

//---------------------------------------------------------------------------------------------------------
//	Let's setup the list for the select edit
//---------------------------------------------------------------------------------------------------------
	//	Is the pick list already displayed?
	if ( se_list_obj.style.visibility == 'hidden' )
	{

		//	Create the entries in the se list
		html		= '';
		cmds_string = se_obj.getAttribute('cmds');
		cmds_array	= cmds_string.split(',');
		vheight		= 0;

        // If edit is the only command available,
        // go ahead and run the action for it
        if(cmds_string === 'E')
        {
            selectEditAction(se_id, 'E');
            return;
        }

		//	Nope,  then show it
		//	Position the list below the button clicked
		se_list_obj.style.left = SE_getOffsetLeft( se_obj ) + 'px';
		se_list_obj.style.top  = ( SE_getOffsetTop( se_obj ) + se_obj.offsetHeight ) + 'px';
		se_list_obj.style.visibility = 'visible';

		for ( idx in cmds_array )
		{
			cmd		= cmds_array[idx];
			desc	= getFormCmdDesc( cmd );			
			html	+= '<li><a href="#" onclick="selectFormEditAction(\'' + se_id + '\',\'' + cmd + '\');return false;">' + desc + '</a></li>'
			vheight	+= 21;
		}
		
		//	Set the width and height
		se_list_obj.style.pixelWidth	= 100;
		se_list_obj.style.height		= vheight + 'px';

		se_list_obj.innerHTML		= html;

		//	If user doesn't select something in 5 seconds
		//	Then close the list
		if ( timeout_id )
		{
			clearTimeout( timeout_id );
			timeout_id = 0;
		}
		timeout_id = setTimeout("toggleSelectEdit(0)", 5000); 
	}
	else
	{
		if ( timeout_id )
		{
			clearTimeout( timeout_id );
			timeout_id = 0;
		}
		//	Already shown so hide it.
		se_list_obj.style.visibility = 'hidden';
	}
}

//*********************************************************************************************************
//	Function: getCmdDesc()
//
//*********************************************************************************************************
function getFormCmdDesc( cmd )
{
	switch( cmd )
	{
		case 'V':
			desc = 'Submissions';
		break;

		case 'C':
			desc = 'Conversions';
		break;

		case 'X':
			desc = 'Export Forms';
		break;

		case 'E':
			desc = 'Settings';
		break;

		default:
			desc = '';
	}

	return desc;
}

function viewpage( link )
{
	if (link)
	{
		window.open( link );
	}
}	
	validationRunning = false;

//*********************************************************************************************************
//	Function: makeValidationCall()
//				Compile the fields, submit them to the validator
//*********************************************************************************************************
	function makeValidationCall( form_name )
	{
	//---------------------------------------------------------------------------------------------------------
	//	Do not resubmit if a validation is pending
	//---------------------------------------------------------------------------------------------------------
		if (validationRunning)
		{
			return;
		}
		
		validationRunning = true;

	//---------------------------------------------------------------------------------------------------------
	//	Reset the display of previous error reports
	//---------------------------------------------------------------------------------------------------------
		clearFieldErrors( form_name );
		
	//---------------------------------------------------------------------------------------------------------
	//	Make sure the form exists
	//---------------------------------------------------------------------------------------------------------
		formObj = document.forms[form_name];
		
		if (!formObj)
		{
			validationDone();
		}

	//---------------------------------------------------------------------------------------------------------
	//	Get the form parameters as a string
	//---------------------------------------------------------------------------------------------------------
		postParms = compileAllFieldValues( formObj );

		if (!postParms)
		{
			validationDone();
		}

	//---------------------------------------------------------------------------------------------------------
	//	Submit the validation request via an ajax call
	//---------------------------------------------------------------------------------------------------------
		postURL = '/formsmgr/validate.php';
		
		var xmlhttp =  initHTTPObject();
		xmlhttp.open('POST', postURL, true );
		xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	//	xmlhttp.setRequestHeader("Content-length", postParms.length);
	//	xmlhttp.setRequestHeader("Connection", "close");
		
		xmlhttp.onreadystatechange = function() 
		{ 
			if (xmlhttp.readyState == 4 && xmlhttp.status == 200 ) 
			{ 
				processValidationResponse( form_name, xmlhttp.responseText ) 
			}
		};

		xmlhttp.send(postParms);
	}

//*********************************************************************************************************
//
//	Function: processValidationResponse()
//				Response handler for makeValidationCall()
//*********************************************************************************************************
	function processValidationResponse( form_name, response )
	{
		validationRunning = false;

	//---------------------------------------------------------------------------------------------------------
	//	Init
	//---------------------------------------------------------------------------------------------------------
		found_errors = new Array();
		form_name	 = form_name.toString();

	//---------------------------------------------------------------------------------------------------------
	//	Was a response returned from the validator?
	//---------------------------------------------------------------------------------------------------------
		if (!response)
		{
			//	No, submit the form
			submitForm(form_name);
			return;
		}
		
	//---------------------------------------------------------------------------------------------------------
	//	Turn the response into a js array
	//---------------------------------------------------------------------------------------------------------
		eval( response );
		
	//---------------------------------------------------------------------------------------------------------
	//	Were errors returned?
	//---------------------------------------------------------------------------------------------------------
		if (!found_errors[0])
		{
			//	No, submit the form
			submitForm(form_name);
			return;
		}

	//---------------------------------------------------------------------------------------------------------
	//	Loop through the errors
	//---------------------------------------------------------------------------------------------------------
		error_top		= 0;

		for (i=0; i<=(found_errors.length-1); i++)
		{
			errornumber  = i+1;
			errormessage = found_errors[i][0];
			fieldname	 = found_errors[i][1];
			fieldid		 = found_errors[i][2];
			showError( form_name, errornumber, errormessage, fieldname, fieldid );

			this_error_top	= $('#fieldblock-' + found_errors[i][2] ).offset().top - 100;

			if( error_top == 0 || this_error_top < error_top )
			{
				error_top	= this_error_top;
			}

		}
	
	//---------------------------------------------------------------------------------------------------------
	//	Anchor to first error
	//---------------------------------------------------------------------------------------------------------
		$('html, body').animate({scrollTop: error_top}, 200);

	//---------------------------------------------------------------------------------------------------------
	//	All done
	//---------------------------------------------------------------------------------------------------------
		validationDone();
	}	
	
//*********************************************************************************************************
//
//	Function: showError()
//				
//*********************************************************************************************************
	function showError( form_name, errornumber, errormessage, fieldname, fieldid )
	{
	//---------------------------------------------------------------------------------------------------------
	//	Get the error placeholders
	//---------------------------------------------------------------------------------------------------------
		mainErrorsContainer = $("#"+form_name).find("#formerrors" + form_name );
		fieldBlockContainer = $("#"+form_name).find("#fieldblock-" + fieldid );
		fieldErrorContainer = $(fieldBlockContainer).find(".fielderror");
				
	//---------------------------------------------------------------------------------------------------------
	//	Is there a placeholder specifically for this field's error?
	//---------------------------------------------------------------------------------------------------------
		if (fieldErrorContainer)
		{
			fieldErrorContainer.html( errormessage );
		}
		
	//---------------------------------------------------------------------------------------------------------
	//	Is there a master placeholder for all the errors?
	//---------------------------------------------------------------------------------------------------------
		else if (mainErrorsContainer)
		{
			if (fieldname)
			{
				msg = '<a href="javascript:document.forms[\'' + form_name + '\'][\'fields[' + fieldname + ']\'].focus()">' + errormessage + '</a><br>';
			}

			else
			{
				msg = errormessage + '<br>';
			}

			divContents	= mainErrorsContainer.html();
			mainErrorsContainer.html( divContents + msg );
		}

	//---------------------------------------------------------------------------------------------------------
	//	Otherwise, just alert the error
	//---------------------------------------------------------------------------------------------------------
		else 
		{
			alert( errormessage );
		}

	//---------------------------------------------------------------------------------------------------------
	//	If the field ws specified and it has a wrapper div, change its class
	//---------------------------------------------------------------------------------------------------------
		if (fieldBlockContainer)
		{
			fieldBlockContainer.addClass( 'fieldblock-error' );
		}

	//---------------------------------------------------------------------------------------------------------
	//	Show in console
	//---------------------------------------------------------------------------------------------------------
		console.log( fieldname + " field error: " + errormessage );

	}

//*********************************************************************************************************
//
//	Function: submitForm()
//				
//*********************************************************************************************************
	function submitForm( formname )
	{
	//---------------------------------------------------------------------------------------------------------
	//	Make sure the form exists
	//---------------------------------------------------------------------------------------------------------
		formObj = document.forms[formname];

	//---------------------------------------------------------------------------------------------------------
	//	Submit the form
	//---------------------------------------------------------------------------------------------------------
		if (formObj)
		{
			var preprocess = $(formObj).find('.submitPreProcess').val();
			
			if (preprocess) {
				var preprocessResult = window[preprocess](formname);

				if (preprocessResult != true) {
					return false;
				}
			}

			if ( $('#ajaxsubmit', $(formObj) ).val() == 1 ) {
				var _formObj = formObj;

				var iframe = $('<iframe style="display:none;" id="cmsformpost" name="postform"></iframe>');

	        	$( "body" ).append(iframe); 
	        	$(formObj).attr( 'target', 'postform' );
	    	    formObj.submit();
	 	        iframe.load(function( event ){  

	 	        	var iframeContents = $( event.currentTarget ).contents().find("body").html();
	 	        	$('#cmsformpost').remove();

	 	        	if (iframeContents)
	 	        	{
						$('html, body').animate({
							scrollTop: $(_formObj).offset().top - 200
						}, 200, function(){
							$(_formObj).animate({
								opacity: 0 
							}, 300, function(){
								$(_formObj).replaceWith( iframeContents ); 
							});
						});
	 	        	}

	 	        });
	 	    } else { 
	 	    	setTimeout( "formObj.submit();", 1 );
	 	    }
			return;
		}

	//---------------------------------------------------------------------------------------------------------
	//	All done
	//---------------------------------------------------------------------------------------------------------
		validationDone();
	}

//*********************************************************************************************************
//
//	Function: validationDone()
//	
//*********************************************************************************************************
	function validationDone()
	{
		validationRunning = false;
	}

//*********************************************************************************************************
//
//	Function: clearFieldErrors()
//	
//*********************************************************************************************************
	function clearFieldErrors( formname )
	{
	//---------------------------------------------------------------------------------------------------------
	//	Clear the main error container
	//---------------------------------------------------------------------------------------------------------
		mainErrorsContainer = document.getElementById( 'formerrors' + formname );
		
		if (mainErrorsContainer)
		{
			mainErrorsContainer.innerHTML = '';
		}
	
	//---------------------------------------------------------------------------------------------------------
	//	Get all the elements of the form
	//---------------------------------------------------------------------------------------------------------
		fielderrorElements	= getElementsByClass( 'fielderror' );
		fieldblockElements	= $(".fieldblock-error");

	//---------------------------------------------------------------------------------------------------------
	//	Clear the field errors
	//---------------------------------------------------------------------------------------------------------
		if (fielderrorElements)
		{
			for(i=0; i<fielderrorElements.length; i++)
			{
				fielderrorElements[i].innerHTML = '';
			}
		}

	//---------------------------------------------------------------------------------------------------------
	//	Clear the fieldblock styling
	//---------------------------------------------------------------------------------------------------------
		if (fieldblockElements)
		{
			for(i=0; i<fieldblockElements.length; i++)
			{
				$(fieldblockElements[i]).removeClass("fieldblock-error");
			}
		}
	}
	
//*********************************************************************************************************
//
//	Function: compileAllFieldValues()
//	Return all the name/value pairs of a form, to be sent via HTTP POST
//
//*********************************************************************************************************
	function compileAllFieldValues( form )
	{
		valuestring = '';
		
	//---------------------------------------------------------------------------------------------------------
	//	Look at all the form fields
	//---------------------------------------------------------------------------------------------------------
		for (var e = 0; e < form.elements.length; e++) 
		{
		//---------------------------------------------------------------------------------------------------------
		//	Reset the values
		//---------------------------------------------------------------------------------------------------------
			var el    = form.elements[e];
			var name  = '';
			var value = '';

		//---------------------------------------------------------------------------------------------------------
		//	Parse a radio button
		//---------------------------------------------------------------------------------------------------------
			if (el.type == 'radio') 
			{
				if (el.checked)
				{
					name  = el.name;
					value = el.value;
				}
			}
		
		//---------------------------------------------------------------------------------------------------------
		//	Parse a checkbox
		//---------------------------------------------------------------------------------------------------------
			else if (el.type == 'checkbox') 
			{
				name  = el.name;
				value = el.checked;
			}
		
		//---------------------------------------------------------------------------------------------------------
		//	Parse al other fields
		//---------------------------------------------------------------------------------------------------------
			else
			{ 
				name  = el.name;
				value = el.value;
			}
		
		//---------------------------------------------------------------------------------------------------------
		//	Record the value
		//---------------------------------------------------------------------------------------------------------
			valuestring += escape( name ) + '=' + escape( value ) + '&';	
		}
		
		return valuestring;
	}
	
//*********************************************************************************************************
//
//	Function: initHTTPObject()
//	Initialize a new HTTP object
//
//*********************************************************************************************************
	function initHTTPObject() 
	{
		var xmlhttp;
		
		try {
		xmlhttp = new ActiveXObject("Msxml2.XMLHTTP");
		} catch (e) {
			try {
			xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
			} catch (E) {
				xmlhttp = false;
			}
		}

		if (!xmlhttp && typeof XMLHttpRequest != 'undefined') {
			try {
				xmlhttp = new XMLHttpRequest();
			} catch (e) {
				xmlhttp = false;
			}
		}

		return xmlhttp;
	}
	
//*********************************************************************************************************
//
//	Function: getElementsByClass()
//	Gets an array of elements by their class name
//
//*********************************************************************************************************
	function getElementsByClass(searchClass,node,tag) 
	{
		var classElements = new Array();
		if ( node == null )
			node = document;
		if ( tag == null )
			tag = '*';
		var els = node.getElementsByTagName(tag);
		var elsLen = els.length;
		var pattern = new RegExp("(^|\\\\s)"+searchClass+"(\\\\s|$)");
		for (i = 0, j = 0; i < elsLen; i++) {
			if ( pattern.test(els[i].className) ) {
				classElements[j] = els[i];
				j++;
			}
		}
		return classElements;
	}
