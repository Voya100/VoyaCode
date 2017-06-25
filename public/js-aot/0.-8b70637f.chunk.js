webpackJsonp([0],{143:function(n,t,e){"use strict";e.d(t,"a",function(){return c});var l=e(1),r=e(13),o=e(34),i=(e.n(o),e(61)),a=(e.n(i),this&&this.__decorate||function(n,t,e,l){var r,o=arguments.length,i=o<3?t:null===l?l=Object.getOwnPropertyDescriptor(t,e):l;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)i=Reflect.decorate(n,t,e,l);else for(var a=n.length-1;a>=0;a--)(r=n[a])&&(i=(o<3?r(i):o>3?r(t,e,i):r(t,e))||i);return o>3&&i&&Object.defineProperty(t,e,i),i}),u=this&&this.__metadata||function(n,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(n,t)},c=function(){function n(n){this.http=n,this.url="/api/blogs"}return n.prototype.getBlogs=function(n){return void 0===n&&(n=0),this.http.get(this.url+(n?"?limit="+n:"")).map(function(n){return n.json().data||[{id:0,name:"Blog search failed.",text:"Sorry, something went wrong. If this problem persists, report to the admin through comments page.",date:"",year:0}]}).catch(function(n){return[[{id:0,name:"Blog search failed.",text:"Sorry, something went wrong and blog couldn't be fetched from the server. Check your internet connection and refresh the page.<br><br>If problem persists, report to the admin through comments page.",date:"",year:0}]]})},n}();c=a([e.i(l.Injectable)(),u("design:paramtypes",[r.k])],c)},144:function(n,t,e){"use strict";e.d(t,"a",function(){return o});var l=e(1),r=this&&this.__decorate||function(n,t,e,l){var r,o=arguments.length,i=o<3?t:null===l?l=Object.getOwnPropertyDescriptor(t,e):l;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)i=Reflect.decorate(n,t,e,l);else for(var a=n.length-1;a>=0;a--)(r=n[a])&&(i=(o<3?r(i):o>3?r(t,e,i):r(t,e))||i);return o>3&&i&&Object.defineProperty(t,e,i),i},o=function(){function n(){}return n}();o=r([e.i(l.Component)({selector:"description-box",template:e(152),styles:[e(154)]})],o)},145:function(n,t,e){"use strict";e.d(t,"a",function(){return c});var l=e(1),r=e(6),o=e(146),i=e(143),a=e(144),u=this&&this.__decorate||function(n,t,e,l){var r,o=arguments.length,i=o<3?t:null===l?l=Object.getOwnPropertyDescriptor(t,e):l;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)i=Reflect.decorate(n,t,e,l);else for(var a=n.length-1;a>=0;a--)(r=n[a])&&(i=(o<3?r(i):o>3?r(t,e,i):r(t,e))||i);return o>3&&i&&Object.defineProperty(t,e,i),i},c=function(){function n(){}return n}();c=u([e.i(l.NgModule)({imports:[r.b],exports:[o.a,a.a],declarations:[o.a,a.a],providers:[i.a]})],c)},146:function(n,t,e){"use strict";e.d(t,"a",function(){return i});var l=e(1),r=this&&this.__decorate||function(n,t,e,l){var r,o=arguments.length,i=o<3?t:null===l?l=Object.getOwnPropertyDescriptor(t,e):l;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)i=Reflect.decorate(n,t,e,l);else for(var a=n.length-1;a>=0;a--)(r=n[a])&&(i=(o<3?r(i):o>3?r(t,e,i):r(t,e))||i);return o>3&&i&&Object.defineProperty(t,e,i),i},o=this&&this.__metadata||function(n,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(n,t)},i=function(){function n(){this.minimizable=!1,this.visible=!1}return n.prototype.ngOnInit=function(){},n.prototype.toggle=function(n){void 0===n&&(n=!this.visible),this.visible=n},n}();r([e.i(l.Input)(),o("design:type",Object)],i.prototype,"blogData",void 0),r([e.i(l.Input)(),o("design:type",Boolean)],i.prototype,"minimizable",void 0),r([e.i(l.Input)(),o("design:type",Boolean)],i.prototype,"visible",void 0),i=r([e.i(l.Component)({selector:"blog-post",template:e(151),styles:[e(153)],encapsulation:l.ViewEncapsulation.None}),o("design:paramtypes",[])],i)},149:function(n,t,e){t=n.exports=e(12)(),t.push([n.i,"blog-post table{background:#5ac0f3;border:2px solid #1c2e3b;padding:5px;box-sizing:border-box}blog-post .blog-header button{background:#2586cc;border:1px solid #1c2e3b;cursor:pointer}blog-post .blog-header button:focus{outline:none}blog-post .blog-header button:hover{background:#99d4ff}blog-post{display:block}blog-post table{padding:10px;width:100%;max-width:100%;margin:0}blog-post .blog-header button{float:right;width:24px;height:24px;font-size:20px;text-align:center;padding:0;line-height:1}blog-post .blog-date{font-size:75%;font-weight:400}blog-post .blog-text{border-top:1px solid #1c2e3b;padding-top:5px}blog-post img{max-width:100%}",""])},150:function(n,t,e){t=n.exports=e(12)(),t.push([n.i,":host,div{display:block}div{margin:0;margin-top:15px;box-sizing:border-box;width:100%;background:#5ac0f3;border:2px solid #1c2e3b;padding:10px}",""])},151:function(n,t){n.exports="<table>\r\n  <tr>\r\n    <th class='blog-header'>\r\n      {{blogData?.name}}\r\n      <button *ngIf=\"minimizable\" class='minimize-button' [title]=\"visible ? 'Close' : 'Open'\" (click)=\"toggle()\">{{visible ? '‒' : '+'}}</button>\r\n      <br><span class='blog-date'>{{blogData?.date}}</span>      \r\n    </th>\r\n  </tr>\r\n  <tr *ngIf=\"visible\">\r\n    <td class='blog-text' [innerHtml]=\"blogData?.text\"></td>\r\n  </tr>\r\n</table>"},152:function(n,t){n.exports='<div class="description-box">\r\n  <h1>Description:</h1>\r\n  <ng-content></ng-content>\r\n</div>'},153:function(n,t,e){var l=e(149);n.exports="string"==typeof l?l:l.toString()},154:function(n,t,e){var l=e(150);n.exports="string"==typeof l?l:l.toString()},164:function(n,t,e){"use strict";e.d(t,"a",function(){return a});var l=e(1),r=e(143),o=this&&this.__decorate||function(n,t,e,l){var r,o=arguments.length,i=o<3?t:null===l?l=Object.getOwnPropertyDescriptor(t,e):l;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)i=Reflect.decorate(n,t,e,l);else for(var a=n.length-1;a>=0;a--)(r=n[a])&&(i=(o<3?r(i):o>3?r(t,e,i):r(t,e))||i);return o>3&&i&&Object.defineProperty(t,e,i),i},i=this&&this.__metadata||function(n,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(n,t)},a=function(){function n(n){this.blogs=n,this.blog=null}return n.prototype.ngOnInit=function(){var n=this;this.blogs.getBlogs(1).subscribe(function(t){n.blog=t[0]})},n}();a=o([e.i(l.Component)({template:e(325),styles:[e(353)]}),i("design:paramtypes",[r.a])],a)},182:function(n,t,e){"use strict";e.d(t,"a",function(){return l});var l=["blog-post table {\r\n  background: #5ac0f3;\r\n  border: 2px solid #1C2E3B;\r\n  padding: 5px;\r\n  box-sizing: border-box; }\r\n\r\nblog-post .blog-header button {\r\n  background: #2586CC;\r\n  text-align: center;\r\n  border: 1px solid #1C2E3B;\r\n  cursor: pointer; }\r\n  blog-post .blog-header button:focus {\r\n    outline: none; }\r\n  blog-post .blog-header button:hover {\r\n    background: #99d4ff; }\r\n\r\nblog-post {\r\n  display: block; }\r\n  blog-post table {\r\n    padding: 10px;\r\n    width: 100%;\r\n    max-width: 100%;\r\n    margin: 0; }\r\n  blog-post .blog-header button {\r\n    float: right;\r\n    width: 24px;\r\n    height: 24px;\r\n    font-size: 20px;\r\n    text-align: center;\r\n    padding: 0px;\r\n    line-height: 1; }\r\n  blog-post .blog-date {\r\n    font-size: 75%;\r\n    font-weight: normal; }\r\n  blog-post .blog-text {\r\n    border-top: 1px solid #1C2E3B;\r\n    padding-top: 5px; }\r\n  blog-post img {\r\n    max-width: 100%; }\r\n\r\n\r\n"]},183:function(n,t,e){"use strict";function l(n){return u["ɵvid"](0,[(n()(),u["ɵeld"](0,null,null,1,"button",[["class","minimize-button"]],[[8,"title",0]],[[null,"click"]],function(n,t,e){var l=!0,r=n.component;if("click"===t){l=!1!==r.toggle()&&l}return l},null,null)),(n()(),u["ɵted"](null,["",""]))],null,function(n,t){var e=t.component;n(t,0,0,e.visible?"Close":"Open"),n(t,1,0,e.visible?"‒":"+")})}function r(n){return u["ɵvid"](0,[(n()(),u["ɵeld"](0,null,null,3,"tr",[],null,null,null,null,null)),(n()(),u["ɵted"](null,["\n    "])),(n()(),u["ɵeld"](0,null,null,0,"td",[["class","blog-text"]],[[8,"innerHTML",1]],null,null,null,null)),(n()(),u["ɵted"](null,["\n  "]))],null,function(n,t){var e=t.component;n(t,2,0,null==e.blogData?null:e.blogData.text)})}function o(n){return u["ɵvid"](0,[(n()(),u["ɵeld"](0,null,null,18,"table",[],null,null,null,null,null)),(n()(),u["ɵted"](null,["\n  "])),(n()(),u["ɵeld"](0,null,null,16,"tbody",[],null,null,null,null,null)),(n()(),u["ɵeld"](0,null,null,11,"tr",[],null,null,null,null,null)),(n()(),u["ɵted"](null,["\n    "])),(n()(),u["ɵeld"](0,null,null,8,"th",[["class","blog-header"]],null,null,null,null,null)),(n()(),u["ɵted"](null,["\n      ","\n      "])),(n()(),u["ɵand"](16777216,null,null,1,null,l)),u["ɵdid"](16384,null,0,c.m,[u.ViewContainerRef,u.TemplateRef],{ngIf:[0,"ngIf"]},null),(n()(),u["ɵted"](null,["\n      "])),(n()(),u["ɵeld"](0,null,null,0,"br",[],null,null,null,null,null)),(n()(),u["ɵeld"](0,null,null,1,"span",[["class","blog-date"]],null,null,null,null,null)),(n()(),u["ɵted"](null,["",""])),(n()(),u["ɵted"](null,["      \n    "])),(n()(),u["ɵted"](null,["\n  "])),(n()(),u["ɵted"](null,["\n  "])),(n()(),u["ɵand"](16777216,null,null,1,null,r)),u["ɵdid"](16384,null,0,c.m,[u.ViewContainerRef,u.TemplateRef],{ngIf:[0,"ngIf"]},null),(n()(),u["ɵted"](null,["\n"]))],function(n,t){var e=t.component;n(t,8,0,e.minimizable),n(t,17,0,e.visible)},function(n,t){var e=t.component;n(t,6,0,null==e.blogData?null:e.blogData.name),n(t,12,0,null==e.blogData?null:e.blogData.date)})}function i(n){return u["ɵvid"](0,[(n()(),u["ɵeld"](0,null,null,1,"blog-post",[],null,null,null,o,p)),u["ɵdid"](114688,null,0,s.a,[],null,null)],function(n,t){n(t,1,0)},null)}e.d(t,"b",function(){return p}),t.a=o;var a=e(182),u=e(1),c=e(6),s=e(146),d=[a.a],p=u["ɵcrt"]({encapsulation:2,styles:d,data:{}});u["ɵccf"]("blog-post",s.a,i,{blogData:"blogData",minimizable:"minimizable",visible:"visible"},{},[])},185:function(n,t,e){"use strict";e.d(t,"a",function(){return a});var l=e(1),r=e(194),o=this&&this.__decorate||function(n,t,e,l){var r,o=arguments.length,i=o<3?t:null===l?l=Object.getOwnPropertyDescriptor(t,e):l;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)i=Reflect.decorate(n,t,e,l);else for(var a=n.length-1;a>=0;a--)(r=n[a])&&(i=(o<3?r(i):o>3?r(t,e,i):r(t,e))||i);return o>3&&i&&Object.defineProperty(t,e,i),i},i=this&&this.__metadata||function(n,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(n,t)},a=function(){function n(){this.id=0,this.auto=!1,this.projects=r.a.filter(function(n){return n.onBanner}),this.len=this.projects.length}return n.prototype.ngOnInit=function(){this.autoChange(6e3)},n.prototype.autoChange=function(n){var t=this;this.auto?this.change(this.id+1):this.auto=!0,setTimeout(function(){t.autoChange(5e3)},n)},n.prototype.change=function(n,t){void 0===t&&(t=!1),t&&(this.auto=!1),this.id=n<0?this.len-1:n%this.len},n}();a=o([e.i(l.Component)({selector:"banner",template:e(324),styles:[e(352)]}),i("design:paramtypes",[])],a)},194:function(n,t,e){"use strict";e.d(t,"a",function(){return l});var l=(function(){function n(){}}(),[{name:"Hangman",description:"Hangman mobile app for Android.",path:"projects/hangman",bannerUrl:"/images/banners/hangman-banner.jpg",iconUrl:"/images/icons/hangman-icon.jpg",onBanner:!0},{name:"Snow Machine",description:"Create all kinds of snow with Snow Machine!",path:"projects/snow-machine",bannerUrl:"/images/banners/snow-machine-banner.jpg",iconUrl:"/images/icons/snow-machine-icon.jpg",onBanner:!0},{name:"Chess",description:"Play a game of chess against a friend or a computer AI!",path:"projects/chess",bannerUrl:"/images/banners/chess-banner.jpg",iconUrl:"/images/icons/chess-icon.jpg",onBanner:!0},{name:"Slay the Dragon!",description:'Slay the dragon in the game "Slay the Dragon!"',path:"projects/slay-the-dragon",bannerUrl:"/images/banners/slay-the-dragon-banner.jpg",iconUrl:"/images/icons/slay-the-dragon-icon.jpg",onBanner:!0},{name:"Rock, Paper, Scissors",description:"Beat the computer in a very challenging game of Rock, Paper, Scissors.",path:"projects/rock-paper-scissors",bannerUrl:"/images/banners/rock-paper-scissors-banner.jpg",iconUrl:"/images/icons/rock-paper-scissors-icon.jpg",onBanner:!0}])},20:function(n,t,e){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),e.d(t,"HomeModuleNgFactory",function(){return f});var l=e(1),r=e(268),o=e(6),i=e(145),a=e(8),u=e(143),c=e(218),s=e(13),d=e(164),p=this&&this.__extends||function(){var n=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(n,t){n.__proto__=t}||function(n,t){for(var e in t)t.hasOwnProperty(e)&&(n[e]=t[e])};return function(t,e){function l(){this.constructor=t}n(t,e),t.prototype=null===e?Object.create(e):(l.prototype=e.prototype,new l)}}(),g=function(n){function t(t){return n.call(this,t,[c.a],[])||this}return p(t,n),Object.defineProperty(t.prototype,"_NgLocalization_5",{get:function(){return null==this.__NgLocalization_5&&(this.__NgLocalization_5=new o.a(this._LOCALE_ID_4)),this.__NgLocalization_5},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"_BlogsService_6",{get:function(){return null==this.__BlogsService_6&&(this.__BlogsService_6=new u.a(this.parent.get(s.k))),this.__BlogsService_6},enumerable:!0,configurable:!0}),t.prototype.createInternal=function(){return this._CommonModule_0=new o.b,this._SharedModule_1=new i.a,this._RouterModule_2=new a.q(this.parent.get(a.r,null),this.parent.get(a.j,null)),this._HomeModule_3=new r.a,this._LOCALE_ID_4="en-US",this._ROUTES_7=[[{path:"",component:d.a}]],this._HomeModule_3},t.prototype.getInternal=function(n,t){return n===o.b?this._CommonModule_0:n===i.a?this._SharedModule_1:n===a.q?this._RouterModule_2:n===r.a?this._HomeModule_3:n===l.LOCALE_ID?this._LOCALE_ID_4:n===o.g?this._NgLocalization_5:n===u.a?this._BlogsService_6:n===a.u?this._ROUTES_7:t},t.prototype.destroyInternal=function(){},t}(l["ɵNgModuleInjector"]),f=new l.NgModuleFactory(g,r.a)},215:function(n,t,e){"use strict";e.d(t,"a",function(){return l});var l=[".banner-container[_ngcontent-%COMP%] {\r\n  width: 100%;\r\n  height: 290px;\r\n  background: #5ac0f3;\r\n  border: 1px solid #1C2E3B;\r\n  box-sizing: border-box;\r\n  position: relative;\r\n  overflow: hidden; }\r\n\r\n.img-container[_ngcontent-%COMP%] {\r\n  height: 250px;\r\n  position: absolute;\r\n  left: 0;\r\n  transition: left 1.2s ease-in-out;\r\n  -webkit-transition: left 1.2s ease-in-out; }\r\n  .img-container[_ngcontent-%COMP%]   img[_ngcontent-%COMP%] {\r\n    height: 100%;\r\n    display: block;\r\n    float: left;\r\n    border: 0; }\r\n\r\n.button-container[_ngcontent-%COMP%] {\r\n  margin-top: 250px;\r\n  display: flex;\r\n  justify-content: center;\r\n  align-items: center;\r\n  border-top: 1px solid #1C2E3B;\r\n  text-align: center;\r\n  height: 40px; }\r\n\r\n.circle[_ngcontent-%COMP%] {\r\n  width: 20px;\r\n  height: 20px;\r\n  margin: 2px 5px;\r\n  border-radius: 50%;\r\n  border-color: #17537F;\r\n  background: white; }\r\n  .circle.active[_ngcontent-%COMP%] {\r\n    background: #2586CC; }\r\n\r\nbutton[_ngcontent-%COMP%] {\r\n  background: #5ac0f3;\r\n  text-decoration: none;\r\n  border: 2px solid #1C2E3B;\r\n  cursor: pointer; }\r\n  button[_ngcontent-%COMP%]:focus {\r\n    outline: none; }\r\n  button[_ngcontent-%COMP%]:hover {\r\n    background: #99d4ff; }\r\n\r\n.left[_ngcontent-%COMP%], .right[_ngcontent-%COMP%] {\r\n  width: 30px;\r\n  height: 30px;\r\n  background: #2586CC;\r\n  border: 2px solid #1C2E3B;\r\n  border-radius: 50%;\r\n  margin: 0 5px; }\r\n\r\n.left-arrow[_ngcontent-%COMP%] {\r\n  display: block;\r\n  border: 10px solid transparent;\r\n  border-right: 10px solid #000;\r\n  border-left: 0;\r\n  height: 0;\r\n  width: 0;\r\n  margin-right: 4px; }\r\n\r\n.right-arrow[_ngcontent-%COMP%] {\r\n  display: block;\r\n  border: 10px solid transparent;\r\n  border-left: 10px solid #000;\r\n  border-right: 0;\r\n  height: 0;\r\n  width: 0;\r\n  margin-left: 4px; }"]},216:function(n,t,e){"use strict";function l(n){return u["ɵvid"](0,[(n()(),u["ɵeld"](0,null,null,4,"a",[],[[8,"title",0],[1,"target",0],[8,"href",4]],[[null,"click"]],function(n,t,e){var l=!0;if("click"===t){l=!1!==u["ɵnov"](n,1).onClick(e.button,e.ctrlKey,e.metaKey)&&l}return l},null,null)),u["ɵdid"](671744,null,0,c.y,[c.j,c.v,s.f],{routerLink:[0,"routerLink"]},null),(n()(),u["ɵted"](null,["\n    "])),(n()(),u["ɵeld"](0,null,null,0,"img",[],[[8,"src",4],[8,"alt",0],[4,"width",null]],null,null,null,null)),(n()(),u["ɵted"](null,["\n  "]))],function(n,t){n(t,1,0,t.context.$implicit.path)},function(n,t){var e=t.component;n(t,0,0,t.context.$implicit.name,u["ɵnov"](t,1).target,u["ɵnov"](t,1).href),n(t,3,0,t.context.$implicit.bannerUrl,t.context.$implicit.name,100/e.projects.length+"%")})}function r(n){return u["ɵvid"](0,[(n()(),u["ɵeld"](0,null,null,0,"button",[["class","circle"]],[[2,"active",null]],[[null,"click"]],function(n,t,e){var l=!0,r=n.component;if("click"===t){l=!1!==r.change(n.context.index,!0)&&l}return l},null,null))],null,function(n,t){var e=t.component;n(t,0,0,t.context.index===e.id)})}function o(n){return u["ɵvid"](0,[(n()(),u["ɵeld"](0,null,null,19,"div",[["class","banner-container"]],null,null,null,null,null)),(n()(),u["ɵted"](null,["\n  "])),(n()(),u["ɵeld"](0,null,null,4,"div",[["class","img-container"]],[[4,"width",null],[4,"left",null]],null,null,null,null)),(n()(),u["ɵted"](null,["\n  "])),(n()(),u["ɵand"](16777216,null,null,1,null,l)),u["ɵdid"](802816,null,0,s.l,[u.ViewContainerRef,u.TemplateRef,u.IterableDiffers],{ngForOf:[0,"ngForOf"]},null),(n()(),u["ɵted"](null,["\n  "])),(n()(),u["ɵted"](null,["\n  "])),(n()(),u["ɵeld"](0,null,null,10,"div",[["class","button-container"]],null,null,null,null,null)),(n()(),u["ɵted"](null,["\n    "])),(n()(),u["ɵeld"](0,null,null,1,"button",[["class","left"]],null,[[null,"click"]],function(n,t,e){var l=!0,r=n.component;if("click"===t){l=!1!==r.change(r.id-1,!0)&&l}return l},null,null)),(n()(),u["ɵeld"](0,null,null,0,"span",[["class","left-arrow"]],null,null,null,null,null)),(n()(),u["ɵted"](null,["\n    "])),(n()(),u["ɵand"](16777216,null,null,1,null,r)),u["ɵdid"](802816,null,0,s.l,[u.ViewContainerRef,u.TemplateRef,u.IterableDiffers],{ngForOf:[0,"ngForOf"]},null),(n()(),u["ɵted"](null,["\n    "])),(n()(),u["ɵeld"](0,null,null,1,"button",[["class","right"]],null,[[null,"click"]],function(n,t,e){var l=!0,r=n.component;if("click"===t){l=!1!==r.change(r.id+1,!0)&&l}return l},null,null)),(n()(),u["ɵeld"](0,null,null,0,"span",[["class","right-arrow"]],null,null,null,null,null)),(n()(),u["ɵted"](null,["\n  "])),(n()(),u["ɵted"](null,["\n"]))],function(n,t){var e=t.component;n(t,5,0,e.projects),n(t,14,0,e.projects)},function(n,t){var e=t.component;n(t,2,0,100*e.projects.length+"%",-100*e.id+"%")})}function i(n){return u["ɵvid"](0,[(n()(),u["ɵeld"](0,null,null,1,"banner",[],null,null,null,o,g)),u["ɵdid"](114688,null,0,d.a,[],null,null)],function(n,t){n(t,1,0)},null)}e.d(t,"b",function(){return g}),t.a=o;var a=e(215),u=e(1),c=e(8),s=e(6),d=e(185),p=[a.a],g=u["ɵcrt"]({encapsulation:0,styles:p,data:{}});u["ɵccf"]("banner",d.a,i,{},{},[])},217:function(n,t,e){"use strict";e.d(t,"a",function(){return l});var l=["section[_ngcontent-%COMP%]:after {\r\n  content: '';\r\n  display: table;\r\n  clear: both; }\r\n\r\n[_nghost-%COMP%] {\r\n  min-width: 304px;\r\n  max-width: 1000px;\r\n  margin: auto;\r\n  width: 100%;\r\n  display: block; }\r\n\r\naside[_ngcontent-%COMP%] {\r\n  background: #5ac0f3;\r\n  border: 2px solid #1C2E3B;\r\n  padding: 5px;\r\n  box-sizing: border-box; }\r\n\r\nsection[_ngcontent-%COMP%] {\r\n  width: 100%;\r\n  box-sizing: border-box;\r\n  margin: auto; }\r\n\r\n.main-content[_ngcontent-%COMP%] {\r\n  box-sizing: border-box;\r\n  width: 65%;\r\n  float: left; }\r\n\r\naside[_ngcontent-%COMP%] {\r\n  box-sizing: border-box;\r\n  width: 33%;\r\n  float: right;\r\n  margin-right: 0px;\r\n  padding: 10px; }\r\n\r\n@media screen and (max-width: 600px) {\r\n  .main-content[_ngcontent-%COMP%], aside[_ngcontent-%COMP%] {\r\n    width: 100%;\r\n    float: none;\r\n    margin-left: 0px; }\r\n\r\n  aside[_ngcontent-%COMP%] {\r\n    margin-top: 8px; } }"]},218:function(n,t,e){"use strict";function l(n){return u["ɵvid"](0,[(n()(),u["ɵeld"](0,null,null,1,"blog-post",[],null,null,null,c.a,c.b)),u["ɵdid"](114688,null,0,s.a,[],{blogData:[0,"blogData"],visible:[1,"visible"]},null)],function(n,t){n(t,1,0,t.component.blog,!0)},null)}function r(n){return u["ɵvid"](0,[(n()(),u["ɵeld"](0,null,null,1,"div",[],null,null,null,null,null)),(n()(),u["ɵted"](null,["Loading blog..."]))],null,null)}function o(n){return u["ɵvid"](0,[(n()(),u["ɵeld"](0,null,null,30,"section",[],null,null,null,null,null)),(n()(),u["ɵted"](null,["\n  "])),(n()(),u["ɵeld"](0,null,null,16,"div",[["class","main-content"]],null,null,null,null,null)),(n()(),u["ɵted"](null,["\n    "])),(n()(),u["ɵeld"](0,null,null,1,"h1",[],null,null,null,null,null)),(n()(),u["ɵted"](null,["Projects"])),(n()(),u["ɵted"](null,["\n    "])),(n()(),u["ɵeld"](0,null,null,1,"banner",[],null,null,null,d.a,d.b)),u["ɵdid"](114688,null,0,p.a,[],null,null),(n()(),u["ɵted"](null,["\n    "])),(n()(),u["ɵeld"](0,null,null,1,"h1",[],null,null,null,null,null)),(n()(),u["ɵted"](null,["Newest blog"])),(n()(),u["ɵted"](null,["\n    "])),(n()(),u["ɵand"](16777216,null,null,1,null,l)),u["ɵdid"](16384,null,0,g.m,[u.ViewContainerRef,u.TemplateRef],{ngIf:[0,"ngIf"]},null),(n()(),u["ɵted"](null,["\n    "])),(n()(),u["ɵand"](16777216,null,null,1,null,r)),u["ɵdid"](16384,null,0,g.m,[u.ViewContainerRef,u.TemplateRef],{ngIf:[0,"ngIf"]},null),(n()(),u["ɵted"](null,["\n  "])),(n()(),u["ɵted"](null,["\n  "])),(n()(),u["ɵeld"](0,null,null,9,"aside",[],null,null,null,null,null)),(n()(),u["ɵted"](null,["\n    "])),(n()(),u["ɵeld"](0,null,null,1,"h1",[],null,null,null,null,null)),(n()(),u["ɵted"](null,["Welcome!"])),(n()(),u["ɵted"](null,["\n    Hello and welcome to my website! This website is intended for my personal coding projects, which may include games and other random stuff. Feel free to test them out and leave feedback in the comments! \n    "])),(n()(),u["ɵeld"](0,null,null,0,"br",[],null,null,null,null,null)),(n()(),u["ɵted"](null,["\n    "])),(n()(),u["ɵeld"](0,null,null,1,"h1",[],null,null,null,null,null)),(n()(),u["ɵted"](null,["About me:"])),(n()(),u["ɵted"](null,["\n    I'm a 20-year-old Finnish university student, with a huge passion for coding. At the moment I have experience in HTML, Javascript, PHP, Scala, Python and C++.\n  "])),(n()(),u["ɵted"](null,["\n"]))],function(n,t){var e=t.component;n(t,8,0),n(t,14,0,null!=e.blog),n(t,17,0,null==e.blog)},null)}function i(n){return u["ɵvid"](0,[(n()(),u["ɵeld"](0,null,null,1,"ng-component",[],null,null,null,o,m)),u["ɵdid"](114688,null,0,f.a,[b.a],null,null)],function(n,t){n(t,1,0)},null)}e.d(t,"a",function(){return x});var a=e(217),u=e(1),c=e(183),s=e(146),d=e(216),p=e(185),g=e(6),f=e(164),b=e(143),h=[a.a],m=u["ɵcrt"]({encapsulation:0,styles:h,data:{}}),x=u["ɵccf"]("ng-component",f.a,i,{},{},[])},268:function(n,t,e){"use strict";e.d(t,"a",function(){return s});var l=e(1),r=e(6),o=e(145),i=e(164),a=e(185),u=e(269),c=this&&this.__decorate||function(n,t,e,l){var r,o=arguments.length,i=o<3?t:null===l?l=Object.getOwnPropertyDescriptor(t,e):l;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)i=Reflect.decorate(n,t,e,l);else for(var a=n.length-1;a>=0;a--)(r=n[a])&&(i=(o<3?r(i):o>3?r(t,e,i):r(t,e))||i);return o>3&&i&&Object.defineProperty(t,e,i),i},s=function(){function n(){}return n}();s=c([e.i(l.NgModule)({imports:[r.b,o.a,u.a],exports:[],declarations:[i.a,a.a],providers:[]})],s)},269:function(n,t,e){"use strict";e.d(t,"a",function(){return i});var l=e(8),r=e(164),o=[{path:"",component:r.a}],i=l.q.forChild(o)},297:function(n,t,e){t=n.exports=e(12)(),t.push([n.i,".banner-container{width:100%;height:290px;background:#5ac0f3;border:1px solid #1c2e3b;box-sizing:border-box;position:relative;overflow:hidden}.img-container{height:250px;position:absolute;left:0;transition:left 1.2s ease-in-out;-webkit-transition:left 1.2s ease-in-out}.img-container img{height:100%;display:block;float:left;border:0}.button-container{margin-top:250px;display:flex;justify-content:center;align-items:center;border-top:1px solid #1c2e3b;text-align:center;height:40px}.circle{width:20px;height:20px;margin:2px 5px;border-radius:50%;border-color:#17537f;background:#fff}.circle.active{background:#2586cc}button{background:#5ac0f3;text-decoration:none;border:2px solid #1c2e3b;cursor:pointer}button:focus{outline:none}button:hover{background:#99d4ff}.left,.right{width:30px;height:30px;background:#2586cc;border:2px solid #1c2e3b;border-radius:50%;margin:0 5px}.left-arrow{border:10px solid transparent;border-right:10px solid #000;border-left:0;margin-right:4px}.left-arrow,.right-arrow{display:block;height:0;width:0}.right-arrow{border:10px solid transparent;border-left:10px solid #000;border-right:0;margin-left:4px}",""])},298:function(n,t,e){t=n.exports=e(12)(),t.push([n.i,'section:after{content:"";display:table;clear:both}:host{min-width:304px;max-width:1000px;margin:auto;width:100%;display:block}aside{background:#5ac0f3;border:2px solid #1c2e3b;padding:5px}section{width:100%;box-sizing:border-box;margin:auto}.main-content{width:65%;float:left}.main-content,aside{box-sizing:border-box}aside{width:33%;float:right;margin-right:0;padding:10px}@media screen and (max-width:600px){.main-content,aside{width:100%;float:none;margin-left:0}aside{margin-top:8px}}',""])},324:function(n,t){n.exports='<div class=\'banner-container\'>\r\n  <div class=\'img-container\' [style.width]="projects.length * 100 + \'%\'" [style.left]="id * -100 + \'%\'">\r\n  <a *ngFor="let project of projects" [routerLink]="project.path" [title]="project.name">\r\n    <img [src]="project.bannerUrl" [alt]="project.name" [style.width]="100 / projects.length + \'%\'">\r\n  </a>\r\n  </div>\r\n  <div class=\'button-container\'>\r\n    <button class=\'left\' (click)="change(this.id-1, true)"><span class=\'left-arrow\'></span></button>\r\n    <button class=\'circle\' *ngFor="let project of projects; let i = index" [class.active]="i === id" (click)="change(i, true)"></button>\r\n    <button class=\'right\' (click)="change(this.id+1, true)"><span class=\'right-arrow\'></span></button>\r\n  </div>\r\n</div>'},325:function(n,t){n.exports='<section>\r\n  <div class="main-content">\r\n    <h1>Projects</h1>\r\n    <banner></banner>\r\n    <h1>Newest blog</h1>\r\n    <blog-post *ngIf="blog != null" [blogData]="blog" [visible]="true"></blog-post>\r\n    <div *ngIf="blog == null">Loading blog...</div>\r\n  </div>\r\n  <aside>\r\n    <h1>Welcome!</h1>\r\n    Hello and welcome to my website! This website is intended for my personal coding projects, which may include games and other random stuff. Feel free to test them out and leave feedback in the comments! \r\n    <br>\r\n    <h1>About me:</h1>\r\n    I\'m a 20-year-old Finnish university student, with a huge passion for coding. At the moment I have experience in HTML, Javascript, PHP, Scala, Python and C++.\r\n  </aside>\r\n</section>'},352:function(n,t,e){var l=e(297);n.exports="string"==typeof l?l:l.toString()},353:function(n,t,e){var l=e(298);n.exports="string"==typeof l?l:l.toString()}});