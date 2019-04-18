//	Keep track if this page flags the user as human
isHuman		= false;
iFrameSet	= false;

//	Start monitoring for user events
startMonitoring();

//---------------------------------------------------------------------------------------------------------
//	Monitoring for user events
//---------------------------------------------------------------------------------------------------------
function startMonitoring()
{
	if (document.addEventListener)
	{ 
		window.onclick		= function(){ validateHuman() };	
		window.onkeyup		= function(){ validateHuman() };	
	
		//window.onmousemove	= function(){ validateHuman() };	
	} 
	
	else if (window.document.attachEvent)
	{ 
		window.document.attachEvent("onkeyup",	validateHuman);
		window.document.attachEvent("onclick",	validateHuman);
		//document.attachEvent("onmousemove", validateHuman);
	}
}

//---------------------------------------------------------------------------------------------------------
//	The tool to flag a session as being a human
//---------------------------------------------------------------------------------------------------------
function validateHuman(e)
{
	//	Already identified on this page
	if (isHuman)
	{
		return true;
	}

	//	Create the iframe to load the sethuman script
	if (!iFrameSet)
	{
		insertIframe = document.createElement("IFRAME");
		insertIframe.setAttribute("src", "/webos/blank.html");
		insertIframe.id = "setashuman";
		insertIframe.style.width = "0px";
		insertIframe.style.height = "0px";
		document.body.appendChild(insertIframe);
		iFrameSet = true;
	}
	
	//	Load the sethuman script
	if (document.getElementById('setashuman'))
	{
		var insertScript = document.createElement("script");
		insertScript.src = "/webos/turingtest_sethuman.js";
		insertScript.type="text/javascript";
		document.getElementsByTagName("head")[0].appendChild(insertScript); 
	
		//	Set them as human to avoid future calls
		isHuman = true;
	}
}	
