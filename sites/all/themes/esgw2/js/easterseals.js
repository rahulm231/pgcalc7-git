// Cookie Code
function setCookie (cookieName, cookieValue, cookieExpires) {
  var d = new Date();
  d.setTime(d.getTime() + (cookieExpires * 24 * 60 * 60 * 1000));
  var expires = 'expires=' + d.toUTCString();
  document.cookie = cookieName + '=' + cookieValue + ';' + expires + ';path=/';
}

function getCookie (cookieName) {
  var cookieValue = document.cookie;
  var cookieStartsAt = cookieValue.indexOf(' ' + cookieName + '=');
  if (cookieStartsAt === -1) {
    cookieStartsAt = cookieValue.indexOf(cookieName + '=');
  } if (cookieStartsAt === -1) {
    cookieValue = null;
  } else {
    cookieStartsAt = cookieValue.indexOf('=', cookieStartsAt) + 1;
    var cookieEndsAt = cookieValue.indexOf(';', cookieStartsAt);
    if (cookieEndsAt === -1) {
      cookieEndsAt = cookieValue.length;
    }
    cookieValue = unescape(cookieValue.substring(cookieStartsAt, cookieEndsAt));
  }
  return cookieValue;
}

function deleteCookie (cookieName) {
  document.cookie = cookieName + '=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}

// Override a conflict between CMS form.js file and Facebook's fbevents.js file - both use an object named FormData
window.alert = function (FormData) {
  console.log(FormData);
};

// Blog RSS feed unavailable fix
if (typeof jQuery !== 'undefined') {
  if (jQuery('[id^=rss]:contains(RSS Feed unavailable)').length > 0) {
    document.cookie = 'JSESSIONID=; path=/; domain=.easterseals.com; expires=' + new Date(0).toUTCString();
  }
}
