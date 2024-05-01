"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MapMenu = void 0;
const MapMenu = exports.MapMenu = new Map();
window.addEventListener('resize', function () {
  MapMenu.forEach((value, key) => {
    if (value) {
      value._resizeWindows(key);
    }
  });
}, true);