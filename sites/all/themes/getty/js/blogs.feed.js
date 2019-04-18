if (!$("link[href='https://www.getty.edu/global/r/css/zinc.css']").length)
    $('<link href="https://www.getty.edu/global/r/css/blogs.css" rel="stylesheet">').appendTo("head");
var curatorial_dept = "";
var feedTags = "";
console.log ("In feed");
var feed_type = "exhibtionrelatedevents";
    
if (typeof g_curatorial_dept == 'undefined') {
  console.log ("Feed undefined");
} else if(g_curatorial_dept == 'manuscripts'){
  curatorial_dept = g_curatorial_dept;
  feedTags = 'illuminated-manuscripts';
  feedLink = 'manuscripts';
} else if(g_curatorial_dept == 'drawings'){
  curatorial_dept = g_curatorial_dept;
  feedTags = 'drawings';
  feedLink = 'drawings';
} else if(g_curatorial_dept == 'antiquities') {
  curatorial_dept = g_curatorial_dept;
  feedTags = 'antiquities';
  feedLink = 'antiquities';
} else if(g_curatorial_dept == 'paintings') {
  curatorial_dept = g_curatorial_dept;
  feedTags = 'department-of-paintings';
  feedLink = 'paintings';
} else if(g_curatorial_dept == 'photography') {
  curatorial_dept = g_curatorial_dept;
  feedTags = 'photography';
  feedLink = 'photographs';
} else if(g_curatorial_dept == 'sculpture') {
  curatorial_dept = g_curatorial_dept;
  feedTags = 'sculpture-and-decorative-arts';
  feedLink = 'sculpture & decorative arts';
} else if(g_curatorial_dept == 'collections') {
  curatorial_dept = g_curatorial_dept;
  feedTags = 'getty-museum-collection';
  feedLink = 'the Collection';
}
console.log ("Feed for curatorial department: " + curatorial_dept);  
    
blogURL = "";
feedURL = "http://blogs.getty.edu/iris/tags/"+feedTags+"/feed/";
// Feed params
// postCount - to limit the amount of variables listed
postCount = 1;
// excerptLength will determine where the lenght of characters will be and when to add the elispses (...)
excerptLength = 150;

// Google Feed API Replacement
feednami.setPublicApiKey('30af473a58c993948536709b02d5c87c61c676095db2e2f3e4c107695b1a9b79'); // getty.edu
feednami.setPublicApiKey('e72a756fcdef9ad6a20591af5e91d26174ac6f407a0473c3ac345c172963bc41'); // review.getty.edu
feednami.setPublicApiKey('aaf306aa243c855d877940b8c5d7696e3d04a13ad86b7b259469202fa4f08ca2'); // teamsite.getty.edu
feednami.setPublicApiKey('c4dc858d91055a61c6ccee60d7fd3dde77ebddc03b04bf7e47333fb00bf42be5'); // go.getty.edu
feednami.setPublicApiKey('d2a50de13e4354320369c0fe9b2ecaebbfec937ab91fc05e7d11a890ff32593e'); // gettylabs
feednami.setPublicApiKey('296f9f66f6636e3688f9c210dfb996ea58d2611ccde78a34b5d275eabf57d3d0'); // heart.getty.edu
feednami.load(feedURL,function(result){
  if(result.error) {
      console.log(result.error);
  } else {
    var entries = result.feed.entries;
    for(var i = 0; i < 1; i++){
        var entry = entries[i];
        //console.dir(entry);
        var post = entries[i];
        // console.log(post);
        var title = unescapePureXMLEntities(post.title);
        // var caption = post.caption; 
        // var entry = unescapePureXMLEntities(cleanPostContent(post.summary));
        if(unescapePureXMLEntities(cleanPostContent(post.summary)).length > excerptLength) {
          var entry = unescapePureXMLEntities(cleanPostContent(post.summary)).substr(0,excerptLength);
        }
        
        // var img = post.summary;
        //     img = img.replace("<![CDATA[", "").replace("]]>", "");
            // img = img.replace("<img ", "<img ").replace(" />", "/>");
        var img = post['rss:image']['img']['@'];           
            $("#img").append(img);
            testImage = img;
            img = testImage.src;
            imgSet = testImage.srcset;
            // img = $(testImage).closest('img');
        if (post['rss:caption'] != null) {
          var caption = post['rss:caption']['#'];
        }
        console.log(caption);

        // entry = cleanPostContent(entry);
        var link = post.link;
        //var date = post.pubDate;
        //date = new Date(date).toDateString();
        renderPost(title, img, entry, caption, link);
    }
  }
});

function cleanPostContent(entry) {
  //entry = entry.replace(/<span>[^<]*<\/span>/, '');
  //entry = entry.replace(/<[^>]*>/g, '');
  if (entry.indexOf('href') > -1) {
    entry = entry.replace(/</g, '&lt;');
    entry = entry.replace(/>/g, '&gt;');
    }
  else {
    entry = entry.replace(/<[^>]*>/g, '');
  }
  entry = entry.replace('A new episode of the Art + Ideas podcast', '');
  var snippet = entry.split(' ', excerptLength);
  //snippet.pop();
  //return snippet.join(' ') + ' ...';
  return snippet.join(' ');// + ' &raquo;';
  
}
function unescapePureXMLEntities(str) {
  return str.replace(/&([^;]+);/g, function(s, entity) {
  switch (entity) {
  case 'amp':
  return '&';
  case 'lt':
  return '<';
      case 'gt':
        return '>';
  case 'quot':
  return '"';
  default:
  if (entity.charAt(0) == '#') {
  var n = Number('0' + entity.substr(1));
  if (!isNaN(n)) {
  return String.fromCharCode(n);
  }
  }
  // For invalid entities we just return the entity
  return s;
  }
  });
}
function renderPost(title, img, entry, caption, link) {
  // new
  var pTitle = document.createElement('p');
  pTitle.className = "post-heading";
  var strongNode = document.createElement('strong');
  pTitle.appendChild(strongNode);
  // end new

  // new image
  var imageContainer = document.createElement('a');
  imageContainer.href = link;
  var pImage = document.createElement('img');
  pImage.className = "post-image";
  // pImage.style.padding = "20px 0";
  if(imgSet){
    var last = imgSet.split(", ").pop().replace(/^http:\/\//i, 'https://');
    console.log(last);
    last = last.substring(0,last.length - 5);
    pImage.src = last;
    pImage.srcset = last;
    // pImage.src = img;
    // pImage.srcset = imgSet
  } else {
    img = img.replace(/^http:\/\//i, 'https://');
    console.log(img);
    pImage.src = img;
  }
  imageContainer.appendChild(pImage);
  // end image
  // start caption
  var captionContainer = document.createElement('p');
  captionContainer.className = "caption-container";
  if (caption != null ) {
    captionContainer.innerHTML = caption;
  }
  // end
  
  var linkNode = document.createElement('a');
  linkNode.href = link;
  linkNode.className = "post-title";
  // linkNode.style.fontFamily = '"Avenir Next W04", Arial, sans-serif';
  // linkNode.style.fontWeight = "bold";
  // linkNode.style.color = "black";
  // linkNode.style.fontSize = "15px";
  // linkNode.style.marginBottom = "5px";
  // linkNode.style.lineHeight = "22.5px";
  linkNode.appendChild(document.createTextNode(title));
  
  // new
  strongNode.appendChild(linkNode);
  // end new
  
  // linkNode.className = "main_link";
  var linkMore = document.createElement('a');
  linkMore.href = link;
  linkMore.innerHTML = " ...";

  // new
  var snippetDiv = document.createElement('p');
  snippetDiv.className = "post-desc";
  // snippetDiv.style.padding = "15px 0 5px";
  // end new
  
  snippetDiv.innerHTML = unescapePureXMLEntities(cleanPostContent(entry));
  snippetDiv.appendChild(linkMore);


  var readMore = document.createElement('a');
  readMore.className = "post-read-more";
  readMore.href = "http://blogs.getty.edu/iris/tags/"+feedTags;
  readMore.innerHTML = "Read more posts about "+ feedLink +" <em class='fa fa-angle-right last-child' aria-hidden='true' style='font-size: 1.3em;'></em>"
  // readMore.style.color = "black";
  // readMore.style.fontSize = "0.775em";
  // readMore.style.fontWeight = "bold";

  var container = document.getElementById('feed');
  container.appendChild(imageContainer);
  if (caption != null ) {
    container.appendChild(captionContainer);
  }
  container.appendChild(linkNode);
  container.appendChild(snippetDiv);
  container.appendChild(readMore);
  
}
function renderNoPost() {
  var container = document.getElementById('feed');
  container.innerHTML = '<a class="post-title" href="'+blogURL+'" style="font-family: "Avenir Next W04", Arial, sans-serif; font-weight: bold; font-size: 15px; margin-bottom: 5px; line-height: 22.5px;">'+ blogURL +'</a>';
}