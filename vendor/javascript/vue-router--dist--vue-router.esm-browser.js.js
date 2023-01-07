import{onUnmounted as e,onDeactivated as t,onActivated as n,getCurrentInstance as o,inject as r,computed as a,unref as i,watchEffect as s,defineComponent as c,reactive as l,h as u,provide as d,ref as f,watch as h,shallowRef as p,nextTick as m}from"vue";import{setupDevtoolsPlugin as g}from"@vue/devtools-api";
/*!
  * vue-router v4.1.6
  * (c) 2022 Eduardo San Martin Morote
  * @license MIT
  */const v="undefined"!==typeof window;function isESModule(e){return e.__esModule||"Module"===e[Symbol.toStringTag]}const y=Object.assign;function applyToParams(e,t){const n={};for(const o in t){const r=t[o];n[o]=R(r)?r.map(e):e(r)}return n}const noop=()=>{};const R=Array.isArray;function warn(e){const t=Array.from(arguments).slice(1);console.warn.apply(console,["[Vue Router warn]: "+e].concat(t))}const b=/\/$/;const removeTrailingSlash=e=>e.replace(b,"")
/**
 * Transforms a URI into a normalized history location
 *
 * @param parseQuery
 * @param location - URI to normalize
 * @param currentLocation - current absolute location. Allows resolving relative
 * paths. Must start with `/`. Defaults to `/`
 * @returns a normalized history location
 */;function parseURL(e,t,n="/"){let o,r={},a="",i="";const s=t.indexOf("#");let c=t.indexOf("?");s<c&&s>=0&&(c=-1);if(c>-1){o=t.slice(0,c);a=t.slice(c+1,s>-1?s:t.length);r=e(a)}if(s>-1){o=o||t.slice(0,s);i=t.slice(s,t.length)}o=resolveRelativePath(null!=o?o:t,n);return{fullPath:o+(a&&"?")+a+i,path:o,query:r,hash:i}}
/**
 * Stringifies a URL object
 *
 * @param stringifyQuery
 * @param location
 */function stringifyURL(e,t){const n=t.query?e(t.query):"";return t.path+(n&&"?")+n+(t.hash||"")}
/**
 * Strips off the base from the beginning of a location.pathname in a non-case-sensitive way.
 *
 * @param pathname - location.pathname
 * @param base - base to strip off
 */function stripBase(e,t){return t&&e.toLowerCase().startsWith(t.toLowerCase())?e.slice(t.length)||"/":e}
/**
 * Checks if two RouteLocation are equal. This means that both locations are
 * pointing towards the same {@link RouteRecord} and that all `params`, `query`
 * parameters and `hash` are the same
 *
 * @param a - first {@link RouteLocation}
 * @param b - second {@link RouteLocation}
 */function isSameRouteLocation(e,t,n){const o=t.matched.length-1;const r=n.matched.length-1;return o>-1&&o===r&&isSameRouteRecord(t.matched[o],n.matched[r])&&isSameRouteLocationParams(t.params,n.params)&&e(t.query)===e(n.query)&&t.hash===n.hash}
/**
 * Check if two `RouteRecords` are equal. Takes into account aliases: they are
 * considered equal to the `RouteRecord` they are aliasing.
 *
 * @param a - first {@link RouteRecord}
 * @param b - second {@link RouteRecord}
 */function isSameRouteRecord(e,t){return(e.aliasOf||e)===(t.aliasOf||t)}function isSameRouteLocationParams(e,t){if(Object.keys(e).length!==Object.keys(t).length)return false;for(const n in e)if(!isSameRouteLocationParamsValue(e[n],t[n]))return false;return true}function isSameRouteLocationParamsValue(e,t){return R(e)?isEquivalentArray(e,t):R(t)?isEquivalentArray(t,e):e===t}
/**
 * Check if two arrays are the same or if an array with one single entry is the
 * same as another primitive value. Used to check query and parameters
 *
 * @param a - array of values
 * @param b - array of values or a single value
 */function isEquivalentArray(e,t){return R(t)?e.length===t.length&&e.every(((e,n)=>e===t[n])):1===e.length&&e[0]===t}
/**
 * Resolves a relative path that starts with `.`.
 *
 * @param to - path location we are resolving
 * @param from - currentLocation.path, should start with `/`
 */function resolveRelativePath(e,t){if(e.startsWith("/"))return e;if(!t.startsWith("/")){warn(`Cannot resolve a relative location without an absolute path. Trying to resolve "${e}" from "${t}". It should look like "/${t}".`);return e}if(!e)return t;const n=t.split("/");const o=e.split("/");let r=n.length-1;let a;let i;for(a=0;a<o.length;a++){i=o[a];if("."!==i){if(".."!==i)break;r>1&&r--}}return n.slice(0,r).join("/")+"/"+o.slice(a-(a===o.length?1:0)).join("/")}var w;(function(e){e.pop="pop";e.push="push"})(w||(w={}));var k;(function(e){e.back="back";e.forward="forward";e.unknown=""})(k||(k={}));const P="";
/**
 * Normalizes a base by removing any trailing slash and reading the base tag if
 * present.
 *
 * @param base - base to normalize
 */function normalizeBase(e){if(!e)if(v){const t=document.querySelector("base");e=t&&t.getAttribute("href")||"/";e=e.replace(/^\w+:\/\/[^\/]+/,"")}else e="/";"/"!==e[0]&&"#"!==e[0]&&(e="/"+e);return removeTrailingSlash(e)}const E=/^[^#]+#/;function createHref(e,t){return e.replace(E,"#")+t}function getElementPosition(e,t){const n=document.documentElement.getBoundingClientRect();const o=e.getBoundingClientRect();return{behavior:t.behavior,left:o.left-n.left-(t.left||0),top:o.top-n.top-(t.top||0)}}const computeScrollPosition=()=>({left:window.pageXOffset,top:window.pageYOffset});function scrollToPosition(e){let t;if("el"in e){const n=e.el;const o="string"===typeof n&&n.startsWith("#");if("string"===typeof e.el&&(!o||!document.getElementById(e.el.slice(1))))try{const t=document.querySelector(e.el);if(o&&t){warn(`The selector "${e.el}" should be passed as "el: document.querySelector('${e.el}')" because it starts with "#".`);return}}catch(t){warn(`The selector "${e.el}" is invalid. If you are using an id selector, make sure to escape it. You can find more information about escaping characters in selectors at https://mathiasbynens.be/notes/css-escapes or use CSS.escape (https://developer.mozilla.org/en-US/docs/Web/API/CSS/escape).`);return}const r="string"===typeof n?o?document.getElementById(n.slice(1)):document.querySelector(n):n;if(!r){warn(`Couldn't find element using selector "${e.el}" returned by scrollBehavior.`);return}t=getElementPosition(r,e)}else t=e;"scrollBehavior"in document.documentElement.style?window.scrollTo(t):window.scrollTo(null!=t.left?t.left:window.pageXOffset,null!=t.top?t.top:window.pageYOffset)}function getScrollKey(e,t){const n=history.state?history.state.position-t:-1;return n+e}const S=new Map;function saveScrollPosition(e,t){S.set(e,t)}function getSavedScrollPosition(e){const t=S.get(e);S.delete(e);return t}let createBaseLocation=()=>location.protocol+"//"+location.host
/**
 * Creates a normalized history location from a window.location object
 * @param location -
 */;function createCurrentLocation(e,t){const{pathname:n,search:o,hash:r}=t;const a=e.indexOf("#");if(a>-1){let t=r.includes(e.slice(a))?e.slice(a).length:1;let n=r.slice(t);"/"!==n[0]&&(n="/"+n);return stripBase(n,"")}const i=stripBase(n,e);return i+o+r}function useHistoryListeners(e,t,n,o){let r=[];let a=[];let i=null;const popStateHandler=({state:a})=>{const s=createCurrentLocation(e,location);const c=n.value;const l=t.value;let u=0;if(a){n.value=s;t.value=a;if(i&&i===c){i=null;return}u=l?a.position-l.position:0}else o(s);r.forEach((e=>{e(n.value,c,{delta:u,type:w.pop,direction:u?u>0?k.forward:k.back:k.unknown})}))};function pauseListeners(){i=n.value}function listen(e){r.push(e);const teardown=()=>{const t=r.indexOf(e);t>-1&&r.splice(t,1)};a.push(teardown);return teardown}function beforeUnloadListener(){const{history:e}=window;e.state&&e.replaceState(y({},e.state,{scroll:computeScrollPosition()}),"")}function destroy(){for(const e of a)e();a=[];window.removeEventListener("popstate",popStateHandler);window.removeEventListener("beforeunload",beforeUnloadListener)}window.addEventListener("popstate",popStateHandler);window.addEventListener("beforeunload",beforeUnloadListener);return{pauseListeners:pauseListeners,listen:listen,destroy:destroy}}function buildState(e,t,n,o=false,r=false){return{back:e,current:t,forward:n,replaced:o,position:window.history.length,scroll:r?computeScrollPosition():null}}function useHistoryStateNavigation(e){const{history:t,location:n}=window;const o={value:createCurrentLocation(e,n)};const r={value:t.state};r.value||changeLocation(o.value,{back:null,current:o.value,forward:null,position:t.length-1,replaced:true,scroll:null},true);function changeLocation(o,a,i){const s=e.indexOf("#");const c=s>-1?(n.host&&document.querySelector("base")?e:e.slice(s))+o:createBaseLocation()+e+o;try{t[i?"replaceState":"pushState"](a,"",c);r.value=a}catch(e){warn("Error with push/replace State",e);n[i?"replace":"assign"](c)}}function replace(e,n){const a=y({},t.state,buildState(r.value.back,e,r.value.forward,true),n,{position:r.value.position});changeLocation(e,a,true);o.value=e}function push(e,n){const a=y({},r.value,t.state,{forward:e,scroll:computeScrollPosition()});t.state||warn("history.state seems to have been manually replaced without preserving the necessary values. Make sure to preserve existing history state if you are manually calling history.replaceState:\n\nhistory.replaceState(history.state, '', url)\n\nYou can find more information at https://next.router.vuejs.org/guide/migration/#usage-of-history-state.");changeLocation(a.current,a,true);const i=y({},buildState(o.value,e,null),{position:a.position+1},n);changeLocation(e,i,false);o.value=e}return{location:o,state:r,push:push,replace:replace}}
/**
 * Creates an HTML5 history. Most common history for single page applications.
 *
 * @param base -
 */function createWebHistory(e){e=normalizeBase(e);const t=useHistoryStateNavigation(e);const n=useHistoryListeners(e,t.state,t.location,t.replace);function go(e,t=true){t||n.pauseListeners();history.go(e)}const o=y({location:"",base:e,go:go,createHref:createHref.bind(null,e)},t,n);Object.defineProperty(o,"location",{enumerable:true,get:()=>t.location.value});Object.defineProperty(o,"state",{enumerable:true,get:()=>t.state.value});return o}
/**
 * Creates an in-memory based history. The main purpose of this history is to handle SSR. It starts in a special location that is nowhere.
 * It's up to the user to replace that location with the starter location by either calling `router.push` or `router.replace`.
 *
 * @param base - Base applied to all urls, defaults to '/'
 * @returns a history object that can be passed to the router constructor
 */function createMemoryHistory(e=""){let t=[];let n=[P];let o=0;e=normalizeBase(e);function setLocation(e){o++;if(o===n.length)n.push(e);else{n.splice(o);n.push(e)}}function triggerListeners(e,n,{direction:o,delta:r}){const a={direction:o,delta:r,type:w.pop};for(const o of t)o(e,n,a)}const r={location:P,state:{},base:e,createHref:createHref.bind(null,e),replace(e){n.splice(o--,1);setLocation(e)},push(e,t){setLocation(e)},listen(e){t.push(e);return()=>{const n=t.indexOf(e);n>-1&&t.splice(n,1)}},destroy(){t=[];n=[P];o=0},go(e,t=true){const r=this.location;const a=e<0?k.back:k.forward;o=Math.max(0,Math.min(o+e,n.length-1));t&&triggerListeners(this.location,r,{direction:a,delta:e})}};Object.defineProperty(r,"location",{enumerable:true,get:()=>n[o]});return r}
/**
 * Creates a hash history. Useful for web applications with no host (e.g. `file://`) or when configuring a server to
 * handle any URL is not possible.
 *
 * @param base - optional base to provide. Defaults to `location.pathname + location.search` If there is a `<base>` tag
 * in the `head`, its value will be ignored in favor of this parameter **but note it affects all the history.pushState()
 * calls**, meaning that if you use a `<base>` tag, it's `href` value **has to match this parameter** (ignoring anything
 * after the `#`).
 *
 * @example
 * ```js
 * // at https://example.com/folder
 * createWebHashHistory() // gives a url of `https://example.com/folder#`
 * createWebHashHistory('/folder/') // gives a url of `https://example.com/folder/#`
 * // if the `#` is provided in the base, it won't be added by `createWebHashHistory`
 * createWebHashHistory('/folder/#/app/') // gives a url of `https://example.com/folder/#/app/`
 * // you should avoid doing this because it changes the original url and breaks copying urls
 * createWebHashHistory('/other-folder/') // gives a url of `https://example.com/other-folder/#`
 *
 * // at file:///usr/etc/folder/index.html
 * // for locations with no `host`, the base is ignored
 * createWebHashHistory('/iAmIgnored') // gives a url of `file:///usr/etc/folder/index.html#`
 * ```
 */function createWebHashHistory(e){e=location.host?e||location.pathname+location.search:"";e.includes("#")||(e+="#");e.endsWith("#/")||e.endsWith("#")||warn(`A hash base must end with a "#":\n"${e}" should be "${e.replace(/#.*$/,"#")}".`);return createWebHistory(e)}function isRouteLocation(e){return"string"===typeof e||e&&"object"===typeof e}function isRouteName(e){return"string"===typeof e||"symbol"===typeof e}const C={path:"/",name:void 0,params:{},query:{},hash:"",fullPath:"/",matched:[],meta:{},redirectedFrom:void 0};const $=Symbol("navigation failure");var _;(function(e){e[e.aborted=4]="aborted";e[e.cancelled=8]="cancelled";e[e.duplicated=16]="duplicated"})(_||(_={}));const L={1({location:e,currentLocation:t}){return`No match for\n ${JSON.stringify(e)}${t?"\nwhile being at\n"+JSON.stringify(t):""}`},2({from:e,to:t}){return`Redirected from "${e.fullPath}" to "${stringifyRoute(t)}" via a navigation guard.`},4({from:e,to:t}){return`Navigation aborted from "${e.fullPath}" to "${t.fullPath}" via a navigation guard.`},8({from:e,to:t}){return`Navigation cancelled from "${e.fullPath}" to "${t.fullPath}" with a new navigation.`},16({from:e,to:t}){return`Avoided redundant navigation to current location: "${e.fullPath}".`}};function createRouterError(e,t){return y(new Error(L[e](t)),{type:e,[$]:true},t)}function isNavigationFailure(e,t){return e instanceof Error&&$ in e&&(null==t||!!(e.type&t))}const O=["params","query","hash"];function stringifyRoute(e){if("string"===typeof e)return e;if("path"in e)return e.path;const t={};for(const n of O)n in e&&(t[n]=e[n]);return JSON.stringify(t,null,2)}const A="[^/]+?";const x={sensitive:false,strict:false,start:true,end:true};const T=/[.+*?^${}()[\]/\\]/g;
/**
 * Creates a path parser from an array of Segments (a segment is an array of Tokens)
 *
 * @param segments - array of segments returned by tokenizePath
 * @param extraOptions - optional options for the regexp
 * @returns a PathParser
 */function tokensToParser(e,t){const n=y({},x,t);const o=[];let r=n.start?"^":"";const a=[];for(const t of e){const e=t.length?[]:[90];n.strict&&!t.length&&(r+="/");for(let o=0;o<t.length;o++){const i=t[o];let s=40+(n.sensitive?.25:0);if(0===i.type){o||(r+="/");r+=i.value.replace(T,"\\$&");s+=40}else if(1===i.type){const{value:e,repeatable:n,optional:c,regexp:l}=i;a.push({name:e,repeatable:n,optional:c});const u=l||A;if(u!==A){s+=10;try{new RegExp(`(${u})`)}catch(t){throw new Error(`Invalid custom RegExp for param "${e}" (${u}): `+t.message)}}let d=n?`((?:${u})(?:/(?:${u}))*)`:`(${u})`;o||(d=c&&t.length<2?`(?:/${d})`:"/"+d);c&&(d+="?");r+=d;s+=20;c&&(s+=-8);n&&(s+=-20);".*"===u&&(s+=-50)}e.push(s)}o.push(e)}if(n.strict&&n.end){const e=o.length-1;o[e][o[e].length-1]+=.7000000000000001}n.strict||(r+="/?");n.end?r+="$":n.strict&&(r+="(?:/|$)");const i=new RegExp(r,n.sensitive?"":"i");function parse(e){const t=e.match(i);const n={};if(!t)return null;for(let e=1;e<t.length;e++){const o=t[e]||"";const r=a[e-1];n[r.name]=o&&r.repeatable?o.split("/"):o}return n}function stringify(t){let n="";let o=false;for(const r of e){o&&n.endsWith("/")||(n+="/");o=false;for(const e of r)if(0===e.type)n+=e.value;else if(1===e.type){const{value:a,repeatable:i,optional:s}=e;const c=a in t?t[a]:"";if(R(c)&&!i)throw new Error(`Provided param "${a}" is an array but it is not repeatable (* or + modifiers)`);const l=R(c)?c.join("/"):c;if(!l){if(!s)throw new Error(`Missing required param "${a}"`);r.length<2&&(n.endsWith("/")?n=n.slice(0,-1):o=true)}n+=l}}return n||"/"}return{re:i,score:o,keys:a,parse:parse,stringify:stringify}}
/**
 * Compares an array of numbers as used in PathParser.score and returns a
 * number. This function can be used to `sort` an array
 *
 * @param a - first array of numbers
 * @param b - second array of numbers
 * @returns 0 if both are equal, < 0 if a should be sorted first, > 0 if b
 * should be sorted first
 */function compareScoreArray(e,t){let n=0;while(n<e.length&&n<t.length){const o=t[n]-e[n];if(o)return o;n++}return e.length<t.length?1===e.length&&80===e[0]?-1:1:e.length>t.length?1===t.length&&80===t[0]?1:-1:0}
/**
 * Compare function that can be used with `sort` to sort an array of PathParser
 *
 * @param a - first PathParser
 * @param b - second PathParser
 * @returns 0 if both are equal, < 0 if a should be sorted first, > 0 if b
 */function comparePathParserScore(e,t){let n=0;const o=e.score;const r=t.score;while(n<o.length&&n<r.length){const e=compareScoreArray(o[n],r[n]);if(e)return e;n++}if(1===Math.abs(r.length-o.length)){if(isLastScoreNegative(o))return 1;if(isLastScoreNegative(r))return-1}return r.length-o.length}
/**
 * This allows detecting splats at the end of a path: /home/:id(.*)*
 *
 * @param score - score to check
 * @returns true if the last entry is negative
 */function isLastScoreNegative(e){const t=e[e.length-1];return e.length>0&&t[t.length-1]<0}const j={type:0,value:""};const M=/[a-zA-Z0-9_]/;function tokenizePath(e){if(!e)return[[]];if("/"===e)return[[j]];if(!e.startsWith("/"))throw new Error(`Route paths should start with a "/": "${e}" should be "/${e}".`);function crash(e){throw new Error(`ERR (${t})/"${s}": ${e}`)}let t=0;let n=t;const o=[];let r;function finalizeSegment(){r&&o.push(r);r=[]}let a=0;let i;let s="";let c="";function consumeBuffer(){if(s){if(0===t)r.push({type:0,value:s});else if(1===t||2===t||3===t){r.length>1&&("*"===i||"+"===i)&&crash(`A repeatable param (${s}) must be alone in its segment. eg: '/:ids+.`);r.push({type:1,value:s,regexp:c,repeatable:"*"===i||"+"===i,optional:"*"===i||"?"===i})}else crash("Invalid state to consume buffer");s=""}}function addCharToBuffer(){s+=i}while(a<e.length){i=e[a++];if("\\"!==i||2===t)switch(t){case 0:if("/"===i){s&&consumeBuffer();finalizeSegment()}else if(":"===i){consumeBuffer();t=1}else addCharToBuffer();break;case 4:addCharToBuffer();t=n;break;case 1:if("("===i)t=2;else if(M.test(i))addCharToBuffer();else{consumeBuffer();t=0;"*"!==i&&"?"!==i&&"+"!==i&&a--}break;case 2:")"===i?"\\"==c[c.length-1]?c=c.slice(0,-1)+i:t=3:c+=i;break;case 3:consumeBuffer();t=0;"*"!==i&&"?"!==i&&"+"!==i&&a--;c="";break;default:crash("Unknown state");break}else{n=t;t=4}}2===t&&crash(`Unfinished custom RegExp for param "${s}"`);consumeBuffer();finalizeSegment();return o}function createRouteRecordMatcher(e,t,n){const o=tokensToParser(tokenizePath(e.path),n);{const t=new Set;for(const n of o.keys){t.has(n.name)&&warn(`Found duplicated params with name "${n.name}" for path "${e.path}". Only the last one will be available on "$route.params".`);t.add(n.name)}}const r=y(o,{record:e,parent:t,children:[],alias:[]});t&&!r.record.aliasOf===!t.record.aliasOf&&t.children.push(r);return r}
/**
 * Creates a Router Matcher.
 *
 * @internal
 * @param routes - array of initial routes
 * @param globalOptions - global route options
 */function createRouterMatcher(e,t){const n=[];const o=new Map;t=mergeOptions({strict:false,end:true,sensitive:false},t);function getRecordMatcher(e){return o.get(e)}function addRoute(e,n,o){const r=!o;const a=normalizeRouteRecord(e);checkChildMissingNameWithEmptyPath(a,n);a.aliasOf=o&&o.record;const i=mergeOptions(t,e);const s=[a];if("alias"in e){const t="string"===typeof e.alias?[e.alias]:e.alias;for(const e of t)s.push(y({},a,{components:o?o.record.components:a.components,path:e,aliasOf:o?o.record:a}))}let c;let l;for(const t of s){const{path:s}=t;if(n&&"/"!==s[0]){const e=n.record.path;const o="/"===e[e.length-1]?"":"/";t.path=n.record.path+(s&&o+s)}if("*"===t.path)throw new Error('Catch all routes ("*") must now be defined using a param with a custom regexp.\nSee more at https://next.router.vuejs.org/guide/migration/#removed-star-or-catch-all-routes.');c=createRouteRecordMatcher(t,n,i);n&&"/"===s[0]&&checkMissingParamsInAbsolutePath(c,n);if(o){o.alias.push(c);checkSameParams(o,c)}else{l=l||c;l!==c&&l.alias.push(c);r&&e.name&&!isAliasRecord(c)&&removeRoute(e.name)}if(a.children){const e=a.children;for(let t=0;t<e.length;t++)addRoute(e[t],c,o&&o.children[t])}o=o||c;(c.record.components&&Object.keys(c.record.components).length||c.record.name||c.record.redirect)&&insertMatcher(c)}return l?()=>{removeRoute(l)}:noop}function removeRoute(e){if(isRouteName(e)){const t=o.get(e);if(t){o.delete(e);n.splice(n.indexOf(t),1);t.children.forEach(removeRoute);t.alias.forEach(removeRoute)}}else{const t=n.indexOf(e);if(t>-1){n.splice(t,1);e.record.name&&o.delete(e.record.name);e.children.forEach(removeRoute);e.alias.forEach(removeRoute)}}}function getRoutes(){return n}function insertMatcher(e){let t=0;while(t<n.length&&comparePathParserScore(e,n[t])>=0&&(e.record.path!==n[t].record.path||!isRecordChildOf(e,n[t])))t++;n.splice(t,0,e);e.record.name&&!isAliasRecord(e)&&o.set(e.record.name,e)}function resolve(e,t){let r;let a={};let i;let s;if("name"in e&&e.name){r=o.get(e.name);if(!r)throw createRouterError(1,{location:e});{const t=Object.keys(e.params||{}).filter((e=>!r.keys.find((t=>t.name===e))));t.length&&warn(`Discarded invalid param(s) "${t.join('", "')}" when navigating. See https://github.com/vuejs/router/blob/main/packages/router/CHANGELOG.md#414-2022-08-22 for more details.`)}s=r.record.name;a=y(paramsFromLocation(t.params,r.keys.filter((e=>!e.optional)).map((e=>e.name))),e.params&&paramsFromLocation(e.params,r.keys.map((e=>e.name))));i=r.stringify(a)}else if("path"in e){i=e.path;i.startsWith("/")||warn(`The Matcher cannot resolve relative paths but received "${i}". Unless you directly called \`matcher.resolve("${i}")\`, this is probably a bug in vue-router. Please open an issue at https://new-issue.vuejs.org/?repo=vuejs/router.`);r=n.find((e=>e.re.test(i)));if(r){a=r.parse(i);s=r.record.name}}else{r=t.name?o.get(t.name):n.find((e=>e.re.test(t.path)));if(!r)throw createRouterError(1,{location:e,currentLocation:t});s=r.record.name;a=y({},t.params,e.params);i=r.stringify(a)}const c=[];let l=r;while(l){c.unshift(l.record);l=l.parent}return{name:s,path:i,params:a,matched:c,meta:mergeMetaFields(c)}}e.forEach((e=>addRoute(e)));return{addRoute:addRoute,resolve:resolve,removeRoute:removeRoute,getRoutes:getRoutes,getRecordMatcher:getRecordMatcher}}function paramsFromLocation(e,t){const n={};for(const o of t)o in e&&(n[o]=e[o]);return n}
/**
 * Normalizes a RouteRecordRaw. Creates a copy
 *
 * @param record
 * @returns the normalized version
 */function normalizeRouteRecord(e){return{path:e.path,redirect:e.redirect,name:e.name,meta:e.meta||{},aliasOf:void 0,beforeEnter:e.beforeEnter,props:normalizeRecordProps(e),children:e.children||[],instances:{},leaveGuards:new Set,updateGuards:new Set,enterCallbacks:{},components:"components"in e?e.components||null:e.component&&{default:e.component}}}
/**
 * Normalize the optional `props` in a record to always be an object similar to
 * components. Also accept a boolean for components.
 * @param record
 */function normalizeRecordProps(e){const t={};const n=e.props||false;if("component"in e)t.default=n;else for(const o in e.components)t[o]="boolean"===typeof n?n:n[o];return t}
/**
 * Checks if a record or any of its parent is an alias
 * @param record
 */function isAliasRecord(e){while(e){if(e.record.aliasOf)return true;e=e.parent}return false}
/**
 * Merge meta fields of an array of records
 *
 * @param matched - array of matched records
 */function mergeMetaFields(e){return e.reduce(((e,t)=>y(e,t.meta)),{})}function mergeOptions(e,t){const n={};for(const o in e)n[o]=o in t?t[o]:e[o];return n}function isSameParam(e,t){return e.name===t.name&&e.optional===t.optional&&e.repeatable===t.repeatable}
/**
 * Check if a path and its alias have the same required params
 *
 * @param a - original record
 * @param b - alias record
 */function checkSameParams(e,t){for(const n of e.keys)if(!n.optional&&!t.keys.find(isSameParam.bind(null,n)))return warn(`Alias "${t.record.path}" and the original record: "${e.record.path}" must have the exact same param named "${n.name}"`);for(const n of t.keys)if(!n.optional&&!e.keys.find(isSameParam.bind(null,n)))return warn(`Alias "${t.record.path}" and the original record: "${e.record.path}" must have the exact same param named "${n.name}"`)}
/**
 * A route with a name and a child with an empty path without a name should warn when adding the route
 *
 * @param mainNormalizedRecord - RouteRecordNormalized
 * @param parent - RouteRecordMatcher
 */function checkChildMissingNameWithEmptyPath(e,t){t&&t.record.name&&!e.name&&!e.path&&warn(`The route named "${String(t.record.name)}" has a child without a name and an empty path. Using that name won't render the empty path child so you probably want to move the name to the child instead. If this is intentional, add a name to the child route to remove the warning.`)}function checkMissingParamsInAbsolutePath(e,t){for(const n of t.keys)if(!e.keys.find(isSameParam.bind(null,n)))return warn(`Absolute path "${e.record.path}" must have the exact same param named "${n.name}" as its parent "${t.record.path}".`)}function isRecordChildOf(e,t){return t.children.some((t=>t===e||isRecordChildOf(e,t)))}const I=/#/g;const N=/&/g;const F=/\//g;const B=/=/g;const W=/\?/g;const U=/\+/g;const G=/%5B/g;const z=/%5D/g;const D=/%5E/g;const Q=/%60/g;const H=/%7B/g;const q=/%7C/g;const V=/%7D/g;const K=/%20/g;
/**
 * Encode characters that need to be encoded on the path, search and hash
 * sections of the URL.
 *
 * @internal
 * @param text - string to encode
 * @returns encoded string
 */function commonEncode(e){return encodeURI(""+e).replace(q,"|").replace(G,"[").replace(z,"]")}
/**
 * Encode characters that need to be encoded on the hash section of the URL.
 *
 * @param text - string to encode
 * @returns encoded string
 */function encodeHash(e){return commonEncode(e).replace(H,"{").replace(V,"}").replace(D,"^")}
/**
 * Encode characters that need to be encoded query values on the query
 * section of the URL.
 *
 * @param text - string to encode
 * @returns encoded string
 */function encodeQueryValue(e){return commonEncode(e).replace(U,"%2B").replace(K,"+").replace(I,"%23").replace(N,"%26").replace(Q,"`").replace(H,"{").replace(V,"}").replace(D,"^")}
/**
 * Like `encodeQueryValue` but also encodes the `=` character.
 *
 * @param text - string to encode
 */function encodeQueryKey(e){return encodeQueryValue(e).replace(B,"%3D")}
/**
 * Encode characters that need to be encoded on the path section of the URL.
 *
 * @param text - string to encode
 * @returns encoded string
 */function encodePath(e){return commonEncode(e).replace(I,"%23").replace(W,"%3F")}
/**
 * Encode characters that need to be encoded on the path section of the URL as a
 * param. This function encodes everything {@link encodePath} does plus the
 * slash (`/`) character. If `text` is `null` or `undefined`, returns an empty
 * string instead.
 *
 * @param text - string to encode
 * @returns encoded string
 */function encodeParam(e){return null==e?"":encodePath(e).replace(F,"%2F")}
/**
 * Decode text using `decodeURIComponent`. Returns the original text if it
 * fails.
 *
 * @param text - string to decode
 * @returns decoded string
 */function decode(e){try{return decodeURIComponent(""+e)}catch(t){warn(`Error decoding "${e}". Using original value`)}return""+e}
/**
 * Transforms a queryString into a {@link LocationQuery} object. Accept both, a
 * version with the leading `?` and without Should work as URLSearchParams

 * @internal
 *
 * @param search - search string to parse
 * @returns a query object
 */function parseQuery(e){const t={};if(""===e||"?"===e)return t;const n="?"===e[0];const o=(n?e.slice(1):e).split("&");for(let e=0;e<o.length;++e){const n=o[e].replace(U," ");const r=n.indexOf("=");const a=decode(r<0?n:n.slice(0,r));const i=r<0?null:decode(n.slice(r+1));if(a in t){let e=t[a];R(e)||(e=t[a]=[e]);e.push(i)}else t[a]=i}return t}
/**
 * Stringifies a {@link LocationQueryRaw} object. Like `URLSearchParams`, it
 * doesn't prepend a `?`
 *
 * @internal
 *
 * @param query - query object to stringify
 * @returns string version of the query without the leading `?`
 */function stringifyQuery(e){let t="";for(let n in e){const o=e[n];n=encodeQueryKey(n);if(null==o){void 0!==o&&(t+=(t.length?"&":"")+n);continue}const r=R(o)?o.map((e=>e&&encodeQueryValue(e))):[o&&encodeQueryValue(o)];r.forEach((e=>{if(void 0!==e){t+=(t.length?"&":"")+n;null!=e&&(t+="="+e)}}))}return t}
/**
 * Transforms a {@link LocationQueryRaw} into a {@link LocationQuery} by casting
 * numbers into strings, removing keys with an undefined value and replacing
 * undefined with null in arrays
 *
 * @param query - query object to normalize
 * @returns a normalized query object
 */function normalizeQuery(e){const t={};for(const n in e){const o=e[n];void 0!==o&&(t[n]=R(o)?o.map((e=>null==e?null:""+e)):null==o?o:""+o)}return t}const Y=Symbol("router view location matched");const J=Symbol("router view depth");const X=Symbol("router");const Z=Symbol("route location");const ee=Symbol("router view location");function useCallbacks(){let e=[];function add(t){e.push(t);return()=>{const n=e.indexOf(t);n>-1&&e.splice(n,1)}}function reset(){e=[]}return{add:add,list:()=>e,reset:reset}}function registerGuard(o,r,a){const removeFromList=()=>{o[r].delete(a)};e(removeFromList);t(removeFromList);n((()=>{o[r].add(a)}));o[r].add(a)}
/**
 * Add a navigation guard that triggers whenever the component for the current
 * location is about to be left. Similar to {@link beforeRouteLeave} but can be
 * used in any component. The guard is removed when the component is unmounted.
 *
 * @param leaveGuard - {@link NavigationGuard}
 */function onBeforeRouteLeave(e){if(!o()){warn("getCurrentInstance() returned null. onBeforeRouteLeave() must be called at the top of a setup function");return}const t=r(Y,{}).value;t?registerGuard(t,"leaveGuards",e):warn("No active route record was found when calling `onBeforeRouteLeave()`. Make sure you call this function inside a component child of <router-view>. Maybe you called it inside of App.vue?")}
/**
 * Add a navigation guard that triggers whenever the current location is about
 * to be updated. Similar to {@link beforeRouteUpdate} but can be used in any
 * component. The guard is removed when the component is unmounted.
 *
 * @param updateGuard - {@link NavigationGuard}
 */function onBeforeRouteUpdate(e){if(!o()){warn("getCurrentInstance() returned null. onBeforeRouteUpdate() must be called at the top of a setup function");return}const t=r(Y,{}).value;t?registerGuard(t,"updateGuards",e):warn("No active route record was found when calling `onBeforeRouteUpdate()`. Make sure you call this function inside a component child of <router-view>. Maybe you called it inside of App.vue?")}function guardToPromiseFn(e,t,n,o,r){const a=o&&(o.enterCallbacks[r]=o.enterCallbacks[r]||[]);return()=>new Promise(((i,s)=>{const next=e=>{if(false===e)s(createRouterError(4,{from:n,to:t}));else if(e instanceof Error)s(e);else if(isRouteLocation(e))s(createRouterError(2,{from:t,to:e}));else{a&&o.enterCallbacks[r]===a&&"function"===typeof e&&a.push(e);i()}};const c=e.call(o&&o.instances[r],t,n,canOnlyBeCalledOnce(next,t,n));let l=Promise.resolve(c);e.length<3&&(l=l.then(next));if(e.length>2){const t=`The "next" callback was never called inside of ${e.name?'"'+e.name+'"':""}:\n${e.toString()}\n. If you are returning a value instead of calling "next", make sure to remove the "next" parameter from your function.`;if("object"===typeof c&&"then"in c)l=l.then((e=>{if(!next._called){warn(t);return Promise.reject(new Error("Invalid navigation guard"))}return e}));else if(void 0!==c&&!next._called){warn(t);s(new Error("Invalid navigation guard"));return}}l.catch((e=>s(e)))}))}function canOnlyBeCalledOnce(e,t,n){let o=0;return function(){1===o++&&warn(`The "next" callback was called more than once in one navigation guard when going from "${n.fullPath}" to "${t.fullPath}". It should be called exactly one time in each navigation guard. This will fail in production.`);e._called=true;1===o&&e.apply(null,arguments)}}function extractComponentsGuards(e,t,n,o){const r=[];for(const a of e){a.components||a.children.length||warn(`Record with path "${a.path}" is either missing a "component(s)" or "children" property.`);for(const e in a.components){let i=a.components[e];if(!i||"object"!==typeof i&&"function"!==typeof i){warn(`Component "${e}" in record with path "${a.path}" is not a valid component. Received "${String(i)}".`);throw new Error("Invalid route component")}if("then"in i){warn(`Component "${e}" in record with path "${a.path}" is a Promise instead of a function that returns a Promise. Did you write "import('./MyPage.vue')" instead of "() => import('./MyPage.vue')" ? This will break in production if not fixed.`);const t=i;i=()=>t}else if(i.__asyncLoader&&!i.__warnedDefineAsync){i.__warnedDefineAsync=true;warn(`Component "${e}" in record with path "${a.path}" is defined using "defineAsyncComponent()". Write "() => import('./MyPage.vue')" instead of "defineAsyncComponent(() => import('./MyPage.vue'))".`)}if("beforeRouteEnter"===t||a.instances[e])if(isRouteComponent(i)){const s=i.__vccOpts||i;const c=s[t];c&&r.push(guardToPromiseFn(c,n,o,a,e))}else{let s=i();if(!("catch"in s)){warn(`Component "${e}" in record with path "${a.path}" is a function that does not return a Promise. If you were passing a functional component, make sure to add a "displayName" to the component. This will break in production if not fixed.`);s=Promise.resolve(s)}r.push((()=>s.then((r=>{if(!r)return Promise.reject(new Error(`Couldn't resolve component "${e}" at "${a.path}"`));const i=isESModule(r)?r.default:r;a.components[e]=i;const s=i.__vccOpts||i;const c=s[t];return c&&guardToPromiseFn(c,n,o,a,e)()}))))}}}return r}
/**
 * Allows differentiating lazy components from functional components and vue-class-component
 * @internal
 *
 * @param component
 */function isRouteComponent(e){return"object"===typeof e||"displayName"in e||"props"in e||"__vccOpts"in e}
/**
 * Ensures a route is loaded, so it can be passed as o prop to `<RouterView>`.
 *
 * @param route - resolved route to load
 */function loadRouteLocation(e){return e.matched.every((e=>e.redirect))?Promise.reject(new Error("Cannot load a route that redirects.")):Promise.all(e.matched.map((e=>e.components&&Promise.all(Object.keys(e.components).reduce(((t,n)=>{const o=e.components[n];"function"!==typeof o||"displayName"in o||t.push(o().then((t=>{if(!t)return Promise.reject(new Error(`Couldn't resolve component "${n}" at "${e.path}". Ensure you passed a function that returns a promise.`));const o=isESModule(t)?t.default:t;e.components[n]=o})));return t}),[]))))).then((()=>e))}function useLink(e){const t=r(X);const n=r(Z);const c=a((()=>t.resolve(i(e.to))));const l=a((()=>{const{matched:e}=c.value;const{length:t}=e;const o=e[t-1];const r=n.matched;if(!o||!r.length)return-1;const a=r.findIndex(isSameRouteRecord.bind(null,o));if(a>-1)return a;const i=getOriginalPath(e[t-2]);return t>1&&getOriginalPath(o)===i&&r[r.length-1].path!==i?r.findIndex(isSameRouteRecord.bind(null,e[t-2])):a}));const u=a((()=>l.value>-1&&includesParams(n.params,c.value.params)));const d=a((()=>l.value>-1&&l.value===n.matched.length-1&&isSameRouteLocationParams(n.params,c.value.params)));function navigate(n={}){return guardEvent(n)?t[i(e.replace)?"replace":"push"](i(e.to)).catch(noop):Promise.resolve()}if(v){const e=o();if(e){const t={route:c.value,isActive:u.value,isExactActive:d.value};e.__vrl_devtools=e.__vrl_devtools||[];e.__vrl_devtools.push(t);s((()=>{t.route=c.value;t.isActive=u.value;t.isExactActive=d.value}),{flush:"post"})}}return{route:c,href:a((()=>c.value.href)),isActive:u,isExactActive:d,navigate:navigate}}const te=c({name:"RouterLink",compatConfig:{MODE:3},props:{to:{type:[String,Object],required:true},replace:Boolean,activeClass:String,exactActiveClass:String,custom:Boolean,ariaCurrentValue:{type:String,default:"page"}},useLink:useLink,setup(e,{slots:t}){const n=l(useLink(e));const{options:o}=r(X);const i=a((()=>({[getLinkClass(e.activeClass,o.linkActiveClass,"router-link-active")]:n.isActive,[getLinkClass(e.exactActiveClass,o.linkExactActiveClass,"router-link-exact-active")]:n.isExactActive})));return()=>{const o=t.default&&t.default(n);return e.custom?o:u("a",{"aria-current":n.isExactActive?e.ariaCurrentValue:null,href:n.href,onClick:n.navigate,class:i.value},o)}}});const ne=te;function guardEvent(e){if(!(e.metaKey||e.altKey||e.ctrlKey||e.shiftKey)&&!e.defaultPrevented&&(void 0===e.button||0===e.button)){if(e.currentTarget&&e.currentTarget.getAttribute){const t=e.currentTarget.getAttribute("target");if(/\b_blank\b/i.test(t))return}e.preventDefault&&e.preventDefault();return true}}function includesParams(e,t){for(const n in t){const o=t[n];const r=e[n];if("string"===typeof o){if(o!==r)return false}else if(!R(r)||r.length!==o.length||o.some(((e,t)=>e!==r[t])))return false}return true}
/**
 * Get the original path value of a record by following its aliasOf
 * @param record
 */function getOriginalPath(e){return e?e.aliasOf?e.aliasOf.path:e.path:""}
/**
 * Utility class to get the active class based on defaults.
 * @param propClass
 * @param globalClass
 * @param defaultClass
 */const getLinkClass=(e,t,n)=>null!=e?e:null!=t?t:n;const oe=c({name:"RouterView",inheritAttrs:false,props:{name:{type:String,default:"default"},route:Object},compatConfig:{MODE:3},setup(e,{attrs:t,slots:n}){warnDeprecatedUsage();const o=r(ee);const s=a((()=>e.route||o.value));const c=r(J,0);const l=a((()=>{let e=i(c);const{matched:t}=s.value;let n;while((n=t[e])&&!n.components)e++;return e}));const p=a((()=>s.value.matched[l.value]));d(J,a((()=>l.value+1)));d(Y,p);d(ee,s);const m=f();h((()=>[m.value,p.value,e.name]),(([e,t,n],[o,r,a])=>{if(t){t.instances[n]=e;if(r&&r!==t&&e&&e===o){t.leaveGuards.size||(t.leaveGuards=r.leaveGuards);t.updateGuards.size||(t.updateGuards=r.updateGuards)}}!e||!t||r&&isSameRouteRecord(t,r)&&o||(t.enterCallbacks[n]||[]).forEach((t=>t(e)))}),{flush:"post"});return()=>{const o=s.value;const r=e.name;const a=p.value;const i=a&&a.components[r];if(!i)return normalizeSlot(n.default,{Component:i,route:o});const c=a.props[r];const d=c?true===c?o.params:"function"===typeof c?c(o):c:null;const onVnodeUnmounted=e=>{e.component.isUnmounted&&(a.instances[r]=null)};const f=u(i,y({},d,t,{onVnodeUnmounted:onVnodeUnmounted,ref:m}));if(v&&f.ref){const e={depth:l.value,name:a.name,path:a.path,meta:a.meta};const t=R(f.ref)?f.ref.map((e=>e.i)):[f.ref.i];t.forEach((t=>{t.__vrv_devtools=e}))}return normalizeSlot(n.default,{Component:f,route:o})||f}}});function normalizeSlot(e,t){if(!e)return null;const n=e(t);return 1===n.length?n[0]:n}const re=oe;function warnDeprecatedUsage(){const e=o();const t=e.parent&&e.parent.type.name;if(t&&("KeepAlive"===t||t.includes("Transition"))){const e="KeepAlive"===t?"keep-alive":"transition";warn(`<router-view> can no longer be used directly inside <transition> or <keep-alive>.\nUse slot props instead:\n\n<router-view v-slot="{ Component }">\n  <${e}>\n    <component :is="Component" />\n  </${e}>\n</router-view>`)}}
/**
 * Copies a route location and removes any problematic properties that cannot be shown in devtools (e.g. Vue instances).
 *
 * @param routeLocation - routeLocation to format
 * @param tooltip - optional tooltip
 * @returns a copy of the routeLocation
 */function formatRouteLocation(e,t){const n=y({},e,{matched:e.matched.map((e=>omit(e,["instances","children","aliasOf"])))});return{_custom:{type:null,readOnly:true,display:e.fullPath,tooltip:t,value:n}}}function formatDisplay(e){return{_custom:{display:e}}}let ae=0;function addDevtools(e,t,n){if(t.__hasDevtools)return;t.__hasDevtools=true;const o=ae++;g({id:"org.vuejs.router"+(o?"."+o:""),label:"Vue Router",packageName:"vue-router",homepage:"https://router.vuejs.org",logo:"https://router.vuejs.org/logo.png",componentStateTypes:["Routing"],app:e},(r=>{"function"!==typeof r.now&&console.warn("[Vue Router]: You seem to be using an outdated version of Vue Devtools. Are you still using the Beta release instead of the stable one? You can find the links at https://devtools.vuejs.org/guide/installation.html.");r.on.inspectComponent(((e,n)=>{e.instanceData&&e.instanceData.state.push({type:"Routing",key:"$route",editable:false,value:formatRouteLocation(t.currentRoute.value,"Current Route")})}));r.on.visitComponentTree((({treeNode:e,componentInstance:t})=>{if(t.__vrv_devtools){const n=t.__vrv_devtools;e.tags.push({label:(n.name?`${n.name.toString()}: `:"")+n.path,textColor:0,tooltip:"This component is rendered by &lt;router-view&gt;",backgroundColor:ie})}if(R(t.__vrl_devtools)){t.__devtoolsApi=r;t.__vrl_devtools.forEach((t=>{let n=ue;let o="";if(t.isExactActive){n=ce;o="This is exactly active"}else if(t.isActive){n=se;o="This link is active"}e.tags.push({label:t.route.path,textColor:0,tooltip:o,backgroundColor:n})}))}}));h(t.currentRoute,(()=>{refreshRoutesView();r.notifyComponentUpdate();r.sendInspectorTree(s);r.sendInspectorState(s)}));const a="router:navigations:"+o;r.addTimelineLayer({id:a,label:`Router${o?" "+o:""} Navigations`,color:4237508});t.onError(((e,t)=>{r.addTimelineEvent({layerId:a,event:{title:"Error during Navigation",subtitle:t.fullPath,logType:"error",time:r.now(),data:{error:e},groupId:t.meta.__navigationId}})}));let i=0;t.beforeEach(((e,t)=>{const n={guard:formatDisplay("beforeEach"),from:formatRouteLocation(t,"Current Location during this navigation"),to:formatRouteLocation(e,"Target location")};Object.defineProperty(e.meta,"__navigationId",{value:i++});r.addTimelineEvent({layerId:a,event:{time:r.now(),title:"Start of navigation",subtitle:e.fullPath,data:n,groupId:e.meta.__navigationId}})}));t.afterEach(((e,t,n)=>{const o={guard:formatDisplay("afterEach")};if(n){o.failure={_custom:{type:Error,readOnly:true,display:n?n.message:"",tooltip:"Navigation Failure",value:n}};o.status=formatDisplay("❌")}else o.status=formatDisplay("✅");o.from=formatRouteLocation(t,"Current Location during this navigation");o.to=formatRouteLocation(e,"Target location");r.addTimelineEvent({layerId:a,event:{title:"End of navigation",subtitle:e.fullPath,time:r.now(),data:o,logType:n?"warning":"default",groupId:e.meta.__navigationId}})}));const s="router-inspector:"+o;r.addInspector({id:s,label:"Routes"+(o?" "+o:""),icon:"book",treeFilterPlaceholder:"Search routes"});function refreshRoutesView(){if(!c)return;const e=c;let o=n.getRoutes().filter((e=>!e.parent));o.forEach(resetMatchStateOnRouteRecord);e.filter&&(o=o.filter((t=>isRouteMatching(t,e.filter.toLowerCase()))));o.forEach((e=>markRouteRecordActive(e,t.currentRoute.value)));e.rootNodes=o.map(formatRouteRecordForInspector)}let c;r.on.getInspectorTree((t=>{c=t;t.app===e&&t.inspectorId===s&&refreshRoutesView()}));r.on.getInspectorState((t=>{if(t.app===e&&t.inspectorId===s){const e=n.getRoutes();const o=e.find((e=>e.record.__vd_id===t.nodeId));o&&(t.state={options:formatRouteRecordMatcherForStateInspector(o)})}}));r.sendInspectorTree(s);r.sendInspectorState(s)}))}function modifierForKey(e){return e.optional?e.repeatable?"*":"?":e.repeatable?"+":""}function formatRouteRecordMatcherForStateInspector(e){const{record:t}=e;const n=[{editable:false,key:"path",value:t.path}];null!=t.name&&n.push({editable:false,key:"name",value:t.name});n.push({editable:false,key:"regexp",value:e.re});e.keys.length&&n.push({editable:false,key:"keys",value:{_custom:{type:null,readOnly:true,display:e.keys.map((e=>`${e.name}${modifierForKey(e)}`)).join(" "),tooltip:"Param keys",value:e.keys}}});null!=t.redirect&&n.push({editable:false,key:"redirect",value:t.redirect});e.alias.length&&n.push({editable:false,key:"aliases",value:e.alias.map((e=>e.record.path))});Object.keys(e.record.meta).length&&n.push({editable:false,key:"meta",value:e.record.meta});n.push({key:"score",editable:false,value:{_custom:{type:null,readOnly:true,display:e.score.map((e=>e.join(", "))).join(" | "),tooltip:"Score used to sort routes",value:e.score}}});return n}const ie=15485081;const se=2450411;const ce=8702998;const le=2282478;const ue=16486972;const de=6710886;function formatRouteRecordForInspector(e){const t=[];const{record:n}=e;null!=n.name&&t.push({label:String(n.name),textColor:0,backgroundColor:le});n.aliasOf&&t.push({label:"alias",textColor:0,backgroundColor:ue});e.__vd_match&&t.push({label:"matches",textColor:0,backgroundColor:ie});e.__vd_exactActive&&t.push({label:"exact",textColor:0,backgroundColor:ce});e.__vd_active&&t.push({label:"active",textColor:0,backgroundColor:se});n.redirect&&t.push({label:"string"===typeof n.redirect?`redirect: ${n.redirect}`:"redirects",textColor:16777215,backgroundColor:de});let o=n.__vd_id;if(null==o){o=String(fe++);n.__vd_id=o}return{id:o,label:n.path,tags:t,children:e.children.map(formatRouteRecordForInspector)}}let fe=0;const he=/^\/(.*)\/([a-z]*)$/;function markRouteRecordActive(e,t){const n=t.matched.length&&isSameRouteRecord(t.matched[t.matched.length-1],e.record);e.__vd_exactActive=e.__vd_active=n;n||(e.__vd_active=t.matched.some((t=>isSameRouteRecord(t,e.record))));e.children.forEach((e=>markRouteRecordActive(e,t)))}function resetMatchStateOnRouteRecord(e){e.__vd_match=false;e.children.forEach(resetMatchStateOnRouteRecord)}function isRouteMatching(e,t){const n=String(e.re).match(he);e.__vd_match=false;if(!n||n.length<3)return false;const o=new RegExp(n[1].replace(/\$$/,""),n[2]);if(o.test(t)){e.children.forEach((e=>isRouteMatching(e,t)));if("/"!==e.record.path||"/"===t){e.__vd_match=e.re.test(t);return true}return false}const r=e.record.path.toLowerCase();const a=decode(r);return!(t.startsWith("/")||!a.includes(t)&&!r.includes(t))||(!(!a.startsWith(t)&&!r.startsWith(t))||(!(!e.record.name||!String(e.record.name).includes(t))||e.children.some((e=>isRouteMatching(e,t)))))}function omit(e,t){const n={};for(const o in e)t.includes(o)||(n[o]=e[o]);return n}
/**
 * Creates a Router instance that can be used by a Vue app.
 *
 * @param options - {@link RouterOptions}
 */function createRouter(e){const t=createRouterMatcher(e.routes,e);const n=e.parseQuery||parseQuery;const o=e.stringifyQuery||stringifyQuery;const r=e.history;if(!r)throw new Error('Provide the "history" option when calling "createRouter()": https://next.router.vuejs.org/api/#history.');const s=useCallbacks();const c=useCallbacks();const u=useCallbacks();const d=p(C);let f=C;v&&e.scrollBehavior&&"scrollRestoration"in history&&(history.scrollRestoration="manual");const h=applyToParams.bind(null,(e=>""+e));const g=applyToParams.bind(null,encodeParam);const b=applyToParams.bind(null,decode);function addRoute(e,n){let o;let r;if(isRouteName(e)){o=t.getRecordMatcher(e);r=n}else r=e;return t.addRoute(r,o)}function removeRoute(e){const n=t.getRecordMatcher(e);n?t.removeRoute(n):warn(`Cannot remove non-existent route "${String(e)}"`)}function getRoutes(){return t.getRoutes().map((e=>e.record))}function hasRoute(e){return!!t.getRecordMatcher(e)}function resolve(e,a){a=y({},a||d.value);if("string"===typeof e){const o=parseURL(n,e,a.path);const i=t.resolve({path:o.path},a);const s=r.createHref(o.fullPath);s.startsWith("//")?warn(`Location "${e}" resolved to "${s}". A resolved location cannot start with multiple slashes.`):i.matched.length||warn(`No match found for location with path "${e}"`);return y(o,i,{params:b(i.params),hash:decode(o.hash),redirectedFrom:void 0,href:s})}let i;if("path"in e){"params"in e&&!("name"in e)&&Object.keys(e.params).length&&warn(`Path "${e.path}" was passed with params but they will be ignored. Use a named route alongside params instead.`);i=y({},e,{path:parseURL(n,e.path,a.path).path})}else{const t=y({},e.params);for(const e in t)null==t[e]&&delete t[e];i=y({},e,{params:g(e.params)});a.params=g(a.params)}const s=t.resolve(i,a);const c=e.hash||"";c&&!c.startsWith("#")&&warn(`A \`hash\` should always start with the character "#". Replace "${c}" with "#${c}".`);s.params=h(b(s.params));const l=stringifyURL(o,y({},e,{hash:encodeHash(c),path:s.path}));const u=r.createHref(l);u.startsWith("//")?warn(`Location "${e}" resolved to "${u}". A resolved location cannot start with multiple slashes.`):s.matched.length||warn(`No match found for location with path "${"path"in e?e.path:e}"`);return y({fullPath:l,hash:c,query:o===stringifyQuery?normalizeQuery(e.query):e.query||{}},s,{redirectedFrom:void 0,href:u})}function locationAsObject(e){return"string"===typeof e?parseURL(n,e,d.value.path):y({},e)}function checkCanceledNavigation(e,t){if(f!==e)return createRouterError(8,{from:t,to:e})}function push(e){return pushWithRedirect(e)}function replace(e){return push(y(locationAsObject(e),{replace:true}))}function handleRedirectRecord(e){const t=e.matched[e.matched.length-1];if(t&&t.redirect){const{redirect:n}=t;let o="function"===typeof n?n(e):n;if("string"===typeof o){o=o.includes("?")||o.includes("#")?o=locationAsObject(o):{path:o};o.params={}}if(!("path"in o)&&!("name"in o)){warn(`Invalid redirect found:\n${JSON.stringify(o,null,2)}\n when navigating to "${e.fullPath}". A redirect must contain a name or path. This will break in production.`);throw new Error("Invalid redirect")}return y({query:e.query,hash:e.hash,params:"path"in o?{}:e.params},o)}}function pushWithRedirect(e,t){const n=f=resolve(e);const r=d.value;const a=e.state;const i=e.force;const s=true===e.replace;const c=handleRedirectRecord(n);if(c)return pushWithRedirect(y(locationAsObject(c),{state:"object"===typeof c?y({},a,c.state):a,force:i,replace:s}),t||n);const l=n;l.redirectedFrom=t;let u;if(!i&&isSameRouteLocation(o,r,n)){u=createRouterError(16,{to:l,from:r});handleScroll(r,r,true,false)}return(u?Promise.resolve(u):navigate(l,r)).catch((e=>isNavigationFailure(e)?isNavigationFailure(e,2)?e:markAsReady(e):triggerError(e,l,r))).then((e=>{if(e){if(isNavigationFailure(e,2)){if(isSameRouteLocation(o,resolve(e.to),l)&&t&&(t._count=t._count?t._count+1:1)>10){warn(`Detected an infinite redirection in a navigation guard when going from "${r.fullPath}" to "${l.fullPath}". Aborting to avoid a Stack Overflow. This will break in production if not fixed.`);return Promise.reject(new Error("Infinite redirect in navigation guard"))}return pushWithRedirect(y({replace:s},locationAsObject(e.to),{state:"object"===typeof e.to?y({},a,e.to.state):a,force:i}),t||l)}}else e=finalizeNavigation(l,r,true,s,a);triggerAfterEach(l,r,e);return e}))}
/**
     * Helper to reject and skip all navigation guards if a new navigation happened
     * @param to
     * @param from
     */function checkCanceledNavigationAndReject(e,t){const n=checkCanceledNavigation(e,t);return n?Promise.reject(n):Promise.resolve()}function navigate(e,t){let n;const[o,r,a]=extractChangingRecords(e,t);n=extractComponentsGuards(o.reverse(),"beforeRouteLeave",e,t);for(const r of o)r.leaveGuards.forEach((o=>{n.push(guardToPromiseFn(o,e,t))}));const i=checkCanceledNavigationAndReject.bind(null,e,t);n.push(i);return runGuardQueue(n).then((()=>{n=[];for(const o of s.list())n.push(guardToPromiseFn(o,e,t));n.push(i);return runGuardQueue(n)})).then((()=>{n=extractComponentsGuards(r,"beforeRouteUpdate",e,t);for(const o of r)o.updateGuards.forEach((o=>{n.push(guardToPromiseFn(o,e,t))}));n.push(i);return runGuardQueue(n)})).then((()=>{n=[];for(const o of e.matched)if(o.beforeEnter&&!t.matched.includes(o))if(R(o.beforeEnter))for(const r of o.beforeEnter)n.push(guardToPromiseFn(r,e,t));else n.push(guardToPromiseFn(o.beforeEnter,e,t));n.push(i);return runGuardQueue(n)})).then((()=>{e.matched.forEach((e=>e.enterCallbacks={}));n=extractComponentsGuards(a,"beforeRouteEnter",e,t);n.push(i);return runGuardQueue(n)})).then((()=>{n=[];for(const o of c.list())n.push(guardToPromiseFn(o,e,t));n.push(i);return runGuardQueue(n)})).catch((e=>isNavigationFailure(e,8)?e:Promise.reject(e)))}function triggerAfterEach(e,t,n){for(const o of u.list())o(e,t,n)}function finalizeNavigation(e,t,n,o,a){const i=checkCanceledNavigation(e,t);if(i)return i;const s=t===C;const c=v?history.state:{};n&&(o||s?r.replace(e.fullPath,y({scroll:s&&c&&c.scroll},a)):r.push(e.fullPath,a));d.value=e;handleScroll(e,t,n,s);markAsReady()}let k;function setupListeners(){k||(k=r.listen(((e,t,n)=>{if(!L.listening)return;const o=resolve(e);const a=handleRedirectRecord(o);if(a){pushWithRedirect(y(a,{replace:true}),o).catch(noop);return}f=o;const i=d.value;v&&saveScrollPosition(getScrollKey(i.fullPath,n.delta),computeScrollPosition());navigate(o,i).catch((e=>{if(isNavigationFailure(e,12))return e;if(isNavigationFailure(e,2)){pushWithRedirect(e.to,o).then((e=>{isNavigationFailure(e,20)&&!n.delta&&n.type===w.pop&&r.go(-1,false)})).catch(noop);return Promise.reject()}n.delta&&r.go(-n.delta,false);return triggerError(e,o,i)})).then((e=>{e=e||finalizeNavigation(o,i,false);e&&(n.delta&&!isNavigationFailure(e,8)?r.go(-n.delta,false):n.type===w.pop&&isNavigationFailure(e,20)&&r.go(-1,false));triggerAfterEach(o,i,e)})).catch(noop)})))}let P=useCallbacks();let E=useCallbacks();let S;
/**
     * Trigger errorHandlers added via onError and throws the error as well
     *
     * @param error - error to throw
     * @param to - location we were navigating to when the error happened
     * @param from - location we were navigating from when the error happened
     * @returns the error as a rejected promise
     */function triggerError(e,t,n){markAsReady(e);const o=E.list();if(o.length)o.forEach((o=>o(e,t,n)));else{warn("uncaught error during route navigation:");console.error(e)}return Promise.reject(e)}function isReady(){return S&&d.value!==C?Promise.resolve():new Promise(((e,t)=>{P.add([e,t])}))}function markAsReady(e){if(!S){S=!e;setupListeners();P.list().forEach((([t,n])=>e?n(e):t()));P.reset()}return e}function handleScroll(t,n,o,r){const{scrollBehavior:a}=e;if(!v||!a)return Promise.resolve();const i=!o&&getSavedScrollPosition(getScrollKey(t.fullPath,0))||(r||!o)&&history.state&&history.state.scroll||null;return m().then((()=>a(t,n,i))).then((e=>e&&scrollToPosition(e))).catch((e=>triggerError(e,t,n)))}const go=e=>r.go(e);let $;const _=new Set;const L={currentRoute:d,listening:true,addRoute:addRoute,removeRoute:removeRoute,hasRoute:hasRoute,getRoutes:getRoutes,resolve:resolve,options:e,push:push,replace:replace,go:go,back:()=>go(-1),forward:()=>go(1),beforeEach:s.add,beforeResolve:c.add,afterEach:u.add,onError:E.add,isReady:isReady,install(e){const n=this;e.component("RouterLink",ne);e.component("RouterView",re);e.config.globalProperties.$router=n;Object.defineProperty(e.config.globalProperties,"$route",{enumerable:true,get:()=>i(d)});if(v&&!$&&d.value===C){$=true;push(r.location).catch((e=>{warn("Unexpected error when starting the router:",e)}))}const o={};for(const e in C)o[e]=a((()=>d.value[e]));e.provide(X,n);e.provide(Z,l(o));e.provide(ee,d);const s=e.unmount;_.add(e);e.unmount=function(){_.delete(e);if(_.size<1){f=C;k&&k();k=null;d.value=C;$=false;S=false}s()};v&&addDevtools(e,n,t)}};return L}function runGuardQueue(e){return e.reduce(((e,t)=>e.then((()=>t()))),Promise.resolve())}function extractChangingRecords(e,t){const n=[];const o=[];const r=[];const a=Math.max(t.matched.length,e.matched.length);for(let i=0;i<a;i++){const a=t.matched[i];a&&(e.matched.find((e=>isSameRouteRecord(e,a)))?o.push(a):n.push(a));const s=e.matched[i];s&&(t.matched.find((e=>isSameRouteRecord(e,s)))||r.push(s))}return[n,o,r]}function useRouter(){return r(X)}function useRoute(){return r(Z)}export{_ as NavigationFailureType,ne as RouterLink,re as RouterView,C as START_LOCATION,createMemoryHistory,createRouter,createRouterMatcher,createWebHashHistory,createWebHistory,isNavigationFailure,loadRouteLocation,Y as matchedRouteKey,onBeforeRouteLeave,onBeforeRouteUpdate,parseQuery,Z as routeLocationKey,X as routerKey,ee as routerViewLocationKey,stringifyQuery,useLink,useRoute,useRouter,J as viewDepthKey};

