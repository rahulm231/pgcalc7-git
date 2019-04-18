var CalendarControlASCX = {};
CalendarControlASCX.OpenWindow = function (sPrmUrl, w, h, sPrmProperties, iPrmCenterMode) {
	if (window.CmsMenuBar != null)
		CmsMenuBar.OpenSubWindow(sPrmUrl, w, h);
	else
		imod_OpenWindow(sPrmUrl, w, h, sPrmProperties, iPrmCenterMode);
}