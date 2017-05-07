webpackJsonp([9],{276:function(n,t,e){"use strict";var l=e(0),o=e(27),r=e(22),i=(e.n(r),e(155));e.n(i);e.d(t,"a",function(){return s});var a=this&&this.__decorate||function(n,t,e,l){var o,r=arguments.length,i=r<3?t:null===l?l=Object.getOwnPropertyDescriptor(t,e):l;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)i=Reflect.decorate(n,t,e,l);else for(var a=n.length-1;a>=0;a--)(o=n[a])&&(i=(r<3?o(i):r>3?o(t,e,i):o(t,e))||i);return r>3&&i&&Object.defineProperty(t,e,i),i},u=this&&this.__metadata||function(n,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(n,t)},s=function(){function n(n){this.http=n,this.url="http://voyacode.com/php/blogs.php"}return n.prototype.getBlogs=function(n){return void 0===n&&(n=0),this.http.get(this.url+(n?"?limit="+n:"")).map(function(n){return n.json().data||[{id:0,name:"Blog search failed.",text:"Sorry, something went wrong. If this problem persists, report to the admin through comments page.",date:"",year:0}]}).catch(function(n){return[[{id:0,name:"Blog search failed.",text:"Sorry, something went wrong and blog couldn't be fetched from the server. Check your internet connection and refresh the page.<br><br>If problem persists, report to the admin through comments page.",date:"",year:0}]]})},n}();s=a([e.i(l.Injectable)(),u("design:paramtypes",[o.k])],s)},277:function(n,t,e){"use strict";var l=e(0);e.d(t,"a",function(){return r});var o=this&&this.__decorate||function(n,t,e,l){var o,r=arguments.length,i=r<3?t:null===l?l=Object.getOwnPropertyDescriptor(t,e):l;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)i=Reflect.decorate(n,t,e,l);else for(var a=n.length-1;a>=0;a--)(o=n[a])&&(i=(r<3?o(i):r>3?o(t,e,i):o(t,e))||i);return r>3&&i&&Object.defineProperty(t,e,i),i},r=function(){function n(){}return n}();r=o([e.i(l.Component)({selector:"description-box",template:e(285),styles:[e(287)]})],r)},278:function(n,t,e){"use strict";var l=e(0),o=e(3),r=e(279),i=e(276),a=e(277);e.d(t,"a",function(){return s});var u=this&&this.__decorate||function(n,t,e,l){var o,r=arguments.length,i=r<3?t:null===l?l=Object.getOwnPropertyDescriptor(t,e):l;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)i=Reflect.decorate(n,t,e,l);else for(var a=n.length-1;a>=0;a--)(o=n[a])&&(i=(r<3?o(i):r>3?o(t,e,i):o(t,e))||i);return r>3&&i&&Object.defineProperty(t,e,i),i},s=function(){function n(){}return n}();s=u([e.i(l.NgModule)({imports:[o.CommonModule],exports:[r.a,a.a],declarations:[r.a,a.a],providers:[i.a]})],s)},279:function(n,t,e){"use strict";var l=e(0);e.d(t,"a",function(){return i});var o=this&&this.__decorate||function(n,t,e,l){var o,r=arguments.length,i=r<3?t:null===l?l=Object.getOwnPropertyDescriptor(t,e):l;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)i=Reflect.decorate(n,t,e,l);else for(var a=n.length-1;a>=0;a--)(o=n[a])&&(i=(r<3?o(i):r>3?o(t,e,i):o(t,e))||i);return r>3&&i&&Object.defineProperty(t,e,i),i},r=this&&this.__metadata||function(n,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(n,t)},i=function(){function n(){this.minimizable=!1,this.visible=!1}return n.prototype.ngOnInit=function(){},n.prototype.toggle=function(n){void 0===n&&(n=!this.visible),this.visible=n},n}();o([e.i(l.Input)(),r("design:type",Object)],i.prototype,"blogData",void 0),o([e.i(l.Input)(),r("design:type",Boolean)],i.prototype,"minimizable",void 0),o([e.i(l.Input)(),r("design:type",Boolean)],i.prototype,"visible",void 0),i=o([e.i(l.Component)({selector:"blog-post",template:e(284),styles:[e(286)],encapsulation:l.ViewEncapsulation.None}),r("design:paramtypes",[])],i)},282:function(n,t,e){t=n.exports=e(26)(),t.push([n.i,"blog-post table{background:#5ac0f3;border:2px solid #1c2e3b;padding:5px;box-sizing:border-box}blog-post .blog-header button{background:#2586cc;border:1px solid #1c2e3b;cursor:pointer}blog-post .blog-header button:focus{outline:none}blog-post .blog-header button:hover{background:#99d4ff}blog-post{display:block}blog-post table{padding:10px;width:100%;max-width:100%;margin:0}blog-post .blog-header button{float:right;width:24px;height:24px;font-size:20px;text-align:center;padding:0;line-height:1}blog-post .blog-date{font-size:75%;font-weight:400}blog-post .blog-text{border-top:1px solid #1c2e3b;padding-top:5px}blog-post img{max-width:100%}",""])},283:function(n,t,e){t=n.exports=e(26)(),t.push([n.i,":host,div{display:block}div{margin:0;margin-top:15px;box-sizing:border-box;width:100%;background:#5ac0f3;border:2px solid #1c2e3b;padding:10px}",""])},284:function(n,t){n.exports="<table>\r\n  <tr>\r\n    <th class='blog-header'>\r\n      {{blogData?.name}}\r\n      <button *ngIf=\"minimizable\" class='minimize-button' [title]=\"visible ? 'Close' : 'Open'\" (click)=\"toggle()\">{{visible ? '‒' : '+'}}</button>\r\n      <br><span class='blog-date'>{{blogData?.date}}</span>      \r\n    </th>\r\n  </tr>\r\n  <tr *ngIf=\"visible\">\r\n    <td class='blog-text' [innerHtml]=\"blogData?.text\"></td>\r\n  </tr>\r\n</table>"},285:function(n,t){n.exports='<div class="description-box">\r\n  <h1>Description:</h1>\r\n  <ng-content></ng-content>\r\n</div>'},286:function(n,t,e){var l=e(282);n.exports="string"==typeof l?l:l.toString()},287:function(n,t,e){var l=e(283);n.exports="string"==typeof l?l:l.toString()},289:function(n,t,e){"use strict";e.d(t,"a",function(){return l});var l=["[_nghost-%COMP%] {\r\n  display: block; }\r\n\r\ndiv[_ngcontent-%COMP%] {\r\n  margin: 0px;\r\n  margin-top: 15px;\r\n  box-sizing: border-box;\r\n  width: 100%;\r\n  background: #5ac0f3;\r\n  border: 2px solid #1C2E3B;\r\n  padding: 10px;\r\n  display: block; }"]},290:function(n,t,e){"use strict";function l(n){return i["ɵvid"](0,[(n()(),i["ɵeld"](0,null,null,6,"div",[["class","description-box"]],null,null,null,null,null)),(n()(),i["ɵted"](null,["\n  "])),(n()(),i["ɵeld"](0,null,null,1,"h1",[],null,null,null,null,null)),(n()(),i["ɵted"](null,["Description:"])),(n()(),i["ɵted"](null,["\n  "])),i["ɵncd"](null,0),(n()(),i["ɵted"](null,["\n"]))],null,null)}function o(n){return i["ɵvid"](0,[(n()(),i["ɵeld"](0,null,null,1,"description-box",[],null,null,null,l,s)),i["ɵdid"](24576,null,0,a.a,[],null,null)],null,null)}var r=e(289),i=e(0),a=e(277);e.d(t,"b",function(){return s}),t.a=l;var u=[r.a],s=i["ɵcrt"]({encapsulation:0,styles:u,data:{}});i["ɵccf"]("description-box",a.a,o,{},{},["*"])},301:function(n,t,e){"use strict";var l=e(0);e.d(t,"a",function(){return i});var o=this&&this.__decorate||function(n,t,e,l){var o,r=arguments.length,i=r<3?t:null===l?l=Object.getOwnPropertyDescriptor(t,e):l;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)i=Reflect.decorate(n,t,e,l);else for(var a=n.length-1;a>=0;a--)(o=n[a])&&(i=(r<3?o(i):r>3?o(t,e,i):o(t,e))||i);return r>3&&i&&Object.defineProperty(t,e,i),i},r=this&&this.__metadata||function(n,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(n,t)},i=function(){function n(){}return n.prototype.ngOnInit=function(){},n}();i=o([e.i(l.Component)({template:e(467),styles:[e(495)]}),r("design:paramtypes",[])],i)},332:function(n,t,e){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var l=e(0),o=e(414),r=e(21),i=e(3),a=e(278),u=e(276),s=e(369),c=e(27),d=e(301);e.d(t,"HangmanModuleNgFactory",function(){return f});var g=this&&this.__extends||function(){var n=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(n,t){n.__proto__=t}||function(n,t){for(var e in t)t.hasOwnProperty(e)&&(n[e]=t[e])};return function(t,e){function l(){this.constructor=t}n(t,e),t.prototype=null===e?Object.create(e):(l.prototype=e.prototype,new l)}}(),p=function(n){function t(t){return n.call(this,t,[s.a],[])||this}return g(t,n),Object.defineProperty(t.prototype,"_NgLocalization_5",{get:function(){return null==this.__NgLocalization_5&&(this.__NgLocalization_5=new i.NgLocaleLocalization(this._LOCALE_ID_4)),this.__NgLocalization_5},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"_BlogsService_6",{get:function(){return null==this.__BlogsService_6&&(this.__BlogsService_6=new u.a(this.parent.get(c.k))),this.__BlogsService_6},enumerable:!0,configurable:!0}),t.prototype.createInternal=function(){return this._RouterModule_0=new r.q(this.parent.get(r.r,null),this.parent.get(r.j,null)),this._CommonModule_1=new i.CommonModule,this._SharedModule_2=new a.a,this._HangmanModule_3=new o.a,this._LOCALE_ID_4="en-US",this._ROUTES_7=[[{path:"",component:d.a}]],this._HangmanModule_3},t.prototype.getInternal=function(n,t){return n===r.q?this._RouterModule_0:n===i.CommonModule?this._CommonModule_1:n===a.a?this._SharedModule_2:n===o.a?this._HangmanModule_3:n===l.LOCALE_ID?this._LOCALE_ID_4:n===i.NgLocalization?this._NgLocalization_5:n===u.a?this._BlogsService_6:n===r.u?this._ROUTES_7:t},t.prototype.destroyInternal=function(){},t}(l["ɵNgModuleInjector"]),f=new l.NgModuleFactory(p,o.a)},368:function(n,t,e){"use strict";e.d(t,"a",function(){return l});var l=["[_nghost-%COMP%] {\r\n  min-width: 304px;\r\n  max-width: 1000px;\r\n  margin: auto;\r\n  width: 100%;\r\n  display: block; }\r\n\r\nh1[_ngcontent-%COMP%] {\r\n  text-align: center; }\r\n\r\n.game_images[_ngcontent-%COMP%]   img[_ngcontent-%COMP%] {\r\n  width: 24%; }\r\n\r\n.google_badge[_ngcontent-%COMP%]   img[_ngcontent-%COMP%] {\r\n  width: 240px; }"]},369:function(n,t,e){"use strict";function l(n){return i["ɵvid"](0,[(n()(),i["ɵeld"](0,null,null,1,"h1",[],null,null,null,null,null)),(n()(),i["ɵted"](null,["Hangman"])),(n()(),i["ɵted"](null,["\n\n"])),(n()(),i["ɵeld"](0,null,null,9,"div",[["class","game_images"]],null,null,null,null,null)),(n()(),i["ɵted"](null,["\n  "])),(n()(),i["ɵeld"](0,null,null,0,"img",[["src","images/hangman/hangman1.png"]],null,null,null,null,null)),(n()(),i["ɵted"](null,["\n  "])),(n()(),i["ɵeld"](0,null,null,0,"img",[["src","images/hangman/hangman2.png"]],null,null,null,null,null)),(n()(),i["ɵted"](null,["\n  "])),(n()(),i["ɵeld"](0,null,null,0,"img",[["src","images/hangman/statistics.png"]],null,null,null,null,null)),(n()(),i["ɵted"](null,["\n  "])),(n()(),i["ɵeld"](0,null,null,0,"img",[["src","images/hangman/settings.png"]],null,null,null,null,null)),(n()(),i["ɵted"](null,["\n"])),(n()(),i["ɵted"](null,["\n\n"])),(n()(),i["ɵeld"](0,null,null,3,"a",[["class","google_badge"],["href","https://play.google.com/store/apps/details?id=com.voyacode.hangman&pcampaignid=MKT-Other-global-all-co-prtnr-py-PartBadge-Mar2515-1"]],null,null,null,null,null)),(n()(),i["ɵted"](null,["\n  "])),(n()(),i["ɵeld"](0,null,null,0,"img",[["alt","Get it on Google Play"],["src","images/hangman/google-play-badge.png"]],null,null,null,null,null)),(n()(),i["ɵted"](null,["\n"])),(n()(),i["ɵted"](null,["\n\n"])),(n()(),i["ɵeld"](0,null,null,31,"description-box",[],null,null,null,a.a,a.b)),i["ɵdid"](24576,null,0,u.a,[],null,null),(n()(),i["ɵted"](0,["\n  Hangman is a simple game where you need to guess characters in order to guess a word before the stick figure is hung. The app is available on Google Play for free. More info on the project can be found on "])),(n()(),i["ɵeld"](0,null,0,1,"a",[["href","https://github.com/Voya100/Hangman"]],null,null,null,null,null)),(n()(),i["ɵted"](null,["Github"])),(n()(),i["ɵted"](0,[".\n  "])),(n()(),i["ɵeld"](0,null,0,0,"br",[],null,null,null,null,null)),(n()(),i["ɵeld"](0,null,0,0,"br",[],null,null,null,null,null)),(n()(),i["ɵted"](0,["\n  Full list of features:\n  "])),(n()(),i["ɵeld"](0,null,0,0,"br",[],null,null,null,null,null)),(n()(),i["ɵted"](0,["- Support for several languages\n  "])),(n()(),i["ɵeld"](0,null,0,0,"br",[],null,null,null,null,null)),(n()(),i["ɵted"](0,["- 4000+ English words in online mode, 500 words in offline mode\n  "])),(n()(),i["ɵeld"](0,null,0,0,"br",[],null,null,null,null,null)),(n()(),i["ɵted"](0,["- 400 Finnish words\n  "])),(n()(),i["ɵeld"](0,null,0,0,"br",[],null,null,null,null,null)),(n()(),i["ɵted"](0,["- 250 Swedish words\n  "])),(n()(),i["ɵeld"](0,null,0,0,"br",[],null,null,null,null,null)),(n()(),i["ɵted"](0,["- Statistics showing games, wins and losses\n  "])),(n()(),i["ɵeld"](0,null,0,0,"br",[],null,null,null,null,null)),(n()(),i["ɵted"](0,["- Settings with options to change app language, dictionary, difficulty and online setting\n  "])),(n()(),i["ɵeld"](0,null,0,0,"br",[],null,null,null,null,null)),(n()(),i["ɵted"](0,["- Story that finally explains why you would want to guess words while someone is being hanged\n  "])),(n()(),i["ɵeld"](0,null,0,0,"br",[],null,null,null,null,null)),(n()(),i["ɵted"](0,["- Scaling interface\n  "])),(n()(),i["ɵeld"](0,null,0,0,"br",[],null,null,null,null,null)),(n()(),i["ɵted"](0,["- Navigation with icons, swiping left/right and back button \n  "])),(n()(),i["ɵeld"](0,null,0,0,"br",[],null,null,null,null,null)),(n()(),i["ɵeld"](0,null,0,0,"br",[],null,null,null,null,null)),(n()(),i["ɵeld"](0,null,0,1,"i",[],null,null,null,null,null)),(n()(),i["ɵted"](null,["Google Play and the Google Play logo are trademarks of Google Inc."])),(n()(),i["ɵted"](0,["\n"]))],null,null)}function o(n){return i["ɵvid"](0,[(n()(),i["ɵeld"](0,null,null,1,"ng-component",[],null,null,null,l,d)),i["ɵdid"](57344,null,0,s.a,[],null,null)],function(n,t){n(t,1,0)},null)}var r=e(368),i=e(0),a=e(290),u=e(277),s=e(301);e.d(t,"a",function(){return g});var c=[r.a],d=i["ɵcrt"]({encapsulation:0,styles:c,data:{}}),g=i["ɵccf"]("ng-component",s.a,o,{},{},[])},414:function(n,t,e){"use strict";var l=e(0),o=e(278),r=e(301),i=e(415);e.d(t,"a",function(){return u});var a=this&&this.__decorate||function(n,t,e,l){var o,r=arguments.length,i=r<3?t:null===l?l=Object.getOwnPropertyDescriptor(t,e):l;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)i=Reflect.decorate(n,t,e,l);else for(var a=n.length-1;a>=0;a--)(o=n[a])&&(i=(r<3?o(i):r>3?o(t,e,i):o(t,e))||i);return r>3&&i&&Object.defineProperty(t,e,i),i},u=function(){function n(){}return n}();u=a([e.i(l.NgModule)({imports:[i.a,o.a],exports:[],declarations:[r.a],providers:[]})],u)},415:function(n,t,e){"use strict";var l=e(21),o=e(301);e.d(t,"a",function(){return i});var r=[{path:"",component:o.a}],i=l.q.forChild(r)},440:function(n,t,e){t=n.exports=e(26)(),t.push([n.i,":host{min-width:304px;max-width:1000px;margin:auto;width:100%;display:block}h1{text-align:center}.game_images img{width:24%}.google_badge img{width:240px}",""])},467:function(n,t){n.exports="<h1>Hangman</h1>\r\n\r\n<div class='game_images'>\r\n  <img src='images/hangman/hangman1.png'>\r\n  <img src='images/hangman/hangman2.png'>\r\n  <img src='images/hangman/statistics.png'>\r\n  <img src='images/hangman/settings.png'>\r\n</div>\r\n\r\n<a class='google_badge' href='https://play.google.com/store/apps/details?id=com.voyacode.hangman&pcampaignid=MKT-Other-global-all-co-prtnr-py-PartBadge-Mar2515-1'>\r\n  <img alt='Get it on Google Play' src='images/hangman/google-play-badge.png'/>\r\n</a>\r\n\r\n<description-box>\r\n  Hangman is a simple game where you need to guess characters in order to guess a word before the stick figure is hung. The app is available on Google Play for free. More info on the project can be found on <a href='https://github.com/Voya100/Hangman'>Github</a>.\r\n  <br><br>\r\n  Full list of features:\r\n  <br>- Support for several languages\r\n  <br>- 4000+ English words in online mode, 500 words in offline mode\r\n  <br>- 400 Finnish words\r\n  <br>- 250 Swedish words\r\n  <br>- Statistics showing games, wins and losses\r\n  <br>- Settings with options to change app language, dictionary, difficulty and online setting\r\n  <br>- Story that finally explains why you would want to guess words while someone is being hanged\r\n  <br>- Scaling interface\r\n  <br>- Navigation with icons, swiping left/right and back button \r\n  <br><br><i>Google Play and the Google Play logo are trademarks of Google Inc.</i>\r\n</description-box>"},495:function(n,t,e){var l=e(440);n.exports="string"==typeof l?l:l.toString()}});