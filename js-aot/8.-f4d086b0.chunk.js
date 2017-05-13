webpackJsonp([8],{276:function(t,e,n){"use strict";var o=n(0),l=n(27),r=n(22),i=(n.n(r),n(155));n.n(i);n.d(e,"a",function(){return c});var a=this&&this.__decorate||function(t,e,n,o){var l,r=arguments.length,i=r<3?e:null===o?o=Object.getOwnPropertyDescriptor(e,n):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)i=Reflect.decorate(t,e,n,o);else for(var a=t.length-1;a>=0;a--)(l=t[a])&&(i=(r<3?l(i):r>3?l(e,n,i):l(e,n))||i);return r>3&&i&&Object.defineProperty(e,n,i),i},u=this&&this.__metadata||function(t,e){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(t,e)},c=function(){function t(t){this.http=t,this.url="http://voyacode.com/php/blogs.php"}return t.prototype.getBlogs=function(t){return void 0===t&&(t=0),this.http.get(this.url+(t?"?limit="+t:"")).map(function(t){return t.json().data||[{id:0,name:"Blog search failed.",text:"Sorry, something went wrong. If this problem persists, report to the admin through comments page.",date:"",year:0}]}).catch(function(t){return[[{id:0,name:"Blog search failed.",text:"Sorry, something went wrong and blog couldn't be fetched from the server. Check your internet connection and refresh the page.<br><br>If problem persists, report to the admin through comments page.",date:"",year:0}]]})},t}();c=a([n.i(o.Injectable)(),u("design:paramtypes",[l.k])],c)},277:function(t,e,n){"use strict";var o=n(0);n.d(e,"a",function(){return r});var l=this&&this.__decorate||function(t,e,n,o){var l,r=arguments.length,i=r<3?e:null===o?o=Object.getOwnPropertyDescriptor(e,n):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)i=Reflect.decorate(t,e,n,o);else for(var a=t.length-1;a>=0;a--)(l=t[a])&&(i=(r<3?l(i):r>3?l(e,n,i):l(e,n))||i);return r>3&&i&&Object.defineProperty(e,n,i),i},r=function(){function t(){}return t}();r=l([n.i(o.Component)({selector:"description-box",template:n(285),styles:[n(287)]})],r)},278:function(t,e,n){"use strict";var o=n(0),l=n(3),r=n(279),i=n(276),a=n(277);n.d(e,"a",function(){return c});var u=this&&this.__decorate||function(t,e,n,o){var l,r=arguments.length,i=r<3?e:null===o?o=Object.getOwnPropertyDescriptor(e,n):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)i=Reflect.decorate(t,e,n,o);else for(var a=t.length-1;a>=0;a--)(l=t[a])&&(i=(r<3?l(i):r>3?l(e,n,i):l(e,n))||i);return r>3&&i&&Object.defineProperty(e,n,i),i},c=function(){function t(){}return t}();c=u([n.i(o.NgModule)({imports:[l.CommonModule],exports:[r.a,a.a],declarations:[r.a,a.a],providers:[i.a]})],c)},279:function(t,e,n){"use strict";var o=n(0);n.d(e,"a",function(){return i});var l=this&&this.__decorate||function(t,e,n,o){var l,r=arguments.length,i=r<3?e:null===o?o=Object.getOwnPropertyDescriptor(e,n):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)i=Reflect.decorate(t,e,n,o);else for(var a=t.length-1;a>=0;a--)(l=t[a])&&(i=(r<3?l(i):r>3?l(e,n,i):l(e,n))||i);return r>3&&i&&Object.defineProperty(e,n,i),i},r=this&&this.__metadata||function(t,e){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(t,e)},i=function(){function t(){this.minimizable=!1,this.visible=!1}return t.prototype.ngOnInit=function(){},t.prototype.toggle=function(t){void 0===t&&(t=!this.visible),this.visible=t},t}();l([n.i(o.Input)(),r("design:type",Object)],i.prototype,"blogData",void 0),l([n.i(o.Input)(),r("design:type",Boolean)],i.prototype,"minimizable",void 0),l([n.i(o.Input)(),r("design:type",Boolean)],i.prototype,"visible",void 0),i=l([n.i(o.Component)({selector:"blog-post",template:n(284),styles:[n(286)],encapsulation:o.ViewEncapsulation.None}),r("design:paramtypes",[])],i)},282:function(t,e,n){e=t.exports=n(26)(),e.push([t.i,"blog-post table{background:#5ac0f3;border:2px solid #1c2e3b;padding:5px;box-sizing:border-box}blog-post .blog-header button{background:#2586cc;border:1px solid #1c2e3b;cursor:pointer}blog-post .blog-header button:focus{outline:none}blog-post .blog-header button:hover{background:#99d4ff}blog-post{display:block}blog-post table{padding:10px;width:100%;max-width:100%;margin:0}blog-post .blog-header button{float:right;width:24px;height:24px;font-size:20px;text-align:center;padding:0;line-height:1}blog-post .blog-date{font-size:75%;font-weight:400}blog-post .blog-text{border-top:1px solid #1c2e3b;padding-top:5px}blog-post img{max-width:100%}",""])},283:function(t,e,n){e=t.exports=n(26)(),e.push([t.i,":host,div{display:block}div{margin:0;margin-top:15px;box-sizing:border-box;width:100%;background:#5ac0f3;border:2px solid #1c2e3b;padding:10px}",""])},284:function(t,e){t.exports="<table>\r\n  <tr>\r\n    <th class='blog-header'>\r\n      {{blogData?.name}}\r\n      <button *ngIf=\"minimizable\" class='minimize-button' [title]=\"visible ? 'Close' : 'Open'\" (click)=\"toggle()\">{{visible ? '‒' : '+'}}</button>\r\n      <br><span class='blog-date'>{{blogData?.date}}</span>      \r\n    </th>\r\n  </tr>\r\n  <tr *ngIf=\"visible\">\r\n    <td class='blog-text' [innerHtml]=\"blogData?.text\"></td>\r\n  </tr>\r\n</table>"},285:function(t,e){t.exports='<div class="description-box">\r\n  <h1>Description:</h1>\r\n  <ng-content></ng-content>\r\n</div>'},286:function(t,e,n){var o=n(282);t.exports="string"==typeof o?o:o.toString()},287:function(t,e,n){var o=n(283);t.exports="string"==typeof o?o:o.toString()},289:function(t,e,n){"use strict";n.d(e,"a",function(){return o});var o=["[_nghost-%COMP%] {\r\n  display: block; }\r\n\r\ndiv[_ngcontent-%COMP%] {\r\n  margin: 0px;\r\n  margin-top: 15px;\r\n  box-sizing: border-box;\r\n  width: 100%;\r\n  background: #5ac0f3;\r\n  border: 2px solid #1C2E3B;\r\n  padding: 10px;\r\n  display: block; }"]},290:function(t,e,n){"use strict";function o(t){return i["ɵvid"](0,[(t()(),i["ɵeld"](0,null,null,6,"div",[["class","description-box"]],null,null,null,null,null)),(t()(),i["ɵted"](null,["\n  "])),(t()(),i["ɵeld"](0,null,null,1,"h1",[],null,null,null,null,null)),(t()(),i["ɵted"](null,["Description:"])),(t()(),i["ɵted"](null,["\n  "])),i["ɵncd"](null,0),(t()(),i["ɵted"](null,["\n"]))],null,null)}function l(t){return i["ɵvid"](0,[(t()(),i["ɵeld"](0,null,null,1,"description-box",[],null,null,null,o,c)),i["ɵdid"](24576,null,0,a.a,[],null,null)],null,null)}var r=n(289),i=n(0),a=n(277);n.d(e,"b",function(){return c}),e.a=o;var u=[r.a],c=i["ɵcrt"]({encapsulation:0,styles:u,data:{}});i["ɵccf"]("description-box",a.a,l,{},{},["*"])},311:function(t,e,n){"use strict";var o=n(0);n.d(e,"a",function(){return i});var l=this&&this.__decorate||function(t,e,n,o){var l,r=arguments.length,i=r<3?e:null===o?o=Object.getOwnPropertyDescriptor(e,n):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)i=Reflect.decorate(t,e,n,o);else for(var a=t.length-1;a>=0;a--)(l=t[a])&&(i=(r<3?l(i):r>3?l(e,n,i):l(e,n))||i);return r>3&&i&&Object.defineProperty(e,n,i),i},r=this&&this.__metadata||function(t,e){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(t,e)},i=function(){function t(){}return t.prototype.ngOnInit=function(){},t}();i=l([n.i(o.Component)({template:n(478),styles:[n(505)]}),r("design:paramtypes",[])],i)},335:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var o=n(0),l=n(422),r=n(21),i=n(3),a=n(278),u=n(276),c=n(390),s=n(27),d=n(311);n.d(e,"SlayTheDragonModuleNgFactory",function(){return h});var p=this&&this.__extends||function(){var t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)e.hasOwnProperty(n)&&(t[n]=e[n])};return function(e,n){function o(){this.constructor=e}t(e,n),e.prototype=null===n?Object.create(n):(o.prototype=n.prototype,new o)}}(),f=function(t){function e(e){return t.call(this,e,[c.a],[])||this}return p(e,t),Object.defineProperty(e.prototype,"_NgLocalization_5",{get:function(){return null==this.__NgLocalization_5&&(this.__NgLocalization_5=new i.NgLocaleLocalization(this._LOCALE_ID_4)),this.__NgLocalization_5},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"_BlogsService_6",{get:function(){return null==this.__BlogsService_6&&(this.__BlogsService_6=new u.a(this.parent.get(s.k))),this.__BlogsService_6},enumerable:!0,configurable:!0}),e.prototype.createInternal=function(){return this._RouterModule_0=new r.q(this.parent.get(r.r,null),this.parent.get(r.j,null)),this._CommonModule_1=new i.CommonModule,this._SharedModule_2=new a.a,this._SlayTheDragonModule_3=new l.a,this._LOCALE_ID_4="en-US",this._ROUTES_7=[[{path:"",component:d.a}]],this._SlayTheDragonModule_3},e.prototype.getInternal=function(t,e){return t===r.q?this._RouterModule_0:t===i.CommonModule?this._CommonModule_1:t===a.a?this._SharedModule_2:t===l.a?this._SlayTheDragonModule_3:t===o.LOCALE_ID?this._LOCALE_ID_4:t===i.NgLocalization?this._NgLocalization_5:t===u.a?this._BlogsService_6:t===r.u?this._ROUTES_7:e},e.prototype.destroyInternal=function(){},e}(o["ɵNgModuleInjector"]),h=new o.NgModuleFactory(f,l.a)},389:function(t,e,n){"use strict";n.d(e,"a",function(){return o});var o=["[_nghost-%COMP%] {\r\n  min-width: 304px;\r\n  max-width: 1000px;\r\n  margin: auto;\r\n  width: 100%;\r\n  display: block; }\r\n\r\niframe[_ngcontent-%COMP%] {\r\n  width: 800px;\r\n  height: 560px;\r\n  border: none;\r\n  margin: auto;\r\n  display: block; }\r\n\r\nh1[_ngcontent-%COMP%] {\r\n  text-align: center; }"]},390:function(t,e,n){"use strict";function o(t){return i["ɵvid"](0,[(t()(),i["ɵeld"](0,null,null,1,"h1",[],null,null,null,null,null)),(t()(),i["ɵted"](null,["Slay the Dragon!"])),(t()(),i["ɵted"](null,["\n"])),(t()(),i["ɵeld"](0,null,null,0,"iframe",[["src","app/projects/slay-the-dragon/old/index.html"]],null,null,null,null,null)),(t()(),i["ɵted"](null,["\n"])),(t()(),i["ɵeld"](0,null,null,14,"description-box",[],null,null,null,a.a,a.b)),i["ɵdid"](24576,null,0,u.a,[],null,null),(t()(),i["ɵted"](0,["\n  In this game you have one objective: Slay the Dragon! In order to do that you will need to obtain the dragon slaying equipment,\n  level up your skills and defeat all enemies that stand in your way. Game instructions are in the game.\n  "])),(t()(),i["ɵeld"](0,null,0,0,"br",[],null,null,null,null,null)),(t()(),i["ɵeld"](0,null,0,0,"br",[],null,null,null,null,null)),(t()(),i["ɵted"](0,["Made with Javascript/jQuery in summer 2014. Sound effects added and bug fixes made in January 2016.\n  "])),(t()(),i["ɵeld"](0,null,0,0,"br",[],null,null,null,null,null)),(t()(),i["ɵeld"](0,null,0,0,"br",[],null,null,null,null,null)),(t()(),i["ɵted"](0,["Note: Sound effects don't work in Internet explorer.\n  "])),(t()(),i["ɵeld"](0,null,0,0,"br",[],null,null,null,null,null)),(t()(),i["ɵeld"](0,null,0,0,"br",[],null,null,null,null,null)),(t()(),i["ɵted"](0,["Note 2: The game won't scale properly on smaller screens. This will be fixed in future rewrite.\n  "])),(t()(),i["ɵeld"](0,null,0,0,"br",[],null,null,null,null,null)),(t()(),i["ɵeld"](0,null,0,0,"br",[],null,null,null,null,null)),(t()(),i["ɵted"](0,["Update (13.1.2016): Mute button added\n"]))],null,null)}function l(t){return i["ɵvid"](0,[(t()(),i["ɵeld"](0,null,null,1,"ng-component",[],null,null,null,o,d)),i["ɵdid"](57344,null,0,c.a,[],null,null)],function(t,e){t(e,1,0)},null)}var r=n(389),i=n(0),a=n(290),u=n(277),c=n(311);n.d(e,"a",function(){return p});var s=[r.a],d=i["ɵcrt"]({encapsulation:0,styles:s,data:{}}),p=i["ɵccf"]("ng-component",c.a,l,{},{},[])},422:function(t,e,n){"use strict";var o=n(0),l=n(278),r=n(311),i=n(423);n.d(e,"a",function(){return u});var a=this&&this.__decorate||function(t,e,n,o){var l,r=arguments.length,i=r<3?e:null===o?o=Object.getOwnPropertyDescriptor(e,n):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)i=Reflect.decorate(t,e,n,o);else for(var a=t.length-1;a>=0;a--)(l=t[a])&&(i=(r<3?l(i):r>3?l(e,n,i):l(e,n))||i);return r>3&&i&&Object.defineProperty(e,n,i),i},u=function(){function t(){}return t}();u=a([n.i(o.NgModule)({imports:[i.a,l.a],exports:[],declarations:[r.a],providers:[]})],u)},423:function(t,e,n){"use strict";var o=n(21),l=n(311);n.d(e,"a",function(){return i});var r=[{path:"",component:l.a}],i=o.q.forChild(r)},450:function(t,e,n){e=t.exports=n(26)(),e.push([t.i,":host{min-width:304px;max-width:1000px;width:100%}:host,iframe{margin:auto;display:block}iframe{width:800px;height:560px;border:none}h1{text-align:center}",""])},478:function(t,e){t.exports="<h1>Slay the Dragon!</h1>\r\n<iframe src=\"app/projects/slay-the-dragon/old/index.html\"></iframe>\r\n<description-box>\r\n  In this game you have one objective: Slay the Dragon! In order to do that you will need to obtain the dragon slaying equipment,\r\n  level up your skills and defeat all enemies that stand in your way. Game instructions are in the game.\r\n  <br><br>Made with Javascript/jQuery in summer 2014. Sound effects added and bug fixes made in January 2016.\r\n  <br><br>Note: Sound effects don't work in Internet explorer.\r\n  <br><br>Note 2: The game won't scale properly on smaller screens. This will be fixed in future rewrite.\r\n  <br><br>Update (13.1.2016): Mute button added\r\n</description-box>"},505:function(t,e,n){var o=n(450);t.exports="string"==typeof o?o:o.toString()}});