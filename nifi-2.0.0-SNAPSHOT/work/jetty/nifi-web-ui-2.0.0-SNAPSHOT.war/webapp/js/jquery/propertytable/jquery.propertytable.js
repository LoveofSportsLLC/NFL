(function(a,b){if(typeof define==="function"&&define.amd){define(["jquery","Slick","nf.Common","nf.UniversalCapture","nf.Dialog","nf.Storage","nf.Client","nf.ErrorHandler","nf.ProcessGroup","nf.ProcessGroupConfiguration","nf.Settings","nf.ParameterContexts","lodash"],function(i,f,g,k,h,j,o,l,c,d,e,m,n){b(i,f,g,k,h,j,o,l,c,d,e,m,n)})}else{if(typeof exports==="object"&&typeof module==="object"){b(require("jquery"),require("Slick"),require("nf.Common"),require("nf.UniversalCapture"),require("nf.Dialog"),require("nf.Storage"),require("nf.Client"),require("nf.ErrorHandler"),require("nf.ProcessGroup"),require("nf.ProcessGroupConfiguration"),require("nf.Settings"),require("nf.ParameterContexts"),require("lodash"))}else{b(a.$,a.Slick,a.nf.Common,a.nf.UniversalCapture,a.nf.Dialog,a.nf.Storage,a.nf.Client,a.nf.ErrorHandler,a.nf.ProcessGroup,a.nf.ProcessGroupConfiguration,a.nf.Settings,a.nf.ParameterContexts,a._)}}}(this,function(A,a,J,b,i,t,f,c,x,D,G,N,Q){var L=null;var O=false;var w=null;var l=null;var h=212;var P=212;var I=100;var R="<div>Expression Language (EL) supported</div>";var u='<div>After beginning with the start delimiter <span class="hint-pattern">${</span> use the keystroke <span class="hint-keystroke">control+space</span> to see a list of available functions.</div>';var n="<div>Expression Language (EL) not supported</div>";var e="<div>Parameters (PARAM) supported</div>";var k='<div>After beginning with the start delimiter <span class="hint-pattern">#{</span> use the keystroke <span class="hint-keystroke">control+space</span> to see a list of available parameters.</div>';var m="<div>Parameters (PARAM) not supported</div>";var o=function(S){if(J.isDefinedAndNotNull(S)){return S.startsWith("#{")&&S.endsWith("}")}return false};var y=function(T){var S=/#{[a-zA-Z0-9-_. ]+}/;return S.test(T)};var M=function(T,V){var W=A("<div></div>");var U=A("<div></div>").addClass("mode-hint-tip-title-container").appendTo(W);if(V){A("<div></div>").addClass("fa fa-check").appendTo(U);A(T?R:e).addClass("mode-supported").appendTo(U);var S=A("<div></div>").addClass("mode-hint-tip-description-container").appendTo(W);A(T?u:k).appendTo(S)}else{A("<div></div>").addClass("fa fa-ban").appendTo(U);A(T?n:m).addClass("mode-unsupported").appendTo(U)}return W};var g=function(S){return function(Y){var ab=this;var aa="";var U;var X;var V;var T;var W;var Z;this.init=function(){var ac=A("body");var ag=A(Y.grid.getContainerNode());var ap=ag.data("descriptors");X=ap[Y.item.property];var ah=S(X);var aj=J.isSensitiveProperty(X);U=Y.item[Y.column.field];T=A("<div></div>").addClass("slickgrid-nf-editor").css({"z-index":14000,position:"absolute",padding:"10px 20px",overflow:"hidden","border-radius":"2px","box-shadow":"rgba(0, 0, 0, 0.247059) 0px 2px 5px","background-color":"rgb(255, 255, 255)",cursor:"move",transform:"translate3d(0px, 0px, 0px)"}).draggable({cancel:".button, .mode-hint-element, .nf-editor, .string-check-container > *",containment:"parent"}).appendTo(ac);Z=A("<div></div>").addClass("mode-hint-tip").appendTo(ac);var ai=ah.supportsEl();var ao=ah.supportsParameterReference();Z.append(M(true,ai));Z.append(M(false,ao));var af=A("<div></div>").addClass("mode-hint-container").appendTo(T);var ak=A("<div></div>").addClass("mode-hint-element").on("mouseenter",function(){var au=T.position();var at=au.top-Z.outerHeight()+2;var ar=au.left+T.outerWidth()-Z.outerWidth()+5;Z.css({top:at+"px",left:ar+"px"});Z.show()}).on("mouseleave",function(){Z.hide()}).appendTo(af);var am=A("<div></div>").addClass("mode-hint").appendTo(ak);A("<div>EL</div>").appendTo(am);A("<div></div>").addClass("mode-hint-value fa").addClass(ai?"fa-check":"fa-ban").appendTo(am);var an=A("<div></div>").addClass("mode-hint").appendTo(ak);A("<div>PARAM</div>").appendTo(an);A("<div></div>").addClass("mode-hint-value fa").addClass(ao?"fa-check":"fa-ban").appendTo(an);var ae=Math.max(Y.position.width,P);W=A("<div></div>").addClass("nf-editor").appendTo(T).nfeditor({languageMode:ah,width:ae,minWidth:P,minHeight:I,resizable:true,sensitive:aj,escape:function(){ab.cancel()},enter:function(){ab.save()}});var ad=A('<div class="string-check-container" />');ad.appendTo(T);V=A('<div class="nf-checkbox string-check" />').on("change",function(at,ar){if(ar.isChecked){W.nfeditor("setValue","");W.nfeditor("setReadOnly","nocursor")}else{W.nfeditor("setValue",aa);W.nfeditor("setReadOnly",false)}}).appendTo(ad);A('<span class="string-check-label nf-checkbox-label">&nbsp;Set empty string</span>').appendTo(ad);var al=A('<div class="button">Ok</div>').css({color:"#fff",background:"#728E9B"}).hover(function(){A(this).css("background","#004849")},function(){A(this).css("background","#728E9B")}).on("click",ab.save);var aq=A('<div class="secondary-button">Cancel</div>').css({color:"#004849",background:"#E3E8EB"}).hover(function(){A(this).css("background","#C7D2D7")},function(){A(this).css("background","#E3E8EB")}).on("click",ab.cancel);A("<div></div>").css({position:"relative",top:"10px",left:"20px",width:"212px",clear:"both","float":"right"}).append(al).append(aq).append('<div class="clear"></div>').appendTo(T);ab.position(Y.position);W.nfeditor("focus").nfeditor("selectAll")};this.save=function(){Y.commitChanges()};this.cancel=function(){W.nfeditor("setValue",aa);Y.cancelChanges()};this.hide=function(){T.hide()};this.show=function(){T.show();W.nfeditor("refresh")};this.position=function(ac){T.css({top:ac.top-16,left:ac.left-42})};this.destroy=function(){W.nfeditor("destroy");T.remove();Z.remove()};this.focus=function(){W.nfeditor("focus")};this.loadValue=function(ae){var af=false;var ac=J.isSensitiveProperty(X);if(J.isDefinedAndNotNull(ae[Y.column.field])){if(ac){aa=J.config.sensitiveText}else{aa=ae[Y.column.field];af=aa===""}}var ad;if(af){ad="checkbox-checked";W.nfeditor("setReadOnly","nocursor")}else{ad="checkbox-unchecked"}V.addClass(ad);W.nfeditor("setValue",aa).nfeditor("selectAll")};this.serializeValue=function(){var ac=W.nfeditor("getValue");if(ac===""){if(V.hasClass("checkbox-checked")){return""}if(J.isRequiredProperty(X)){if(J.isBlank(X.defaultValue)){return U}return X.defaultValue}return null}if(W.nfeditor("isModified")===false){return U}return ac};this.applyValue=function(ac,ad){ac[Y.column.field]=ad};this.isValueChanged=function(){return ab.serializeValue()!==U};this.validate=function(){return{valid:true,msg:null}};this.init()}};var z=function(S,T){return function(ad){var ag={text:"Reference parameter...",value:undefined,optionClass:"combo-option-special"};var Y={text:"Loading parameters...",value:null,optionClass:"unset",disabled:true};var X={text:"Create new service...",value:"createControllerService",optionClass:"combo-option-special"};var af=this;var W=[];var ah=[];var ae=null;var V;var aa;var ac;var ab;var U=true;var Z;this.init=function(){var aj=A("body");var am=A(ad.grid.getContainerNode());var ar=am.data("descriptors");ab=ar[ad.item.property];var au=am.closest(".property-container");var ao=au.data("options");V=A('<div class="combo-editor"></div>').css({"z-index":1999,position:"absolute",padding:"10px 20px",overflow:"hidden","border-radius":"2px","box-shadow":"rgba(0, 0, 0, 0.247059) 0px 2px 5px","background-color":"rgb(255, 255, 255)",cursor:"move",transform:"translate3d(0px, 0px, 0px)"}).draggable({cancel:".button, .combo",containment:"parent"}).appendTo(aj);var al=J.getAllowableValues(ab);if(A.isArray(al)){A.each(al,function(aw,ax){var av=ax.allowableValue;W.push({text:av.displayName,value:av.value,disabled:ax.canRead===false&&av.value!==ad.item.previousValue,description:J.escapeHtml(av.description)})})}if(ab.required===false){W.push({text:"No value",value:null,optionClass:"unset"})}if(S){W.push(ag)}if(W.length===0){W.push({text:"No value",value:null,optionClass:"unset",disabled:true})}if(J.isDefinedAndNotNull(ab.identifiesControllerService)){W.push(X)}var an=ad.position;var ai=A(window).height();var aq=ai-an.bottom-16;var ak=Math.max(an.width-16,h);aa=A('<div class="value-combo combo"></div>').combo({options:W,maxHeight:aq,select:function(av){var aw=function(){af.cancel();E(am,ad.grid,ad.item,ab.identifiesControllerService,ab.identifiesControllerServiceBundle,ao)};if(S){if(J.isDefinedAndNotNull(ac)){if(av===ag){ac.show()}else{ac.hide();if(av===X){aw()}}}}else{if(av===X){aw()}}}}).css({"margin-top":"10px","margin-bottom":"10px",width:ak+"px"}).appendTo(V);if(S){ac=A('<div class="value-combo combo"></div>').combo({options:[Y],maxHeight:aq}).css({"margin-bottom":"10px",width:ak+"px"}).appendTo(V);Z=new A.Deferred(function(av){T(ab,function(aw){var ax=Q.sortBy(aw,"name");ax.forEach(function(ay){ah.push({text:ay.name,value:"#{"+ay.name+"}",description:J.escapeHtml(ay.description)})});ac.combo("destroy").combo({options:ah,maxHeight:aq});av.resolve();U=false})}).promise()}var at=A('<div class="secondary-button">Cancel</div>').css({color:"#004849",background:"#E3E8EB"}).hover(function(){A(this).css("background","#C7D2D7")},function(){A(this).css("background","#E3E8EB")}).on("click",af.cancel);var ap=A('<div class="button">Ok</div>').css({color:"#fff",background:"#728E9B"}).hover(function(){A(this).css("background","#004849")},function(){A(this).css("background","#728E9B")}).on("click",af.save);A("<div></div>").css({position:"relative",top:"10px",left:"20px",width:"212px","float":"right"}).append(ap).append(at).appendTo(V);af.position(an)};this.save=function(){ad.commitChanges()};this.cancel=function(){ad.cancelChanges()};this.hide=function(){V.hide()};this.show=function(){V.show()};this.position=function(ai){V.css({top:ai.top-24,left:ai.left-20})};this.destroy=function(){if(S){ac.combo("destroy")}aa.combo("destroy");V.remove();W.length=0;ah.length=0};this.focus=function(){};this.loadValue=function(aj){var ak;if(!J.isUndefined(aj.value)){ak=aj.value}else{if(J.isDefinedAndNotNull(ab.defaultValue)){ak=ab.defaultValue}}if(!J.isUndefined(ak)){ae=ak;var ai=W.find(function(am){return ae===am.value});if(!J.isUndefined(ai)){aa.combo("setSelectedOption",ai)}else{if(S&&o(ae)){aa.combo("setSelectedOption",ag);var al={value:ae};if(U){Z.then(function(){ac.combo("setSelectedOption",al)})}else{ac.combo("setSelectedOption",al)}}else{aa.combo("setSelectedOption",W[0])}}}else{aa.combo("setSelectedOption",W[0])}};this.serializeValue=function(){var aj=aa.combo("getSelectedOption");var ai=aj.value;if(S&&Q.isUndefined(ai)){aj=ac.combo("getSelectedOption");if(Q.isUndefined(aj)||aj===Y){ai=ae}else{ai=aj.value}}return ai};this.applyValue=function(ai,aj){ai[ad.column.field]=aj};this.isValueChanged=function(){var ai=af.serializeValue();return ai!==ae};this.validate=function(){return{valid:true,msg:null}};this.init()}};var H=function(ag,aj,Z,S){b.removeAllPropertyDetailDialogs();var af=ag.getData();var aa=af.getItem(Z);if(J.isDefinedAndNotNull(aa.value)){var ab=aj[aa.property];if(!J.isSensitiveProperty(ab)){var W=A(ag.getCellNode(Z,S));var X=W.offset();var Y=A('<div class="property-detail"></div>').css({"z-index":1999,position:"absolute",padding:"10px 20px",overflow:"hidden","border-radius":"2px","box-shadow":"rgba(0, 0, 0, 0.247059) 0px 2px 5px","background-color":"rgb(255, 255, 255)",cursor:"move",transform:"translate3d(0px, 0px, 0px)",top:X.top-24,left:X.left-20}).appendTo("body");var T=J.getAllowableValues(ab);if(A.isArray(T)){Y.draggable({cancel:".button, .combo",containment:"parent"});var U=[];A.each(T,function(al,am){var ak=am.allowableValue;U.push({text:ak.displayName,value:ak.value,description:J.escapeHtml(ak.description),disabled:true})});if(U.length===0){U.push({text:"No value",value:null,optionClass:"unset",disabled:true})}var ac=A(window).height();var ah=ac-(X.top+W.height())-16;var ai=W.width()-16;A('<div class="value-combo combo"></div>').css({width:ai,"margin-top":"10px","margin-bottom":"10px"}).combo({options:U,maxHeight:ah,selectedOption:{value:aa.value}}).appendTo(Y);A('<div class="button">Ok</div>').css({position:"relative",top:"10px",left:"20px"}).hover(function(){A(this).css("background","#004849")},function(){A(this).css("background","#728E9B")}).on("click",function(){Y.hide().remove()}).appendTo(Y)}else{var V=null;if(J.supportsEl(ab)){Y.css({"z-index":1999,position:"absolute",padding:"10px 20px",overflow:"hidden","border-radius":"2px","box-shadow":"rgba(0, 0, 0, 0.247059) 0px 2px 5px","background-color":"rgb(255, 255, 255)",cursor:"move",transform:"translate3d(0px, 0px, 0px)",top:X.top-22,left:X.left-43}).draggable({cancel:"input, textarea, pre, .button, .nf-editor",containment:"parent"});V=A("<div></div>").addClass("nf-editor").appendTo(Y).nfeditor({languageMode:nf.nfel,width:W.width(),content:aa.value,minWidth:175,minHeight:100,readOnly:true,resizable:true,escape:function(){ae()}})}else{Y.css({"z-index":1999,position:"absolute",padding:"10px 20px",overflow:"hidden","border-radius":"2px","box-shadow":"rgba(0, 0, 0, 0.247059) 0px 2px 5px","background-color":"rgb(255, 255, 255)",cursor:"move",transform:"translate3d(0px, 0px, 0px)",top:X.top-26,left:X.left-20});A('<textarea hidefocus rows="5" readonly="readonly" />').css({height:"80px",resize:"both",width:W.width()+"px",margin:"10px 0px","white-space":"pre"}).text(aa.value).on("keydown",function(ak){if(ak.which===A.ui.keyCode.ESCAPE){ae();ak.stopImmediatePropagation();ak.preventDefault()}}).appendTo(Y);Y.draggable({containment:"parent"})}var ae=function(){if(V!==null){V.nfeditor("destroy")}Y.hide().remove()};var ad=A('<div class="button">Ok</div>').css({position:"relative",top:"10px",left:"20px"}).hover(function(){A(this).css("background","#004849")},function(){A(this).css("background","#728E9B")}).on("click",function(){ae()});A("<div></div>").append(ad).append('<div class="clear"></div>').appendTo(Y)}}}};var E=function(S,U,V,W,T,X){A.ajax({type:"GET",url:"../nifi-api/flow/controller-service-types",data:{serviceType:W,serviceBundleGroup:T.group,serviceBundleArtifact:T.artifact,serviceBundleVersion:T.version},dataType:"json"}).done(function(Z){var ap=S.data("descriptors");var ag=ap[V.property];var an=new Map();var ae=[];A.each(Z.controllerServiceTypes,function(aq,ar){an.set(aq,ar);ae.push({text:J.formatType(ar),value:aq,description:J.escapeHtml(ar.description)})});if(ae.length===0){i.showOkDialog({headerText:"Controller Service",dialogContent:"No controller service types found that are applicable for this property."})}else{var al='<div id="new-inline-controller-service-dialog" class="hidden dialog medium-dialog cancellable"><div class="dialog-content"><div><div class="setting-name">Requires Controller Service</div><div class="setting-field"><div class="new-inline-controller-service-requirement"></div></div></div><div><div class="setting-name">Compatible Controller Services</div><div class="setting-field"><div class="new-inline-controller-service-combo"></div></div></div><div><div class="setting-name">Controller Service Name</div><div class="setting-field"><input type="text" class="new-inline-controller-service-name"/></div></div><div><div class="setting-name">Bundle</div><div class="setting-field"><div class="new-inline-controller-service-bundle"></div></div></div><div><div class="setting-name">Tags</div><div class="setting-field"><div class="new-inline-controller-service-tags"></div></div></div><div><div class="setting-name">Description</div><div class="setting-field"><div class="new-inline-controller-service-description"></div></div></div></div></div>';var ak=A(al).appendTo(X.dialogContainer);var aa=ak.find("div.new-inline-controller-service-requirement");var ah=ak.find("div.new-inline-controller-service-combo");var ao=ak.find("input.new-inline-controller-service-name");var af=ak.find("div.new-inline-controller-service-bundle");var ac=ak.find("div.new-inline-controller-service-tags");var am=ak.find("div.new-inline-controller-service-description");var ab=J.formatType({type:ag.identifiesControllerService,bundle:ag.identifiesControllerServiceBundle});var aj=J.formatBundle(ag.identifiesControllerServiceBundle);aa.text(ab+" from "+aj);ae.sort(function(ar,aq){var at=an.get(ar.value);var aw=an.get(aq.value);var av=J.substringAfterLast(at.type,".");var au=J.substringAfterLast(aw.type,".");return av===au?-J.sortVersion(at.bundle.version,aw.bundle.version):av>au?1:-1});var Y=J.formatClassName(an.get(0));ao.val(Y);ah.combo({options:ae,select:function(ar){var aq=an.get(ar.value);af.text(J.formatBundle(aq.bundle));ac.text(aq.tags.join(", "));am.text(aq.description);if(Y===ao.val().trim()){Y=J.formatClassName(aq);ao.val(Y)}}});ak.modal({headerText:"Add Controller Service",scrollableContentStyle:"scrollable",buttons:[{buttonText:"Create",color:{base:"#728E9B",hover:"#004849",text:"#ffffff"},handler:{click:function(){ai()}}},{buttonText:"Cancel",color:{base:"#E3E8EB",hover:"#C7D2D7",text:"#004849"},handler:{click:function(){ad()}}}]});var ai=function(){var at=ah.combo("getSelectedOption").value;var au=an.get(at);var ar=ao.val();var aq={revision:f.getRevision({revision:{version:0,}}),disconnectedNodeAcknowledged:t.isDisconnectionAcknowledged(),component:{type:au.type,bundle:au.bundle}};if(ar.trim()!==""){aq.component.name=ar.trim()}var av="../nifi-api/controller/controller-services";if(J.isDefinedAndNotNull(L)){av="../nifi-api/process-groups/"+encodeURIComponent(L)+"/controller-services"}A.ajax({type:"POST",url:av,data:JSON.stringify(aq),dataType:"json",contentType:"application/json"}).done(function(aw){X.descriptorDeferred(V.property,false).done(function(aA){var az=aA.propertyDescriptor;var ax=S.data("descriptors");if(!J.isUndefined(ax)){ax[az.name]=az}var ay=U.getData();ay.updateItem(V.id,A.extend(V,{value:aw.component.id}));ak.modal("hide")});if(typeof X.controllerServiceCreatedDeferred==="function"){X.controllerServiceCreatedDeferred(aw)}p(S)}).fail(c.handleAjaxError)};var ad=function(){ak.modal("hide")};ak.modal("show")}}).fail(c.handleAjaxError)};var s=function(ab,ac){var S=function(){var ad=ab.closest(".dialog");if(ad.hasClass("modal")){ad.modal("hide")}else{ad.hide()}};var Y=function(am,ak,aj,ag,ae){var ai=30;var ad=A("<div></div>");var af=A("<span/>").addClass("table-cell").text(aj).appendTo(ad);if(ae.type==="required"){af.addClass("required")}var al=ab.data("descriptors");var ah=al[ae.property];if(J.isDefinedAndNotNull(ah)){if(!J.isBlank(ah.description)||!J.isBlank(ah.defaultValue)||!J.isBlank(ah.supportsEl)){A('<div class="fa fa-question-circle" alt="Info" style="float: right;"></div>').appendTo(ad);A('<span class="hidden property-descriptor-name"></span>').text(ae.property).appendTo(ad);ai=46}}af.width(ag.width-ai).ellipsis();return ad.html()};var Z=function(ap,an,am,ag,ad){var ak;var aj=0;if(J.isDefinedAndNotNull(am)){var ao=ab.data("descriptors");var ai=ao[ad.property];if(J.isSensitiveProperty(ai)){ak='<span class="table-cell sensitive">Sensitive value set</span>'}else{var af=false;var ae=J.getAllowableValues(ai);if(A.isArray(ae)){A.each(ae,function(aq,at){var ar=at.allowableValue;if(am===ar.value){am=ar.displayName;af=true;return false}})}if(am===""){ak='<span class="table-cell blank">Empty string set</span>'}else{aj=10;if(J.isMultiLine(am)){ak='<div class="table-cell value"><div class="ellipsis-white-space-pre multi-line-clamp-ellipsis">'+J.escapeHtml(am)+"</div></div>"}else{ak='<div class="table-cell value"><div class="ellipsis-white-space-pre">'+J.escapeHtml(am)+"</div></div>"}if(J.hasLeadTrailWhitespace(am)){ak+='<div class="fa fa-info" alt="Info" style="float: right;"></div>';aj=20}}}}else{ak='<span class="unset">No value set</span>'}var ah=A(ak);if(ad.type==="required"){ah.addClass("required")}var al=ah.find(".ellipsis-white-space-pre");al.attr("title",al.text()).width(ag.width-10-aj);return A("<div />").append(ah).html()};var T=[{id:"property",field:"displayName",name:"Property",sortable:false,resizable:true,rerenderOnResize:true,formatter:Y},{id:"value",field:"value",name:"Value",sortable:false,resizable:true,cssClass:"pointer",rerenderOnResize:true,formatter:Z}];var X=function(ar,an,am,ah,af){var aq="";var ap=ab.data("descriptors");var aj=ap[af.property];var ae=J.isDefinedAndNotNull(aj.identifiesControllerService);var ad=J.isDefinedAndNotNull(af.value);if(ae&&ad&&(ac.supportsGoTo===true)){A.each(aj.allowableValues,function(at,av){var au=av.allowableValue;if(au.value===af.value){aq+='<div class="pointer go-to-service fa fa-long-arrow-right" title="Go To"></div>';return false}})}var ai=y(af.value);var ao=false;var ag=false;if(Q.isFunction(ac.getParameterContext)){var al=ac.getParameterContext(L);var ak=Q.get(al,"permissions.canWrite",false);ag=Q.get(al,"permissions.canRead",false);ao=ak&&ag}if(ai&&ag){aq+='<div title="Go to parameter" class="go-to-parameter pointer fa fa-long-arrow-right"></div>'}if(ac.readOnly!==true){if(ao&&!ai){aq+='<div title="Convert to parameter" class="convert-to-parameter pointer fa fa-level-up"></div>'}if(af.type==="userDefined"){aq+='<div title="Delete" class="delete-property pointer fa fa-trash"></div>'}}return aq};T.push({id:"actions",name:"&nbsp;",minWidth:20,width:20,formatter:X});var U={autosizeColsMode:a.GridAutosizeColsMode.LegacyForceFit,enableTextSelectionOnCells:true,enableCellNavigation:true,enableColumnReorder:false,editable:ac.readOnly!==true,enableAddRow:false,autoEdit:false,rowHeight:24};var aa=new a.Data.DataView({inlineFilters:false});aa.setItems([]);aa.setFilterArgs({searchString:"",property:"hidden"});aa.setFilter(C);aa.getItemMetadata=function(ae){var ah=aa.getItem(ae);var ag=ab.data("descriptors");var ad=ag[ah.property];var aj=function(al,ak,am){ak(J.isSensitiveProperty(al),L).done(function(an){l=an;am(an)})};var af=typeof ac.parameterDeferred==="function";if(J.isUndefinedOrNull(ad)||J.supportsEl(ad)){return{columns:{value:{editor:g(function(ak){if(af){nf.nfel.enableParameters();aj(ak,ac.parameterDeferred,nf.nfel.setParameters)}else{nf.nfel.disableParameters()}return nf.nfel})}}}}else{var ai=J.getAllowableValues(ad);if(A.isArray(ai)){return{columns:{value:{editor:z(af,function(ak,al){if(af){aj(ak,ac.parameterDeferred,al)}})}}}}else{return{columns:{value:{editor:g(function(ak){if(af){nf.nfpr.enableParameters();aj(ak,ac.parameterDeferred,nf.nfpr.setParameters)}else{nf.nfpr.disableParameters()}return nf.nfpr})}}}}}};var W=function(ad){A.ajax({type:"GET",url:"../nifi-api/controller-services/"+encodeURIComponent(ad.value),dataType:"json",data:{uiOnly:true}}).done(function(ae){S();var af=ae.component;A.Deferred(function(ag){if(J.isDefinedAndNotNull(af.parentGroupId)){x.enterGroup(af.parentGroupId).done(function(){if(A("#process-group-configuration").is(":visible")){D.loadConfiguration(af.parentGroupId).done(function(){ag.resolve()})}else{D.showConfiguration(af.parentGroupId).done(function(){ag.resolve()})}})}else{if(A("#settings").is(":visible")){G.loadSettings().done(function(){ag.resolve()})}else{G.showSettings().done(function(){ag.resolve()})}}}).done(function(){if(J.isDefinedAndNotNull(af.parentGroupId)){D.selectControllerService(ad.value)}else{G.selectControllerService(ad.value)}})}).fail(c.handleAjaxError)};var V=new a.Grid(ab,aa,T,U);V.setSelectionModel(new a.RowSelectionModel());V.onClick.subscribe(function(ah,aj){if(V.getColumns()[aj.cell].id==="value"){if(ac.readOnly===true){var an=ab.data("descriptors");H(V,an,aj.row,aj.cell)}else{V.gotoCell(aj.row,aj.cell,true)}ah.stopImmediatePropagation()}else{if(V.getColumns()[aj.cell].id==="actions"){var am=aa.getItem(aj.row);var ai=A(ah.target);if(ai.hasClass("delete-property")){aa.updateItem(am.id,A.extend(am,{hidden:true}));var an=ab.data("descriptors");delete an[am.property];ah.stopImmediatePropagation()}else{if(ai.hasClass("go-to-service")){if(ac.readOnly===true){W(am)}else{if(typeof ac.goToServiceDeferred==="function"){ac.goToServiceDeferred().done(function(){W(am)})}}}else{if(ai.hasClass("convert-to-parameter")){var ad;var ao=false;if(Q.isFunction(ac.getParameterContext)){ad=ac.getParameterContext(L);var ak=Q.get(ad,"permissions.canWrite",false);var ae=Q.get(ad,"permissions.canRead",false);ao=ak&&ae}if(ac.readOnly!==true&&ao){var an=ab.data("descriptors");var ag=an[am.property];N.convertPropertyToParameter(am,ag,ad.id).done(function(ar){var aq=Q.extend({},am,{previousValue:am.value,value:"#{"+ar.name+"}"});aa.updateItem(am.id,aq)})}}else{if(ai.hasClass("go-to-parameter")){var ad;if(Q.isFunction(ac.getParameterContext)){ad=ac.getParameterContext(L);var ae=Q.get(ad,"permissions.canRead",false);if(ae&&!Q.isNil(am.value)){var af=/#{([a-zA-Z0-9-_. ]+)}/;var ap=am.value.match(af);if(!Q.isEmpty(ap)&&ap.length===2){S();var al=ap[1];N.showParameterContext(ad.id,null,al)}}}}}}}}}});V.onKeyDown.subscribe(function(ae,ad){if(ae.which===A.ui.keyCode.ESCAPE){var af=V.getEditorLock();if(af.isActive()){af.cancelCurrentEdit();ae.stopImmediatePropagation();ae.preventDefault()}}});if(ac.readOnly!==true){V.onBeforeEditCell.subscribe(function(ae,ad){J.cleanUpTooltips(ab,"div.fa-question-circle, div.fa-info")});V.onBeforeCellEditorDestroy.subscribe(function(ae,ad){p(ab)})}aa.onRowCountChanged.subscribe(function(ae,ad){V.updateRowCount();V.render()});aa.onRowsChanged.subscribe(function(ae,ad){V.invalidateRows(ad.rows);V.render()});ab.data("gridInstance",V).on("mouseenter","div.slick-cell",function(af){var aj=A(this).find("div.fa-question-circle");if(aj.length&&!aj.data("qtip")){var ak=A(this).find("span.property-descriptor-name").text();var am=ab.data("descriptors");var ah=am[ak];var ag=ab.data("history");var ai;if(ag){ai=ag[ak]}var ad=J.formatPropertyTooltip(ah,ai);if(J.isDefinedAndNotNull(ad)){aj.qtip(A.extend({},J.config.tooltipConfig,{content:ad}))}}var al=A(this).find("div.fa-info");if(al.length&&!al.data("qtip")){var ae=J.formatWhitespaceTooltip();al.qtip(A.extend({},J.config.tooltipConfig,{content:ae}))}})};var p=function(S){setTimeout(function(){var U=S.data("gridInstance");var W=U.getData();var V=S.data("descriptors");var T=W.getItems();A.each(T,function(ab,Y){var aa=V[Y.property];var X=false;if(!aa.dynamic){var Z=false;if(aa.dependencies.length>0){A.each(aa.dependencies,function(ad,ac){if(Z){return false}A.each(T,function(af,ah){if(ah.property===ac.propertyName){X=true;if(ah.hidden===false){var ae=ah.value;if(!Q.isEmpty(l)){const ag=d(ae);if(ag.length>0){ag.forEach(function(ai){ae=ae.replace("#{"+ai.name+"}",J.isDefinedAndNotNull(ai.value)?ai.value:"")})}}if(ae){if(ac.dependentValues){Z=!ac.dependentValues.includes(ae)}else{Z=false}}else{Z=true}}else{Z=true}if(Z){return false}}})})}}else{Z=Y.hidden}W.beginUpdate();W.updateItem(ab,A.extend(Y,{hidden:Z,dependent:X}));W.endUpdate();Z=false});U.resizeCanvas()},50)};var v=function(U){var T=U.data("gridInstance");if(J.isDefinedAndNotNull(T)){var S=T.getEditController();S.commitCurrentEdit()}};var q=function(V){var T={};var S=V.data("gridInstance");var U=S.getData();A.each(U.getItems(),function(){if(this.hidden===true&&!(this.dependent===true)){T[this.property]=null}else{if(this.value!==this.previousValue){T[this.property]=this.value}}});return T};var r=function(U){var S=[];var T=U.data("descriptors");A.each(T,function(){if(J.isSensitiveProperty(this)===true&&J.isDynamicProperty(this)===true){S.push(this.name)}});return S};var C=function(T,S){return T.hidden===false};var K=function(X,V,W,Y,U){X.data({descriptors:W,history:Y});if(Q.isFunction(U.parameterDeferred)&&Q.isFunction(U.getParameterContext)){var T=U.getParameterContext(L);var S=Q.get(T,"permissions.canRead",false);if(S){U.parameterDeferred(false,L).done(function(Z){l=Z;j(X,V,W)});return}}j(X,V,W)};var j=function(X,U,V){var S=X.data("gridInstance");var W=S.getData();if(J.isDefinedAndNotNull(U)){W.beginUpdate();var T=0;A.each(U,function(Z,ad){var ae=V[Z];var ab="userDefined";var Y=Z;if(J.isDefinedAndNotNull(ae)){if(J.isRequiredProperty(ae)){ab="required"}else{if(J.isDynamicProperty(ae)){ab="userDefined"}else{ab="optional"}}Y=ae.displayName;if(J.isNull(ad)&&J.isDefinedAndNotNull(ae.defaultValue)){ad=ae.defaultValue}}var ac=false;var aa=false;if(ae.dependencies.length>0){A.each(ae.dependencies,function(ah,ag){if(ac){return false}var af=W.getItems();A.each(af,function(aj,al){if(al.property===ag.propertyName){aa=true;if(al.hidden===false){var ai=al.value;if(!Q.isEmpty(l)){const ak=d(ai);if(ak.length>0){ak.forEach(function(am){ai=ai.replace("#{"+am.name+"}",J.isDefinedAndNotNull(am.value)?am.value:"")})}}if(ai){if(ag.dependentValues){ac=!ag.dependentValues.includes(ai)}else{ac=false}}else{ac=true}}else{ac=true}if(ac){return false}}})})}W.addItem({id:T++,hidden:ac,dependent:aa,property:Z,displayName:Y,previousValue:ad,value:ad,type:ab});ac=false});W.endUpdate()}};var F=function(W){l=null;var T=W.data("options");if(T.readOnly===true){b.removeAllPropertyDetailDialogs()}else{if(J.isDefinedAndNotNull(T.dialogContainer)){A("#new-property-dialog").modal("hide")}}var V=W.find("div.property-table");V.removeData("descriptors history");J.cleanUpTooltips(V,"div.fa-question-circle, div.fa-info");var S=V.data("gridInstance");var U=S.getData();U.setItems([])};var d=function(V){if(Q.isEmpty(l)){return[]}var X=[];if(!Q.isNil(V)){var T=/#{(')?([a-zA-Z0-9-_. ]+)\1}/gm;var S;while((S=T.exec(V))!==null){if(S.index===T.lastIndex){T.lastIndex++}if(!Q.isEmpty(S)&&S.length===3){const U=S[2];var W=l.find(function(Y){return Y.name===U});if(!Q.isNil(W)){X.push(W)}}}}return X};var B={init:function(S){return this.each(function(){if(J.isDefinedAndNotNull(S)){var Z=A(this);Z.empty().unbind().addClass("property-container").data("options",S);var Y=A('<div class="properties-header"></div>').appendTo(Z);A('<div class="required-property-note">Required field</div>').appendTo(Y);var af=A('<div class="property-table"></div>').appendTo(Z);if(S.readOnly!==true&&J.isDefinedAndNotNull(S.dialogContainer)){var W='<div id="new-property-dialog" class="dialog cancellable small-dialog hidden"><div class="dialog-content"><div class="setting"><div class="setting-name">Property name</div><div class="setting-field new-property-name-container"><input class="new-property-name" type="text"/></div></div><div class="setting"><div class="setting-name">Sensitive Value <span class="fa fa-question-circle" alt="Info" title="Components must declare support for Sensitive Dynamic Properties to enable selection of Sensitive Value status. Components that flag dynamic properties as sensitive do not allow Sensitive Value status to be changed."></span></div><div class="setting-field"><input id="value-sensitive-radio-button" type="radio" name="sensitive" value="sensitive" /> Yes<input id="value-not-sensitive-radio-button" type="radio" name="sensitive" value="plain" style="margin-left: 20px;"/> No</div></div></div></div>';var U=A(W).appendTo(S.dialogContainer);var X=U.find("input.new-property-name");var V=U.find("#value-sensitive-radio-button");var aa=U.find("#value-not-sensitive-radio-button");U.modal({headerText:"Add Property",buttons:[{buttonText:"Ok",color:{base:"#728E9B",hover:"#004849",text:"#ffffff"},handler:{click:function(){ae()}}},{buttonText:"Cancel",color:{base:"#E3E8EB",hover:"#C7D2D7",text:"#004849"},handler:{click:function(){ad()}}}]});var ae=function(){var ah=A.trim(X.val());if(ah!==""){var ai=af.data("gridInstance");var ak=ai.getData();var aj=null;A.each(ak.getItems(),function(am,an){if(ah===an.property){aj=an;return false}});if(aj===null||aj.hidden===true){var ag=V.prop("checked");S.descriptorDeferred(ah,ag).done(function(am){var ao=am.propertyDescriptor;var an=af.data("descriptors");if(!J.isUndefined(an)){an[ao.name]=ao}if(aj===null){var aq=ak.getItems().length;ak.addItem({id:aq,hidden:false,property:ah,displayName:ah,previousValue:null,value:null,type:"userDefined"});var ap=ak.getRowById(aq);ai.setActiveCell(ap,ai.getColumnIndex("value"));ai.editActiveCell()}else{ak.updateItem(aj.id,A.extend(aj,{hidden:false,previousValue:null,value:null}));var ap=ak.getRowById(aj.id);ai.invalidateRow(ap);ai.render();ai.setActiveCell(ap,ai.getColumnIndex("value"));ai.editActiveCell()}})}else{i.showOkDialog({headerText:"Property Exists",dialogContent:"A property with this name already exists."});var al=ak.getRowById(aj.id);ai.setSelectedRows([al]);ai.scrollRowIntoView(al)}}else{i.showOkDialog({headerText:"Property Name",dialogContent:"Property name must be specified."})}U.modal("hide")};var ad=function(){U.modal("hide")};X.on("keydown",function(ah){var ag=ah.keyCode?ah.keyCode:ah.which;if(ag===A.ui.keyCode.ENTER){ae();ah.stopImmediatePropagation();ah.preventDefault()}});U.on("click","div.new-property-ok",ae).on("click","div.new-property-cancel",ad);var ab=A('<div class="add-property" title="Add Property"></div>').appendTo(Y);A('<button class="button fa fa-plus"></button>').on("click",function(){v(af);X.val("");U.modal("show");X.focus();V.prop("checked",false);aa.prop("checked",true);var ag=O!==true;V.prop("disabled",ag);aa.prop("disabled",ag)}).appendTo(ab);var T=A('<div class="verify-properties hidden" title="Verify Properties"></div>').appendTo(Y);A('<button class="button fa fa-check-circle-o"></button>').on("click",function(){v(af);w(q(af))}).appendTo(T);w=S.propertyVerificationCallback;var ac=typeof w==="function";T.toggleClass("hidden",!ac)}A('<div class="clear"></div>').appendTo(Y);s(af,S)}})},loadProperties:function(T,U,V){var S=this;return S.each(function(){var Y=A(this);var W=Y.data("options");var X=Y.find("div.property-table");K(X,T,U,V,W)})},saveRow:function(){return this.each(function(){var S=A(this).find("div.property-table");v(S)})},resetTableSize:function(){return this.each(function(){var T=A(this).find("div.property-table");var S=T.data("gridInstance");if(J.isDefinedAndNotNull(S)){S.resizeCanvas()}})},cancelEdit:function(){return this.each(function(){var U=A(this).find("div.property-table");var T=U.data("gridInstance");if(J.isDefinedAndNotNull(T)){var S=T.getEditController();S.cancelCurrentEdit()}})},destroy:function(){return this.each(function(){var T=A(this);var S=T.data("options");if(J.isDefinedAndNotNull(S)){F(T);if(J.isDefinedAndNotNull(S.dialogContainer)){A("#new-property-dialog").modal("hide");A(S.dialogContainer).children("div.new-inline-controller-service-dialog").remove()}}})},clear:function(){return this.each(function(){F(A(this))})},isSaveRequired:function(){var S=false;this.each(function(){var V=A(this).find("div.property-table");var T=V.data("gridInstance");var U=T.getData();A.each(U.getItems(),function(){if(this.value!==this.previousValue){S=true;return false}});return false});return S},marshalProperties:function(){var S={};this.each(function(){var T=A(this).find("div.property-table");S=q(T);return false});return S},getSensitiveDynamicPropertyNames:function(){var S=[];this.each(function(){var T=A(this).find("div.property-table");S=r(T);return false});return S},setGroupId:function(S){return this.each(function(){L=S})},setSupportsSensitiveDynamicProperties:function(S){return this.each(function(){O=S})},setPropertyVerificationCallback:function(S){return this.each(function(){w=S;var T=typeof S==="function";A(this).find("div.verify-properties").toggleClass("hidden",!T)})}};A.fn.propertytable=function(S){if(B[S]){return B[S].apply(this,Array.prototype.slice.call(arguments,1))}else{return B.init.apply(this,arguments)}}}));