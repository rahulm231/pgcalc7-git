(function ($) {
    var phoneLink = function (target) {
        return createApi();

        function createApi() {
            return {
                createLinks: createLinks,
                createLinksGlobal: createLinksGlobal,
                createLinkSingle: createLinkSingle
            }
        }

        function createLinkSingle(text){
            if ($(window).width() < 768) {
                if(text){
                    var regex = /((\(\d{3}\) ?)|(\d{3})(-)?(\.)?)\d{3}(-)?(\.)?([0-9A-z]+)/g;

                    var res = text.match(regex);
                    regexHref = /href=""/g;


                    if(res && res[0]){
                        var phonenumber = formatNumber(res[0]);      

                        if(text.indexOf("href") >= 0){
                            text = text.replace(regexHref, "href=\"tel:" + phonenumber + "\"");

                        }
                        else{
                            text = text.replace(regex, "<a href=\"tel:" + phonenumber + "\">$&</a>");
                        }

                    return text;
                    }
                }
            }
        }

        function createLinks(target){
            if ($(window).width() < 768) {
               $(target).each(function(){
                    var regex = /((\(\d{3}\) ?)|(\d{3})(-)?(\.)?)\d{3}(-)?(\.)?([0-9A-z]+)/g;
                    var text = $(this).html();


                    var res = text.match(regex);
                    regexHref = /href=""/g;

                    if(res && res[0]){
                        var phonenumber = formatNumber(res[0]);

                        if(text.indexOf("href") >= 0){
                            text = text.replace(regexHref, "href=\"tel:" + phonenumber + "\"");

                        }
                        else{
                            text = text.replace(regex, "<a href=\"tel:" + phonenumber + "\">$&</a>");
                        }

                        $(this).html(text);
                    }
                    

                });
            }
        }

        
        
        function createLinksGlobal() {

            if ($(window).width() < 768) {

                var regex = /((\(\d{3}\))|(\d{3})(-|\.){1})\d{3}(-|\.){1}([0-9]{4})/g;

                $('.mainContent a[href*=tel]').each(function () {
                    var existingPhoneLinkNumber = $(this).html();
                    var isPhoneNumber = existingPhoneLinkNumber.match(regex);

                    if(isPhoneNumber){
                        $(this).replaceWith(existingPhoneLinkNumber);
                    }
                });
                
                
                var text = $(".mainContent").html();

                var regex = /((\(\d{3}\))|(\d{3})(-|\.){1})\d{3}(-|\.){1}([0-9A-z]+)/g;

                var res;
                if(text){
                     res = text.match(regex);
                }
                regexHref = /href=""/g;
                
                if(res){
                    res = jQuery.unique(res);
                }


                $(res).each(function(){
                    if(this.length >= 10 && this.length <= 15){
                        var phonenumber = formatNumber(this);                   
                        //alert(this);
                        var re = new RegExp(this, "g");
                        text = text.replace(re, "<a class='global-phone' href=\"tel:" + phonenumber + "\">$&</a>");

                        $(".mainContent").html(text);
                    }
                });
            }
        }

        function formatNumber(input){
            var inputlength = input.length;
            input = input.toLowerCase();
            var phonenumber = "";

            for (i = 0; i < inputlength; i++) {
                var character = input.charAt(i);
                switch(character) {
                    case '0': phonenumber+="0";break;
                    case '1': phonenumber+="1";break;
                    case '2': phonenumber+="2";break;
                    case '3': phonenumber+="3";break;
                    case '4': phonenumber+="4";break;
                    case '5': phonenumber+="5";break;
                    case '6': phonenumber+="6";break;
                    case '7': phonenumber+="7";break;
                    case '8': phonenumber+="8";break;
                    case '9': phonenumber+="9";break;
                    case '-': phonenumber+="-";break;
                    case  'a': case 'b': case 'c': phonenumber+="2";break;
                    case  'd': case 'e': case 'f': phonenumber+="3";break;
                    case  'g': case 'h': case 'i': phonenumber+="4";break;
                    case  'j': case 'k': case 'l': phonenumber+="5";break;
                    case  'm': case 'n': case 'o': phonenumber+="6";break;
                    case  'p': case 'q': case 'r': case 's': phonenumber+="7";break;
                    case  't': case 'u': case 'v': phonenumber+="8";break;
                    case  'w': case 'x': case 'y': case 'z': phonenumber+="9";break;
                }
            }

            return phonenumber;
        }
    }

    $.fn.phoneLinker = function(){
        target = this.selector;
        return new phoneLink(target);
    };
})(jQuery);