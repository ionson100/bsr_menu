"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MenuVerticalBand = exports.MenuItem = exports.MenuHorizontalBand = void 0;
require("./menu.css");
var _react = _interopRequireWildcard(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _reactStyleProptype = _interopRequireDefault(require("react-style-proptype"));
var _contentBuilder = _interopRequireDefault(require("./contentBuilder"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
// eslint-disable-next-line no-unused-vars

const MenuHorizontalBand = () => {
  return /*#__PURE__*/_react.default.createElement("div", {
    className: "hr-123"
  });
};
exports.MenuHorizontalBand = MenuHorizontalBand;
const MenuVerticalBand = () => {
  return /*#__PURE__*/_react.default.createElement("div", {
    className: "hr-123_vert"
  });
};
exports.MenuVerticalBand = MenuVerticalBand;
const isFunction = value => value ? Object.prototype.toString.call(value) === "[object Function]" || "function" === typeof value || value instanceof Function : false;
const MenuItem = class extends _react.Component {
  constructor(props) {
    super(props);
    this.content = this.props.content;
    this.mRefMenu = /*#__PURE__*/_react.default.createRef();
    this.mRefWrapper = /*#__PURE__*/_react.default.createRef();
    this.mRefPopup = /*#__PURE__*/_react.default.createRef();
    this.icon = this.props.icon;
    this.onClick = this.props.onClick;
    this.disabled = this.props.disabled;
    if (isFunction(this.content)) {
      this.content = this.content();
    }
    if (isFunction(this.icon)) {
      this.icon = this.icon();
    }
    this._MyMenu = {
      state: false
    };
    if (this.props.behavior === "move") {
      this._MyMenu.state = true;
    }
    this.isOpenDetails = false;
  }
  _visibilityPane() {
    if (this.props.positionPopup === "down") {
      const y = this.mRefMenu.current.offsetTop + this.mRefMenu.current.offsetHeight;
      this.mRefPopup.current.style.top = "".concat(y, "px");
      this.mRefPopup.current.style.left = this.mRefMenu.current.offsetLeft + "px";
    }
    if (this.props.positionPopup === "top") {
      const y = this.mRefMenu.current.offsetTop - this.mRefPopup.current.offsetHeight;
      this.mRefPopup.current.style.top = "".concat(y, "px");
      this.mRefPopup.current.style.left = this.mRefMenu.current.offsetLeft + "px";
    }
    if (this.props.positionPopup === "downRight") {
      const y = this.mRefMenu.current.offsetTop + 5;
      this.mRefPopup.current.style.top = "".concat(y, "px");
      this.mRefPopup.current.style.left = this.mRefMenu.current.offsetLeft + this.mRefMenu.current.offsetWidth - 5 + "px";
    }
    if (this.props.positionPopup === "topRight") {
      const y = this.mRefMenu.current.offsetTop - this.mRefPopup.current.offsetHeight + this.mRefMenu.current.offsetHeight - 5;
      this.mRefPopup.current.style.top = "".concat(y, "px");
      this.mRefPopup.current.style.left = this.mRefMenu.current.offsetLeft + this.mRefMenu.current.offsetWidth - 5 + "px";
    }
    if (this.props.positionPopup === 'downLeft') {
      const y = this.mRefMenu.current.offsetTop + 5;
      this.mRefPopup.current.style.top = "".concat(y, "px");
      this.mRefPopup.current.style.left = this.mRefMenu.current.offsetLeft - this.mRefPopup.current.offsetWidth + 5 + "px";
    }
    if (this.props.positionPopup === 'topLeft') {
      const y = this.mRefMenu.current.offsetTop - this.mRefPopup.current.offsetHeight + this.mRefMenu.current.offsetHeight - 5;
      this.mRefPopup.current.style.top = "".concat(y, "px");
      this.mRefPopup.current.style.left = this.mRefMenu.current.offsetLeft - this.mRefPopup.current.offsetWidth + 5 + "px";
    }
    if (this.props.children) {
      this.mRefPopup.current.style.visibility = "visible";
      this.mRefPopup.current.style.display = "block";
    }
  }
  _click(e) {
    if (this.props.positionPopup !== 'details') {
      this._MyMenu.state = true;
      this._visibilityPane();
    } else {
      if (!this.mRefPopup.current.style.display || this.mRefPopup.current.style.display === 'none') {
        this.mRefPopup.current.style.display = 'block';
        this.isOpenDetails = true;
      } else {
        this.mRefPopup.current.style.display = 'none';
        this.isOpenDetails = false;
      }
      if (this.isOpenDetails === true && this.props.onOpenPopup) {
        this.props.onOpenPopup(this);
      }
      if (this.isOpenDetails === false && this.props.onClosePopup) {
        this.props.onClosePopup(this);
      }
      if (this.props.iconClose && this.props.iconOpen) {
        this.forceUpdate();
      }
    }
    if (this.onClick) {
      this.onClick(e);
    }
  }
  out(e) {
    if (this.props.positionPopup !== 'details') {
      this.mRefPopup.current.style.visibility = "hidden";
      if (this.props.behavior === "click") {
        setTimeout(() => {
          this._MyMenu.state = false;
        }, 100);
      }
    }
    if (this.props.onMouseOut) {
      this.props.onMouseOut(e);
    }
  }
  _moveMenu(e) {
    if (this._MyMenu.state === true) {
      this._visibilityPane();
    }
    if (this.props.onMouseMove) {
      this.props.onMouseMove(e);
    }
  }
  _movePopUp() {
    this.mRefPopup.current.style.visibility = "visible";
  }
  componentDidMount() {
    if (this.props.positionPopup === 'details') {
      this.mRefPopup.current.style.display = "none";
    } else {
      this.mRefPopup.current.style.display = "block";
      this.mRefPopup.current.style.position = 'absolute';
      this.mRefPopup.current.style.visibility = 'hidden';
      this.mRefPopup.current.style.zIndex = 2;
    }
    this.mRefMenu.current.style.display = 'block';
    if (this.props.positionPopup !== 'details' && this.props.widthPopup) {
      this.mRefPopup.current.style.width = "".concat(this.props.widthPopup, "px");
    }
    this.setDisabled(this.disabled, true);
  }
  setDisabled(b, force) {
    this.disabled = b;
    if (b === true) {
      this.mRefWrapper.current.style.cursor = 'not-allowed';
    } else {
      this.mRefWrapper.current.style.cursor = 'default';
    }
    if (!force) {
      this.forceUpdate();
    }
  }
  open() {
    if (this.props.children) {
      this.mRefPopup.current.style.visibility = "visible";
      this.mRefPopup.current.style.display = "block";
      this.isOpenDetails = true;
      if (this.props.onOpenPopup) {
        this.props.onOpenPopup(this);
      }
      if (this.props.iconClose && this.props.iconOpen) {
        this.forceUpdate();
      }
    }
  }
  close() {
    this.mRefPopup.current.style.visibility = "hidden";
    this.mRefPopup.current.style.display = "none";
    this.isOpenDetails = false;
    if (this.props.onClosePopup) {
      this.props.onClosePopup(this);
    }
    if (this.props.iconClose && this.props.iconOpen) {
      this.forceUpdate();
    }
  }
  render() {
    return /*#__PURE__*/_react.default.createElement("div", {
      ref: this.mRefWrapper
    }, /*#__PURE__*/_react.default.createElement("div", {
      ref: this.mRefMenu,
      disabled: this.disabled,
      onSelect: this.props.onSelect,
      style: this.props.style,
      id: this.props.id,
      onKeyUp: this.props.onKeyUp,
      onClick: this._click.bind(this),
      onMouseEnter: this.props.onMouseEnter,
      onMouseDown: this.props.onMouseDown,
      onMouseDownCapture: this.props.onMouseDownCapture,
      onMouseLeave: this.props.onMouseLeave,
      onMouseUp: this.props.onMouseUp,
      onMouseOverCapture: this.props.onMouseOverCapture,
      onMouseOutCapture: this.props.onMouseOutCapture,
      onMouseMoveCapture: this.props.onMouseMoveCapture,
      onMouseOver: this.props.onMouseOver,
      onMouseUpCapture: this.props.onMouseUpCapture,
      onMouseMove: this._moveMenu.bind(this),
      onMouseOut: this.out.bind(this),
      accessKey: this.props.accessKey,
      title: this.props.title,
      tabIndex: this.props.tabIndex,
      className: this.props.className
    }, (0, _contentBuilder.default)({
      icon: this.icon,
      content: this.content,
      positionImage: this.props.positionIcon,
      iconClose: this.props.iconClose,
      iconOpen: this.props.iconOpen,
      isOpenPanel: this.isOpenDetails
    })), /*#__PURE__*/_react.default.createElement("div", {
      disabled: false,
      onMouseOut: this.out.bind(this),
      onMouseMove: this._movePopUp.bind(this),
      ref: this.mRefPopup //editor-menu-pane
      ,
      className: this.props.popupClassName
    }, this.props.children === undefined ? /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null) : this.props.children));
  }
};
exports.MenuItem = MenuItem;
MenuItem.propTypes = {
  children: _propTypes.default.object,
  content: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.number, _propTypes.default.element, _propTypes.default.func]),
  widthPopup: _propTypes.default.number,
  icon: _propTypes.default.element,
  iconOpen: _propTypes.default.element,
  iconClose: _propTypes.default.element,
  className: _propTypes.default.string,
  onClick: _propTypes.default.func,
  onMouseEnter: _propTypes.default.func,
  onMouseDown: _propTypes.default.func,
  onMouseDownCapture: _propTypes.default.func,
  onMouseLeave: _propTypes.default.func,
  onMouseUp: _propTypes.default.func,
  onMouseOverCapture: _propTypes.default.func,
  onMouseOutCapture: _propTypes.default.func,
  onMouseMoveCapture: _propTypes.default.func,
  onMouseOver: _propTypes.default.func,
  onMouseUpCapture: _propTypes.default.func,
  onMouseMove: _propTypes.default.func,
  onMouseOut: _propTypes.default.func,
  onOpenPopup: _propTypes.default.func,
  onClosePopup: _propTypes.default.func,
  style: _reactStyleProptype.default,
  ref: _propTypes.default.element,
  behavior: _propTypes.default.oneOf(['move', 'click']),
  accessKey: _propTypes.default.string,
  tabIndex: _propTypes.default.number,
  positionIcon: _propTypes.default.oneOf(['left', 'right']),
  onSelect: _propTypes.default.func,
  id: _propTypes.default.string,
  key: _propTypes.default.string,
  onKeyUp: _propTypes.default.func,
  disabled: _propTypes.default.bool,
  title: _propTypes.default.string,
  popupClassName: _propTypes.default.string,
  positionPopup: _propTypes.default.oneOf(['down', 'top', 'downLeft', 'downRight', 'topRight', 'topLeft', 'details'])
};
MenuItem.defaultProps = {
  positionPopup: "down",
  positionIcon: "left",
  disabled: false,
  behavior: 'click',
  widthPopup: undefined,
  popupClassName: 'popup-123',
  className: 'menu-123-item'
};
MenuItem.displayName = 'MenuItem';