webpackJsonp([4],{134:function(n,l,u){"use strict";Object.defineProperty(l,"__esModule",{value:!0}),u.d(l,"HomeModuleNgFactory",function(){return f});var t=u(1),e=u(209),o=u(210),i=u(6),a=u(23),r=u(24),d=u(73),c=u(13),s=u(11),g=u(74),p=u(12),b=u(170),f=t["ɵcmf"](e.a,[],function(n){return t["ɵmod"]([t["ɵmpd"](512,t.ComponentFactoryResolver,t["ɵCodegenComponentFactoryResolver"],[[8,[o.a]],[3,t.ComponentFactoryResolver],t.NgModuleRef]),t["ɵmpd"](4608,i.l,i.k,[t.LOCALE_ID]),t["ɵmpd"](4608,a.u,a.u,[]),t["ɵmpd"](4608,r.a,r.a,[]),t["ɵmpd"](4608,d.a,d.a,[c.e,s.a]),t["ɵmpd"](512,i.b,i.b,[]),t["ɵmpd"](512,a.r,a.r,[]),t["ɵmpd"](512,a.g,a.g,[]),t["ɵmpd"](512,g.a,g.a,[]),t["ɵmpd"](512,p.q,p.q,[[2,p.v],[2,p.o]]),t["ɵmpd"](512,e.a,e.a,[]),t["ɵmpd"](1024,p.m,function(){return[[{path:"",component:b.a}]]},[])])})},152:function(n,l,u){"use strict";u.d(l,"a",function(){return t});var t=function(){function n(){this.minimizable=!1,this.visible=!1}return n.prototype.ngOnInit=function(){},n.prototype.toggle=function(n){void 0===n&&(n=!this.visible),this.visible=n},n.ctorParameters=function(){return[]},n}()},155:function(n,l,u){"use strict";function t(n){return r["ɵvid"](0,[(n()(),r["ɵeld"](0,null,null,1,"button",[["class","minimize-button"]],[[8,"title",0]],[[null,"click"]],function(n,l,u){var t=!0,e=n.component;if("click"===l){t=!1!==e.toggle()&&t}return t},null,null)),(n()(),r["ɵted"](null,["",""]))],null,function(n,l){var u=l.component;n(l,0,0,u.visible?"Close":"Open"),n(l,1,0,u.visible?"‒":"+")})}function e(n){return r["ɵvid"](0,[(n()(),r["ɵeld"](0,null,null,3,"tr",[],null,null,null,null,null)),(n()(),r["ɵted"](null,["\n    "])),(n()(),r["ɵeld"](0,null,null,0,"td",[["class","blog-text"]],[[8,"innerHTML",1]],null,null,null,null)),(n()(),r["ɵted"](null,["\n  "]))],null,function(n,l){var u=l.component;n(l,2,0,null==u.blogData?null:u.blogData.text)})}function o(n){return r["ɵvid"](0,[(n()(),r["ɵeld"](0,null,null,18,"table",[],null,null,null,null,null)),(n()(),r["ɵted"](null,["\n  "])),(n()(),r["ɵeld"](0,null,null,16,"tbody",[],null,null,null,null,null)),(n()(),r["ɵeld"](0,null,null,11,"tr",[],null,null,null,null,null)),(n()(),r["ɵted"](null,["\n    "])),(n()(),r["ɵeld"](0,null,null,8,"th",[["class","blog-header"]],null,null,null,null,null)),(n()(),r["ɵted"](null,["\n      ","\n      "])),(n()(),r["ɵand"](16777216,null,null,1,null,t)),r["ɵdid"](16384,null,0,d.j,[r.ViewContainerRef,r.TemplateRef],{ngIf:[0,"ngIf"]},null),(n()(),r["ɵted"](null,["\n      "])),(n()(),r["ɵeld"](0,null,null,0,"br",[],null,null,null,null,null)),(n()(),r["ɵeld"](0,null,null,1,"span",[["class","blog-date"]],null,null,null,null,null)),(n()(),r["ɵted"](null,["",""])),(n()(),r["ɵted"](null,["      \n    "])),(n()(),r["ɵted"](null,["\n  "])),(n()(),r["ɵted"](null,["\n  "])),(n()(),r["ɵand"](16777216,null,null,1,null,e)),r["ɵdid"](16384,null,0,d.j,[r.ViewContainerRef,r.TemplateRef],{ngIf:[0,"ngIf"]},null),(n()(),r["ɵted"](null,["\n"]))],function(n,l){var u=l.component;n(l,8,0,u.minimizable),n(l,17,0,u.visible)},function(n,l){var u=l.component;n(l,6,0,null==u.blogData?null:u.blogData.name),n(l,12,0,null==u.blogData?null:u.blogData.date)})}function i(n){return r["ɵvid"](0,[(n()(),r["ɵeld"](0,null,null,1,"blog-post",[],null,null,null,o,g)),r["ɵdid"](114688,null,0,c.a,[],null,null)],function(n,l){n(l,1,0)},null)}u.d(l,"a",function(){return g}),l.b=o;var a=u(157),r=u(1),d=u(6),c=u(152),s=[a.a],g=r["ɵcrt"]({encapsulation:2,styles:s,data:{}});r["ɵccf"]("blog-post",c.a,i,{blogData:"blogData",minimizable:"minimizable",visible:"visible"},{},[])},157:function(n,l,u){"use strict";u.d(l,"a",function(){return t});var t=["blog-post table {\n  background: #5ac0f3;\n  border: 2px solid #1C2E3B;\n  padding: 5px;\n  box-sizing: border-box; }\n\nblog-post .blog-header button {\n  background: #2586CC;\n  color: #1C2E3B;\n  text-align: center;\n  border: 1px solid #1C2E3B;\n  cursor: pointer; }\n  blog-post .blog-header button:focus {\n    outline: none; }\n  blog-post .blog-header button:hover {\n    background: #99d4ff; }\n\nblog-post {\n  display: block; }\n  blog-post table {\n    padding: 10px;\n    width: 100%;\n    max-width: 100%;\n    margin: 0; }\n  blog-post .blog-header button {\n    float: right;\n    width: 24px;\n    height: 24px;\n    font-size: 20px;\n    text-align: center;\n    padding: 0px;\n    line-height: 1; }\n  blog-post .blog-date {\n    font-size: 75%;\n    font-weight: normal; }\n  blog-post .blog-text {\n    border-top: 1px solid #1C2E3B;\n    padding-top: 5px; }\n  blog-post img {\n    max-width: 100%; }\n"]},161:function(n,l,u){"use strict";u.d(l,"a",function(){return t});var t=(function(){function n(){}}(),[{name:"Hangman",description:"Hangman mobile app for Android.",path:"projects/hangman",bannerUrl:"/images/banners/hangman-banner.jpg",iconUrl:"/images/icons/hangman-icon.jpg",onBanner:!0},{name:"Snow Machine",description:"Create all kinds of snow with Snow Machine!",path:"projects/snow-machine",bannerUrl:"/images/banners/snow-machine-banner.jpg",iconUrl:"/images/icons/snow-machine-icon.jpg",onBanner:!0},{name:"Chess",description:"Play a game of chess against a friend or a computer AI!",path:"projects/chess",bannerUrl:"/images/banners/chess-banner.jpg",iconUrl:"/images/icons/chess-icon.jpg",onBanner:!0},{name:"Slay the Dragon!",description:'Slay the dragon in the game "Slay the Dragon!"',path:"projects/slay-the-dragon",bannerUrl:"/images/banners/slay-the-dragon-banner.jpg",iconUrl:"/images/icons/slay-the-dragon-icon.jpg",onBanner:!0},{name:"Rock, Paper, Scissors",description:"Beat the computer in a very challenging game of Rock, Paper, Scissors.",path:"projects/rock-paper-scissors",bannerUrl:"/images/banners/rock-paper-scissors-banner.jpg",iconUrl:"/images/icons/rock-paper-scissors-icon.jpg",onBanner:!0}])},169:function(n,l,u){"use strict";u.d(l,"a",function(){return e});var t=u(161),e=function(){function n(){this.id=0,this.auto=!1,this.projects=t.a.filter(function(n){return n.onBanner}),this.len=this.projects.length}return n.prototype.ngOnInit=function(){this.autoChange(6e3)},n.prototype.autoChange=function(n){var l=this;this.auto?this.change(this.id+1):this.auto=!0,setTimeout(function(){l.autoChange(5e3)},n)},n.prototype.change=function(n,l){void 0===l&&(l=!1),l&&(this.auto=!1),this.id=n<0?this.len-1:n%this.len},n.ctorParameters=function(){return[]},n}()},170:function(n,l,u){"use strict";u.d(l,"a",function(){return e});var t=u(73),e=function(){function n(n){this.blogs=n,this.blog=null}return n.prototype.ngOnInit=function(){var n=this;this.blogs.getBlogs(1).subscribe(function(l){n.blog=l[0]})},n.ctorParameters=function(){return[{type:t.a}]},n}()},209:function(n,l,u){"use strict";u.d(l,"a",function(){return t});var t=function(){function n(){}return n}()},210:function(n,l,u){"use strict";function t(n){return r["ɵvid"](0,[(n()(),r["ɵeld"](0,null,null,1,"blog-post",[],null,null,null,d.b,d.a)),r["ɵdid"](114688,null,0,c.a,[],{blogData:[0,"blogData"],visible:[1,"visible"]},null)],function(n,l){n(l,1,0,l.component.blog,!0)},null)}function e(n){return r["ɵvid"](0,[(n()(),r["ɵeld"](0,null,null,1,"div",[],null,null,null,null,null)),(n()(),r["ɵted"](null,["Loading blog..."]))],null,null)}function o(n){return r["ɵvid"](0,[(n()(),r["ɵeld"](0,null,null,99,"section",[],null,null,null,null,null)),(n()(),r["ɵted"](null,["\n  "])),(n()(),r["ɵeld"](0,null,null,16,"div",[["class","main-content"]],null,null,null,null,null)),(n()(),r["ɵted"](null,["\n    "])),(n()(),r["ɵeld"](0,null,null,1,"h1",[],null,null,null,null,null)),(n()(),r["ɵted"](null,["Projects"])),(n()(),r["ɵted"](null,["\n    "])),(n()(),r["ɵeld"](0,null,null,1,"banner",[],null,null,null,s.b,s.a)),r["ɵdid"](114688,null,0,g.a,[],null,null),(n()(),r["ɵted"](null,["\n    "])),(n()(),r["ɵeld"](0,null,null,1,"h1",[],null,null,null,null,null)),(n()(),r["ɵted"](null,["Newest blog"])),(n()(),r["ɵted"](null,["\n    "])),(n()(),r["ɵand"](16777216,null,null,1,null,t)),r["ɵdid"](16384,null,0,p.j,[r.ViewContainerRef,r.TemplateRef],{ngIf:[0,"ngIf"]},null),(n()(),r["ɵted"](null,["\n    "])),(n()(),r["ɵand"](16777216,null,null,1,null,e)),r["ɵdid"](16384,null,0,p.j,[r.ViewContainerRef,r.TemplateRef],{ngIf:[0,"ngIf"]},null),(n()(),r["ɵted"](null,["\n  "])),(n()(),r["ɵted"](null,["\n  "])),(n()(),r["ɵeld"](0,null,null,78,"aside",[],null,null,null,null,null)),(n()(),r["ɵted"](null,["\n    "])),(n()(),r["ɵeld"](0,null,null,1,"h2",[],null,null,null,null,null)),(n()(),r["ɵted"](null,["Welcome!"])),(n()(),r["ɵted"](null,["\n    Hello and welcome to my website! This website is intended for my personal coding projects, which may include games and other random stuff. Feel free to test them out and leave feedback in the comments!\n    "])),(n()(),r["ɵeld"](0,null,null,0,"br",[],null,null,null,null,null)),(n()(),r["ɵeld"](0,null,null,0,"br",[],null,null,null,null,null)),(n()(),r["ɵted"](null,["\n    Code for the website can be found at "])),(n()(),r["ɵeld"](0,null,null,1,"a",[["href","https://github.com/Voya100/VoyaCode"]],null,null,null,null,null)),(n()(),r["ɵted"](null,["Github"])),(n()(),r["ɵted"](null,[".\n    "])),(n()(),r["ɵeld"](0,null,null,0,"br",[],null,null,null,null,null)),(n()(),r["ɵted"](null,["\n    "])),(n()(),r["ɵeld"](0,null,null,1,"h2",[],null,null,null,null,null)),(n()(),r["ɵted"](null,["About me:"])),(n()(),r["ɵted"](null,["\n    I'm a 21-year-old Finnish university student with a huge passion for coding. I'm mostly a web programmer, but I have also done a few Javascript based mobile apps.\n    "])),(n()(),r["ɵeld"](0,null,null,1,"h3",[],null,null,null,null,null)),(n()(),r["ɵted"](null,["Languages and frameworks"])),(n()(),r["ɵted"](null,["\n    "])),(n()(),r["ɵeld"](0,null,null,58,"table",[["class","framework-table"]],null,null,null,null,null)),(n()(),r["ɵted"](null,["\n      "])),(n()(),r["ɵeld"](0,null,null,56,"tbody",[],null,null,null,null,null)),(n()(),r["ɵeld"](0,null,null,54,"tr",[],null,null,null,null,null)),(n()(),r["ɵted"](null,["\n        "])),(n()(),r["ɵeld"](0,null,null,22,"td",[],null,null,null,null,null)),(n()(),r["ɵted"](null,["\n          "])),(n()(),r["ɵeld"](0,null,null,1,"b",[],null,null,null,null,null)),(n()(),r["ɵted"](null,["Javascript"])),(n()(),r["ɵted"](null,["\n          "])),(n()(),r["ɵeld"](0,null,null,1,"li",[],null,null,null,null,null)),(n()(),r["ɵted"](null,["Angular"])),(n()(),r["ɵted"](null,["\n          "])),(n()(),r["ɵeld"](0,null,null,1,"li",[],null,null,null,null,null)),(n()(),r["ɵted"](null,["AngularJS"])),(n()(),r["ɵted"](null,["\n          "])),(n()(),r["ɵeld"](0,null,null,1,"li",[],null,null,null,null,null)),(n()(),r["ɵted"](null,["Ionic"])),(n()(),r["ɵted"](null,["\n          "])),(n()(),r["ɵeld"](0,null,null,1,"li",[],null,null,null,null,null)),(n()(),r["ɵted"](null,["jQuery"])),(n()(),r["ɵted"](null,["\n          "])),(n()(),r["ɵeld"](0,null,null,1,"li",[],null,null,null,null,null)),(n()(),r["ɵted"](null,["React Native"])),(n()(),r["ɵted"](null,["\n          "])),(n()(),r["ɵeld"](0,null,null,1,"li",[],null,null,null,null,null)),(n()(),r["ɵted"](null,["Node.js"])),(n()(),r["ɵted"](null,["\n        "])),(n()(),r["ɵted"](null,["\n        "])),(n()(),r["ɵeld"](0,null,null,27,"td",[],null,null,null,null,null)),(n()(),r["ɵted"](null,["\n          "])),(n()(),r["ɵeld"](0,null,null,1,"b",[],null,null,null,null,null)),(n()(),r["ɵted"](null,["Web"])),(n()(),r["ɵted"](null,["\n          "])),(n()(),r["ɵeld"](0,null,null,1,"li",[],null,null,null,null,null)),(n()(),r["ɵted"](null,["HTML5"])),(n()(),r["ɵted"](null,["\n          "])),(n()(),r["ɵeld"](0,null,null,1,"li",[],null,null,null,null,null)),(n()(),r["ɵted"](null,["scss"])),(n()(),r["ɵted"](null,["\n          "])),(n()(),r["ɵeld"](0,null,null,0,"br",[],null,null,null,null,null)),(n()(),r["ɵted"](null,["\n          "])),(n()(),r["ɵeld"](0,null,null,1,"b",[],null,null,null,null,null)),(n()(),r["ɵted"](null,["Others"])),(n()(),r["ɵted"](null,["\n          "])),(n()(),r["ɵeld"](0,null,null,1,"li",[],null,null,null,null,null)),(n()(),r["ɵted"](null,["PHP"])),(n()(),r["ɵted"](null,["\n          "])),(n()(),r["ɵeld"](0,null,null,1,"li",[],null,null,null,null,null)),(n()(),r["ɵted"](null,["C++"])),(n()(),r["ɵted"](null,["\n          "])),(n()(),r["ɵeld"](0,null,null,1,"li",[],null,null,null,null,null)),(n()(),r["ɵted"](null,["Python"])),(n()(),r["ɵted"](null,["\n          "])),(n()(),r["ɵeld"](0,null,null,1,"li",[],null,null,null,null,null)),(n()(),r["ɵted"](null,["Scala"])),(n()(),r["ɵted"](null,["\n        "])),(n()(),r["ɵted"](null,["\n      "])),(n()(),r["ɵted"](null,["\n    "])),(n()(),r["ɵted"](null,["\n  "])),(n()(),r["ɵted"](null,["\n"]))],function(n,l){var u=l.component;n(l,8,0),n(l,14,0,null!=u.blog),n(l,17,0,null==u.blog)},null)}function i(n){return r["ɵvid"](0,[(n()(),r["ɵeld"](0,null,null,1,"ng-component",[],null,null,null,o,m)),r["ɵdid"](114688,null,0,b.a,[f.a],null,null)],function(n,l){n(l,1,0)},null)}u.d(l,"a",function(){return v});var a=u(211),r=u(1),d=u(155),c=u(152),s=u(212),g=u(169),p=u(6),b=u(170),f=u(73),h=[a.a],m=r["ɵcrt"]({encapsulation:0,styles:h,data:{}}),v=r["ɵccf"]("ng-component",b.a,i,{},{},[])},211:function(n,l,u){"use strict";u.d(l,"a",function(){return t});var t=["section[_ngcontent-%COMP%]:after {\n  content: '';\n  display: table;\n  clear: both; }\n\n[_nghost-%COMP%] {\n  min-width: 304px;\n  max-width: 1000px;\n  margin: auto;\n  width: 100%;\n  display: block; }\n\naside[_ngcontent-%COMP%] {\n  background: #5ac0f3;\n  border: 2px solid #1C2E3B;\n  padding: 5px;\n  box-sizing: border-box; }\n\nsection[_ngcontent-%COMP%] {\n  width: 100%;\n  box-sizing: border-box;\n  margin: auto; }\n\n.main-content[_ngcontent-%COMP%] {\n  box-sizing: border-box;\n  width: 65%;\n  float: left; }\n\naside[_ngcontent-%COMP%] {\n  box-sizing: border-box;\n  width: 33%;\n  float: right;\n  margin-right: 0px;\n  padding: 10px; }\n  aside[_ngcontent-%COMP%]   li[_ngcontent-%COMP%] {\n    list-style-position: inside; }\n\n.framework-table[_ngcontent-%COMP%] {\n  width: 100%; }\n  .framework-table[_ngcontent-%COMP%]   td[_ngcontent-%COMP%] {\n    vertical-align: top;\n    width: 50%; }\n\n@media screen and (max-width: 600px) {\n  .main-content[_ngcontent-%COMP%], aside[_ngcontent-%COMP%] {\n    width: 100%;\n    float: none;\n    margin-left: 0px; }\n  aside[_ngcontent-%COMP%] {\n    margin-top: 8px; } }"]},212:function(n,l,u){"use strict";function t(n){return r["ɵvid"](0,[(n()(),r["ɵeld"](0,null,null,4,"a",[],[[8,"title",0],[1,"target",0],[8,"href",4]],[[null,"click"]],function(n,l,u){var t=!0;if("click"===l){t=!1!==r["ɵnov"](n,1).onClick(u.button,u.ctrlKey,u.metaKey,u.shiftKey)&&t}return t},null,null)),r["ɵdid"](671744,null,0,d.p,[d.o,d.a,c.g],{routerLink:[0,"routerLink"]},null),(n()(),r["ɵted"](null,["\n    "])),(n()(),r["ɵeld"](0,null,null,0,"img",[],[[8,"src",4],[8,"alt",0],[4,"width",null]],null,null,null,null)),(n()(),r["ɵted"](null,["\n  "]))],function(n,l){n(l,1,0,l.context.$implicit.path)},function(n,l){var u=l.component;n(l,0,0,l.context.$implicit.name,r["ɵnov"](l,1).target,r["ɵnov"](l,1).href),n(l,3,0,l.context.$implicit.bannerUrl,l.context.$implicit.name,100/u.projects.length+"%")})}function e(n){return r["ɵvid"](0,[(n()(),r["ɵeld"](0,null,null,0,"button",[["class","circle"]],[[2,"active",null]],[[null,"click"]],function(n,l,u){var t=!0,e=n.component;if("click"===l){t=!1!==e.change(n.context.index,!0)&&t}return t},null,null))],null,function(n,l){var u=l.component;n(l,0,0,l.context.index===u.id)})}function o(n){return r["ɵvid"](0,[(n()(),r["ɵeld"](0,null,null,19,"div",[["class","banner-container"]],null,null,null,null,null)),(n()(),r["ɵted"](null,["\n  "])),(n()(),r["ɵeld"](0,null,null,4,"div",[["class","img-container"]],[[4,"width",null],[4,"left",null]],null,null,null,null)),(n()(),r["ɵted"](null,["\n  "])),(n()(),r["ɵand"](16777216,null,null,1,null,t)),r["ɵdid"](802816,null,0,c.i,[r.ViewContainerRef,r.TemplateRef,r.IterableDiffers],{ngForOf:[0,"ngForOf"]},null),(n()(),r["ɵted"](null,["\n  "])),(n()(),r["ɵted"](null,["\n  "])),(n()(),r["ɵeld"](0,null,null,10,"div",[["class","button-container"]],null,null,null,null,null)),(n()(),r["ɵted"](null,["\n    "])),(n()(),r["ɵeld"](0,null,null,1,"button",[["class","left"]],null,[[null,"click"]],function(n,l,u){var t=!0,e=n.component;if("click"===l){t=!1!==e.change(e.id-1,!0)&&t}return t},null,null)),(n()(),r["ɵeld"](0,null,null,0,"span",[["class","left-arrow"]],null,null,null,null,null)),(n()(),r["ɵted"](null,["\n    "])),(n()(),r["ɵand"](16777216,null,null,1,null,e)),r["ɵdid"](802816,null,0,c.i,[r.ViewContainerRef,r.TemplateRef,r.IterableDiffers],{ngForOf:[0,"ngForOf"]},null),(n()(),r["ɵted"](null,["\n    "])),(n()(),r["ɵeld"](0,null,null,1,"button",[["class","right"]],null,[[null,"click"]],function(n,l,u){var t=!0,e=n.component;if("click"===l){t=!1!==e.change(e.id+1,!0)&&t}return t},null,null)),(n()(),r["ɵeld"](0,null,null,0,"span",[["class","right-arrow"]],null,null,null,null,null)),(n()(),r["ɵted"](null,["\n  "])),(n()(),r["ɵted"](null,["\n"]))],function(n,l){var u=l.component;n(l,5,0,u.projects),n(l,14,0,u.projects)},function(n,l){var u=l.component;n(l,2,0,100*u.projects.length+"%",-100*u.id+"%")})}function i(n){return r["ɵvid"](0,[(n()(),r["ɵeld"](0,null,null,1,"banner",[],null,null,null,o,p)),r["ɵdid"](114688,null,0,s.a,[],null,null)],function(n,l){n(l,1,0)},null)}u.d(l,"a",function(){return p}),l.b=o;var a=u(213),r=u(1),d=u(12),c=u(6),s=u(169),g=[a.a],p=r["ɵcrt"]({encapsulation:0,styles:g,data:{}});r["ɵccf"]("banner",s.a,i,{},{},[])},213:function(n,l,u){"use strict";u.d(l,"a",function(){return t});var t=[".banner-container[_ngcontent-%COMP%] {\n  width: 100%;\n  height: 290px;\n  background: #5ac0f3;\n  border: 1px solid #1C2E3B;\n  box-sizing: border-box;\n  position: relative;\n  overflow: hidden; }\n\n.img-container[_ngcontent-%COMP%] {\n  height: 250px;\n  position: absolute;\n  left: 0;\n  transition: left 1.2s ease-in-out;\n  -webkit-transition: left 1.2s ease-in-out; }\n  .img-container[_ngcontent-%COMP%]   img[_ngcontent-%COMP%] {\n    height: 100%;\n    display: block;\n    float: left;\n    border: 0; }\n\n.button-container[_ngcontent-%COMP%] {\n  margin-top: 250px;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  border-top: 1px solid #1C2E3B;\n  text-align: center;\n  height: 40px; }\n\n.circle[_ngcontent-%COMP%] {\n  width: 20px;\n  height: 20px;\n  margin: 2px 5px;\n  border-radius: 50%;\n  border-color: #17537F;\n  background: white; }\n  .circle.active[_ngcontent-%COMP%] {\n    background: #2586CC; }\n\nbutton[_ngcontent-%COMP%] {\n  background: #5ac0f3;\n  text-decoration: none;\n  border: 2px solid #1C2E3B;\n  cursor: pointer; }\n  button[_ngcontent-%COMP%]:focus {\n    outline: none; }\n  button[_ngcontent-%COMP%]:hover {\n    background: #99d4ff; }\n\n.left[_ngcontent-%COMP%], .right[_ngcontent-%COMP%] {\n  width: 30px;\n  height: 30px;\n  background: #2586CC;\n  border: 2px solid #1C2E3B;\n  border-radius: 50%;\n  margin: 0 5px; }\n\n.left-arrow[_ngcontent-%COMP%] {\n  display: block;\n  border: 10px solid transparent;\n  border-right: 10px solid #000;\n  border-left: 0;\n  height: 0;\n  width: 0;\n  margin-right: 4px; }\n\n.right-arrow[_ngcontent-%COMP%] {\n  display: block;\n  border: 10px solid transparent;\n  border-left: 10px solid #000;\n  border-right: 0;\n  height: 0;\n  width: 0;\n  margin-left: 4px; }"]}});