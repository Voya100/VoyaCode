(window.webpackJsonp=window.webpackJsonp||[]).push([[13],{YcnA:function(n,l,e){"use strict";e.r(l);var t=e("CcnG"),u=function(){},i=e("pMnS"),o=e("TcPj"),r=e("aLKZ"),s=e("Ip0R"),c=e("ZYCi"),a=function(){function n(){}return n.prototype.transform=function(n,l){return n.filter(function(n){return!l.hasOwnProperty(n.year)||l[n.year]})},n}(),d=e("G6Az"),p=e("8kji"),b=function(n,l,e,t){return new(e||(e=Promise))(function(u,i){function o(n){try{s(t.next(n))}catch(n){i(n)}}function r(n){try{s(t.throw(n))}catch(n){i(n)}}function s(n){n.done?u(n.value):new e(function(l){l(n.value)}).then(o,r)}s((t=t.apply(n,l||[])).next())})},g=function(n,l){var e,t,u,i,o={label:0,sent:function(){if(1&u[0])throw u[1];return u[1]},trys:[],ops:[]};return i={next:r(0),throw:r(1),return:r(2)},"function"==typeof Symbol&&(i[Symbol.iterator]=function(){return this}),i;function r(i){return function(r){return function(i){if(e)throw new TypeError("Generator is already executing.");for(;o;)try{if(e=1,t&&(u=2&i[0]?t.return:i[0]?t.throw||((u=t.return)&&u.call(t),0):t.next)&&!(u=u.call(t,i[1])).done)return u;switch(t=0,u&&(i=[2&i[0],u.value]),i[0]){case 0:case 1:u=i;break;case 4:return o.label++,{value:i[1],done:!1};case 5:o.label++,t=i[1],i=[0];continue;case 7:i=o.ops.pop(),o.trys.pop();continue;default:if(!(u=(u=o.trys).length>0&&u[u.length-1])&&(6===i[0]||2===i[0])){o=0;continue}if(3===i[0]&&(!u||i[1]>u[0]&&i[1]<u[3])){o.label=i[1];break}if(6===i[0]&&o.label<u[1]){o.label=u[1],u=i;break}if(u&&o.label<u[2]){o.label=u[2],o.ops.push(i);break}u[2]&&o.ops.pop(),o.trys.pop();continue}i=l.call(n,o)}catch(n){i=[6,n],t=0}finally{e=u=0}if(5&i[0])throw i[1];return{value:i[0]?i[1]:void 0,done:!0}}([i,r])}}},f=function(n){return n[n.NotStarted=0]="NotStarted",n[n.InProgress=1]="InProgress",n[n.AlreadyRegistered=2]="AlreadyRegistered",n[n.Successful=3]="Successful",n[n.PermissionDenied=4]="PermissionDenied",n[n.Failed=5]="Failed",n}({}),h=function(){function n(n,l,e){this.blogsService=n,this.pushService=l,this.cdRef=e,this.yearCheck={},this.blogs=[],this.years=[],this.hasPushSubscription=!1,this.pushSubscriptionState=f.NotStarted,this.pushSubscriptionStates=f,this.initialised=!1}return Object.defineProperty(n.prototype,"pushSubscriptionSupported",{get:function(){return this.pushService.browserSupportsPushNotifications()},enumerable:!0,configurable:!0}),n.prototype.ngOnInit=function(){var n=this;this.blogsService.getBlogs().subscribe(function(l){return n.blogInit(l)}),this.hasPushSubscription=this.pushService.isSubscribedToTopic("blogs")&&!this.pushService.notificationPermissionDenied},n.prototype.ngAfterViewChecked=function(){this.initialised=!0,this.cdRef.detectChanges()},n.prototype.blogInit=function(n){if(n.length>0){this.blogs=n;for(var l=n[0].year;l>=2016;l--)this.years.push(l),this.yearCheck[l]=!0}},n.prototype.openAll=function(){this.initialised&&this.blogPosts.forEach(function(n){return n.toggle(!0)})},n.prototype.closeAll=function(){this.initialised&&this.blogPosts.forEach(function(n){return n.toggle(!1)})},n.prototype.noBlogs=function(){return!this.initialised||0===this.blogPosts.length},n.prototype.subscribeToPushNotifications=function(){return b(this,void 0,void 0,function(){var n;return g(this,function(l){switch(l.label){case 0:console.log("subscribe"),this.pushSubscriptionState=f.InProgress,l.label=1;case 1:return l.trys.push([1,3,,4]),[4,this.pushService.subscribeToBlogNotifications()];case 2:return l.sent(),this.hasPushSubscription=this.pushService.isSubscribedToTopic("blogs"),this.pushSubscriptionState=f.Successful,[3,4];case 3:return n=l.sent(),console.warn(n),this.pushSubscriptionState=this.pushService.notificationPermissionDenied?f.PermissionDenied:f.Failed,[3,4];case 4:return[2]}})})},n.prototype.unsubscribeFromPushNotifications=function(){return b(this,void 0,void 0,function(){return g(this,function(n){switch(n.label){case 0:this.pushSubscriptionState=f.InProgress,n.label=1;case 1:return n.trys.push([1,3,,4]),[4,this.pushService.unsubscribeFromBlogNotifications()];case 2:return n.sent(),this.hasPushSubscription=this.pushService.isSubscribedToTopic("blogs"),this.pushSubscriptionState=f.Successful,[3,4];case 3:return"Subscription does not exist or is already removed."===n.sent().message?(this.hasPushSubscription=!1,[2]):(this.pushSubscriptionState=f.Failed,[3,4]);case 4:return[2]}})})},n}(),m=t["\u0275crt"]({encapsulation:0,styles:[[".filters[_ngcontent-%COMP%]   label[_ngcontent-%COMP%]{-webkit-touch-callout:none;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}[_nghost-%COMP%]{min-width:304px;max-width:1000px;margin:auto;width:100%;display:block}.filters[_ngcontent-%COMP%]{background:#5ac0f3;border:2px solid #1c2e3b;padding:5px;box-sizing:border-box;width:100%;text-align:center}.filters[_ngcontent-%COMP%]   button[_ngcontent-%COMP%], a.button[_ngcontent-%COMP%], button[_ngcontent-%COMP%]{font-size:100%;background:#2586cc;color:#1c2e3b;text-align:center;border:1px solid #1c2e3b;cursor:pointer}a.button[_ngcontent-%COMP%]:focus, button[_ngcontent-%COMP%]:focus{outline:0}a.button[_ngcontent-%COMP%]:hover, button[_ngcontent-%COMP%]:hover{background:#99d4ff}a.button[_ngcontent-%COMP%]:disabled, button[_ngcontent-%COMP%]:disabled{opacity:.6}a.button[_ngcontent-%COMP%]{font-size:100%;text-decoration:none;display:inline-block}.container[_ngcontent-%COMP%]{display:flex;justify-content:space-between}blog-post[_ngcontent-%COMP%]{margin-bottom:10px}section[_ngcontent-%COMP%]{width:75%}aside[_ngcontent-%COMP%]{width:24%;text-align:center}.filters[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]{margin:5px 2px 2px;padding:7px;line-height:1}.filters[_ngcontent-%COMP%]   label[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]{position:relative;bottom:1px;vertical-align:middle}@media screen and (max-width:600px){.container[_ngcontent-%COMP%]{flex-direction:column-reverse}.container[_ngcontent-%COMP%]   aside[_ngcontent-%COMP%], .container[_ngcontent-%COMP%]   section[_ngcontent-%COMP%]{width:100%}.container[_ngcontent-%COMP%]   aside[_ngcontent-%COMP%]{margin-bottom:8px}.container[_ngcontent-%COMP%]   .filters[_ngcontent-%COMP%]   .checkbox-container[_ngcontent-%COMP%]{display:inline-block}}a.button[_ngcontent-%COMP%], button[_ngcontent-%COMP%]{margin-top:5px;margin-bottom:5px;padding:7px}.subscribe-button[_ngcontent-%COMP%]{box-sizing:border-box;width:100%;max-width:235px;font-size:100%;line-height:1.4}aside[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{margin:6px 1px}a.icon[_ngcontent-%COMP%]:hover{opacity:.6}"]],data:{}});function v(n){return t["\u0275vid"](0,[(n()(),t["\u0275eld"](0,0,null,null,1,"blog-post",[],null,null,null,o.b,o.a)),t["\u0275did"](1,114688,[[1,4]],0,r.a,[],{blogData:[0,"blogData"],minimizable:[1,"minimizable"],visible:[2,"visible"]},null)],function(n,l){n(l,1,0,l.context.$implicit,!0,!1)},null)}function S(n){return t["\u0275vid"](0,[(n()(),t["\u0275eld"](0,0,null,null,1,"span",[],null,null,null,null,null)),(n()(),t["\u0275ted"](-1,null,["No results."]))],null,null)}function C(n){return t["\u0275vid"](0,[(n()(),t["\u0275eld"](0,0,null,null,6,"div",[["class","checkbox-container"]],null,null,null,null,null)),(n()(),t["\u0275ted"](-1,null,["\n        "])),(n()(),t["\u0275eld"](2,0,null,null,3,"label",[],null,null,null,null,null)),(n()(),t["\u0275ted"](-1,null,["\n          "])),(n()(),t["\u0275eld"](4,0,null,null,0,"input",[["name","year"],["type","checkbox"]],[[8,"value",0],[8,"checked",0]],[[null,"change"]],function(n,l,e){var t=!0;return"change"===l&&(t=!1!==(n.component.yearCheck[n.context.$implicit]=e.target.checked)&&t),t},null,null)),(n()(),t["\u0275ted"](5,null,[" ","\n        "])),(n()(),t["\u0275ted"](-1,null,["\n      "]))],null,function(n,l){var e=l.component;n(l,4,0,t["\u0275inlineInterpolate"](1,"",l.context.$implicit,""),e.yearCheck[l.context.$implicit]),n(l,5,0,l.context.$implicit)})}function y(n){return t["\u0275vid"](0,[(n()(),t["\u0275eld"](0,0,null,null,1,"p",[],null,null,null,null,null)),(n()(),t["\u0275ted"](-1,null,["\n        Subscribing...\n      "]))],null,null)}function P(n){return t["\u0275vid"](0,[(n()(),t["\u0275eld"](0,0,null,null,1,"p",[],null,null,null,null,null)),(n()(),t["\u0275ted"](-1,null,["\n        Successfully unsubscribed from push notifications.\n      "]))],null,null)}function w(n){return t["\u0275vid"](0,[(n()(),t["\u0275eld"](0,0,null,null,4,"p",[],null,null,null,null,null)),(n()(),t["\u0275ted"](-1,null,["\n        Push permission is currently denied. You'll need to re-enable them from your browser's settings. Find out how\n        "])),(n()(),t["\u0275eld"](2,0,null,null,1,"a",[["href","https://pushassist.com/knowledgebase/how-to-enable-or-disable-push-notifications-on-chrome-firefox-safari-b/"]],null,null,null,null,null)),(n()(),t["\u0275ted"](-1,null,["here"])),(n()(),t["\u0275ted"](-1,null,[".\n      "]))],null,null)}function x(n){return t["\u0275vid"](0,[(n()(),t["\u0275eld"](0,0,null,null,4,"p",[],null,null,null,null,null)),(n()(),t["\u0275ted"](-1,null,["\n        Push subscription failed. Please make sure that you have enabled\n        "])),(n()(),t["\u0275eld"](2,0,null,null,1,"a",[["href","https://pushassist.com/knowledgebase/how-to-enable-or-disable-push-notifications-on-chrome-firefox-safari-b/"]],null,null,null,null,null)),(n()(),t["\u0275ted"](-1,null,["hpush permissions"])),(n()(),t["\u0275ted"](-1,null,[" on your browser.\n      "]))],null,null)}function O(n){return t["\u0275vid"](0,[(n()(),t["\u0275eld"](0,0,null,null,16,"div",[],null,null,null,null,null)),(n()(),t["\u0275ted"](-1,null,["\n      "])),(n()(),t["\u0275eld"](2,0,null,null,1,"button",[["class","subscribe-button"]],[[8,"disabled",0],[8,"title",0]],[[null,"click"]],function(n,l,e){var t=!0;return"click"===l&&(t=!1!==n.component.subscribeToPushNotifications()&&t),t},null,null)),(n()(),t["\u0275ted"](-1,null,["\n        Subscribe to push notifications\n      "])),(n()(),t["\u0275ted"](-1,null,["\n\n      "])),(n()(),t["\u0275and"](16777216,null,null,1,null,y)),t["\u0275did"](6,16384,null,0,s.i,[t.ViewContainerRef,t.TemplateRef],{ngIf:[0,"ngIf"]},null),(n()(),t["\u0275ted"](-1,null,["\n      "])),(n()(),t["\u0275and"](16777216,null,null,1,null,P)),t["\u0275did"](9,16384,null,0,s.i,[t.ViewContainerRef,t.TemplateRef],{ngIf:[0,"ngIf"]},null),(n()(),t["\u0275ted"](-1,null,["\n      "])),(n()(),t["\u0275and"](16777216,null,null,1,null,w)),t["\u0275did"](12,16384,null,0,s.i,[t.ViewContainerRef,t.TemplateRef],{ngIf:[0,"ngIf"]},null),(n()(),t["\u0275ted"](-1,null,["\n      "])),(n()(),t["\u0275and"](16777216,null,null,1,null,x)),t["\u0275did"](15,16384,null,0,s.i,[t.ViewContainerRef,t.TemplateRef],{ngIf:[0,"ngIf"]},null),(n()(),t["\u0275ted"](-1,null,["\n    "]))],function(n,l){var e=l.component;n(l,6,0,e.pushSubscriptionState===e.pushSubscriptionStates.InProgress),n(l,9,0,e.pushSubscriptionState===e.pushSubscriptionStates.Successful),n(l,12,0,e.pushSubscriptionState===e.pushSubscriptionStates.PermissionDenied),n(l,15,0,e.pushSubscriptionState===e.pushSubscriptionStates.Failed)},function(n,l){var e=l.component;n(l,2,0,!e.pushSubscriptionSupported,e.pushSubscriptionSupported?"Subscribe to push notifications to get notified when a new blog is released.":"Push notifications not supported by the browser.")})}function k(n){return t["\u0275vid"](0,[(n()(),t["\u0275eld"](0,0,null,null,1,"p",[],null,null,null,null,null)),(n()(),t["\u0275ted"](-1,null,["\n        Unsubscribing...\n      "]))],null,null)}function M(n){return t["\u0275vid"](0,[(n()(),t["\u0275eld"](0,0,null,null,1,"p",[],null,null,null,null,null)),(n()(),t["\u0275ted"](-1,null,["\n        Successfully subscribed to push notifications. You will now get notified when new blogs are published.\n      "]))],null,null)}function _(n){return t["\u0275vid"](0,[(n()(),t["\u0275eld"](0,0,null,null,8,"p",[],null,null,null,null,null)),(n()(),t["\u0275ted"](-1,null,["\n        Unsubscription failed. Please make sure that you have a working internet connection. If issue persists, contact the site\n        admin through the\n        "])),(n()(),t["\u0275eld"](2,0,null,null,2,"a",[["routerLink","/comments"]],[[1,"target",0],[8,"href",4]],[[null,"click"]],function(n,l,e){var u=!0;return"click"===l&&(u=!1!==t["\u0275nov"](n,3).onClick(e.button,e.ctrlKey,e.metaKey,e.shiftKey)&&u),u},null,null)),t["\u0275did"](3,671744,null,0,c.p,[c.o,c.a,s.g],{routerLink:[0,"routerLink"]},null),(n()(),t["\u0275ted"](-1,null,["comments section"])),(n()(),t["\u0275ted"](-1,null,[". You can also disable notifications from\n        "])),(n()(),t["\u0275eld"](6,0,null,null,1,"a",[["href","https://pushassist.com/knowledgebase/how-to-enable-or-disable-push-notifications-on-chrome-firefox-safari-b/"]],null,null,null,null,null)),(n()(),t["\u0275ted"](-1,null,["browser settings"])),(n()(),t["\u0275ted"](-1,null,[".\n      "]))],function(n,l){n(l,3,0,"/comments")},function(n,l){n(l,2,0,t["\u0275nov"](l,3).target,t["\u0275nov"](l,3).href)})}function I(n){return t["\u0275vid"](0,[(n()(),t["\u0275eld"](0,0,null,null,13,"div",[],null,null,null,null,null)),(n()(),t["\u0275ted"](-1,null,["\n      "])),(n()(),t["\u0275eld"](2,0,null,null,1,"button",[["class","subscribe-button"],["title","If you no longer wish to receive notifications of new blog releases, you can unsubscribe by clicking this button."]],null,[[null,"click"]],function(n,l,e){var t=!0;return"click"===l&&(t=!1!==n.component.unsubscribeFromPushNotifications()&&t),t},null,null)),(n()(),t["\u0275ted"](-1,null,["Unsubscribe from push notifications"])),(n()(),t["\u0275ted"](-1,null,["\n      "])),(n()(),t["\u0275and"](16777216,null,null,1,null,k)),t["\u0275did"](6,16384,null,0,s.i,[t.ViewContainerRef,t.TemplateRef],{ngIf:[0,"ngIf"]},null),(n()(),t["\u0275ted"](-1,null,["\n      "])),(n()(),t["\u0275and"](16777216,null,null,1,null,M)),t["\u0275did"](9,16384,null,0,s.i,[t.ViewContainerRef,t.TemplateRef],{ngIf:[0,"ngIf"]},null),(n()(),t["\u0275ted"](-1,null,["\n      "])),(n()(),t["\u0275and"](16777216,null,null,1,null,_)),t["\u0275did"](12,16384,null,0,s.i,[t.ViewContainerRef,t.TemplateRef],{ngIf:[0,"ngIf"]},null),(n()(),t["\u0275ted"](-1,null,["\n    "]))],function(n,l){var e=l.component;n(l,6,0,e.pushSubscriptionState===e.pushSubscriptionStates.InProgress),n(l,9,0,e.pushSubscriptionState===e.pushSubscriptionStates.Successful),n(l,12,0,e.pushSubscriptionState===e.pushSubscriptionStates.Failed)},null)}function R(n){return t["\u0275vid"](0,[t["\u0275qud"](671088640,1,{blogPosts:1}),(n()(),t["\u0275eld"](1,0,null,null,1,"h1",[],null,null,null,null,null)),(n()(),t["\u0275ted"](-1,null,["Blogs"])),(n()(),t["\u0275ted"](-1,null,["\n"])),(n()(),t["\u0275eld"](4,0,null,null,49,"div",[["class","container"]],null,null,null,null,null)),(n()(),t["\u0275ted"](-1,null,["\n  "])),(n()(),t["\u0275eld"](6,0,null,null,8,"section",[],null,null,null,null,null)),(n()(),t["\u0275ted"](-1,null,["\n    "])),(n()(),t["\u0275and"](16777216,null,null,2,null,v)),t["\u0275did"](9,278528,null,0,s.h,[t.ViewContainerRef,t.TemplateRef,t.IterableDiffers],{ngForOf:[0,"ngForOf"]},null),t["\u0275pid"](0,a,[]),(n()(),t["\u0275ted"](-1,null,["\n    "])),(n()(),t["\u0275and"](16777216,null,null,1,null,S)),t["\u0275did"](13,16384,null,0,s.i,[t.ViewContainerRef,t.TemplateRef],{ngIf:[0,"ngIf"]},null),(n()(),t["\u0275ted"](-1,null,["\n  "])),(n()(),t["\u0275ted"](-1,null,["\n  "])),(n()(),t["\u0275eld"](16,0,null,null,36,"aside",[],null,null,null,null,null)),(n()(),t["\u0275ted"](-1,null,["\n    "])),(n()(),t["\u0275eld"](18,0,null,null,18,"div",[["class","filters"]],null,null,null,null,null)),(n()(),t["\u0275ted"](-1,null,["\n      "])),(n()(),t["\u0275eld"](20,0,null,null,1,"b",[],null,null,null,null,null)),(n()(),t["\u0275ted"](-1,null,["Filters"])),(n()(),t["\u0275ted"](-1,null,["\n      "])),(n()(),t["\u0275eld"](23,0,null,null,0,"br",[],null,null,null,null,null)),(n()(),t["\u0275ted"](-1,null,["\n      "])),(n()(),t["\u0275and"](16777216,null,null,1,null,C)),t["\u0275did"](26,278528,null,0,s.h,[t.ViewContainerRef,t.TemplateRef,t.IterableDiffers],{ngForOf:[0,"ngForOf"]},null),(n()(),t["\u0275ted"](-1,null,["\n      "])),(n()(),t["\u0275eld"](28,0,null,null,7,"div",[],null,null,null,null,null)),(n()(),t["\u0275ted"](-1,null,["\n        "])),(n()(),t["\u0275eld"](30,0,null,null,1,"button",[],null,[[null,"click"]],function(n,l,e){var t=!0;return"click"===l&&(t=!1!==n.component.openAll()&&t),t},null,null)),(n()(),t["\u0275ted"](-1,null,["Open all"])),(n()(),t["\u0275ted"](-1,null,["\n        "])),(n()(),t["\u0275eld"](33,0,null,null,1,"button",[],null,[[null,"click"]],function(n,l,e){var t=!0;return"click"===l&&(t=!1!==n.component.closeAll()&&t),t},null,null)),(n()(),t["\u0275ted"](-1,null,["Close all"])),(n()(),t["\u0275ted"](-1,null,["\n      "])),(n()(),t["\u0275ted"](-1,null,["\n    "])),(n()(),t["\u0275ted"](-1,null,["\n\n    "])),(n()(),t["\u0275eld"](38,0,null,null,2,"a",[["class","button subscribe-button"],["routerLink","subscribe"],["title","Subscribe to blog newsletter to stay up to date with the latest blog releases."]],[[1,"target",0],[8,"href",4]],[[null,"click"]],function(n,l,e){var u=!0;return"click"===l&&(u=!1!==t["\u0275nov"](n,39).onClick(e.button,e.ctrlKey,e.metaKey,e.shiftKey)&&u),u},null,null)),t["\u0275did"](39,671744,null,0,c.p,[c.o,c.a,s.g],{routerLink:[0,"routerLink"]},null),(n()(),t["\u0275ted"](-1,null,["Subscribe to email newsletter"])),(n()(),t["\u0275ted"](-1,null,["\n    "])),(n()(),t["\u0275and"](16777216,null,null,1,null,O)),t["\u0275did"](43,16384,null,0,s.i,[t.ViewContainerRef,t.TemplateRef],{ngIf:[0,"ngIf"]},null),(n()(),t["\u0275ted"](-1,null,["\n    "])),(n()(),t["\u0275and"](16777216,null,null,1,null,I)),t["\u0275did"](46,16384,null,0,s.i,[t.ViewContainerRef,t.TemplateRef],{ngIf:[0,"ngIf"]},null),(n()(),t["\u0275ted"](-1,null,["\n    "])),(n()(),t["\u0275eld"](48,0,null,null,3,"a",[["class","icon"],["href","/blogs/rss"]],null,null,null,null,null)),(n()(),t["\u0275ted"](-1,null,["\n      "])),(n()(),t["\u0275eld"](50,0,null,null,0,"img",[["alt","RSS"],["id","rss"],["src","images/rss.png"],["title","Blog RSS feed"]],null,null,null,null,null)),(n()(),t["\u0275ted"](-1,null,["\n    "])),(n()(),t["\u0275ted"](-1,null,["\n  "])),(n()(),t["\u0275ted"](-1,null,["\n"])),(n()(),t["\u0275ted"](-1,null,["\n"]))],function(n,l){var e=l.component;n(l,9,0,t["\u0275unv"](l,9,0,t["\u0275nov"](l,10).transform(e.blogs,e.yearCheck))),n(l,13,0,e.noBlogs()),n(l,26,0,e.years),n(l,39,0,"subscribe"),n(l,43,0,!e.hasPushSubscription),n(l,46,0,e.hasPushSubscription)},function(n,l){n(l,38,0,t["\u0275nov"](l,39).target,t["\u0275nov"](l,39).href)})}var T=t["\u0275ccf"]("ng-component",h,function(n){return t["\u0275vid"](0,[(n()(),t["\u0275eld"](0,0,null,null,1,"ng-component",[],null,null,null,R,m)),t["\u0275did"](1,8503296,null,0,h,[d.a,p.a,t.ChangeDetectorRef],null,null)],function(n,l){n(l,1,0)},null)},{},{},[]),V=e("gIcY"),F=function(){function n(n){this.blogService=n}return n.prototype.sendConfirmation=function(){var n=this;this.loading=!0,this.blogService.sendSubscribeConfirmation(this.email).subscribe(function(l){n.requestMessage=l,n.loading=!1},function(l){n.requestMessage=l,n.loading=!1})},n}(),L=t["\u0275crt"]({encapsulation:0,styles:[["[_nghost-%COMP%]{min-width:304px;max-width:1000px;margin:auto;width:100%;display:block}p[_ngcontent-%COMP%]{background:#5ac0f3;border:2px solid #1c2e3b;padding:5px;box-sizing:border-box}button[_ngcontent-%COMP%]{font-size:100%;background:#2586cc;color:#1c2e3b;text-align:center;border:1px solid #1c2e3b;cursor:pointer}button[_ngcontent-%COMP%]:focus{outline:0}button[_ngcontent-%COMP%]:hover{background:#99d4ff}button[_ngcontent-%COMP%]:disabled{opacity:.6}"]],data:{}});function D(n){return t["\u0275vid"](0,[(n()(),t["\u0275eld"](0,0,null,null,1,"p",[],null,null,null,null,null)),(n()(),t["\u0275ted"](1,null,["",""]))],null,function(n,l){n(l,1,0,l.component.requestMessage)})}function N(n){return t["\u0275vid"](0,[(n()(),t["\u0275eld"](0,0,null,null,1,"h1",[],null,null,null,null,null)),(n()(),t["\u0275ted"](-1,null,["Blog subscription"])),(n()(),t["\u0275ted"](-1,null,["\n"])),(n()(),t["\u0275eld"](3,0,null,null,17,"form",[["novalidate",""]],[[2,"ng-untouched",null],[2,"ng-touched",null],[2,"ng-pristine",null],[2,"ng-dirty",null],[2,"ng-valid",null],[2,"ng-invalid",null],[2,"ng-pending",null]],[[null,"ngSubmit"],[null,"submit"],[null,"reset"]],function(n,l,e){var u=!0,i=n.component;return"submit"===l&&(u=!1!==t["\u0275nov"](n,5).onSubmit(e)&&u),"reset"===l&&(u=!1!==t["\u0275nov"](n,5).onReset()&&u),"ngSubmit"===l&&(u=!1!==i.sendConfirmation()&&u),u},null,null)),t["\u0275did"](4,16384,null,0,V.r,[],null,null),t["\u0275did"](5,4210688,[["emailForm",4]],0,V.l,[[8,null],[8,null]],null,{ngSubmit:"ngSubmit"}),t["\u0275prd"](2048,null,V.c,null,[V.l]),t["\u0275did"](7,16384,null,0,V.k,[[4,V.c]],null,null),(n()(),t["\u0275ted"](-1,null,["\n  "])),(n()(),t["\u0275eld"](9,0,null,null,7,"input",[["name","email"],["placeholder","Email address"],["required",""]],[[1,"required",0],[2,"ng-untouched",null],[2,"ng-touched",null],[2,"ng-pristine",null],[2,"ng-dirty",null],[2,"ng-valid",null],[2,"ng-invalid",null],[2,"ng-pending",null]],[[null,"ngModelChange"],[null,"input"],[null,"blur"],[null,"compositionstart"],[null,"compositionend"]],function(n,l,e){var u=!0,i=n.component;return"input"===l&&(u=!1!==t["\u0275nov"](n,10)._handleInput(e.target.value)&&u),"blur"===l&&(u=!1!==t["\u0275nov"](n,10).onTouched()&&u),"compositionstart"===l&&(u=!1!==t["\u0275nov"](n,10)._compositionStart()&&u),"compositionend"===l&&(u=!1!==t["\u0275nov"](n,10)._compositionEnd(e.target.value)&&u),"ngModelChange"===l&&(u=!1!==(i.email=e)&&u),u},null,null)),t["\u0275did"](10,16384,null,0,V.d,[t.Renderer2,t.ElementRef,[2,V.a]],null,null),t["\u0275did"](11,16384,null,0,V.o,[],{required:[0,"required"]},null),t["\u0275prd"](1024,null,V.g,function(n){return[n]},[V.o]),t["\u0275prd"](1024,null,V.h,function(n){return[n]},[V.d]),t["\u0275did"](14,671744,null,0,V.m,[[2,V.c],[6,V.g],[8,null],[6,V.h]],{name:[0,"name"],isDisabled:[1,"isDisabled"],model:[2,"model"]},{update:"ngModelChange"}),t["\u0275prd"](2048,null,V.i,null,[V.m]),t["\u0275did"](16,16384,null,0,V.j,[[4,V.i]],null,null),(n()(),t["\u0275ted"](-1,null,["\n  "])),(n()(),t["\u0275eld"](18,0,null,null,1,"button",[["type","submit"]],[[8,"disabled",0]],null,null,null,null)),(n()(),t["\u0275ted"](-1,null,["Send"])),(n()(),t["\u0275ted"](-1,null,["\n"])),(n()(),t["\u0275ted"](-1,null,["\n"])),(n()(),t["\u0275and"](16777216,null,null,1,null,D)),t["\u0275did"](23,16384,null,0,s.i,[t.ViewContainerRef,t.TemplateRef],{ngIf:[0,"ngIf"]},null),(n()(),t["\u0275ted"](-1,null,["\n"])),(n()(),t["\u0275eld"](25,0,null,null,12,"p",[],null,null,null,null,null)),(n()(),t["\u0275ted"](-1,null,["\n  You can subscribe to Voya Code's blog newsletter by writing your email to input field above. When subscribed, you will get\n  email notification every time a new blog gets added to Voya Code.\n  "])),(n()(),t["\u0275eld"](27,0,null,null,0,"br",[],null,null,null,null,null)),(n()(),t["\u0275ted"](-1,null,["\n  "])),(n()(),t["\u0275eld"](29,0,null,null,0,"br",[],null,null,null,null,null)),(n()(),t["\u0275ted"](-1,null,["If you no longer want to get blog notifications, you can unsubscribe anytime from link that is provided with every newsletter.\n  "])),(n()(),t["\u0275eld"](31,0,null,null,0,"br",[],null,null,null,null,null)),(n()(),t["\u0275ted"](-1,null,["\n  "])),(n()(),t["\u0275eld"](33,0,null,null,0,"br",[],null,null,null,null,null)),(n()(),t["\u0275ted"](-1,null,["\n  "])),(n()(),t["\u0275eld"](35,0,null,null,1,"b",[],null,null,null,null,null)),(n()(),t["\u0275ted"](-1,null,["Note:"])),(n()(),t["\u0275ted"](-1,null,[" At the moment, Outlook/Hotmail blocks all emails sent, so you likely won't be able to subscribe with those email\n  addresses.\n"])),(n()(),t["\u0275ted"](-1,null,["\n"]))],function(n,l){var e=l.component;n(l,11,0,""),n(l,14,0,"email",e.loading,e.email),n(l,23,0,e.requestMessage)},function(n,l){var e=l.component;n(l,3,0,t["\u0275nov"](l,7).ngClassUntouched,t["\u0275nov"](l,7).ngClassTouched,t["\u0275nov"](l,7).ngClassPristine,t["\u0275nov"](l,7).ngClassDirty,t["\u0275nov"](l,7).ngClassValid,t["\u0275nov"](l,7).ngClassInvalid,t["\u0275nov"](l,7).ngClassPending),n(l,9,0,t["\u0275nov"](l,11).required?"":null,t["\u0275nov"](l,16).ngClassUntouched,t["\u0275nov"](l,16).ngClassTouched,t["\u0275nov"](l,16).ngClassPristine,t["\u0275nov"](l,16).ngClassDirty,t["\u0275nov"](l,16).ngClassValid,t["\u0275nov"](l,16).ngClassInvalid,t["\u0275nov"](l,16).ngClassPending),n(l,18,0,e.loading||!t["\u0275nov"](l,5).form.valid)})}var A=t["\u0275ccf"]("ng-component",F,function(n){return t["\u0275vid"](0,[(n()(),t["\u0275eld"](0,0,null,null,1,"ng-component",[],null,null,null,N,L)),t["\u0275did"](1,49152,null,0,F,[d.a],null,null)],null,null)},{},{},[]),z=function(){function n(n,l){this.blogService=n,this.route=l}return n.prototype.ngOnInit=function(){var n=this;this.routeParamSub=this.route.params.subscribe(function(l){return n.blogService.subscribe(l.email).subscribe(function(l){n.message=l},function(l){n.message=l})})},n.prototype.ngOnDestroy=function(){this.routeParamSub.unsubscribe()},n}(),B=t["\u0275crt"]({encapsulation:0,styles:[["[_nghost-%COMP%]{min-width:304px;max-width:1000px;margin:auto;width:100%;display:block}p[_ngcontent-%COMP%]{background:#5ac0f3;border:2px solid #1c2e3b;padding:5px;box-sizing:border-box}"]],data:{}});function q(n){return t["\u0275vid"](0,[(n()(),t["\u0275eld"](0,0,null,null,1,"p",[],null,null,null,null,null)),(n()(),t["\u0275ted"](1,null,["",""]))],null,function(n,l){n(l,1,0,l.component.message)})}function E(n){return t["\u0275vid"](0,[(n()(),t["\u0275eld"](0,0,null,null,1,"span",[],null,null,null,null,null)),(n()(),t["\u0275ted"](-1,null,["Loading..."]))],null,null)}function Y(n){return t["\u0275vid"](0,[(n()(),t["\u0275eld"](0,0,null,null,1,"h1",[],null,null,null,null,null)),(n()(),t["\u0275ted"](-1,null,["Blog subscription"])),(n()(),t["\u0275ted"](-1,null,["\n"])),(n()(),t["\u0275and"](16777216,null,null,1,null,q)),t["\u0275did"](4,16384,null,0,s.i,[t.ViewContainerRef,t.TemplateRef],{ngIf:[0,"ngIf"]},null),(n()(),t["\u0275ted"](-1,null,["\n"])),(n()(),t["\u0275and"](16777216,null,null,1,null,E)),t["\u0275did"](7,16384,null,0,s.i,[t.ViewContainerRef,t.TemplateRef],{ngIf:[0,"ngIf"]},null),(n()(),t["\u0275ted"](-1,null,["\n"]))],function(n,l){var e=l.component;n(l,4,0,e.message),n(l,7,0,!e.message)},null)}var G=t["\u0275ccf"]("ng-component",z,function(n){return t["\u0275vid"](0,[(n()(),t["\u0275eld"](0,0,null,null,1,"ng-component",[],null,null,null,Y,B)),t["\u0275did"](1,245760,null,0,z,[d.a,c.a],null,null)],function(n,l){n(l,1,0)},null)},{},{},[]),K=function(){function n(n,l){this.blogService=n,this.route=l}return n.prototype.ngOnInit=function(){var n=this;this.routeParamSub=this.route.params.subscribe(function(l){return n.blogService.unsubscribe(l.email).subscribe(function(l){n.message=l},function(l){n.message=l})})},n.prototype.ngOnDestroy=function(){this.routeParamSub.unsubscribe()},n}(),j=t["\u0275crt"]({encapsulation:0,styles:[["[_nghost-%COMP%]{min-width:304px;max-width:1000px;margin:auto;width:100%;display:block}p[_ngcontent-%COMP%]{background:#5ac0f3;border:2px solid #1c2e3b;padding:5px;box-sizing:border-box}"]],data:{}});function U(n){return t["\u0275vid"](0,[(n()(),t["\u0275eld"](0,0,null,null,1,"p",[],null,null,null,null,null)),(n()(),t["\u0275ted"](1,null,["",""]))],null,function(n,l){n(l,1,0,l.component.message)})}function $(n){return t["\u0275vid"](0,[(n()(),t["\u0275eld"](0,0,null,null,1,"span",[],null,null,null,null,null)),(n()(),t["\u0275ted"](-1,null,["Loading..."]))],null,null)}function W(n){return t["\u0275vid"](0,[(n()(),t["\u0275eld"](0,0,null,null,1,"h1",[],null,null,null,null,null)),(n()(),t["\u0275ted"](-1,null,["Blog unsubscription"])),(n()(),t["\u0275ted"](-1,null,["\n"])),(n()(),t["\u0275and"](16777216,null,null,1,null,U)),t["\u0275did"](4,16384,null,0,s.i,[t.ViewContainerRef,t.TemplateRef],{ngIf:[0,"ngIf"]},null),(n()(),t["\u0275ted"](-1,null,["\n"])),(n()(),t["\u0275and"](16777216,null,null,1,null,$)),t["\u0275did"](7,16384,null,0,s.i,[t.ViewContainerRef,t.TemplateRef],{ngIf:[0,"ngIf"]},null),(n()(),t["\u0275ted"](-1,null,["\n"]))],function(n,l){var e=l.component;n(l,4,0,e.message),n(l,7,0,!e.message)},null)}var J=t["\u0275ccf"]("ng-component",K,function(n){return t["\u0275vid"](0,[(n()(),t["\u0275eld"](0,0,null,null,1,"ng-component",[],null,null,null,W,j)),t["\u0275did"](1,245760,null,0,K,[d.a,c.a],null,null)],function(n,l){n(l,1,0)},null)},{},{},[]),Z=function(){function n(n,l){this.blogsService=n,this.route=l}return n.prototype.ngOnInit=function(){var n=this;this.routeParamSub=this.route.params.subscribe(function(l){return n.blogsService.getBlog(l.id).subscribe(function(l){n.blog=l},function(l){n.error="Blog with given id does not exist. The blog may have been removed."})})},n.prototype.ngOnDestroy=function(){this.routeParamSub.unsubscribe()},n}(),H=t["\u0275crt"]({encapsulation:0,styles:[["[_nghost-%COMP%]{min-width:304px;max-width:1000px;margin:auto;width:100%;display:block}blog-post[_ngcontent-%COMP%]{max-width:600px;margin:auto}h2[_ngcontent-%COMP%]{text-align:center}.error[_ngcontent-%COMP%]{text-align:center;margin:20px}"]],data:{}});function X(n){return t["\u0275vid"](0,[(n()(),t["\u0275eld"](0,0,null,null,1,"blog-post",[],null,null,null,o.b,o.a)),t["\u0275did"](1,114688,null,0,r.a,[],{blogData:[0,"blogData"],minimizable:[1,"minimizable"],visible:[2,"visible"]},null)],function(n,l){n(l,1,0,l.component.blog,!1,!0)},null)}function Q(n){return t["\u0275vid"](0,[(n()(),t["\u0275eld"](0,0,null,null,1,"div",[["class","error"]],null,null,null,null,null)),(n()(),t["\u0275ted"](1,null,["",""]))],null,function(n,l){n(l,1,0,l.component.error)})}function nn(n){return t["\u0275vid"](0,[(n()(),t["\u0275eld"](0,0,null,null,1,"h2",[],null,null,null,null,null)),(n()(),t["\u0275ted"](-1,null,["Blog"])),(n()(),t["\u0275ted"](-1,null,["\n"])),(n()(),t["\u0275and"](16777216,null,null,1,null,X)),t["\u0275did"](4,16384,null,0,s.i,[t.ViewContainerRef,t.TemplateRef],{ngIf:[0,"ngIf"]},null),(n()(),t["\u0275ted"](-1,null,["\n"])),(n()(),t["\u0275and"](16777216,null,null,1,null,Q)),t["\u0275did"](7,16384,null,0,s.i,[t.ViewContainerRef,t.TemplateRef],{ngIf:[0,"ngIf"]},null),(n()(),t["\u0275ted"](-1,null,["\n"]))],function(n,l){var e=l.component;n(l,4,0,e.blog),n(l,7,0,e.error)},null)}var ln=t["\u0275ccf"]("ng-component",Z,function(n){return t["\u0275vid"](0,[(n()(),t["\u0275eld"](0,0,null,null,1,"ng-component",[],null,null,null,nn,H)),t["\u0275did"](1,245760,null,0,Z,[d.a,c.a],null,null)],function(n,l){n(l,1,0)},null)},{},{},[]),en=e("WnaA"),tn=e("/yY+"),un=e("t/Na"),on=e("W4xs"),rn=e("AtLt"),sn=e("XgB0"),cn=e("PCNd"),an={analytics:!1},dn={analytics:!1};c.q.forChild([{path:"",component:h},{path:"subscribe",component:F},{path:"subscribe/:email",component:z,data:an},{path:"unsubscribe/:email",component:K,data:dn},{path:":id",component:Z}]),e.d(l,"BlogsModuleNgFactory",function(){return pn});var pn=t["\u0275cmf"](u,[],function(n){return t["\u0275mod"]([t["\u0275mpd"](512,t.ComponentFactoryResolver,t["\u0275CodegenComponentFactoryResolver"],[[8,[i.a,T,A,G,J,ln]],[3,t.ComponentFactoryResolver],t.NgModuleRef]),t["\u0275mpd"](4608,s.k,s.j,[t.LOCALE_ID,[2,s.u]]),t["\u0275mpd"](4608,V.s,V.s,[]),t["\u0275mpd"](4608,en.LocalStorageService,en.LocalStorageService,["LOCAL_STORAGE_SERVICE_CONFIG"]),t["\u0275mpd"](4608,tn.a,tn.a,[en.LocalStorageService]),t["\u0275mpd"](4608,d.a,d.a,[un.c,on.a]),t["\u0275mpd"](4608,p.a,p.a,[rn.b,en.LocalStorageService,un.c]),t["\u0275mpd"](1073742336,s.b,s.b,[]),t["\u0275mpd"](1073742336,V.p,V.p,[]),t["\u0275mpd"](1073742336,V.e,V.e,[]),t["\u0275mpd"](1073742336,sn.LocalStorageModule,sn.LocalStorageModule,[]),t["\u0275mpd"](1073742336,cn.a,cn.a,[]),t["\u0275mpd"](1073742336,c.q,c.q,[[2,c.w],[2,c.o]]),t["\u0275mpd"](1073742336,u,u,[]),t["\u0275mpd"](256,"LOCAL_STORAGE_SERVICE_CONFIG",{prefix:"voyacode",storageType:"localStorage"},[]),t["\u0275mpd"](1024,c.m,function(){return[[{path:"",component:h},{path:"subscribe",component:F},{path:"subscribe/:email",component:z,data:an},{path:"unsubscribe/:email",component:K,data:dn},{path:":id",component:Z}]]},[])])})}}]);