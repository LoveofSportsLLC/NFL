(function(c){var b={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;","/":"&#x2f;"};var a=function(d){return String(d).replace(/[&<>"'\/]/g,function(e){return b[e]})};c.fn.ellipsis=function(d){d=(typeof d==="undefined"||d===null)?true:d;function e(){var g=document.documentElement.style;return("textOverflow" in g||"OTextOverflow" in g)}function f(k,i){var h=0;var l=k-1;var m=-1;var j;while(h<=l){j=~~((h+l)/2);var g=i(j);if(g<0){l=j-1}else{if(g>0){h=j+1}else{m=j;h=j+1}}}return m}return this.each(function(){var m=c(this);var p=m.text();if(d){m.attr("title",p)}var i=m.hasClass("multiline");if(!i&&e()){m.css({"text-overflow":"ellipsis","o-text-overflow":"ellipsis"})}else{var j=c(this.cloneNode(true)).hide().appendTo("body");var g=c(this.cloneNode(true)).hide().css({position:"absolute",overflow:"visible"}).width(i?j.width():"auto").height(i?"auto":j.height()).appendTo("body");var n=function(){return g.height()>=j.height()};var o=function(){return g.width()>=j.width()};var q=i?n:o;if(q()){var l=a(p);var k=function(u){var s=l.substr(0,u);g.html(s+"&#8230;")};var r=function(s){k(s);if(q()){return -1}return 0};var h=f(l.length-1,r);k(h)}m.html(g.html());j.remove();g.remove()}})}})(jQuery);