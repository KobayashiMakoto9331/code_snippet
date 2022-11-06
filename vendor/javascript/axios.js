import{u as e,t,s as n,A as r,b as o,a as s,c as a,d as i,e as c,C as u,p as l,V as f,f as d}from"./_/7bd94b1c.js";import h from"#lib/platform/node/index.js";import p from"#lib/adapters/http.js";import"form-data";"use strict";class InterceptorManager{constructor(){this.handlers=[]}
/**
   * Add a new interceptor to the stack
   *
   * @param {Function} fulfilled The function to handle `then` for a `Promise`
   * @param {Function} rejected The function to handle `reject` for a `Promise`
   *
   * @return {Number} An ID used to remove interceptor later
   */use(e,t,n){this.handlers.push({fulfilled:e,rejected:t,synchronous:!!n&&n.synchronous,runWhen:n?n.runWhen:null});return this.handlers.length-1}
/**
   * Remove an interceptor from the stack
   *
   * @param {Number} id The ID that was returned by `use`
   *
   * @returns {Boolean} `true` if the interceptor was removed, `false` otherwise
   */eject(e){this.handlers[e]&&(this.handlers[e]=null)}
/**
   * Clear all interceptors from the stack
   *
   * @returns {void}
   */clear(){this.handlers&&(this.handlers=[])}
/**
   * Iterate over all the registered interceptors
   *
   * This method is particularly useful for skipping over any
   * interceptors that may have become `null` calling `eject`.
   *
   * @param {Function} fn The function to call for each interceptor
   *
   * @returns {void}
   */forEach(t){e.forEach(this.handlers,(function forEachHandler(e){null!==e&&t(e)}))}}"use strict";function toURLEncodedForm(n,r){return t(n,new h.classes.URLSearchParams,Object.assign({visitor:function(t,n,r,o){if(h.isNode&&e.isBuffer(t)){this.append(n,t.toString("base64"));return false}return o.defaultVisitor.apply(this,arguments)}},r))}"use strict";
/**
 * It takes a string like `foo[x][y][z]` and returns an array like `['foo', 'x', 'y', 'z']
 *
 * @param {string} name - The name of the property to get.
 *
 * @returns An array of strings.
 */function parsePropPath(t){return e.matchAll(/\w+|\[(\w*)]/g,t).map((e=>"[]"===e[0]?"":e[1]||e[0]))}
/**
 * Convert an array to an object.
 *
 * @param {Array<any>} arr - The array to convert to an object.
 *
 * @returns An object with the same keys and values as the array.
 */function arrayToObject(e){const t={};const n=Object.keys(e);let r;const o=n.length;let s;for(r=0;r<o;r++){s=n[r];t[s]=e[s]}return t}
/**
 * It takes a FormData object and returns a JavaScript object
 *
 * @param {string} formData The FormData object to convert to JSON.
 *
 * @returns {Object<string, any> | null} The converted object.
 */function formDataToJSON(t){function buildPath(t,n,r,o){let s=t[o++];const a=Number.isFinite(+s);const i=o>=t.length;s=!s&&e.isArray(r)?r.length:s;if(i){e.hasOwnProp(r,s)?r[s]=[r[s],n]:r[s]=n;return!a}r[s]&&e.isObject(r[s])||(r[s]=[]);const c=buildPath(t,n,r[s],o);c&&e.isArray(r[s])&&(r[s]=arrayToObject(r[s]));return!a}if(e.isFormData(t)&&e.isFunction(t.entries)){const n={};e.forEachEntry(t,((e,t)=>{buildPath(parsePropPath(e),t,n,0)}));return n}return null}"use strict";var m=h.isStandardBrowserEnv?function standardBrowserEnv(){return{write:function write(t,n,r,o,s,a){const i=[];i.push(t+"="+encodeURIComponent(n));e.isNumber(r)&&i.push("expires="+new Date(r).toGMTString());e.isString(o)&&i.push("path="+o);e.isString(s)&&i.push("domain="+s);true===a&&i.push("secure");document.cookie=i.join("; ")},read:function read(e){const t=document.cookie.match(new RegExp("(^|;\\s*)("+e+")=([^;]*)"));return t?decodeURIComponent(t[3]):null},remove:function remove(e){this.write(e,"",Date.now()-864e5)}}}():function nonStandardBrowserEnv(){return{write:function write(){},read:function read(){return null},remove:function remove(){}}}();"use strict";var g=h.isStandardBrowserEnv?function standardBrowserEnv(){const t=/(msie|trident)/i.test(navigator.userAgent);const n=document.createElement("a");let r;
/**
    * Parse a URL to discover it's components
    *
    * @param {String} url The URL to be parsed
    * @returns {Object}
    */function resolveURL(e){let r=e;if(t){n.setAttribute("href",r);r=n.href}n.setAttribute("href",r);return{href:n.href,protocol:n.protocol?n.protocol.replace(/:$/,""):"",host:n.host,search:n.search?n.search.replace(/^\?/,""):"",hash:n.hash?n.hash.replace(/^#/,""):"",hostname:n.hostname,port:n.port,pathname:"/"===n.pathname.charAt(0)?n.pathname:"/"+n.pathname}}r=resolveURL(window.location.href);
/**
    * Determine if a URL shares the same origin as the current location
    *
    * @param {String} requestURL The URL to test
    * @returns {boolean} True if URL shares the same origin, otherwise false
    */return function isURLSameOrigin(t){const n=e.isString(t)?resolveURL(t):t;return n.protocol===r.protocol&&n.host===r.host}}():function nonStandardBrowserEnv(){return function isURLSameOrigin(){return true}}();"use strict";function progressEventReducer(e,t){let r=0;const o=n(50,250);return n=>{const s=n.loaded;const a=n.lengthComputable?n.total:void 0;const i=s-r;const c=o(i);const u=s<=a;r=s;const l={loaded:s,total:a,progress:a?s/a:void 0,bytes:i,rate:c||void 0,estimated:c&&a&&u?(a-s)/c:void 0};l[t?"download":"upload"]=true;e(l)}}function xhrAdapter(t){return new Promise((function dispatchXhrRequest(n,f){let d=t.data;const p=r.from(t.headers).normalize();const w=t.responseType;let E;function done(){t.cancelToken&&t.cancelToken.unsubscribe(E);t.signal&&t.signal.removeEventListener("abort",E)}e.isFormData(d)&&h.isStandardBrowserEnv&&p.setContentType(false);let T=new XMLHttpRequest;if(t.auth){const e=t.auth.username||"";const n=t.auth.password?unescape(encodeURIComponent(t.auth.password)):"";p.set("Authorization","Basic "+btoa(e+":"+n))}const C=o(t.baseURL,t.url);T.open(t.method.toUpperCase(),s(C,t.params,t.paramsSerializer),true);T.timeout=t.timeout;function onloadend(){if(!T)return;const e=r.from("getAllResponseHeaders"in T&&T.getAllResponseHeaders());const o=w&&"text"!==w&&"json"!==w?T.response:T.responseText;const s={data:o,status:T.status,statusText:T.statusText,headers:e,config:t,request:T};a((function _resolve(e){n(e);done()}),(function _reject(e){f(e);done()}),s);T=null}"onloadend"in T?T.onloadend=onloadend:T.onreadystatechange=function handleLoad(){T&&4===T.readyState&&(0!==T.status||T.responseURL&&0===T.responseURL.indexOf("file:"))&&setTimeout(onloadend)};T.onabort=function handleAbort(){if(T){f(new i("Request aborted",i.ECONNABORTED,t,T));T=null}};T.onerror=function handleError(){f(new i("Network Error",i.ERR_NETWORK,t,T));T=null};T.ontimeout=function handleTimeout(){let e=t.timeout?"timeout of "+t.timeout+"ms exceeded":"timeout exceeded";const n=t.transitional||c;t.timeoutErrorMessage&&(e=t.timeoutErrorMessage);f(new i(e,n.clarifyTimeoutError?i.ETIMEDOUT:i.ECONNABORTED,t,T));T=null};if(h.isStandardBrowserEnv){const e=(t.withCredentials||g(C))&&t.xsrfCookieName&&m.read(t.xsrfCookieName);e&&p.set(t.xsrfHeaderName,e)}void 0===d&&p.setContentType(null);"setRequestHeader"in T&&e.forEach(p.toJSON(),(function setRequestHeader(e,t){T.setRequestHeader(t,e)}));e.isUndefined(t.withCredentials)||(T.withCredentials=!!t.withCredentials);w&&"json"!==w&&(T.responseType=t.responseType);"function"===typeof t.onDownloadProgress&&T.addEventListener("progress",progressEventReducer(t.onDownloadProgress,true));"function"===typeof t.onUploadProgress&&T.upload&&T.upload.addEventListener("progress",progressEventReducer(t.onUploadProgress));if(t.cancelToken||t.signal){E=e=>{if(T){f(!e||e.type?new u(null,t,T):e);T.abort();T=null}};t.cancelToken&&t.cancelToken.subscribe(E);t.signal&&(t.signal.aborted?E():t.signal.addEventListener("abort",E))}const R=l(C);R&&-1===h.protocols.indexOf(R)?f(new i("Unsupported protocol "+R+":",i.ERR_BAD_REQUEST,t)):T.send(d||null)}))}const w={http:p,xhr:xhrAdapter};var E={getAdapter:t=>{if(e.isString(t)){const n=w[t];if(!t)throw Error(e.hasOwnProp(t)?`Adapter '${t}' is not available in the build`:`Can not resolve adapter '${t}'`);return n}if(!e.isFunction(t))throw new TypeError("adapter is not a function");return t},adapters:w};"use strict";const T={"Content-Type":"application/x-www-form-urlencoded"};
/**
 * If the browser has an XMLHttpRequest object, use the XHR adapter, otherwise use the HTTP
 * adapter
 *
 * @returns {Function}
 */function getDefaultAdapter(){let t;"undefined"!==typeof XMLHttpRequest?t=E.getAdapter("xhr"):"undefined"!==typeof process&&"process"===e.kindOf(process)&&(t=E.getAdapter("http"));return t}
/**
 * It takes a string, tries to parse it, and if it fails, it returns the stringified version
 * of the input
 *
 * @param {any} rawValue - The value to be stringified.
 * @param {Function} parser - A function that parses a string into a JavaScript object.
 * @param {Function} encoder - A function that takes a value and returns a string.
 *
 * @returns {string} A stringified version of the rawValue.
 */function stringifySafely(t,n,r){if(e.isString(t))try{(n||JSON.parse)(t);return e.trim(t)}catch(e){if("SyntaxError"!==e.name)throw e}return(r||JSON.stringify)(t)}const C={transitional:c,adapter:getDefaultAdapter(),transformRequest:[function transformRequest(n,r){const o=r.getContentType()||"";const s=o.indexOf("application/json")>-1;const a=e.isObject(n);a&&e.isHTMLForm(n)&&(n=new FormData(n));const i=e.isFormData(n);if(i)return s&&s?JSON.stringify(formDataToJSON(n)):n;if(e.isArrayBuffer(n)||e.isBuffer(n)||e.isStream(n)||e.isFile(n)||e.isBlob(n))return n;if(e.isArrayBufferView(n))return n.buffer;if(e.isURLSearchParams(n)){r.setContentType("application/x-www-form-urlencoded;charset=utf-8",false);return n.toString()}let c;if(a){if(o.indexOf("application/x-www-form-urlencoded")>-1)return toURLEncodedForm(n,this.formSerializer).toString();if((c=e.isFileList(n))||o.indexOf("multipart/form-data")>-1){const e=this.env&&this.env.FormData;return t(c?{"files[]":n}:n,e&&new e,this.formSerializer)}}if(a||s){r.setContentType("application/json",false);return stringifySafely(n)}return n}],transformResponse:[function transformResponse(t){const n=this.transitional||C.transitional;const r=n&&n.forcedJSONParsing;const o="json"===this.responseType;if(t&&e.isString(t)&&(r&&!this.responseType||o)){const e=n&&n.silentJSONParsing;const r=!e&&o;try{return JSON.parse(t)}catch(e){if(r){if("SyntaxError"===e.name)throw i.from(e,i.ERR_BAD_RESPONSE,this,null,this.response);throw e}}}return t}],timeout:0,xsrfCookieName:"XSRF-TOKEN",xsrfHeaderName:"X-XSRF-TOKEN",maxContentLength:-1,maxBodyLength:-1,env:{FormData:h.classes.FormData,Blob:h.classes.Blob},validateStatus:function validateStatus(e){return e>=200&&e<300},headers:{common:{Accept:"application/json, text/plain, */*"}}};e.forEach(["delete","get","head"],(function forEachMethodNoData(e){C.headers[e]={}}));e.forEach(["post","put","patch"],(function forEachMethodWithData(t){C.headers[t]=e.merge(T)}));"use strict";
/**
 * Transform the data for a request or a response
 *
 * @param {Array|Function} fns A single function or Array of functions
 * @param {?Object} response The response object
 *
 * @returns {*} The resulting transformed data
 */function transformData(t,n){const o=this||C;const s=n||o;const a=r.from(s.headers);let i=s.data;e.forEach(t,(function transform(e){i=e.call(o,i,a.normalize(),n?n.status:void 0)}));a.normalize();return i}"use strict";function isCancel$1(e){return!!(e&&e.__CANCEL__)}"use strict";
/**
 * Throws a `CanceledError` if cancellation has been requested.
 *
 * @param {Object} config The config that is to be used for the request
 *
 * @returns {void}
 */function throwIfCancellationRequested(e){e.cancelToken&&e.cancelToken.throwIfRequested();if(e.signal&&e.signal.aborted)throw new u}
/**
 * Dispatch a request to the server using the configured adapter.
 *
 * @param {object} config The config that is to be used for the request
 *
 * @returns {Promise} The Promise to be fulfilled
 */function dispatchRequest(e){throwIfCancellationRequested(e);e.headers=r.from(e.headers);e.data=transformData.call(e,e.transformRequest);const t=e.adapter||C.adapter;return t(e).then((function onAdapterResolution(t){throwIfCancellationRequested(e);t.data=transformData.call(e,e.transformResponse,t);t.headers=r.from(t.headers);return t}),(function onAdapterRejection(t){if(!isCancel$1(t)){throwIfCancellationRequested(e);if(t&&t.response){t.response.data=transformData.call(e,e.transformResponse,t.response);t.response.headers=r.from(t.response.headers)}}return Promise.reject(t)}))}"use strict";
/**
 * Config-specific merge-function which creates a new config-object
 * by merging two configuration objects together.
 *
 * @param {Object} config1
 * @param {Object} config2
 *
 * @returns {Object} New object resulting from merging config2 to config1
 */function mergeConfig(t,n){n=n||{};const r={};function getMergedValue(t,n){return e.isPlainObject(t)&&e.isPlainObject(n)?e.merge(t,n):e.isPlainObject(n)?e.merge({},n):e.isArray(n)?n.slice():n}function mergeDeepProperties(r){return e.isUndefined(n[r])?e.isUndefined(t[r])?void 0:getMergedValue(void 0,t[r]):getMergedValue(t[r],n[r])}function valueFromConfig2(t){if(!e.isUndefined(n[t]))return getMergedValue(void 0,n[t])}function defaultToConfig2(r){return e.isUndefined(n[r])?e.isUndefined(t[r])?void 0:getMergedValue(void 0,t[r]):getMergedValue(void 0,n[r])}function mergeDirectKeys(e){return e in n?getMergedValue(t[e],n[e]):e in t?getMergedValue(void 0,t[e]):void 0}const o={url:valueFromConfig2,method:valueFromConfig2,data:valueFromConfig2,baseURL:defaultToConfig2,transformRequest:defaultToConfig2,transformResponse:defaultToConfig2,paramsSerializer:defaultToConfig2,timeout:defaultToConfig2,timeoutMessage:defaultToConfig2,withCredentials:defaultToConfig2,adapter:defaultToConfig2,responseType:defaultToConfig2,xsrfCookieName:defaultToConfig2,xsrfHeaderName:defaultToConfig2,onUploadProgress:defaultToConfig2,onDownloadProgress:defaultToConfig2,decompress:defaultToConfig2,maxContentLength:defaultToConfig2,maxBodyLength:defaultToConfig2,beforeRedirect:defaultToConfig2,transport:defaultToConfig2,httpAgent:defaultToConfig2,httpsAgent:defaultToConfig2,cancelToken:defaultToConfig2,socketPath:defaultToConfig2,responseEncoding:defaultToConfig2,validateStatus:mergeDirectKeys};e.forEach(Object.keys(t).concat(Object.keys(n)),(function computeConfigValue(t){const n=o[t]||mergeDeepProperties;const s=n(t);e.isUndefined(s)&&n!==mergeDirectKeys||(r[t]=s)}));return r}"use strict";const R={};["object","boolean","number","function","string","symbol"].forEach(((e,t)=>{R[e]=function validator(n){return typeof n===e||"a"+(t<1?"n ":" ")+e}}));const b={};
/**
 * Transitional option validator
 *
 * @param {function|boolean?} validator - set to false if the transitional option has been removed
 * @param {string?} version - deprecated version / removed since version
 * @param {string?} message - some message with additional info
 *
 * @returns {function}
 */R.transitional=function transitional(e,t,n){function formatMessage(e,t){return"[Axios v"+f+"] Transitional option '"+e+"'"+t+(n?". "+n:"")}return(n,r,o)=>{if(false===e)throw new i(formatMessage(r," has been removed"+(t?" in "+t:"")),i.ERR_DEPRECATED);if(t&&!b[r]){b[r]=true;console.warn(formatMessage(r," has been deprecated since v"+t+" and will be removed in the near future"))}return!e||e(n,r,o)}};
/**
 * Assert object's properties type
 *
 * @param {object} options
 * @param {object} schema
 * @param {boolean?} allowUnknown
 *
 * @returns {object}
 */function assertOptions(e,t,n){if("object"!==typeof e)throw new i("options must be an object",i.ERR_BAD_OPTION_VALUE);const r=Object.keys(e);let o=r.length;while(o-- >0){const s=r[o];const a=t[s];if(a){const t=e[s];const n=void 0===t||a(t,s,e);if(true!==n)throw new i("option "+s+" must be "+n,i.ERR_BAD_OPTION_VALUE)}else if(true!==n)throw new i("Unknown option "+s,i.ERR_BAD_OPTION)}}var y={assertOptions:assertOptions,validators:R};"use strict";const v=y.validators;
/**
 * Create a new instance of Axios
 *
 * @param {Object} instanceConfig The default config for the instance
 *
 * @return {Axios} A new instance of Axios
 */class Axios$1{constructor(e){this.defaults=e;this.interceptors={request:new InterceptorManager,response:new InterceptorManager}}
/**
   * Dispatch a request
   *
   * @param {String|Object} configOrUrl The config specific for this request (merged with this.defaults)
   * @param {?Object} config
   *
   * @returns {Promise} The Promise to be fulfilled
   */request(t,n){if("string"===typeof t){n=n||{};n.url=t}else n=t||{};n=mergeConfig(this.defaults,n);const{transitional:o,paramsSerializer:s}=n;void 0!==o&&y.assertOptions(o,{silentJSONParsing:v.transitional(v.boolean),forcedJSONParsing:v.transitional(v.boolean),clarifyTimeoutError:v.transitional(v.boolean)},false);void 0!==s&&y.assertOptions(s,{encode:v.function,serialize:v.function},true);n.method=(n.method||this.defaults.method||"get").toLowerCase();const a=n.headers&&e.merge(n.headers.common,n.headers[n.method]);a&&e.forEach(["delete","get","head","post","put","patch","common"],(function cleanHeaderConfig(e){delete n.headers[e]}));n.headers=new r(n.headers,a);const i=[];let c=true;this.interceptors.request.forEach((function unshiftRequestInterceptors(e){if("function"!==typeof e.runWhen||false!==e.runWhen(n)){c=c&&e.synchronous;i.unshift(e.fulfilled,e.rejected)}}));const u=[];this.interceptors.response.forEach((function pushResponseInterceptors(e){u.push(e.fulfilled,e.rejected)}));let l;let f=0;let d;if(!c){const e=[dispatchRequest.bind(this),void 0];e.unshift.apply(e,i);e.push.apply(e,u);d=e.length;l=Promise.resolve(n);while(f<d)l=l.then(e[f++],e[f++]);return l}d=i.length;let h=n;f=0;while(f<d){const e=i[f++];const t=i[f++];try{h=e(h)}catch(e){t.call(this,e);break}}try{l=dispatchRequest.call(this,h)}catch(e){return Promise.reject(e)}f=0;d=u.length;while(f<d)l=l.then(u[f++],u[f++]);return l}getUri(e){e=mergeConfig(this.defaults,e);const t=o(e.baseURL,e.url);return s(t,e.params,e.paramsSerializer)}}e.forEach(["delete","get","head","options"],(function forEachMethodNoData(e){Axios$1.prototype[e]=function(t,n){return this.request(mergeConfig(n||{},{method:e,url:t,data:(n||{}).data}))}}));e.forEach(["post","put","patch"],(function forEachMethodWithData(e){function generateHTTPMethod(t){return function httpMethod(n,r,o){return this.request(mergeConfig(o||{},{method:e,headers:t?{"Content-Type":"multipart/form-data"}:{},url:n,data:r}))}}Axios$1.prototype[e]=generateHTTPMethod();Axios$1.prototype[e+"Form"]=generateHTTPMethod(true)}));"use strict";
/**
 * A `CancelToken` is an object that can be used to request cancellation of an operation.
 *
 * @param {Function} executor The executor function.
 *
 * @returns {CancelToken}
 */class CancelToken$1{constructor(e){if("function"!==typeof e)throw new TypeError("executor must be a function.");let t;this.promise=new Promise((function promiseExecutor(e){t=e}));const n=this;this.promise.then((e=>{if(!n._listeners)return;let t=n._listeners.length;while(t-- >0)n._listeners[t](e);n._listeners=null}));this.promise.then=e=>{let t;const r=new Promise((e=>{n.subscribe(e);t=e})).then(e);r.cancel=function reject(){n.unsubscribe(t)};return r};e((function cancel(e,r,o){if(!n.reason){n.reason=new u(e,r,o);t(n.reason)}}))}throwIfRequested(){if(this.reason)throw this.reason}subscribe(e){this.reason?e(this.reason):this._listeners?this._listeners.push(e):this._listeners=[e]}unsubscribe(e){if(!this._listeners)return;const t=this._listeners.indexOf(e);-1!==t&&this._listeners.splice(t,1)}static source(){let e;const t=new CancelToken$1((function executor(t){e=t}));return{token:t,cancel:e}}}"use strict";
/**
 * Syntactic sugar for invoking a function and expanding an array for arguments.
 *
 * Common use case would be to use `Function.prototype.apply`.
 *
 *  ```js
 *  function f(x, y, z) {}
 *  var args = [1, 2, 3];
 *  f.apply(null, args);
 *  ```
 *
 * With `spread` this example can be re-written.
 *
 *  ```js
 *  spread(function(x, y, z) {})([1, 2, 3]);
 *  ```
 *
 * @param {Function} callback
 *
 * @returns {Function}
 */function spread$1(e){return function wrap(t){return e.apply(null,t)}}"use strict";
/**
 * Determines whether the payload is an error thrown by Axios
 *
 * @param {*} payload The value to test
 *
 * @returns {boolean} True if the payload is an error thrown by Axios, otherwise false
 */function isAxiosError$1(t){return e.isObject(t)&&true===t.isAxiosError}"use strict";
/**
 * Create an instance of Axios
 *
 * @param {Object} defaultConfig The default config for the instance
 *
 * @returns {Axios} A new instance of Axios
 */function createInstance(t){const n=new Axios$1(t);const r=d(Axios$1.prototype.request,n);e.extend(r,Axios$1.prototype,n,{allOwnKeys:true});e.extend(r,n,null,{allOwnKeys:true});r.create=function create(e){return createInstance(mergeConfig(t,e))};return r}const O=createInstance(C);O.Axios=Axios$1;O.CanceledError=u;O.CancelToken=CancelToken$1;O.isCancel=isCancel$1;O.VERSION=f;O.toFormData=t;O.AxiosError=i;O.Cancel=O.CanceledError;O.all=function all(e){return Promise.all(e)};O.spread=spread$1;O.isAxiosError=isAxiosError$1;O.formToJSON=t=>formDataToJSON(e.isHTMLForm(t)?new FormData(t):t);const{Axios:x,AxiosError:A,CanceledError:S,isCancel:D,CancelToken:P,VERSION:N,all:j,Cancel:U,isAxiosError:L,spread:M,toFormData:_}=O;export{x as Axios,A as AxiosError,U as Cancel,P as CancelToken,S as CanceledError,N as VERSION,j as all,O as default,L as isAxiosError,D as isCancel,M as spread,_ as toFormData};

