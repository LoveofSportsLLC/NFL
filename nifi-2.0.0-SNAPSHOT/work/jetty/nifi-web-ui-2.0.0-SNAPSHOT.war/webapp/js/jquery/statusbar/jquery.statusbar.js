(function(d){var i="component.id",h="status.aggregateSnapshot.activeThreadCount",e="status.aggregateSnapshot.runStatus";var c=function(j){return typeof j==="undefined"};var a=function(j){return j===null};var f=function(j){return !c(j)&&!a(j)};var g=function(k,j){return j.split(".").reduce(function(m,l){return(typeof m===undefined||m===null)?m:(typeof m[l]=="function")?m[l]():m[l]},k)};var b={init:function(j){var k=d(this).addClass("dialog-status-bar");if(j==="processor"){k.html('<text class="run-status-icon"></text><span class="dialog-status-bar-state"></span><span class="dialog-status-bar-threads" count="0"></span><div class="dialog-status-bar-bulletins fa fa-sticky-note-o" count="0"><div class="dialog-status-bar-bulletins-content"></div></div><div class="dialog-status-bar-buttons"></div>')}else{k.html('<div class="dialog-status-bar-bulletins fa fa-sticky-note-o" count="0"><div class="dialog-status-bar-bulletins-content"></div></div>')}return k},show:function(){var j=d(this);if(j.is(":visible")){j.show()}return j},hide:function(){var j=d(this);if(j.is(":visible")){j.hide()}return j},observe:function(m,j){var l=d(this);if(m.processor){var n=m.processor;var k=document.querySelector('g[id="id-'+n+'"]');l.statusbar("set",m);l.data("observer",new MutationObserver(function(o){l.statusbar("set",m);if(typeof j=="function"){j()}}));l.data("observer").observe(k,{attributes:true,childList:true,subtree:true});return l.data("observer")}else{return l.statusbar("set",m)}},disconnect:function(){var j=d(this);if(f(j.data("observer"))){j.data("observer").disconnect();j.data("observer",null)}if(f(j.data("buttonModel"))){j.data("buttonModel",[]);j.statusbar("refreshButtons",[])}},refreshButtons:function(){var j=d(this);j.statusbar("buttons",j.data("buttonModel"));return j},hideButtons:function(){var j=d(this);j.find(".dialog-status-bar-buttons").hide();return j},showButtons:function(){var j=d(this);j.find(".dialog-status-bar-buttons").show(250);return j},buttons:function(l){var k=d(this),j=k.find(".dialog-status-bar-buttons");if(f(l)){j.children().remove();d.each(l,function(p,n){var m=function(){return typeof n.disabled==="function"&&n.disabled.call()===true};var o=d('<div class="button"></div>');if(n.buttonText){o.append(d("<span></span>").text(n.buttonText))}else{if(n.buttonHtml){o.html(n.buttonHtml)}}if(f(n.clazz)){o.addClass(n.clazz)}if(f(n.color)){o.css({background:n.color.base,color:n.color.text})}if(m()){o.addClass("disabled-button")}else{if(f(n.color)){o.hover(function(){d(this).css("background-color",n.color.hover)},function(){d(this).css("background-color",n.color.base)})}o.click(function(){var q=d(this).data("handler");if(f(q)&&typeof q.click==="function"){q.click.call(k)}})}o.data("handler",n.handler).appendTo(j)});k.data("buttonModel",l)}l=[];d.each(j.find(".button"),function(n,m){l.push(d(m))});return l},set:function(n){var m=d(this),q,p,j,l,o;if(n.processor){q=n.processor;p=d3.select("#id-"+q).datum();j=g(p,e);l=g(p,h);o=n.bulletins}else{if(n.provider){o=n.provider}}if(f(j)&&f(l)){m.attr("state",j.toUpperCase());m.attr("alerts","true");m.find(".dialog-status-bar-state").text(j);m.find(".dialog-status-bar-threads").attr("count",l);m.find(".dialog-status-bar-threads").attr("title",l+" active threads");m.find(".dialog-status-bar-threads").text("("+l+")")}if(f(o)){var k=o.find("li").length;m.find(".dialog-status-bar-bulletins-content").html((k>0)?o:"");m.find(".dialog-status-bar-bulletins").attr("count",k);if(n.processor){m.statusbar("refreshButtons")}else{m.attr("alerts","true")}}return m}};d.fn.statusbar=function(j){if(b[j]){return b[j].apply(this,Array.prototype.slice.call(arguments,1))}else{return b.init.apply(this,arguments)}}})(jQuery);