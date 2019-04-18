(function($){
// this is a Jquery plugin to pass an xml url to a server side handler
   $.fn.extend({

       ouDisplayXML : function(options){
       
          var defaults = {
             handler : "http://www.skidmore.edu/_resources/php/wordpress_to_jsonp.php", // the handler is the server code that returns items as json wrapped in callback(json)
             feed : "http://www.skidmore.edu/_resources/rss/news.xml" ,
             category : "",
             xpath : "/rss/channel/item", // the XPATH to the elements wanted, the handler should use this to retreive items from the feed
             quantity : 5,  // number of items wanted
             random : "FALSE",  // get random items - false means get from top of feed
             template : "#news-item" , // jquery Template selector to apply to each item returned
            
             callback : function(template,data,obj){
                       $(template).tmpl(data).appendTo(obj);
                       }
          };
          
          var options = $.extend(defaults,options);
          
          var url = options.handler ;
          url += "?feed=" ;
          url += options.feed ;
            if(options.category != ""){
           url += "&category=";
           url += options.category;
          }
          url += "&xpath=";
        
          url += options.xpath;
          url += "&quantity=" ;
          url += options.quantity ;
          url += "&random=";
          url += options.random;
          url += "&rand=" ;
          url += (Math.random());
          url += "&callback=?";
          
         return this.each(function(){
         var o = options;
         var template = o.template;
         var obj = $(this);
        
         
           $.getJSON(url,function(data){options.callback(template,data,obj)});
            
            
          });
      }


   });
})($);
