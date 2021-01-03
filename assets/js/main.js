(()=>{var e={802:e=>{function n(e){return e instanceof Map?e.clear=e.delete=e.set=function(){throw new Error("map is read-only")}:e instanceof Set&&(e.add=e.clear=e.delete=function(){throw new Error("set is read-only")}),Object.freeze(e),Object.getOwnPropertyNames(e).forEach((function(t){var a=e[t];"object"!=typeof a||Object.isFrozen(a)||n(a)})),e}var t=n,a=n;t.default=a;class s{constructor(e){void 0===e.data&&(e.data={}),this.data=e.data}ignoreMatch(){this.ignore=!0}}function i(e){return e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#x27;")}function r(e,...n){const t=Object.create(null);for(const n in e)t[n]=e[n];return n.forEach((function(e){for(const n in e)t[n]=e[n]})),t}function o(e){return e.nodeName.toLowerCase()}var l=Object.freeze({__proto__:null,escapeHTML:i,inherit:r,nodeStream:function(e){const n=[];return function e(t,a){for(let s=t.firstChild;s;s=s.nextSibling)3===s.nodeType?a+=s.nodeValue.length:1===s.nodeType&&(n.push({event:"start",offset:a,node:s}),a=e(s,a),o(s).match(/br|hr|img|input/)||n.push({event:"stop",offset:a,node:s}));return a}(e,0),n},mergeStreams:function(e,n,t){let a=0,s="";const r=[];function l(){return e.length&&n.length?e[0].offset!==n[0].offset?e[0].offset<n[0].offset?e:n:"start"===n[0].event?e:n:e.length?e:n}function c(e){s+="<"+o(e)+[].map.call(e.attributes,(function(e){return" "+e.nodeName+'="'+i(e.value)+'"'})).join("")+">"}function u(e){s+="</"+o(e)+">"}function g(e){("start"===e.event?c:u)(e.node)}for(;e.length||n.length;){let n=l();if(s+=i(t.substring(a,n[0].offset)),a=n[0].offset,n===e){r.reverse().forEach(u);do{g(n.splice(0,1)[0]),n=l()}while(n===e&&n.length&&n[0].offset===a);r.reverse().forEach(c)}else"start"===n[0].event?r.push(n[0].node):r.pop(),g(n.splice(0,1)[0])}return s+i(t.substr(a))}});const c=e=>!!e.kind;class u{constructor(e,n){this.buffer="",this.classPrefix=n.classPrefix,e.walk(this)}addText(e){this.buffer+=i(e)}openNode(e){if(!c(e))return;let n=e.kind;e.sublanguage||(n=`${this.classPrefix}${n}`),this.span(n)}closeNode(e){c(e)&&(this.buffer+="</span>")}value(){return this.buffer}span(e){this.buffer+=`<span class="${e}">`}}class g{constructor(){this.rootNode={children:[]},this.stack=[this.rootNode]}get top(){return this.stack[this.stack.length-1]}get root(){return this.rootNode}add(e){this.top.children.push(e)}openNode(e){const n={kind:e,children:[]};this.add(n),this.stack.push(n)}closeNode(){if(this.stack.length>1)return this.stack.pop()}closeAllNodes(){for(;this.closeNode(););}toJSON(){return JSON.stringify(this.rootNode,null,4)}walk(e){return this.constructor._walk(e,this.rootNode)}static _walk(e,n){return"string"==typeof n?e.addText(n):n.children&&(e.openNode(n),n.children.forEach((n=>this._walk(e,n))),e.closeNode(n)),e}static _collapse(e){"string"!=typeof e&&e.children&&(e.children.every((e=>"string"==typeof e))?e.children=[e.children.join("")]:e.children.forEach((e=>{g._collapse(e)})))}}class d extends g{constructor(e){super(),this.options=e}addKeyword(e,n){""!==e&&(this.openNode(n),this.addText(e),this.closeNode())}addText(e){""!==e&&this.add(e)}addSublanguage(e,n){const t=e.root;t.kind=n,t.sublanguage=!0,this.add(t)}toHTML(){return new u(this,this.options).value()}finalize(){return!0}}function b(e){return e?"string"==typeof e?e:e.source:null}const h="[a-zA-Z]\\w*",f="[a-zA-Z_]\\w*",m="\\b\\d+(\\.\\d+)?",_="(-?)(\\b0[xX][a-fA-F0-9]+|(\\b\\d+(\\.\\d*)?|\\.\\d+)([eE][-+]?\\d+)?)",p="\\b(0b[01]+)",E={begin:"\\\\[\\s\\S]",relevance:0},N={className:"string",begin:"'",end:"'",illegal:"\\n",contains:[E]},w={className:"string",begin:'"',end:'"',illegal:"\\n",contains:[E]},y={begin:/\b(a|an|the|are|I'm|isn't|don't|doesn't|won't|but|just|should|pretty|simply|enough|gonna|going|wtf|so|such|will|you|your|they|like|more)\b/},v=function(e,n,t={}){const a=r({className:"comment",begin:e,end:n,contains:[]},t);return a.contains.push(y),a.contains.push({className:"doctag",begin:"(?:TODO|FIXME|NOTE|BUG|OPTIMIZE|HACK|XXX):",relevance:0}),a},O=v("//","$"),x=v("/\\*","\\*/"),M=v("#","$"),R={className:"number",begin:m,relevance:0},S={className:"number",begin:_,relevance:0},A={className:"number",begin:p,relevance:0},T={className:"number",begin:m+"(%|em|ex|ch|rem|vw|vh|vmin|vmax|cm|mm|in|pt|pc|px|deg|grad|rad|turn|s|ms|Hz|kHz|dpi|dpcm|dppx)?",relevance:0},C={begin:/(?=\/[^/\n]*\/)/,contains:[{className:"regexp",begin:/\//,end:/\/[gimuy]*/,illegal:/\n/,contains:[E,{begin:/\[/,end:/\]/,relevance:0,contains:[E]}]}]},L={className:"title",begin:h,relevance:0},I={className:"title",begin:f,relevance:0};var D=Object.freeze({__proto__:null,IDENT_RE:h,UNDERSCORE_IDENT_RE:f,NUMBER_RE:m,C_NUMBER_RE:_,BINARY_NUMBER_RE:p,RE_STARTERS_RE:"!|!=|!==|%|%=|&|&&|&=|\\*|\\*=|\\+|\\+=|,|-|-=|/=|/|:|;|<<|<<=|<=|<|===|==|=|>>>=|>>=|>=|>>>|>>|>|\\?|\\[|\\{|\\(|\\^|\\^=|\\||\\|=|\\|\\||~",SHEBANG:(e={})=>{const n=/^#![ ]*\//;return e.binary&&(e.begin=function(...e){return e.map((e=>b(e))).join("")}(n,/.*\b/,e.binary,/\b.*/)),r({className:"meta",begin:n,end:/$/,relevance:0,"on:begin":(e,n)=>{0!==e.index&&n.ignoreMatch()}},e)},BACKSLASH_ESCAPE:E,APOS_STRING_MODE:N,QUOTE_STRING_MODE:w,PHRASAL_WORDS_MODE:y,COMMENT:v,C_LINE_COMMENT_MODE:O,C_BLOCK_COMMENT_MODE:x,HASH_COMMENT_MODE:M,NUMBER_MODE:R,C_NUMBER_MODE:S,BINARY_NUMBER_MODE:A,CSS_NUMBER_MODE:T,REGEXP_MODE:C,TITLE_MODE:L,UNDERSCORE_TITLE_MODE:I,METHOD_GUARD:{begin:"\\.\\s*[a-zA-Z_]\\w*",relevance:0},END_SAME_AS_BEGIN:function(e){return Object.assign(e,{"on:begin":(e,n)=>{n.data._beginMatch=e[1]},"on:end":(e,n)=>{n.data._beginMatch!==e[1]&&n.ignoreMatch()}})}});const k=["of","and","for","in","not","or","if","then","parent","list","value"];function B(e){function n(n,t){return new RegExp(b(n),"m"+(e.case_insensitive?"i":"")+(t?"g":""))}class t{constructor(){this.matchIndexes={},this.regexes=[],this.matchAt=1,this.position=0}addRule(e,n){n.position=this.position++,this.matchIndexes[this.matchAt]=n,this.regexes.push([n,e]),this.matchAt+=function(e){return new RegExp(e.toString()+"|").exec("").length-1}(e)+1}compile(){0===this.regexes.length&&(this.exec=()=>null);const e=this.regexes.map((e=>e[1]));this.matcherRe=n(function(e,n="|"){const t=/\[(?:[^\\\]]|\\.)*\]|\(\??|\\([1-9][0-9]*)|\\./;let a=0,s="";for(let i=0;i<e.length;i++){a+=1;const r=a;let o=b(e[i]);for(i>0&&(s+=n),s+="(";o.length>0;){const e=t.exec(o);if(null==e){s+=o;break}s+=o.substring(0,e.index),o=o.substring(e.index+e[0].length),"\\"===e[0][0]&&e[1]?s+="\\"+String(Number(e[1])+r):(s+=e[0],"("===e[0]&&a++)}s+=")"}return s}(e),!0),this.lastIndex=0}exec(e){this.matcherRe.lastIndex=this.lastIndex;const n=this.matcherRe.exec(e);if(!n)return null;const t=n.findIndex(((e,n)=>n>0&&void 0!==e)),a=this.matchIndexes[t];return n.splice(0,t),Object.assign(n,a)}}class a{constructor(){this.rules=[],this.multiRegexes=[],this.count=0,this.lastIndex=0,this.regexIndex=0}getMatcher(e){if(this.multiRegexes[e])return this.multiRegexes[e];const n=new t;return this.rules.slice(e).forEach((([e,t])=>n.addRule(e,t))),n.compile(),this.multiRegexes[e]=n,n}resumingScanAtSamePosition(){return 0!==this.regexIndex}considerAll(){this.regexIndex=0}addRule(e,n){this.rules.push([e,n]),"begin"===n.type&&this.count++}exec(e){const n=this.getMatcher(this.regexIndex);n.lastIndex=this.lastIndex;let t=n.exec(e);if(this.resumingScanAtSamePosition())if(t&&t.index===this.lastIndex);else{const n=this.getMatcher(0);n.lastIndex=this.lastIndex+1,t=n.exec(e)}return t&&(this.regexIndex+=t.position+1,this.regexIndex===this.count&&this.considerAll()),t}}function s(e,n){"."===e.input[e.index-1]&&n.ignoreMatch()}if(e.contains&&e.contains.includes("self"))throw new Error("ERR: contains `self` is not supported at the top-level of a language.  See documentation.");return e.classNameAliases=r(e.classNameAliases||{}),function t(i,o){const l=i;if(i.compiled)return l;i.compiled=!0,i.__beforeBegin=null,i.keywords=i.keywords||i.beginKeywords;let c=null;if("object"==typeof i.keywords&&(c=i.keywords.$pattern,delete i.keywords.$pattern),i.keywords&&(i.keywords=function(e,n){const t={};return"string"==typeof e?a("keyword",e):Object.keys(e).forEach((function(n){a(n,e[n])})),t;function a(e,a){n&&(a=a.toLowerCase()),a.split(" ").forEach((function(n){const a=n.split("|");t[a[0]]=[e,U(a[0],a[1])]}))}}(i.keywords,e.case_insensitive)),i.lexemes&&c)throw new Error("ERR: Prefer `keywords.$pattern` to `mode.lexemes`, BOTH are not allowed. (see mode reference) ");return l.keywordPatternRe=n(i.lexemes||c||/\w+/,!0),o&&(i.beginKeywords&&(i.begin="\\b("+i.beginKeywords.split(" ").join("|")+")(?!\\.)(?=\\b|\\s)",i.__beforeBegin=s),i.begin||(i.begin=/\B|\b/),l.beginRe=n(i.begin),i.endSameAsBegin&&(i.end=i.begin),i.end||i.endsWithParent||(i.end=/\B|\b/),i.end&&(l.endRe=n(i.end)),l.terminator_end=b(i.end)||"",i.endsWithParent&&o.terminator_end&&(l.terminator_end+=(i.end?"|":"")+o.terminator_end)),i.illegal&&(l.illegalRe=n(i.illegal)),void 0===i.relevance&&(i.relevance=1),i.contains||(i.contains=[]),i.contains=[].concat(...i.contains.map((function(e){return function(e){return e.variants&&!e.cached_variants&&(e.cached_variants=e.variants.map((function(n){return r(e,{variants:null},n)}))),e.cached_variants?e.cached_variants:j(e)?r(e,{starts:e.starts?r(e.starts):null}):Object.isFrozen(e)?r(e):e}("self"===e?i:e)}))),i.contains.forEach((function(e){t(e,l)})),i.starts&&t(i.starts,o),l.matcher=function(e){const n=new a;return e.contains.forEach((e=>n.addRule(e.begin,{rule:e,type:"begin"}))),e.terminator_end&&n.addRule(e.terminator_end,{type:"end"}),e.illegal&&n.addRule(e.illegal,{type:"illegal"}),n}(l),l}(e)}function j(e){return!!e&&(e.endsWithParent||j(e.starts))}function U(e,n){return n?Number(n):function(e){return k.includes(e.toLowerCase())}(e)?0:1}function P(e){const n={props:["language","code","autodetect"],data:function(){return{detectedLanguage:"",unknownLanguage:!1}},computed:{className(){return this.unknownLanguage?"":"hljs "+this.detectedLanguage},highlighted(){if(!this.autoDetect&&!e.getLanguage(this.language))return console.warn(`The language "${this.language}" you specified could not be found.`),this.unknownLanguage=!0,i(this.code);let n;return this.autoDetect?(n=e.highlightAuto(this.code),this.detectedLanguage=n.language):(n=e.highlight(this.language,this.code,this.ignoreIllegals),this.detectedLanguage=this.language),n.value},autoDetect(){return!this.language||(e=this.autodetect,Boolean(e||""===e));var e},ignoreIllegals:()=>!0},render(e){return e("pre",{},[e("code",{class:this.className,domProps:{innerHTML:this.highlighted}})])}};return{Component:n,VuePlugin:{install(e){e.component("highlightjs",n)}}}}const $=i,z=r,{nodeStream:H,mergeStreams:K}=l,F=Symbol("nomatch");var Z=function(e){const n=[],a=Object.create(null),i=Object.create(null),r=[];let o=!0;const l=/(^(<[^>]+>|\t|)+|\n)/gm,c="Could not find the language '{}', did you forget to load/include a language module?",u={disableAutodetect:!0,name:"Plain text",contains:[]};let g={noHighlightRe:/^(no-?highlight)$/i,languageDetectRe:/\blang(?:uage)?-([\w-]+)\b/i,classPrefix:"hljs-",tabReplace:null,useBR:!1,languages:null,__emitter:d};function b(e){return g.noHighlightRe.test(e)}function h(e,n,t,a){const s={code:n,language:e};v("before:highlight",s);const i=s.result?s.result:f(s.language,s.code,t,a);return i.code=s.code,v("after:highlight",i),i}function f(e,n,t,i){const r=n;function l(e,n){const t=w.case_insensitive?n[0].toLowerCase():n[0];return Object.prototype.hasOwnProperty.call(e.keywords,t)&&e.keywords[t]}function u(){null!=O.subLanguage?function(){if(""===R)return;let e=null;if("string"==typeof O.subLanguage){if(!a[O.subLanguage])return void M.addText(R);e=f(O.subLanguage,R,!0,x[O.subLanguage]),x[O.subLanguage]=e.top}else e=m(R,O.subLanguage.length?O.subLanguage:null);O.relevance>0&&(S+=e.relevance),M.addSublanguage(e.emitter,e.language)}():function(){if(!O.keywords)return void M.addText(R);let e=0;O.keywordPatternRe.lastIndex=0;let n=O.keywordPatternRe.exec(R),t="";for(;n;){t+=R.substring(e,n.index);const a=l(O,n);if(a){const[e,s]=a;M.addText(t),t="",S+=s;const i=w.classNameAliases[e]||e;M.addKeyword(n[0],i)}else t+=n[0];e=O.keywordPatternRe.lastIndex,n=O.keywordPatternRe.exec(R)}t+=R.substr(e),M.addText(t)}(),R=""}function d(e){return e.className&&M.openNode(w.classNameAliases[e.className]||e.className),O=Object.create(e,{parent:{value:O}}),O}function b(e,n,t){let a=function(e,n){const t=e&&e.exec(n);return t&&0===t.index}(e.endRe,t);if(a){if(e["on:end"]){const t=new s(e);e["on:end"](n,t),t.ignore&&(a=!1)}if(a){for(;e.endsParent&&e.parent;)e=e.parent;return e}}if(e.endsWithParent)return b(e.parent,n,t)}function h(e){return 0===O.matcher.regexIndex?(R+=e[0],1):(C=!0,0)}function _(e){const n=e[0],t=r.substr(e.index),a=b(O,e,t);if(!a)return F;const s=O;s.skip?R+=n:(s.returnEnd||s.excludeEnd||(R+=n),u(),s.excludeEnd&&(R=n));do{O.className&&M.closeNode(),O.skip||O.subLanguage||(S+=O.relevance),O=O.parent}while(O!==a.parent);return a.starts&&(a.endSameAsBegin&&(a.starts.endRe=a.endRe),d(a.starts)),s.returnEnd?0:n.length}let p={};function E(n,a){const i=a&&a[0];if(R+=n,null==i)return u(),0;if("begin"===p.type&&"end"===a.type&&p.index===a.index&&""===i){if(R+=r.slice(a.index,a.index+1),!o){const n=new Error("0 width match regex");throw n.languageName=e,n.badRule=p.rule,n}return 1}if(p=a,"begin"===a.type)return function(e){const n=e[0],t=e.rule,a=new s(t),i=[t.__beforeBegin,t["on:begin"]];for(const t of i)if(t&&(t(e,a),a.ignore))return h(n);return t&&t.endSameAsBegin&&(t.endRe=new RegExp(n.replace(/[-/\\^$*+?.()|[\]{}]/g,"\\$&"),"m")),t.skip?R+=n:(t.excludeBegin&&(R+=n),u(),t.returnBegin||t.excludeBegin||(R=n)),d(t),t.returnBegin?0:n.length}(a);if("illegal"===a.type&&!t){const e=new Error('Illegal lexeme "'+i+'" for mode "'+(O.className||"<unnamed>")+'"');throw e.mode=O,e}if("end"===a.type){const e=_(a);if(e!==F)return e}if("illegal"===a.type&&""===i)return 1;if(T>1e5&&T>3*a.index)throw new Error("potential infinite loop, way more iterations than matches");return R+=i,i.length}const w=N(e);if(!w)throw console.error(c.replace("{}",e)),new Error('Unknown language: "'+e+'"');const y=B(w);let v="",O=i||y;const x={},M=new g.__emitter(g);!function(){const e=[];for(let n=O;n!==w;n=n.parent)n.className&&e.unshift(n.className);e.forEach((e=>M.openNode(e)))}();let R="",S=0,A=0,T=0,C=!1;try{for(O.matcher.considerAll();;){T++,C?C=!1:O.matcher.considerAll(),O.matcher.lastIndex=A;const e=O.matcher.exec(r);if(!e)break;const n=E(r.substring(A,e.index),e);A=e.index+n}return E(r.substr(A)),M.closeAllNodes(),M.finalize(),v=M.toHTML(),{relevance:S,value:v,language:e,illegal:!1,emitter:M,top:O}}catch(n){if(n.message&&n.message.includes("Illegal"))return{illegal:!0,illegalBy:{msg:n.message,context:r.slice(A-100,A+100),mode:n.mode},sofar:v,relevance:0,value:$(r),emitter:M};if(o)return{illegal:!1,relevance:0,value:$(r),emitter:M,language:e,top:O,errorRaised:n};throw n}}function m(e,n){n=n||g.languages||Object.keys(a);const t=function(e){const n={relevance:0,emitter:new g.__emitter(g),value:$(e),illegal:!1,top:u};return n.emitter.addText(e),n}(e),s=n.filter(N).filter(y).map((n=>f(n,e,!1)));s.unshift(t);const i=s.sort(((e,n)=>{if(e.relevance!==n.relevance)return n.relevance-e.relevance;if(e.language&&n.language){if(N(e.language).supersetOf===n.language)return 1;if(N(n.language).supersetOf===e.language)return-1}return 0})),[r,o]=i,l=r;return l.second_best=o,l}function _(e){return g.tabReplace||g.useBR?e.replace(l,(e=>"\n"===e?g.useBR?"<br>":e:g.tabReplace?e.replace(/\t/g,g.tabReplace):e)):e}function p(e){let n=null;const t=function(e){let n=e.className+" ";n+=e.parentNode?e.parentNode.className:"";const t=g.languageDetectRe.exec(n);if(t){const n=N(t[1]);return n||(console.warn(c.replace("{}",t[1])),console.warn("Falling back to no-highlight mode for this block.",e)),n?t[1]:"no-highlight"}return n.split(/\s+/).find((e=>b(e)||N(e)))}(e);if(b(t))return;v("before:highlightBlock",{block:e,language:t}),g.useBR?(n=document.createElement("div"),n.innerHTML=e.innerHTML.replace(/\n/g,"").replace(/<br[ /]*>/g,"\n")):n=e;const a=n.textContent,s=t?h(t,a,!0):m(a),r=H(n);if(r.length){const e=document.createElement("div");e.innerHTML=s.value,s.value=K(r,H(e),a)}s.value=_(s.value),v("after:highlightBlock",{block:e,result:s}),e.innerHTML=s.value,e.className=function(e,n,t){const a=n?i[n]:t,s=[e.trim()];return e.match(/\bhljs\b/)||s.push("hljs"),e.includes(a)||s.push(a),s.join(" ").trim()}(e.className,t,s.language),e.result={language:s.language,re:s.relevance,relavance:s.relevance},s.second_best&&(e.second_best={language:s.second_best.language,re:s.second_best.relevance,relavance:s.second_best.relevance})}const E=()=>{if(E.called)return;E.called=!0;const e=document.querySelectorAll("pre code");n.forEach.call(e,p)};function N(e){return e=(e||"").toLowerCase(),a[e]||a[i[e]]}function w(e,{languageName:n}){"string"==typeof e&&(e=[e]),e.forEach((e=>{i[e]=n}))}function y(e){const n=N(e);return n&&!n.disableAutodetect}function v(e,n){const t=e;r.forEach((function(e){e[t]&&e[t](n)}))}Object.assign(e,{highlight:h,highlightAuto:m,fixMarkup:function(e){return console.warn("fixMarkup is deprecated and will be removed entirely in v11.0"),console.warn("Please see https://github.com/highlightjs/highlight.js/issues/2534"),_(e)},highlightBlock:p,configure:function(e){e.useBR&&(console.warn("'useBR' option is deprecated and will be removed entirely in v11.0"),console.warn("Please see https://github.com/highlightjs/highlight.js/issues/2559")),g=z(g,e)},initHighlighting:E,initHighlightingOnLoad:function(){window.addEventListener("DOMContentLoaded",E,!1)},registerLanguage:function(n,t){let s=null;try{s=t(e)}catch(e){if(console.error("Language definition for '{}' could not be registered.".replace("{}",n)),!o)throw e;console.error(e),s=u}s.name||(s.name=n),a[n]=s,s.rawDefinition=t.bind(null,e),s.aliases&&w(s.aliases,{languageName:n})},listLanguages:function(){return Object.keys(a)},getLanguage:N,registerAliases:w,requireLanguage:function(e){console.warn("requireLanguage is deprecated and will be removed entirely in the future."),console.warn("Please see https://github.com/highlightjs/highlight.js/pull/2844");const n=N(e);if(n)return n;throw new Error("The '{}' language is required, but not loaded.".replace("{}",e))},autoDetection:y,inherit:z,addPlugin:function(e){r.push(e)},vuePlugin:P(e).VuePlugin}),e.debugMode=function(){o=!1},e.safeMode=function(){o=!0},e.versionString="10.4.1";for(const e in D)"object"==typeof D[e]&&t(D[e]);return Object.assign(e,D),e}({});e.exports=Z},519:e=>{function n(...e){return e.map((e=>{return(n=e)?"string"==typeof n?n:n.source:null;var n})).join("")}e.exports=function(e){const t={},a={begin:/\$\{/,end:/\}/,contains:["self",{begin:/:-/,contains:[t]}]};Object.assign(t,{className:"variable",variants:[{begin:n(/\$[\w\d#@][\w\d_]*/,"(?![\\w\\d])(?![$])")},a]});const s={className:"subst",begin:/\$\(/,end:/\)/,contains:[e.BACKSLASH_ESCAPE]},i={begin:/<<-?\s*(?=\w+)/,starts:{contains:[e.END_SAME_AS_BEGIN({begin:/(\w+)/,end:/(\w+)/,className:"string"})]}},r={className:"string",begin:/"/,end:/"/,contains:[e.BACKSLASH_ESCAPE,t,s]};s.contains.push(r);const o={begin:/\$\(\(/,end:/\)\)/,contains:[{begin:/\d+#[0-9a-f]+/,className:"number"},e.NUMBER_MODE,t]},l=e.SHEBANG({binary:`(${["fish","bash","zsh","sh","csh","ksh","tcsh","dash","scsh"].join("|")})`,relevance:10}),c={className:"function",begin:/\w[\w\d_]*\s*\(\s*\)\s*\{/,returnBegin:!0,contains:[e.inherit(e.TITLE_MODE,{begin:/\w[\w\d_]*/})],relevance:0};return{name:"Bash",aliases:["sh","zsh"],keywords:{$pattern:/\b[a-z._-]+\b/,keyword:"if then else elif fi for while in do done case esac function",literal:"true false",built_in:"break cd continue eval exec exit export getopts hash pwd readonly return shift test times trap umask unset alias bind builtin caller command declare echo enable help let local logout mapfile printf read readarray source type typeset ulimit unalias set shopt autoload bg bindkey bye cap chdir clone comparguments compcall compctl compdescribe compfiles compgroups compquote comptags comptry compvalues dirs disable disown echotc echoti emulate fc fg float functions getcap getln history integer jobs kill limit log noglob popd print pushd pushln rehash sched setcap setopt stat suspend ttyctl unfunction unhash unlimit unsetopt vared wait whence where which zcompile zformat zftp zle zmodload zparseopts zprof zpty zregexparse zsocket zstyle ztcp"},contains:[l,e.SHEBANG(),c,o,e.HASH_COMMENT_MODE,i,r,{className:"",begin:/\\"/},{className:"string",begin:/'/,end:/'/},t]}}},721:e=>{var n="\\.([0-9](_*[0-9])*)",t="[0-9a-fA-F](_*[0-9a-fA-F])*",a={className:"number",variants:[{begin:`(\\b([0-9](_*[0-9])*)((${n})|\\.)?|(${n}))[eE][+-]?([0-9](_*[0-9])*)[fFdD]?\\b`},{begin:`\\b([0-9](_*[0-9])*)((${n})[fFdD]?\\b|\\.([fFdD]\\b)?)`},{begin:`(${n})[fFdD]?\\b`},{begin:"\\b([0-9](_*[0-9])*)[fFdD]\\b"},{begin:`\\b0[xX]((${t})\\.?|(${t})?\\.(${t}))[pP][+-]?([0-9](_*[0-9])*)[fFdD]?\\b`},{begin:"\\b(0|[1-9](_*[0-9])*)[lL]?\\b"},{begin:`\\b0[xX](${t})[lL]?\\b`},{begin:"\\b0(_*[0-7])*[lL]?\\b"},{begin:"\\b0[bB][01](_*[01])*[lL]?\\b"}],relevance:0};e.exports=function(e){var n="false synchronized int abstract float private char boolean var static null if const for true while long strictfp finally protected import native final void enum else break transient catch instanceof byte super volatile case assert short package default double public try this switch continue throws protected public private module requires exports do",t={className:"meta",begin:"@[À-ʸa-zA-Z_$][À-ʸa-zA-Z_$0-9]*",contains:[{begin:/\(/,end:/\)/,contains:["self"]}]};const s=a;return{name:"Java",aliases:["jsp"],keywords:n,illegal:/<\/|#/,contains:[e.COMMENT("/\\*\\*","\\*/",{relevance:0,contains:[{begin:/\w+@/,relevance:0},{className:"doctag",begin:"@[A-Za-z]+"}]}),{begin:/import java\.[a-z]+\./,keywords:"import",relevance:2},e.C_LINE_COMMENT_MODE,e.C_BLOCK_COMMENT_MODE,e.APOS_STRING_MODE,e.QUOTE_STRING_MODE,{className:"class",beginKeywords:"class interface enum",end:/[{;=]/,excludeEnd:!0,keywords:"class interface enum",illegal:/[:"\[\]]/,contains:[{beginKeywords:"extends implements"},e.UNDERSCORE_TITLE_MODE]},{beginKeywords:"new throw return else",relevance:0},{className:"class",begin:"record\\s+"+e.UNDERSCORE_IDENT_RE+"\\s*\\(",returnBegin:!0,excludeEnd:!0,end:/[{;=]/,keywords:n,contains:[{beginKeywords:"record"},{begin:e.UNDERSCORE_IDENT_RE+"\\s*\\(",returnBegin:!0,relevance:0,contains:[e.UNDERSCORE_TITLE_MODE]},{className:"params",begin:/\(/,end:/\)/,keywords:n,relevance:0,contains:[e.C_BLOCK_COMMENT_MODE]},e.C_LINE_COMMENT_MODE,e.C_BLOCK_COMMENT_MODE]},{className:"function",begin:"([À-ʸa-zA-Z_$][À-ʸa-zA-Z_$0-9]*(<[À-ʸa-zA-Z_$][À-ʸa-zA-Z_$0-9]*(\\s*,\\s*[À-ʸa-zA-Z_$][À-ʸa-zA-Z_$0-9]*)*>)?\\s+)+"+e.UNDERSCORE_IDENT_RE+"\\s*\\(",returnBegin:!0,end:/[{;=]/,excludeEnd:!0,keywords:n,contains:[{begin:e.UNDERSCORE_IDENT_RE+"\\s*\\(",returnBegin:!0,relevance:0,contains:[e.UNDERSCORE_TITLE_MODE]},{className:"params",begin:/\(/,end:/\)/,keywords:n,relevance:0,contains:[t,e.APOS_STRING_MODE,e.QUOTE_STRING_MODE,s,e.C_BLOCK_COMMENT_MODE]},e.C_LINE_COMMENT_MODE,e.C_BLOCK_COMMENT_MODE]},s,t]}}},344:e=>{const n="[A-Za-z$_][0-9A-Za-z$_]*",t=["as","in","of","if","for","while","finally","var","new","function","do","return","void","else","break","catch","instanceof","with","throw","case","default","try","switch","continue","typeof","delete","let","yield","const","class","debugger","async","await","static","import","from","export","extends"],a=["true","false","null","undefined","NaN","Infinity"],s=[].concat(["setInterval","setTimeout","clearInterval","clearTimeout","require","exports","eval","isFinite","isNaN","parseFloat","parseInt","decodeURI","decodeURIComponent","encodeURI","encodeURIComponent","escape","unescape"],["arguments","this","super","console","window","document","localStorage","module","global"],["Intl","DataView","Number","Math","Date","String","RegExp","Object","Function","Boolean","Error","Symbol","Set","Map","WeakSet","WeakMap","Proxy","Reflect","JSON","Promise","Float64Array","Int16Array","Int32Array","Int8Array","Uint16Array","Uint32Array","Float32Array","Array","Uint8Array","Uint8ClampedArray","ArrayBuffer"],["EvalError","InternalError","RangeError","ReferenceError","SyntaxError","TypeError","URIError"]);function i(e){return r("(?=",e,")")}function r(...e){return e.map((e=>{return(n=e)?"string"==typeof n?n:n.source:null;var n})).join("")}e.exports=function(e){const o=n,l={begin:/<[A-Za-z0-9\\._:-]+/,end:/\/[A-Za-z0-9\\._:-]+>|\/>/,isTrulyOpeningTag:(e,n)=>{const t=e[0].length+e.index,a=e.input[t];"<"!==a?">"===a&&(((e,{after:n})=>{const t="</"+e[0].slice(1);return-1!==e.input.indexOf(t,n)})(e,{after:t})||n.ignoreMatch()):n.ignoreMatch()}},c={$pattern:n,keyword:t.join(" "),literal:a.join(" "),built_in:s.join(" ")},u="\\.([0-9](_?[0-9])*)",g="0|[1-9](_?[0-9])*|0[0-7]*[89][0-9]*",d={className:"number",variants:[{begin:`(\\b(${g})((${u})|\\.)?|(${u}))[eE][+-]?([0-9](_?[0-9])*)\\b`},{begin:`\\b(${g})\\b((${u})\\b|\\.)?|(${u})\\b`},{begin:"\\b(0|[1-9](_?[0-9])*)n\\b"},{begin:"\\b0[xX][0-9a-fA-F](_?[0-9a-fA-F])*n?\\b"},{begin:"\\b0[bB][0-1](_?[0-1])*n?\\b"},{begin:"\\b0[oO][0-7](_?[0-7])*n?\\b"},{begin:"\\b0[0-7]+n?\\b"}],relevance:0},b={className:"subst",begin:"\\$\\{",end:"\\}",keywords:c,contains:[]},h={begin:"html`",end:"",starts:{end:"`",returnEnd:!1,contains:[e.BACKSLASH_ESCAPE,b],subLanguage:"xml"}},f={begin:"css`",end:"",starts:{end:"`",returnEnd:!1,contains:[e.BACKSLASH_ESCAPE,b],subLanguage:"css"}},m={className:"string",begin:"`",end:"`",contains:[e.BACKSLASH_ESCAPE,b]},_={className:"comment",variants:[e.COMMENT("/\\*\\*","\\*/",{relevance:0,contains:[{className:"doctag",begin:"@[A-Za-z]+",contains:[{className:"type",begin:"\\{",end:"\\}",relevance:0},{className:"variable",begin:o+"(?=\\s*(-)|$)",endsParent:!0,relevance:0},{begin:/(?=[^\n])\s/,relevance:0}]}]}),e.C_BLOCK_COMMENT_MODE,e.C_LINE_COMMENT_MODE]},p=[e.APOS_STRING_MODE,e.QUOTE_STRING_MODE,h,f,m,d,e.REGEXP_MODE];b.contains=p.concat({begin:/\{/,end:/\}/,keywords:c,contains:["self"].concat(p)});const E=[].concat(_,b.contains),N=E.concat([{begin:/\(/,end:/\)/,keywords:c,contains:["self"].concat(E)}]),w={className:"params",begin:/\(/,end:/\)/,excludeBegin:!0,excludeEnd:!0,keywords:c,contains:N};return{name:"Javascript",aliases:["js","jsx","mjs","cjs"],keywords:c,exports:{PARAMS_CONTAINS:N},illegal:/#(?![$_A-z])/,contains:[e.SHEBANG({label:"shebang",binary:"node",relevance:5}),{label:"use_strict",className:"meta",relevance:10,begin:/^\s*['"]use (strict|asm)['"]/},e.APOS_STRING_MODE,e.QUOTE_STRING_MODE,h,f,m,_,d,{begin:r(/[{,\n]\s*/,i(r(/(((\/\/.*$)|(\/\*(\*[^/]|[^*])*\*\/))\s*)*/,o+"\\s*:"))),relevance:0,contains:[{className:"attr",begin:o+i("\\s*:"),relevance:0}]},{begin:"("+e.RE_STARTERS_RE+"|\\b(case|return|throw)\\b)\\s*",keywords:"return throw case",contains:[_,e.REGEXP_MODE,{className:"function",begin:"(\\([^()]*(\\([^()]*(\\([^()]*\\)[^()]*)*\\)[^()]*)*\\)|"+e.UNDERSCORE_IDENT_RE+")\\s*=>",returnBegin:!0,end:"\\s*=>",contains:[{className:"params",variants:[{begin:e.UNDERSCORE_IDENT_RE,relevance:0},{className:null,begin:/\(\s*\)/,skip:!0},{begin:/\(/,end:/\)/,excludeBegin:!0,excludeEnd:!0,keywords:c,contains:N}]}]},{begin:/,/,relevance:0},{className:"",begin:/\s/,end:/\s*/,skip:!0},{variants:[{begin:"<>",end:"</>"},{begin:l.begin,"on:begin":l.isTrulyOpeningTag,end:l.end}],subLanguage:"xml",contains:[{begin:l.begin,end:l.end,skip:!0,contains:["self"]}]}],relevance:0},{className:"function",beginKeywords:"function",end:/[{;]/,excludeEnd:!0,keywords:c,contains:["self",e.inherit(e.TITLE_MODE,{begin:o}),w],illegal:/%/},{beginKeywords:"while if switch catch for"},{className:"function",begin:e.UNDERSCORE_IDENT_RE+"\\([^()]*(\\([^()]*(\\([^()]*\\)[^()]*)*\\)[^()]*)*\\)\\s*\\{",returnBegin:!0,contains:[w,e.inherit(e.TITLE_MODE,{begin:o})]},{variants:[{begin:"\\."+o},{begin:"\\$"+o}],relevance:0},{className:"class",beginKeywords:"class",end:/[{;=]/,excludeEnd:!0,illegal:/[:"[\]]/,contains:[{beginKeywords:"extends"},e.UNDERSCORE_TITLE_MODE]},{begin:/\b(?=constructor)/,end:/[{;]/,excludeEnd:!0,contains:[e.inherit(e.TITLE_MODE,{begin:o}),"self",w]},{begin:"(get|set)\\s+(?="+o+"\\()",end:/\{/,keywords:"get set",contains:[e.inherit(e.TITLE_MODE,{begin:o}),{begin:/\(\)/},w]},{begin:/\$[(.]/}]}}},896:e=>{e.exports=function(e){const n=/[a-zA-Z@][a-zA-Z0-9_]*/,t={$pattern:n,keyword:"@interface @class @protocol @implementation"};return{name:"Objective-C",aliases:["mm","objc","obj-c","obj-c++","objective-c++"],keywords:{$pattern:n,keyword:"int float while char export sizeof typedef const struct for union unsigned long volatile static bool mutable if do return goto void enum else break extern asm case short default double register explicit signed typename this switch continue wchar_t inline readonly assign readwrite self @synchronized id typeof nonatomic super unichar IBOutlet IBAction strong weak copy in out inout bycopy byref oneway __strong __weak __block __autoreleasing @private @protected @public @try @property @end @throw @catch @finally @autoreleasepool @synthesize @dynamic @selector @optional @required @encode @package @import @defs @compatibility_alias __bridge __bridge_transfer __bridge_retained __bridge_retain __covariant __contravariant __kindof _Nonnull _Nullable _Null_unspecified __FUNCTION__ __PRETTY_FUNCTION__ __attribute__ getter setter retain unsafe_unretained nonnull nullable null_unspecified null_resettable class instancetype NS_DESIGNATED_INITIALIZER NS_UNAVAILABLE NS_REQUIRES_SUPER NS_RETURNS_INNER_POINTER NS_INLINE NS_AVAILABLE NS_DEPRECATED NS_ENUM NS_OPTIONS NS_SWIFT_UNAVAILABLE NS_ASSUME_NONNULL_BEGIN NS_ASSUME_NONNULL_END NS_REFINED_FOR_SWIFT NS_SWIFT_NAME NS_SWIFT_NOTHROW NS_DURING NS_HANDLER NS_ENDHANDLER NS_VALUERETURN NS_VOIDRETURN",literal:"false true FALSE TRUE nil YES NO NULL",built_in:"BOOL dispatch_once_t dispatch_queue_t dispatch_sync dispatch_async dispatch_once"},illegal:"</",contains:[{className:"built_in",begin:"\\b(AV|CA|CF|CG|CI|CL|CM|CN|CT|MK|MP|MTK|MTL|NS|SCN|SK|UI|WK|XC)\\w+"},e.C_LINE_COMMENT_MODE,e.C_BLOCK_COMMENT_MODE,e.C_NUMBER_MODE,e.QUOTE_STRING_MODE,e.APOS_STRING_MODE,{className:"string",variants:[{begin:'@"',end:'"',illegal:"\\n",contains:[e.BACKSLASH_ESCAPE]}]},{className:"meta",begin:/#\s*[a-z]+\b/,end:/$/,keywords:{"meta-keyword":"if else elif endif define undef warning error line pragma ifdef ifndef include"},contains:[{begin:/\\\n/,relevance:0},e.inherit(e.QUOTE_STRING_MODE,{className:"meta-string"}),{className:"meta-string",begin:/<.*?>/,end:/$/,illegal:"\\n"},e.C_LINE_COMMENT_MODE,e.C_BLOCK_COMMENT_MODE]},{className:"class",begin:"("+t.keyword.split(" ").join("|")+")\\b",end:/(\{|$)/,excludeEnd:!0,keywords:t,contains:[e.UNDERSCORE_TITLE_MODE]},{begin:"\\."+e.UNDERSCORE_IDENT_RE,relevance:0}]}}},514:e=>{e.exports=function(e){return{name:"Shell Session",aliases:["console"],contains:[{className:"meta",begin:/^\s{0,3}[/~\w\d[\]()@-]*[>%$#]/,starts:{end:/[^\\](?=\s*$)/,subLanguage:"bash"}}]}}},306:e=>{e.exports=function(e){var n={$pattern:/[\w#]+/,keyword:"#available #colorLiteral #column #else #elseif #endif #file #fileLiteral #function #if #imageLiteral #line #selector #sourceLocation _ __COLUMN__ __FILE__ __FUNCTION__ __LINE__ Any as as! as? associatedtype associativity break case catch class continue convenience default defer deinit didSet do dynamic dynamicType else enum extension fallthrough false fileprivate final for func get guard if import in indirect infix init inout internal is lazy left let mutating nil none nonmutating open operator optional override postfix precedence prefix private protocol Protocol public repeat required rethrows return right self Self set some static struct subscript super switch throw throws true try try! try? Type typealias unowned var weak where while willSet",literal:"true false nil",built_in:"abs advance alignof alignofValue anyGenerator assert assertionFailure bridgeFromObjectiveC bridgeFromObjectiveCUnconditional bridgeToObjectiveC bridgeToObjectiveCUnconditional c compactMap contains count countElements countLeadingZeros debugPrint debugPrintln distance dropFirst dropLast dump encodeBitsAsWords enumerate equal fatalError filter find getBridgedObjectiveCType getVaList indices insertionSort isBridgedToObjectiveC isBridgedVerbatimToObjectiveC isUniquelyReferenced isUniquelyReferencedNonObjC join lazy lexicographicalCompare map max maxElement min minElement numericCast overlaps partition posix precondition preconditionFailure print println quickSort readLine reduce reflect reinterpretCast reverse roundUpToAlignment sizeof sizeofValue sort split startsWith stride strideof strideofValue swap toString transcode underestimateCount unsafeAddressOf unsafeBitCast unsafeDowncast unsafeUnwrap unsafeReflect withExtendedLifetime withObjectAtPlusZero withUnsafePointer withUnsafePointerToObject withUnsafeMutablePointer withUnsafeMutablePointers withUnsafePointer withUnsafePointers withVaList zip"},t=e.COMMENT("/\\*","\\*/",{contains:["self"]}),a={className:"subst",begin:/\\\(/,end:"\\)",keywords:n,contains:[]},s={className:"string",contains:[e.BACKSLASH_ESCAPE,a],variants:[{begin:/"""/,end:/"""/},{begin:/"/,end:/"/}]},i="([0-9a-fA-F]_*)+",r={className:"number",relevance:0,variants:[{begin:"\\b(([0-9]_*)+)(\\.(([0-9]_*)+))?([eE][+-]?(([0-9]_*)+))?\\b"},{begin:`\\b0x(${i})(\\.(${i}))?([pP][+-]?(([0-9]_*)+))?\\b`},{begin:/\b0o([0-7]_*)+\b/},{begin:/\b0b([01]_*)+\b/}]};return a.contains=[r],{name:"Swift",keywords:n,contains:[s,e.C_LINE_COMMENT_MODE,t,{className:"type",begin:"\\b[A-Z][\\wÀ-ʸ']*[!?]"},{className:"type",begin:"\\b[A-Z][\\wÀ-ʸ']*",relevance:0},r,{className:"function",beginKeywords:"func",end:/\{/,excludeEnd:!0,contains:[e.inherit(e.TITLE_MODE,{begin:/[A-Za-z$_][0-9A-Za-z$_]*/}),{begin:/</,end:/>/},{className:"params",begin:/\(/,end:/\)/,endsParent:!0,keywords:n,contains:["self",r,s,e.C_BLOCK_COMMENT_MODE,{begin:":"}],illegal:/["']/}],illegal:/\[|%/},{className:"class",beginKeywords:"struct protocol class extension enum",keywords:n,end:"\\{",excludeEnd:!0,contains:[e.inherit(e.TITLE_MODE,{begin:/[A-Za-z$_][\u00C0-\u02B80-9A-Za-z$_]*/})]},{className:"meta",begin:"(@discardableResult|@warn_unused_result|@exported|@lazy|@noescape|@NSCopying|@NSManaged|@objc|@objcMembers|@convention|@required|@noreturn|@IBAction|@IBDesignable|@IBInspectable|@IBOutlet|@infix|@prefix|@postfix|@autoclosure|@testable|@available|@nonobjc|@NSApplicationMain|@UIApplicationMain|@dynamicMemberLookup|@propertyWrapper|@main)\\b"},{beginKeywords:"import",end:/$/,contains:[e.C_LINE_COMMENT_MODE,t],relevance:0}]}}},157:e=>{function n(e){return e?"string"==typeof e?e:e.source:null}function t(e){return a("(?=",e,")")}function a(...e){return e.map((e=>n(e))).join("")}function s(...e){return"("+e.map((e=>n(e))).join("|")+")"}e.exports=function(e){const n=a(/[A-Z_]/,a("(",/[A-Z0-9_.-]+:/,")?"),/[A-Z0-9_.-]*/),i={className:"symbol",begin:"&[a-z]+;|&#[0-9]+;|&#x[a-f0-9]+;"},r={begin:"\\s",contains:[{className:"meta-keyword",begin:"#?[a-z_][a-z1-9_-]+",illegal:"\\n"}]},o=e.inherit(r,{begin:"\\(",end:"\\)"}),l=e.inherit(e.APOS_STRING_MODE,{className:"meta-string"}),c=e.inherit(e.QUOTE_STRING_MODE,{className:"meta-string"}),u={endsWithParent:!0,illegal:/</,relevance:0,contains:[{className:"attr",begin:"[A-Za-z0-9\\._:-]+",relevance:0},{begin:/=\s*/,relevance:0,contains:[{className:"string",endsParent:!0,variants:[{begin:/"/,end:/"/,contains:[i]},{begin:/'/,end:/'/,contains:[i]},{begin:/[^\s"'=<>`]+/}]}]}]};return{name:"HTML, XML",aliases:["html","xhtml","rss","atom","xjb","xsd","xsl","plist","wsf","svg"],case_insensitive:!0,contains:[{className:"meta",begin:"<![a-z]",end:">",relevance:10,contains:[r,c,l,o,{begin:"\\[",end:"\\]",contains:[{className:"meta",begin:"<![a-z]",end:">",contains:[r,o,c,l]}]}]},e.COMMENT("\x3c!--","--\x3e",{relevance:10}),{begin:"<!\\[CDATA\\[",end:"\\]\\]>",relevance:10},i,{className:"meta",begin:/<\?xml/,end:/\?>/,relevance:10},{className:"tag",begin:"<style(?=\\s|>)",end:">",keywords:{name:"style"},contains:[u],starts:{end:"</style>",returnEnd:!0,subLanguage:["css","xml"]}},{className:"tag",begin:"<script(?=\\s|>)",end:">",keywords:{name:"script"},contains:[u],starts:{end:/<\/script>/,returnEnd:!0,subLanguage:["javascript","handlebars","xml"]}},{className:"tag",begin:/<>|<\/>/},{className:"tag",begin:a(/</,t(a(n,s(/\/>/,/>/,/\s/)))),end:/\/?>/,contains:[{className:"name",begin:n,relevance:0,starts:u}]},{className:"tag",begin:a(/<\//,t(a(n,/>/))),contains:[{className:"name",begin:n,relevance:0},{begin:/>/,relevance:0}]}]}}},587:e=>{e.exports=function(e){var n="true false yes no null",t="[\\w#;/?:@&=+$,.~*'()[\\]]+",a={className:"string",relevance:0,variants:[{begin:/'/,end:/'/},{begin:/"/,end:/"/},{begin:/\S+/}],contains:[e.BACKSLASH_ESCAPE,{className:"template-variable",variants:[{begin:/\{\{/,end:/\}\}/},{begin:/%\{/,end:/\}/}]}]},s=e.inherit(a,{variants:[{begin:/'/,end:/'/},{begin:/"/,end:/"/},{begin:/[^\s,{}[\]]+/}]}),i={end:",",endsWithParent:!0,excludeEnd:!0,contains:[],keywords:n,relevance:0},r={begin:/\{/,end:/\}/,contains:[i],illegal:"\\n",relevance:0},o={begin:"\\[",end:"\\]",contains:[i],illegal:"\\n",relevance:0},l=[{className:"attr",variants:[{begin:"\\w[\\w :\\/.-]*:(?=[ \t]|$)"},{begin:'"\\w[\\w :\\/.-]*":(?=[ \t]|$)'},{begin:"'\\w[\\w :\\/.-]*':(?=[ \t]|$)"}]},{className:"meta",begin:"^---\\s*$",relevance:10},{className:"string",begin:"[\\|>]([1-9]?[+-])?[ ]*\\n( +)[^ ][^\\n]*\\n(\\2[^\\n]+\\n?)*"},{begin:"<%[%=-]?",end:"[%-]?%>",subLanguage:"ruby",excludeBegin:!0,excludeEnd:!0,relevance:0},{className:"type",begin:"!\\w+!"+t},{className:"type",begin:"!<"+t+">"},{className:"type",begin:"!"+t},{className:"type",begin:"!!"+t},{className:"meta",begin:"&"+e.UNDERSCORE_IDENT_RE+"$"},{className:"meta",begin:"\\*"+e.UNDERSCORE_IDENT_RE+"$"},{className:"bullet",begin:"-(?=[ ]|$)",relevance:0},e.HASH_COMMENT_MODE,{beginKeywords:n,keywords:{literal:n}},{className:"number",begin:"\\b[0-9]{4}(-[0-9][0-9]){0,2}([Tt \\t][0-9][0-9]?(:[0-9][0-9]){2})?(\\.[0-9]*)?([ \\t])*(Z|[-+][0-9][0-9]?(:[0-9][0-9])?)?\\b"},{className:"number",begin:e.C_NUMBER_RE+"\\b",relevance:0},r,o,a],c=[...l];return c.pop(),c.push(s),i.contains=c,{name:"YAML",case_insensitive:!0,aliases:["yml","YAML"],contains:l}}}},n={};function t(a){if(n[a])return n[a].exports;var s=n[a]={exports:{}};return e[a](s,s.exports,t),s.exports}t.n=e=>{var n=e&&e.__esModule?()=>e.default:()=>e;return t.d(n,{a:n}),n},t.d=(e,n)=>{for(var a in n)t.o(n,a)&&!t.o(e,a)&&Object.defineProperty(e,a,{enumerable:!0,get:n[a]})},t.o=(e,n)=>Object.prototype.hasOwnProperty.call(e,n),(()=>{"use strict";var e=t(802),n=t.n(e),a=t(519),s=t.n(a),i=t(721),r=t.n(i),o=t(344),l=t.n(o),c=t(896),u=t.n(c),g=t(514),d=t.n(g),b=t(306),h=t.n(b),f=t(157),m=t.n(f),_=t(587),p=t.n(_);n().registerLanguage("bash",s()),n().registerLanguage("java",r()),n().registerLanguage("js",l()),n().registerLanguage("objc",u()),n().registerLanguage("shell",d()),n().registerLanguage("swift",h()),n().registerLanguage("xml",m()),n().registerLanguage("yaml",p()),document.addEventListener("DOMContentLoaded",(e=>{document.querySelectorAll("pre code").forEach((e=>{n().highlightBlock(e)}))}))})()})();