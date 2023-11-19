(()=>{"use strict";var t,e,i,s,o,n,r={750:(t,e,i)=>{i.d(e,{Z:()=>f});const s=i.p+"a13873777b2fbe8bc57c.png";var o=i.t(s);const n=i.p+"71859d34fb7ef011435e.png";var r=i.t(n);const a=i.p+"123a492c66ca59d7963e.png";var l=i.t(a);const c=i.p+"355478ebc90322d7810c.png";var h=i.t(c);const d=i.p+"ddf5c5c635876f5a4306.png";var p=i.t(d);const u=i.p+"2d9caf2cd6087569e2ff.png",f={aspectRatio:1.1,appearanceTime:200,destroyTime:300,fallSpeed:15,defaultImages:[o,r,l,h,p],blastImage:i.t(u)}},579:(t,e,i)=>{i.a(t,(async(t,e)=>{try{i(153);var s=i(760);const t=new(i(564).h);await t.load(),new s.l(t).init(),e()}catch(t){e(t)}}),1)},760:(t,e,i)=>{i.d(e,{l:()=>d});var s=i(750);const o="DefaultTile",n="BombTile";class r{_type="abstract";_appearanceTime=s.Z.appearanceTime;_destroyTime=s.Z.destroyTime;#t={};#e={};#i=s.Z.aspectRatio;#s=null;constructor(t,e,i,s,o,n){this.#s=n,this.context=t,this.image=o,this.width=s,this.#e={x:e,y:i}}getAspectRatio(){return this.#i}getType(){return this._type}getDestroyTime(){return this._destroyTime}getStartPosition(){return this.#e}getResourceLoader(){return this.#s}draw(t,e,i){throw Error("Метод должен быть определен в наследуемом классе")}appear(){const t=this._appearanceTime;return this.animateByTime((e=>{this.clear();const i=this.width/t,s=e>=t?this.width:i*e,o=this.#e.x+(this.width-s)/2,n=this.#e.y+(this.width-s)/2*this.#i;this.draw(o,n,s)}),t)}setTargetPosition(t,e){this.#t={x:t,y:e}}fall(){if(!(this.#t.y<=this.#e.y))return new Promise((t=>{let e=()=>{this.clear();const i=s.Z.fallSpeed;this.#e.y+=i,this.#e.y>this.#t.y&&(this.#e.y=this.#t.y),this.draw(this.#e.x,this.#e.y,this.width),this.#e.y<this.#t.y?requestAnimationFrame(e):t()};requestAnimationFrame(e)}))}clear(){this.context.clearRect(this.#e.x,this.#e.y,this.width,this.width*this.#i)}disappear(t=0){const e=this._destroyTime;return this.animateByTime((i=>{i=i<=t?0:i-t,this.clear();const s=this.width/e,o=i>=e?0:this.width-s*i,n=this.#e.x+(this.width-o)/2,r=this.#e.y+(this.width-o)/2*this.#i;this.draw(n,r,o)}),e+t)}animateByTime(t,e){return new Promise((i=>{let s=performance.now(),o=n=>{let r=n-s;r>0&&t(r),r<=e?requestAnimationFrame(o):i()};requestAnimationFrame(o)}))}}class a extends r{_type=o;draw(t,e,i){const s=i*this.getAspectRatio();this.context.drawImage(this.image,t,e,i,s)}}class l extends r{#o="#c0c0c0";_type=n;draw(t,e,i,s=1.4*Math.PI){const o=i*this.getAspectRatio();this.context.lineWidth=3,this.context.fillStyle=this.#o,this.context.strokeStyle=this.#o;let n=t+i/2,r=e+o/1.5,a=i/3;this.context.beginPath(),this.context.arc(n,r,a,0,2*Math.PI),this.context.fill();let l=a/1.8,c=n-l/2,h=r-a-l/3;this.context.fillRect(c,h,l,l),this.fuseRadius=a/2,this.fuseX=n+this.fuseRadius,this.fuseY=h,this.context.beginPath(),this.context.arc(this.fuseX,this.fuseY,this.fuseRadius,Math.PI,s),this.context.stroke()}disappear(t=0){const e=3*this.getDestroyTime(),i=this.getResourceLoader().getBlastTileImage();return this.animateByTime((s=>{s=s<=t?0:s-t,this.clear();const o=e/3,n=.9*(e-o);if(s<o){const t=s>=o?Math.PI:Math.PI*(1.4-s/o*.4);if(this.draw(this.getStartPosition().x,this.getStartPosition().y,this.width,t),s>0){const e=this.width/3,s=this.fuseX+Math.cos(t)*this.fuseRadius-e/2,o=this.fuseY+Math.sin(t)*this.fuseRadius-e/2;this.context.drawImage(i,s,o,e,e)}}else if(s<o+n){const t=s-o,r=this.width/n,a=2*(s>=e?0:r*t),l=this.getStartPosition().x+(this.width-a)/2,c=this.getStartPosition().y+(this.width-a)/2*this.getAspectRatio();this.context.drawImage(i,l,c,a,a)}else{const t=2*this.width,e=this.getStartPosition().x+(this.width-t)/2,i=this.getStartPosition().y+(this.width-t)/2*this.getAspectRatio();this.context.clearRect(e,i,t,t*this.getAspectRatio())}}),e+t)}}class c{static create(t,...e){switch(t){case o:return new a(...e);case n:return new l(...e)}}}class h{#n={tilesDestroy:()=>{},hasNotAllowAction:()=>{}};#r=[];constructor(t,e){this.resourceLoader=e,this.context=t.getContext("2d"),t.addEventListener("click",this.onClick.bind(this)),this.numberRows=8,this.numberColumns=8,this.width=540,this.minTilesToClick=2,this.fieldMap=[],this.tileWidth=this.width/this.numberColumns,this.tileHeight=this.tileWidth*s.Z.aspectRatio,this.height=this.tileHeight*this.numberRows,this.inProcess=!1,t.height=this.height}addEventListener(t,e){this.#n.hasOwnProperty(t)&&(this.#n[t]=e)}fireEvent(t,...e){this.#n.hasOwnProperty(t)&&"function"==typeof this.#n[t]&&this.#n[t](...e)}fill(){for(let t=0;t<this.numberColumns;t++){this.fieldMap[t]=[];for(let e=0;e<this.numberRows;e++)this.createTile(t,e).appear().then()}this.hasAllowAction()||this.fireEvent("hasNotAllowAction")}createTile(t,e,i=o){const s=c.create(i,this.context,t*this.tileWidth,e*this.tileHeight,this.tileWidth,this.getRandomImage(),this.resourceLoader);return this.fieldMap[t][e]=s,s}createBomb(t,e){return this.createTile(t,e,n)}getRandomImage(){const t=this.resourceLoader.getDefaultTileImages();let e=this.colorNumbers&&this.colorNumbers<t.length?this.colorNumbers:t.length;return t[Math.floor(Math.random()*e)]}setColorNumbers(t){this.colorNumbers=t}async onClick(t){if(this.inProcess)return;this.inProcess=!0;const e=Math.floor(t.offsetX/this.tileWidth),i=Math.floor(t.offsetY/this.tileHeight),s=this.fieldMap[e][i];let r=0;switch(s.getType()){case o:const t=s.image;if(r=this.collectByColor(e,i,t),r<this.minTilesToClick)return this.clearCollection(),void(this.inProcess=!1);r=await this.destroyCollection(e,i),r>=6&&await this.createBomb(e,i).appear();break;case n:this.collectByRadius(e,i,2),r=await this.destroyCollection(e,i)}this.fireEvent("tilesDestroy",r),await this.topUp(),this.hasAllowAction()||this.fireEvent("hasNotAllowAction"),this.inProcess=!1}collectByRadius(t,e,i){for(let s=t-i;s<=t+i;s++)for(let t=e-i;t<=e+i;t++){const e=this.fieldMap[s]?.[t];this.#r[s]||(this.#r[s]=[]),e&&!this.#r[s][t]&&(this.#r[s][t]=!0,e.getType()===n&&this.collectByRadius(s,t,2))}}collectByColor(t,e,i){let s=0,n=(t,e)=>{const r=this.fieldMap[t]?.[e];this.#r[t]||(this.#r[t]=[]),r&&r.getType()===o&&!this.#r[t][e]&&r.image===i&&(this.#r[t][e]=!0,s++,n(t-1,e),n(t+1,e),n(t,e-1),n(t,e+1))};return n(t,e),s}destroyCollection(t,e){let i=0;const s=[],o=this.fieldMap[t][e];let r=0;return o.getType()===n&&(r=o.getDestroyTime()),this.#r.forEach(((n,a)=>{n.forEach(((n,l)=>{const c=this.fieldMap[a][l];let h=r+100*Math.max(Math.abs(a-t),Math.abs(l-e));c===o&&(h=0),s.push(c.disappear(h)),this.fieldMap[a][l]=null,i++}))})),this.clearCollection(),Promise.all(s).then((()=>i))}clearCollection(){this.#r=[]}async topUp(){let t=[],e=[];for(let i=0;i<this.numberColumns;i++){let s=[];for(let e=this.numberRows-1;e>=0;e--){const o=this.fieldMap[i][e];if(o){if(s.length){const n=s.shift();this.fieldMap[i][e]=null,this.fieldMap[i][n]=o,o.setTargetPosition(i*this.tileWidth,n*this.tileHeight),s.push(e),t.push(o.fall())}}else s.push(e)}s.map((t=>{e.push(this.createTile(i,t))}))}await Promise.all(t),await Promise.all(e.map((t=>t.appear())))}hasAllowAction(){for(let t=0;t<this.numberColumns;t++)for(let e=0;e<this.numberRows;e++){const i=this.fieldMap[t][e];switch(i.getType()){case o:const s=i.image;if(this.collectByColor(t,e,s)>=this.minTilesToClick)return this.clearCollection(),!0;break;case n:return this.clearCollection(),!0}}return this.clearCollection(),!1}}class d{#a=1;#l=0;#c=0;#h=0;#d=0;constructor(t){const e=document.getElementById("game-field");this.field=new h(e,t),this.field.addEventListener("tilesDestroy",this.onTilesDestroy.bind(this)),this.field.addEventListener("hasNotAllowAction",this.showNotAllowActionWindow.bind(this)),this.movesElement=document.getElementById("moves"),this.scopesElement=document.getElementById("scopes"),this.progressElement=document.getElementById("progress"),this.levelWindow=document.getElementById("level-window"),this.levelElement=document.getElementById("level"),this.currentLevelElement=document.getElementById("current-level"),this.loseWindow=document.getElementById("lose-window"),this.notAllowActionWindow=document.getElementById("not-allow-action-window")}init(){this.generateNewLevel()}generateNewLevel(){this.levelElement.textContent=this.#a,this.currentLevelElement.textContent=this.#a;let t=this.calculateMoves(this.#a),e=this.calculateTargetScore(this.#a),i=this.calculateColorNumbers(this.#a);this.field.setColorNumbers(i),this.setScope(0),this.setMoves(t),this.#h=e,this.#d=1,this.showLevelWindow()}showLevelWindow(){setTimeout((()=>{this.levelWindow.style.opacity="0",this.levelWindow.style.pointerEvents="none",this.field.fill()}),1500),this.levelWindow.style.opacity="1",this.levelWindow.style.pointerEvents="auto"}showLoseWindow(){setTimeout((()=>{this.loseWindow.style.opacity="0",this.loseWindow.style.pointerEvents="none",this.generateNewLevel()}),1500),this.loseWindow.style.visibility="visible",this.loseWindow.style.opacity="1",this.loseWindow.style.pointerEvents="auto"}showNotAllowActionWindow(){setTimeout((()=>{this.notAllowActionWindow.style.visibility="visible",this.notAllowActionWindow.style.opacity="1",this.notAllowActionWindow.style.pointerEvents="auto",setTimeout((()=>{this.#d>0?(this.#d--,this.field.fill()):this.showLoseWindow(),this.notAllowActionWindow.style.opacity="0",this.notAllowActionWindow.style.pointerEvents="none"}),1e3)}),1e3)}setScope(t){this.#c=t,this.scopesElement.textContent=t,t>this.#h&&(t=this.#h);let e=t/this.#h*100;this.progressElement.style.width=e+"%"}setMoves(t){this.#l=t,this.movesElement.textContent=t}onTilesDestroy(t){if(!t)return;let e=this.calculateScore(t),i=this.#c+e,s=this.#l;return s--,i>=this.#h?this.win():s<=0?this.lose():(this.setMoves(s),void this.setScope(i))}calculateScore(t){let e=1;for(let i=0;i<t;i++)e+=3;return e}calculateMoves(t){return 10+Math.floor(t/3)}calculateTargetScore(t){return 100+30*t}calculateColorNumbers(t){return 3+Math.floor(t/3)}win(){this.#a++,this.generateNewLevel()}lose(){this.#a=1,this.showLoseWindow()}}},564:(t,e,i)=>{i.d(e,{h:()=>o});var s=i(750);class o{#p=[];#u=null;constructor(){this.loaded=!1}async load(){const t=[];s.Z.defaultImages.forEach((e=>{let i=new Image;i.src=e.default,this.#p.push(i),t.push(new Promise((t=>{i.onload=i.onerror=t})))}));let e=new Image;return e.src=s.Z.blastImage.default,this.#u=e,t.push(new Promise((t=>{e.onload=e.onerror=t}))),Promise.all(t).then((()=>{this.loaded=!0}))}checkLoadStatus(){if(!this.loaded)throw new Error("Resources has not loaded")}getDefaultTileImages(){return this.checkLoadStatus(),this.#p}getBlastTileImage(){return this.checkLoadStatus(),this.#u}}},982:(t,e,i)=>{i.d(e,{Z:()=>f});var s=i(81),o=i.n(s),n=i(645),r=i.n(n),a=i(667),l=i.n(a),c=new URL(i(637),i.b),h=new URL(i(730),i.b),d=r()(o()),p=l()(c),u=l()(h);d.push([t.id,`.game-area{background:#86ffff;padding:5px;border-radius:25px}.game-area__content{background:#0d233d;padding:10px;border-radius:20px;box-shadow:0 0 10px 2px #0d233d;position:relative}.game-area__window{position:absolute;top:5px;left:5px;right:5px;bottom:5px;border-radius:20px;display:flex;flex-direction:column;align-items:center;justify-content:center;transition:opacity 1s}.lose{opacity:0;visibility:hidden;pointer-events:none;background:#c62f2f}.lose__text{font-size:24px;width:200px}.level{background:#20549a;opacity:0}.level__text{font-size:36px}.level__value{font-size:48px}.allow-action{opacity:0;background:rgba(32,84,154,.5);visibility:hidden;pointer-events:none}.allow-action__text{font-size:26px}.scopes{width:300px;height:300px;background:#86ffff;padding:5px;border-radius:25px}.scopes__content{background:#20549a;width:100%;height:100%;padding:10px;border-radius:20px;box-shadow:0 0 5px 2px #163d6b,inset 0 0 4px 0 #86ffff;display:flex;flex-direction:column;align-items:center}.scopes__moves{width:68%;height:68%;background:url(${p}) no-repeat;background-size:contain;display:flex;align-items:center;justify-content:center}.scopes__moves-value{font-size:60px}.scopes__scope{width:85%;height:30%;background:linear-gradient(#0d233d 0%, #0d233d 30%, #20549a 150%);border-radius:10px;display:flex;flex-direction:column;align-items:center;justify-content:center;box-shadow:inset 0 0 10px 1px #0d233d,0 0 4px -1px #86ffff}.scopes__scope-text{font-size:20px;line-height:20px}.scopes__scope-value{font-size:36px;line-height:42px}.progress{width:450px;height:80px;background:#0d233d;padding:10px 12px 15px;border-radius:0 0 15px 15px;display:flex;flex-direction:column;align-items:center;justify-content:space-between}.progress__text{font-size:20px;line-height:20px}.progress__line{background:#00132b;width:100%;height:30px;border-radius:15px;box-shadow:0 0 50px -5px #20549a;border-bottom:1px solid #20549a;background:linear-gradient(#00132b 0%, #00132b 40%, #0d233d 100%);padding:1px;overflow:hidden}.progress__value{width:0;height:100%;border-radius:15px;background:linear-gradient(#e7ffbd 0, #a1fe00 10%, #219e00 70%, #5ffd00 100%);transition:width 1s ease-in-out}.button{background:linear-gradient(#f293fc 0, #b32fd2 30%, #5a0775 70%, #7115e6 100%);display:flex;align-items:center;justify-content:center;width:150px;height:50px;border-radius:25px;font-size:20px}.level-button{display:flex;flex-direction:column;align-items:center;justify-content:center;height:80px}@font-face{font-family:Marvin;src:url(${u})}*{padding:0;margin:0;box-sizing:border-box}.app{width:100vw;height:100%;min-height:100vh;background:#17828f;color:#fff;font-family:Marvin,serif}.wrapper{max-width:940px;margin:0 auto;display:flex;flex-direction:column}.content{display:grid;grid-template-columns:2fr 1fr;column-gap:10px;row-gap:30px;justify-items:center}`,""]);const f=d},645:t=>{t.exports=function(t){var e=[];return e.toString=function(){return this.map((function(e){var i="",s=void 0!==e[5];return e[4]&&(i+="@supports (".concat(e[4],") {")),e[2]&&(i+="@media ".concat(e[2]," {")),s&&(i+="@layer".concat(e[5].length>0?" ".concat(e[5]):""," {")),i+=t(e),s&&(i+="}"),e[2]&&(i+="}"),e[4]&&(i+="}"),i})).join("")},e.i=function(t,i,s,o,n){"string"==typeof t&&(t=[[null,t,void 0]]);var r={};if(s)for(var a=0;a<this.length;a++){var l=this[a][0];null!=l&&(r[l]=!0)}for(var c=0;c<t.length;c++){var h=[].concat(t[c]);s&&r[h[0]]||(void 0!==n&&(void 0===h[5]||(h[1]="@layer".concat(h[5].length>0?" ".concat(h[5]):""," {").concat(h[1],"}")),h[5]=n),i&&(h[2]?(h[1]="@media ".concat(h[2]," {").concat(h[1],"}"),h[2]=i):h[2]=i),o&&(h[4]?(h[1]="@supports (".concat(h[4],") {").concat(h[1],"}"),h[4]=o):h[4]="".concat(o)),e.push(h))}},e}},667:t=>{t.exports=function(t,e){return e||(e={}),t?(t=String(t.__esModule?t.default:t),/^['"].*['"]$/.test(t)&&(t=t.slice(1,-1)),e.hash&&(t+=e.hash),/["'() \t\n]|(%20)/.test(t)||e.needQuotes?'"'.concat(t.replace(/"/g,'\\"').replace(/\n/g,"\\n"),'"'):t):t}},81:t=>{t.exports=function(t){return t[1]}},153:(t,e,i)=>{var s=i(379),o=i.n(s),n=i(795),r=i.n(n),a=i(569),l=i.n(a),c=i(565),h=i.n(c),d=i(216),p=i.n(d),u=i(589),f=i.n(u),m=i(982),g={};g.styleTagTransform=f(),g.setAttributes=h(),g.insert=l().bind(null,"head"),g.domAPI=r(),g.insertStyleElement=p(),o()(m.Z,g),m.Z&&m.Z.locals&&m.Z.locals},379:t=>{var e=[];function i(t){for(var i=-1,s=0;s<e.length;s++)if(e[s].identifier===t){i=s;break}return i}function s(t,s){for(var n={},r=[],a=0;a<t.length;a++){var l=t[a],c=s.base?l[0]+s.base:l[0],h=n[c]||0,d="".concat(c," ").concat(h);n[c]=h+1;var p=i(d),u={css:l[1],media:l[2],sourceMap:l[3],supports:l[4],layer:l[5]};if(-1!==p)e[p].references++,e[p].updater(u);else{var f=o(u,s);s.byIndex=a,e.splice(a,0,{identifier:d,updater:f,references:1})}r.push(d)}return r}function o(t,e){var i=e.domAPI(e);return i.update(t),function(e){if(e){if(e.css===t.css&&e.media===t.media&&e.sourceMap===t.sourceMap&&e.supports===t.supports&&e.layer===t.layer)return;i.update(t=e)}else i.remove()}}t.exports=function(t,o){var n=s(t=t||[],o=o||{});return function(t){t=t||[];for(var r=0;r<n.length;r++){var a=i(n[r]);e[a].references--}for(var l=s(t,o),c=0;c<n.length;c++){var h=i(n[c]);0===e[h].references&&(e[h].updater(),e.splice(h,1))}n=l}}},569:t=>{var e={};t.exports=function(t,i){var s=function(t){if(void 0===e[t]){var i=document.querySelector(t);if(window.HTMLIFrameElement&&i instanceof window.HTMLIFrameElement)try{i=i.contentDocument.head}catch(t){i=null}e[t]=i}return e[t]}(t);if(!s)throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");s.appendChild(i)}},216:t=>{t.exports=function(t){var e=document.createElement("style");return t.setAttributes(e,t.attributes),t.insert(e,t.options),e}},565:(t,e,i)=>{t.exports=function(t){var e=i.nc;e&&t.setAttribute("nonce",e)}},795:t=>{t.exports=function(t){if("undefined"==typeof document)return{update:function(){},remove:function(){}};var e=t.insertStyleElement(t);return{update:function(i){!function(t,e,i){var s="";i.supports&&(s+="@supports (".concat(i.supports,") {")),i.media&&(s+="@media ".concat(i.media," {"));var o=void 0!==i.layer;o&&(s+="@layer".concat(i.layer.length>0?" ".concat(i.layer):""," {")),s+=i.css,o&&(s+="}"),i.media&&(s+="}"),i.supports&&(s+="}");var n=i.sourceMap;n&&"undefined"!=typeof btoa&&(s+="\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(n))))," */")),e.styleTagTransform(s,t,e.options)}(e,t,i)},remove:function(){!function(t){if(null===t.parentNode)return!1;t.parentNode.removeChild(t)}(e)}}}},589:t=>{t.exports=function(t,e){if(e.styleSheet)e.styleSheet.cssText=t;else{for(;e.firstChild;)e.removeChild(e.firstChild);e.appendChild(document.createTextNode(t))}}},730:(t,e,i)=>{t.exports=i.p+"0b0440dad1201b851ced.otf"},637:(t,e,i)=>{t.exports=i.p+"d9487300b20c4c238ac1.png"}},a={};function l(t){var e=a[t];if(void 0!==e)return e.exports;var i=a[t]={id:t,exports:{}};return r[t](i,i.exports,l),i.exports}l.m=r,t="function"==typeof Symbol?Symbol("webpack queues"):"__webpack_queues__",e="function"==typeof Symbol?Symbol("webpack exports"):"__webpack_exports__",i="function"==typeof Symbol?Symbol("webpack error"):"__webpack_error__",s=t=>{t&&t.d<1&&(t.d=1,t.forEach((t=>t.r--)),t.forEach((t=>t.r--?t.r++:t())))},l.a=(o,n,r)=>{var a;r&&((a=[]).d=-1);var l,c,h,d=new Set,p=o.exports,u=new Promise(((t,e)=>{h=e,c=t}));u[e]=p,u[t]=t=>(a&&t(a),d.forEach(t),u.catch((t=>{}))),o.exports=u,n((o=>{var n;l=(o=>o.map((o=>{if(null!==o&&"object"==typeof o){if(o[t])return o;if(o.then){var n=[];n.d=0,o.then((t=>{r[e]=t,s(n)}),(t=>{r[i]=t,s(n)}));var r={};return r[t]=t=>t(n),r}}var a={};return a[t]=t=>{},a[e]=o,a})))(o);var r=()=>l.map((t=>{if(t[i])throw t[i];return t[e]})),c=new Promise((e=>{(n=()=>e(r)).r=0;var i=t=>t!==a&&!d.has(t)&&(d.add(t),t&&!t.d&&(n.r++,t.push(n)));l.map((e=>e[t](i)))}));return n.r?c:r()}),(t=>(t?h(u[i]=t):c(p),s(a)))),a&&a.d<0&&(a.d=0)},l.n=t=>{var e=t&&t.__esModule?()=>t.default:()=>t;return l.d(e,{a:e}),e},n=Object.getPrototypeOf?t=>Object.getPrototypeOf(t):t=>t.__proto__,l.t=function(t,e){if(1&e&&(t=this(t)),8&e)return t;if("object"==typeof t&&t){if(4&e&&t.__esModule)return t;if(16&e&&"function"==typeof t.then)return t}var i=Object.create(null);l.r(i);var s={};o=o||[null,n({}),n([]),n(n)];for(var r=2&e&&t;"object"==typeof r&&!~o.indexOf(r);r=n(r))Object.getOwnPropertyNames(r).forEach((e=>s[e]=()=>t[e]));return s.default=()=>t,l.d(i,s),i},l.d=(t,e)=>{for(var i in e)l.o(e,i)&&!l.o(t,i)&&Object.defineProperty(t,i,{enumerable:!0,get:e[i]})},l.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(t){if("object"==typeof window)return window}}(),l.o=(t,e)=>Object.prototype.hasOwnProperty.call(t,e),l.r=t=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},(()=>{var t;l.g.importScripts&&(t=l.g.location+"");var e=l.g.document;if(!t&&e&&(e.currentScript&&(t=e.currentScript.src),!t)){var i=e.getElementsByTagName("script");if(i.length)for(var s=i.length-1;s>-1&&!t;)t=i[s--].src}if(!t)throw new Error("Automatic publicPath is not supported in this browser");t=t.replace(/#.*$/,"").replace(/\?.*$/,"").replace(/\/[^\/]+$/,"/"),l.p=t})(),l.b=document.baseURI||self.location.href,l.nc=void 0,l(579)})();