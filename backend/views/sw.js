if(!self.define){let e,i={};const n=(n,r)=>(n=new URL(n+".js",r).href,i[n]||new Promise((i=>{if("document"in self){const e=document.createElement("script");e.src=n,e.onload=i,document.head.appendChild(e)}else e=n,importScripts(n),i()})).then((()=>{let e=i[n];if(!e)throw new Error(`Module ${n} didn’t register its module`);return e})));self.define=(r,s)=>{const o=e||("document"in self?document.currentScript.src:"")||location.href;if(i[o])return;let c={};const t=e=>n(e,o),d={module:{uri:o},exports:c,require:t};i[o]=Promise.all(r.map((e=>d[e]||t(e)))).then((e=>(s(...e),c)))}}define(["./workbox-32a34f02"],(function(e){"use strict";self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"assets/index-BD8A2Dv9.js",revision:null},{url:"index.html",revision:"0ce252675da0875dab7fad1f3b979563"},{url:"registerSW.js",revision:"1872c500de691dce40960bb85481de07"},{url:"MiPo-192.png",revision:"a73d52e0ece4c2852598b4ed26e5fc81"},{url:"MiPo-512.png",revision:"6b847021bf5cabc2f8c09c44cb549dce"},{url:"MiPo-180.png",revision:"afea0b7f25c569c73a7dac697ccdeb8e"},{url:"MiPo-120.png",revision:"af7da51e59f4f3ca81164c84c900ebd0"},{url:"manifest.webmanifest",revision:"6a1287706ea8606ef5a99e53e414b656"}],{}),e.registerRoute(new e.NavigationRoute(e.createHandlerBoundToURL("index.html")))}));
