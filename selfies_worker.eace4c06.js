!function(e,o,n,r,d){var i="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},t="function"==typeof i.parcelRequire4442&&i.parcelRequire4442,l=t.cache||{},u="undefined"!=typeof module&&"function"==typeof module.require&&module.require.bind(module);function c(o,n){if(!l[o]){if(!e[o]){var r="function"==typeof i.parcelRequire4442&&i.parcelRequire4442;if(!n&&r)return r(o,!0);if(t)return t(o,!0);if(u&&"string"==typeof o)return u(o);var d=new Error("Cannot find module '"+o+"'");throw d.code="MODULE_NOT_FOUND",d}a.resolve=function(n){var r=e[o][1][n];return null!=r?r:n},a.cache={};var f=l[o]=new c.Module(o);e[o][0].call(f.exports,a,f,f.exports,this)}return l[o].exports;function a(e){var o=a.resolve(e);return!1===o?{}:c(o)}}c.isParcelRequire=!0,c.Module=function(e){this.id=e,this.bundle=c,this.exports={}},c.modules=e,c.cache=l,c.parent=t,c.register=function(o,n){e[o]=[function(e,o){o.exports=n},{}]},Object.defineProperty(c,"root",{get:function(){return i.parcelRequire4442}}),i.parcelRequire4442=c;for(var f=0;f<o.length;f++)c(o[f]);var a=c(n);"object"==typeof exports&&"undefined"!=typeof module?module.exports=a:"function"==typeof define&&define.amd&&define((function(){return a}))}({e2GVl:[function(e,o,n){importScripts("https://cdn.jsdelivr.net/pyodide/v0.20.0/full/pyodide.js");var r={decoder:function(e){return null},encoder:function(e){return null},pyodideLoaded:"loading",selfiesLoaded:"loading"};onmessage=function(e){var o=e.data,n=o[0],d=o[1],i="";"loading-status"===n?i={pyodide:r.pyodideLoaded,selfies:r.selfiesLoaded}:"encoder"===n?i=r.encoder(o[2]):"decoder"===n&&(i=r.decoder(o[2])),postMessage([n,d,i])},loadPyodide().then((function(e){r.pyodideLoaded="loaded",e.loadPackage("micropip").then((function(){e.runPythonAsync("\n            import micropip\n            await micropip.install('selfies==".concat(2,"')\n            from selfies import encoder, decoder\n        "),(function(e){r.pyodideLoaded="failed",r.selfiesLoaded="failed"})).then((function(){r.selfiesLoaded="loaded";var o=e.globals.get("decoder");r.decoder=function(e){try{return o(e)}catch(e){return console.log(e),null}};var n=e.globals.get("encoder");r.encoder=function(e){try{return n(e)}catch(e){return console.log(e),null}}}))}),(function(e){r.selfiesLoaded="failed"}))}))},{}]},["e2GVl"],"e2GVl");
//# sourceMappingURL=selfies_worker.eace4c06.js.map