!// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
function(e,o,d,n,t){/* eslint-disable no-undef */var r="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},i="function"==typeof r[n]&&r[n],l=i.cache||{},f="undefined"!=typeof module&&"function"==typeof module.require&&module.require.bind(module);function s(o,d){if(!l[o]){if(!e[o]){// if we cannot find the module within our internal map or
// cache jump to the current global require ie. the last bundle
// that was added to the page.
var t="function"==typeof r[n]&&r[n];if(!d&&t)return t(o,!0);// If there are other bundles on this page the require from the
// previous one is saved to 'previousRequire'. Repeat this as
// many times as there are bundles until the module is found or
// we exhaust the require chain.
if(i)return i(o,!0);// Try the node require function if it exists.
if(f&&"string"==typeof o)return f(o);var u=Error("Cannot find module '"+o+"'");throw u.code="MODULE_NOT_FOUND",u}c.resolve=function(d){var n=e[o][1][d];return null!=n?n:d},c.cache={};var a=l[o]=new s.Module(o);e[o][0].call(a.exports,c,a,a.exports,this)}return l[o].exports;function c(e){var o=c.resolve(e);return!1===o?{}:s(o)}}s.isParcelRequire=!0,s.Module=function(e){this.id=e,this.bundle=s,this.exports={}},s.modules=e,s.cache=l,s.parent=i,s.register=function(o,d){e[o]=[function(e,o){o.exports=d},{}]},Object.defineProperty(s,"root",{get:function(){return r[n]}}),r[n]=s;for(var u=0;u<o.length;u++)s(o[u]);if(d){// Expose entry point to Node, AMD or browser globals
// Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
var a=s(d);"object"==typeof exports&&"undefined"!=typeof module?module.exports=a:"function"==typeof define&&define.amd?define(function(){return a}):t&&(this[t]=a)}}({e2GVl:[function(e,o,d){importScripts("https://cdn.jsdelivr.net/pyodide/v0.20.0/full/pyodide.js");// make fake function to start with
let n={decoder:e=>null,encoder:e=>null,pyodideLoaded:"loading",selfiesLoaded:"loading"};onmessage=e=>{let o=e.data,d=o[0],t=o[1],r="";"loading-status"===d?r={pyodide:n.pyodideLoaded,selfies:n.selfiesLoaded}:"encoder"===d?r=n.encoder(o[2]):"decoder"===d&&(r=n.decoder(o[2])),postMessage([d,t,r])},loadPyodide().then(e=>{n.pyodideLoaded="loaded",e.loadPackage("micropip").then(()=>{e.runPythonAsync(`
            import micropip
            await micropip.install('selfies==2')
            from selfies import encoder, decoder
        `,e=>{n.pyodideLoaded="failed",n.selfiesLoaded="failed"}).then(()=>{n.selfiesLoaded="loaded";let o=e.globals.get("decoder");n.decoder=e=>{try{return o(e)}catch(e){return console.log(e),null}};let d=e.globals.get("encoder");n.encoder=e=>{try{return d(e)}catch(e){return console.log(e),null}}})},e=>{n.selfiesLoaded="failed"})})},{}]},["e2GVl"],"e2GVl","parcelRequire4442")//# sourceMappingURL=selfies_worker.9c6d17e4.js.map
;
//# sourceMappingURL=selfies_worker.9c6d17e4.js.map
