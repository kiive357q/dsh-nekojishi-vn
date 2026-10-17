window.__ModuleLoader__.load({id:"dsh-nekojishi-vn",factory:(require)=>{var module={exports:{}};var exports=module.exports;
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/client.jsx
var client_exports = {};
__export(client_exports, {
  apply: () => apply,
  inject: () => inject
});
module.exports = __toCommonJS(client_exports);
var import_react2 = __toESM(require("react"), 1);
var import_react_dom = require("react-dom");

// src/scenes.json
var scenes_default = [
  {
    id: "day",
    file: "room-day.png",
    label: "\u539F\u521B\u6F14\u793A \xB7 \u6668\u5149",
    source: "demo/day",
    group: "\u573A\u666F"
  },
  {
    id: "night",
    file: "room-night.png",
    label: "\u539F\u521B\u6F14\u793A \xB7 \u661F\u591C",
    source: "demo/night",
    group: "\u573A\u666F"
  },
  {
    id: "forest",
    file: "room-forest.png",
    label: "\u539F\u521B\u6F14\u793A \xB7 \u6797\u95F4",
    source: "demo/forest",
    group: "\u573A\u666F"
  }
];

// src/contours.json
var contours_default = { "tig-normal.png": { width: 400, height: 900, ratio: 0.4444444444444444, rows: [[0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95]] }, "tig-happy.png": { width: 400, height: 900, ratio: 0.4444444444444444, rows: [[0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95]] }, "tig-concern.png": { width: 400, height: 900, ratio: 0.4444444444444444, rows: [[0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95]] }, "lpd-normal.png": { width: 400, height: 900, ratio: 0.4444444444444444, rows: [[0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95]] }, "lpd-happy.png": { width: 400, height: 900, ratio: 0.4444444444444444, rows: [[0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95]] }, "lpd-concern.png": { width: 400, height: 900, ratio: 0.4444444444444444, rows: [[0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95]] }, "lpdcat-normal.png": { width: 400, height: 900, ratio: 0.4444444444444444, rows: [[0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95]] }, "lpdcat-happy.png": { width: 400, height: 900, ratio: 0.4444444444444444, rows: [[0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95]] }, "lpdcat-concern.png": { width: 400, height: 900, ratio: 0.4444444444444444, rows: [[0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95], [0.05, 0.95]] } };

// src/resource-pack.json with { type: 'json' }
var resource_pack_default = {
  kind: "demo"
};

// src/state.mjs
var SCENES = Object.freeze(scenes_default);
var sceneMap = new Map(SCENES.map((scene) => [scene.id, scene]));
var sceneFor = (id) => sceneMap.get(id) ?? sceneMap.get("night");
var DEFAULTS = Object.freeze({ enabled: true, left: resource_pack_default.kind === "game" ? "tig" : "none", right: resource_pack_default.kind === "game" ? "lpdcat" : "none", scene: "night", motion: true, showPortrait: true, textShadow: true, persona: resource_pack_default.kind === "game" });
var CHARACTERS = Object.freeze({ none: { name: "\u65E0", normal: null }, tig: { name: "\u864E\u7237", normal: "tig-normal.png", happy: "tig-happy.png", concern: "tig-concern.png" }, lpd: { name: "\u4E91\u8C79", normal: "lpd-normal.png", happy: "lpd-happy.png", concern: "lpd-concern.png" }, lpdcat: { name: "\u77F3\u864E", normal: "lpdcat-normal.png", happy: "lpdcat-happy.png", concern: "lpdcat-concern.png" } });
var MOODS = Object.freeze({ idle: { label: "\u6B63\u5728\u503E\u542C", expression: "normal", portrait: "normal" }, thinking: { label: "\u6B63\u5728\u601D\u8003", expression: "normal", portrait: "serious" }, working: { label: "\u6B63\u5728\u6267\u884C", expression: "normal", portrait: "serious" }, speaking: { label: "\u6B63\u5728\u56DE\u590D", expression: "happy", portrait: "normal" }, waiting: { label: "\u7B49\u5F85\u4F60\u7684\u56DE\u7B54", expression: "concern", portrait: "confused" }, approval: { label: "\u7B49\u5F85\u4F60\u7684\u786E\u8BA4", expression: "concern", portrait: "serious" }, finished: { label: "\u672C\u8F6E\u5DF2\u5B8C\u6210", expression: "happy", portrait: "laugh" }, goal: { label: "\u76EE\u6807\u5DF2\u5B8C\u6210", expression: "happy", portrait: "laugh" }, failed: { label: "\u9047\u5230\u95EE\u9898", expression: "concern", portrait: "difficult" }, stopped: { label: "\u5DF2\u505C\u6B62", expression: "normal", portrait: "difficult" }, offline: { label: "\u8FDE\u63A5\u4E2D\u65AD", expression: "concern", portrait: "confused" } });
function normalizePreferences(value) {
  const p = { ...DEFAULTS };
  if (!value || typeof value !== "object") return p;
  for (const k of ["enabled", "motion", "showPortrait", "textShadow", "persona"]) if (typeof value[k] === "boolean") p[k] = value[k];
  for (const k of ["left", "right"]) if (Object.hasOwn(CHARACTERS, value[k])) p[k] = value[k];
  if (sceneMap.has(value.scene)) p.scene = value.scene;
  if (resource_pack_default.kind !== "game") {
    p.left = "none";
    p.right = "none";
    p.persona = false;
  }
  return p;
}
function moodFromFacts({ pending, goalPhase, running, openError, lastError, lastEvent, latestTurnEnd }) {
  if (pending) return pending.kind === "approval" ? "approval" : "waiting";
  if (openError) return "offline";
  if (running) {
    const type = lastEvent?.type ?? "";
    if (type === "assistant/live-chunk") {
      const chunk = lastEvent.data?.chunk;
      const kind2 = chunk?.type ?? "";
      if (/tool/.test(kind2)) return "working";
      if (/reason|think/.test(kind2)) return "thinking";
      if (/text|content/.test(kind2)) return "speaking";
    }
    if (type.startsWith("tool/") || type.includes("tool-call")) return "working";
    if (type === "assistant/message" || type === "assistant/chunk" || type === "assistant/text" || type.includes("delta")) return "speaking";
    return "thinking";
  }
  const reason = latestTurnEnd?.data?.reason;
  const kind = typeof reason === "string" ? reason : reason?.kind;
  if (kind === "error" || lastError) return "failed";
  if (["interrupted", "cancelled", "canceled", "stopped", "abort", "aborted"].includes(kind)) return "stopped";
  if (kind === "blocked" || kind === "max-tokens" || goalPhase === "blocked") return "stopped";
  if (goalPhase === "complete") return "goal";
  if (latestTurnEnd) return "finished";
  return "idle";
}
function roleForSelection(left, right, enabled = true) {
  if (!enabled) return null;
  const roles = [...new Set([left, right].filter((role) => role !== "none" && Object.hasOwn(CHARACTERS, role)))];
  return roles.length === 1 ? roles[0] : null;
}
function alphaEdges(profile, top, height, from, to) {
  if (!profile || to < top || from > top + height || height <= 0) return null;
  const first = Math.max(0, Math.floor((from - top) / height * profile.rows.length));
  const last = Math.min(profile.rows.length - 1, Math.ceil((to - top) / height * profile.rows.length));
  let left = 1, right = 0;
  for (let i = first; i <= last; i++) {
    const row = profile.rows[i];
    if (row) {
      left = Math.min(left, row[0]);
      right = Math.max(right, row[1]);
    }
  }
  return right > left ? [left, right] : null;
}
function geometry(width, composer = {}, selection = {}) {
  const composerWidth = composer.width ?? Math.min(1480, Math.max(0, width - 80));
  const left = composer.left ?? (width - composerWidth) / 2;
  const top = composer.top ?? 640;
  const height = selection.height ?? top + 175;
  const expression = selection.expression ?? "normal";
  const l = contours_default[CHARACTERS[selection.left ?? "tig"]?.[expression]], r = contours_default[CHARACTERS[selection.right ?? "lpdcat"]?.[expression]];
  const avatar = selection.showPortrait !== false && (l || r);
  const avatarWidth = selection.portraitWidth ?? 150;
  const minimum = Math.min(320, Math.max(280, width * 0.27));
  let character = l || r ? Math.max(0, height - 92) : 0, result;
  for (let attempt = 0; attempt < 100; attempt++) {
    if (character < 60) character = 0;
    const bodyTop = height - character;
    const lWidth = character * (l?.ratio ?? 0), rWidth = character * (r?.ratio ?? 0);
    let lx = Math.max(0, left - 28), rx = width - Math.max(24, width - left - composerWidth) - rWidth - 12;
    const avatarEdge = avatar ? alphaEdges(l, bodyTop, character, top - 100, top - 28) : null;
    if (avatarEdge) lx = Math.max(lx, left + avatarWidth + 12 - avatarEdge[0] * lWidth);
    const le = alphaEdges(l, bodyTop, character, 80, top), re = alphaEdges(r, bodyTop, character, 80, top);
    const margin = Math.min(24, Math.max(0, (width - 280) / 2));
    const safeLeft = le ? Math.max(margin, lx + le[1] * lWidth + 20) : margin;
    const safeRight = re ? Math.max(margin, width - (rx + re[0] * rWidth) + 20) : margin;
    result = { safeLeft, safeRight, leftX: lx, rightX: rx, flowWidth: Math.min(920, Math.max(0, width - safeLeft - safeRight)), flowOffset: (safeLeft - safeRight) / 2 };
    if (width - safeLeft - safeRight >= minimum || character < 30 || !l && !r) break;
    character *= 0.96;
  }
  return { ...result, safe: Math.max(0, (width - result.flowWidth) / 2), character, compact: width < 620, composerLeft: left, composerRight: Math.max(0, width - left - composerWidth), composerTop: top };
}

// src/music.jsx
var import_react = __toESM(require("react"), 1);

// src/music.json
var music_default = [
  {
    id: "demo-quiet",
    title: "Quiet Loop \xB7 \u539F\u521B\u6F14\u793A",
    file: "quiet-loop.wav",
    source: "demo/quiet-loop.wav",
    credit: "\u539F\u521B\u5408\u6210\u6F14\u793A"
  }
];

// src/music-state.mjs
var formatTime = (value) => {
  const seconds = Number.isFinite(value) ? Math.max(0, Math.floor(value)) : 0;
  return `${Math.floor(seconds / 60)}:${String(seconds % 60).padStart(2, "0")}`;
};
function parsePlaylist(text, filename, tracks) {
  const byName = new Map(tracks.flatMap((track) => [[track.name ?? track.file, track.id], [track.title, track.id], [track.id, track.id]]));
  let title = filename.replace(/\.[^.]+$/, "");
  let items = [];
  if (/\.json$/i.test(filename)) {
    const data = JSON.parse(text);
    title = typeof data.name === "string" ? data.name : title;
    const list = Array.isArray(data) ? data : data.tracks;
    if (!Array.isArray(list)) throw Error("JSON \u6B4C\u5355\u9700\u8981 tracks \u6570\u7EC4");
    items = list.map((item) => typeof item === "string" ? item : item.file ?? item.name ?? item.id ?? "");
  } else if (/\.pls$/i.test(filename)) items = [...text.matchAll(/^File\d+=(.*)$/gmi)].map((match) => match[1].trim());
  else items = text.replace(/^\uFEFF/, "").split(/\r?\n/).filter((line) => line.trim() && !line.trim().startsWith("#")).map((line) => line.trim());
  const ids = [], missing = [];
  for (const item of items) {
    const name = item.replaceAll("\\", "/").split("/").at(-1);
    const id = byName.get(item) ?? byName.get(name);
    if (id) ids.push(id);
    else missing.push(name);
  }
  return { id: "playlist-" + Date.now() + "-" + Math.random().toString(36).slice(2, 7), name: title, trackIds: [...new Set(ids)], missing };
}
function openMusicDatabase() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open("dsh-nekojishi-music", 1);
    request.onupgradeneeded = () => {
      for (const name of ["tracks", "playlists"]) if (!request.result.objectStoreNames.contains(name)) request.result.createObjectStore(name, { keyPath: "id" });
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}
async function musicReadAll(store) {
  const database = await openMusicDatabase();
  try {
    return await new Promise((resolve, reject) => {
      const request = database.transaction(store).objectStore(store).getAll();
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  } finally {
    database.close();
  }
}
async function musicSave(store, items) {
  const database = await openMusicDatabase();
  try {
    await new Promise((resolve, reject) => {
      const transaction = database.transaction(store, "readwrite");
      for (const item of items) transaction.objectStore(store).put(item);
      transaction.oncomplete = resolve;
      transaction.onerror = () => reject(transaction.error);
      transaction.onabort = () => reject(transaction.error);
    });
  } finally {
    database.close();
  }
}

// src/music.jsx
var import_jsx_runtime = require("react/jsx-runtime");
var baseTracks = music_default.map((track) => ({ ...track, name: track.source.slice(6), url: "/nekojishi-assets/" + encodeURIComponent(track.file) }));
var builtInLabel = music_default[0]?.credit ? "\u5185\u7F6E\u6F14\u793A" : "\u6E38\u620F\u539F\u58F0";
function savedMusic() {
  try {
    return JSON.parse(localStorage.getItem("dsh.nekojishi.music.v1") ?? "{}");
  } catch {
    return {};
  }
}
function MusicPlayer() {
  const [tracks, setTracks] = (0, import_react.useState)(baseTracks), [playlists, setPlaylists] = (0, import_react.useState)([]), [playlist, setPlaylist] = (0, import_react.useState)("original");
  const [current, setCurrent] = (0, import_react.useState)(() => savedMusic().current ?? "Title"), [playing, setPlaying] = (0, import_react.useState)(false), [time, setTime] = (0, import_react.useState)(0), [duration, setDuration] = (0, import_react.useState)(0), [volume, setVolume] = (0, import_react.useState)(() => Number.isFinite(savedMusic().volume) ? Math.max(0, Math.min(1, savedMusic().volume)) : 0.35), [shuffle, setShuffle] = (0, import_react.useState)(false), [expanded, setExpanded] = (0, import_react.useState)(false), [notice, setNotice] = (0, import_react.useState)("");
  const audio = (0, import_react.useRef)(null), picker = (0, import_react.useRef)(null), wantPlay = (0, import_react.useRef)(false);
  const [loading, setLoading] = (0, import_react.useState)(true);
  const list = playlist === "original" ? baseTracks : playlist === "all" ? tracks : (playlists.find((item) => item.id === playlist)?.trackIds ?? []).map((id) => tracks.find((track2) => track2.id === id)).filter(Boolean);
  const track = tracks.find((item) => item.id === current) ?? baseTracks[0];
  (0, import_react.useEffect)(() => {
    let active = true;
    Promise.all([musicReadAll("tracks"), musicReadAll("playlists")]).then(([saved, savedLists]) => {
      if (active) {
        setTracks([...baseTracks, ...saved]);
        setPlaylists(savedLists);
      }
    }).catch(() => {
      if (active) setNotice("\u65E0\u6CD5\u6253\u5F00\u672C\u5730\u97F3\u4E50\u5E93\uFF0C\u5185\u7F6E\u539F\u58F0\u4ECD\u53EF\u64AD\u653E\u3002");
    });
    return () => {
      active = false;
      audio.current?.pause();
    };
  }, []);
  (0, import_react.useEffect)(() => {
    const element = audio.current;
    if (!element) return;
    let url, disposed = false;
    const controller = new AbortController();
    element.pause();
    setLoading(true);
    setTime(0);
    setDuration(0);
    const load = async () => {
      let blob = track.blob;
      if (!blob) {
        const response = await fetch(track.url, { signal: controller.signal });
        if (!response.ok) throw Error("\u6B4C\u66F2\u65E0\u6CD5\u8BFB\u53D6");
        blob = await response.blob();
      }
      if (disposed) return;
      url = URL.createObjectURL(blob);
      element.src = url;
      element.load();
      setLoading(false);
      if (wantPlay.current) void element.play().catch(() => {
        setPlaying(false);
        setNotice("\u70B9\u51FB\u64AD\u653E\u4EE5\u5F00\u59CB\u97F3\u4E50\u3002");
      });
    };
    void load().catch((error) => {
      if (!disposed && error.name !== "AbortError") {
        setLoading(false);
        setNotice("\u6B4C\u66F2\u8BFB\u53D6\u5931\u8D25\uFF0C\u8BF7\u5207\u6362\u66F2\u76EE\u6216\u91CD\u65B0\u5BFC\u5165\u3002");
      }
    });
    return () => {
      disposed = true;
      controller.abort();
      if (url) URL.revokeObjectURL(url);
    };
  }, [track.id]);
  (0, import_react.useEffect)(() => {
    if (audio.current) audio.current.volume = volume;
  }, [volume]);
  (0, import_react.useEffect)(() => {
    try {
      localStorage.setItem("dsh.nekojishi.music.v1", JSON.stringify({ current, volume }));
    } catch {
    }
  }, [current, volume]);
  const choose = (id) => {
    wantPlay.current = true;
    if (id === current) {
      if (!loading) void audio.current.play().catch(() => setNotice("\u8FD9\u9996\u6B4C\u66F2\u6682\u65F6\u65E0\u6CD5\u64AD\u653E\u3002"));
    } else setCurrent(id);
  };
  const next = (direction) => {
    if (!list.length) return;
    const index = list.findIndex((item) => item.id === current);
    const target = shuffle ? Math.floor(Math.random() * list.length) : (index + direction + list.length) % list.length;
    choose(list[target].id);
  };
  const toggle = () => {
    if (!audio.current) return;
    if (loading) {
      wantPlay.current = !wantPlay.current;
      setNotice(wantPlay.current ? "\u6B63\u5728\u8BFB\u53D6\u6B4C\u66F2\u2026" : "");
      return;
    }
    if (playing) {
      wantPlay.current = false;
      audio.current.pause();
    } else {
      wantPlay.current = true;
      void audio.current.play().catch(() => setNotice("\u8FD9\u9996\u6B4C\u66F2\u6682\u65F6\u65E0\u6CD5\u64AD\u653E\u3002"));
    }
  };
  const importFiles = async (event) => {
    const files = [...event.target.files];
    event.target.value = "";
    if (!files.length) return;
    try {
      const songs = files.filter((file) => !/\.(m3u8?|pls|json)$/i.test(file.name) && (file.type.startsWith("audio/") || /\.(mp3|ogg|wav|m4a|flac|aac|opus)$/i.test(file.name))).map((file) => ({ id: `local-${file.size}-${file.lastModified}-${file.name}`, title: file.name.replace(/\.[^.]+$/, ""), name: file.name, blob: file }));
      if (songs.length) await musicSave("tracks", songs);
      const merged = [...tracks];
      for (const song of songs) {
        const index = merged.findIndex((item) => item.id === song.id);
        if (index >= 0) merged[index] = song;
        else merged.push(song);
      }
      setTracks(merged);
      const additions = [];
      let missing = [];
      for (const file of files.filter((file2) => /\.(m3u8?|pls|json)$/i.test(file2.name))) {
        const parsed = parsePlaylist(await file.text(), file.name, merged);
        additions.push(parsed);
        missing.push(...parsed.missing);
      }
      if (songs.length && !additions.length) additions.push({ id: "import-" + Date.now(), name: "\u5BFC\u5165\u6B4C\u66F2", trackIds: songs.map((song) => song.id), missing: [] });
      if (additions.length) {
        await musicSave("playlists", additions);
        setPlaylists((previous) => [...previous, ...additions]);
        setPlaylist(additions[0].id);
      }
      setNotice(missing.length ? `\u5DF2\u5BFC\u5165\u3002\u7F3A\u5C11 ${missing.length} \u9996\u6B4C\u66F2\uFF0C\u8BF7\u540C\u65F6\u9009\u62E9\u76F8\u5E94\u97F3\u9891\u6587\u4EF6\u91CD\u65B0\u5BFC\u5165\u6B4C\u5355\u3002` : `\u5DF2\u5BFC\u5165 ${songs.length} \u9996\u6B4C\u66F2\u3001${additions.length} \u4E2A\u6B4C\u5355\u3002`);
      setExpanded(true);
    } catch (error) {
      setNotice("\u5BFC\u5165\u5931\u8D25\uFF1A" + error.message);
    }
  };
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { className: "vn-music", "aria-label": "\u97F3\u4E50\u64AD\u653E\u5668", "data-neko-music": "", children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("audio", { ref: audio, preload: "metadata", onPlay: () => setPlaying(true), onPause: () => setPlaying(false), onEnded: () => next(1), onTimeUpdate: (event) => setTime(event.currentTarget.currentTime), onDurationChange: (event) => setDuration(Number.isFinite(event.currentTarget.duration) ? event.currentTarget.duration : 0), onError: () => {
      setPlaying(false);
      setNotice("\u65E0\u6CD5\u8BFB\u53D6\u8FD9\u9996\u6B4C\u66F2\uFF0C\u53EF\u5207\u6362\u66F2\u76EE\u6216\u91CD\u65B0\u5BFC\u5165\u3002");
    } }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "vn-music-heading", children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { "aria-hidden": "true", children: "\u266B" }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { title: track.title, children: track.title }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: track.credit ?? (track.source ? "\u5BB6\u6709\u5927\u732B \xB7 \u539F\u58F0" : "\u672C\u5730\u97F3\u4E50") })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", { type: "button", "aria-label": expanded ? "\u6536\u8D77\u6B4C\u5355" : "\u5C55\u5F00\u6B4C\u5355", onClick: () => setExpanded((value) => !value), children: "\u2637" })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", { type: "range", "aria-label": "\u64AD\u653E\u8FDB\u5EA6", min: "0", max: duration || 1, step: ".1", value: Math.min(time, duration || 0), disabled: !duration, onChange: (event) => {
      audio.current.currentTime = Number(event.target.value);
      setTime(Number(event.target.value));
    } }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "vn-music-time", children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: formatTime(time) }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: formatTime(duration) })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "vn-music-controls", children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", { type: "button", "aria-label": "\u4E0A\u4E00\u9996", onClick: () => next(-1), children: "\u25C0" }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", { type: "button", "aria-label": playing ? "\u6682\u505C\u97F3\u4E50" : "\u64AD\u653E\u97F3\u4E50", onClick: toggle, children: playing ? "\u2161" : "\u25B6" }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", { type: "button", "aria-label": "\u4E0B\u4E00\u9996", onClick: () => next(1), children: "\u25B6" }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", { type: "button", "aria-label": "\u968F\u673A\u64AD\u653E", "aria-pressed": shuffle, onClick: () => setShuffle((value) => !value), children: "\u21C4" }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", { type: "button", "aria-label": "\u5BFC\u5165\u6B4C\u66F2\u6216\u6B4C\u5355", onClick: () => picker.current.click(), children: "\uFF0B" })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { className: "vn-music-volume", children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "\u97F3\u91CF" }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", { type: "range", "aria-label": "\u97F3\u4E50\u97F3\u91CF", min: "0", max: "1", step: ".01", value: volume, onChange: (event) => setVolume(Number(event.target.value)) }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
        Math.round(volume * 100),
        "%"
      ] })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", { ref: picker, type: "file", multiple: true, accept: "audio/*,.mp3,.ogg,.wav,.m4a,.flac,.aac,.opus,.m3u,.m3u8,.pls,.json", hidden: true, onChange: importFiles, "aria-label": "\u9009\u62E9\u6B4C\u66F2\u6216\u6B4C\u5355\u6587\u4EF6" }),
    expanded && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "vn-music-library", children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", { "aria-label": "\u97F3\u4E50\u6B4C\u5355", value: playlist, onChange: (event) => setPlaylist(event.target.value), children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("option", { value: "original", children: [
          builtInLabel,
          " \xB7 ",
          baseTracks.length,
          " \u9996"
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("option", { value: "all", children: [
          "\u5168\u90E8\u97F3\u4E50 \xB7 ",
          tracks.length,
          " \u9996"
        ] }),
        playlists.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("option", { value: item.id, children: [
          item.name,
          " \xB7 ",
          item.trackIds.length,
          " \u9996"
        ] }, item.id))
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "vn-music-tracks", children: [
        list.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", { type: "button", "aria-current": current === item.id ? "true" : void 0, onClick: () => choose(item.id), children: item.title }, item.id)),
        !list.length && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "\u6B4C\u5355\u6682\u65E0\u53EF\u64AD\u653E\u6B4C\u66F2\u3002" })
      ] })
    ] }),
    notice && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { className: "vn-music-notice", role: "status", children: notice })
  ] });
}

// src/resource-pack.json
var resource_pack_default2 = {
  kind: "demo"
};

// src/client.jsx
var import_jsx_runtime2 = require("react/jsx-runtime");
var gameResources = resource_pack_default2.kind === "game";
var ID = "dsh-nekojishi-vn";
var asset = (name) => `/nekojishi-assets/${encodeURIComponent(name)}`;
var currentSession = (list) => Object.values(list.byId ?? {}).find((item) => (item.retainedBy?.mainView ?? 0) > 0)?.id;
var inject = ["slots", "layout", "theme", "sessions", "uiSession", "sidebarRight", "uiWorkspace"];
function makeUI() {
  let saved;
  try {
    saved = JSON.parse(localStorage.getItem("dsh.nekojishi.preferences.v1") ?? "null");
  } catch {
    saved = null;
  }
  let snapshot = { preferences: normalizePreferences(saved), panel: null, notice: "" };
  const listeners = /* @__PURE__ */ new Set();
  const update = (value) => {
    snapshot = { ...snapshot, ...value };
    for (const listener of listeners) listener();
  };
  return {
    getSnapshot: () => snapshot,
    subscribe: (fn) => {
      listeners.add(fn);
      return () => listeners.delete(fn);
    },
    panel: (panel) => update({ panel, notice: "" }),
    notice: (notice) => update({ notice }),
    preferences: (patch) => {
      const preferences = normalizePreferences({ ...snapshot.preferences, ...patch });
      try {
        localStorage.setItem("dsh.nekojishi.preferences.v1", JSON.stringify(preferences));
      } catch (error) {
        console.warn("Nekojishi preferences could not be saved", error);
      }
      update({ preferences });
    }
  };
}
function makeMood(ctx) {
  let snapshot = { id: void 0, mood: "idle" }, binding, offBinding = [], lastEvent, latestTurnEnd, lastRevision;
  const listeners = /* @__PURE__ */ new Set();
  const publish = () => {
    const id = currentSession(ctx.sessions.list.getSnapshot());
    const nextBinding = id === void 0 ? void 0 : ctx.sessions.binding(id);
    if (nextBinding !== binding) {
      for (const off2 of offBinding) off2();
      offBinding = [];
      binding = nextBinding;
      lastEvent = void 0;
      latestTurnEnd = void 0;
      lastRevision = void 0;
      if (binding) {
        offBinding = [binding.session.subscribe(publish), binding.eventSource.subscribe(publish), binding.session.projections.faceOf("goal").subscribe(publish)];
      }
    }
    const lifecycle = binding?.session.getSnapshot();
    const events = binding?.eventSource.getSnapshot();
    if (events && events.revision !== lastRevision) {
      const change = events.change;
      const entries = lastRevision === void 0 || change?.kind === "replace" ? events.entries : change?.kind === "append" ? change.entries : change?.kind === "settle-assistant" && change.entry ? [change.entry] : [];
      for (const entry of entries ?? []) {
        const event = entry.event ?? entry;
        lastEvent = event;
        if (event.type === "turn/end") latestTurnEnd = event;
      }
      lastRevision = events.revision;
    }
    const pending = id === void 0 ? void 0 : ctx.uiSession.sessionStatus.getSnapshot().get(id)?.pendingInteraction;
    const goalPhase = binding?.session.projections.faceOf("goal").getSnapshot()?.goal?.phase;
    const mood = moodFromFacts({ pending, goalPhase, running: lifecycle?.running, openError: lifecycle?.openError, lastError: lifecycle?.lastAgentError, lastEvent, latestTurnEnd });
    if (snapshot.id !== id || snapshot.mood !== mood) {
      snapshot = { id, mood };
      for (const listener of listeners) listener();
    }
  };
  const off = [ctx.sessions.list.subscribe(publish), ctx.uiSession.sessionStatus.subscribe(publish)];
  publish();
  return { getSnapshot: () => snapshot, subscribe: (fn) => {
    listeners.add(fn);
    return () => listeners.delete(fn);
  }, dispose: () => {
    off.forEach((fn) => fn());
    offBinding.forEach((fn) => fn());
    listeners.clear();
  } };
}
function GameButton({ icon, label, onClick, disabled = false, ...props }) {
  return /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("button", { type: "button", className: "vn-game-button", "aria-label": label, title: label, onClick, disabled, ...props, children: [
    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("img", { src: asset(`icon-${icon}-a.png`), alt: "" }),
    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: "vn-sr", children: label })
  ] });
}
function Appearance({ preferences, onChange }) {
  const [search, setSearch] = (0, import_react2.useState)("");
  const [group, setGroup] = (0, import_react2.useState)("\u573A\u666F");
  const scenes = SCENES.filter((scene) => (group === "\u5168\u90E8" || scene.group === group) && `${scene.label} ${scene.source}`.toLowerCase().includes(search.toLowerCase()));
  return /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "vn-appearance", children: [
    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("p", { className: "vn-explanation", children: "\u4EBA\u7269\u4E0E\u6A21\u578B\u72EC\u7ACB\u9009\u62E9\u3002\u542F\u7528\u89D2\u8272\u8868\u8FBE\u540E\uFF0C\u5355\u89D2\u8272\u6216\u540C\u89D2\u8272\u4F1A\u52A0\u8F7D\u5BF9\u5E94 skill\uFF1B\u6A21\u578B\u3001\u4EFB\u52A1\u5DE5\u5177\u4E0E\u539F\u751F\u5DE5\u4F5C\u6D41\u7A0B\u4FDD\u6301\u4E0D\u53D8\u3002" }),
    !gameResources && /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("p", { className: "vn-explanation", children: "\u5F53\u524D\u4E3A\u8F7B\u91CF\u821E\u53F0\u3002\u4EBA\u7269\u4F7F\u7528\u4F60\u672C\u673A\u7684\u6E38\u620F\u8D44\u6E90\uFF0C\u6309 README \u5BFC\u5165\u5E76\u6784\u5EFA\u540E\u5373\u53EF\u9009\u62E9\u539F\u7248\u89D2\u8272\u3002" }),
    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "vn-character-selects", children: [["left", "\u5DE6\u4FA7\u4EBA\u7269"], ["right", "\u53F3\u4FA7\u4EBA\u7269"]].map(([side, label]) => /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("fieldset", { children: [
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("legend", { children: label }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "vn-character-cards", children: Object.entries(CHARACTERS).filter(([key]) => gameResources || key === "none").map(([key, character]) => /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("button", { type: "button", className: "vn-character-card", "aria-pressed": preferences[side] === key, onClick: () => onChange({ [side]: key }), children: [
        character.normal ? /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("img", { src: asset(character.normal), alt: "" }) : /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: "vn-none-character", "aria-hidden": "true", children: "\u2205" }),
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("strong", { children: character.name })
      ] }, key)) })
    ] }, side)) }),
    /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("fieldset", { children: [
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("legend", { children: "\u89D2\u8272\u8868\u8FBE" }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("label", { className: "vn-check", children: [
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("input", { type: "checkbox", disabled: !gameResources, checked: preferences.persona, onChange: (event) => onChange({ persona: event.target.checked }) }),
        "\u5355\u89D2\u8272\u6216\u4E24\u4FA7\u540C\u89D2\u8272\u65F6\uFF0C\u542F\u7528\u5BF9\u5E94\u4EBA\u7269 skill"
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("p", { className: "vn-explanation", children: "\u53EA\u6539\u53D8\u8868\u8FBE\u65B9\u5F0F\uFF0C\u6A21\u578B\u548C\u4EFB\u52A1\u5DE5\u5177\u4FDD\u6301\u539F\u6837\u3002\u6B63\u5728\u6267\u884C\u7684\u4EFB\u52A1\u7ED3\u675F\u540E\u518D\u66F4\u65B0\u89D2\u8272\u8868\u8FBE\u3002" })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("fieldset", { children: [
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("legend", { children: "\u6E38\u620F\u573A\u666F" }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "vn-scene-toolbar", children: [
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("input", { type: "search", "aria-label": "\u641C\u7D22\u6E38\u620F\u573A\u666F", placeholder: "\u641C\u7D22\u573A\u666F\u540D\u79F0\u6216\u539F\u6587\u4EF6\u540D", value: search, onChange: (e) => setSearch(e.target.value) }),
        /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("select", { "aria-label": "\u80CC\u666F\u5206\u7C7B", value: group, onChange: (e) => setGroup(e.target.value), children: [
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("option", { children: "\u573A\u666F" }),
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("option", { children: "\u5176\u4ED6\u80CC\u666F" }),
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("option", { children: "\u5168\u90E8" })
        ] })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("p", { className: "vn-explanation", children: [
        "\u5F53\u524D\uFF1A",
        sceneFor(preferences.scene).label,
        "\u3002\u5171 ",
        SCENES.length,
        " \u5F20\u6E38\u620F\u80CC\u666F\uFF0C\u663E\u793A ",
        scenes.length,
        " \u5F20\u3002"
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "vn-scene-grid", children: scenes.map((scene) => /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("button", { type: "button", className: "vn-scene-card", "aria-pressed": preferences.scene === scene.id, "aria-label": scene.label + " " + scene.source, onClick: () => onChange({ scene: scene.id }), children: [
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("img", { src: asset(scene.file), alt: "", loading: "lazy", decoding: "async" }),
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("strong", { children: scene.label }),
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("small", { children: scene.source.slice(3) })
      ] }, scene.id)) }),
      !scenes.length && /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("p", { className: "vn-explanation", children: "\u6CA1\u6709\u5339\u914D\u7684\u80CC\u666F\uFF0C\u53EF\u5C1D\u8BD5\u5207\u6362\u5206\u7C7B\u3002" })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("fieldset", { children: [
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("legend", { children: "\u52A8\u4F5C\u4E0E\u9605\u8BFB" }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("label", { className: "vn-check", children: [
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("input", { type: "checkbox", checked: preferences.motion, onChange: (e) => onChange({ motion: e.target.checked }) }),
        "\u8F7B\u5FAE\u547C\u5438\u4E0E\u8868\u60C5\u8FC7\u6E21"
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("label", { className: "vn-check", children: [
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("input", { type: "checkbox", checked: preferences.showPortrait, onChange: (e) => onChange({ showPortrait: e.target.checked }) }),
        "\u663E\u793A\u4EFB\u52A1\u72B6\u6001\u5934\u50CF"
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("label", { className: "vn-check", children: [
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("input", { type: "checkbox", checked: preferences.textShadow, onChange: (e) => onChange({ textShadow: e.target.checked }) }),
        "\u6587\u5B57\u9605\u8BFB\u63CF\u8FB9"
      ] })
    ] })
  ] });
}
function Modal({ panel, preferences, sessions, current, close, update, openSession, newSession }) {
  const ref = (0, import_react2.useRef)(null);
  (0, import_react2.useEffect)(() => {
    const previous = document.activeElement;
    const root = ref.current;
    if (!root) return;
    root.querySelector("button")?.focus({ preventScroll: true });
    const key = (e) => {
      if (e.isComposing) return;
      if (e.key === "Escape") {
        e.preventDefault();
        e.stopImmediatePropagation();
        close();
        return;
      }
      if (e.key === "Tab") {
        const nodes = [...root.querySelectorAll('button:not(:disabled),input:not(:disabled),select:not(:disabled),textarea:not(:disabled),[tabindex="0"]')].filter((el) => el.getClientRects().length);
        if (!nodes.length) return;
        const first = nodes[0], last = nodes[nodes.length - 1];
        if (e.shiftKey && (document.activeElement === first || !root.contains(document.activeElement))) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener("keydown", key, true);
    return () => {
      document.removeEventListener("keydown", key, true);
      if (previous instanceof HTMLElement && previous.isConnected) previous.focus({ preventScroll: true });
    };
  }, [panel]);
  const list = Object.values(sessions.byId ?? {}).filter((item) => item && typeof item.id === "string" || item && typeof item.sessionId === "string");
  return (0, import_react_dom.createPortal)(/* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "vn-modal-mask", "data-neko-modal": "", onPointerDown: (e) => {
    if (e.target === e.currentTarget) close();
  }, children: /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("section", { className: "vn-modal", role: "dialog", "aria-modal": "true", "aria-labelledby": "vn-modal-title", ref, children: [
    /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("header", { children: [
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("h2", { id: "vn-modal-title", children: panel === "sessions" ? "\u8BFB\u53D6\u4F1A\u8BDD" : "\u4EBA\u7269\u4E0E\u573A\u666F" }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("button", { type: "button", "aria-label": "\u5173\u95ED", className: "vn-close", onClick: close, children: "\xD7" })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "vn-modal-content", children: panel === "sessions" ? /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(import_jsx_runtime2.Fragment, { children: [
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("p", { className: "vn-explanation", children: "\u9009\u62E9\u4F1A\u8BDD\u7EE7\u7EED\u5DE5\u4F5C\u3002\u6B64\u5904\u6CBF\u7528\u539F\u751F\u5BF9\u8BDD\uFF0C\u4E0D\u56DE\u6EDA\u6587\u4EF6\u3002" }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "vn-saves", children: [
        /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("button", { type: "button", className: "vn-save-card vn-save-new", onClick: () => {
          newSession();
          close();
        }, children: [
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { children: "\uFF0B" }),
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("strong", { children: "\u65B0\u7684\u5BF9\u8BDD" }),
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("small", { children: "\u8FD4\u56DE\u4E3B\u754C\u9762" })
        ] }),
        list.map((item) => {
          const id = item.id ?? item.sessionId;
          return /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("button", { type: "button", className: "vn-save-card", "aria-current": id === current ? "true" : void 0, onClick: () => {
            openSession(id);
            close();
          }, children: [
            /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "vn-save-preview", style: { backgroundImage: `url('${asset(sceneFor(preferences.scene).file)}')` } }),
            /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("strong", { children: item.displayTitle || item.title || item.name || "\u672A\u547D\u540D\u5BF9\u8BDD" }),
            /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("small", { children: item.running ? "\u6B63\u5728\u8FD0\u884C" : "\u7EE7\u7EED\u5BF9\u8BDD" })
          ] }, id);
        })
      ] })
    ] }) : /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(Appearance, { preferences, onChange: update }) })
  ] }) }), document.body);
}
function NativeActions({ useUI, openPanel, toggleEnabled }) {
  const ui = useUI((s) => s);
  return /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "vn-native-actions", "data-neko-actions": "", children: [
    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(GameButton, { icon: "clock", label: "\u4F1A\u8BDD\u5B58\u6863", onClick: () => openPanel("sessions") }),
    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(GameButton, { icon: "paw", label: "\u4EBA\u7269\u4E0E\u573A\u666F", onClick: () => openPanel("characters") }),
    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(GameButton, { icon: "hide", label: ui.preferences.enabled ? "\u5207\u56DE\u539F\u754C\u9762" : "\u542F\u7528\u5BB6\u6709\u5927\u732B\u754C\u9762", onClick: toggleEnabled })
  ] });
}
function Stage({ useUI, useMood, useSessions, usePanelInfo, updatePreferences, openPanel, closePanel, toggleLeft, toggleRight, openSession, newSession }) {
  const ui = useUI((s) => s);
  const moodState = useMood((s) => s);
  const sessions = useSessions((s) => s);
  const current = currentSession(sessions);
  const preferences = ui.preferences;
  const mood = MOODS[moodState.mood] ?? MOODS.idle;
  const panel = usePanelInfo((state) => state.activePanelId);
  const sceneVisible = !["plugins", "schedules"].includes(panel);
  const role = roleForSelection(preferences.left, preferences.right, preferences.persona);
  const busy = ["thinking", "working", "speaking", "waiting", "approval"].includes(moodState.mood);
  const [binding, setBinding] = (0, import_react2.useState)("pending");
  const [musicMount, setMusicMount] = (0, import_react2.useState)(null);
  const selection = (0, import_react2.useRef)(null), remeasure = (0, import_react2.useRef)(() => {
  });
  selection.current = { left: preferences.left, right: preferences.right, expression: mood.expression, showPortrait: preferences.showPortrait };
  const stage = (0, import_react2.useRef)(null);
  const [mount, setMount] = (0, import_react2.useState)(null);
  const [room, setRoom] = (0, import_react2.useState)({ left: 0, top: 0, width: 0, height: 0, footer: 180, spriteHeight: 0, leftX: 40, rightX: 800, composerLeft: 40, composerRight: 40, composerTop: 640, leftOpen: false, rightOpen: false });
  (0, import_react2.useEffect)(() => {
    if (busy) return;
    const controller = new AbortController();
    setBinding("pending");
    fetch("/nekojishi-ui/persona", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ sessionId: current ?? null, left: preferences.left, right: preferences.right, enabled: preferences.persona }), signal: controller.signal }).then((response) => {
      if (!response.ok) throw Error("Role binding unavailable");
      return response.json();
    }).then(() => setBinding("ready")).catch((error) => {
      if (error.name !== "AbortError") setBinding("error");
    });
    return () => controller.abort();
  }, [current, preferences.left, preferences.right, preferences.persona, busy]);
  (0, import_react2.useEffect)(() => {
    remeasure.current();
  }, [preferences.left, preferences.right, preferences.showPortrait, preferences.persona, mood.expression, panel]);
  (0, import_react2.useEffect)(() => {
    const sidebar = document.querySelector("[data-neko-sidebar]");
    if (!sidebar) return;
    const anchor = document.createElement("div");
    anchor.dataset.nekoMusicMount = "";
    const place = () => {
      if (anchor.isConnected) return;
      const buttons = [...sidebar.querySelectorAll("button[aria-label]")].filter((button2) => /^(新建会话|新建对话|New session|New conversation|New chat)$/i.test(button2.getAttribute("aria-label")));
      const button = buttons.at(-1);
      if (button) {
        button.after(anchor);
        setMusicMount(anchor);
      }
    };
    place();
    const observer = new MutationObserver(place);
    observer.observe(sidebar, { childList: true, subtree: true });
    return () => {
      observer.disconnect();
      anchor.remove();
    };
  }, []);
  (0, import_react2.useLayoutEffect)(() => {
    const root = stage.current;
    const layer = root?.closest("[data-shell-overlay]");
    const frame = layer?.parentElement;
    if (!root || !frame) return;
    const center = frame.children[1];
    const sidebar = frame.children[0];
    if (!(center instanceof HTMLElement)) return;
    frame.dataset.nekoFrame = "";
    center.dataset.nekoCenter = "";
    setMount(center);
    if (sidebar instanceof HTMLElement) sidebar.dataset.nekoSidebar = "";
    let animation = 0, seat, disposed = false;
    const tagged = /* @__PURE__ */ new Set();
    const measure = () => {
      animation = 0;
      if (disposed) return;
      const rect = center.getBoundingClientRect();
      const frameRect = frame.getBoundingClientRect();
      const nextSeat = center.querySelector("[data-composer-seat]");
      if (nextSeat !== seat) {
        if (seat) observer.unobserve(seat);
        seat = nextSeat;
        if (seat) observer.observe(seat);
      }
      const footer = seat?.querySelector("[data-question-key]") ? 180 : seat?.getBoundingClientRect().height ?? 180;
      const card = center.querySelector("[data-composer-card]")?.getBoundingClientRect();
      const portrait = center.querySelector(".vn-status");
      const g = geometry(rect.width, card ? { left: card.left - rect.left, width: card.width, top: card.top - rect.top } : { top: rect.height - footer }, { ...selection.current, height: rect.height, portraitWidth: portrait?.offsetWidth ?? 150 });
      const next = { left: rect.left - frameRect.left, top: rect.top - frameRect.top, width: rect.width, height: rect.height, footer, spriteHeight: g.character, leftX: g.leftX, rightX: g.rightX, composerLeft: g.composerLeft, composerRight: g.composerRight, composerTop: g.composerTop, leftOpen: !frame.hasAttribute("data-sidebar-collapsed"), rightOpen: !frame.hasAttribute("data-rightbar-collapsed") };
      setRoom((old) => Object.keys(next).every((k) => old[k] === next[k]) ? old : next);
      center.style.setProperty("--vn-safe-side", `${g.safe}px`);
      center.style.setProperty("--vn-flow-width", `${Math.max(240, g.flowWidth)}px`);
      center.style.setProperty("--vn-flow-offset", `${g.flowOffset}px`);
      const nativeColumn = center.querySelector("[data-conversation-content]");
      if (nativeColumn) {
        nativeColumn.dataset.nekoContent = "";
        tagged.add(nativeColumn);
      }
    };
    const schedule = () => {
      if (!animation) animation = requestAnimationFrame(measure);
    };
    remeasure.current = schedule;
    const observer = new ResizeObserver(schedule);
    observer.observe(center);
    const attributes = new MutationObserver(schedule);
    attributes.observe(frame, { attributes: true, attributeFilter: ["data-sidebar-collapsed", "data-rightbar-collapsed", "data-rightbar-fullscreen", "style"] });
    const children = new MutationObserver((records) => {
      if (records.some((record) => [...record.addedNodes].some((node) => node instanceof Element && (node.matches("[data-composer-seat],[data-conversation-content]") || node.querySelector("[data-composer-seat],[data-conversation-content]"))) || [...record.removedNodes].some((node) => node === seat || node instanceof Element && seat && node.contains(seat)))) schedule();
    });
    children.observe(center, { childList: true, subtree: true });
    measure();
    if (!frame.hasAttribute("data-sidebar-collapsed")) toggleLeft();
    return () => {
      disposed = true;
      remeasure.current = () => {
      };
      cancelAnimationFrame(animation);
      observer.disconnect();
      attributes.disconnect();
      children.disconnect();
      delete frame.dataset.nekoFrame;
      delete center.dataset.nekoCenter;
      for (const property of ["--vn-safe-side", "--vn-flow-width", "--vn-flow-offset"]) center.style.removeProperty(property);
      if (sidebar instanceof HTMLElement) delete sidebar.dataset.nekoSidebar;
      for (const node of tagged) delete node.dataset.nekoContent;
    };
  }, []);
  (0, import_react2.useEffect)(() => {
    const html = document.documentElement;
    const oldScene = html.style.getPropertyValue("--vn-scene");
    const old = { enabled: html.getAttribute("data-neko-enabled"), scene: html.getAttribute("data-neko-scene"), motion: html.getAttribute("data-neko-motion"), shadow: html.getAttribute("data-neko-shadow") };
    html.setAttribute("data-neko-enabled", String(preferences.enabled));
    html.setAttribute("data-neko-scene", preferences.scene);
    html.setAttribute("data-neko-motion", String(preferences.motion));
    html.setAttribute("data-neko-shadow", String(preferences.textShadow));
    html.style.setProperty("--vn-scene", `url("${asset(sceneFor(preferences.scene).file)}")`);
    return () => {
      if (oldScene) html.style.setProperty("--vn-scene", oldScene);
      else html.style.removeProperty("--vn-scene");
      for (const [key, value] of Object.entries(old)) {
        const name = "data-neko-" + key;
        if (value === null) html.removeAttribute(name);
        else html.setAttribute(name, value);
      }
    };
  }, [preferences.enabled, preferences.scene, preferences.motion, preferences.textShadow]);
  const left = CHARACTERS[preferences.left], right = CHARACTERS[preferences.right];
  const portraitRole = preferences.right !== "none" ? preferences.right : preferences.left;
  const portraitCharacter = CHARACTERS[portraitRole];
  return /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "vn-shell", ref: stage, "data-neko-shell": "", "data-mood": moodState.mood, "data-enabled": preferences.enabled, "data-persona-status": binding, "data-role": role ?? "none", children: [
    musicMount && (0, import_react_dom.createPortal)(/* @__PURE__ */ (0, import_jsx_runtime2.jsx)(MusicPlayer, {}), musicMount),
    preferences.enabled && /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(import_jsx_runtime2.Fragment, { children: [
      mount && (0, import_react_dom.createPortal)(/* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "vn-stage", "data-neko-stage": "", "data-mood": moodState.mood, "data-scene-visible": sceneVisible, "data-compact": room.width < 620, style: { "--vn-footer": `${room.footer}px`, "--vn-sprite-height": `${room.spriteHeight}px`, "--vn-left-x": `${room.leftX}px`, "--vn-right-x": `${room.rightX}px`, "--vn-composer-left": `${room.composerLeft}px`, "--vn-composer-right": `${room.composerRight}px`, "--vn-composer-bottom": `${Math.max(0, room.height - room.composerTop)}px` }, children: [
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "vn-vignette" }),
        sceneVisible && preferences.left !== "none" && /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("img", { className: "vn-character vn-character-left", "data-neko-character": "left", src: asset(left[mood.expression]), alt: left.name, draggable: "false" }),
        sceneVisible && preferences.right !== "none" && /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("img", { className: "vn-character vn-character-right", "data-neko-character": "right", src: asset(right[mood.expression]), alt: right.name, draggable: "false" }),
        sceneVisible && preferences.showPortrait && portraitRole !== "none" && /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "vn-status", role: "status", "aria-live": "polite", children: [
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("img", { src: asset(`${portraitRole}-portrait-${mood.portrait}.png`), alt: "" }),
          /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("span", { children: [
            /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("strong", { children: portraitCharacter.name }),
            /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("small", { children: mood.label }),
            role && /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("small", { className: "vn-role-label", children: [
              "\u89D2\u8272\u8868\u8FBE \xB7 ",
              CHARACTERS[role].name
            ] })
          ] })
        ] }),
        sceneVisible && !current && /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "vn-main-title", children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("img", { src: asset("logo.png"), alt: "\u5BB6\u6709\u5927\u732B" }) })
      ] }), mount),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "vn-side-toggle vn-side-toggle-left", children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(GameButton, { icon: "clock", label: room.leftOpen ? "\u6536\u8D77\u5BF9\u8BDD\u4E0E\u8D26\u6237\u680F" : "\u6253\u5F00\u5BF9\u8BDD\u4E0E\u8D26\u6237\u680F", "aria-expanded": room.leftOpen, onClick: toggleLeft }) }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "vn-side-toggle vn-side-toggle-right", children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(GameButton, { icon: "paper", label: room.rightOpen ? "\u6536\u8D77\u8D44\u6E90\u680F" : "\u6253\u5F00\u8D44\u6E90\u680F", "aria-expanded": room.rightOpen, onClick: toggleRight, disabled: !current }) })
    ] }),
    ui.notice && /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "vn-notice", role: "alert", children: ui.notice }),
    ui.panel && /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(Modal, { panel: ui.panel, preferences, sessions, current, close: closePanel, update: updatePreferences, openSession, newSession })
  ] });
}
async function apply(ctx) {
  const ready = await fetch("/nekojishi-assets/manifest.json").then((response) => response.ok).catch(() => false);
  if (!ready) {
    console.warn("Nekojishi resources are not imported; leaving the native interface unchanged.");
    return;
  }
  const ui = makeUI(), mood = makeMood(ctx);
  ctx.effect(() => () => mood.dispose(), "nekojishi: state");
  ctx.effect(() => {
    let dispose = () => {
    }, enabled;
    const sync = () => {
      const next = ui.getSnapshot().preferences.enabled;
      if (enabled === next) return;
      enabled = next;
      dispose();
      dispose = () => {
      };
      if (next) {
        const values = {
          "--dsw-alias-bg-base": "transparent",
          "--dsw-specific-sidebar-fill": "transparent",
          "--dsw-alias-bg-layer-1": "#1b2330df",
          "--dsw-alias-bg-layer-2": "#202837ef",
          "--dsw-alias-bg-module-platform": "#18212cdd",
          "--dsw-alias-button-elevated-fill": "#273446df",
          "--dsw-alias-button-floating-fill": "#273446df",
          "--dsw-alias-button-floating-hover": "#34475cf0",
          "--dsw-alias-label-primary": "#f4f2ed",
          "--dsw-alias-label-primary-dimmed": "#e7e3db",
          "--dsw-alias-label-secondary": "#d8d4cc",
          "--dsw-alias-label-tertiary": "#c3beb4",
          "--dsw-alias-label-caption": "#b8b3aa",
          "--dsw-alias-menu-icon": "#e4dfd5",
          "--dsw-specific-bubble": "#10151d66",
          "--dsw-specific-menu": "#20252ff5",
          "--dsw-menu-surface-fill": "#20252ff5",
          "--dsw-alias-menu-group-header-fill": "#252a35f5",
          "--dsw-specific-sidebar-nav-item-active": "#ffffff14",
          "--dsw-specific-sidebar-nav-item-hover": "#ffffff0c",
          "--dsw-alias-markdown-code-block": "#171c25ed",
          "--dsw-alias-markdown-code-block-banner": "#252a33ed"
        };
        dispose = ctx.theme.overrideTokens(ID, Object.fromEntries(Object.entries(values).map(([k, v]) => [k, { light: v, dark: v }])));
      }
    };
    const off = ui.subscribe(sync);
    sync();
    return () => {
      off();
      dispose();
    };
  }, "nekojishi: reversible theme tokens");
  ctx.effect(() => {
    const style = document.createElement("style");
    style.dataset.plugin = ID;
    style.textContent = `/* Scope all skin rules. No hashed class names, DOM relocation or token polling. */
html[data-neko-enabled="true"] {--vn-scene:url('/nekojishi-assets/room-night.png');--vn-ink:#f4f2ed;--vn-muted:#d0cbc2;--vn-gold:#ffa222;--vn-shadow:0 1px 3px #000,0 0 5px #000a;color-scheme:dark}
html[data-neko-enabled="true"][data-neko-scene="day"] {--vn-scene:url('/nekojishi-assets/room-day.png')}
html[data-neko-enabled="true"] body {background:#16171b var(--vn-scene) center/cover fixed!important}
html[data-neko-enabled="true"] #root {background:transparent!important}
html[data-neko-enabled="true"] [data-neko-frame] {background:transparent!important}
html[data-neko-enabled="true"] [data-neko-frame]::before {background:rgba(14,16,21,.28)!important}
html[data-neko-enabled="true"] [data-neko-center] {position:relative;isolation:isolate;background:transparent!important;border-radius:0!important}
html[data-neko-enabled="true"] [data-neko-center] > [data-slot="main"] {position:relative;z-index:1;flex:1;min-height:0}
html[data-neko-enabled="true"] [data-neko-center] [data-phase] {background:transparent!important}
html[data-neko-enabled="true"] [data-neko-sidebar] {background:transparent!important;border-color:transparent!important}
html[data-neko-enabled="true"] [data-neko-sidebar] > [data-slot="sidebar"],
html[data-neko-enabled="true"] [data-slot="rightbar"],
html[data-neko-enabled="true"] [data-slot="rightbar.session"] {background:transparent!important}
html[data-neko-enabled="true"] [data-neko-frame][data-sidebar-collapsed] [data-neko-sidebar] {visibility:hidden;pointer-events:none}
html[data-neko-enabled="true"] [data-neko-frame][data-sidebar-collapsed] [data-neko-sidebar] * {visibility:hidden!important;pointer-events:none!important}
html[data-neko-enabled="true"] [data-slot="conversation.session.header.corner"] {visibility:hidden;pointer-events:none}
/* The native rail still owns its geometry. Only the two explicit openers remain painted. */
html[data-neko-enabled="true"] [data-neko-content] {
 --dsh-chat-content-width:min(var(--dsh-chat-user-width,var(--vn-flow-width,640px)),var(--vn-flow-width,640px))!important;
 --dsh-composer-card-max-width:min(1480px,calc(100% - 80px))!important;
 --dsh-composer-side-clearance:20px!important;
 position:relative;z-index:1;min-height:0;min-width:0;background:transparent!important;
}
html[data-neko-enabled="true"] [data-conversation-scroll] {background:transparent!important;scrollbar-color:#ded7ca88 transparent}
html[data-neko-enabled="true"] [data-composer-seat] {background:transparent!important;padding-bottom:0;isolation:isolate}
html[data-neko-enabled="true"] [data-phase="hero"] [data-conversation-scroll] {justify-content:flex-end!important}
html[data-neko-enabled="true"] [data-phase="hero"] [data-composer-seat] {margin-top:auto;padding-bottom:0}
html[data-neko-enabled="true"] [data-phase="hero"] [data-slot="conversation.hero.brand.mark"] {display:none}
html[data-neko-enabled="true"] [data-composer-seat] div:has(> div > div > span > [data-slot="conversation.hero.brand.mark"]) {display:none}
html[data-neko-enabled="true"] [data-composer-card] {
 position:relative;isolation:isolate;border:0!important;border-image:none!important;
 background:transparent!important;border-radius:10px!important;box-shadow:none!important;backdrop-filter:none!important;
 color:var(--vn-ink);padding:20px 24px!important;min-height:126px;
}
html[data-neko-enabled="true"] [data-composer-card]::before {content:"";position:absolute;inset:0;z-index:-1;border:12px solid transparent;border-image:url('/nekojishi-assets/dialogue.png') 12 fill stretch;opacity:.75;pointer-events:none}
html[data-neko-enabled="true"] [data-composer-card] [contenteditable] {color:var(--vn-ink)!important;caret-color:var(--vn-gold);font-size:var(--dsh-content-font-size,16px);line-height:1.65}
html[data-neko-enabled="true"] [data-input-scroll] {max-height:min(30vh,320px)!important}
html[data-neko-enabled="true"] [data-chat-flow] {position:relative;left:var(--vn-flow-offset,0px);color:var(--vn-ink);font-size:var(--dsh-content-font-size,16px);line-height:1.8}
html[data-neko-enabled="true"][data-neko-shadow="true"] [data-chat-flow] :is(p,li,h1,h2,h3,h4,blockquote),
html[data-neko-enabled="true"][data-neko-shadow="true"] [data-neko-sidebar] :is(span,p,a),
html[data-neko-enabled="true"][data-neko-shadow="true"] [data-slot="rightbar"] :is(span,p,a) {text-shadow:var(--vn-shadow)}
html[data-neko-enabled="true"] [data-chat-flow] :is(p,li,h1,h2,h3,h4,blockquote) {color:var(--vn-ink)}
html[data-neko-enabled="true"] [data-chat-flow] pre {text-shadow:none;max-width:100%;overflow-x:auto;background:rgba(17,20,27,.88)!important}
html[data-neko-enabled="true"] [data-chat-flow] table {text-shadow:none;background:rgba(17,20,27,.72)}
html[data-neko-enabled="true"] [data-chat-flow] img {max-width:100%;height:auto}
html[data-neko-enabled="true"] [data-chat-flow] a {color:#ffd18a}
html[data-neko-enabled="true"] [data-slot="conversation.header"] {color:var(--vn-ink);background:transparent}
/* Preserve capsule buttons. Transparency affects surfaces, never their controls. */
html[data-neko-enabled="true"] :is([role="dialog"],[aria-modal="true"]) {background-image:linear-gradient(#10131cbb,#10131cdd),var(--vn-scene)!important;background-position:center!important;background-size:cover!important;color:var(--vn-ink)}
html[data-neko-enabled="true"] :is([role="dialog"],[aria-modal="true"]) :is(h1,h2,h3,legend,label) {color:var(--vn-ink)}
html[data-neko-enabled="true"] [data-conversation-composer-overlay] {background:transparent!important}
/* Blur only the native resource panel's full-screen backdrop, never its content. */
html[data-neko-enabled="true"] [data-sidebar-right-panel="fullscreen"][data-sidebar-right-open]::before {content:"";position:fixed;inset:0;z-index:39;background:rgba(15,20,29,.88);backdrop-filter:blur(24px) saturate(.55);-webkit-backdrop-filter:blur(24px) saturate(.55);pointer-events:auto}
/* The actual question component and its answer/timeout logic remain native. */
html[data-neko-enabled="true"] [data-question-key] {width:min(900px,90%);margin:0 auto 24px;color:var(--vn-ink)}
html[data-neko-enabled="true"] [data-question-key] > section {background:linear-gradient(#10131cce,#10131cee),var(--vn-scene) center/cover!important;border:1px solid #ffffff55;border-radius:2px;box-shadow:0 10px 40px #0007;max-width:none;width:100%;max-height:min(72dvh,700px)}
html[data-neko-enabled="true"] [data-question-key] h2 {color:#ffd294;font-size:18px;line-height:1.7;text-shadow:var(--vn-shadow)}
html[data-neko-enabled="true"] [data-question-key] [data-question-scroll] {max-height:min(48dvh,460px);padding:18px 24px}
html[data-neko-enabled="true"] [data-question-key] :is([role="radiogroup"],[role="group"]) {display:flex;flex-direction:column;gap:12px}
html[data-neko-enabled="true"] [data-question-key] button:is([role="radio"],[role="checkbox"]) {border:solid transparent;border-width:9px 28px;border-image:url('/nekojishi-assets/choice.png') 9 28 fill stretch;background:transparent;color:#f6f4ee;border-radius:0;min-height:54px;justify-content:center;text-align:center;text-shadow:var(--vn-shadow);transition:filter 120ms}
html[data-neko-enabled="true"] [data-question-key] button:is([role="radio"],[role="checkbox"]):is(:hover,[aria-checked="true"]) {border-image-source:url('/nekojishi-assets/choice-hover.png');color:#ffd294}
html[data-neko-enabled="true"] [data-question-key] footer {background:transparent}

.vn-shell {pointer-events:none!important;position:absolute;inset:0;font-family:"Microsoft YaHei",sans-serif}
.vn-stage {position:absolute;inset:0;z-index:0;overflow:hidden;pointer-events:none;contain:paint}
.vn-vignette {position:absolute;inset:0;background:linear-gradient(90deg,#090b1033,transparent 26%,transparent 74%,#090b1033),linear-gradient(0deg,#07090f44,transparent 35%);pointer-events:none}
.vn-character {position:absolute;bottom:0;width:auto;height:var(--vn-sprite-height,0px);max-width:none;object-fit:contain;object-position:center bottom;filter:drop-shadow(0 5px 12px #0005);user-select:none;-webkit-user-drag:none;transform-origin:50% 100%;will-change:auto;transition:opacity 180ms ease}
.vn-character-left {left:var(--vn-left-x,40px)}
.vn-character-right {left:var(--vn-right-x,800px)}
html[data-neko-motion="true"] .vn-character {animation:vn-breath 7s ease-in-out infinite}
.vn-stage[data-compact="true"] .vn-character {opacity:.68}
@keyframes vn-breath {0%,100%{transform:scaleY(1)}50%{transform:scaleY(1.008)}}
.vn-status {position:absolute;z-index:3;left:var(--vn-composer-left,40px);bottom:calc(var(--vn-composer-bottom,180px) + 28px);display:flex;align-items:center;gap:8px;color:#fff;text-shadow:var(--vn-shadow);max-width:220px;height:72px}
.vn-status img {width:62px;height:62px;object-fit:contain;filter:drop-shadow(0 1px 2px #0009)}
.vn-status strong {display:block;font-weight:500;font-size:16px;color:#ffa222}
.vn-status small {display:block;font-size:12px;line-height:1.7;color:#e5e0d8}
.vn-main-title {position:absolute;left:50%;top:12%;width:min(340px,45%);transform:translateX(-50%)}
.vn-main-title img {width:100%;filter:drop-shadow(0 4px 14px #0009)}
.vn-side-toggle {position:absolute;bottom:31px;pointer-events:auto;z-index:30}
.vn-side-toggle-left {left:12px;bottom:39px}.vn-side-toggle-right {right:12px}
.vn-game-button {width:34px;height:34px;display:inline-grid;place-items:center;padding:4px;border:0;background:transparent;cursor:pointer;color:#fff;border-radius:0;vertical-align:middle;transition:filter 120ms,transform 120ms}
.vn-game-button img {width:100%;height:100%;object-fit:contain;filter:drop-shadow(0 1px 2px #0009)}
.vn-game-button:hover:not(:disabled) {filter:brightness(1.6);transform:translateY(-1px)}
.vn-game-button:focus-visible {outline:2px solid #ffc36c;outline-offset:2px}
.vn-game-button:disabled {opacity:.35;cursor:not-allowed}
.vn-native-actions {display:inline-flex;align-items:center;gap:2px;flex:none}
.vn-native-actions .vn-game-button {width:26px;height:26px;padding:3px}
.vn-sr {position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border:0}
.vn-modal-mask {position:fixed;inset:0;z-index:10000;background:rgba(0,0,0,.45);display:flex;align-items:center;justify-content:center;padding:clamp(12px,3vw,40px);pointer-events:auto;font-family:"Microsoft YaHei",sans-serif}
.vn-modal {box-sizing:border-box;width:min(1080px,100%);max-height:calc(100dvh - 64px);display:flex;flex-direction:column;color:#f4f2ed;border:1px solid #a6aaa877;border-radius:2px;background:linear-gradient(#151923bb,#151923db),var(--vn-scene,url('/nekojishi-assets/room-night.png')) center/cover;box-shadow:0 15px 65px #0007;overflow:hidden}
.vn-modal header {display:flex;align-items:center;justify-content:space-between;gap:16px;padding:20px 28px;border-bottom:1px solid #fff3;flex:none}
.vn-modal h2 {font-size:23px;font-weight:400;letter-spacing:3px;margin:0;color:#ffa222}
.vn-close {font-size:28px;line-height:1;width:36px;height:36px;border:0;border-radius:4px;background:transparent;color:#fff;cursor:pointer}
.vn-close:hover {background:#ffffff14}
.vn-modal-content {padding:20px 28px 28px;min-height:0;overflow-y:auto;overscroll-behavior:contain}
.vn-explanation {margin:0 0 20px;font-size:13px;color:#d7d4cc;line-height:1.8}
.vn-character-selects {display:grid;grid-template-columns:1fr 1fr;gap:24px}
.vn-modal fieldset {border:1px solid #ffffff2b;padding:14px;margin:0 0 20px;min-width:0}
.vn-modal legend {padding:0 8px;font-size:15px;color:#ffd294}
.vn-character-cards {display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:8px}
.vn-character-card {position:relative;display:flex;flex-direction:column;align-items:center;min-width:0;height:210px;padding:8px;border:1px solid transparent;background:#0001;color:#e9e6df;cursor:pointer}
.vn-character-card img {width:100%;height:165px;min-height:0;object-fit:contain;object-position:center top}
.vn-character-card strong {font-weight:400;font-size:14px;padding:8px}
.vn-none-character {height:165px;display:grid;place-items:center;font-size:42px;color:#bbb}
.vn-role-label {color:#ffd294!important;font-size:10px!important}
[data-neko-music-mount] {flex:none;min-width:0;width:100%;box-sizing:border-box}
.vn-music {pointer-events:auto;padding:10px;margin:7px 0 9px;border:1px solid #ffffff26;border-radius:10px;background:#101823bb;box-sizing:border-box;color:#eee;font:12px/1.5 "Microsoft YaHei",sans-serif;min-width:0;max-width:100%}
.vn-music button {border:0;background:transparent;color:inherit;cursor:pointer;border-radius:5px;padding:3px 7px;min-width:24px;line-height:1.5}
.vn-music button:hover,.vn-music button[aria-pressed="true"] {background:#ffffff18;color:#ffc571}
.vn-music button:focus-visible {outline:2px solid #ffc571}
.vn-music-heading {display:flex;align-items:center;gap:9px;margin-bottom:6px;min-width:0}
.vn-music-heading>span {font-size:26px;color:#ffc571}
.vn-music-heading>div {flex:1;min-width:0}
.vn-music-heading strong {display:block;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;font-size:12px;font-weight:500}
.vn-music-heading small {display:block;color:#c7bfb2;font-size:10px}
.vn-music input[type="range"] {display:block;width:100%;height:12px;accent-color:#e7ab52;cursor:pointer;margin:0}
.vn-music-time {display:flex;justify-content:space-between;color:#bfb9af;font-size:10px}
.vn-music-controls {display:flex;justify-content:space-between;align-items:center;gap:3px;margin:2px 0 7px}
.vn-music-controls button:nth-child(2) {border:1px solid #ffcc7977;border-radius:50%;width:31px;height:31px;padding:0;display:grid;place-items:center}
.vn-music-volume {display:flex;align-items:center;gap:6px;font-size:10px;color:#c7bfb2}
.vn-music-volume input {flex:1;min-width:0}
.vn-music-volume>span:last-child {width:30px;text-align:right}
.vn-music-library {margin-top:10px;border-top:1px solid #ffffff26;padding-top:9px}
.vn-music-library select {box-sizing:border-box;width:100%;min-width:0;padding:5px 4px;color:#eee;background:#172332;border:1px solid #ffffff35;border-radius:4px;font-size:11px}
.vn-music-tracks {max-height:150px;overflow-y:auto;overscroll-behavior:contain;margin-top:6px}
.vn-music-tracks button {display:block;width:100%;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;text-align:left;font-size:11px;padding:4px 6px}
.vn-music-tracks button[aria-current] {color:#ffd294;background:#ffffff0e}
.vn-music-notice {font-size:10px;line-height:1.6;color:#d7cab6;margin:7px 0 0}
.vn-character-card:hover,.vn-character-card[aria-pressed="true"] {border-color:#ffb746;background:#ffb74618}
.vn-choice-row {display:flex;gap:10px;margin-bottom:15px}
.vn-choice-row button {padding:8px 25px;border:1px solid #fff4;background:#0002;color:#fff;cursor:pointer}
.vn-choice-row button[aria-pressed="true"] {border-color:#ffb746;color:#ffd294}
.vn-scene-toolbar {display:flex;gap:12px;margin-bottom:12px}
.vn-scene-toolbar :is(input,select) {background:#121a26c9;color:#f4f2ed;border:1px solid #fff5;border-radius:5px;padding:9px 12px;min-width:0}
.vn-scene-toolbar input {flex:1}
.vn-scene-grid {display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:12px;max-height:430px;overflow-y:auto;overscroll-behavior:contain;padding:3px}
.vn-scene-card {display:flex;flex-direction:column;align-items:stretch;padding:6px;gap:6px;min-width:0;border:1px solid #fff3;background:#121a26aa;color:#f4f2ed;text-align:left;cursor:pointer}
.vn-scene-card:is(:hover,[aria-pressed="true"]) {border-color:#ffb746;background:#ffb74618}
.vn-scene-card img {width:100%;aspect-ratio:4/3;object-fit:cover;background:#111;contain:paint}
.vn-scene-card strong {font-weight:400;font-size:13px}
.vn-scene-card small {font-size:10px;line-height:1.5;overflow-wrap:anywhere;color:#c3bfb6}
.vn-scene-card:focus-visible {outline:2px solid #ffc36c;outline-offset:1px}
.vn-check {display:flex;align-items:center;gap:9px;margin:13px 0;font-size:14px;color:#e9e6df}
.vn-check input {accent-color:#ffa222}
.vn-saves {display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:18px}
.vn-save-card {position:relative;display:flex;flex-direction:column;gap:9px;text-align:left;border:1px solid #b2b6b35c;background:#10182255;min-height:190px;padding:12px;color:#e8e6dd;cursor:pointer;overflow:hidden}
.vn-save-card:hover,.vn-save-card[aria-current] {border-color:#ffb746;background:#ffb74610}
.vn-save-preview {height:130px;background-size:cover;background-position:center;border:1px solid #fff3}
.vn-save-card strong {font-size:14px;font-weight:400;line-height:1.5;overflow:hidden;white-space:nowrap;text-overflow:ellipsis}
.vn-save-card small {font-size:11px;color:#bbb9b1}
.vn-save-new {justify-content:center;align-items:center}
.vn-save-new>span {font-size:36px;color:#ffb746}
.vn-notice {position:absolute;bottom:90px;left:50%;transform:translateX(-50%);color:#fff;background:#171b26ed;padding:12px 20px;border:1px solid #ffffff3d;pointer-events:auto}
@media(max-width:750px){.vn-character-selects{grid-template-columns:1fr}.vn-saves,.vn-scene-grid{grid-template-columns:repeat(2,minmax(0,1fr))}.vn-modal header{padding:15px}.vn-modal-content{padding:15px}.vn-status small{font-size:11px}.vn-native-actions .vn-game-button{width:23px;height:23px}}
@media(prefers-reduced-motion:reduce){.vn-character{animation:none!important}.vn-game-button{transition:none}.vn-character{transition:none}}
`;
    document.head.appendChild(style);
    return () => style.remove();
  }, "nekojishi: styles");
  const common = () => ({ hooks: { uI: ui }, openPanel: ui.panel, toggleEnabled: () => ui.preferences({ enabled: !ui.getSnapshot().preferences.enabled }) });
  ctx.slots.inject("shell.overlay", () => ctx.slots.register({ name: "shell.overlay", id: "nekojishi-stage", order: 10, inject: () => ({
    hooks: { uI: ui, mood },
    updatePreferences: ui.preferences,
    openPanel: ui.panel,
    closePanel: () => ui.panel(null),
    toggleLeft: () => ctx.layout.toggleSidebar(),
    toggleRight: () => {
      try {
        ctx.sidebarRight.toggleExpanded();
      } catch (error) {
        ui.notice("\u8BF7\u5148\u9009\u62E9\u5DE5\u4F5C\u533A\u6216\u6253\u5F00\u4E00\u4E2A\u5BF9\u8BDD\u3002");
        console.warn("Resource sidebar is not ready", error);
      }
    },
    openSession: (id) => ctx.uiWorkspace.openSession(id),
    newSession: () => ctx.uiWorkspace.startSession()
  }) }, Stage));
  ctx.slots.inject("conversation.input.right", () => ctx.slots.register({ name: "conversation.input.right", id: "nekojishi-controls", order: 100, inject: common }, NativeActions));
}
return module.exports;}});
//# sourceMappingURL=client.js.map
