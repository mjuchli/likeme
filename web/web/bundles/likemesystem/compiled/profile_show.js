;(function ( $, window, document, undefined ) {


$.widget( "likeme.locationcomplete",  {

	_create: function() {
		var self = this,
			select = this.element.hide(),
			selected = select.children( ":selected" ), value = selected.val() ? selected.text() : "";
			
			//set name when id is already set
			this.selectitem(self.element.val());
			
			var input = this.input = $( "<input>" )
							.attr("id", "show_location")
							.insertAfter( select )
							.val( value )
							.autocomplete({
								source: function( request, response ) {
									$.ajax({
										url: Routing.generate('location_get', { "input": request.term }),
										dataType: "json",
										data: {
										
										},
										success: function( data ) {
											response( $.map( data, function( item ) {
												return {
													label: item.postalcode + " " + item.placename + ", " + item.statecode,
													value: item.postalcode + " " + item.placename + ", " + item.statecode,
													id: item.id
												};
											}));
										}
									});
								},
								select: function( event, ui ) {
										self.element.val(ui.item.id);		
								},
								change: function( event, ui ) {
									if (!ui.item) {
										self.element.val("");	
										self.element.blur();
										input.val("");
									} else {
										self.element.blur();
									}
							    }
							} ).blur(function() {
								self.element.blur();
							});
			 
	},
	selectitem: function( id ) {
		if(id !== '') {
			var self = this;
			$.ajax({
				url: Routing.generate('location_by_id', { "id": id }),
				dataType: "json",
				data: {
				
				},
				success: function( data ) {
					$.map( data, function( item ) {
						$("#show_location").val(item.postalcode + " " + item.placename + ", " + item.statecode);
					});
				}
			});
		} 
	}
	
});


$('#likeme_user_profile_location').locationcomplete(); 	

})( jQuery, window, document );



/**
 * jquery.Jcrop.min.js v0.9.10 (build:20120429)
 * jQuery Image Cropping Plugin - released under MIT License
 * Copyright (c) 2008-2012 Tapmodo Interactive LLC
 * https://github.com/tapmodo/Jcrop
 */
(function(a){a.Jcrop=function(b,c){function h(a){return a+"px"}function i(a){return d.baseClass+"-"+a}function j(){return a.fx.step.hasOwnProperty("backgroundColor")}function k(b){var c=a(b).offset();return[c.left,c.top]}function l(a){return[a.pageX-e[0],a.pageY-e[1]]}function m(b){typeof b!="object"&&(b={}),d=a.extend(d,b),a.each(["onChange","onSelect","onRelease","onDblClick"],function(a,b){typeof d[b]!="function"&&(d[b]=function(){})})}function n(a,b){e=k(E),bd.setCursor(a==="move"?a:a+"-resize");if(a==="move")return bd.activateHandlers(p(b),u);var c=ba.getFixed(),d=q(a),f=ba.getCorner(q(d));ba.setPressed(ba.getCorner(d)),ba.setCurrent(f),bd.activateHandlers(o(a,c),u)}function o(a,b){return function(c){if(!d.aspectRatio)switch(a){case"e":c[1]=b.y2;break;case"w":c[1]=b.y2;break;case"n":c[0]=b.x2;break;case"s":c[0]=b.x2}else switch(a){case"e":c[1]=b.y+1;break;case"w":c[1]=b.y+1;break;case"n":c[0]=b.x+1;break;case"s":c[0]=b.x+1}ba.setCurrent(c),bc.update()}}function p(a){var b=a;return be.watchKeys(),function(
a){ba.moveOffset([a[0]-b[0],a[1]-b[1]]),b=a,bc.update()}}function q(a){switch(a){case"n":return"sw";case"s":return"nw";case"e":return"nw";case"w":return"ne";case"ne":return"sw";case"nw":return"se";case"se":return"nw";case"sw":return"ne"}}function r(a){return function(b){return d.disabled?!1:a==="move"&&!d.allowMove?!1:(e=k(E),X=!0,n(a,l(b)),b.stopPropagation(),b.preventDefault(),!1)}}function s(a,b,c){var d=a.width(),e=a.height();d>b&&b>0&&(d=b,e=b/a.width()*a.height()),e>c&&c>0&&(e=c,d=c/a.height()*a.width()),U=a.width()/d,V=a.height()/e,a.width(d).height(e)}function t(a){return{x:a.x*U,y:a.y*V,x2:a.x2*U,y2:a.y2*V,w:a.w*U,h:a.h*V}}function u(a){var b=ba.getFixed();b.w>d.minSelect[0]&&b.h>d.minSelect[1]?(bc.enableHandles(),bc.done()):bc.release(),bd.setCursor(d.allowSelect?"crosshair":"default")}function v(a){if(d.disabled)return!1;if(!d.allowSelect)return!1;X=!0,e=k(E),bc.disableHandles(),bd.setCursor("crosshair");var b=l(a);return ba.setPressed(b),bc.update(),bd.activateHandlers(w,u),be.watchKeys(),a.stopPropagation
(),a.preventDefault(),!1}function w(a){ba.setCurrent(a),bc.update()}function z(){var b=a("<div></div>").addClass(i("tracker"));return a.browser.msie&&b.css({opacity:0,backgroundColor:"white"}),b}function bf(a){H.removeClass().addClass(i("holder")).addClass(a)}function bg(a,b){function t(){window.setTimeout(u,l)}var c=a[0]/U,e=a[1]/V,f=a[2]/U,g=a[3]/V;if(Y)return;var h=ba.flipCoords(c,e,f,g),i=ba.getFixed(),j=[i.x,i.y,i.x2,i.y2],k=j,l=d.animationDelay,m=h[0]-j[0],n=h[1]-j[1],o=h[2]-j[2],p=h[3]-j[3],q=0,r=d.swingSpeed;x=k[0],y=k[1],f=k[2],g=k[3],bc.animMode(!0);var s,u=function(){return function(){q+=(100-q)/r,k[0]=x+q/100*m,k[1]=y+q/100*n,k[2]=f+q/100*o,k[3]=g+q/100*p,q>=99.8&&(q=100),q<100?(bi(k),t()):(bc.done(),typeof b=="function"&&b.call(bt))}}();t()}function bh(a){bi([a[0]/U,a[1]/V,a[2]/U,a[3]/V]),d.onSelect.call(bt,t(ba.getFixed())),bc.enableHandles()}function bi(a){ba.setPressed([a[0],a[1]]),ba.setCurrent([a[2],a[3]]),bc.update()}function bj(){return t(ba.getFixed())}function bk(){return ba.getFixed()}function bl
(a){m(a),bs()}function bm(){d.disabled=!0,bc.disableHandles(),bc.setCursor("default"),bd.setCursor("default")}function bn(){d.disabled=!1,bs()}function bo(){bc.done(),bd.activateHandlers(null,null)}function bp(){H.remove(),B.show(),a(b).removeData("Jcrop")}function bq(a,b){bc.release(),bm();var c=new Image;c.onload=function(){var e=c.width,f=c.height,g=d.boxWidth,h=d.boxHeight;E.width(e).height(f),E.attr("src",a),I.attr("src",a),s(E,g,h),F=E.width(),G=E.height(),I.width(F).height(G),N.width(F+M*2).height(G+M*2),H.width(F).height(G),bb.resize(F,G),bn(),typeof b=="function"&&b.call(bt)},c.src=a}function br(a,b,c){var e=b||d.bgColor;d.bgFade&&j()&&d.fadeTime&&!c?a.animate({backgroundColor:e},{queue:!1,duration:d.fadeTime}):a.css("backgroundColor",e)}function bs(a){d.allowResize?a?bc.enableOnly():bc.enableHandles():bc.disableHandles(),bd.setCursor(d.allowSelect?"crosshair":"default"),bc.setCursor(d.allowMove?"move":"default"),d.hasOwnProperty("trueSize")&&(U=d.trueSize[0]/F,V=d.trueSize[1]/G),d.hasOwnProperty("setSelect"
)&&(bh(d.setSelect),bc.done(),delete d.setSelect),bb.refresh(),d.bgColor!=O&&(br(d.shade?bb.getShades():H,d.shade?d.shadeColor||d.bgColor:d.bgColor),O=d.bgColor),P!=d.bgOpacity&&(P=d.bgOpacity,d.shade?bb.refresh():bc.setBgOpacity(P)),Q=d.maxSize[0]||0,R=d.maxSize[1]||0,S=d.minSize[0]||0,T=d.minSize[1]||0,d.hasOwnProperty("outerImage")&&(E.attr("src",d.outerImage),delete d.outerImage),bc.refresh()}var d=a.extend({},a.Jcrop.defaults),e,f,g=!1;a.browser.msie&&a.browser.version.split(".")[0]==="6"&&(g=!0),typeof b!="object"&&(b=a(b)[0]),typeof c!="object"&&(c={}),m(c);var A={border:"none",visibility:"visible",margin:0,padding:0,position:"absolute",top:0,left:0},B=a(b),C=!0;if(b.tagName=="IMG"){if(B[0].width!=0&&B[0].height!=0)B.width(B[0].width),B.height(B[0].height);else{var D=new Image;D.src=B[0].src,B.width(D.width),B.height(D.height)}var E=B.clone().removeAttr("id").css(A).show();E.width(B.width()),E.height(B.height()),B.after(E).hide()}else E=B.css(A).show(),C=!1,d.shade===null&&(d.shade=!0);s(E,d.boxWidth,d.
boxHeight);var F=E.width(),G=E.height(),H=a("<div />").width(F).height(G).addClass(i("holder")).css({position:"relative",backgroundColor:d.bgColor}).insertAfter(B).append(E);d.addClass&&H.addClass(d.addClass);var I=a("<div />"),J=a("<div />").width("100%").height("100%").css({zIndex:310,position:"absolute",overflow:"hidden"}),K=a("<div />").width("100%").height("100%").css("zIndex",320),L=a("<div />").css({position:"absolute",zIndex:600}).dblclick(function(){var a=ba.getFixed();d.onDblClick.call(bt,a)}).insertBefore(E).append(J,K);C&&(I=a("<img />").attr("src",E.attr("src")).css(A).width(F).height(G),J.append(I)),g&&L.css({overflowY:"hidden"});var M=d.boundary,N=z().width(F+M*2).height(G+M*2).css({position:"absolute",top:h(-M),left:h(-M),zIndex:290}).mousedown(v),O=d.bgColor,P=d.bgOpacity,Q,R,S,T,U,V,W=!0,X,Y,Z;e=k(E);var _=function(){function a(){var a={},b=["touchstart","touchmove","touchend"],c=document.createElement("div"),d;try{for(d=0;d<b.length;d++){var e=b[d];e="on"+e;var f=e in c;f||(c.setAttribute(e,"return;"
),f=typeof c[e]=="function"),a[b[d]]=f}return a.touchstart&&a.touchend&&a.touchmove}catch(g){return!1}}function b(){return d.touchSupport===!0||d.touchSupport===!1?d.touchSupport:a()}return{createDragger:function(a){return function(b){return b.pageX=b.originalEvent.changedTouches[0].pageX,b.pageY=b.originalEvent.changedTouches[0].pageY,d.disabled?!1:a==="move"&&!d.allowMove?!1:(X=!0,n(a,l(b)),b.stopPropagation(),b.preventDefault(),!1)}},newSelection:function(a){return a.pageX=a.originalEvent.changedTouches[0].pageX,a.pageY=a.originalEvent.changedTouches[0].pageY,v(a)},isSupported:a,support:b()}}(),ba=function(){function h(d){d=n(d),c=a=d[0],e=b=d[1]}function i(a){a=n(a),f=a[0]-c,g=a[1]-e,c=a[0],e=a[1]}function j(){return[f,g]}function k(d){var f=d[0],g=d[1];0>a+f&&(f-=f+a),0>b+g&&(g-=g+b),G<e+g&&(g+=G-(e+g)),F<c+f&&(f+=F-(c+f)),a+=f,c+=f,b+=g,e+=g}function l(a){var b=m();switch(a){case"ne":return[b.x2,b.y];case"nw":return[b.x,b.y];case"se":return[b.x2,b.y2];case"sw":return[b.x,b.y2]}}function m(){if(!d.aspectRatio
)return p();var f=d.aspectRatio,g=d.minSize[0]/U,h=d.maxSize[0]/U,i=d.maxSize[1]/V,j=c-a,k=e-b,l=Math.abs(j),m=Math.abs(k),n=l/m,r,s,t,u;return h===0&&(h=F*10),i===0&&(i=G*10),n<f?(s=e,t=m*f,r=j<0?a-t:t+a,r<0?(r=0,u=Math.abs((r-a)/f),s=k<0?b-u:u+b):r>F&&(r=F,u=Math.abs((r-a)/f),s=k<0?b-u:u+b)):(r=c,u=l/f,s=k<0?b-u:b+u,s<0?(s=0,t=Math.abs((s-b)*f),r=j<0?a-t:t+a):s>G&&(s=G,t=Math.abs(s-b)*f,r=j<0?a-t:t+a)),r>a?(r-a<g?r=a+g:r-a>h&&(r=a+h),s>b?s=b+(r-a)/f:s=b-(r-a)/f):r<a&&(a-r<g?r=a-g:a-r>h&&(r=a-h),s>b?s=b+(a-r)/f:s=b-(a-r)/f),r<0?(a-=r,r=0):r>F&&(a-=r-F,r=F),s<0?(b-=s,s=0):s>G&&(b-=s-G,s=G),q(o(a,b,r,s))}function n(a){return a[0]<0&&(a[0]=0),a[1]<0&&(a[1]=0),a[0]>F&&(a[0]=F),a[1]>G&&(a[1]=G),[a[0],a[1]]}function o(a,b,c,d){var e=a,f=c,g=b,h=d;return c<a&&(e=c,f=a),d<b&&(g=d,h=b),[e,g,f,h]}function p(){var d=c-a,f=e-b,g;return Q&&Math.abs(d)>Q&&(c=d>0?a+Q:a-Q),R&&Math.abs(f)>R&&(e=f>0?b+R:b-R),T/V&&Math.abs(f)<T/V&&(e=f>0?b+T/V:b-T/V),S/U&&Math.abs(d)<S/U&&(c=d>0?a+S/U:a-S/U),a<0&&(c-=a,a-=a),b<0&&(e-=b,b-=b),c<0&&
(a-=c,c-=c),e<0&&(b-=e,e-=e),c>F&&(g=c-F,a-=g,c-=g),e>G&&(g=e-G,b-=g,e-=g),a>F&&(g=a-G,e-=g,b-=g),b>G&&(g=b-G,e-=g,b-=g),q(o(a,b,c,e))}function q(a){return{x:a[0],y:a[1],x2:a[2],y2:a[3],w:a[2]-a[0],h:a[3]-a[1]}}var a=0,b=0,c=0,e=0,f,g;return{flipCoords:o,setPressed:h,setCurrent:i,getOffset:j,moveOffset:k,getCorner:l,getFixed:m}}(),bb=function(){function f(a,b){e.left.css({height:h(b)}),e.right.css({height:h(b)})}function g(){return i(ba.getFixed())}function i(a){e.top.css({left:h(a.x),width:h(a.w),height:h(a.y)}),e.bottom.css({top:h(a.y2),left:h(a.x),width:h(a.w),height:h(G-a.y2)}),e.right.css({left:h(a.x2),width:h(F-a.x2)}),e.left.css({width:h(a.x)})}function j(){return a("<div />").css({position:"absolute",backgroundColor:d.shadeColor||d.bgColor}).appendTo(c)}function k(){b||(b=!0,c.insertBefore(E),g(),bc.setBgOpacity(1,0,1),I.hide(),l(d.shadeColor||d.bgColor,1),bc.isAwake()?n(d.bgOpacity,1):n(1,1))}function l(a,b){br(p(),a,b)}function m(){b&&(c.remove(),I.show(),b=!1,bc.isAwake()?bc.setBgOpacity(d.bgOpacity
,1,1):(bc.setBgOpacity(1,1,1),bc.disableHandles()),br(H,0,1))}function n(a,e){b&&(d.bgFade&&!e?c.animate({opacity:1-a},{queue:!1,duration:d.fadeTime}):c.css({opacity:1-a}))}function o(){d.shade?k():m(),bc.isAwake()&&n(d.bgOpacity)}function p(){return c.children()}var b=!1,c=a("<div />").css({position:"absolute",zIndex:240,opacity:0}),e={top:j(),left:j().height(G),right:j().height(G),bottom:j()};return{update:g,updateRaw:i,getShades:p,setBgColor:l,enable:k,disable:m,resize:f,refresh:o,opacity:n}}(),bc=function(){function k(b){var c=a("<div />").css({position:"absolute",opacity:d.borderOpacity}).addClass(i(b));return J.append(c),c}function l(b,c){var d=a("<div />").mousedown(r(b)).css({cursor:b+"-resize",position:"absolute",zIndex:c}).addClass("ord-"+b);return _.support&&d.bind("touchstart.jcrop",_.createDragger(b)),K.append(d),d}function m(a){var b=d.handleSize;return l(a,c++).css({opacity:d.handleOpacity}).width(b).height(b).addClass(i("handle"))}function n(a){return l(a,c++).addClass("jcrop-dragbar")}function o
(a){var b;for(b=0;b<a.length;b++)g[a[b]]=n(a[b])}function p(a){var b,c;for(c=0;c<a.length;c++){switch(a[c]){case"n":b="hline";break;case"s":b="hline bottom";break;case"e":b="vline right";break;case"w":b="vline"}e[a[c]]=k(b)}}function q(a){var b;for(b=0;b<a.length;b++)f[a[b]]=m(a[b])}function s(a,b){d.shade||I.css({top:h(-b),left:h(-a)}),L.css({top:h(b),left:h(a)})}function u(a,b){L.width(a).height(b)}function v(){var a=ba.getFixed();ba.setPressed([a.x,a.y]),ba.setCurrent([a.x2,a.y2]),w()}function w(a){if(b)return x(a)}function x(a){var c=ba.getFixed();u(c.w,c.h),s(c.x,c.y),d.shade&&bb.updateRaw(c),b||A(),a?d.onSelect.call(bt,t(c)):d.onChange.call(bt,t(c))}function y(a,c,e){if(!b&&!c)return;d.bgFade&&!e?E.animate({opacity:a},{queue:!1,duration:d.fadeTime}):E.css("opacity",a)}function A(){L.show(),d.shade?bb.opacity(P):y(P,!0),b=!0}function B(){F(),L.hide(),d.shade?bb.opacity(1):y(1),b=!1,d.onRelease.call(bt)}function C(){j&&K.show()}function D(){j=!0;if(d.allowResize)return K.show(),!0}function F(){j=!1,K.hide(
)}function G(a){Y===a?F():D()}function H(){G(!1),v()}var b,c=370,e={},f={},g={},j=!1;d.dragEdges&&a.isArray(d.createDragbars)&&o(d.createDragbars),a.isArray(d.createHandles)&&q(d.createHandles),d.drawBorders&&a.isArray(d.createBorders)&&p(d.createBorders),a(document).bind("touchstart.jcrop-ios",function(b){a(b.currentTarget).hasClass("jcrop-tracker")&&b.stopPropagation()});var M=z().mousedown(r("move")).css({cursor:"move",position:"absolute",zIndex:360});return _.support&&M.bind("touchstart.jcrop",_.createDragger("move")),J.append(M),F(),{updateVisible:w,update:x,release:B,refresh:v,isAwake:function(){return b},setCursor:function(a){M.css("cursor",a)},enableHandles:D,enableOnly:function(){j=!0},showHandles:C,disableHandles:F,animMode:G,setBgOpacity:y,done:H}}(),bd=function(){function f(){N.css({zIndex:450}),_.support&&a(document).bind("touchmove.jcrop",k).bind("touchend.jcrop",m),e&&a(document).bind("mousemove.jcrop",h).bind("mouseup.jcrop",i)}function g(){N.css({zIndex:290}),a(document).unbind(".jcrop")}function h
(a){return b(l(a)),!1}function i(a){return a.preventDefault(),a.stopPropagation(),X&&(X=!1,c(l(a)),bc.isAwake()&&d.onSelect.call(bt,t(ba.getFixed())),g(),b=function(){},c=function(){}),!1}function j(a,d){return X=!0,b=a,c=d,f(),!1}function k(a){return a.pageX=a.originalEvent.changedTouches[0].pageX,a.pageY=a.originalEvent.changedTouches[0].pageY,h(a)}function m(a){return a.pageX=a.originalEvent.changedTouches[0].pageX,a.pageY=a.originalEvent.changedTouches[0].pageY,i(a)}function n(a){N.css("cursor",a)}var b=function(){},c=function(){},e=d.trackDocument;return e||N.mousemove(h).mouseup(i).mouseout(i),E.before(N),{activateHandlers:j,setCursor:n}}(),be=function(){function e(){d.keySupport&&(b.show(),b.focus())}function f(a){b.hide()}function h(a,b,c){d.allowMove&&(ba.moveOffset([b,c]),bc.updateVisible(!0)),a.preventDefault(),a.stopPropagation()}function i(a){if(a.ctrlKey||a.metaKey)return!0;Z=a.shiftKey?!0:!1;var b=Z?10:1;switch(a.keyCode){case 37:h(a,-b,0);break;case 39:h(a,b,0);break;case 38:h(a,0,-b);break;case 40
:h(a,0,b);break;case 27:d.allowSelect&&bc.release();break;case 9:return!0}return!1}var b=a('<input type="radio" />').css({position:"fixed",left:"-120px",width:"12px"}),c=a("<div />").css({position:"absolute",overflow:"hidden"}).append(b);return d.keySupport&&(b.keydown(i).blur(f),g||!d.fixedSupport?(b.css({position:"absolute",left:"-20px"}),c.append(b).insertBefore(E)):b.insertBefore(E)),{watchKeys:e}}();_.support&&N.bind("touchstart.jcrop",_.newSelection),K.hide(),bs(!0);var bt={setImage:bq,animateTo:bg,setSelect:bh,setOptions:bl,tellSelect:bj,tellScaled:bk,setClass:bf,disable:bm,enable:bn,cancel:bo,release:bc.release,destroy:bp,focus:be.watchKeys,getBounds:function(){return[F*U,G*V]},getWidgetSize:function(){return[F,G]},getScaleFactor:function(){return[U,V]},getOptions:function(){return d},ui:{holder:H,selection:L}};return a.browser.msie&&H.bind("selectstart",function(){return!1}),B.data("Jcrop",bt),bt},a.fn.Jcrop=function(b,c){var d;return this.each(function(){if(a(this).data("Jcrop")){if(b==="api")return a
(this).data("Jcrop");a(this).data("Jcrop").setOptions(b)}else this.tagName=="IMG"?a.Jcrop.Loader(this,function(){a(this).css({display:"block",visibility:"hidden"}),d=a.Jcrop(this,b),a.isFunction(c)&&c.call(d)}):(a(this).css({display:"block",visibility:"hidden"}),d=a.Jcrop(this,b),a.isFunction(c)&&c.call(d))}),this},a.Jcrop.Loader=function(b,c,d){function g(){f.complete?(e.unbind(".jcloader"),a.isFunction(c)&&c.call(f)):window.setTimeout(g,50)}var e=a(b),f=e[0];e.bind("load.jcloader",g).bind("error.jcloader",function(b){e.unbind(".jcloader"),a.isFunction(d)&&d.call(f)}),f.complete&&a.isFunction(c)&&(e.unbind(".jcloader"),c.call(f))},a.Jcrop.defaults={allowSelect:!0,allowMove:!0,allowResize:!0,trackDocument:!0,baseClass:"jcrop",addClass:null,bgColor:"black",bgOpacity:.6,bgFade:!1,borderOpacity:.4,handleOpacity:.5,handleSize:7,aspectRatio:0,keySupport:!0,createHandles:["n","s","e","w","nw","ne","se","sw"],createDragbars:["n","s","e","w"],createBorders:["n","s","e","w"],drawBorders:!0,dragEdges:!0,fixedSupport:!0,
touchSupport:null,shade:null,boxWidth:0,boxHeight:0,boundary:2,fadeTime:400,animationDelay:20,swingSpeed:3,minSelect:[0,0],maxSize:[0,0],minSize:[0,0],onChange:function(){},onSelect:function(){},onDblClick:function(){},onRelease:function(){}}})(jQuery);
/*
 * Poshy Tip jQuery plugin v1.1
 * http://vadikom.com/tools/poshy-tip-jquery-plugin-for-stylish-tooltips/
 * Copyright 2010-2011, Vasil Dinkov, http://vadikom.com/
 */

(function(e){var a=[],d=/^url\(["']?([^"'\)]*)["']?\);?$/i,c=/\.png$/i,b=e.browser.msie&&e.browser.version==6;function f(){e.each(a,function(){this.refresh(true)})}e(window).resize(f);e.Poshytip=function(h,g){this.$elm=e(h);this.opts=e.extend({},e.fn.poshytip.defaults,g);this.$tip=e(['<div class="',this.opts.className,'">','<div class="tip-inner tip-bg-image"></div>','<div class="tip-arrow tip-arrow-top tip-arrow-right tip-arrow-bottom tip-arrow-left"></div>',"</div>"].join("")).appendTo(document.body);this.$arrow=this.$tip.find("div.tip-arrow");this.$inner=this.$tip.find("div.tip-inner");this.disabled=false;this.content=null;this.init()};e.Poshytip.prototype={init:function(){a.push(this);var g=this.$elm.attr("title");this.$elm.data("title.poshytip",g!==undefined?g:null).data("poshytip",this);if(this.opts.showOn!="none"){this.$elm.bind({"mouseenter.poshytip":e.proxy(this.mouseenter,this),"mouseleave.poshytip":e.proxy(this.mouseleave,this)});switch(this.opts.showOn){case"hover":if(this.opts.alignTo=="cursor"){this.$elm.bind("mousemove.poshytip",e.proxy(this.mousemove,this))}if(this.opts.allowTipHover){this.$tip.hover(e.proxy(this.clearTimeouts,this),e.proxy(this.mouseleave,this))}break;case"focus":this.$elm.bind({"focus.poshytip":e.proxy(this.show,this),"blur.poshytip":e.proxy(this.hide,this)});break}}},mouseenter:function(g){if(this.disabled){return true}this.$elm.attr("title","");if(this.opts.showOn=="focus"){return true}this.clearTimeouts();this.showTimeout=setTimeout(e.proxy(this.show,this),this.opts.showTimeout)},mouseleave:function(g){if(this.disabled||this.asyncAnimating&&(this.$tip[0]===g.relatedTarget||jQuery.contains(this.$tip[0],g.relatedTarget))){return true}var h=this.$elm.data("title.poshytip");if(h!==null){this.$elm.attr("title",h)}if(this.opts.showOn=="focus"){return true}this.clearTimeouts();this.hideTimeout=setTimeout(e.proxy(this.hide,this),this.opts.hideTimeout)},mousemove:function(g){if(this.disabled){return true}this.eventX=g.pageX;this.eventY=g.pageY;if(this.opts.followCursor&&this.$tip.data("active")){this.calcPos();this.$tip.css({left:this.pos.l,top:this.pos.t});if(this.pos.arrow){this.$arrow[0].className="tip-arrow tip-arrow-"+this.pos.arrow}}},show:function(){if(this.disabled||this.$tip.data("active")){return}this.reset();this.update();this.display();if(this.opts.timeOnScreen){setTimeout(e.proxy(this.hide,this),this.opts.timeOnScreen)}},hide:function(){if(this.disabled||!this.$tip.data("active")){return}this.display(true)},reset:function(){this.$tip.queue([]).detach().css("visibility","hidden").data("active",false);this.$inner.find("*").poshytip("hide");if(this.opts.fade){this.$tip.css("opacity",this.opacity)}this.$arrow[0].className="tip-arrow tip-arrow-top tip-arrow-right tip-arrow-bottom tip-arrow-left";this.asyncAnimating=false},update:function(j,k){if(this.disabled){return}var i=j!==undefined;if(i){if(!k){this.opts.content=j}if(!this.$tip.data("active")){return}}else{j=this.opts.content}var h=this,g=typeof j=="function"?j.call(this.$elm[0],function(l){h.update(l)}):j=="[title]"?this.$elm.data("title.poshytip"):j;if(this.content!==g){this.$inner.empty().append(g);this.content=g}this.refresh(i)},refresh:function(h){if(this.disabled){return}if(h){if(!this.$tip.data("active")){return}var k={left:this.$tip.css("left"),top:this.$tip.css("top")}}this.$tip.css({left:0,top:0}).appendTo(document.body);if(this.opacity===undefined){this.opacity=this.$tip.css("opacity")}var l=this.$tip.css("background-image").match(d),m=this.$arrow.css("background-image").match(d);if(l){var i=c.test(l[1]);if(b&&i){this.$tip.css("background-image","none");this.$inner.css({margin:0,border:0,padding:0});l=i=false}else{this.$tip.prepend('<table border="0" cellpadding="0" cellspacing="0"><tr><td class="tip-top tip-bg-image" colspan="2"><span></span></td><td class="tip-right tip-bg-image" rowspan="2"><span></span></td></tr><tr><td class="tip-left tip-bg-image" rowspan="2"><span></span></td><td></td></tr><tr><td class="tip-bottom tip-bg-image" colspan="2"><span></span></td></tr></table>').css({border:0,padding:0,"background-image":"none","background-color":"transparent"}).find(".tip-bg-image").css("background-image",'url("'+l[1]+'")').end().find("td").eq(3).append(this.$inner)}if(i&&!e.support.opacity){this.opts.fade=false}}if(m&&!e.support.opacity){if(b&&c.test(m[1])){m=false;this.$arrow.css("background-image","none")}this.opts.fade=false}var o=this.$tip.find("table");if(b){this.$tip[0].style.width="";o.width("auto").find("td").eq(3).width("auto");var n=this.$tip.width(),j=parseInt(this.$tip.css("min-width")),g=parseInt(this.$tip.css("max-width"));if(!isNaN(j)&&n<j){n=j}else{if(!isNaN(g)&&n>g){n=g}}this.$tip.add(o).width(n).eq(0).find("td").eq(3).width("100%")}else{if(o[0]){o.width("auto").find("td").eq(3).width("auto").end().end().width(document.defaultView&&document.defaultView.getComputedStyle&&parseFloat(document.defaultView.getComputedStyle(this.$tip[0],null).width)||this.$tip.width()).find("td").eq(3).width("100%")}}this.tipOuterW=this.$tip.outerWidth();this.tipOuterH=this.$tip.outerHeight();this.calcPos();if(m&&this.pos.arrow){this.$arrow[0].className="tip-arrow tip-arrow-"+this.pos.arrow;this.$arrow.css("visibility","inherit")}if(h){this.asyncAnimating=true;var p=this;this.$tip.css(k).animate({left:this.pos.l,top:this.pos.t},200,function(){p.asyncAnimating=false})}else{this.$tip.css({left:this.pos.l,top:this.pos.t})}},display:function(h){var i=this.$tip.data("active");if(i&&!h||!i&&h){return}this.$tip.stop();if((this.opts.slide&&this.pos.arrow||this.opts.fade)&&(h&&this.opts.hideAniDuration||!h&&this.opts.showAniDuration)){var m={},l={};if(this.opts.slide&&this.pos.arrow){var k,g;if(this.pos.arrow=="bottom"||this.pos.arrow=="top"){k="top";g="bottom"}else{k="left";g="right"}var j=parseInt(this.$tip.css(k));m[k]=j+(h?0:(this.pos.arrow==g?-this.opts.slideOffset:this.opts.slideOffset));l[k]=j+(h?(this.pos.arrow==g?this.opts.slideOffset:-this.opts.slideOffset):0)+"px"}if(this.opts.fade){m.opacity=h?this.$tip.css("opacity"):0;l.opacity=h?0:this.opacity}this.$tip.css(m).animate(l,this.opts[h?"hideAniDuration":"showAniDuration"])}h?this.$tip.queue(e.proxy(this.reset,this)):this.$tip.css("visibility","inherit");this.$tip.data("active",!i)},disable:function(){this.reset();this.disabled=true},enable:function(){this.disabled=false},destroy:function(){this.reset();this.$tip.remove();delete this.$tip;this.content=null;this.$elm.unbind(".poshytip").removeData("title.poshytip").removeData("poshytip");a.splice(e.inArray(this,a),1)},clearTimeouts:function(){if(this.showTimeout){clearTimeout(this.showTimeout);this.showTimeout=0}if(this.hideTimeout){clearTimeout(this.hideTimeout);this.hideTimeout=0}},calcPos:function(){var n={l:0,t:0,arrow:""},h=e(window),k={l:h.scrollLeft(),t:h.scrollTop(),w:h.width(),h:h.height()},p,j,m,i,q,g;if(this.opts.alignTo=="cursor"){p=j=m=this.eventX;i=q=g=this.eventY}else{var o=this.$elm.offset(),l={l:o.left,t:o.top,w:this.$elm.outerWidth(),h:this.$elm.outerHeight()};p=l.l+(this.opts.alignX!="inner-right"?0:l.w);j=p+Math.floor(l.w/2);m=p+(this.opts.alignX!="inner-left"?l.w:0);i=l.t+(this.opts.alignY!="inner-bottom"?0:l.h);q=i+Math.floor(l.h/2);g=i+(this.opts.alignY!="inner-top"?l.h:0)}switch(this.opts.alignX){case"right":case"inner-left":n.l=m+this.opts.offsetX;if(n.l+this.tipOuterW>k.l+k.w){n.l=k.l+k.w-this.tipOuterW}if(this.opts.alignX=="right"||this.opts.alignY=="center"){n.arrow="left"}break;case"center":n.l=j-Math.floor(this.tipOuterW/2);if(n.l+this.tipOuterW>k.l+k.w){n.l=k.l+k.w-this.tipOuterW}else{if(n.l<k.l){n.l=k.l}}break;default:n.l=p-this.tipOuterW-this.opts.offsetX;if(n.l<k.l){n.l=k.l}if(this.opts.alignX=="left"||this.opts.alignY=="center"){n.arrow="right"}}switch(this.opts.alignY){case"bottom":case"inner-top":n.t=g+this.opts.offsetY;if(!n.arrow||this.opts.alignTo=="cursor"){n.arrow="top"}if(n.t+this.tipOuterH>k.t+k.h){n.t=i-this.tipOuterH-this.opts.offsetY;if(n.arrow=="top"){n.arrow="bottom"}}break;case"center":n.t=q-Math.floor(this.tipOuterH/2);if(n.t+this.tipOuterH>k.t+k.h){n.t=k.t+k.h-this.tipOuterH}else{if(n.t<k.t){n.t=k.t}}break;default:n.t=i-this.tipOuterH-this.opts.offsetY;if(!n.arrow||this.opts.alignTo=="cursor"){n.arrow="bottom"}if(n.t<k.t){n.t=g+this.opts.offsetY;if(n.arrow=="bottom"){n.arrow="top"}}}this.pos=n}};e.fn.poshytip=function(h){if(typeof h=="string"){var g=arguments,k=h;Array.prototype.shift.call(g);if(k=="destroy"){this.die("mouseenter.poshytip").die("focus.poshytip")}return this.each(function(){var l=e(this).data("poshytip");if(l&&l[k]){l[k].apply(l,g)}})}var i=e.extend({},e.fn.poshytip.defaults,h);if(!e("#poshytip-css-"+i.className)[0]){e(['<style id="poshytip-css-',i.className,'" type="text/css">',"div.",i.className,"{visibility:hidden;position:absolute;top:0;left:0;}","div.",i.className," table, div.",i.className," td{margin:0;font-family:inherit;font-size:inherit;font-weight:inherit;font-style:inherit;font-variant:inherit;}","div.",i.className," td.tip-bg-image span{display:block;font:1px/1px sans-serif;height:",i.bgImageFrameSize,"px;width:",i.bgImageFrameSize,"px;overflow:hidden;}","div.",i.className," td.tip-right{background-position:100% 0;}","div.",i.className," td.tip-bottom{background-position:100% 100%;}","div.",i.className," td.tip-left{background-position:0 100%;}","div.",i.className," div.tip-inner{background-position:-",i.bgImageFrameSize,"px -",i.bgImageFrameSize,"px;}","div.",i.className," div.tip-arrow{visibility:hidden;position:absolute;overflow:hidden;font:1px/1px sans-serif;}","</style>"].join("")).appendTo("head")}if(i.liveEvents&&i.showOn!="none"){var j=e.extend({},i,{liveEvents:false});switch(i.showOn){case"hover":this.live("mouseenter.poshytip",function(){var l=e(this);if(!l.data("poshytip")){l.poshytip(j).poshytip("mouseenter")}});break;case"focus":this.live("focus.poshytip",function(){var l=e(this);if(!l.data("poshytip")){l.poshytip(j).poshytip("show")}});break}return this}return this.each(function(){new e.Poshytip(this,i)})};e.fn.poshytip.defaults={content:"[title]",className:"tip-yellow",bgImageFrameSize:10,showTimeout:500,hideTimeout:100,timeOnScreen:0,showOn:"hover",liveEvents:false,alignTo:"cursor",alignX:"right",alignY:"top",offsetX:-22,offsetY:18,allowTipHover:true,followCursor:false,fade:true,slide:true,slideOffset:8,showAniDuration:300,hideAniDuration:300}})(jQuery);
/*
 fcbkListSelection 1.10
 - Jquery version required: 1.2.x, 1.3.x, 1.4.x
 
 Changelog:
 - 1.1: added preselected items
 - 1.0: project started
 */
/* Coded by: emposha <admin@emposha.com> */
/* Copyright: Emposha.com <http://www.emposha.com/> - Distributed under MIT - Keep this message! */
/*
 * elem - ul element id or object
 * width - width of ul
 * height - height of each element
 * row - number of items in row
 */



;(function ( $, window, document, undefined ) {

    // define your widget under a namespace of your choice
    //  with additional parameters e.g. 
    // $.widget( "namespace.widgetname", (optional) - an 
    // existing widget prototype to inherit from, an object 
    // literal to become the widget's prototype ); 

    $.widget( "likeme.photoselector" , {

        //Options to be used as defaults
        options: {
        	width: null,
        	height: null,
        	row: null,
        	// Define how many pictures can be selected
            maxSelect: 3
        },

        //Setup widget (eg. element creation, apply theming
        // , bind events etc.)
        _create: function () {
        	var self = this,  
        	o = self.options,  
        	elem = self.element;
            //main
            if (typeof(elem) != 'object') 
                elem = $(elem);
            elem.css("width", o.width + "px");
            
            this.createTabs(elem, o.width);
            this.wrapElements(elem, o.width, o.height, o.row);
           
         // not required without tabs
         //    this.bindEventsOnTabs(elem);
            this.bindEventsOnItems(elem);
        },
        
        // Get Content of Tabs
        getContent: function(elem, tab){
            switch (tab) {
	            case "all":
	                elem.children("li").show();
	                break;
	                
	            case "selected":
	                elem.children("li:not([addedid])").hide();
	                elem.children("li[addedid]").show();
	                break;
	                
	            case "unselected":
	                elem.children("li[addedid]").hide();
	                elem.children("li:not([addedid])").show();
	                break;
            }
        },

        hiddenCheck: function(obj, elem){
            switch (this.curTab()) {
	            case "all":
	                elem.children("li").show();
	                break;
	                
	            case "selected":
	                elem.children("li:not([addedid])").hide();
	                elem.children("li[addedid]").show();
	                break;
	                
	            case "unselected":
	                elem.children("li[addedid]").hide();
	                elem.children("li:not([addedid])").show();
	                break;
	        }
        },
            
        addToSelected: function(obj){
            if (obj.hasClass("itemselected")) {
            	if (parseInt($("#view_selected_count").text(), 10) > 1) {
                	//deselect item
                    $("#view_selected_count").text(parseInt($("#view_selected_count").text(), 10) - 1);
                    obj.parents("li").removeAttr("addedid");
                    this.removeValue(obj, this.element);
                    obj.toggleClass("itemselected");
        			obj.parents("li").toggleClass("liselected");
            	}
            }
            else {
            	//select item
                $("#view_selected_count").text(parseInt($("#view_selected_count").text(), 10) + 1);
                obj.parents("li").attr("addedid", "tester");
                this.addValue(obj, this.element);
                obj.toggleClass("itemselected");
    			obj.parents("li").toggleClass("liselected");
            }
          // not required without tabs
          //  this.hiddenCheck(obj, this.element);
        },
        
        //bind onmouseover && click event on item
        bindEventsOnItems: function(elem){
        	var self = this;
        	var maxSelect = self.options.maxSelect;
            $.each(elem.children("li").children(".fcbklist_item"), function(i, obj){
                obj = $(obj);
                if (obj.children("input[checked]").length != 0) {
                	self.addToSelected(obj);
                    obj.toggleClass("itemselected");
                    obj.parents("li").toggleClass("liselected");
                }
                obj.click(function(){
                	//limit the maximal select
                	if (parseInt($("#view_selected_count").text(), 10) >  maxSelect - 1 && !obj.hasClass("itemselected")) {
                	}
                	else {
                		self.addToSelected(obj);
//                		if (parseInt($("#view_selected_count").text(), 10) != 1) {
//                			obj.toggleClass("itemselected");
//                			obj.parents("li").toggleClass("liselected");
//                		}
                	}
                });
                obj.mouseover(function(){
                    obj.addClass("itemover");
                });
                obj.mouseout(function(){
                    $(".itemover").removeClass("itemover");
                });
            });
        },
        
        //bind onclick event on filters
        bindEventsOnTabs: function(elem){
        	var self = this;
            $.each($("#selections li"), function(i, obj){
                obj = $(obj);
                obj.click(function(){
                    $(".view_on").removeClass("view_on");
                    obj.addClass("view_on");
                    self.getContent(elem, obj.attr("id").replace("view_", ""));
                });
            });
        },
                
        //create control without tabs
        createTabs: function(elem, width){
            var html = '<div id="filters" style="width:' + (parseInt(width, 10) + 2) + 'px;">' +
            '<ul class="selections" id="selections"><li id="view_selected" class="">' +
            'Ausgew&auml;hlt (<strong id="view_selected_count">0</strong>)</li>' +
            '</ul>' +
            '<div class="clearer"></div></div>';
            elem.before(html);
        },

        //wrap elements with div
        wrapElements: function(elem, width, height, row){
            elem.children("li").wrapInner('<div class="fcbklist_item"></div>');
            $(".fcbklist_item").css("height", height + "px");
            var newwidth = Math.ceil((parseInt(width, 10)) / parseInt(row, 10)) - 15;
            $(".fcbklist_item").css("width", newwidth + "px");
        },
        
        addValue: function(obj, elem, value){
            //create input
            var inputid = elem.attr('id') + "_values";
            if ($("#" + inputid).length == 0) {
                var input = document.createElement('input');
                $(input).attr({
                    'type': 'hidden',
                    'name': inputid,
                    'id': inputid,
                    'value': ""
                });
                elem.after(input);
            }
            else {
                var input = $("#" + inputid);
            }
            var randid = "rand_" + this.randomId();
            if (!value) {
                value = obj.find("[type=hidden]").val();
                obj.find("[type=hidden]").attr("randid", randid);
            }
            var jsdata = new this.data(randid, value);
            var stored = this.jsToString(jsdata, $(input).val());
            $(input).val(stored);
            return input;
        },
        
        jsToString: function(jsdata, json){
            var string = "{";
            $.each(jsdata, function(i, item){
                if (i) {
                    string += "\"" + i + "\":\"" + item + "\",";
                }
            });
            try {
                eval("json = " + json + ";");
                $.each(json, function(i, item){
                    if (i && item) {
                        string += "\"" + i + "\":\"" + item + "\",";
                    }
                });
            } 
            catch (e) {            
            }
            //remove last ,
            string = string.substr(0, (string.length - 1));
            string += "}"
            return string;
        },

        data: function(id, value){
            try {
                eval("this." + id + " = value;");
            } 
            catch (e) {            
            }
        },
            
        removeValue: function(obj, elem){
            var randid = obj.find("[type=hidden]").attr("randid");
            var inputid = elem.attr('id') + "_values";
            if ($("#" + inputid).length != 0) {
                try {
                    eval("json = " + $("#" + inputid).val() + ";");
                    var string = "{";
                    $.each(json, function(i, item){
                        if (i && item && i != randid) {
                            string += "\"" + i + "\":\"" + item + "\",";
                        }
                    });
                    //remove last ,
                    if (string.length > 2) {
                        string = string.substr(0, (string.length - 1));
                        string += "}"
                    }
                    else {
                        string = "";
                    }
                    $("#" + inputid).val(string);
                } 
                catch (e) {                
                }
            }
        },
            
        randomId: function(){
            var chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz";
            var string_length = 32;
            var randomstring = '';
            for (var i = 0; i < string_length; i++) {
                var rnum = Math.floor(Math.random() * chars.length);
                randomstring += chars.substring(rnum, rnum + 1);
            }
            return randomstring;
        },
            
        curTab: function(){
            return $(".view_on").attr("id").replace("view_", "");
        }
        	

//        // Destroy an instantiated plugin and clean up 
//        // modifications the widget has made to the DOM
//        destroy: function () {
//
//            // this.element.removeStuff();
//            // For UI 1.8, destroy must be invoked from the 
//            // base widget
//          //  $.Widget.prototype.destroy.call(this);
//            // For UI 1.9, define _destroy instead and don't 
//            // worry about 
//            // calling the base widget
//        }

    });

})( jQuery, window, document );



$(document).ready(function() {
		$('.likepic-sm').each(function(i) {
			var self = $(this);
			self.poshytip({
					className: 'tip-twitter',
					showTimeout: 1,
					bgImageFrameSize: 8,
					showOn: 'none',
					alignTo: 'target',
					alignX: 'right',
					alignY: 'center',
					offsetX: 7,
					content: function(updateCallback) {
								var cropx,cropy,cropw,croph;
								
								// Create container div for poshytip
								var container = $('<div/>')
									.addClass('crop_content');
							
								// Create a header div
								var headerdiv = $('<div/>')
									.attr("style","margin-top: -3px; margin-right: -14px; float: right;")
									.appendTo(container);
							
								// Create a close button
								var button = $('<button/>')
									.attr("id", "exitButton")
									.attr("style","background: none repeat scroll 0% 0%; border: none;")
									.width('36px')
									.height('13px')
									.button({
										text: false,
										icons: {
											primary: "ui-icon-closethick"
										}
									})
									.click(function(){
										self.poshytip('hide'); 
									})
									.appendTo(headerdiv);

								// Create a content div
								var content = $('<div/>')
									.attr("style","padding-top: 17px;")
									.appendTo(container);	
								
								// Get selected image
								var image = $('<img/>')
									.attr("src", self.find('img').attr("org"))
									 .appendTo(content)
									.Jcrop({
							        	aspectRatio: 1,
							        	minSize: [100, 100],
							        	boxWidth: 400, 
							        	boxHeight: 400,
							        	bgColor: 'none',
							        	onSelect: updateCoords
							        });
							      
								
								function updateCoords(c) {
									cropx = c.x;
									cropy = c.y;
									cropw = c.w;
									croph = c.h;
								};
								
								// Create a footer div
								var footerdiv = $('<div/>')
									.appendTo(container);
								
								// Create a close button
								var cropbutton = $('<div/>')
									.attr("style","margin-bottom: -3px; margin-right: -14px;")
									.append("<div id='cropButton'><a href='#'>Speichern</a></div>")
									.click(function(){
										 $("#loading").css({"visibility":"visible"});
										 $.ajax({
											  type: "POST",
											  url: Routing.generate('crop_pictures'),
											  data: { 
												  url: self.find('img').attr("org"),
												  x: cropx, 
												  y: cropy,
												  w: cropw, 
												  h: croph
											  }
										})
										.done(function( msg ) {
											  if (msg == 1) {
												  var timestamp = new Date().getTime();
												  // Update small picture
												  $(self).find('img').attr('src', self.find('img').attr("src") + '?' + timestamp); 
												  // Update big picture
												  $('.likepic').find('img').attr('src', $(self).find('img').attr('src'));
												  $("#loading").css({"visibility":"hidden"});
												  $(self).poshytip('hide');
											  } else {
												  alert( msg );
											  }
										});
									})
									.appendTo(footerdiv);
	
							    if (image.height() > 0) {
							    	return container;
							    } else {
							    	image.load(function() {
							    		updateCallback(container);
							    	});
							    }								
									 	
								return 'Loading image...';
					}
			});
			
			$('.likepic-crop').click(function(event){
				$('.likepic-sm').each(function(i) {
					$(this).poshytip('hide'); 
				});
				$(this).parent().poshytip('show'); 
			});	
			
			$('.likepic-sm').click(function(){
				$('.likepic').find('img').attr('src', $(this).find('img').attr('src'));
			});	
			
		});

});   

function showUrlInDialog(url, dialogtitle, loadingtext) {
		if (typeof title == 'undefined' ) {
			title = '';
		}
	   $("#loading-text").text(loadingtext);
	   $("#loading").css({"visibility":"visible"});
	   $('#dialogdiv').remove();
	   var tag = $("<div/>")
	   	.attr("id", "dialogdiv");
	   $.ajax({
		     url: url,
		     success: function(data) {
		       $('body').append(tag);
		       tag.append(data)
		       	.dialog({
		       		modal: true,
		       		width: 582,
		       		height: 645,
		       		title: dialogtitle
		       }).dialog('open');
		     }
		   }).done(function() {
			   $("#loading").css({"visibility":"hidden"});
			   $("#loading-text").text("Speichern...");
		   });

        return false;
}
