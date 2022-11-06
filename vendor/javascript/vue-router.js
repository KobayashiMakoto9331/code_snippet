import{onUnmounted as e,onDeactivated as t,onActivated as o,getCurrentInstance as n,inject as r,computed as a,unref as s,watchEffect as i,defineComponent as c,reactive as l,h as u,provide as d,ref as p,watch as f,shallowRef as h,nextTick as m}from"vue";import{setupDevtoolsPlugin as g}from"@vue/devtools-api";
/*!
  * vue-router v4.1.6
  * (c) 2022 Eduardo San Martin Morote
  * @license MIT
  */const v="undefined"!==typeof window;function isESModule(e){return e.__esModule||"Module"===e[Symbol.toStringTag]}const y=Object.assign;function applyToParams(e,t){const o={};for(const n in t){const r=t[n];o[n]=R(r)?r.map(e):e(r)}return o}const noop=()=>{};const R=Array.isArray;function warn(e){const t=Array.from(arguments).slice(1);console.warn.apply(console,["[Vue Router warn]: "+e].concat(t))}const b=/\/$/;const removeTrailingSlash=e=>e.replace(b,"")
/**
 * Transforms a URI into a normalized history location
 *
 * @param parseQuery
 * @param location - URI to normalize
 * @param currentLocation - current absolute location. Allows resolving relative
 * paths. Must start with `/`. Defaults to `/`
 * @returns a normalized history location
 */;function parseURL(e,t,o="/"){let n,r={},a="",s="";const i=t.indexOf("#");let c=t.indexOf("?");i<c&&i>=0&&(c=-1);if(c>-1){n=t.slice(0,c);a=t.slice(c+1,i>-1?i:t.length);r=e(a)}if(i>-1){n=n||t.slice(0,i);s=t.slice(i,t.length)}n=resolveRelativePath(null!=n?n:t,o);return{fullPath:n+(a&&"?")+a+s,path:n,query:r,hash:s}}
/**
 * Stringifies a URL object
 *
 * @param stringifyQuery
 * @param location
 */function stringifyURL(e,t){const o=t.query?e(t.query):"";return t.path+(o&&"?")+o+(t.hash||"")}
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
 */function isSameRouteLocation(e,t,o){const n=t.matched.length-1;const r=o.matched.length-1;return n>-1&&n===r&&isSameRouteRecord(t.matched[n],o.matched[r])&&isSameRouteLocationParams(t.params,o.params)&&e(t.query)===e(o.query)&&t.hash===o.hash}
/**
 * Check if two `RouteRecords` are equal. Takes into account aliases: they are
 * considered equal to the `RouteRecord` they are aliasing.
 *
 * @param a - first {@link RouteRecord}
 * @param b - second {@link RouteRecord}
 */function isSameRouteRecord(e,t){return(e.aliasOf||e)===(t.aliasOf||t)}function isSameRouteLocationParams(e,t){if(Object.keys(e).length!==Object.keys(t).length)return false;for(const o in e)if(!isSameRouteLocationParamsValue(e[o],t[o]))return false;return true}function isSameRouteLocationParamsValue(e,t){return R(e)?isEquivalentArray(e,t):R(t)?isEquivalentArray(t,e):e===t}
/**
 * Check if two arrays are the same or if an array with one single entry is the
 * same as another primitive value. Used to check query and parameters
 *
 * @param a - array of values
 * @param b - array of values or a single value
 */function isEquivalentArray(e,t){return R(t)?e.length===t.length&&e.every(((e,o)=>e===t[o])):1===e.length&&e[0]===t}
/**
 * Resolves a relative path that starts with `.`.
 *
 * @param to - path location we are resolving
 * @param from - currentLocation.path, should start with `/`
 */function resolveRelativePath(e,t){if(e.startsWith("/"))return e;if("production"!==process.env.NODE_ENV&&!t.startsWith("/")){warn(`Cannot resolve a relative location without an absolute path. Trying to resolve "${e}" from "${t}". It should look like "/${t}".`);return e}if(!e)return t;const o=t.split("/");const n=e.split("/");let r=o.length-1;let a;let s;for(a=0;a<n.length;a++){s=n[a];if("."!==s){if(".."!==s)break;r>1&&r--}}return o.slice(0,r).join("/")+"/"+n.slice(a-(a===n.length?1:0)).join("/")}var E;(function(e){e.pop="pop";e.push="push"})(E||(E={}));var w;(function(e){e.back="back";e.forward="forward";e.unknown=""})(w||(w={}));const _="";
/**
 * Normalizes a base by removing any trailing slash and reading the base tag if
 * present.
 *
 * @param base - base to normalize
 */function normalizeBase(e){if(!e)if(v){const t=document.querySelector("base");e=t&&t.getAttribute("href")||"/";e=e.replace(/^\w+:\/\/[^\/]+/,"")}else e="/";"/"!==e[0]&&"#"!==e[0]&&(e="/"+e);return removeTrailingSlash(e)}const N=/^[^#]+#/;function createHref(e,t){return e.replace(N,"#")+t}function getElementPosition(e,t){const o=document.documentElement.getBoundingClientRect();const n=e.getBoundingClientRect();return{behavior:t.behavior,left:n.left-o.left-(t.left||0),top:n.top-o.top-(t.top||0)}}const computeScrollPosition=()=>({left:window.pageXOffset,top:window.pageYOffset});function scrollToPosition(e){let t;if("el"in e){const o=e.el;const n="string"===typeof o&&o.startsWith("#");if("production"!==process.env.NODE_ENV&&"string"===typeof e.el&&(!n||!document.getElementById(e.el.slice(1))))try{const t=document.querySelector(e.el);if(n&&t){warn(`The selector "${e.el}" should be passed as "el: document.querySelector('${e.el}')" because it starts with "#".`);return}}catch(t){warn(`The selector "${e.el}" is invalid. If you are using an id selector, make sure to escape it. You can find more information about escaping characters in selectors at https://mathiasbynens.be/notes/css-escapes or use CSS.escape (https://developer.mozilla.org/en-US/docs/Web/API/CSS/escape).`);return}const r="string"===typeof o?n?document.getElementById(o.slice(1)):document.querySelector(o):o;if(!r){"production"!==process.env.NODE_ENV&&warn(`Couldn't find element using selector "${e.el}" returned by scrollBehavior.`);return}t=getElementPosition(r,e)}else t=e;"scrollBehavior"in document.documentElement.style?window.scrollTo(t):window.scrollTo(null!=t.left?t.left:window.pageXOffset,null!=t.top?t.top:window.pageYOffset)}function getScrollKey(e,t){const o=history.state?history.state.position-t:-1;return o+e}const O=new Map;function saveScrollPosition(e,t){O.set(e,t)}function getSavedScrollPosition(e){const t=O.get(e);O.delete(e);return t}let createBaseLocation=()=>location.protocol+"//"+location.host
/**
 * Creates a normalized history location from a window.location object
 * @param location -
 */;function createCurrentLocation(e,t){const{pathname:o,search:n,hash:r}=t;const a=e.indexOf("#");if(a>-1){let t=r.includes(e.slice(a))?e.slice(a).length:1;let o=r.slice(t);"/"!==o[0]&&(o="/"+o);return stripBase(o,"")}const s=stripBase(o,e);return s+n+r}function useHistoryListeners(e,t,o,n){let r=[];let a=[];let s=null;const popStateHandler=({state:a})=>{const i=createCurrentLocation(e,location);const c=o.value;const l=t.value;let u=0;if(a){o.value=i;t.value=a;if(s&&s===c){s=null;return}u=l?a.position-l.position:0}else n(i);r.forEach((e=>{e(o.value,c,{delta:u,type:E.pop,direction:u?u>0?w.forward:w.back:w.unknown})}))};function pauseListeners(){s=o.value}function listen(e){r.push(e);const teardown=()=>{const t=r.indexOf(e);t>-1&&r.splice(t,1)};a.push(teardown);return teardown}function beforeUnloadListener(){const{history:e}=window;e.state&&e.replaceState(y({},e.state,{scroll:computeScrollPosition()}),"")}function destroy(){for(const e of a)e();a=[];window.removeEventListener("popstate",popStateHandler);window.removeEventListener("beforeunload",beforeUnloadListener)}window.addEventListener("popstate",popStateHandler);window.addEventListener("beforeunload",beforeUnloadListener);return{pauseListeners:pauseListeners,listen:listen,destroy:destroy}}function buildState(e,t,o,n=false,r=false){return{back:e,current:t,forward:o,replaced:n,position:window.history.length,scroll:r?computeScrollPosition():null}}function useHistoryStateNavigation(e){const{history:t,location:o}=window;const n={value:createCurrentLocation(e,o)};const r={value:t.state};r.value||changeLocation(n.value,{back:null,current:n.value,forward:null,position:t.length-1,replaced:true,scroll:null},true);function changeLocation(n,a,s){const i=e.indexOf("#");const c=i>-1?(o.host&&document.querySelector("base")?e:e.slice(i))+n:createBaseLocation()+e+n;try{t[s?"replaceState":"pushState"](a,"",c);r.value=a}catch(e){"production"!==process.env.NODE_ENV?warn("Error with push/replace State",e):console.error(e);o[s?"replace":"assign"](c)}}function replace(e,o){const a=y({},t.state,buildState(r.value.back,e,r.value.forward,true),o,{position:r.value.position});changeLocation(e,a,true);n.value=e}function push(e,o){const a=y({},r.value,t.state,{forward:e,scroll:computeScrollPosition()});"production"===process.env.NODE_ENV||t.state||warn("history.state seems to have been manually replaced without preserving the necessary values. Make sure to preserve existing history state if you are manually calling history.replaceState:\n\nhistory.replaceState(history.state, '', url)\n\nYou can find more information at https://next.router.vuejs.org/guide/migration/#usage-of-history-state.");changeLocation(a.current,a,true);const s=y({},buildState(n.value,e,null),{position:a.position+1},o);changeLocation(e,s,false);n.value=e}return{location:n,state:r,push:push,replace:replace}}
/**
 * Creates an HTML5 history. Most common history for single page applications.
 *
 * @param base -
 */function createWebHistory(e){e=normalizeBase(e);const t=useHistoryStateNavigation(e);const o=useHistoryListeners(e,t.state,t.location,t.replace);function go(e,t=true){t||o.pauseListeners();history.go(e)}const n=y({location:"",base:e,go:go,createHref:createHref.bind(null,e)},t,o);Object.defineProperty(n,"location",{enumerable:true,get:()=>t.location.value});Object.defineProperty(n,"state",{enumerable:true,get:()=>t.state.value});return n}
/**
 * Creates an in-memory based history. The main purpose of this history is to handle SSR. It starts in a special location that is nowhere.
 * It's up to the user to replace that location with the starter location by either calling `router.push` or `router.replace`.
 *
 * @param base - Base applied to all urls, defaults to '/'
 * @returns a history object that can be passed to the router constructor
 */function createMemoryHistory(e=""){let t=[];let o=[_];let n=0;e=normalizeBase(e);function setLocation(e){n++;if(n===o.length)o.push(e);else{o.splice(n);o.push(e)}}function triggerListeners(e,o,{direction:n,delta:r}){const a={direction:n,delta:r,type:E.pop};for(const n of t)n(e,o,a)}const r={location:_,state:{},base:e,createHref:createHref.bind(null,e),replace(e){o.splice(n--,1);setLocation(e)},push(e,t){setLocation(e)},listen(e){t.push(e);return()=>{const o=t.indexOf(e);o>-1&&t.splice(o,1)}},destroy(){t=[];o=[_];n=0},go(e,t=true){const r=this.location;const a=e<0?w.back:w.forward;n=Math.max(0,Math.min(n+e,o.length-1));t&&triggerListeners(this.location,r,{direction:a,delta:e})}};Object.defineProperty(r,"location",{enumerable:true,get:()=>o[n]});return r}
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
 */function createWebHashHistory(e){e=location.host?e||location.pathname+location.search:"";e.includes("#")||(e+="#");"production"===process.env.NODE_ENV||e.endsWith("#/")||e.endsWith("#")||warn(`A hash base must end with a "#":\n"${e}" should be "${e.replace(/#.*$/,"#")}".`);return createWebHistory(e)}function isRouteLocation(e){return"string"===typeof e||e&&"object"===typeof e}function isRouteName(e){return"string"===typeof e||"symbol"===typeof e}const P={path:"/",name:void 0,params:{},query:{},hash:"",fullPath:"/",matched:[],meta:{},redirectedFrom:void 0};const k=Symbol("production"!==process.env.NODE_ENV?"navigation failure":"");var S;(function(e){e[e.aborted=4]="aborted";e[e.cancelled=8]="cancelled";e[e.duplicated=16]="duplicated"})(S||(S={}));const C={1({location:e,currentLocation:t}){return`No match for\n ${JSON.stringify(e)}${t?"\nwhile being at\n"+JSON.stringify(t):""}`},2({from:e,to:t}){return`Redirected from "${e.fullPath}" to "${stringifyRoute(t)}" via a navigation guard.`},4({from:e,to:t}){return`Navigation aborted from "${e.fullPath}" to "${t.fullPath}" via a navigation guard.`},8({from:e,to:t}){return`Navigation cancelled from "${e.fullPath}" to "${t.fullPath}" with a new navigation.`},16({from:e,to:t}){return`Avoided redundant navigation to current location: "${e.fullPath}".`}};function createRouterError(e,t){return"production"!==process.env.NODE_ENV||false?y(new Error(C[e](t)),{type:e,[k]:true},t):y(new Error,{type:e,[k]:true},t)}function isNavigationFailure(e,t){return e instanceof Error&&k in e&&(null==t||!!(e.type&t))}const $=["params","query","hash"];function stringifyRoute(e){if("string"===typeof e)return e;if("path"in e)return e.path;const t={};for(const o of $)o in e&&(t[o]=e[o]);return JSON.stringify(t,null,2)}const L="[^/]+?";const A={sensitive:false,strict:false,start:true,end:true};const D=/[.+*?^${}()[\]/\\]/g;
/**
 * Creates a path parser from an array of Segments (a segment is an array of Tokens)
 *
 * @param segments - array of segments returned by tokenizePath
 * @param extraOptions - optional options for the regexp
 * @returns a PathParser
 */function tokensToParser(e,t){const o=y({},A,t);const n=[];let r=o.start?"^":"";const a=[];for(const t of e){const e=t.length?[]:[90];o.strict&&!t.length&&(r+="/");for(let n=0;n<t.length;n++){const s=t[n];let i=40+(o.sensitive?.25:0);if(0===s.type){n||(r+="/");r+=s.value.replace(D,"\\$&");i+=40}else if(1===s.type){const{value:e,repeatable:o,optional:c,regexp:l}=s;a.push({name:e,repeatable:o,optional:c});const u=l||L;if(u!==L){i+=10;try{new RegExp(`(${u})`)}catch(t){throw new Error(`Invalid custom RegExp for param "${e}" (${u}): `+t.message)}}let d=o?`((?:${u})(?:/(?:${u}))*)`:`(${u})`;n||(d=c&&t.length<2?`(?:/${d})`:"/"+d);c&&(d+="?");r+=d;i+=20;c&&(i+=-8);o&&(i+=-20);".*"===u&&(i+=-50)}e.push(i)}n.push(e)}if(o.strict&&o.end){const e=n.length-1;n[e][n[e].length-1]+=.7000000000000001}o.strict||(r+="/?");o.end?r+="$":o.strict&&(r+="(?:/|$)");const s=new RegExp(r,o.sensitive?"":"i");function parse(e){const t=e.match(s);const o={};if(!t)return null;for(let e=1;e<t.length;e++){const n=t[e]||"";const r=a[e-1];o[r.name]=n&&r.repeatable?n.split("/"):n}return o}function stringify(t){let o="";let n=false;for(const r of e){n&&o.endsWith("/")||(o+="/");n=false;for(const e of r)if(0===e.type)o+=e.value;else if(1===e.type){const{value:a,repeatable:s,optional:i}=e;const c=a in t?t[a]:"";if(R(c)&&!s)throw new Error(`Provided param "${a}" is an array but it is not repeatable (* or + modifiers)`);const l=R(c)?c.join("/"):c;if(!l){if(!i)throw new Error(`Missing required param "${a}"`);r.length<2&&(o.endsWith("/")?o=o.slice(0,-1):n=true)}o+=l}}return o||"/"}return{re:s,score:n,keys:a,parse:parse,stringify:stringify}}
/**
 * Compares an array of numbers as used in PathParser.score and returns a
 * number. This function can be used to `sort` an array
 *
 * @param a - first array of numbers
 * @param b - second array of numbers
 * @returns 0 if both are equal, < 0 if a should be sorted first, > 0 if b
 * should be sorted first
 */function compareScoreArray(e,t){let o=0;while(o<e.length&&o<t.length){const n=t[o]-e[o];if(n)return n;o++}return e.length<t.length?1===e.length&&80===e[0]?-1:1:e.length>t.length?1===t.length&&80===t[0]?1:-1:0}
/**
 * Compare function that can be used with `sort` to sort an array of PathParser
 *
 * @param a - first PathParser
 * @param b - second PathParser
 * @returns 0 if both are equal, < 0 if a should be sorted first, > 0 if b
 */function comparePathParserScore(e,t){let o=0;const n=e.score;const r=t.score;while(o<n.length&&o<r.length){const e=compareScoreArray(n[o],r[o]);if(e)return e;o++}if(1===Math.abs(r.length-n.length)){if(isLastScoreNegative(n))return 1;if(isLastScoreNegative(r))return-1}return r.length-n.length}
/**
 * This allows detecting splats at the end of a path: /home/:id(.*)*
 *
 * @param score - score to check
 * @returns true if the last entry is negative
 */function isLastScoreNegative(e){const t=e[e.length-1];return e.length>0&&t[t.length-1]<0}const x={type:0,value:""};const V=/[a-zA-Z0-9_]/;function tokenizePath(e){if(!e)return[[]];if("/"===e)return[[x]];if(!e.startsWith("/"))throw new Error("production"!==process.env.NODE_ENV?`Route paths should start with a "/": "${e}" should be "/${e}".`:`Invalid path "${e}"`);function crash(e){throw new Error(`ERR (${t})/"${i}": ${e}`)}let t=0;let o=t;const n=[];let r;function finalizeSegment(){r&&n.push(r);r=[]}let a=0;let s;let i="";let c="";function consumeBuffer(){if(i){if(0===t)r.push({type:0,value:i});else if(1===t||2===t||3===t){r.length>1&&("*"===s||"+"===s)&&crash(`A repeatable param (${i}) must be alone in its segment. eg: '/:ids+.`);r.push({type:1,value:i,regexp:c,repeatable:"*"===s||"+"===s,optional:"*"===s||"?"===s})}else crash("Invalid state to consume buffer");i=""}}function addCharToBuffer(){i+=s}while(a<e.length){s=e[a++];if("\\"!==s||2===t)switch(t){case 0:if("/"===s){i&&consumeBuffer();finalizeSegment()}else if(":"===s){consumeBuffer();t=1}else addCharToBuffer();break;case 4:addCharToBuffer();t=o;break;case 1:if("("===s)t=2;else if(V.test(s))addCharToBuffer();else{consumeBuffer();t=0;"*"!==s&&"?"!==s&&"+"!==s&&a--}break;case 2:")"===s?"\\"==c[c.length-1]?c=c.slice(0,-1)+s:t=3:c+=s;break;case 3:consumeBuffer();t=0;"*"!==s&&"?"!==s&&"+"!==s&&a--;c="";break;default:crash("Unknown state");break}else{o=t;t=4}}2===t&&crash(`Unfinished custom RegExp for param "${i}"`);consumeBuffer();finalizeSegment();return n}function createRouteRecordMatcher(e,t,o){const n=tokensToParser(tokenizePath(e.path),o);if("production"!==process.env.NODE_ENV){const t=new Set;for(const o of n.keys){t.has(o.name)&&warn(`Found duplicated params with name "${o.name}" for path "${e.path}". Only the last one will be available on "$route.params".`);t.add(o.name)}}const r=y(n,{record:e,parent:t,children:[],alias:[]});t&&!r.record.aliasOf===!t.record.aliasOf&&t.children.push(r);return r}
/**
 * Creates a Router Matcher.
 *
 * @internal
 * @param routes - array of initial routes
 * @param globalOptions - global route options
 */function createRouterMatcher(e,t){const o=[];const n=new Map;t=mergeOptions({strict:false,end:true,sensitive:false},t);function getRecordMatcher(e){return n.get(e)}function addRoute(e,o,n){const r=!n;const a=normalizeRouteRecord(e);"production"!==process.env.NODE_ENV&&checkChildMissingNameWithEmptyPath(a,o);a.aliasOf=n&&n.record;const s=mergeOptions(t,e);const i=[a];if("alias"in e){const t="string"===typeof e.alias?[e.alias]:e.alias;for(const e of t)i.push(y({},a,{components:n?n.record.components:a.components,path:e,aliasOf:n?n.record:a}))}let c;let l;for(const t of i){const{path:i}=t;if(o&&"/"!==i[0]){const e=o.record.path;const n="/"===e[e.length-1]?"":"/";t.path=o.record.path+(i&&n+i)}if("production"!==process.env.NODE_ENV&&"*"===t.path)throw new Error('Catch all routes ("*") must now be defined using a param with a custom regexp.\nSee more at https://next.router.vuejs.org/guide/migration/#removed-star-or-catch-all-routes.');c=createRouteRecordMatcher(t,o,s);"production"!==process.env.NODE_ENV&&o&&"/"===i[0]&&checkMissingParamsInAbsolutePath(c,o);if(n){n.alias.push(c);"production"!==process.env.NODE_ENV&&checkSameParams(n,c)}else{l=l||c;l!==c&&l.alias.push(c);r&&e.name&&!isAliasRecord(c)&&removeRoute(e.name)}if(a.children){const e=a.children;for(let t=0;t<e.length;t++)addRoute(e[t],c,n&&n.children[t])}n=n||c;(c.record.components&&Object.keys(c.record.components).length||c.record.name||c.record.redirect)&&insertMatcher(c)}return l?()=>{removeRoute(l)}:noop}function removeRoute(e){if(isRouteName(e)){const t=n.get(e);if(t){n.delete(e);o.splice(o.indexOf(t),1);t.children.forEach(removeRoute);t.alias.forEach(removeRoute)}}else{const t=o.indexOf(e);if(t>-1){o.splice(t,1);e.record.name&&n.delete(e.record.name);e.children.forEach(removeRoute);e.alias.forEach(removeRoute)}}}function getRoutes(){return o}function insertMatcher(e){let t=0;while(t<o.length&&comparePathParserScore(e,o[t])>=0&&(e.record.path!==o[t].record.path||!isRecordChildOf(e,o[t])))t++;o.splice(t,0,e);e.record.name&&!isAliasRecord(e)&&n.set(e.record.name,e)}function resolve(e,t){let r;let a={};let s;let i;if("name"in e&&e.name){r=n.get(e.name);if(!r)throw createRouterError(1,{location:e});if("production"!==process.env.NODE_ENV){const t=Object.keys(e.params||{}).filter((e=>!r.keys.find((t=>t.name===e))));t.length&&warn(`Discarded invalid param(s) "${t.join('", "')}" when navigating. See https://github.com/vuejs/router/blob/main/packages/router/CHANGELOG.md#414-2022-08-22 for more details.`)}i=r.record.name;a=y(paramsFromLocation(t.params,r.keys.filter((e=>!e.optional)).map((e=>e.name))),e.params&&paramsFromLocation(e.params,r.keys.map((e=>e.name))));s=r.stringify(a)}else if("path"in e){s=e.path;"production"===process.env.NODE_ENV||s.startsWith("/")||warn(`The Matcher cannot resolve relative paths but received "${s}". Unless you directly called \`matcher.resolve("${s}")\`, this is probably a bug in vue-router. Please open an issue at https://new-issue.vuejs.org/?repo=vuejs/router.`);r=o.find((e=>e.re.test(s)));if(r){a=r.parse(s);i=r.record.name}}else{r=t.name?n.get(t.name):o.find((e=>e.re.test(t.path)));if(!r)throw createRouterError(1,{location:e,currentLocation:t});i=r.record.name;a=y({},t.params,e.params);s=r.stringify(a)}const c=[];let l=r;while(l){c.unshift(l.record);l=l.parent}return{name:i,path:s,params:a,matched:c,meta:mergeMetaFields(c)}}e.forEach((e=>addRoute(e)));return{addRoute:addRoute,resolve:resolve,removeRoute:removeRoute,getRoutes:getRoutes,getRecordMatcher:getRecordMatcher}}function paramsFromLocation(e,t){const o={};for(const n of t)n in e&&(o[n]=e[n]);return o}
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
 */function normalizeRecordProps(e){const t={};const o=e.props||false;if("component"in e)t.default=o;else for(const n in e.components)t[n]="boolean"===typeof o?o:o[n];return t}
/**
 * Checks if a record or any of its parent is an alias
 * @param record
 */function isAliasRecord(e){while(e){if(e.record.aliasOf)return true;e=e.parent}return false}
/**
 * Merge meta fields of an array of records
 *
 * @param matched - array of matched records
 */function mergeMetaFields(e){return e.reduce(((e,t)=>y(e,t.meta)),{})}function mergeOptions(e,t){const o={};for(const n in e)o[n]=n in t?t[n]:e[n];return o}function isSameParam(e,t){return e.name===t.name&&e.optional===t.optional&&e.repeatable===t.repeatable}
/**
 * Check if a path and its alias have the same required params
 *
 * @param a - original record
 * @param b - alias record
 */function checkSameParams(e,t){for(const o of e.keys)if(!o.optional&&!t.keys.find(isSameParam.bind(null,o)))return warn(`Alias "${t.record.path}" and the original record: "${e.record.path}" must have the exact same param named "${o.name}"`);for(const o of t.keys)if(!o.optional&&!e.keys.find(isSameParam.bind(null,o)))return warn(`Alias "${t.record.path}" and the original record: "${e.record.path}" must have the exact same param named "${o.name}"`)}
/**
 * A route with a name and a child with an empty path without a name should warn when adding the route
 *
 * @param mainNormalizedRecord - RouteRecordNormalized
 * @param parent - RouteRecordMatcher
 */function checkChildMissingNameWithEmptyPath(e,t){t&&t.record.name&&!e.name&&!e.path&&warn(`The route named "${String(t.record.name)}" has a child without a name and an empty path. Using that name won't render the empty path child so you probably want to move the name to the child instead. If this is intentional, add a name to the child route to remove the warning.`)}function checkMissingParamsInAbsolutePath(e,t){for(const o of t.keys)if(!e.keys.find(isSameParam.bind(null,o)))return warn(`Absolute path "${e.record.path}" must have the exact same param named "${o.name}" as its parent "${t.record.path}".`)}function isRecordChildOf(e,t){return t.children.some((t=>t===e||isRecordChildOf(e,t)))}const T=/#/g;const j=/&/g;const M=/\//g;const I=/=/g;const F=/\?/g;const B=/\+/g;const U=/%5B/g;const W=/%5D/g;const G=/%5E/g;const z=/%60/g;const Q=/%7B/g;const H=/%7C/g;const q=/%7D/g;const K=/%20/g;
/**
 * Encode characters that need to be encoded on the path, search and hash
 * sections of the URL.
 *
 * @internal
 * @param text - string to encode
 * @returns encoded string
 */function commonEncode(e){return encodeURI(""+e).replace(H,"|").replace(U,"[").replace(W,"]")}
/**
 * Encode characters that need to be encoded on the hash section of the URL.
 *
 * @param text - string to encode
 * @returns encoded string
 */function encodeHash(e){return commonEncode(e).replace(Q,"{").replace(q,"}").replace(G,"^")}
/**
 * Encode characters that need to be encoded query values on the query
 * section of the URL.
 *
 * @param text - string to encode
 * @returns encoded string
 */function encodeQueryValue(e){return commonEncode(e).replace(B,"%2B").replace(K,"+").replace(T,"%23").replace(j,"%26").replace(z,"`").replace(Q,"{").replace(q,"}").replace(G,"^")}
/**
 * Like `encodeQueryValue` but also encodes the `=` character.
 *
 * @param text - string to encode
 */function encodeQueryKey(e){return encodeQueryValue(e).replace(I,"%3D")}
/**
 * Encode characters that need to be encoded on the path section of the URL.
 *
 * @param text - string to encode
 * @returns encoded string
 */function encodePath(e){return commonEncode(e).replace(T,"%23").replace(F,"%3F")}
/**
 * Encode characters that need to be encoded on the path section of the URL as a
 * param. This function encodes everything {@link encodePath} does plus the
 * slash (`/`) character. If `text` is `null` or `undefined`, returns an empty
 * string instead.
 *
 * @param text - string to encode
 * @returns encoded string
 */function encodeParam(e){return null==e?"":encodePath(e).replace(M,"%2F")}
/**
 * Decode text using `decodeURIComponent`. Returns the original text if it
 * fails.
 *
 * @param text - string to decode
 * @returns decoded string
 */function decode(e){try{return decodeURIComponent(""+e)}catch(t){"production"!==process.env.NODE_ENV&&warn(`Error decoding "${e}". Using original value`)}return""+e}
/**
 * Transforms a queryString into a {@link LocationQuery} object. Accept both, a
 * version with the leading `?` and without Should work as URLSearchParams

 * @internal
 *
 * @param search - search string to parse
 * @returns a query object
 */function parseQuery(e){const t={};if(""===e||"?"===e)return t;const o="?"===e[0];const n=(o?e.slice(1):e).split("&");for(let e=0;e<n.length;++e){const o=n[e].replace(B," ");const r=o.indexOf("=");const a=decode(r<0?o:o.slice(0,r));const s=r<0?null:decode(o.slice(r+1));if(a in t){let e=t[a];R(e)||(e=t[a]=[e]);e.push(s)}else t[a]=s}return t}
/**
 * Stringifies a {@link LocationQueryRaw} object. Like `URLSearchParams`, it
 * doesn't prepend a `?`
 *
 * @internal
 *
 * @param query - query object to stringify
 * @returns string version of the query without the leading `?`
 */function stringifyQuery(e){let t="";for(let o in e){const n=e[o];o=encodeQueryKey(o);if(null==n){void 0!==n&&(t+=(t.length?"&":"")+o);continue}const r=R(n)?n.map((e=>e&&encodeQueryValue(e))):[n&&encodeQueryValue(n)];r.forEach((e=>{if(void 0!==e){t+=(t.length?"&":"")+o;null!=e&&(t+="="+e)}}))}return t}
/**
 * Transforms a {@link LocationQueryRaw} into a {@link LocationQuery} by casting
 * numbers into strings, removing keys with an undefined value and replacing
 * undefined with null in arrays
 *
 * @param query - query object to normalize
 * @returns a normalized query object
 */function normalizeQuery(e){const t={};for(const o in e){const n=e[o];void 0!==n&&(t[o]=R(n)?n.map((e=>null==e?null:""+e)):null==n?n:""+n)}return t}const Y=Symbol("production"!==process.env.NODE_ENV?"router view location matched":"");const J=Symbol("production"!==process.env.NODE_ENV?"router view depth":"");const X=Symbol("production"!==process.env.NODE_ENV?"router":"");const Z=Symbol("production"!==process.env.NODE_ENV?"route location":"");const ee=Symbol("production"!==process.env.NODE_ENV?"router view location":"");function useCallbacks(){let e=[];function add(t){e.push(t);return()=>{const o=e.indexOf(t);o>-1&&e.splice(o,1)}}function reset(){e=[]}return{add:add,list:()=>e,reset:reset}}function registerGuard(n,r,a){const removeFromList=()=>{n[r].delete(a)};e(removeFromList);t(removeFromList);o((()=>{n[r].add(a)}));n[r].add(a)}
/**
 * Add a navigation guard that triggers whenever the component for the current
 * location is about to be left. Similar to {@link beforeRouteLeave} but can be
 * used in any component. The guard is removed when the component is unmounted.
 *
 * @param leaveGuard - {@link NavigationGuard}
 */function onBeforeRouteLeave(e){if("production"!==process.env.NODE_ENV&&!n()){warn("getCurrentInstance() returned null. onBeforeRouteLeave() must be called at the top of a setup function");return}const t=r(Y,{}).value;t?registerGuard(t,"leaveGuards",e):"production"!==process.env.NODE_ENV&&warn("No active route record was found when calling `onBeforeRouteLeave()`. Make sure you call this function inside a component child of <router-view>. Maybe you called it inside of App.vue?")}
/**
 * Add a navigation guard that triggers whenever the current location is about
 * to be updated. Similar to {@link beforeRouteUpdate} but can be used in any
 * component. The guard is removed when the component is unmounted.
 *
 * @param updateGuard - {@link NavigationGuard}
 */function onBeforeRouteUpdate(e){if("production"!==process.env.NODE_ENV&&!n()){warn("getCurrentInstance() returned null. onBeforeRouteUpdate() must be called at the top of a setup function");return}const t=r(Y,{}).value;t?registerGuard(t,"updateGuards",e):"production"!==process.env.NODE_ENV&&warn("No active route record was found when calling `onBeforeRouteUpdate()`. Make sure you call this function inside a component child of <router-view>. Maybe you called it inside of App.vue?")}function guardToPromiseFn(e,t,o,n,r){const a=n&&(n.enterCallbacks[r]=n.enterCallbacks[r]||[]);return()=>new Promise(((s,i)=>{const next=e=>{if(false===e)i(createRouterError(4,{from:o,to:t}));else if(e instanceof Error)i(e);else if(isRouteLocation(e))i(createRouterError(2,{from:t,to:e}));else{a&&n.enterCallbacks[r]===a&&"function"===typeof e&&a.push(e);s()}};const c=e.call(n&&n.instances[r],t,o,"production"!==process.env.NODE_ENV?canOnlyBeCalledOnce(next,t,o):next);let l=Promise.resolve(c);e.length<3&&(l=l.then(next));if("production"!==process.env.NODE_ENV&&e.length>2){const t=`The "next" callback was never called inside of ${e.name?'"'+e.name+'"':""}:\n${e.toString()}\n. If you are returning a value instead of calling "next", make sure to remove the "next" parameter from your function.`;if("object"===typeof c&&"then"in c)l=l.then((e=>{if(!next._called){warn(t);return Promise.reject(new Error("Invalid navigation guard"))}return e}));else if(void 0!==c&&!next._called){warn(t);i(new Error("Invalid navigation guard"));return}}l.catch((e=>i(e)))}))}function canOnlyBeCalledOnce(e,t,o){let n=0;return function(){1===n++&&warn(`The "next" callback was called more than once in one navigation guard when going from "${o.fullPath}" to "${t.fullPath}". It should be called exactly one time in each navigation guard. This will fail in production.`);e._called=true;1===n&&e.apply(null,arguments)}}function extractComponentsGuards(e,t,o,n){const r=[];for(const a of e){"production"===process.env.NODE_ENV||a.components||a.children.length||warn(`Record with path "${a.path}" is either missing a "component(s)" or "children" property.`);for(const e in a.components){let s=a.components[e];if("production"!==process.env.NODE_ENV){if(!s||"object"!==typeof s&&"function"!==typeof s){warn(`Component "${e}" in record with path "${a.path}" is not a valid component. Received "${String(s)}".`);throw new Error("Invalid route component")}if("then"in s){warn(`Component "${e}" in record with path "${a.path}" is a Promise instead of a function that returns a Promise. Did you write "import('./MyPage.vue')" instead of "() => import('./MyPage.vue')" ? This will break in production if not fixed.`);const t=s;s=()=>t}else if(s.__asyncLoader&&!s.__warnedDefineAsync){s.__warnedDefineAsync=true;warn(`Component "${e}" in record with path "${a.path}" is defined using "defineAsyncComponent()". Write "() => import('./MyPage.vue')" instead of "defineAsyncComponent(() => import('./MyPage.vue'))".`)}}if("beforeRouteEnter"===t||a.instances[e])if(isRouteComponent(s)){const i=s.__vccOpts||s;const c=i[t];c&&r.push(guardToPromiseFn(c,o,n,a,e))}else{let i=s();if("production"!==process.env.NODE_ENV&&!("catch"in i)){warn(`Component "${e}" in record with path "${a.path}" is a function that does not return a Promise. If you were passing a functional component, make sure to add a "displayName" to the component. This will break in production if not fixed.`);i=Promise.resolve(i)}r.push((()=>i.then((r=>{if(!r)return Promise.reject(new Error(`Couldn't resolve component "${e}" at "${a.path}"`));const s=isESModule(r)?r.default:r;a.components[e]=s;const i=s.__vccOpts||s;const c=i[t];return c&&guardToPromiseFn(c,o,n,a,e)()}))))}}}return r}
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
 */function loadRouteLocation(e){return e.matched.every((e=>e.redirect))?Promise.reject(new Error("Cannot load a route that redirects.")):Promise.all(e.matched.map((e=>e.components&&Promise.all(Object.keys(e.components).reduce(((t,o)=>{const n=e.components[o];"function"!==typeof n||"displayName"in n||t.push(n().then((t=>{if(!t)return Promise.reject(new Error(`Couldn't resolve component "${o}" at "${e.path}". Ensure you passed a function that returns a promise.`));const n=isESModule(t)?t.default:t;e.components[o]=n})));return t}),[]))))).then((()=>e))}function useLink(e){const t=r(X);const o=r(Z);const c=a((()=>t.resolve(s(e.to))));const l=a((()=>{const{matched:e}=c.value;const{length:t}=e;const n=e[t-1];const r=o.matched;if(!n||!r.length)return-1;const a=r.findIndex(isSameRouteRecord.bind(null,n));if(a>-1)return a;const s=getOriginalPath(e[t-2]);return t>1&&getOriginalPath(n)===s&&r[r.length-1].path!==s?r.findIndex(isSameRouteRecord.bind(null,e[t-2])):a}));const u=a((()=>l.value>-1&&includesParams(o.params,c.value.params)));const d=a((()=>l.value>-1&&l.value===o.matched.length-1&&isSameRouteLocationParams(o.params,c.value.params)));function navigate(o={}){return guardEvent(o)?t[s(e.replace)?"replace":"push"](s(e.to)).catch(noop):Promise.resolve()}if(("production"!==process.env.NODE_ENV||__VUE_PROD_DEVTOOLS__)&&v){const e=n();if(e){const t={route:c.value,isActive:u.value,isExactActive:d.value};e.__vrl_devtools=e.__vrl_devtools||[];e.__vrl_devtools.push(t);i((()=>{t.route=c.value;t.isActive=u.value;t.isExactActive=d.value}),{flush:"post"})}}return{route:c,href:a((()=>c.value.href)),isActive:u,isExactActive:d,navigate:navigate}}const te=c({name:"RouterLink",compatConfig:{MODE:3},props:{to:{type:[String,Object],required:true},replace:Boolean,activeClass:String,exactActiveClass:String,custom:Boolean,ariaCurrentValue:{type:String,default:"page"}},useLink:useLink,setup(e,{slots:t}){const o=l(useLink(e));const{options:n}=r(X);const s=a((()=>({[getLinkClass(e.activeClass,n.linkActiveClass,"router-link-active")]:o.isActive,[getLinkClass(e.exactActiveClass,n.linkExactActiveClass,"router-link-exact-active")]:o.isExactActive})));return()=>{const n=t.default&&t.default(o);return e.custom?n:u("a",{"aria-current":o.isExactActive?e.ariaCurrentValue:null,href:o.href,onClick:o.navigate,class:s.value},n)}}});const oe=te;function guardEvent(e){if(!(e.metaKey||e.altKey||e.ctrlKey||e.shiftKey)&&!e.defaultPrevented&&(void 0===e.button||0===e.button)){if(e.currentTarget&&e.currentTarget.getAttribute){const t=e.currentTarget.getAttribute("target");if(/\b_blank\b/i.test(t))return}e.preventDefault&&e.preventDefault();return true}}function includesParams(e,t){for(const o in t){const n=t[o];const r=e[o];if("string"===typeof n){if(n!==r)return false}else if(!R(r)||r.length!==n.length||n.some(((e,t)=>e!==r[t])))return false}return true}
/**
 * Get the original path value of a record by following its aliasOf
 * @param record
 */function getOriginalPath(e){return e?e.aliasOf?e.aliasOf.path:e.path:""}
/**
 * Utility class to get the active class based on defaults.
 * @param propClass
 * @param globalClass
 * @param defaultClass
 */const getLinkClass=(e,t,o)=>null!=e?e:null!=t?t:o;const ne=c({name:"RouterView",inheritAttrs:false,props:{name:{type:String,default:"default"},route:Object},compatConfig:{MODE:3},setup(e,{attrs:t,slots:o}){"production"!==process.env.NODE_ENV&&warnDeprecatedUsage();const n=r(ee);const i=a((()=>e.route||n.value));const c=r(J,0);const l=a((()=>{let e=s(c);const{matched:t}=i.value;let o;while((o=t[e])&&!o.components)e++;return e}));const h=a((()=>i.value.matched[l.value]));d(J,a((()=>l.value+1)));d(Y,h);d(ee,i);const m=p();f((()=>[m.value,h.value,e.name]),(([e,t,o],[n,r,a])=>{if(t){t.instances[o]=e;if(r&&r!==t&&e&&e===n){t.leaveGuards.size||(t.leaveGuards=r.leaveGuards);t.updateGuards.size||(t.updateGuards=r.updateGuards)}}!e||!t||r&&isSameRouteRecord(t,r)&&n||(t.enterCallbacks[o]||[]).forEach((t=>t(e)))}),{flush:"post"});return()=>{const n=i.value;const r=e.name;const a=h.value;const s=a&&a.components[r];if(!s)return normalizeSlot(o.default,{Component:s,route:n});const c=a.props[r];const d=c?true===c?n.params:"function"===typeof c?c(n):c:null;const onVnodeUnmounted=e=>{e.component.isUnmounted&&(a.instances[r]=null)};const p=u(s,y({},d,t,{onVnodeUnmounted:onVnodeUnmounted,ref:m}));if(("production"!==process.env.NODE_ENV||__VUE_PROD_DEVTOOLS__)&&v&&p.ref){const e={depth:l.value,name:a.name,path:a.path,meta:a.meta};const t=R(p.ref)?p.ref.map((e=>e.i)):[p.ref.i];t.forEach((t=>{t.__vrv_devtools=e}))}return normalizeSlot(o.default,{Component:p,route:n})||p}}});function normalizeSlot(e,t){if(!e)return null;const o=e(t);return 1===o.length?o[0]:o}const re=ne;function warnDeprecatedUsage(){const e=n();const t=e.parent&&e.parent.type.name;if(t&&("KeepAlive"===t||t.includes("Transition"))){const e="KeepAlive"===t?"keep-alive":"transition";warn(`<router-view> can no longer be used directly inside <transition> or <keep-alive>.\nUse slot props instead:\n\n<router-view v-slot="{ Component }">\n  <${e}>\n    <component :is="Component" />\n  </${e}>\n</router-view>`)}}
/**
 * Copies a route location and removes any problematic properties that cannot be shown in devtools (e.g. Vue instances).
 *
 * @param routeLocation - routeLocation to format
 * @param tooltip - optional tooltip
 * @returns a copy of the routeLocation
 */function formatRouteLocation(e,t){const o=y({},e,{matched:e.matched.map((e=>omit(e,["instances","children","aliasOf"])))});return{_custom:{type:null,readOnly:true,display:e.fullPath,tooltip:t,value:o}}}function formatDisplay(e){return{_custom:{display:e}}}let ae=0;function addDevtools(e,t,o){if(t.__hasDevtools)return;t.__hasDevtools=true;const n=ae++;g({id:"org.vuejs.router"+(n?"."+n:""),label:"Vue Router",packageName:"vue-router",homepage:"https://router.vuejs.org",logo:"https://router.vuejs.org/logo.png",componentStateTypes:["Routing"],app:e},(r=>{"function"!==typeof r.now&&console.warn("[Vue Router]: You seem to be using an outdated version of Vue Devtools. Are you still using the Beta release instead of the stable one? You can find the links at https://devtools.vuejs.org/guide/installation.html.");r.on.inspectComponent(((e,o)=>{e.instanceData&&e.instanceData.state.push({type:"Routing",key:"$route",editable:false,value:formatRouteLocation(t.currentRoute.value,"Current Route")})}));r.on.visitComponentTree((({treeNode:e,componentInstance:t})=>{if(t.__vrv_devtools){const o=t.__vrv_devtools;e.tags.push({label:(o.name?`${o.name.toString()}: `:"")+o.path,textColor:0,tooltip:"This component is rendered by &lt;router-view&gt;",backgroundColor:se})}if(R(t.__vrl_devtools)){t.__devtoolsApi=r;t.__vrl_devtools.forEach((t=>{let o=ue;let n="";if(t.isExactActive){o=ce;n="This is exactly active"}else if(t.isActive){o=ie;n="This link is active"}e.tags.push({label:t.route.path,textColor:0,tooltip:n,backgroundColor:o})}))}}));f(t.currentRoute,(()=>{refreshRoutesView();r.notifyComponentUpdate();r.sendInspectorTree(i);r.sendInspectorState(i)}));const a="router:navigations:"+n;r.addTimelineLayer({id:a,label:`Router${n?" "+n:""} Navigations`,color:4237508});t.onError(((e,t)=>{r.addTimelineEvent({layerId:a,event:{title:"Error during Navigation",subtitle:t.fullPath,logType:"error",time:r.now(),data:{error:e},groupId:t.meta.__navigationId}})}));let s=0;t.beforeEach(((e,t)=>{const o={guard:formatDisplay("beforeEach"),from:formatRouteLocation(t,"Current Location during this navigation"),to:formatRouteLocation(e,"Target location")};Object.defineProperty(e.meta,"__navigationId",{value:s++});r.addTimelineEvent({layerId:a,event:{time:r.now(),title:"Start of navigation",subtitle:e.fullPath,data:o,groupId:e.meta.__navigationId}})}));t.afterEach(((e,t,o)=>{const n={guard:formatDisplay("afterEach")};if(o){n.failure={_custom:{type:Error,readOnly:true,display:o?o.message:"",tooltip:"Navigation Failure",value:o}};n.status=formatDisplay("❌")}else n.status=formatDisplay("✅");n.from=formatRouteLocation(t,"Current Location during this navigation");n.to=formatRouteLocation(e,"Target location");r.addTimelineEvent({layerId:a,event:{title:"End of navigation",subtitle:e.fullPath,time:r.now(),data:n,logType:o?"warning":"default",groupId:e.meta.__navigationId}})}));const i="router-inspector:"+n;r.addInspector({id:i,label:"Routes"+(n?" "+n:""),icon:"book",treeFilterPlaceholder:"Search routes"});function refreshRoutesView(){if(!c)return;const e=c;let n=o.getRoutes().filter((e=>!e.parent));n.forEach(resetMatchStateOnRouteRecord);e.filter&&(n=n.filter((t=>isRouteMatching(t,e.filter.toLowerCase()))));n.forEach((e=>markRouteRecordActive(e,t.currentRoute.value)));e.rootNodes=n.map(formatRouteRecordForInspector)}let c;r.on.getInspectorTree((t=>{c=t;t.app===e&&t.inspectorId===i&&refreshRoutesView()}));r.on.getInspectorState((t=>{if(t.app===e&&t.inspectorId===i){const e=o.getRoutes();const n=e.find((e=>e.record.__vd_id===t.nodeId));n&&(t.state={options:formatRouteRecordMatcherForStateInspector(n)})}}));r.sendInspectorTree(i);r.sendInspectorState(i)}))}function modifierForKey(e){return e.optional?e.repeatable?"*":"?":e.repeatable?"+":""}function formatRouteRecordMatcherForStateInspector(e){const{record:t}=e;const o=[{editable:false,key:"path",value:t.path}];null!=t.name&&o.push({editable:false,key:"name",value:t.name});o.push({editable:false,key:"regexp",value:e.re});e.keys.length&&o.push({editable:false,key:"keys",value:{_custom:{type:null,readOnly:true,display:e.keys.map((e=>`${e.name}${modifierForKey(e)}`)).join(" "),tooltip:"Param keys",value:e.keys}}});null!=t.redirect&&o.push({editable:false,key:"redirect",value:t.redirect});e.alias.length&&o.push({editable:false,key:"aliases",value:e.alias.map((e=>e.record.path))});Object.keys(e.record.meta).length&&o.push({editable:false,key:"meta",value:e.record.meta});o.push({key:"score",editable:false,value:{_custom:{type:null,readOnly:true,display:e.score.map((e=>e.join(", "))).join(" | "),tooltip:"Score used to sort routes",value:e.score}}});return o}const se=15485081;const ie=2450411;const ce=8702998;const le=2282478;const ue=16486972;const de=6710886;function formatRouteRecordForInspector(e){const t=[];const{record:o}=e;null!=o.name&&t.push({label:String(o.name),textColor:0,backgroundColor:le});o.aliasOf&&t.push({label:"alias",textColor:0,backgroundColor:ue});e.__vd_match&&t.push({label:"matches",textColor:0,backgroundColor:se});e.__vd_exactActive&&t.push({label:"exact",textColor:0,backgroundColor:ce});e.__vd_active&&t.push({label:"active",textColor:0,backgroundColor:ie});o.redirect&&t.push({label:"string"===typeof o.redirect?`redirect: ${o.redirect}`:"redirects",textColor:16777215,backgroundColor:de});let n=o.__vd_id;if(null==n){n=String(pe++);o.__vd_id=n}return{id:n,label:o.path,tags:t,children:e.children.map(formatRouteRecordForInspector)}}let pe=0;const fe=/^\/(.*)\/([a-z]*)$/;function markRouteRecordActive(e,t){const o=t.matched.length&&isSameRouteRecord(t.matched[t.matched.length-1],e.record);e.__vd_exactActive=e.__vd_active=o;o||(e.__vd_active=t.matched.some((t=>isSameRouteRecord(t,e.record))));e.children.forEach((e=>markRouteRecordActive(e,t)))}function resetMatchStateOnRouteRecord(e){e.__vd_match=false;e.children.forEach(resetMatchStateOnRouteRecord)}function isRouteMatching(e,t){const o=String(e.re).match(fe);e.__vd_match=false;if(!o||o.length<3)return false;const n=new RegExp(o[1].replace(/\$$/,""),o[2]);if(n.test(t)){e.children.forEach((e=>isRouteMatching(e,t)));if("/"!==e.record.path||"/"===t){e.__vd_match=e.re.test(t);return true}return false}const r=e.record.path.toLowerCase();const a=decode(r);return!(t.startsWith("/")||!a.includes(t)&&!r.includes(t))||(!(!a.startsWith(t)&&!r.startsWith(t))||(!(!e.record.name||!String(e.record.name).includes(t))||e.children.some((e=>isRouteMatching(e,t)))))}function omit(e,t){const o={};for(const n in e)t.includes(n)||(o[n]=e[n]);return o}
/**
 * Creates a Router instance that can be used by a Vue app.
 *
 * @param options - {@link RouterOptions}
 */function createRouter(e){const t=createRouterMatcher(e.routes,e);const o=e.parseQuery||parseQuery;const n=e.stringifyQuery||stringifyQuery;const r=e.history;if("production"!==process.env.NODE_ENV&&!r)throw new Error('Provide the "history" option when calling "createRouter()": https://next.router.vuejs.org/api/#history.');const i=useCallbacks();const c=useCallbacks();const u=useCallbacks();const d=h(P);let p=P;v&&e.scrollBehavior&&"scrollRestoration"in history&&(history.scrollRestoration="manual");const f=applyToParams.bind(null,(e=>""+e));const g=applyToParams.bind(null,encodeParam);const b=applyToParams.bind(null,decode);function addRoute(e,o){let n;let r;if(isRouteName(e)){n=t.getRecordMatcher(e);r=o}else r=e;return t.addRoute(r,n)}function removeRoute(e){const o=t.getRecordMatcher(e);o?t.removeRoute(o):"production"!==process.env.NODE_ENV&&warn(`Cannot remove non-existent route "${String(e)}"`)}function getRoutes(){return t.getRoutes().map((e=>e.record))}function hasRoute(e){return!!t.getRecordMatcher(e)}function resolve(e,a){a=y({},a||d.value);if("string"===typeof e){const n=parseURL(o,e,a.path);const s=t.resolve({path:n.path},a);const i=r.createHref(n.fullPath);"production"!==process.env.NODE_ENV&&(i.startsWith("//")?warn(`Location "${e}" resolved to "${i}". A resolved location cannot start with multiple slashes.`):s.matched.length||warn(`No match found for location with path "${e}"`));return y(n,s,{params:b(s.params),hash:decode(n.hash),redirectedFrom:void 0,href:i})}let s;if("path"in e){"production"!==process.env.NODE_ENV&&"params"in e&&!("name"in e)&&Object.keys(e.params).length&&warn(`Path "${e.path}" was passed with params but they will be ignored. Use a named route alongside params instead.`);s=y({},e,{path:parseURL(o,e.path,a.path).path})}else{const t=y({},e.params);for(const e in t)null==t[e]&&delete t[e];s=y({},e,{params:g(e.params)});a.params=g(a.params)}const i=t.resolve(s,a);const c=e.hash||"";"production"!==process.env.NODE_ENV&&c&&!c.startsWith("#")&&warn(`A \`hash\` should always start with the character "#". Replace "${c}" with "#${c}".`);i.params=f(b(i.params));const l=stringifyURL(n,y({},e,{hash:encodeHash(c),path:i.path}));const u=r.createHref(l);"production"!==process.env.NODE_ENV&&(u.startsWith("//")?warn(`Location "${e}" resolved to "${u}". A resolved location cannot start with multiple slashes.`):i.matched.length||warn(`No match found for location with path "${"path"in e?e.path:e}"`));return y({fullPath:l,hash:c,query:n===stringifyQuery?normalizeQuery(e.query):e.query||{}},i,{redirectedFrom:void 0,href:u})}function locationAsObject(e){return"string"===typeof e?parseURL(o,e,d.value.path):y({},e)}function checkCanceledNavigation(e,t){if(p!==e)return createRouterError(8,{from:t,to:e})}function push(e){return pushWithRedirect(e)}function replace(e){return push(y(locationAsObject(e),{replace:true}))}function handleRedirectRecord(e){const t=e.matched[e.matched.length-1];if(t&&t.redirect){const{redirect:o}=t;let n="function"===typeof o?o(e):o;if("string"===typeof n){n=n.includes("?")||n.includes("#")?n=locationAsObject(n):{path:n};n.params={}}if("production"!==process.env.NODE_ENV&&!("path"in n)&&!("name"in n)){warn(`Invalid redirect found:\n${JSON.stringify(n,null,2)}\n when navigating to "${e.fullPath}". A redirect must contain a name or path. This will break in production.`);throw new Error("Invalid redirect")}return y({query:e.query,hash:e.hash,params:"path"in n?{}:e.params},n)}}function pushWithRedirect(e,t){const o=p=resolve(e);const r=d.value;const a=e.state;const s=e.force;const i=true===e.replace;const c=handleRedirectRecord(o);if(c)return pushWithRedirect(y(locationAsObject(c),{state:"object"===typeof c?y({},a,c.state):a,force:s,replace:i}),t||o);const l=o;l.redirectedFrom=t;let u;if(!s&&isSameRouteLocation(n,r,o)){u=createRouterError(16,{to:l,from:r});handleScroll(r,r,true,false)}return(u?Promise.resolve(u):navigate(l,r)).catch((e=>isNavigationFailure(e)?isNavigationFailure(e,2)?e:markAsReady(e):triggerError(e,l,r))).then((e=>{if(e){if(isNavigationFailure(e,2)){if("production"!==process.env.NODE_ENV&&isSameRouteLocation(n,resolve(e.to),l)&&t&&(t._count=t._count?t._count+1:1)>10){warn(`Detected an infinite redirection in a navigation guard when going from "${r.fullPath}" to "${l.fullPath}". Aborting to avoid a Stack Overflow. This will break in production if not fixed.`);return Promise.reject(new Error("Infinite redirect in navigation guard"))}return pushWithRedirect(y({replace:i},locationAsObject(e.to),{state:"object"===typeof e.to?y({},a,e.to.state):a,force:s}),t||l)}}else e=finalizeNavigation(l,r,true,i,a);triggerAfterEach(l,r,e);return e}))}
/**
     * Helper to reject and skip all navigation guards if a new navigation happened
     * @param to
     * @param from
     */function checkCanceledNavigationAndReject(e,t){const o=checkCanceledNavigation(e,t);return o?Promise.reject(o):Promise.resolve()}function navigate(e,t){let o;const[n,r,a]=extractChangingRecords(e,t);o=extractComponentsGuards(n.reverse(),"beforeRouteLeave",e,t);for(const r of n)r.leaveGuards.forEach((n=>{o.push(guardToPromiseFn(n,e,t))}));const s=checkCanceledNavigationAndReject.bind(null,e,t);o.push(s);return runGuardQueue(o).then((()=>{o=[];for(const n of i.list())o.push(guardToPromiseFn(n,e,t));o.push(s);return runGuardQueue(o)})).then((()=>{o=extractComponentsGuards(r,"beforeRouteUpdate",e,t);for(const n of r)n.updateGuards.forEach((n=>{o.push(guardToPromiseFn(n,e,t))}));o.push(s);return runGuardQueue(o)})).then((()=>{o=[];for(const n of e.matched)if(n.beforeEnter&&!t.matched.includes(n))if(R(n.beforeEnter))for(const r of n.beforeEnter)o.push(guardToPromiseFn(r,e,t));else o.push(guardToPromiseFn(n.beforeEnter,e,t));o.push(s);return runGuardQueue(o)})).then((()=>{e.matched.forEach((e=>e.enterCallbacks={}));o=extractComponentsGuards(a,"beforeRouteEnter",e,t);o.push(s);return runGuardQueue(o)})).then((()=>{o=[];for(const n of c.list())o.push(guardToPromiseFn(n,e,t));o.push(s);return runGuardQueue(o)})).catch((e=>isNavigationFailure(e,8)?e:Promise.reject(e)))}function triggerAfterEach(e,t,o){for(const n of u.list())n(e,t,o)}function finalizeNavigation(e,t,o,n,a){const s=checkCanceledNavigation(e,t);if(s)return s;const i=t===P;const c=v?history.state:{};o&&(n||i?r.replace(e.fullPath,y({scroll:i&&c&&c.scroll},a)):r.push(e.fullPath,a));d.value=e;handleScroll(e,t,o,i);markAsReady()}let w;function setupListeners(){w||(w=r.listen(((e,t,o)=>{if(!C.listening)return;const n=resolve(e);const a=handleRedirectRecord(n);if(a){pushWithRedirect(y(a,{replace:true}),n).catch(noop);return}p=n;const s=d.value;v&&saveScrollPosition(getScrollKey(s.fullPath,o.delta),computeScrollPosition());navigate(n,s).catch((e=>{if(isNavigationFailure(e,12))return e;if(isNavigationFailure(e,2)){pushWithRedirect(e.to,n).then((e=>{isNavigationFailure(e,20)&&!o.delta&&o.type===E.pop&&r.go(-1,false)})).catch(noop);return Promise.reject()}o.delta&&r.go(-o.delta,false);return triggerError(e,n,s)})).then((e=>{e=e||finalizeNavigation(n,s,false);e&&(o.delta&&!isNavigationFailure(e,8)?r.go(-o.delta,false):o.type===E.pop&&isNavigationFailure(e,20)&&r.go(-1,false));triggerAfterEach(n,s,e)})).catch(noop)})))}let _=useCallbacks();let N=useCallbacks();let O;
/**
     * Trigger errorHandlers added via onError and throws the error as well
     *
     * @param error - error to throw
     * @param to - location we were navigating to when the error happened
     * @param from - location we were navigating from when the error happened
     * @returns the error as a rejected promise
     */function triggerError(e,t,o){markAsReady(e);const n=N.list();if(n.length)n.forEach((n=>n(e,t,o)));else{"production"!==process.env.NODE_ENV&&warn("uncaught error during route navigation:");console.error(e)}return Promise.reject(e)}function isReady(){return O&&d.value!==P?Promise.resolve():new Promise(((e,t)=>{_.add([e,t])}))}function markAsReady(e){if(!O){O=!e;setupListeners();_.list().forEach((([t,o])=>e?o(e):t()));_.reset()}return e}function handleScroll(t,o,n,r){const{scrollBehavior:a}=e;if(!v||!a)return Promise.resolve();const s=!n&&getSavedScrollPosition(getScrollKey(t.fullPath,0))||(r||!n)&&history.state&&history.state.scroll||null;return m().then((()=>a(t,o,s))).then((e=>e&&scrollToPosition(e))).catch((e=>triggerError(e,t,o)))}const go=e=>r.go(e);let k;const S=new Set;const C={currentRoute:d,listening:true,addRoute:addRoute,removeRoute:removeRoute,hasRoute:hasRoute,getRoutes:getRoutes,resolve:resolve,options:e,push:push,replace:replace,go:go,back:()=>go(-1),forward:()=>go(1),beforeEach:i.add,beforeResolve:c.add,afterEach:u.add,onError:N.add,isReady:isReady,install(e){const o=this;e.component("RouterLink",oe);e.component("RouterView",re);e.config.globalProperties.$router=o;Object.defineProperty(e.config.globalProperties,"$route",{enumerable:true,get:()=>s(d)});if(v&&!k&&d.value===P){k=true;push(r.location).catch((e=>{"production"!==process.env.NODE_ENV&&warn("Unexpected error when starting the router:",e)}))}const n={};for(const e in P)n[e]=a((()=>d.value[e]));e.provide(X,o);e.provide(Z,l(n));e.provide(ee,d);const i=e.unmount;S.add(e);e.unmount=function(){S.delete(e);if(S.size<1){p=P;w&&w();w=null;d.value=P;k=false;O=false}i()};("production"!==process.env.NODE_ENV||__VUE_PROD_DEVTOOLS__)&&v&&addDevtools(e,o,t)}};return C}function runGuardQueue(e){return e.reduce(((e,t)=>e.then((()=>t()))),Promise.resolve())}function extractChangingRecords(e,t){const o=[];const n=[];const r=[];const a=Math.max(t.matched.length,e.matched.length);for(let s=0;s<a;s++){const a=t.matched[s];a&&(e.matched.find((e=>isSameRouteRecord(e,a)))?n.push(a):o.push(a));const i=e.matched[s];i&&(t.matched.find((e=>isSameRouteRecord(e,i)))||r.push(i))}return[o,n,r]}function useRouter(){return r(X)}function useRoute(){return r(Z)}export{S as NavigationFailureType,oe as RouterLink,re as RouterView,P as START_LOCATION,createMemoryHistory,createRouter,createRouterMatcher,createWebHashHistory,createWebHistory,isNavigationFailure,loadRouteLocation,Y as matchedRouteKey,onBeforeRouteLeave,onBeforeRouteUpdate,parseQuery,Z as routeLocationKey,X as routerKey,ee as routerViewLocationKey,stringifyQuery,useLink,useRoute,useRouter,J as viewDepthKey};

