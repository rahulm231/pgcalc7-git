var tme = 0;
var tot = "";
function tracVersion() {
     alert('trac.js http Version 3.4');
}
function jSleep(s){
        s=s*1000;
        var a=true;
        var n=new Date();
        var w;
        var sMS=n.getTime();
        while(a){
                w=new Date();
                wMS=w.getTime();
                if(wMS-sMS>s) a=false;
        }
}
function Querystring(qs) { // optionally pass a querystring to parse
    this.params = new Object()
    this.get=Querystring_get

    if (qs == null)
        qs=location.search.substring(1,location.search.length)
    if (qs.length == 0) return
    qs = qs.replace(/\+/g, ' ')
    qs = qs.replace(/&amp;/g, '&')
    var args = qs.split('&') // parse out name/value pairs separated via &
    for (var i=0;i<args.length;i++) {
        var value;
        var pair = args[i].split('=')
        var name = unescape(pair[0])

        if (pair.length == 2)
            value = unescape(pair[1])
        else
            value = name

        this.params[name] = value
    }
}
function Querystring_get(key, default_) {
        // This silly looking line changes UNDEFINED to NULL
        if (default_ == null) default_ = '';
        var value=this.params[key]
        if (value==null) value=default_;
        return value
}
function deleteCookie(name) {
        createCookie(name,"",-1);
}
function createCookie(name,value,days) {
    if (days) {
        var date = new Date();
        date.setTime(date.getTime()+(days*24*60*60*1000));
        var expires = "; expires="+date.toGMTString();
    }
    else var expires = "";
    document.cookie = name+"="+value+expires+"; path=/";
}
function readCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
}

function tracPredictive() {
   trackPredictive();
}
function Predictive() {
   trackPredictive();
}
function trackPredictive() {
    var pag   = 0;
    //var url  = "//aws.predictiveresponse.net/rtrac.php";
    var url  = "//aws.predictiveresponse.net/http/rtrac.php";
    var titl = document.title;
    titl     = titl.replace(/&/g,"*");
    if (location.href.indexOf('?org') != -1) {
       curl = location.href.split('?');
       curl = curl[0];
    } else {
       curl1 = location.href.replace("&org","|");
       curl2 = curl1.split("|");
       curl  = curl2;
       curl3 = curl[0];
       curl  = curl3.replace(/&/g,"*");
       curl4 = curl.split("?utm_source");
       curl  = curl4[0];
       curl4 = curl.split("|utm_source");
       curl  = curl4[0];
    }
    curl4 = curl.split("?cutoff");
    curl  = curl4[0];
    curl4 = curl.split("*cutoff");
    curl  = curl4[0];

    var qs   = new Querystring();
    var lvl  = 3;
    var org  = qs.get('org');
    var lea  = qs.get('lea');
    var ite  = qs.get('ite');
    var cam  = qs.get('cam');
    var sid  = qs.get('sid');
    var ctr  = qs.get('ctr');
    var nam  = 'cam_' + cam;
    var oli  = org + '|' + cam + '|' + lea;
    var sfi  = 'sfi_'    + sid;
    if (lea != "") {
       deleteCookie('lid');
       deleteCookie('lidz');
       createCookie('lid',lea,999);
       createCookie('lidz',lea,999);
    } else {
       lea = readCookie('lidz');
    }
    if (org != "") {
       deleteCookie('orgz');
       createCookie('orgz',org,999);
    } else {
       org = readCookie('orgz');
    }
    //
    trackerImage = new Image();
    trackerImage.src = url + '?org=' + org  + '&lea=' + lea + '&ite=' + ite + '&lvl=' + --lvl + '&ctr=' + ctr + '&curl=' + curl + '&titl=' + titl;
    doRedirect();
    return curl;
}
function doRedirect() {
    if (location.href.indexOf('&timeout=')     != -1) {
       trackPredictiveTime(curl);
    }
    if (location.href.indexOf('?redirect=')    != -1) {
       trackPredictiveRedirect();
    }
    if (location.href.indexOf('&redirect=')    != -1) {
       trackPredictiveRedirect2();
    }
    if (location.href.indexOf('?redirect_np=') != -1) {
       trackPredictiveRedirectNP();
    }
    if (location.href.indexOf('&redirect_np=') != -1) {
       trackPredictiveRedirectNP2();
    }
    if (location.href.indexOf('?redirect_nx=') != -1) {
       trackPredictiveRedirectNP3();
    }
}
function trackPredictiveRedirect() {
    curl = location.href.split("?");
    curl[1] = curl[1].replace(/&amp;/g, '&');
    curl2 = curl[1].split("&");
    var par = "?" + curl2[1];
    for (i = 2; i < curl2.length; i++) {
       par = par + '&' + curl2[i];
    }
    var qs          = new Querystring();
    var newURL      = qs.get('redirect');
    redirect        = newURL + par;
    window.location = redirect;
}
function trackPredictiveRedirect2() {
    c0   = location.href.split("?");
    c0[1] = c0[1].replace(/&amp;/g, '&');
    c1 = c0[1].split("&redirect");
    c2 = c0[0] + '?' + c1[0];
    c3 = c1[1].split("&");
    par = "";
    for (i=1;i<c3.length;i++) {
       par = par + '&' + c3[i];
    }
    var qs          = new Querystring();
    var newURL      = qs.get('redirect');
    redirect        = newURL + '?' + c1[0] + par;
    window.location = redirect;
}
function trackPredictiveRedirectNP() {
    curl = location.href.split("?");
    curl[1] = curl[1].replace(/&amp;/g, '&');
    curl2 = curl[1].split("&");
    par = "";
    //
    par = "?" + curl2[1];
    for (i=1;i<curl2.length;i++) {
       par = par + '&' + curl2[i];
    }
    var qs          = new Querystring();
    var newURL      = qs.get('redirect_np');
    redirect        = newURL + par;
    window.location = redirect;
}
function trackPredictiveRedirectNP2() {
    c0   = location.href.split("?");
    c0[1] = c0[1].replace(/&amp;/g, '&');
    c1 = c0[1].split("&redirect_np=");
    redirect        = c1[1];
    window.location = redirect;
}
function trackPredictiveRedirectNP3() {
    c0   = location.href.split("?");
    c0[1] = c0[1].replace(/&amp;/g, '&');
    c1 = c0[1].split("redirect_nx=");
    c2 = c1[1].split("&");
    redirect        = c2[0];
    window.location = redirect;
}
function trackPredictiveTime(curl) {
    var interval = 5000;
    var pag  = 0;
    var url  = "//aws.predictiveresponse.net/http/ttrac.php";
    var qs   = new Querystring();
    var lvl  = 3;
    var timeout = qs.get('timeout');
    var org  = qs.get('org');
    var lea  = qs.get('lea');
    var ite  = qs.get('ite');
    var cam  = qs.get('cam');
    var sid  = qs.get('sid');
    var ctr  = qs.get('ctr');
    var nam  = 'cam_' + cam;
    var oli  = org + '|' + cam + '|' + lea;
    var sfi  = 'sfi_'    + sid;
    tot =  url + '?org=' + org  + '&lea=' + lea + '&ite=' + ite + '&lvl=' + --lvl + '&ctr=' + ctr + '&curl=' + curl;
    tme = 0;
    timeout = 5000; // initial 5 sec timeout
    /*
    tme = 0;
    if (timeout == undefined) { timeout = 18001; }
    else { timeout = (timeout * 1000) + 1; }
    if (timeout > 600000) { timeout = 600001; }
    delta = setInterval("sendHeartBeat()", interval);
    setTimeout ('clearInterval(delta)', timeout);
    */
    setTimeout ('sendHeartBeat()', timeout);

}
function sendHeartBeat() {
    tme = tme + 1;
    var  top = (tme * 5);
    var  tote = tot + '&seq=' + tme + '&top=' + top;
    //alert('tote=' + tote);
    //alert('top=' + top + ' timeout=' + timeout);
    dummyimage = new Image();
    dummyimage.src = tote;
    if (top < 180)
       timeout = 5000;
    else if (top < 600)
       timeout = 15000;
    else if (top < 1800)
       timeout = 30000;
    else if (top <= 3600)
       timeout = 60000;
    else if (top > 3600)
       timeout = 120000;
    setTimeout ('sendHeartBeat()', timeout);
    //alert(' ' + tme + '-' + top + '-' + timeout);
    //alert(timeout);
 }

