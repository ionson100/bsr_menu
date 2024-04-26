"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
require("./menu.css");
var _react = _interopRequireDefault(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const buildContent = _ref => {
  let {
    content,
    icon,
    iconOpen,
    iconClose,
    positionImage: positionIcon,
    isOpenPanel
  } = _ref;
  if (iconOpen && iconClose) {
    if (isOpenPanel === true) {
      icon = iconOpen;
    } else {
      icon = iconClose;
    }
  }
  if (content && !icon) {
    return /*#__PURE__*/_react.default.createElement("div", {
      className: "container"
    }, /*#__PURE__*/_react.default.createElement("div", {
      className: "vertical-center"
    }, /*#__PURE__*/_react.default.createElement("div", {
      className: "content-123-text-center"
    }, content)));
  }
  if (!content && icon) {
    return /*#__PURE__*/_react.default.createElement("div", {
      className: "container"
    }, /*#__PURE__*/_react.default.createElement("div", {
      className: "center-icon"
    }, icon));
  }
  if (content && icon && positionIcon === 'left') {
    return /*#__PURE__*/_react.default.createElement("div", {
      className: "container"
    }, /*#__PURE__*/_react.default.createElement("div", {
      className: "vertical-center"
    }, /*#__PURE__*/_react.default.createElement("div", {
      className: "content-123-icon-left"
    }, icon), /*#__PURE__*/_react.default.createElement("div", {
      className: "content-123-text-right"
    }, content)));
  }
  if (content && icon && positionIcon === 'right') {
    return /*#__PURE__*/_react.default.createElement("div", {
      className: "container"
    }, /*#__PURE__*/_react.default.createElement("div", {
      className: "vertical-center"
    }, /*#__PURE__*/_react.default.createElement("div", {
      className: "content-123-text-left"
    }, content), /*#__PURE__*/_react.default.createElement("div", {
      className: "content-123-icon-right"
    }, icon)));
  }
};
buildContent.propTypes = {
  content: _propTypes.default.object,
  icon: _propTypes.default.element,
  iconOpen: _propTypes.default.element,
  iconClose: _propTypes.default.element,
  positionImage: _propTypes.default.oneOf(['left', 'right']),
  isOpenPanel: _propTypes.default.bool
};
var _default = exports.default = buildContent;