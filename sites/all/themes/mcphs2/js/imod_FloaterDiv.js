function imod_FloaterDiv(sPrmTitleClass, sPrmTextClass, iPrmHideDelay, bPrmDisableAutoHide, sPrmTitleStyle, sPrmTextStyle) {
	this.Height = 0;
	this.Width = 0;
	this.MinHeight = 0;
	this.MinWidth = 0;
	this.MaxHeight = 0;
	this.MaxWidth = 0;

	this.AddContent = AddContent;
	this.Show = Show;
	this.Hide = Hide;
	
	this.SetOnShow = function(delegate) {
		OnShow = delegate;
	};
    this.SetOnHide = function(delegate) {
		OnHide = delegate;
	};
    var OnShow = null;
	var OnHide = null;
	
	var Content = {};
	var divWrapper = document.createElement("div");
	var divMain = document.createElement("div");
	var loaded = false;
	//var divTitle = document.createElement("div");

	var CenterInterval = null;

	divWrapper.style.display = "none";
	divWrapper.style.position = "absolute";
	
	var frmShield = null;
	if (window.attachEvent != null) {
		frmShield = document.createElement("iframe");
		frmShield.src = "javascript:false;";
		divWrapper.appendChild(frmShield);
		imod_SetOpacity(frmShield, 0);
		frmShield.style.zIndex = -1;
		frmShield.width = "0px";
		frmShield.height = "0px";
		frmShield.style.display = "none";
		frmShield.style.position = "absolute";
		
	}
	divWrapper.appendChild(divMain);
	
	var tableTitle = document.createElement("table");
	tableTitle.width = "100%";
	tableTitle.border = 0;
	tableTitle.cellPadding = 0;
	tableTitle.cellSpacing = 0;
	var rowTitle = tableTitle.insertRow(0);
	var cellTitle = rowTitle.insertCell(0);
	var cellClose = rowTitle.insertCell(1);
	var divClose = document.createElement("div");
	cellClose.appendChild(divClose);

	cellClose.className = "FloaterDivTitleClose";

	divClose.onclick = Hide;
	divClose.title = "Hide";
	
	var divText = document.createElement("div");
	var ContentTimer = 0;
	var HideDelay = iPrmHideDelay;
	var DisableAutoHide = ((bPrmDisableAutoHide != null) ? bPrmDisableAutoHide : false);
		
	if (HideDelay == null || HideDelay < 1)
		HideDelay = 250;
	
	divMain.appendChild(tableTitle);
	divMain.appendChild(divText);
	divText.style.overflow = "auto";
	divWrapper.style.zIndex = 999999;
	divMain.style.zIndex = 999999;
	if (sPrmTitleClass != null && sPrmTitleClass.length > 0) {
		if (sPrmTitleClass.indexOf(":") >= 0) {
			tableTitle.style.cssText = sPrmTitleClass;
			cellTitle.style.cssText = sPrmTitleClass;
		}
		else {
			//divTitle.className = sPrmTitleClass;
			tableTitle.className = sPrmTitleClass;
			cellTitle.className = sPrmTitleClass;
		}
	}
	if (sPrmTextClass != null && sPrmTextClass.length > 0) {
		if (sPrmTextClass.indexOf(":") >= 0)
			divText.style.cssText = sPrmTextClass;
		else 
			divText.className = sPrmTextClass;
	}
	if (sPrmTitleStyle != null && sPrmTitleStyle.length > 0) {
		//divTitle.style.cssText = sPrmTitleStyle;
		tableTitle.style.cssText = sPrmTitleStyle;
		cellTitle.style.cssText = sPrmTitleStyle;
	}
	if (sPrmTextStyle != null && sPrmTextStyle.length > 0)
		divText.style.cssText = sPrmTextStyle;
		
	if (sPrmTitleClass == null && sPrmTitleStyle == null) {
		//divTitle.className = "FloaterDivTitle";
		tableTitle.className = "FloaterDivTitle";
		cellTitle.className = "FloaterDivTitle";
	}
	if (sPrmTextClass == null && sPrmTextStyle == null)
		divText.className = "FloaterDivText";
		
	divMain.className = "FloaterDivMain";
	
	
	cellTitle.style.border = "none";
	cellTitle.style.padding = 0;
	cellTitle.style.margin = 0;
	cellTitle.style.width = "auto";
	cellTitle.style.height = "auto";

	divText.style.height = "auto";

	if (divMain.style.MozBoxSizing != null) {
		divMain.style.MozBoxSizing = "border-box";
		divText.style.MozBoxSizing = "border-box";
	}

	if (! DisableAutoHide) {
		divMain.onmouseover = StopHide;
		divMain.onmouseout = Hide;
	}
	
	
	//setTimeout(Init, 1);

	
	if (window.loaded)
		Load();
	else
		imod_AddHandler(window, "load", Load);
	
	
	
	function Load() {
		document.body.appendChild(divWrapper);
		loaded = true;
	}	
	
	function Init() {
		document.body.appendChild(divWrapper);
		
		
	}
	
	imod_AddHandler(window, "unload", Unload);
	
	function Unload() {
		Content = null;
		divWrapper = null;
		divMain = null;
		frmShield = null;
		tableTitle = null;
		rowTitle = null;
		cellTitle = null;
		cellClose = null;
		imgClose = null;
		divText = null;
		imod_RemoveHandler(window, "unload", Unload);
	}
	
	function AddContent(sPrmKey, sPrmTitle, sPrmText, oPrmElement) {
		if (Content[sPrmKey] == null)
			Content[sPrmKey] = {};
		Content[sPrmKey].Title = sPrmTitle;
		Content[sPrmKey].Text = sPrmText;
		if (oPrmElement != null) {
			oPrmElement.onmouseover = function() { Show(sPrmKey, oPrmElement); };
			if (! DisableAutoHide)
				oPrmElement.onmouseout = Hide;
		}
	}

	function Show(sPrmKey, oPrmAdjacent) {
		if (! loaded) Load(); //Just in case they create the object in the window load and the load event does not trigger and window.loaded wasn't set yet
		clearTimeout(ContentTimer);
		divWrapper.style.visibility = "hidden";
		divWrapper.style.display = "block";

		var bScrollH = false;
		var bScrollV = false;

		if (Content[sPrmKey] != null) {
			cellTitle.innerHTML = Content[sPrmKey].Title;
			divText.innerHTML = Content[sPrmKey].Text;
		}

		if (this.Width != null && this.Width > 0) {
			divText.style.width = this.Width + "px";
			bScrollH = true;
		}
		if (this.Height != null && this.Height > 0) {
			divText.style.height = this.Height + "px";
			bScrollV = true;
		}
		else {
		    divMain.style.height = "auto";
		}

        if (this.MaxWidth != null && this.MaxWidth > 0) {
            if (navigator.userAgent.indexOf('MSIE 7.0') > -1) {
                divMain.style.width = this.MaxWidth + "px";
            }
            else {
                //tableTitle.style.maxWidth = this.MaxWidth + "px";
                divText.style.maxWidth = this.MaxWidth + "px";
            }            
        }

        if (this.MaxHeight != null && this.MaxHeight > 0) {
            divText.style.maxHeight = this.MaxHeight + "px";
        }

        if (this.MinWidth != null && this.MinWidth > 0) {
            tableTitle.style.minWidth = this.MinWidth + "px";
            divText.style.minWidth = this.MinWidth + "px";
        }

        if (this.MinHeight != null && this.MinHeight > 0) {
            divText.style.minHeight = this.MinHeight + "px";
        }

		divText.style.overflow = "";
		if (bScrollH || bScrollV)
			divText.style.overflow = "auto";

		if (oPrmAdjacent == "center") {
			divMain.style.position = "relative";
			imod.dom.CenterElement(divWrapper);
			CenterInterval = setInterval(function () { imod.dom.CenterElement(divWrapper); }, 100);

		}
		else {
		
			var iPosX = imod_OffsetLeft(oPrmAdjacent) + oPrmAdjacent.offsetWidth;
			var iPosY = imod_OffsetTop(oPrmAdjacent); // + oPrmAdjacent.offsetHeight;

			imod.dom.PositionElement(divWrapper, iPosX, iPosY);
			
		}

		RaiseShield();
		
		divText.scrollLeft = 0;
		divText.scrollTop = 0;

		imod.ani.FadeIn(divWrapper, 333, true);

		divWrapper.style.visibility = "visible";
		
		if (OnShow) OnShow();
	}
	
	function StopHide() {
		clearTimeout(ContentTimer);
	}

	function Hide()
	{
		if (DisableAutoHide)
		{
			FadeHide();
		}
		else
		{
			ContentTimer = setTimeout(FinishHide, HideDelay);
		}		
	}


	function FadeHide()
	{
		imod.ani.FadeOut(divWrapper, 250, true, FinishHide);
	}

	function FinishHide() {
		clearInterval(CenterInterval);
		LowerShield();
		divWrapper.style.display = "none";
		if (OnHide) OnHide();
	}
	
	function RaiseShield() {
	    if (frmShield != null) {
			frmShield.width = divMain.offsetWidth + "px";
			frmShield.height = divMain.offsetHeight + "px";
			frmShield.style.display = "";
		}
	}
	
	function LowerShield() {
		if (frmShield != null) {
			frmShield.style.display = "none";
		}

	}
}

imod.log("/scripts/common/imod_FloaterDiv.js");