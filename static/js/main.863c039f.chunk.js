(this["webpackJsonptodo-list"]=this["webpackJsonptodo-list"]||[]).push([[0],{32:function(e,t,a){e.exports=a(64)},37:function(e,t,a){},4:function(e,t,a){e.exports={red:"Colors_red__2umzL",green:"Colors_green__26MeA",blue:"Colors_blue__3RJOr",dark:"Colors_dark__1UBtV",default:"Colors_default__1OxFX",redB:"Colors_redB__3E4Kk",greenB:"Colors_greenB__VAT1Q",blueB:"Colors_blueB__1Wfjx",darkB:"Colors_darkB__31ZA4",defaultB:"Colors_defaultB__XvoLG"}},5:function(e,t,a){e.exports={wrapper:"Home_wrapper__21I8r",AnimationName:"Home_AnimationName__129wy",form:"Home_form__2PVZc",colorsSection:"Home_colorsSection__1qhpQ",colors:"Home_colors__Wn3v2",color:"Home_color__SxRST",colorActive:"Home_colorActive__TtI0C",input:"Home_input__g22eg",buttonSection:"Home_buttonSection__3IyhQ",button:"Home_button__2bu16"}},6:function(e,t,a){e.exports={list:"List_list__3Y7K_",background:"List_background__38Tqr",link:"List_link__3S9sQ",header:"List_header__1dY2M",titleSection:"List_titleSection__2ygVl",headerTitle:"List_headerTitle__1KaA3",title:"List_title__2nKQA",titleButton:"List_titleButton__2bwLa",copySection:"List_copySection__3tSQk",copyLink:"List_copyLink__2y28D",inputWrapper:"List_inputWrapper__haad0",input:"List_input__1a24L",addButton:"List_addButton__2tGz8",pseudoExtender:"List_pseudoExtender__1oyS8"}},64:function(e,t,a){"use strict";a.r(t);var n=a(0),c=a.n(n),o=a(28),r=a.n(o),i=(a(37),a(13)),l=a(1),s=a(2),u=a(6),d=a.n(u),m=a(7),_=a.n(m),f=a(29),p=a.n(f).a.create({baseURL:"https://todo-list-4b27a.firebaseio.com/",withCredentials:!1}),b={fetchList:function(e){return p.get("storage/".concat(e,".json")).then((function(e){return e.data}))},addTask:function(e,t){return p.post("storage/".concat(e,"/items.json"),{text:t,done:!1}).then((function(e){return e.data}))},createList:function(e,t){return p.post("storage.json",JSON.stringify({name:e,color:t,items:[]})).then((function(e){return e.data}))},editTask:function(e,t,a){return p.patch("storage/".concat(e,"/items/").concat(t,".json"),{text:a.text,done:a.done}).then((function(e){return e.data}))},deleteTask:function(e,t){return p.delete("storage/".concat(e,"/items/").concat(t,".json")).then((function(e){return e.data}))},renameList:function(e,t){return p.patch("storage/".concat(e,".json"),{name:t}).then((function(e){return e.data}))}};window.API=b;var v=function(e){return c.a.createElement("div",{className:_.a.options},e.editMode?c.a.createElement("div",{className:_.a.icon+" "+e.colorF,onClick:e.saveFun},c.a.createElement("i",{className:"fas fa-check"})," ","Save"):c.a.createElement("div",{className:_.a.icon+" "+e.colorF,onClick:e.editFun},c.a.createElement("i",{className:"fas fa-pen"})," ","Edit"),c.a.createElement("div",{className:_.a.icon+" "+e.colorF,onClick:e.deleteFun},c.a.createElement("i",{className:"fas fa-trash"})," Delete"))},E=function(e){var t=Object(n.useState)(!1),a=Object(s.a)(t,2),o=a[0],r=a[1],i=Object(n.useState)(!1),l=Object(s.a)(i,2),u=l[0],d=l[1],m=Object(n.useState)(e.text),f=Object(s.a)(m,2),p=f[0],E=f[1],k=function(){b.editTask(e.list,e.id,{text:e.text,done:!e.done}).then((function(t){e.update(e.list)}))},h=function(){b.editTask(e.list,e.id,{text:p,done:e.done}).then((function(t){d(!1),e.update(e.list)}))};return c.a.createElement("div",{className:"".concat(_.a.card," ").concat(e.done?_.a.done:_.a.active)},c.a.createElement("div",{className:_.a.grid},c.a.createElement("div",{className:_.a.btn+" "+e.colorF}," ",e.done?c.a.createElement("i",{className:"fas fa-check-circle",onClick:k}):c.a.createElement("i",{className:"far fa-circle",onClick:k})),c.a.createElement("div",{className:e.done?_.a.textDone:_.a.textActive},u?c.a.createElement("input",{onKeyPress:function(e){"Enter"===e.key&&(e.preventDefault(),h())},className:_.a.input,autoFocus:!0,value:p,onChange:function(e){E(e.target.value)}}):e.text),c.a.createElement("div",{className:_.a.btn+" "+e.colorF},c.a.createElement("i",{id:_.a.menuBtn,className:"fas fa-ellipsis-h",onClick:function(){return r(!o)}}))),o&&c.a.createElement(v,{colorF:e.colorF,hideFun:function(){r(!1)},markFun:k,deleteFun:function(){b.deleteTask(e.list,e.id).then((function(t){e.update(e.list)}))},editMode:u,editFun:function(){return d(!0)},saveFun:h}))},k=a(30),h=a(4),N=a.n(h),j=function(e){var t=Object(n.useState)(!1),a=Object(s.a)(t,2),o=a[0],r=a[1],l=Object(n.useState)(!1),u=Object(s.a)(l,2),m=u[0],_=u[1],f=Object(n.useState)(e.title),p=Object(s.a)(f,2),v=p[0],E=p[1];Object(n.useEffect)((function(){E(e.title)}),[e.title]);var h=function(){b.renameList(e.listId,""===v?e.title:v).then((function(t){_(!1),e.update(e.listId)}))};return c.a.createElement("div",{className:d.a.header},c.a.createElement("div",{className:d.a.titleSection},c.a.createElement("div",{className:d.a.headerTitle},m?c.a.createElement("input",{autoFocus:!0,onSubmit:h,placeholder:"New title...",onChange:function(e){E(e.target.value)},value:v}):c.a.createElement("div",{className:d.a.title},c.a.createElement(i.b,{className:d.a.link+" "+e.color,to:"/"},"ToDoDoLi:"),c.a.createElement("span",null,e.title)||"")),c.a.createElement("div",{className:d.a.titleButton},c.a.createElement("i",{className:m?"fas fa-check":"fas fa-pen",onClick:m?h:function(){return _(!0)}}))),c.a.createElement("div",{className:d.a.copySection},c.a.createElement(k.CopyToClipboard,{text:e.link,onCopy:function(){return r(!0)}},c.a.createElement("div",{className:d.a.copyLink},c.a.createElement("i",{className:o?"fas fa-check":"fas fa-link"})))))},C=function(e){var t=Object(n.useState)(""),a=Object(s.a)(t,2),o=a[0],r=a[1],i=function(){""!==o&&(e.addTask(o),r(""),document.querySelector("#input").focus())};return c.a.createElement("div",{className:d.a.inputWrapper,id:"addCard"},c.a.createElement("input",{id:"input",placeholder:"New task...",className:d.a.input,value:o,onChange:function(e){r(e.target.value)},onKeyPress:function(e){"Enter"===e.key&&(e.preventDefault(),i())}}),c.a.createElement("div",{className:d.a.addButton+" "+e.color,style:""!==o?{opacity:1}:{opacity:.6},onClick:i},c.a.createElement("i",{className:"fas fa-plus-circle"})))},O=function(){var e=Object(l.f)().id,t=Object(n.useState)({}),a=Object(s.a)(t,2),o=a[0],r=a[1],i=Object(n.useState)(""),u=Object(s.a)(i,2),m=u[0],_=u[1],f=Object(n.useState)(N.a.default),p=Object(s.a)(f,2),v=p[0],k=p[1],h=Object(n.useState)(N.a.defaultB),O=Object(s.a)(h,2),g=O[0],S=O[1],B=Object(n.useState)(""),L=Object(s.a)(B,2),x=L[0],y=L[1];Object(n.useEffect)((function(){y(window.location.href),window.scrollTo({top:0,behavior:"smooth"})}),[]),Object(n.useEffect)((function(){w(e)}),[e]);var w=function(e){b.fetchList(e).then((function(e){switch(r(e.items),_(e.name),e.color){case"red":S(N.a.redB),k(N.a.red);break;case"blue":S(N.a.blueB),k(N.a.blue);break;case"green":S(N.a.greenB),k(N.a.green);break;case"dark":S(N.a.darkB),k(N.a.dark);break;default:S(N.a.defaultB),k(N.a.default)}}))},F=o?Object.entries(o).map((function(t){var a=Object(s.a)(t,2),n=a[0],o=a[1];if(o.done)return c.a.createElement(E,{colorF:v,done:o.done,text:o.text,key:n,id:n,list:e,update:w})})):null,A=o?Object.entries(o).map((function(t){var a=Object(s.a)(t,2),n=a[0],o=a[1];if(!o.done)return c.a.createElement(E,{colorF:v,done:o.done,text:o.text,key:n,id:n,list:e,update:w})})):null;return c.a.createElement("div",{className:"".concat(d.a.background," ").concat(g)},c.a.createElement(j,{title:m,listId:e,update:w,link:x,color:v}),c.a.createElement("div",{className:d.a.list},F,A,c.a.createElement(C,{addTask:function(t){b.addTask(e,t).then((function(t){t.name&&w(e),document.querySelector("#addCard").scrollIntoView({behavior:"auto"})}))},color:v}),c.a.createElement("div",{className:d.a.pseudoExtender})))},g=a(5),S=a.n(g),B=function(){var e=Object(n.useState)("red"),t=Object(s.a)(e,2),a=t[0],o=t[1],r=Object(n.useState)(""),i=Object(s.a)(r,2),u=i[0],d=i[1],m=Object(n.useState)(""),_=Object(s.a)(m,2),f=_[0],p=_[1],v=function(){b.createList(""!==u?u:"New list",a).then((function(e){p("/"+e.name)}))};return""!==f?c.a.createElement(l.a,{to:f}):c.a.createElement("div",{className:S.a.wrapper},c.a.createElement("div",{className:S.a.form},c.a.createElement("div",{className:S.a.input},c.a.createElement("input",{onKeyPress:function(e){"Enter"===e.key&&(e.preventDefault(),v())},placeholder:"New List...",value:u,onChange:function(e){return d(e.target.value)}})),c.a.createElement("div",{className:S.a.colorsSection},c.a.createElement("div",{className:S.a.colors},c.a.createElement("div",{className:("red"===a?S.a.colorActive:S.a.color)+" "+N.a.redB,onClick:function(){return o("red")}}),c.a.createElement("div",{className:("green"===a?S.a.colorActive:S.a.color)+" "+N.a.greenB,onClick:function(){return o("green")}}),c.a.createElement("div",{className:("blue"===a?S.a.colorActive:S.a.color)+" "+N.a.blueB,onClick:function(){return o("blue")}}),c.a.createElement("div",{className:("dark"===a?S.a.colorActive:S.a.color)+" "+N.a.darkB,onClick:function(){return o("dark")}}))),c.a.createElement("div",{className:S.a.buttonSection},c.a.createElement("div",{className:S.a.button,onClick:v},"Create List"))))},L=function(){return c.a.createElement("div",{className:"App"},c.a.createElement(i.a,null,c.a.createElement(l.b,{exact:!0,path:"/",component:B}),c.a.createElement(l.b,{exact:!0,path:"/:id",component:O})))};a(63),Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));r.a.render(c.a.createElement(c.a.StrictMode,null,c.a.createElement(L,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))},7:function(e,t,a){e.exports={card:"Card_card__3MKhb",grid:"Card_grid__3qjAA",btn:"Card_btn__1icHr",menuBtn:"Card_menuBtn__3nbt5",done:"Card_done__1-s6X",active:"Card_active__2XdAX",textDone:"Card_textDone__6XGo6",options:"Card_options__2zSzB",icon:"Card_icon__38c_C",input:"Card_input__1HGG_"}}},[[32,1,2]]]);
//# sourceMappingURL=main.863c039f.chunk.js.map