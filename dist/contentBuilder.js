"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const isFunction = value => value ? Object.prototype.toString.call(value) === "[object Function]" || "function" === typeof value || value instanceof Function : false;

// eslint-disable-next-line no-unused-vars
const buildContent = _ref => {
  let {
    contentLeft,
    contentCenter,
    contentRight,
    iconDropOpen,
    iconDropClose,
    isOpenDrop,
    id,
    tag
  } = _ref;
  if (isFunction(contentLeft)) {
    contentLeft = contentLeft();
  }
  if (isFunction(contentCenter)) {
    contentCenter = contentCenter();
  }
  if (isFunction(contentRight)) {
    contentRight = contentRight();
  }
  if (isFunction(iconDropOpen)) {
    iconDropOpen = iconDropOpen();
  }
  if (isFunction(iconDropClose)) {
    iconDropClose = iconDropClose();
  }
  if (iconDropClose && iconDropOpen) {
    if (isOpenDrop === true) {
      contentRight = iconDropOpen;
    } else if (isOpenDrop === false) {
      contentRight = iconDropClose;
    }
  }
  if (!contentLeft && contentCenter && !contentRight) {
    return /*#__PURE__*/_react.default.createElement("div", {
      className: "container"
    }, /*#__PURE__*/_react.default.createElement("div", {
      className: "vertical-center"
    }, /*#__PURE__*/_react.default.createElement("div", {
      className: "content-123-center-100"
    }, contentCenter)));
  }
  if (contentLeft && contentCenter && !contentRight) {
    return /*#__PURE__*/_react.default.createElement("div", {
      className: "box"
    }, /*#__PURE__*/_react.default.createElement("div", {
      className: "content-123-left-10"
    }, contentLeft), /*#__PURE__*/_react.default.createElement("div", {
      className: "content-123-center-90 t-over"
    }, contentCenter));
  }
  if (contentLeft && contentCenter && contentRight) {
    return /*#__PURE__*/_react.default.createElement("div", {
      className: "box"
    }, /*#__PURE__*/_react.default.createElement("div", {
      className: "content-123-left-10"
    }, contentLeft), /*#__PURE__*/_react.default.createElement("div", {
      className: "content-123-center-80 t-over"
    }, contentCenter), /*#__PURE__*/_react.default.createElement("div", {
      className: "content-123-right-10"
    }, contentRight));
  }
  if (!contentLeft && contentCenter && contentRight) {
    return /*#__PURE__*/_react.default.createElement("div", {
      className: "box"
    }, /*#__PURE__*/_react.default.createElement("div", {
      className: "  content-123-center-90 t-over"
    }, contentCenter), /*#__PURE__*/_react.default.createElement("div", {
      className: "content-123-right-10"
    }, contentRight));
  }
  if (contentLeft && !contentCenter && !contentRight) {
    return /*#__PURE__*/_react.default.createElement("div", {
      className: "container"
    }, /*#__PURE__*/_react.default.createElement("div", {
      className: "center-icon"
    }, /*#__PURE__*/_react.default.createElement("div", {
      className: "content-123-left-100"
    }, contentLeft)));
  }
  if (!contentLeft && !contentCenter && contentRight) {
    return /*#__PURE__*/_react.default.createElement("div", {
      className: "container"
    }, /*#__PURE__*/_react.default.createElement("div", {
      className: "center-icon"
    }, /*#__PURE__*/_react.default.createElement("div", {
      className: "content-123-right-100"
    }, contentRight)));
  }
};
var _default = exports.default = buildContent;