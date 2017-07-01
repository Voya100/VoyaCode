webpackJsonp([8],{143:function(t,e,n){"use strict";n.d(e,"a",function(){return c});var o=n(1),l=n(13),r=n(34),i=(n.n(r),n(61)),u=(n.n(i),this&&this.__decorate||function(t,e,n,o){var l,r=arguments.length,i=r<3?e:null===o?o=Object.getOwnPropertyDescriptor(e,n):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)i=Reflect.decorate(t,e,n,o);else for(var u=t.length-1;u>=0;u--)(l=t[u])&&(i=(r<3?l(i):r>3?l(e,n,i):l(e,n))||i);return r>3&&i&&Object.defineProperty(e,n,i),i}),a=this&&this.__metadata||function(t,e){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(t,e)},c=function(){function t(t){this.http=t,this.url="/api/blogs"}return t.prototype.getBlogs=function(t){return void 0===t&&(t=0),this.http.get(this.url+(t?"?limit="+t:"")).map(function(t){return t.json().data||[{id:0,name:"Blog search failed.",text:"Sorry, something went wrong. If this problem persists, report to the admin through comments page.",date:"",year:0}]}).catch(function(t){return[[{id:0,name:"Blog search failed.",text:"Sorry, something went wrong and blog couldn't be fetched from the server. Check your internet connection and refresh the page.<br><br>If problem persists, report to the admin through comments page.",date:"",year:0}]]})},t}();c=u([n.i(o.Injectable)(),a("design:paramtypes",[l.k])],c)},144:function(t,e,n){"use strict";n.d(e,"a",function(){return r});var o=n(1),l=this&&this.__decorate||function(t,e,n,o){var l,r=arguments.length,i=r<3?e:null===o?o=Object.getOwnPropertyDescriptor(e,n):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)i=Reflect.decorate(t,e,n,o);else for(var u=t.length-1;u>=0;u--)(l=t[u])&&(i=(r<3?l(i):r>3?l(e,n,i):l(e,n))||i);return r>3&&i&&Object.defineProperty(e,n,i),i},r=function(){function t(){}return t}();r=l([n.i(o.Component)({selector:"description-box",template:n(152),styles:[n(154)]})],r)},145:function(t,e,n){"use strict";n.d(e,"a",function(){return c});var o=n(1),l=n(6),r=n(146),i=n(143),u=n(144),a=this&&this.__decorate||function(t,e,n,o){var l,r=arguments.length,i=r<3?e:null===o?o=Object.getOwnPropertyDescriptor(e,n):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)i=Reflect.decorate(t,e,n,o);else for(var u=t.length-1;u>=0;u--)(l=t[u])&&(i=(r<3?l(i):r>3?l(e,n,i):l(e,n))||i);return r>3&&i&&Object.defineProperty(e,n,i),i},c=function(){function t(){}return t}();c=a([n.i(o.NgModule)({imports:[l.b],exports:[r.a,u.a],declarations:[r.a,u.a],providers:[i.a]})],c)},146:function(t,e,n){"use strict";n.d(e,"a",function(){return i});var o=n(1),l=this&&this.__decorate||function(t,e,n,o){var l,r=arguments.length,i=r<3?e:null===o?o=Object.getOwnPropertyDescriptor(e,n):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)i=Reflect.decorate(t,e,n,o);else for(var u=t.length-1;u>=0;u--)(l=t[u])&&(i=(r<3?l(i):r>3?l(e,n,i):l(e,n))||i);return r>3&&i&&Object.defineProperty(e,n,i),i},r=this&&this.__metadata||function(t,e){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(t,e)},i=function(){function t(){this.minimizable=!1,this.visible=!1}return t.prototype.ngOnInit=function(){},t.prototype.toggle=function(t){void 0===t&&(t=!this.visible),this.visible=t},t}();l([n.i(o.Input)(),r("design:type",Object)],i.prototype,"blogData",void 0),l([n.i(o.Input)(),r("design:type",Boolean)],i.prototype,"minimizable",void 0),l([n.i(o.Input)(),r("design:type",Boolean)],i.prototype,"visible",void 0),i=l([n.i(o.Component)({selector:"blog-post",template:n(151),styles:[n(153)],encapsulation:o.ViewEncapsulation.None}),r("design:paramtypes",[])],i)},149:function(t,e,n){e=t.exports=n(12)(),e.push([t.i,"blog-post table{background:#5ac0f3;border:2px solid #1c2e3b;padding:5px;box-sizing:border-box}blog-post .blog-header button{background:#2586cc;border:1px solid #1c2e3b;cursor:pointer}blog-post .blog-header button:focus{outline:none}blog-post .blog-header button:hover{background:#99d4ff}blog-post{display:block}blog-post table{padding:10px;width:100%;max-width:100%;margin:0}blog-post .blog-header button{float:right;width:24px;height:24px;font-size:20px;text-align:center;padding:0;line-height:1}blog-post .blog-date{font-size:75%;font-weight:400}blog-post .blog-text{border-top:1px solid #1c2e3b;padding-top:5px}blog-post img{max-width:100%}",""])},150:function(t,e,n){e=t.exports=n(12)(),e.push([t.i,":host,div{display:block}div{margin:0;margin-top:15px;box-sizing:border-box;width:100%;background:#5ac0f3;border:2px solid #1c2e3b;padding:10px}",""])},151:function(t,e){t.exports='<table>\r\n  <tr>\r\n    <th class="blog-header">\r\n      {{blogData?.name}}\r\n      <button *ngIf="minimizable" class="minimize-button" [title]="visible ? \'Close\' : \'Open\'" (click)="toggle()">{{visible ? \'‒\' : \'+\'}}</button>\r\n      <br><span class="blog-date">{{blogData?.date}}</span>      \r\n    </th>\r\n  </tr>\r\n  <tr *ngIf="visible">\r\n    <td class="blog-text" [innerHtml]="blogData?.text"></td>\r\n  </tr>\r\n</table>'},152:function(t,e){t.exports='<div class="description-box">\r\n  <h1>Description:</h1>\r\n  <ng-content></ng-content>\r\n</div>'},153:function(t,e,n){var o=n(149);t.exports="string"==typeof o?o:o.toString()},154:function(t,e,n){var o=n(150);t.exports="string"==typeof o?o:o.toString()},156:function(t,e,n){"use strict";n.d(e,"a",function(){return o});var o=["[_nghost-%COMP%] {\r\n  display: block; }\r\n\r\ndiv[_ngcontent-%COMP%] {\r\n  margin: 0px;\r\n  margin-top: 15px;\r\n  box-sizing: border-box;\r\n  width: 100%;\r\n  background: #5ac0f3;\r\n  border: 2px solid #1C2E3B;\r\n  padding: 10px;\r\n  display: block; }"]},157:function(t,e,n){"use strict";function o(t){return i["ɵvid"](0,[(t()(),i["ɵeld"](0,null,null,6,"div",[["class","description-box"]],null,null,null,null,null)),(t()(),i["ɵted"](null,["\n  "])),(t()(),i["ɵeld"](0,null,null,1,"h1",[],null,null,null,null,null)),(t()(),i["ɵted"](null,["Description:"])),(t()(),i["ɵted"](null,["\n  "])),i["ɵncd"](null,0),(t()(),i["ɵted"](null,["\n"]))],null,null)}function l(t){return i["ɵvid"](0,[(t()(),i["ɵeld"](0,null,null,1,"description-box",[],null,null,null,o,c)),i["ɵdid"](49152,null,0,u.a,[],null,null)],null,null)}n.d(e,"b",function(){return c}),e.a=o;var r=n(156),i=n(1),u=n(144),a=[r.a],c=i["ɵcrt"]({encapsulation:0,styles:a,data:{}});i["ɵccf"]("description-box",u.a,l,{},{},["*"])},178:function(t,e,n){"use strict";n.d(e,"a",function(){return i});var o=n(1),l=this&&this.__decorate||function(t,e,n,o){var l,r=arguments.length,i=r<3?e:null===o?o=Object.getOwnPropertyDescriptor(e,n):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)i=Reflect.decorate(t,e,n,o);else for(var u=t.length-1;u>=0;u--)(l=t[u])&&(i=(r<3?l(i):r>3?l(e,n,i):l(e,n))||i);return r>3&&i&&Object.defineProperty(e,n,i),i},r=this&&this.__metadata||function(t,e){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(t,e)},i=function(){function t(){}return t.prototype.ngOnInit=function(){},t}();i=l([n.i(o.Component)({template:n(345),styles:[n(372)]}),r("design:paramtypes",[])],i)},202:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),n.d(e,"SlayTheDragonModuleNgFactory",function(){return h});var o=n(1),l=n(289),r=n(8),i=n(6),u=n(145),a=n(143),c=n(257),s=n(13),d=n(178),p=this&&this.__extends||function(){var t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)e.hasOwnProperty(n)&&(t[n]=e[n])};return function(e,n){function o(){this.constructor=e}t(e,n),e.prototype=null===n?Object.create(n):(o.prototype=n.prototype,new o)}}(),f=function(t){function e(e){return t.call(this,e,[c.a],[])||this}return p(e,t),Object.defineProperty(e.prototype,"_NgLocalization_5",{get:function(){return null==this.__NgLocalization_5&&(this.__NgLocalization_5=new i.a(this._LOCALE_ID_4)),this.__NgLocalization_5},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"_BlogsService_6",{get:function(){return null==this.__BlogsService_6&&(this.__BlogsService_6=new a.a(this.parent.get(s.k))),this.__BlogsService_6},enumerable:!0,configurable:!0}),e.prototype.createInternal=function(){return this._RouterModule_0=new r.q(this.parent.get(r.r,null),this.parent.get(r.j,null)),this._CommonModule_1=new i.b,this._SharedModule_2=new u.a,this._SlayTheDragonModule_3=new l.a,this._LOCALE_ID_4="en-US",this._ROUTES_7=[[{path:"",component:d.a}]],this._SlayTheDragonModule_3},e.prototype.getInternal=function(t,e){return t===r.q?this._RouterModule_0:t===i.b?this._CommonModule_1:t===u.a?this._SharedModule_2:t===l.a?this._SlayTheDragonModule_3:t===o.LOCALE_ID?this._LOCALE_ID_4:t===i.g?this._NgLocalization_5:t===a.a?this._BlogsService_6:t===r.u?this._ROUTES_7:e},e.prototype.destroyInternal=function(){},e}(o["ɵNgModuleInjector"]),h=new o.NgModuleFactory(f,l.a)},256:function(t,e,n){"use strict";n.d(e,"a",function(){return o});var o=["[_nghost-%COMP%] {\r\n  min-width: 304px;\r\n  max-width: 1000px;\r\n  margin: auto;\r\n  width: 100%;\r\n  display: block; }\r\n\r\niframe[_ngcontent-%COMP%] {\r\n  width: 800px;\r\n  height: 560px;\r\n  border: none;\r\n  margin: auto;\r\n  display: block; }\r\n\r\nh1[_ngcontent-%COMP%] {\r\n  text-align: center; }"]},257:function(t,e,n){"use strict";function o(t){return i["ɵvid"](0,[(t()(),i["ɵeld"](0,null,null,1,"h1",[],null,null,null,null,null)),(t()(),i["ɵted"](null,["Slay the Dragon!"])),(t()(),i["ɵted"](null,["\n"])),(t()(),i["ɵeld"](0,null,null,0,"iframe",[["src","projects/slay-the-dragon/old/index.html"]],null,null,null,null,null)),(t()(),i["ɵted"](null,["\n"])),(t()(),i["ɵeld"](0,null,null,14,"description-box",[],null,null,null,u.a,u.b)),i["ɵdid"](49152,null,0,a.a,[],null,null),(t()(),i["ɵted"](0,["\n  In this game you have one objective: Slay the Dragon! In order to do that you will need to obtain the dragon slaying equipment,\n  level up your skills and defeat all enemies that stand in your way. Game instructions are in the game.\n  "])),(t()(),i["ɵeld"](0,null,0,0,"br",[],null,null,null,null,null)),(t()(),i["ɵeld"](0,null,0,0,"br",[],null,null,null,null,null)),(t()(),i["ɵted"](0,["Made with Javascript/jQuery in summer 2014. Sound effects added and bug fixes made in January 2016.\n  "])),(t()(),i["ɵeld"](0,null,0,0,"br",[],null,null,null,null,null)),(t()(),i["ɵeld"](0,null,0,0,"br",[],null,null,null,null,null)),(t()(),i["ɵted"](0,["Note: Sound effects don't work in Internet explorer.\n  "])),(t()(),i["ɵeld"](0,null,0,0,"br",[],null,null,null,null,null)),(t()(),i["ɵeld"](0,null,0,0,"br",[],null,null,null,null,null)),(t()(),i["ɵted"](0,["Note 2: The game won't scale properly on smaller screens. This will be fixed in future rewrite.\n  "])),(t()(),i["ɵeld"](0,null,0,0,"br",[],null,null,null,null,null)),(t()(),i["ɵeld"](0,null,0,0,"br",[],null,null,null,null,null)),(t()(),i["ɵted"](0,["Update (13.1.2016): Mute button added\n"]))],null,null)}function l(t){return i["ɵvid"](0,[(t()(),i["ɵeld"](0,null,null,1,"ng-component",[],null,null,null,o,d)),i["ɵdid"](114688,null,0,c.a,[],null,null)],function(t,e){t(e,1,0)},null)}n.d(e,"a",function(){return p});var r=n(256),i=n(1),u=n(157),a=n(144),c=n(178),s=[r.a],d=i["ɵcrt"]({encapsulation:0,styles:s,data:{}}),p=i["ɵccf"]("ng-component",c.a,l,{},{},[])},289:function(t,e,n){"use strict";n.d(e,"a",function(){return a});var o=n(1),l=n(145),r=n(178),i=n(290),u=this&&this.__decorate||function(t,e,n,o){var l,r=arguments.length,i=r<3?e:null===o?o=Object.getOwnPropertyDescriptor(e,n):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)i=Reflect.decorate(t,e,n,o);else for(var u=t.length-1;u>=0;u--)(l=t[u])&&(i=(r<3?l(i):r>3?l(e,n,i):l(e,n))||i);return r>3&&i&&Object.defineProperty(e,n,i),i},a=function(){function t(){}return t}();a=u([n.i(o.NgModule)({imports:[i.a,l.a],exports:[],declarations:[r.a],providers:[]})],a)},290:function(t,e,n){"use strict";n.d(e,"a",function(){return i});var o=n(8),l=n(178),r=[{path:"",component:l.a}],i=o.q.forChild(r)},317:function(t,e,n){e=t.exports=n(12)(),e.push([t.i,":host{min-width:304px;max-width:1000px;width:100%}:host,iframe{margin:auto;display:block}iframe{width:800px;height:560px;border:none}h1{text-align:center}",""])},345:function(t,e){t.exports="<h1>Slay the Dragon!</h1>\r\n<iframe src=\"projects/slay-the-dragon/old/index.html\"></iframe>\r\n<description-box>\r\n  In this game you have one objective: Slay the Dragon! In order to do that you will need to obtain the dragon slaying equipment,\r\n  level up your skills and defeat all enemies that stand in your way. Game instructions are in the game.\r\n  <br><br>Made with Javascript/jQuery in summer 2014. Sound effects added and bug fixes made in January 2016.\r\n  <br><br>Note: Sound effects don't work in Internet explorer.\r\n  <br><br>Note 2: The game won't scale properly on smaller screens. This will be fixed in future rewrite.\r\n  <br><br>Update (13.1.2016): Mute button added\r\n</description-box>"},372:function(t,e,n){var o=n(317);t.exports="string"==typeof o?o:o.toString()}});