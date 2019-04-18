// Flag for whether or not to automatically call the print function
var gAutoPrint = true;

var printReadyElem;
var printWin ;

printableIframeID = "iframe";


function printSpecial(print_id, design_id)
{
	if (document.getElementById != null)
	{
		var html = '<HTML>\n<HEAD>\n';
		
		if (document.getElementsByTagName != null)
		{
			var headTags = document.getElementsByTagName("head");
			if (headTags.length > 0)
			{
				html += headTags[0].innerHTML;
			}
		}
		
        //Munson customization: pull logos from upload directory
		if (design_id != null)
		    html += '\n</HEAD>\n<BODY style=\"background-color: #FFFFFF; background-image: none; text-align:left;\">\n<p><img src="/upload/images/Logos/HomeLogo' + design_id + '.png"><hr size="1" color="#CCCCCC">\n';
        else		   
		    html += '\n</HEAD>\n<BODY style=\"background-color: #FFFFFF; background-image: none; text-align:left;\">\n<p><hr size="1" color="#CCCCCC">\n';
		//End Munson customization
		
		if (document.getElementById(printableIframeID) != null)
		{
		    printReadyElem = document.getElementById(printableIframeID).contentWindow.document.body;
		}
		else
		{
		    printReadyElem = document.getElementById(print_id);
		}

		if (printReadyElem != null)
		{
			html += printReadyElem.innerHTML;
			html += '\n</p>';
		}
		else
		{
			alert("Could not find the printable section");
			return;
		}	
		html += '\n</BO' + 'DY>\n</HT' + 'ML>';
				
		
		
		printWin = window.open("","printSpecial","height=500,width=600,screenX=0,left=0,screenY=0,top=0,channelmode=0,dependent=0,directories=0,fullscreen=0,location=0,menubar=0,resizable=0,scrollbars=1,status=0,toolbar=0");
		printWin.document.open();
		printWin.document.write(html);
		printWin.document.close();
		if (gAutoPrint)
		{
		    //Munson customization: add delay if IE, Opera, or Netscape
			var objBrowse = window.navigator;
			if (objBrowse.appName == "Opera" || objBrowse.appName == "Netscape"
				|| objBrowse.appName == "Microsoft Internet Explorer") {	
				setTimeout('printSpecialWindow()',800);
			}
			else
			{
		    printWin.print();
		    printWin.close();
		}
            //End Munson customization
		}
	}
	else
	{
		alert("Sorry, the print feature is only available in modern browsers.");
	}
}

function printSpecialWindow()
{
	printWin.print();
	printWin.close();
}