$(document).ready(function () {
    var size = 13;
    $("#lg").click(function () { size = size + 1; $("#pagecopy *").css("font-size", size); });
    $("#sm").click(function () { size = size - 1; $("#pagecopy *").css("font-size", size); });
    if ($(".slideshow img").length) $('.slideshow').cycle({ fx: 'fade' });
});
  function checkKey(human) {
               var ck = human.trim().toLowerCase().trim(), s = '';
               if (ck == '') return false;
               for (var a = 0; a < ck.length; a++) s += ck.charCodeAt(a).toString();
               return ("121101108108111119" === s);
           }
           function checkdis() {
               var msgInfo
               msgInfo = "";
               if (document.form1.name1.value == "") msgInfo += "First Name \n";
               if (document.form1.name2.value == "") msgInfo += "Last Name \n";
               /*
               if (document.form1.address1.value == "") msgInfo += "Address \n";
               if (document.form1.city.value == "") msgInfo += "City \n";
               if (document.form1.state.value == "") msgInfo += "State \n";
               if (document.form1.zip.value == "") msgInfo += "Postal Code \n";
               if (document.form1.phone.value == "") msgInfo += "Phone \n";
               */
               if (document.form1.email.value == "") msgInfo += "Email \n";
               msgInfo += (!checkKey(document.form1.captcha.value)) ? "A lemon is what color? ye... \n" : "";
               if (msgInfo != "") {
                   alert("The Following fields have been left blank :\n\n" + msgInfo + "\nPlease correct these fields and resubmit.");
               }
               else {
                   document.form1.submit();
               }
           }
