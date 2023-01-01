function makeMap(e,t){const n=Object.create(null);const o=e.split(",");for(let e=0;e<o.length;e++)n[o[e]]=true;return t?e=>!!n[e.toLowerCase()]:e=>!!n[e]}const e={1:"TEXT",2:"CLASS",4:"STYLE",8:"PROPS",16:"FULL_PROPS",32:"HYDRATE_EVENTS",64:"STABLE_FRAGMENT",128:"KEYED_FRAGMENT",256:"UNKEYED_FRAGMENT",512:"NEED_PATCH",1024:"DYNAMIC_SLOTS",2048:"DEV_ROOT_FRAGMENT",[-1]:"HOISTED",[-2]:"BAIL"};const t={1:"STABLE",2:"DYNAMIC",3:"FORWARDED"};const n="Infinity,undefined,NaN,isFinite,isNaN,parseFloat,parseInt,decodeURI,decodeURIComponent,encodeURI,encodeURIComponent,Math,Number,Date,Array,Object,Boolean,String,RegExp,Map,Set,JSON,Intl,BigInt";const o=makeMap(n);const r=2;function generateCodeFrame(e,t=0,n=e.length){let o=e.split(/(\r?\n)/);const a=o.filter(((e,t)=>t%2===1));o=o.filter(((e,t)=>t%2===0));let i=0;const s=[];for(let e=0;e<o.length;e++){i+=o[e].length+(a[e]&&a[e].length||0);if(i>=t){for(let l=e-r;l<=e+r||n>i;l++){if(l<0||l>=o.length)continue;const r=l+1;s.push(`${r}${" ".repeat(Math.max(3-String(r).length,0))}|  ${o[l]}`);const c=o[l].length;const p=a[l]&&a[l].length||0;if(l===e){const e=t-(i-(c+p));const o=Math.max(1,n>i?c-e:n-t);s.push("   |  "+" ".repeat(e)+"^".repeat(o))}else if(l>e){if(n>i){const e=Math.max(Math.min(n-i,c),1);s.push("   |  "+"^".repeat(e))}i+=c+p}}break}}return s.join("\n")}function normalizeStyle(e){if(T(e)){const t={};for(let n=0;n<e.length;n++){const o=e[n];const r=isString(o)?parseStringStyle(o):normalizeStyle(o);if(r)for(const e in r)t[e]=r[e]}return t}return isString(e)||isObject(e)?e:void 0}const a=/;(?![^(]*\))/g;const i=/:([^]+)/;const s=/\/\*.*?\*\//gs;function parseStringStyle(e){const t={};e.replace(s,"").split(a).forEach((e=>{if(e){const n=e.split(i);n.length>1&&(t[n[0].trim()]=n[1].trim())}}));return t}function stringifyStyle(e){let t="";if(!e||isString(e))return t;for(const n in e){const o=e[n];const r=n.startsWith("--")?n:R(n);(isString(o)||"number"===typeof o)&&(t+=`${r}:${o};`)}return t}function normalizeClass(e){let t="";if(isString(e))t=e;else if(T(e))for(let n=0;n<e.length;n++){const o=normalizeClass(e[n]);o&&(t+=o+" ")}else if(isObject(e))for(const n in e)e[n]&&(t+=n+" ");return t.trim()}function normalizeProps(e){if(!e)return null;let{class:t,style:n}=e;t&&!isString(t)&&(e.class=normalizeClass(t));n&&(e.style=normalizeStyle(n));return e}const l="html,body,base,head,link,meta,style,title,address,article,aside,footer,header,h1,h2,h3,h4,h5,h6,nav,section,div,dd,dl,dt,figcaption,figure,picture,hr,img,li,main,ol,p,pre,ul,a,b,abbr,bdi,bdo,br,cite,code,data,dfn,em,i,kbd,mark,q,rp,rt,ruby,s,samp,small,span,strong,sub,sup,time,u,var,wbr,area,audio,map,track,video,embed,object,param,source,canvas,script,noscript,del,ins,caption,col,colgroup,table,thead,tbody,td,th,tr,button,datalist,fieldset,form,input,label,legend,meter,optgroup,option,output,progress,select,textarea,details,dialog,menu,summary,template,blockquote,iframe,tfoot";const c="svg,animate,animateMotion,animateTransform,circle,clipPath,color-profile,defs,desc,discard,ellipse,feBlend,feColorMatrix,feComponentTransfer,feComposite,feConvolveMatrix,feDiffuseLighting,feDisplacementMap,feDistanceLight,feDropShadow,feFlood,feFuncA,feFuncB,feFuncG,feFuncR,feGaussianBlur,feImage,feMerge,feMergeNode,feMorphology,feOffset,fePointLight,feSpecularLighting,feSpotLight,feTile,feTurbulence,filter,foreignObject,g,hatch,hatchpath,image,line,linearGradient,marker,mask,mesh,meshgradient,meshpatch,meshrow,metadata,mpath,path,pattern,polygon,polyline,radialGradient,rect,set,solidcolor,stop,switch,symbol,text,textPath,title,tspan,unknown,use,view";const p="area,base,br,col,embed,hr,img,input,link,meta,param,source,track,wbr";const d=makeMap(l);const f=makeMap(c);const u=makeMap(p);const m="itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly";const g=makeMap(m);const h=makeMap(m+",async,autofocus,autoplay,controls,default,defer,disabled,hidden,loop,open,required,reversed,scoped,seamless,checked,muted,multiple,selected");function includeBooleanAttr(e){return!!e||""===e}const y=/[>/="'\u0009\u000a\u000c\u0020]/;const b={};function isSSRSafeAttrName(e){if(b.hasOwnProperty(e))return b[e];const t=y.test(e);t&&console.error(`unsafe attribute name: ${e}`);return b[e]=!t}const k={acceptCharset:"accept-charset",className:"class",htmlFor:"for",httpEquiv:"http-equiv"};const x=makeMap("accept,accept-charset,accesskey,action,align,allow,alt,async,autocapitalize,autocomplete,autofocus,autoplay,background,bgcolor,border,buffered,capture,challenge,charset,checked,cite,class,code,codebase,color,cols,colspan,content,contenteditable,contextmenu,controls,coords,crossorigin,csp,data,datetime,decoding,default,defer,dir,dirname,disabled,download,draggable,dropzone,enctype,enterkeyhint,for,form,formaction,formenctype,formmethod,formnovalidate,formtarget,headers,height,hidden,high,href,hreflang,http-equiv,icon,id,importance,integrity,ismap,itemprop,keytype,kind,label,lang,language,loading,list,loop,low,manifest,max,maxlength,minlength,media,min,multiple,muted,name,novalidate,open,optimum,pattern,ping,placeholder,poster,preload,radiogroup,readonly,referrerpolicy,rel,required,reversed,rows,rowspan,sandbox,scope,scoped,selected,shape,size,sizes,slot,span,spellcheck,src,srcdoc,srclang,srcset,start,step,style,summary,tabindex,target,title,translate,type,usemap,value,width,wrap");const v=makeMap("xmlns,accent-height,accumulate,additive,alignment-baseline,alphabetic,amplitude,arabic-form,ascent,attributeName,attributeType,azimuth,baseFrequency,baseline-shift,baseProfile,bbox,begin,bias,by,calcMode,cap-height,class,clip,clipPathUnits,clip-path,clip-rule,color,color-interpolation,color-interpolation-filters,color-profile,color-rendering,contentScriptType,contentStyleType,crossorigin,cursor,cx,cy,d,decelerate,descent,diffuseConstant,direction,display,divisor,dominant-baseline,dur,dx,dy,edgeMode,elevation,enable-background,end,exponent,fill,fill-opacity,fill-rule,filter,filterRes,filterUnits,flood-color,flood-opacity,font-family,font-size,font-size-adjust,font-stretch,font-style,font-variant,font-weight,format,from,fr,fx,fy,g1,g2,glyph-name,glyph-orientation-horizontal,glyph-orientation-vertical,glyphRef,gradientTransform,gradientUnits,hanging,height,href,hreflang,horiz-adv-x,horiz-origin-x,id,ideographic,image-rendering,in,in2,intercept,k,k1,k2,k3,k4,kernelMatrix,kernelUnitLength,kerning,keyPoints,keySplines,keyTimes,lang,lengthAdjust,letter-spacing,lighting-color,limitingConeAngle,local,marker-end,marker-mid,marker-start,markerHeight,markerUnits,markerWidth,mask,maskContentUnits,maskUnits,mathematical,max,media,method,min,mode,name,numOctaves,offset,opacity,operator,order,orient,orientation,origin,overflow,overline-position,overline-thickness,panose-1,paint-order,path,pathLength,patternContentUnits,patternTransform,patternUnits,ping,pointer-events,points,pointsAtX,pointsAtY,pointsAtZ,preserveAlpha,preserveAspectRatio,primitiveUnits,r,radius,referrerPolicy,refX,refY,rel,rendering-intent,repeatCount,repeatDur,requiredExtensions,requiredFeatures,restart,result,rotate,rx,ry,scale,seed,shape-rendering,slope,spacing,specularConstant,specularExponent,speed,spreadMethod,startOffset,stdDeviation,stemh,stemv,stitchTiles,stop-color,stop-opacity,strikethrough-position,strikethrough-thickness,string,stroke,stroke-dasharray,stroke-dashoffset,stroke-linecap,stroke-linejoin,stroke-miterlimit,stroke-opacity,stroke-width,style,surfaceScale,systemLanguage,tabindex,tableValues,target,targetX,targetY,text-anchor,text-decoration,text-rendering,textLength,to,transform,transform-origin,type,u1,u2,underline-position,underline-thickness,unicode,unicode-bidi,unicode-range,units-per-em,v-alphabetic,v-hanging,v-ideographic,v-mathematical,values,vector-effect,version,vert-adv-y,vert-origin-x,vert-origin-y,viewBox,viewTarget,visibility,width,widths,word-spacing,writing-mode,x,x-height,x1,x2,xChannelSelector,xlink:actuate,xlink:arcrole,xlink:href,xlink:role,xlink:show,xlink:title,xlink:type,xml:base,xml:lang,xml:space,y,y1,y2,yChannelSelector,z,zoomAndPan");const S=/["'&<>]/;function escapeHtml(e){const t=""+e;const n=S.exec(t);if(!n)return t;let o="";let r;let a;let i=0;for(a=n.index;a<t.length;a++){switch(t.charCodeAt(a)){case 34:r="&quot;";break;case 38:r="&amp;";break;case 39:r="&#39;";break;case 60:r="&lt;";break;case 62:r="&gt;";break;default:continue}i!==a&&(o+=t.slice(i,a));i=a+1;o+=r}return i!==a?o+t.slice(i,a):o}const A=/^-?>|<!--|-->|--!>|<!-$/g;function escapeHtmlComment(e){return e.replace(A,"")}function looseCompareArrays(e,t){if(e.length!==t.length)return false;let n=true;for(let o=0;n&&o<e.length;o++)n=looseEqual(e[o],t[o]);return n}function looseEqual(e,t){if(e===t)return true;let n=isDate(e);let o=isDate(t);if(n||o)return!(!n||!o)&&e.getTime()===t.getTime();n=isSymbol(e);o=isSymbol(t);if(n||o)return e===t;n=T(e);o=T(t);if(n||o)return!(!n||!o)&&looseCompareArrays(e,t);n=isObject(e);o=isObject(t);if(n||o){if(!n||!o)return false;const r=Object.keys(e).length;const a=Object.keys(t).length;if(r!==a)return false;for(const n in e){const o=e.hasOwnProperty(n);const r=t.hasOwnProperty(n);if(o&&!r||!o&&r||!looseEqual(e[n],t[n]))return false}}return String(e)===String(t)}function looseIndexOf(e,t){return e.findIndex((e=>looseEqual(e,t)))}const toDisplayString=e=>isString(e)?e:null==e?"":T(e)||isObject(e)&&(e.toString===N||!isFunction(e.toString))?JSON.stringify(e,replacer,2):String(e);const replacer=(e,t)=>t&&t.__v_isRef?replacer(e,t.value):isMap(t)?{[`Map(${t.size})`]:[...t.entries()].reduce(((e,[t,n])=>{e[`${t} =>`]=n;return e}),{})}:isSet(t)?{[`Set(${t.size})`]:[...t.values()]}:!isObject(t)||T(t)||isPlainObject(t)?t:String(t);const M="production"!==process.env.NODE_ENV?Object.freeze({}):{};const w="production"!==process.env.NODE_ENV?Object.freeze([]):[];const NOOP=()=>{};const NO=()=>false;const E=/^on[^a-z]/;const isOn=e=>E.test(e);const isModelListener=e=>e.startsWith("onUpdate:");const O=Object.assign;const remove=(e,t)=>{const n=e.indexOf(t);n>-1&&e.splice(n,1)};const C=Object.prototype.hasOwnProperty;const hasOwn=(e,t)=>C.call(e,t);const T=Array.isArray;const isMap=e=>"[object Map]"===toTypeString(e);const isSet=e=>"[object Set]"===toTypeString(e);const isDate=e=>"[object Date]"===toTypeString(e);const isFunction=e=>"function"===typeof e;const isString=e=>"string"===typeof e;const isSymbol=e=>"symbol"===typeof e;const isObject=e=>null!==e&&"object"===typeof e;const isPromise=e=>isObject(e)&&isFunction(e.then)&&isFunction(e.catch);const N=Object.prototype.toString;const toTypeString=e=>N.call(e);const toRawType=e=>toTypeString(e).slice(8,-1);const isPlainObject=e=>"[object Object]"===toTypeString(e);const isIntegerKey=e=>isString(e)&&"NaN"!==e&&"-"!==e[0]&&""+parseInt(e,10)===e;const z=makeMap(",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted");const F=makeMap("bind,cloak,else-if,else,for,html,if,model,on,once,pre,show,slot,text,memo");const cacheStringFunction=e=>{const t=Object.create(null);return n=>{const o=t[n];return o||(t[n]=e(n))}};const j=/-(\w)/g;const U=cacheStringFunction((e=>e.replace(j,((e,t)=>t?t.toUpperCase():""))));const P=/\B([A-Z])/g;const R=cacheStringFunction((e=>e.replace(P,"-$1").toLowerCase()));const _=cacheStringFunction((e=>e.charAt(0).toUpperCase()+e.slice(1)));const D=cacheStringFunction((e=>e?`on${_(e)}`:""));const hasChanged=(e,t)=>!Object.is(e,t);const invokeArrayFns=(e,t)=>{for(let n=0;n<e.length;n++)e[n](t)};const def=(e,t,n)=>{Object.defineProperty(e,t,{configurable:true,enumerable:false,value:n})};const toNumber=e=>{const t=parseFloat(e);return isNaN(t)?e:t};let L;const getGlobalThis=()=>L||(L="undefined"!==typeof globalThis?globalThis:"undefined"!==typeof self?self:"undefined"!==typeof window?window:"undefined"!==typeof global?global:{});const I=/^[_$a-zA-Z\xA0-\uFFFF][_$a-zA-Z0-9\xA0-\uFFFF]*$/;function genPropsAccessExp(e){return I.test(e)?`__props.${e}`:`__props[${JSON.stringify(e)}]`}export{w as EMPTY_ARR,M as EMPTY_OBJ,NO,NOOP,e as PatchFlagNames,U as camelize,_ as capitalize,def,escapeHtml,escapeHtmlComment,O as extend,genPropsAccessExp,generateCodeFrame,getGlobalThis,hasChanged,hasOwn,R as hyphenate,includeBooleanAttr,invokeArrayFns,T as isArray,h as isBooleanAttr,F as isBuiltInDirective,isDate,isFunction,o as isGloballyWhitelisted,d as isHTMLTag,isIntegerKey,x as isKnownHtmlAttr,v as isKnownSvgAttr,isMap,isModelListener,isObject,isOn,isPlainObject,isPromise,z as isReservedProp,isSSRSafeAttrName,f as isSVGTag,isSet,g as isSpecialBooleanAttr,isString,isSymbol,u as isVoidTag,looseEqual,looseIndexOf,makeMap,normalizeClass,normalizeProps,normalizeStyle,N as objectToString,parseStringStyle,k as propsToAttrMap,remove,t as slotFlagsText,stringifyStyle,toDisplayString,D as toHandlerKey,toNumber,toRawType,toTypeString};

