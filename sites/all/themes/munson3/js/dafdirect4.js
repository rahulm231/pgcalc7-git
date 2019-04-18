// 2015 Fidelity Charitable Gift Fund. All rights reserved.
// Version 1.0.070513
//
//  $Id: dafdirect4.js 113 2013-11-13 18:02:44Z a428113 $
//  $HeadURL: svn://fcssvn/FC_daf-80/trunk/docs/ddirect/dafdirect4.js $
//
//  /webops/staging/www.dafdirect.org-80/docs.prod/ddirect
//=========================================================================

function toggle_visibility(id1,id2) {
       var e1 = document.getElementById(id1);
       var e2 = document.getElementById(id2);

       if(e1.style.display == 'block') {
          e1.style.display = 'none';
     e2.style.display = 'block';
       } else {
          e1.style.display = 'block';
          e2.style.display = 'none';
       }
}
function dafdirectwhatclose() {
 toggle_visibility("notwhatisthis","whatisthis");
}
function dafdirectwhatsthis() {
 toggle_visibility("whatisthis","notwhatisthis");
}
function checkSubmit(e)
  {
     if(e && e.keyCode == 13)
     {
     DAFDirectSubmit();
     }
  }
function DAFDirectSubmit()
{
 _dsgtxt = "";
 _amnt="";
 _dafurl="";
 _npoid=_dafdirect_tin;
 //_npo_id = _dafdirect_tin;
 _tokenstr = "";
 _querystring = "";

   //dafdirect_form = document.getElementById("dafdirect");
   //with (dafdirect_form) {

    if(document.getElementById("dafprovider") != "undefined" && "FC" == document.getElementById("dafprovider").value) {
    // For SIT dafdirectdev
    // _dafurl="https://cgfqa4.fmr.com/cgfweb/CGFLogon.cgfdo";    
    // For UAT dafdirectqa
    //   _dafurl="https://cgfqa1.fmr.com/cgfweb/CGFLogon.cgfdo";
    // For prod www.dafdirect.org
       _dafurl="https://charitablegift.fidelity.com/cgfweb/CGFLogon.cgfdo";

    } else if("SC" == document.getElementById("dafprovider").value) {
        _dafurl="https://client.schwab.com/Login/SignOn/CustomerCenterLogin.aspx?SANC=recommendgrant&PARMS=|";
    } else if("KS" == document.getElementById("dafprovider").value) {
    	_dafurl="https://www.edonorcentral.com/login_0048.asp";
    } else if("BNYM" == document.getElementById("dafprovider").value) {
    	_dafurl="https://bnym.iphiview.com/bnym/API/Grants.mvc.axd/DafDirect";
    } else {
     alert("Please select a donor advised fund.");
     return;
 }
 if(document.getElementById("dafdirect_dsgtxt")) {
  _dsgtxt = encodeURIComponent(document.getElementById("dafdirect_dsgtxt").value);
  document.getElementById("dafdirect_dsgtxt").value="";
 }
 if(document.getElementById("dafdirect_amnt")) {
  _amnt = document.getElementById("dafdirect_amnt").value.replace(/[^0-9\.]+/g, '');
  document.getElementById("dafdirect_amnt").value = "";
 }
 	if("SC" == document.getElementById("dafprovider").value) {
		_tokenstr = "|ddtoken="+ _dafdirect_token;
 	} else {
		_tokenstr = "&ddtoken="+ _dafdirect_token;
 	}

 	action = "";
 	 if("SC" == document.getElementById("dafprovider").value) {
 		_querystring = "Npo_Id=" + _npoid + "|Grnt_Amnt=" + _amnt + "|Device_Type=Widget|App_Id=MDNR|source=widget"+ "|Grnt_Dsg_Txt=" + _dsgtxt ;
	 	action = _dafurl + _querystring + _tokenstr;
	  
	 } else {
	  _querystring="Npo_Id="+_npoid+"&Grnt_Amnt="+_amnt+"&Grnt_Dsg_Txt="+_dsgtxt+"&Device_Type=Widget&App_Id=MDNR&source=widget";
	  action=_dafurl+"?"+_querystring+_tokenstr;
	 }
     document.getElementById("dafprovider").value = "";
     popupWindow = window.open(action,'_blank');
     popupWindow.focus();
   
}

_dafdirect_token = "";
_dafdirect_show_border = "true";
_dafdirect_tin="";
_dafdirect_dropdown = "f,k,s,m";
_dafdirect_size = "2";
_dafdirect_show_amt = "true";
_dafdirect_show_dsg = "true";

if(typeof _dafdirect_settings != "undefined") {
 //first nine are tin
 _dafdirect_tin = _dafdirect_settings.substring(0,9);
 _dafdirect_size = (_dafdirect_settings.substring(10,11));
 _dafdirect_show_dsg = (_dafdirect_settings.substring(11,12) == "0" ? "false" : "true");
 _dafdirect_show_amt = (_dafdirect_settings.substring(12,13) == "0" ? "false" : "true");
 _dafdirect_show_border = (_dafdirect_settings.substring(13,14) == "0" ? "false" : "true");
 _dafdirect_token = _dafdirect_settings.substring(15);
}
if(_dafdirect_show_border == "false") {
 document.write('<style type="text/css">#dafdirectdiv { border:0!important; }</style>');
}
if(_dafdirect_size=="2") {
//	 document.write('<link rel="stylesheet" type="text/css" href="http://dafdirectdev.fmr.com/ddirect/css/dafdirect2.1.css" />');
//	 document.write('<link rel="stylesheet" type="text/css" href="http://dafdirectqa.fmr.com/ddirect/css/dafdirect2.1.css" />');
	 document.write('<link rel="stylesheet" type="text/css" href="https://www.dafdirect.org/ddirect/css/dafdirect2.1.css" />');
} else if(_dafdirect_size=="0") {
//	 document.write('<link rel="stylesheet" type="text/css" href="http://dafdirectdev.fmr.com/ddirect/css/dafdirect0.1.css" />');
//	 document.write('<link rel="stylesheet" type="text/css" href="http://dafdirectqa.fmr.com/ddirect/css/dafdirect0.1.css" />');
	 document.write('<link rel="stylesheet" type="text/css" href="https://www.dafdirect.org/ddirect/css/dafdirect0.1.css" />');
} else {
//	 document.write('<link rel="stylesheet" type="text/css" href="http://dafdirectdev.fmr.com/ddirect/css/dafdirect1.1.css" />');
//	 document.write('<link rel="stylesheet" type="text/css" href="http://dafdirectqa.fmr.com/ddirect/css/dafdirect1.1.css" />');
	 document.write('<link rel="stylesheet" type="text/css" href="https://www.dafdirect.org/ddirect/css/dafdirect1.1.css" />');
}
document.write('<style type="text/css">#dafdirectdiv { background:#fff; }</style>');

document.write('<div id="dafdirectdiv" onKeyPress="checkSubmit(event)">');
document.write('<form name="dafdirect" id="dafdirect" method="post" action="javascript:DAFDirectSubmit();">');

if(_dafdirect_size == "2") {
//	 document.write('<img src="http://dafdirectdev.fmr.com/ddirect/images/logo-DAF-direct2.jpg" alt="Logo DAF Direct" /><br/>');
//	 document.write('<img src="http://dafdirectqa.fmr.com/ddirect/images/logo-DAF-direct2.jpg" alt="Logo DAF Direct" /><br/>');
	 document.write('<img src="https://www.dafdirect.org/ddirect/images/logo-DAF-direct2.jpg" alt="Logo DAF Direct" /><br/>');
} else {
//	 document.write('<img src="http://dafdirectdev.fmr.com/ddirect/images/logo-DAF-direct1.jpg" alt="Logo DAF Direct" /><br/>');
//	 document.write('<img src="http://dafdirectqa.fmr.com/ddirect/images/logo-DAF-direct1.jpg" alt="Logo DAF Direct" /><br/>');
	 document.write('<img src="https://www.dafdirect.org/ddirect/images/logo-DAF-direct1.jpg" alt="Logo DAF Direct" /><br/>');
}
document.write('<input type="hidden" name="dafdirect_token" id="dafdirect_token" value="');

document.write(_dafdirect_token);
document.write('" /><br />');

document.write('<div class="whatThis"><a id="fancybox" href="javascript:dafdirectwhatsthis();">What is this?</a></div>');

document.write('<div id="whatisthis" style="display:none; font-family: "Lucida Grande", "Lucida SansUnicode", Arial, sans-serif; font-size:12px; line-height:.3em;">');
document.write('<div class="dafdirectscroll">');
document.write('<p>A donor advised fund (DAF) is a charitable giving program that allows you to combine the most favorable tax benefits with the flexibility to support your favorite causes.</p>');
document.write('<p>If you have a donor advised fund, DAF Direct enables you to recommend grants to this nonprofit');
document.write(' directly from your DAF (as long as your DAF\'s sponsoring organization is participating).</p>');
document.write('</div>');
document.write('<div class="dafdirectClearfix"></div>');
document.write('<div class="whatThis"><a id="fancybox" href="javascript:dafdirectwhatsthis();"><br>Close</a></div>');
document.write('</div>');
document.write('<div id="notwhatisthis">');

document.write('Donate now from:<br />');
document.write('<select name="dafprovider" id="dafprovider" class="dafdirectDonateFrom dafdirectDropdown dafdirectSelect">');
if(_dafdirect_dropdown.indexOf("s")!=-1 && _dafdirect_dropdown.indexOf("f") != -1) {
 document.write('<option value="">--Please select--</option>');
}
if(_dafdirect_dropdown.indexOf("f") != -1) {
 document.write('<option value="FC">Fidelity Charitable</option>');
}
if(_dafdirect_dropdown.indexOf("k") != -1) {
	 document.write('<option value="KS">Greater Kansas City CF</option>');
}
if(_dafdirect_dropdown.indexOf("s") != -1) {
 document.write('<option value="SC">Schwab Charitable</option>');
}
if(_dafdirect_dropdown.indexOf("m") != -1) {
	 document.write('<option value="BNYM">BNY Mellon</option>');
}
document.write('</select><br />');

if(_dafdirect_show_dsg == "true") {
 document.write('Designation:<br />');
 document.write('<input class="dafdirectInputFull dafdirectInput" type="text" name="dafdirect_dsgtxt" id="dafdirect_dsgtxt" size="8" value="" class="dafdirecTextInput" />');
 document.write('<div class="dafdirectClearfix"></div>');
} else {
 document.write('<div class="dafdirectClearfix"></div>');
}
if(_dafdirect_show_amt == "true") {
 document.write('<div class="dafdirectClearfix"></div>');
 document.write('<div id="amountNextContain">');
 document.write('<div class="dafdirectInputAmount">Amount:<br /><input type="text" name="dafdirect_amnt" id="dafdirect_amnt" size="8" value="$" class="text-iput dafdirectInput" /></div>');
} else {
 document.write('<div class="dafdirectClearfix"></div>');
}
if(typeof _dafdirect_hide_button != "undefined" && _dafdirect_hide_button.toLowerCase() == "yes") {
//do not display button
} else {
  if(typeof dafdirect_size != "undefined" && dafdirect_size == "2") {
//	   document.write('<div class="dafdirectButtonContain"><a href="javascript:DAFDirectSubmit();"><img border="0" src="http://dafdirectdev.fmr.com/ddirect/images/button-next2.jpg" ></a></div>');
//	   document.write('<div class="dafdirectButtonContain"><a href="javascript:DAFDirectSubmit();"><img border="0" src="http://dafdirectqa.fmr.com/ddirect/images/button-next2.jpg" ></a></div>');
	   document.write('<div class="dafdirectButtonContain"><a href="javascript:DAFDirectSubmit();"><img border="0" src="https://www.dafdirect.org/ddirect/images/button-next2.jpg" ></a></div>');
  } else {
//	   document.write('<div class="dafdirectButtonContain"><a href="javascript:DAFDirectSubmit();"><img border="0" src="http://dafdirectdev.fmr.com/ddirect/images/button-next1.jpg" ></a></div>');
//	   document.write('<div class="dafdirectButtonContain"><a href="javascript:DAFDirectSubmit();"><img border="0" src="http://dafdirectqa.fmr.com/ddirect/images/button-next1.jpg" ></a></div>');
	   document.write('<div class="dafdirectButtonContain"><a href="javascript:DAFDirectSubmit();"><img border="0" src="https://www.dafdirect.org/ddirect/images/button-next1.jpg" ></a></div>');
  }
}
document.write('<div class="dafdirectClearfix"></div>');
document.write('</div>');

document.write('</div> <!-- amountNextContain -->');

// onfocus="if(this.value == 'Amount') { this.value = ''; }"
document.write('</form>');
document.write('</div>');
