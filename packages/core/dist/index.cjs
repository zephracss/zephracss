"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var e=require("node:process"),o=require("node:os"),t=require("node:tty");function n(e){return e&&"object"==typeof e&&"default"in e?e:{default:e}}var r=n(e),s=n(o),i=n(t),c=function(e){return e.replace(/^\/|\/$/g,"")},l=new RegExp("".concat(c(/(\d+\.?\d*)/g.source),"(%|").concat(c(/(px|rem|em|vh|vw|vmin|vmax|vb|vi|ch|cm|mm|in|pt|pc|ex|%|zp)?/g.source),")?"));new RegExp("(".concat(c(l.source),"|[").concat(c(l.source),"])"));var a=function(e){return e.replace(/^\/|\/$/g,"")};const u=(e=0)=>o=>`[${o+e}m`,f=(e=0)=>o=>`[${38+e};5;${o}m`,d=(e=0)=>(o,t,n)=>`[${38+e};2;${o};${t};${n}m`,g={modifier:{reset:[0,0],bold:[1,22],dim:[2,22],italic:[3,23],underline:[4,24],overline:[53,55],inverse:[7,27],hidden:[8,28],strikethrough:[9,29]},color:{black:[30,39],red:[31,39],green:[32,39],yellow:[33,39],blue:[34,39],magenta:[35,39],cyan:[36,39],white:[37,39],blackBright:[90,39],gray:[90,39],grey:[90,39],redBright:[91,39],greenBright:[92,39],yellowBright:[93,39],blueBright:[94,39],magentaBright:[95,39],cyanBright:[96,39],whiteBright:[97,39]},bgColor:{bgBlack:[40,49],bgRed:[41,49],bgGreen:[42,49],bgYellow:[43,49],bgBlue:[44,49],bgMagenta:[45,49],bgCyan:[46,49],bgWhite:[47,49],bgBlackBright:[100,49],bgGray:[100,49],bgGrey:[100,49],bgRedBright:[101,49],bgGreenBright:[102,49],bgYellowBright:[103,49],bgBlueBright:[104,49],bgMagentaBright:[105,49],bgCyanBright:[106,49],bgWhiteBright:[107,49]}};Object.keys(g.modifier);Object.keys(g.color),Object.keys(g.bgColor);const b=function(){const e=new Map;for(const[o,t]of Object.entries(g)){for(const[o,n]of Object.entries(t))g[o]={open:`[${n[0]}m`,close:`[${n[1]}m`},t[o]=g[o],e.set(n[0],n[1]);Object.defineProperty(g,o,{value:t,enumerable:!1})}return Object.defineProperty(g,"codes",{value:e,enumerable:!1}),g.color.close="[39m",g.bgColor.close="[49m",g.color.ansi=u(),g.color.ansi256=f(),g.color.ansi16m=d(),g.bgColor.ansi=u(10),g.bgColor.ansi256=f(10),g.bgColor.ansi16m=d(10),Object.defineProperties(g,{rgbToAnsi256:{value:(e,o,t)=>e===o&&o===t?e<8?16:e>248?231:Math.round((e-8)/247*24)+232:16+36*Math.round(e/255*5)+6*Math.round(o/255*5)+Math.round(t/255*5),enumerable:!1},hexToRgb:{value(e){const o=/[a-f\d]{6}|[a-f\d]{3}/i.exec(e.toString(16));if(!o)return[0,0,0];let[t]=o;3===t.length&&(t=[...t].map((e=>e+e)).join(""));const n=Number.parseInt(t,16);return[n>>16&255,n>>8&255,255&n]},enumerable:!1},hexToAnsi256:{value:e=>g.rgbToAnsi256(...g.hexToRgb(e)),enumerable:!1},ansi256ToAnsi:{value(e){if(e<8)return 30+e;if(e<16)return e-8+90;let o,t,n;if(e>=232)o=(10*(e-232)+8)/255,t=o,n=o;else{const r=(e-=16)%36;o=Math.floor(e/36)/5,t=Math.floor(r/6)/5,n=r%6/5}const r=2*Math.max(o,t,n);if(0===r)return 30;let s=30+(Math.round(n)<<2|Math.round(t)<<1|Math.round(o));return 2===r&&(s+=60),s},enumerable:!1},rgbToAnsi:{value:(e,o,t)=>g.ansi256ToAnsi(g.rgbToAnsi256(e,o,t)),enumerable:!1},hexToAnsi:{value:e=>g.ansi256ToAnsi(g.hexToAnsi256(e)),enumerable:!1}}),g}();function p(e,o=(globalThis.Deno?globalThis.Deno.args:r.default.argv)){const t=e.startsWith("-")?"":1===e.length?"-":"--",n=o.indexOf(t+e),s=o.indexOf("--");return-1!==n&&(-1===s||n<s)}const{env:h}=r.default;let m;function v(e,{streamIsTTY:o,sniffFlags:t=!0}={}){const n=function(){if("FORCE_COLOR"in h)return"true"===h.FORCE_COLOR?1:"false"===h.FORCE_COLOR?0:0===h.FORCE_COLOR.length?1:Math.min(Number.parseInt(h.FORCE_COLOR,10),3)}();void 0!==n&&(m=n);const i=t?m:n;if(0===i)return 0;if(t){if(p("color=16m")||p("color=full")||p("color=truecolor"))return 3;if(p("color=256"))return 2}if("TF_BUILD"in h&&"AGENT_NAME"in h)return 1;if(e&&!o&&void 0===i)return 0;const c=i||0;if("dumb"===h.TERM)return c;if("win32"===r.default.platform){const e=s.default.release().split(".");return Number(e[0])>=10&&Number(e[2])>=10586?Number(e[2])>=14931?3:2:1}if("CI"in h)return"GITHUB_ACTIONS"in h?3:["TRAVIS","CIRCLECI","APPVEYOR","GITLAB_CI","BUILDKITE","DRONE"].some((e=>e in h))||"codeship"===h.CI_NAME?1:c;if("TEAMCITY_VERSION"in h)return/^(9\.(0*[1-9]\d*)\.|\d{2,}\.)/.test(h.TEAMCITY_VERSION)?1:0;if("truecolor"===h.COLORTERM)return 3;if("xterm-kitty"===h.TERM)return 3;if("TERM_PROGRAM"in h){const e=Number.parseInt((h.TERM_PROGRAM_VERSION||"").split(".")[0],10);switch(h.TERM_PROGRAM){case"iTerm.app":return e>=3?3:2;case"Apple_Terminal":return 2}}return/-256(color)?$/i.test(h.TERM)?2:/^screen|^xterm|^vt100|^vt220|^rxvt|color|ansi|cygwin|linux/i.test(h.TERM)||"COLORTERM"in h?1:c}function O(e,o={}){return function(e){return 0!==e&&{level:e,hasBasic:!0,has256:e>=2,has16m:e>=3}}(v(e,{streamIsTTY:e&&e.isTTY,...o}))}p("no-color")||p("no-colors")||p("color=false")||p("color=never")?m=0:(p("color")||p("colors")||p("color=true")||p("color=always"))&&(m=1);const $={stdout:O({isTTY:i.default.isatty(1)}),stderr:O({isTTY:i.default.isatty(2)})};function R(e,o,t){let n=e.indexOf(o);if(-1===n)return e;const r=o.length;let s=0,i="";do{i+=e.slice(s,n)+o+t,s=n+r,n=e.indexOf(o,s)}while(-1!==n);return i+=e.slice(s),i}const{stdout:y,stderr:T}=$,E=Symbol("GENERATOR"),x=Symbol("STYLER"),w=Symbol("IS_EMPTY"),j=["ansi","ansi","ansi256","ansi16m"],A=Object.create(null),C=e=>{const o=(...e)=>e.join(" ");return((e,o={})=>{if(o.level&&!(Number.isInteger(o.level)&&o.level>=0&&o.level<=3))throw new Error("The `level` option should be an integer from 0 to 3");const t=y?y.level:0;e.level=void 0===o.level?t:o.level})(o,e),Object.setPrototypeOf(o,M.prototype),o};function M(e){return C(e)}Object.setPrototypeOf(M.prototype,Function.prototype);for(const[e,o]of Object.entries(b))A[e]={get(){const t=_(this,P(o.open,o.close,this[x]),this[w]);return Object.defineProperty(this,e,{value:t}),t}};A.visible={get(){const e=_(this,this[x],!0);return Object.defineProperty(this,"visible",{value:e}),e}};const B=(e,o,t,...n)=>"rgb"===e?"ansi16m"===o?b[t].ansi16m(...n):"ansi256"===o?b[t].ansi256(b.rgbToAnsi256(...n)):b[t].ansi(b.rgbToAnsi(...n)):"hex"===e?B("rgb",o,t,...b.hexToRgb(...n)):b[t][e](...n),I=["rgb","hex","ansi256"];for(const e of I){A[e]={get(){const{level:o}=this;return function(...t){const n=P(B(e,j[o],"color",...t),b.color.close,this[x]);return _(this,n,this[w])}}};A["bg"+e[0].toUpperCase()+e.slice(1)]={get(){const{level:o}=this;return function(...t){const n=P(B(e,j[o],"bgColor",...t),b.bgColor.close,this[x]);return _(this,n,this[w])}}}}const N=Object.defineProperties((()=>{}),{...A,level:{enumerable:!0,get(){return this[E].level},set(e){this[E].level=e}}}),P=(e,o,t)=>{let n,r;return void 0===t?(n=e,r=o):(n=t.openAll+e,r=o+t.closeAll),{open:e,close:o,openAll:n,closeAll:r,parent:t}},_=(e,o,t)=>{const n=(...e)=>S(n,1===e.length?""+e[0]:e.join(" "));return Object.setPrototypeOf(n,N),n[E]=e,n[x]=o,n[w]=t,n},S=(e,o)=>{if(e.level<=0||!o)return e[w]?"":o;let t=e[x];if(void 0===t)return o;const{openAll:n,closeAll:r}=t;if(o.includes(""))for(;void 0!==t;)o=R(o,t.close,t.open),t=t.parent;const s=o.indexOf("\n");return-1!==s&&(o=function(e,o,t,n){let r=0,s="";do{const i="\r"===e[n-1];s+=e.slice(r,i?n-1:n)+o+(i?"\r\n":"\n")+t,r=n+1,n=e.indexOf("\n",r)}while(-1!==n);return s+=e.slice(r),s}(o,r,n,s)),n+o+r};Object.defineProperties(M.prototype,A);const k=M();M({level:T?T.level:0});k.yellowBright('\n oooooooooooo \nd\'""""""d888\' \n      .888P   \n     d888\'    \n   .888P      \n  d888\'    .P \n.8888888888P\n');const L=e=>{if("string"==typeof e)return e;let o="";for(const[n,r]of Object.entries(e))o+=`\n    ${t=n,t.replace(/[A-Z]/g,(e=>`-${e.toLowerCase()}`))}: ${r};`;var t;return o};let Y=null,G=null;const F=e=>{const o=(e=>{const o=e?.presets,t=e?.extend;if(!o)return{classNames:new Set,variants:new Set};const n=new Set,r=new Set;if(t?.fonts)for(const[e,o]of Object.entries(t?.fonts))n.add([new RegExp(`font-${e}`),`font-family: ${o.join(", ")}`]);if(t?.colors)for(const[e,o]of Object.entries(t?.colors))if("string"!=typeof o)for(const t of Object.keys(o))n.add([new RegExp(`color-${e}-${t}`),`color: ${o[t]}`]),n.add([new RegExp(`bg-${e}-${t}`),`background-color: ${o[t]}`]),n.add([new RegExp(`border-${e}-${t}`),`border-color: ${o[t]}`]);else n.add([new RegExp(`color-${e}`),`color: ${o}`]),n.add([new RegExp(`bg-${e}`),`background-color: ${o}`]),n.add([new RegExp(`border-${e}`),`border-color: ${o}`]);if(t?.rules)for(const e of Object.values(t?.rules)){const{match:o}=e;n.add([o,e])}for(const e of o){const{rules:o,colors:t,variants:s}=e;if(s)for(const e of Object.values(s)){const{match:o}=e;r.add([o,e])}for(const e of Object.values(o)){const{match:o}=e;n.add([o,e])}for(const[e,o]of Object.entries(t))if("string"!=typeof o)for(const t of Object.keys(o))n.add([new RegExp(`color-${e}-${t}`),`color: ${o[t]}`]),n.add([new RegExp(`bg-${e}-${t}`),`background-color: ${o[t]}`]),n.add([new RegExp(`border-${e}-${t}`),`border-color: ${o[t]}`]);else n.add([new RegExp(`color-${e}`),`color: ${o}`]),n.add([new RegExp(`bg-${e}`),`background-color: ${o}`]),n.add([new RegExp(`border-${e}`),`border-color: ${o}`])}return{classNames:n,variants:r}})(e);Y=o.classNames,G=o.variants};const D=e=>e.replace(/([^\w_-])/g,"\\$1"),z=new Set;var V=async(e,o,t)=>{const n=await(async(e,o)=>{Y&&G||F(e);const t=new Set;for(const[e,n]of Y){const r=new RegExp(`(?:(\\w+):)?${a(e.source)}`,"g"),s=o.match(r);if(s)for(const o of s){const r=o.match(new RegExp(`(?:(\\w+):)?${a(e.source)}`)),s=r?.[1];if(s){const e=Array.from(G).find((([e])=>e===s));if(e){const[o,s]=e;t.add([r[0],s,n,...r.slice(2)]);continue}}Array.from(t).some((([e])=>e===r[0]))||r&&t.add([r[0],void 0,n,...r.slice(2)])}}return t})(e,o);let r=t?[]:"";var s;console.log((s=`Detected ${n.size} zephra class${1===n.size?"":"es"}`,k.blueBright("zephra: ".concat(s))));for(const[o,t,s,...i]of n){if(t){const{generate:n}=t;if("string"==typeof s){const{append:c,css:l}=n(e,o,s,...i);if(z.has(o))continue;if("object"==typeof r){r.push({className:o,append:c,variant:t,css:l});continue}r+=`\n.${D(o)+c} {\n    ${l}\n}\n`,z.add(o);continue}const c=s.generate(e,o,...i),{append:l,css:a}=n(e,o,c,...i);if(z.has(o))continue;if("object"==typeof r){r.push({className:o,append:l,variant:t,css:a});continue}r+=`\n.${D(o)+l} {\n    ${L(a)}\n}\n`,z.add(o);continue}if("string"==typeof s){if(z.has(o))continue;"object"==typeof r?r.push({className:o,css:s}):r+=`\n.${o} {\n    ${s}\n}\n`,z.add(o);continue}const{generate:n}=s;z.has(o)||("object"!=typeof r?(r+=`\n.${D(o)} {${L(n(e,o,...i))}\n}\n`,z.add(o)):r.push({className:o,variant:s,css:n(e,o,...i)}))}return"object"==typeof r?r:e?.minify?r.replace(/\n/g,"").replace(/\s\s+/g," "):r};exports.build=V,exports.default=V,exports.defineConfig=e=>e,exports.recomputeClassNames=F;
