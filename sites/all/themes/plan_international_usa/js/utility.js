//---------------------------------------------------------------------------------------------------------
//	String functions
//---------------------------------------------------------------------------------------------------------
function str_trim( str )
{
	var resultStr = "";
	
	resultStr = str_trimleft(str);
	resultStr = str_trimright(resultStr);
	
	return resultStr;
} 

function str_trimleft( str )
{
	var resultStr = "";
	var i = len = 0;

	// Return immediately if an invalid value was passed in
	if (str+"" == "undefined" || str == null)	
	{
		return null;
	}

	// Make sure the argument is a string
	str += "";

	if (str.length == 0) 
	{
		resultStr = "";
	}
	else
	{	
  		// Loop through string starting at the beginning as long as there
  		// are spaces.
		len = str.length;
		
  		while ((i <= len) && (str.charAt(i) == " "))
		{
			i++;
		}

	   	// When the loop is done, we're sitting at the first non-space char,
 		// so return that char plus the remaining chars of the string.
  		resultStr = str.substring(i, len);
  	}

  	return resultStr;
} 

function str_trimright( str )
{
	var resultStr = "";
	var i = 0;

	// Return immediately if an invalid value was passed in
	if (str+"" == "undefined" || str == null)	
		return null;

	// Make sure the argument is a string
	str += "";
	
	if (str.length == 0) 
	{
		resultStr = "";
	}
	else
	{
  		// Loop through string starting at the end as long as there
  		// are spaces.
  		i = str.length - 1;
  		while ((i >= 0) && (str.charAt(i) == " "))
		{
 			i--;
		}
 			
 		// When the loop is done, we're sitting at the last non-space char,
 		// so return that char plus all previous chars of the string.
  		resultStr = str.substring(0, i + 1);
  	}
  	
  	return resultStr;  	
} // end TrimRight


function str_replacechar( findchar, replacestring, searchstring )
{
	newstring = "";
	for ( c=0; c < searchstring.length ; c++ )
	{
		string_char = searchstring.charAt( c );
		if (  string_char == findchar )
		{
			newstring = newstring + replacestring;
		}
		else
		{
			newstring = newstring + string_char;
		}
	}

	return newstring;
}

//---------------------------------------------------------------------------------------------------------
//	Window functions
//---------------------------------------------------------------------------------------------------------
function openWindow(url,name,sizeX,sizeY)
{
	if ( sizeX == 0 )
	{
		//	Top corner
		leftpos	= 10000;
		toppos	= 10000;
		
		//	Define the window size
		heightVar = '';
		widthVar  = '';
	}
	
	else
	{
		//	Center the window
		leftpos	= (screen.width)  ? (screen.width-sizeX)/2 : 100;
		toppos	= (screen.height) ? (screen.height-sizeY)/2 : 100;

		//	Define the window size
		widthVar  = 'width=' + sizeX + ',';
		heightVar = 'height=' + sizeY + ',';
	}

	//	Open the window
	winobject	= window.open(url,name,"menubar=0,statusbar=0,scrollbars=1,toolbar=0,location=0," + widthVar + heightVar + "left=" + leftpos + ",top=" + toppos);
	winobject.focus();
}

//*********************************************************************************************************
//	Function:		setOpenerFieldValue()
//	What It Does:	Set a given field value ( element id ) in an opening window's document
//*********************************************************************************************************
function setOpenerFieldValue( field_element_id, field_value )
{
	if ( !field_element_id )
	{
		return false;
	}

	//	Make sure the opener is opened
	if ( !isOpenerWindowOpen() )
	{
		//	Not opened
		return false;
	}

	//	Get the field object by it's element id
	field_object		= opener.document.getElementById( field_element_id );

	if ( !field_object )
	{
		return false;
	}

	//	Set the value
	field_object.value	= field_value;
	return true;
}

//*********************************************************************************************************
//	Function:		getOpenerFieldValue()
//	What It Does:	Get a given field value ( element id ) from the opening window's document
//					If not found a null value is returned
//*********************************************************************************************************
function getOpenerFieldValue( field_element_id )
{
	if ( !field_element_id )
	{
		return null;
	}

	//	Make sure the opener is opened
	if ( !isOpenerWindowOpen() )
	{
		//	Not opened
		return null;
	}

	//	Get the field object by it's element id
	field_object		= opener.document.getElementById( field_element_id );

	if ( !field_object )
	{
		return null;
	}

	//	Get the value
	return field_object.value;
}

//*********************************************************************************************************
//	Function:		resizeAndCenterWindow()
//	What It Does:	Resize and center the current window using the available height and width of the screen
//					which takes into account the "start bar" height and width
//*********************************************************************************************************
function resizeAndCenterWindow( sizeX, sizeY )
{
	//	Resize the window
	window.resizeTo( sizeX, sizeY );

	//	Center the window
	leftpos	= (window.screen.availWidth)	? (window.screen.availWidth-sizeX)/2 : 100;
	toppos	= (window.screen.availHeight)	? (window.screen.availHeight-sizeY)/2 : 100;

	window.moveTo( leftpos, toppos );
}

//*********************************************************************************************************
//	Function:		focusOpenerWindow()
//	What It Does:	Bring the opener window out to the user's perspective
//*********************************************************************************************************
function focusOpenerWindow()
{
	if ( !isOpenerWindowOpen() )
	{
		return false;
	}

	opener.focus();
	return true;
}

//*********************************************************************************************************
//	Function:		isOpenerWindowOpen()
//	What It Does:	Is the opener window still open?
//*********************************************************************************************************
function isOpenerWindowOpen()
{
	if ( opener == null )
	{
		return false;
	}

	if ( opener.closed )
	{
		return false;
	}

	if ( typeof opener.document == 'unknown' )
	{
		return false;
	}

	return true;
}

//---------------------------------------------------------------------------------------------------------
//	Validation functions
//---------------------------------------------------------------------------------------------------------
function is_valid_date( testdate )
{
	testdate = new Date( testdate );
	return ( testdate != 'NaN' )
}

//---------------------------------------------------------------------------------------------------------
//	Swap Image source
//---------------------------------------------------------------------------------------------------------
function changeImgSrc( obj, source )
{
	obj	= document.getElementById(obj);
	obj.setAttribute('src', source );
}

//---------------------------------------------------------------------------------------------------------
//	Keep a page scrolled to the bottom
//---------------------------------------------------------------------------------------------------------
function scrollIt()
{
   newHeight	= document.body.scrollHeight;

	//	Microsoft hack
	if (document.compatMode && document.compatMode != "BackCompat")
	{
	  document.documentElement.scrollTop	= newHeight;
	}
	else
	{
	   document.body.scrollTop	= newHeight;
	}

	keepscrolling	= setTimeout( "scrollIt()", 1000 );
}

//---------------------------------------------------------------------------------------------------------
//	Start the scroller
//---------------------------------------------------------------------------------------------------------
function startAutoScroll()
{
	keepscrolling	= setTimeout( "scrollIt()", 1000 );
}
//---------------------------------------------------------------------------------------------------------
//	Stop scrolling (allow user to use their mouse when page finished loading)
//---------------------------------------------------------------------------------------------------------
function stopAutoScroll()
{
	clearTimeout( keepscrolling );
}

//*********************************************************************************************************
//	Progress bar functions
//*********************************************************************************************************
function updateProgressBar( bar_id, percent, progress, total, title )
{
	progress_bar		= bar_id + '-bar';
	progress_title		= bar_id + '-title';
	progress_activity	= bar_id + '-activity';

	if ( title )
	{
		document.getElementById( progress_title ).innerHTML	= unescape( title );
	}

	document.getElementById( progress_activity ).innerHTML	= progress + ' of '  + total + ' (' + percent + '%)';
	document.getElementById( progress_bar ).style.width		= ( 2 * percent );
}

//*********************************************************************************************************
//	Generates a unique ID
//*********************************************************************************************************
function GenUniqueID()
{
	var dateValue = new Date();
    var timestamp = (dateValue.getTime());
	
	return timestamp;
}

//*********************************************************************************************************
//	Copy an HTML element to the clipboard. 
//*********************************************************************************************************
function copyElementToClipboard( element_id )
{
	if ( !document.body || !document.body.createTextRange )
	{
		return;
	}

	element = document.getElementById( element_id );

	if ( !element )
	{
		return;
	}

	rng = document.body.createTextRange();
	rng.moveToElementText( element );
	rng.execCommand("Copy");
}

//*********************************************************************************************************
//	Copy an string to the clipboard. 
//*********************************************************************************************************
function copyStringToClipboard( textToCopy )
{

	document.designMode = "On";
	var sel = window.getSelection();
	
	
	
	var tempNode = document.createElement("div"); 
	tempNode.innerHTML = textToCopy; 
	document.body.appendChild(tempNode);
	
	
	
	if (sel.setBaseAndExtent) 
	{
		sel.setBaseAndExtent(tempNode, 0, tempNode, textToCopy.length); 
	} 
	
	else if (sel.addRange) 
	{
		var range = document.createRange(); 
		range.setStart(tempNode, 0); 
		range.setEnd(tempNode, 1);
	
		sel.removeAllRanges(); 
		sel.addRange(range); 
	}
	
	
	try 
	{
		document.execCommand("copy", false, null); 
		document.body.removeChild(tempNode); 
	} 
	
	catch (ex) 
	{
		document.body.removeChild(tempNode); 
		window.prompt("textToCopy:", textToCopy); 
	}
	
	document.designMode = "Off";
}








function dbgDump( collection, prefix )
{
	msg		= '';
	counter = 0;

	for ( var name in collection )
	{
		if ( prefix )
		{
			if ( name.substring(0, prefix.length) != prefix )
			{
				continue;
			}
		}

		msg += name + " = " +  collection[name] + "\r\n";

		if ( counter == 50 )
		{
			alert(msg );
			msg = '';
			counter = 0;
		}
		counter++;
	}

	if ( counter < 50 )
	{
		alert( msg );
	}
}
