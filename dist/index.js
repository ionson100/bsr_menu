"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MenuVerticalBand = exports.MenuItem = exports.MenuHorizontalBand = void 0;
require("./menu.css");
var _react = _interopRequireWildcard(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _reactStyleProptype = _interopRequireDefault(require("react-style-proptype"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
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
const _MyMenu = {
  state: false
};
const isFunction = value => value ? Object.prototype.toString.call(value) === "[object Function]" || "function" === typeof value || value instanceof Function : false;
const MenuItem = class extends _react.Component {
  constructor(props) {
    var _this$props$position, _this$props$width, _this$props$className, _this$props$className2;
    super(props);
    this.position = (_this$props$position = this.props.position) !== null && _this$props$position !== void 0 ? _this$props$position : 'down';
    this.content = this.props.content;
    this.mRefBase = /*#__PURE__*/_react.default.createRef();
    this.mRefPane = /*#__PURE__*/_react.default.createRef();
    this.width = (_this$props$width = this.props.width) !== null && _this$props$width !== void 0 ? _this$props$width : 200;
    this.icon = this.props.icon;
    this.className = (_this$props$className = this.props.className) !== null && _this$props$className !== void 0 ? _this$props$className : 'menu-123-item';
    this.onClick = this.props.onClick;
    this.onMouseEnter = this.props.onMouseEnter;
    this.onMouseDown = this.props.onMouseDown;
    this.onMouseDownCapture = this.props.onMouseDownCapture;
    this.onMouseLeave = this.props.onMouseLeave;
    this.onMouseUp = this.props.onMouseUp;
    this.onMouseOverCapture = this.props.onMouseOverCapture;
    this.onMouseOutCapture = this.props.onMouseOutCapture;
    this.onMouseMoveCapture = this.props.onMouseMoveCapture;
    this.onMouseOver = this.props.onMouseOver;
    this.onMouseUpCapture = this.props.onMouseUpCapture;
    this.onMouseMove = this.props.onMouseMove;
    this.onMouseOut = this.props.onMouseOut;
    this.onSelect = this.props.onSelect;
    this.style = this.props.style;
    this.id = this.props.id;
    this.key = this.props.key;
    this.hidden = this.props.hidden;
    this.onKeyUp = this.props.onKeyUp;
    this.color = this.props.color;
    this.classNamePanel = (_this$props$className2 = this.props.classNamePanel) !== null && _this$props$className2 !== void 0 ? _this$props$className2 : 'menu-123-pane';
    if (isFunction(this.content)) {
      this.content = this.content();
    }
  }
  visibilityPane() {
    if (this.position === "down") {
      const y = this.mRefBase.current.offsetTop + this.mRefBase.current.offsetHeight;
      this.mRefPane.current.style.top = "".concat(y, "px");
      this.mRefPane.current.style.left = this.mRefBase.current.offsetLeft + "px";
    }
    if (this.position === "downRight") {
      const y = this.mRefBase.current.offsetTop;
      this.mRefPane.current.style.top = "".concat(y, "px");
      this.mRefPane.current.style.left = this.mRefBase.current.offsetLeft + this.mRefBase.current.offsetWidth - 5 + "px";
    }
    if (this.position === 'downLeft') {
      const y = this.mRefBase.current.offsetTop;
      this.mRefPane.current.style.top = "".concat(y, "px");
      this.mRefPane.current.style.left = this.mRefBase.current.offsetLeft - this.mRefPane.current.offsetWidth + 5 + "px";
    }
    if (this.props.children) {
      this.mRefPane.current.style.visibility = "visible";
    }
  }
  click(e) {
    _MyMenu.state = true;
    this.visibilityPane();
    if (this.onClick) {
      this.onClick(e);
    }
  }
  out(e) {
    this.mRefPane.current.style.visibility = "hidden";
    if (this.onMouseEnter) {
      this.onMouseEnter(e);
    }
  }
  move(e) {
    if (_MyMenu.state === true) {
      this.visibilityPane();
    }
    if (this.onMouseMove) {
      this.onMouseMove(e);
    }
  }
  movePane() {
    this.mRefPane.current.style.visibility = "visible";
  }
  componentDidMount() {
    this.mRefPane.current.style.width = "".concat(this.width, "px");
  }
  renderInner() {
    if (this.content && !this.icon) {
      return this.content;
    }
    if (this.content && this.icon) {
      return /*#__PURE__*/_react.default.createElement("div", {
        style: {
          display: "flex"
        }
      }, this.icon, " ", this.content);
    }
    if (!this.content && this.icon) {
      return this.icon;
    }
  }
  render() {
    //alert(this.props.children)
    return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement("div", {
      ref: this.mRefBase,
      onSelect: this.onSelect,
      style: this.style,
      id: this.id,
      key: this.key,
      hidden: this.hidden,
      onKeyUp: this.onKeyUp,
      color: this.color,
      onClick: this.click.bind(this),
      onMouseEnter: this.onMouseEnter,
      onMouseDown: this.onMouseDown,
      onMouseDownCapture: this.onMouseDownCapture,
      onMouseLeave: this.onMouseLeave,
      onMouseUp: this.onMouseUp,
      onMouseOverCapture: this.onMouseOverCapture,
      onMouseOutCapture: this.onMouseOutCapture,
      onMouseMoveCapture: this.onMouseMoveCapture,
      onMouseOver: this.onMouseOver,
      onMouseUpCapture: this.onMouseUpCapture,
      onMouseMove: this.move.bind(this),
      onMouseOut: this.out.bind(this),
      className: this.className
    }, this.renderInner()), /*#__PURE__*/_react.default.createElement("div", {
      onMouseOut: this.out.bind(this),
      onMouseMove: this.movePane.bind(this),
      ref: this.mRefPane //editor-menu-pane
      ,
      className: "menu-123-pane"
    }, this.props.children === undefined ? /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null) : this.props.children));
  }
};
exports.MenuItem = MenuItem;
MenuItem.propTypes = {
  content: _propTypes.default.object.isRequired | undefined,
  width: _propTypes.default.number | undefined,
  icon: _propTypes.default.object | undefined,
  className: _propTypes.default.string | undefined,
  onClick: _propTypes.default.func | undefined,
  onMouseEnter: _propTypes.default.func | undefined,
  onMouseDown: _propTypes.default.func | undefined,
  onMouseDownCapture: _propTypes.default.func | undefined,
  onMouseLeave: _propTypes.default.func | undefined,
  onMouseUp: _propTypes.default.func | undefined,
  onMouseOverCapture: _propTypes.default.func | undefined,
  onMouseOutCapture: _propTypes.default.func | undefined,
  onMouseMoveCapture: _propTypes.default.func | undefined,
  onMouseOver: _propTypes.default.func | undefined,
  onMouseUpCapture: _propTypes.default.func | undefined,
  onMouseMove: _propTypes.default.func | undefined,
  onMouseOut: _propTypes.default.func | undefined,
  style: _reactStyleProptype.default,
  onSelect: _propTypes.default.func | undefined,
  id: _propTypes.default.string | undefined,
  key: _propTypes.default.string | undefined,
  hidden: _propTypes.default.bool | undefined,
  onKeyUp: _propTypes.default.func | undefined,
  color: _propTypes.default.string | undefined,
  classNamePanel: _propTypes.default.string | undefined,
  position: _propTypes.default.oneOf(['down', 'downLeft', "downRight"])
};