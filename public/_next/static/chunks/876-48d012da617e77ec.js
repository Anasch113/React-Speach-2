"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[876],{2898:function(e,t,n){n.d(t,{Z:function(){return u}});var r=n(2265),l={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"};/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */let o=e=>e.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase().trim(),u=(e,t)=>{let n=(0,r.forwardRef)(({color:n="currentColor",size:u=24,strokeWidth:i=2,absoluteStrokeWidth:c,className:f="",children:a,...s},d)=>(0,r.createElement)("svg",{ref:d,...l,width:u,height:u,stroke:n,strokeWidth:c?24*Number(i)/Number(u):i,className:["lucide",`lucide-${o(e)}`,f].join(" "),...s},[...t.map(([e,t])=>(0,r.createElement)(e,t)),...Array.isArray(a)?a:[a]]));return n.displayName=`${e}`,n}},3523:function(e,t,n){n.d(t,{Z:function(){return l}});var r=n(2898);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */let l=(0,r.Z)("ChevronDown",[["path",{d:"m6 9 6 6 6-6",key:"qrunsl"}]])},3428:function(e,t,n){n.d(t,{Z:function(){return r}});function r(){return(r=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e}).apply(this,arguments)}},5744:function(e,t,n){n.d(t,{M:function(){return r}});function r(e,t,{checkForDefaultPrevented:n=!0}={}){return function(r){if(null==e||e(r),!1===n||!r.defaultPrevented)return null==t?void 0:t(r)}}},7733:function(e,t,n){n.d(t,{B:function(){return i}});var r=n(2265),l=n(6989),o=n(2210),u=n(7256);function i(e){let t=e+"CollectionProvider",[n,i]=(0,l.b)(t),[c,f]=n(t,{collectionRef:{current:null},itemMap:new Map}),a=e+"CollectionSlot",s=r.forwardRef((e,t)=>{let{scope:n,children:l}=e,i=f(a,n),c=(0,o.e)(t,i.collectionRef);return r.createElement(u.g7,{ref:c},l)}),d=e+"CollectionItemSlot",p="data-radix-collection-item",m=r.forwardRef((e,t)=>{let{scope:n,children:l,...i}=e,c=r.useRef(null),a=(0,o.e)(t,c),s=f(d,n);return r.useEffect(()=>(s.itemMap.set(c,{ref:c,...i}),()=>void s.itemMap.delete(c))),r.createElement(u.g7,{[p]:"",ref:a},l)});return[{Provider:e=>{let{scope:t,children:n}=e,l=r.useRef(null),o=r.useRef(new Map).current;return r.createElement(c,{scope:t,itemMap:o,collectionRef:l},n)},Slot:s,ItemSlot:m},function(t){let n=f(e+"CollectionConsumer",t),l=r.useCallback(()=>{let e=n.collectionRef.current;if(!e)return[];let t=Array.from(e.querySelectorAll(`[${p}]`)),r=Array.from(n.itemMap.values()),l=r.sort((e,n)=>t.indexOf(e.ref.current)-t.indexOf(n.ref.current));return l},[n.collectionRef,n.itemMap]);return l},i]}},2210:function(e,t,n){n.d(t,{F:function(){return l},e:function(){return o}});var r=n(2265);function l(...e){return t=>e.forEach(e=>{"function"==typeof e?e(t):null!=e&&(e.current=t)})}function o(...e){return(0,r.useCallback)(l(...e),e)}},6989:function(e,t,n){n.d(t,{b:function(){return l}});var r=n(2265);function l(e,t=[]){let n=[],l=()=>{let t=n.map(e=>(0,r.createContext)(e));return function(n){let l=(null==n?void 0:n[e])||t;return(0,r.useMemo)(()=>({[`__scope${e}`]:{...n,[e]:l}}),[n,l])}};return l.scopeName=e,[function(t,l){let o=(0,r.createContext)(l),u=n.length;function i(t){let{scope:n,children:l,...i}=t,c=(null==n?void 0:n[e][u])||o,f=(0,r.useMemo)(()=>i,Object.values(i));return(0,r.createElement)(c.Provider,{value:f},l)}return n=[...n,l],i.displayName=t+"Provider",[i,function(n,i){let c=(null==i?void 0:i[e][u])||o,f=(0,r.useContext)(c);if(f)return f;if(void 0!==l)return l;throw Error(`\`${n}\` must be used within \`${t}\``)}]},function(...e){let t=e[0];if(1===e.length)return t;let n=()=>{let n=e.map(e=>({useScope:e(),scopeName:e.scopeName}));return function(e){let l=n.reduce((t,{useScope:n,scopeName:r})=>{let l=n(e),o=l[`__scope${r}`];return{...t,...o}},{});return(0,r.useMemo)(()=>({[`__scope${t.scopeName}`]:l}),[l])}};return n.scopeName=t.scopeName,n}(l,...t)]}},5400:function(e,t,n){n.d(t,{gm:function(){return o}});var r=n(2265);let l=(0,r.createContext)(void 0);function o(e){let t=(0,r.useContext)(l);return e||t||"ltr"}},966:function(e,t,n){n.d(t,{M:function(){return c}});var r,l=n(2265),o=n(1030);let u=(r||(r=n.t(l,2)))["useId".toString()]||(()=>void 0),i=0;function c(e){let[t,n]=l.useState(u());return(0,o.b)(()=>{e||n(e=>null!=e?e:String(i++))},[e]),e||(t?`radix-${t}`:"")}},9381:function(e,t,n){n.d(t,{WV:function(){return i},jH:function(){return c}});var r=n(3428),l=n(2265),o=n(4887),u=n(7256);let i=["a","button","div","form","h2","h3","img","input","label","li","nav","ol","p","span","svg","ul"].reduce((e,t)=>{let Node=(0,l.forwardRef)((e,n)=>{let{asChild:o,...i}=e,c=o?u.g7:t;return(0,l.useEffect)(()=>{window[Symbol.for("radix-ui")]=!0},[]),(0,l.createElement)(c,(0,r.Z)({},i,{ref:n}))});return Node.displayName=`Primitive.${t}`,{...e,[t]:Node}},{});function c(e,t){e&&(0,o.flushSync)(()=>e.dispatchEvent(t))}},7256:function(e,t,n){n.d(t,{g7:function(){return u}});var r=n(3428),l=n(2265),o=n(2210);let u=(0,l.forwardRef)((e,t)=>{let{children:n,...o}=e,u=l.Children.toArray(n),c=u.find(f);if(c){let e=c.props.children,n=u.map(t=>t!==c?t:l.Children.count(e)>1?l.Children.only(null):(0,l.isValidElement)(e)?e.props.children:null);return(0,l.createElement)(i,(0,r.Z)({},o,{ref:t}),(0,l.isValidElement)(e)?(0,l.cloneElement)(e,void 0,n):null)}return(0,l.createElement)(i,(0,r.Z)({},o,{ref:t}),n)});u.displayName="Slot";let i=(0,l.forwardRef)((e,t)=>{let{children:n,...r}=e;return(0,l.isValidElement)(n)?(0,l.cloneElement)(n,{...function(e,t){let n={...t};for(let r in t){let l=e[r],o=t[r],u=/^on[A-Z]/.test(r);u?l&&o?n[r]=(...e)=>{o(...e),l(...e)}:l&&(n[r]=l):"style"===r?n[r]={...l,...o}:"className"===r&&(n[r]=[l,o].filter(Boolean).join(" "))}return{...e,...n}}(r,n.props),ref:t?(0,o.F)(t,n.ref):n.ref}):l.Children.count(n)>1?l.Children.only(null):null});i.displayName="SlotClone";let c=({children:e})=>(0,l.createElement)(l.Fragment,null,e);function f(e){return(0,l.isValidElement)(e)&&e.type===c}},6459:function(e,t,n){n.d(t,{W:function(){return l}});var r=n(2265);function l(e){let t=(0,r.useRef)(e);return(0,r.useEffect)(()=>{t.current=e}),(0,r.useMemo)(()=>(...e)=>{var n;return null===(n=t.current)||void 0===n?void 0:n.call(t,...e)},[])}},3763:function(e,t,n){n.d(t,{T:function(){return o}});var r=n(2265),l=n(6459);function o({prop:e,defaultProp:t,onChange:n=()=>{}}){let[o,u]=function({defaultProp:e,onChange:t}){let n=(0,r.useState)(e),[o]=n,u=(0,r.useRef)(o),i=(0,l.W)(t);return(0,r.useEffect)(()=>{u.current!==o&&(i(o),u.current=o)},[o,u,i]),n}({defaultProp:t,onChange:n}),i=void 0!==e,c=i?e:o,f=(0,l.W)(n),a=(0,r.useCallback)(t=>{if(i){let n="function"==typeof t?t(e):t;n!==e&&f(n)}else u(t)},[i,e,u,f]);return[c,a]}},1030:function(e,t,n){n.d(t,{b:function(){return l}});var r=n(2265);let l=(null==globalThis?void 0:globalThis.document)?r.useLayoutEffect:()=>{}}}]);