(window.webpackJsonp=window.webpackJsonp||[]).push([[11],{gJYm:function(n,l,e){"use strict";e.r(l);var t=e("CcnG"),u=function(){},o=e("pMnS"),a=e("Ip0R"),i=function(){this.isNew=!1},d=t["\u0275crt"]({encapsulation:0,styles:[["[_nghost-%COMP%]{display:block}article[_ngcontent-%COMP%]{display:flex;background:#5ac0f3}.comment-content[_ngcontent-%COMP%], .username[_ngcontent-%COMP%]{float:left;box-sizing:border-box;border:1px solid #1c2e3b;padding:8px}.username[_ngcontent-%COMP%]{width:25%;min-width:25%;display:flex;flex-direction:column;justify-content:center;align-items:center}.username[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]{font-size:75%}.comment-content[_ngcontent-%COMP%]{width:75%}.post-date[_ngcontent-%COMP%]{font-size:75%}hr[_ngcontent-%COMP%]{border-color:#17537f}.private[_ngcontent-%COMP%]{background:#d3d3d3}"]],data:{}});function r(n){return t["\u0275vid"](0,[(n()(),t["\u0275eld"](0,0,null,null,1,"span",[],null,null,null,null,null)),(n()(),t["\u0275ted"](-1,null,["Site Admin"]))],null,null)}function s(n){return t["\u0275vid"](0,[(n()(),t["\u0275eld"](0,0,null,null,4,"span",[],null,null,null,null,null)),(n()(),t["\u0275ted"](-1,null,["\n      "])),(n()(),t["\u0275eld"](2,0,null,null,1,"i",[],null,null,null,null,null)),(n()(),t["\u0275ted"](-1,null,["Private message"])),(n()(),t["\u0275ted"](-1,null,["\n    "]))],null,null)}function c(n){return t["\u0275vid"](0,[(n()(),t["\u0275eld"](0,0,null,null,1,"span",[],null,null,null,null,null)),(n()(),t["\u0275ted"](1,null,[", edited at ",""]))],null,function(n,l){n(l,1,0,l.component.data.updateTime)})}function m(n){return t["\u0275vid"](0,[(n()(),t["\u0275eld"](0,0,null,null,23,"article",[],[[2,"private",null]],null,null,null,null)),(n()(),t["\u0275ted"](-1,null,["\n  "])),(n()(),t["\u0275eld"](2,0,null,null,7,"div",[["class","username"]],null,null,null,null,null)),(n()(),t["\u0275ted"](3,null,["\n    ","\n    "])),(n()(),t["\u0275and"](16777216,null,null,1,null,r)),t["\u0275did"](5,16384,null,0,a.i,[t.ViewContainerRef,t.TemplateRef],{ngIf:[0,"ngIf"]},null),(n()(),t["\u0275ted"](-1,null,["\n    "])),(n()(),t["\u0275and"](16777216,null,null,1,null,s)),t["\u0275did"](8,16384,null,0,a.i,[t.ViewContainerRef,t.TemplateRef],{ngIf:[0,"ngIf"]},null),(n()(),t["\u0275ted"](-1,null,["\n  "])),(n()(),t["\u0275ted"](-1,null,["\n  "])),(n()(),t["\u0275eld"](11,0,null,null,11,"div",[["class","comment-content"]],null,null,null,null,null)),(n()(),t["\u0275ted"](-1,null,["\n    "])),(n()(),t["\u0275eld"](13,0,null,null,4,"span",[["class","post-date"]],null,null,null,null,null)),(n()(),t["\u0275ted"](14,null,["\n      ","\n      "])),(n()(),t["\u0275and"](16777216,null,null,1,null,c)),t["\u0275did"](16,16384,null,0,a.i,[t.ViewContainerRef,t.TemplateRef],{ngIf:[0,"ngIf"]},null),(n()(),t["\u0275ted"](-1,null,["\n    "])),(n()(),t["\u0275ted"](-1,null,["\n    "])),(n()(),t["\u0275eld"](19,0,null,null,0,"hr",[],null,null,null,null,null)),(n()(),t["\u0275ted"](-1,null,["\n    "])),(n()(),t["\u0275eld"](21,0,null,null,0,"div",[],[[8,"innerHTML",1]],null,null,null,null)),(n()(),t["\u0275ted"](-1,null,["\n  "])),(n()(),t["\u0275ted"](-1,null,["\n"])),(n()(),t["\u0275ted"](-1,null,["\n"]))],function(n,l){var e=l.component;n(l,5,0,"Voya"==e.data.username),n(l,8,0,e.data.isPrivate),n(l,16,0,e.data.postTime!=e.data.updateTime)},function(n,l){var e=l.component;n(l,0,0,e.data.isPrivate),n(l,3,0,e.data.username),n(l,14,0,e.data.postTime),n(l,21,0,e.data.message)})}var p=e("gIcY"),g=e("d/fO"),h=e("HF5I"),f=e("t/Na"),v=e("XlPw"),C=e("67Y/"),b=e("9Z1F"),P=e("W4xs"),O=function(){function n(n,l){this.http=n,this.auth=l,this.url="/api/comments",this.previewUrl="/api/comments/preview"}return n.prototype.getComments=function(){var n=this.auth.token,l=new f.g(n?{Authorization:"Bearer "+n}:{});return this.http.get(this.url,{headers:l}).pipe(Object(C.a)(function(n){return n.data}))},n.prototype.postComment=function(n,l,e,t){return void 0===t&&(t=!1),this.http.post(t?this.previewUrl:this.url,{username:n,message:l,isPrivate:e}).pipe(Object(b.a)(function(n){return Object(v.a)(n.error.message||n.message)}))},n}(),M=function(){function n(n){this.commentService=n,this.comments=[],this.username="",this.message="",this.isPrivate=!1,this.postErrors=[],this.previewPost=void 0,this.posting=!1}return n.prototype.ngOnInit=function(){var n=this;this.commentService.getComments().subscribe(function(l){n.comments=l},function(l){n.comments.push({username:"Error",message:"Connection to server failed and comments couldn't be fetched. Check your internet connection and try again. If problem persists, contact the admin.",isPrivate:!1,postTime:"",updateTime:""})})},n.prototype.postComment=function(n){var l=this;void 0===n&&(n=!1),this.posting||(this.posting=!0,this.postErrors=[],this.commentService.postComment(this.username,this.message,this.isPrivate,n).subscribe(function(e){n?l.previewPost=e.data:(l.comments.push(e.data),l.previewPost=void 0,l.message=""),l.posting=!1},function(n){l.postErrors=Array.isArray(n)?n:[n],l.posting=!1}))},n}(),_=t["\u0275crt"]({encapsulation:0,styles:[[".leave-comment[_ngcontent-%COMP%]   label[_ngcontent-%COMP%]{-webkit-touch-callout:none;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.header[_ngcontent-%COMP%]:after{content:'';display:table;clear:both}[_nghost-%COMP%]{min-width:304px;max-width:1000px;margin:auto;width:100%;display:block}.leave-comment[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]{font-size:100%;background:#2586cc;color:#1c2e3b;text-align:center;border:1px solid #1c2e3b;cursor:pointer}.leave-comment[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]:focus{outline:0}.leave-comment[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]:hover{background:#99d4ff}.leave-comment[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]:disabled{opacity:.6}.comment-container[_ngcontent-%COMP%]{width:100%;border:1px solid #1c2e3b}.header[_ngcontent-%COMP%]{background:#2586cc;text-align:center;font-weight:700}.header[_ngcontent-%COMP%]   .comments-header[_ngcontent-%COMP%], .header[_ngcontent-%COMP%]   .username-header[_ngcontent-%COMP%]{float:left;border:1px solid #1c2e3b;box-sizing:border-box;padding:5px}.header[_ngcontent-%COMP%]   .username-header[_ngcontent-%COMP%]{width:25%;min-width:25%}.header[_ngcontent-%COMP%]   .comments-header[_ngcontent-%COMP%]{width:75%}.leave-comment[_ngcontent-%COMP%]{width:100%;background:#5ac0f3;border-collapse:collapse;margin-top:10px}.leave-comment[_ngcontent-%COMP%]   .header-row[_ngcontent-%COMP%]{background:#2586cc;text-align:center}.leave-comment[_ngcontent-%COMP%]   td[_ngcontent-%COMP%]{border:2px solid #1c2e3b;padding:5px}.leave-comment[_ngcontent-%COMP%]   .first-cell[_ngcontent-%COMP%]{width:25%}.leave-comment[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]{padding:2px 5px;margin:5px 2px;min-width:24px}.leave-comment[_ngcontent-%COMP%]   .username[_ngcontent-%COMP%], .leave-comment[_ngcontent-%COMP%]   textarea[_ngcontent-%COMP%]{max-width:450px;width:90%;font-family:Helvetica,Verdana,sans-serif}.error[_ngcontent-%COMP%]{color:#940000}.disabled[_ngcontent-%COMP%]{opacity:.7}"]],data:{}});function w(n){return t["\u0275vid"](0,[(n()(),t["\u0275eld"](0,0,null,null,1,"comment-post",[],null,null,null,m,d)),t["\u0275did"](1,49152,null,0,i,[],{data:[0,"data"]},null)],function(n,l){n(l,1,0,l.context.$implicit)},null)}function x(n){return t["\u0275vid"](0,[(n()(),t["\u0275eld"](0,0,null,null,7,"section",[["class","preview-container"]],null,null,null,null,null)),(n()(),t["\u0275ted"](-1,null,["\n  "])),(n()(),t["\u0275eld"](2,0,null,null,1,"h2",[],null,null,null,null,null)),(n()(),t["\u0275ted"](-1,null,["Preview"])),(n()(),t["\u0275ted"](-1,null,["\n  "])),(n()(),t["\u0275eld"](5,0,null,null,1,"comment-post",[],null,null,null,m,d)),t["\u0275did"](6,49152,null,0,i,[],{data:[0,"data"]},null),(n()(),t["\u0275ted"](-1,null,["\n"]))],function(n,l){n(l,6,0,l.component.previewPost)},null)}function y(n){return t["\u0275vid"](0,[(n()(),t["\u0275eld"](0,0,null,null,1,"div",[["class","error"]],null,null,null,null,null)),(n()(),t["\u0275ted"](1,null,["",""]))],null,function(n,l){n(l,1,0,l.context.$implicit)})}function k(n){return t["\u0275vid"](0,[t["\u0275qud"](402653184,1,{messageBox:0}),(n()(),t["\u0275eld"](1,0,null,null,1,"h1",[],null,null,null,null,null)),(n()(),t["\u0275ted"](-1,null,["Comments"])),(n()(),t["\u0275ted"](-1,null,["\n\n"])),(n()(),t["\u0275eld"](4,0,null,null,13,"section",[["class","comment-container"]],null,null,null,null,null)),(n()(),t["\u0275ted"](-1,null,["\n  "])),(n()(),t["\u0275eld"](6,0,null,null,7,"div",[["class","header"]],null,null,null,null,null)),(n()(),t["\u0275ted"](-1,null,["\n    "])),(n()(),t["\u0275eld"](8,0,null,null,1,"div",[["class","username-header"]],null,null,null,null,null)),(n()(),t["\u0275ted"](-1,null,["Username"])),(n()(),t["\u0275ted"](-1,null,["\n    "])),(n()(),t["\u0275eld"](11,0,null,null,1,"div",[["class","comments-header"]],null,null,null,null,null)),(n()(),t["\u0275ted"](-1,null,["Comments"])),(n()(),t["\u0275ted"](-1,null,["\n  "])),(n()(),t["\u0275ted"](-1,null,["\n  "])),(n()(),t["\u0275and"](16777216,null,null,1,null,w)),t["\u0275did"](16,802816,null,0,a.h,[t.ViewContainerRef,t.TemplateRef,t.IterableDiffers],{ngForOf:[0,"ngForOf"]},null),(n()(),t["\u0275ted"](-1,null,["\n"])),(n()(),t["\u0275ted"](-1,null,["\n"])),(n()(),t["\u0275and"](16777216,null,null,1,null,x)),t["\u0275did"](20,16384,null,0,a.i,[t.ViewContainerRef,t.TemplateRef],{ngIf:[0,"ngIf"]},null),(n()(),t["\u0275ted"](-1,null,["\n"])),(n()(),t["\u0275eld"](22,0,null,null,60,"table",[["class","leave-comment"]],null,null,null,null,null)),(n()(),t["\u0275ted"](-1,null,["\n  "])),(n()(),t["\u0275eld"](24,0,null,null,58,"tbody",[],null,null,null,null,null)),(n()(),t["\u0275eld"](25,0,null,null,4,"tr",[["class","header-row"]],null,null,null,null,null)),(n()(),t["\u0275ted"](-1,null,["\n    "])),(n()(),t["\u0275eld"](27,0,null,null,1,"td",[["colspan","2"]],null,null,null,null,null)),(n()(),t["\u0275ted"](-1,null,["Leave a comment:"])),(n()(),t["\u0275ted"](-1,null,["\n  "])),(n()(),t["\u0275ted"](-1,null,["\n  "])),(n()(),t["\u0275eld"](31,0,null,null,16,"tr",[["class","row"]],null,null,null,null,null)),(n()(),t["\u0275ted"](-1,null,["\n    "])),(n()(),t["\u0275eld"](33,0,null,null,1,"td",[["class","first-cell"]],null,null,null,null,null)),(n()(),t["\u0275ted"](-1,null,["Username:"])),(n()(),t["\u0275ted"](-1,null,["\n    "])),(n()(),t["\u0275eld"](36,0,null,null,10,"td",[],null,null,null,null,null)),(n()(),t["\u0275ted"](-1,null,["\n      "])),(n()(),t["\u0275eld"](38,0,null,null,7,"input",[["class","username"],["maxlength","15"],["name","username"],["size","75"],["tabindex","1"],["type","text"]],[[1,"maxlength",0],[2,"ng-untouched",null],[2,"ng-touched",null],[2,"ng-pristine",null],[2,"ng-dirty",null],[2,"ng-valid",null],[2,"ng-invalid",null],[2,"ng-pending",null]],[[null,"ngModelChange"],[null,"input"],[null,"blur"],[null,"compositionstart"],[null,"compositionend"]],function(n,l,e){var u=!0,o=n.component;return"input"===l&&(u=!1!==t["\u0275nov"](n,39)._handleInput(e.target.value)&&u),"blur"===l&&(u=!1!==t["\u0275nov"](n,39).onTouched()&&u),"compositionstart"===l&&(u=!1!==t["\u0275nov"](n,39)._compositionStart()&&u),"compositionend"===l&&(u=!1!==t["\u0275nov"](n,39)._compositionEnd(e.target.value)&&u),"ngModelChange"===l&&(u=!1!==(o.username=e)&&u),u},null,null)),t["\u0275did"](39,16384,null,0,p.d,[t.Renderer2,t.ElementRef,[2,p.a]],null,null),t["\u0275did"](40,540672,null,0,p.f,[],{maxlength:[0,"maxlength"]},null),t["\u0275prd"](1024,null,p.g,function(n){return[n]},[p.f]),t["\u0275prd"](1024,null,p.h,function(n){return[n]},[p.d]),t["\u0275did"](43,671744,null,0,p.m,[[8,null],[6,p.g],[8,null],[6,p.h]],{name:[0,"name"],isDisabled:[1,"isDisabled"],model:[2,"model"]},{update:"ngModelChange"}),t["\u0275prd"](2048,null,p.i,null,[p.m]),t["\u0275did"](45,16384,null,0,p.j,[[4,p.i]],null,null),(n()(),t["\u0275ted"](-1,null,["\n    "])),(n()(),t["\u0275ted"](-1,null,["\n  "])),(n()(),t["\u0275ted"](-1,null,["\n  "])),(n()(),t["\u0275eld"](49,0,null,null,17,"tr",[["class","row"]],null,null,null,null,null)),(n()(),t["\u0275ted"](-1,null,["\n    "])),(n()(),t["\u0275eld"](51,0,null,null,1,"td",[],null,null,null,null,null)),(n()(),t["\u0275ted"](-1,null,["Message:"])),(n()(),t["\u0275ted"](-1,null,["\n    "])),(n()(),t["\u0275eld"](54,0,null,null,11,"td",[],null,null,null,null,null)),(n()(),t["\u0275ted"](-1,null,["\n      "])),(n()(),t["\u0275eld"](56,0,null,null,1,"textarea-with-tags",[],null,[[null,"messageChange"]],function(n,l,e){var t=!0;return"messageChange"===l&&(t=!1!==(n.component.message=e)&&t),t},g.b,g.a)),t["\u0275did"](57,49152,null,0,h.a,[],{message:[0,"message"],disabled:[1,"disabled"]},{messageChange:"messageChange"}),(n()(),t["\u0275ted"](-1,null,["\n      "])),(n()(),t["\u0275eld"](59,0,null,null,0,"br",[],null,null,null,null,null)),(n()(),t["\u0275ted"](-1,null,["\n      "])),(n()(),t["\u0275eld"](61,0,null,null,3,"label",[["for","is-private"],["title","If the comment is set as private, only the site admin can see it."]],null,null,null,null,null)),(n()(),t["\u0275ted"](-1,null,["\n        "])),(n()(),t["\u0275eld"](63,0,null,null,0,"input",[["id","is-private"],["name","is-private"],["type","checkbox"]],[[8,"checked",0]],[[null,"change"]],function(n,l,e){var t=!0,u=n.component;return"change"===l&&(t=0!=(u.isPrivate=!u.isPrivate)&&t),t},null,null)),(n()(),t["\u0275ted"](-1,null,["Private comment"])),(n()(),t["\u0275ted"](-1,null,["\n    "])),(n()(),t["\u0275ted"](-1,null,["\n  "])),(n()(),t["\u0275ted"](-1,null,["\n  "])),(n()(),t["\u0275eld"](68,0,null,null,13,"tr",[["class","row"]],null,null,null,null,null)),(n()(),t["\u0275ted"](-1,null,["\n    "])),(n()(),t["\u0275eld"](70,0,null,null,10,"td",[["colspan","2"],["style","text-align:center;"]],null,null,null,null,null)),(n()(),t["\u0275ted"](-1,null,["\n      "])),(n()(),t["\u0275and"](16777216,null,null,1,null,y)),t["\u0275did"](73,802816,null,0,a.h,[t.ViewContainerRef,t.TemplateRef,t.IterableDiffers],{ngForOf:[0,"ngForOf"]},null),(n()(),t["\u0275ted"](-1,null,["\n      "])),(n()(),t["\u0275eld"](75,0,null,null,1,"button",[["title","Shows what the comment would look like if posted."]],[[2,"disabled",null]],[[null,"click"]],function(n,l,e){var t=!0;return"click"===l&&(t=!1!==n.component.postComment(!0)&&t),t},null,null)),(n()(),t["\u0275ted"](-1,null,["Preview"])),(n()(),t["\u0275ted"](-1,null,["\n      "])),(n()(),t["\u0275eld"](78,0,null,null,1,"button",[],[[2,"disabled",null]],[[null,"click"]],function(n,l,e){var t=!0;return"click"===l&&(t=!1!==n.component.postComment()&&t),t},null,null)),(n()(),t["\u0275ted"](-1,null,["Submit"])),(n()(),t["\u0275ted"](-1,null,["\n    "])),(n()(),t["\u0275ted"](-1,null,["\n  "])),(n()(),t["\u0275ted"](-1,null,["\n"])),(n()(),t["\u0275ted"](-1,null,["\n"]))],function(n,l){var e=l.component;n(l,16,0,e.comments),n(l,20,0,e.previewPost),n(l,40,0,"15"),n(l,43,0,"username",e.posting,e.username),n(l,57,0,e.message,e.posting),n(l,73,0,e.postErrors)},function(n,l){var e=l.component;n(l,38,0,t["\u0275nov"](l,40).maxlength?t["\u0275nov"](l,40).maxlength:null,t["\u0275nov"](l,45).ngClassUntouched,t["\u0275nov"](l,45).ngClassTouched,t["\u0275nov"](l,45).ngClassPristine,t["\u0275nov"](l,45).ngClassDirty,t["\u0275nov"](l,45).ngClassValid,t["\u0275nov"](l,45).ngClassInvalid,t["\u0275nov"](l,45).ngClassPending),n(l,63,0,e.isPrivate),n(l,75,0,e.posting),n(l,78,0,e.posting)})}var I=t["\u0275ccf"]("ng-component",M,function(n){return t["\u0275vid"](0,[(n()(),t["\u0275eld"](0,0,null,null,1,"ng-component",[],null,null,null,k,_)),t["\u0275did"](1,114688,null,0,M,[O],null,null)],function(n,l){n(l,1,0)},null)},{},{},[]),R=e("WnaA"),S=e("/yY+"),T=e("G6Az"),E=e("XgB0"),L=e("PCNd"),F=e("ZYCi");e.d(l,"CommentsModuleNgFactory",function(){return A});var A=t["\u0275cmf"](u,[],function(n){return t["\u0275mod"]([t["\u0275mpd"](512,t.ComponentFactoryResolver,t["\u0275CodegenComponentFactoryResolver"],[[8,[o.a,I]],[3,t.ComponentFactoryResolver],t.NgModuleRef]),t["\u0275mpd"](4608,a.k,a.j,[t.LOCALE_ID,[2,a.r]]),t["\u0275mpd"](4608,p.s,p.s,[]),t["\u0275mpd"](4608,R.LocalStorageService,R.LocalStorageService,["LOCAL_STORAGE_SERVICE_CONFIG"]),t["\u0275mpd"](4608,S.a,S.a,[R.LocalStorageService]),t["\u0275mpd"](4608,T.a,T.a,[f.c,P.a]),t["\u0275mpd"](4608,O,O,[f.c,P.a]),t["\u0275mpd"](1073742336,a.b,a.b,[]),t["\u0275mpd"](1073742336,p.p,p.p,[]),t["\u0275mpd"](1073742336,p.e,p.e,[]),t["\u0275mpd"](1073742336,E.LocalStorageModule,E.LocalStorageModule,[]),t["\u0275mpd"](1073742336,L.a,L.a,[]),t["\u0275mpd"](1073742336,F.q,F.q,[[2,F.w],[2,F.o]]),t["\u0275mpd"](1073742336,u,u,[]),t["\u0275mpd"](256,"LOCAL_STORAGE_SERVICE_CONFIG",{prefix:"voyacode",storageType:"localStorage"},[]),t["\u0275mpd"](1024,F.m,function(){return[[{path:"",component:M}]]},[])])})}}]);