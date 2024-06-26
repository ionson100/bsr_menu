"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CloseMenu = CloseMenu;
exports.MenuHorizontalBand = MenuHorizontalBand;
exports.MenuItem = void 0;
exports.MenuVerticalBand = MenuVerticalBand;
require("./menu.css");
var _react = _interopRequireWildcard(require("react"));
var _uuid = require("uuid");
var _propTypes = _interopRequireDefault(require("prop-types"));
var _reactStyleProptype = _interopRequireDefault(require("react-style-proptype"));
var _contentBuilder = _interopRequireDefault(require("./contentBuilder"));
var _myObserver = require("./myObserver");
var _resizeFactory = require("./resizeFactory");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
const MyRootContext = /*#__PURE__*/_react.default.createContext('superRoot');

/**
 * This component renders horizontal band
 *
 * @param {string} className
 * @returns {ReactNode} A React element band as div
 */
function MenuHorizontalBand(_ref) {
  let {
    className
  } = _ref;
  return /*#__PURE__*/_react.default.createElement("div", {
    className: className ? className : 'hr-123'
  });
}
MenuHorizontalBand.propTypes = {
  className: _propTypes.default.string
};
/**
 * This component renders vertical band
 *
 * @param {string} className
 * @returns {ReactNode} A React element band as div
 */
function MenuVerticalBand(_ref2) {
  let {
    className
  } = _ref2;
  return /*#__PURE__*/_react.default.createElement("div", {
    className: className ? className : 'hr-123_vert'
  });
}
MenuVerticalBand.propTypes = {
  className: _propTypes.default.string
};
const MyHub = {
  hub: _myObserver.InstanceHub
};

/**
 * Close all open menu
 * @param callback
 * @constructor
 */
function CloseMenu(callback) {
  MyHub.hub.clearClick(callback);
}
document.addEventListener("click", () => {
  MyHub.hub.clearClick();
});

/**
 * @extends {React.Component<Props, {}>}
 */

const MenuItem = class extends _react.Component {
  constructor(props) {
    super(props);
    this.id = (0, _uuid.v4)();
    this.mRefMenu = /*#__PURE__*/_react.default.createRef();
    this.mRefWrapper = /*#__PURE__*/_react.default.createRef();
    this.mRefPopup = /*#__PURE__*/_react.default.createRef();
    this.onClick = this.props.onClick;
    this.stateDropMemu = false;
    this._MyMenu = {
      state: false
    };
    if (this.props.behavior === "move") {
      this._MyMenu.state = true;
    }
    this.state = {
      disabled: this.props.disabled,
      dropOpen: false,
      content: {
        contentLeft: this.props.contentLeft,
        content: this.props.content,
        contentRight: this.props.contentRight
      },
      url: this.props.url,
      tag: this.props.tag
    };
    this._moveMenu = this._moveMenu.bind(this);
    this._click = this._click.bind(this);
  }
  get menu() {
    return this.mRefMenu.current;
  }
  set menu(value) {
    this.mRefMenu.current = value;
  }
  get popUp() {
    return this.mRefPopup.current;
  }
  set popUp(value) {
    this.mRefPopup.current = value;
  }
  get wrapper() {
    return this.mRefWrapper.current;
  }
  set wrapper(value) {
    this.mRefWrapper.current = value;
  }
  _resizeWindows() {
    if (this.mRefPopup.current.style.visibility === "visible") {
      this._visibilityPane(true);
    }
  }
  _validateResizeRight(l) {
    const width = window.innerWidth;
    const rect = this.mRefPopup.current.getBoundingClientRect();
    const res = width - (rect.left + this.mRefPopup.current.offsetWidth);
    if (res < 0) {
      const lt = l + parseInt(res);
      this.mRefPopup.current.style.left = "".concat(lt, "px");
    }
  }
  _validateResizeLeft() {
    const rect = this.mRefPopup.current.getBoundingClientRect();
    const res = rect.left; //-this.mRefPopup.current.offsetWidth
    if (res < 0) {
      this.mRefPopup.current.style.left = "0px";
    }
  }
  _visibilityPane(resizeWindows) {
    if (!resizeWindows) {
      if (!this.props.children) return;
      if (this.mRefPopup.current.style.visibility === "visible") return;
    }
    switch (this.props.positionPopup) {
      case "dropDown":
        {
          break;
        }
      case 'down':
        {
          const y = this.mRefMenu.current.offsetTop + this.mRefMenu.current.offsetHeight;
          this.mRefPopup.current.style.top = "".concat(y, "px");
          this.mRefPopup.current.style.left = "".concat(this.mRefMenu.current.offsetLeft, "px");
          break;
        }
      case 'top':
        {
          const y = this.mRefMenu.current.offsetTop - this.mRefPopup.current.offsetHeight;
          this.mRefPopup.current.style.top = "".concat(y, "px");
          this.mRefPopup.current.style.left = "".concat(this.mRefMenu.current.offsetLeft, "px");
          break;
        }
      case 'middleRight':
        {
          const y = this.mRefMenu.current.offsetTop - this.mRefPopup.current.offsetHeight / 2;
          this.mRefPopup.current.style.top = "".concat(y, "px");
          const l = this.mRefMenu.current.offsetLeft + this.mRefMenu.current.offsetWidth - 5;
          this.mRefPopup.current.style.left = "".concat(l, "px");
          this._validateResizeRight(l);
          break;
        }
      case 'middleRight3':
        {
          const y = this.mRefMenu.current.offsetTop - this.mRefPopup.current.offsetHeight / 3;
          this.mRefPopup.current.style.top = "".concat(y, "px");
          const l = this.mRefMenu.current.offsetLeft + this.mRefMenu.current.offsetWidth - 5;
          this.mRefPopup.current.style.left = "".concat(l, "px");
          this._validateResizeRight(l);
          break;
        }
      case 'middleRight4':
        {
          const y = this.mRefMenu.current.offsetTop - this.mRefPopup.current.offsetHeight / 4;
          this.mRefPopup.current.style.top = "".concat(y, "px");
          const l = this.mRefMenu.current.offsetLeft + this.mRefMenu.current.offsetWidth - 5;
          this.mRefPopup.current.style.left = "".concat(l, "px");
          this._validateResizeRight(l);
          break;
        }
      case 'middleRight5':
        {
          const y = this.mRefMenu.current.offsetTop - this.mRefPopup.current.offsetHeight / 6;
          this.mRefPopup.current.style.top = "".concat(y, "px");
          const l = this.mRefMenu.current.offsetLeft + this.mRefMenu.current.offsetWidth - 5;
          this.mRefPopup.current.style.left = "".concat(l, "px");
          this._validateResizeRight(l);
          break;
        }
      case 'downRight':
        {
          const y = this.mRefMenu.current.offsetTop + 5;
          this.mRefPopup.current.style.top = "".concat(y, "px");
          const l = this.mRefMenu.current.offsetLeft + this.mRefMenu.current.offsetWidth - 5;
          this.mRefPopup.current.style.left = "".concat(l, "px");
          this._validateResizeRight(l);
          break;
        }
      case 'topRight':
        {
          const y = this.mRefMenu.current.offsetTop - this.mRefPopup.current.offsetHeight + this.mRefMenu.current.offsetHeight - 5;
          this.mRefPopup.current.style.top = "".concat(y, "px");
          const l = this.mRefMenu.current.offsetLeft + this.mRefMenu.current.offsetWidth - 5;
          this.mRefPopup.current.style.left = "".concat(l, "px");
          this._validateResizeRight(l);
          break;
        }
      case 'middleLeft':
        {
          const y = this.mRefMenu.current.offsetTop - this.mRefPopup.current.offsetHeight / 2;
          this.mRefPopup.current.style.top = "".concat(y, "px");
          const l = this.mRefMenu.current.offsetLeft - this.mRefPopup.current.offsetWidth + 5;
          this.mRefPopup.current.style.left = "".concat(l, "px");
          this._validateResizeLeft(l);
          break;
        }
      case 'middleLeft3':
        {
          const y = this.mRefMenu.current.offsetTop - this.mRefPopup.current.offsetHeight / 3;
          this.mRefPopup.current.style.top = "".concat(y, "px");
          const l = this.mRefMenu.current.offsetLeft - this.mRefPopup.current.offsetWidth + 5;
          this.mRefPopup.current.style.left = "".concat(l, "px");
          this._validateResizeLeft(l);
          break;
        }
      case 'middleLeft4':
        {
          const y = this.mRefMenu.current.offsetTop - this.mRefPopup.current.offsetHeight / 4;
          this.mRefPopup.current.style.top = "".concat(y, "px");
          const l = this.mRefMenu.current.offsetLeft - this.mRefPopup.current.offsetWidth + 5;
          this.mRefPopup.current.style.left = "".concat(l, "px");
          this._validateResizeLeft(l);
          break;
        }
      case 'middleLeft5':
        {
          const y = this.mRefMenu.current.offsetTop - this.mRefPopup.current.offsetHeight / 6;
          this.mRefPopup.current.style.top = "".concat(y, "px");
          const l = this.mRefMenu.current.offsetLeft - this.mRefPopup.current.offsetWidth + 5;
          this.mRefPopup.current.style.left = "".concat(l, "px");
          this._validateResizeLeft(l);
          break;
        }
      case 'downLeft':
        {
          const y = this.mRefMenu.current.offsetTop + 5;
          this.mRefPopup.current.style.top = "".concat(y, "px");
          const l = this.mRefMenu.current.offsetLeft - this.mRefPopup.current.offsetWidth + 5;
          this.mRefPopup.current.style.left = "".concat(l, "px");
          this._validateResizeLeft(l);
          break;
        }
      case 'topLeft':
        {
          const y = this.mRefMenu.current.offsetTop - this.mRefPopup.current.offsetHeight + this.mRefMenu.current.offsetHeight - 5;
          this.mRefPopup.current.style.top = "".concat(y, "px");
          const l = this.mRefMenu.current.offsetLeft - this.mRefPopup.current.offsetWidth + 5;
          this.mRefPopup.current.style.left = "".concat(l, "px");
          break;
        }
    }
    if (this.props.children) {
      MyHub.hub.Add(new _myObserver.ObserverItem({
        id: this.id,
        element: this.mRefPopup.current,
        idRoot: this.context,
        elementMenu: this.mRefMenu.current,
        tag: this.state.tag
      }));
      this.mRefPopup.current.style.visibility = "visible";
      this.mRefPopup.current.style.display = "block";
    }
  }
  _click(e) {
    e.stopPropagation();
    if (this.props.positionPopup === 'dropDown') {
      if (this.state.dropOpen === false) {
        this.open();
      } else if (this.state.dropOpen === true) {
        this.close();
      }
      return;
    }
    if (_react.Children.count(this.props.children) === 0) {
      MyHub.hub.ClickSelect(this.state.tag, this.mRefMenu.current, this.onClick);
      return;
    }
    this._MyMenu.state = true;
    this._visibilityPane();
  }
  _moveMenu(e) {
    const myThis = this;
    function inner() {
      if (myThis._MyMenu.state === true) {
        myThis._visibilityPane();
      }
    }
    MyHub.hub.MoveMenu(new _myObserver.ObserverItem({
      id: this.id,
      element: this.mRefPopup.current,
      idRoot: this.context,
      elementMenu: this.mRefMenu.current,
      tag: this.state.tag
    }), inner);
    if (this.props.onMouseMove) {
      this.props.onMouseMove(e);
    }
  }
  _movePopUp() {
    this.mRefPopup.current.style.visibility = "visible";
  }
  componentWillUnmount() {
    _resizeFactory.MapMenu.delete(this.id);
  }
  componentDidMount() {
    this.mRefPopup.current.style.display = "block";
    this.mRefPopup.current.style.position = 'absolute';
    this.mRefPopup.current.style.visibility = 'hidden';
    this.mRefPopup.current.style.zIndex = 2;
    this.mRefMenu.current.style.display = 'block';
    _resizeFactory.MapMenu.set(this.id, this);
  }

  /**
   * Change show
   * @constructor
   * @param  {boolean} value true-show, false-not show
   */
  setShow(value) {
    if (value === false) {
      this.mRefWrapper.current.style.display = "none";
    }
    if (value === true) {
      this.mRefWrapper.current.style.display = "inline";
    }
  }

  /**
   *
   * @function
   * Change disabled
   * @param  {boolean} value true-disable, false- not disable
   */
  setDisabled(value) {
    if (value === true) {
      this.mRefWrapper.current.style.cursor = 'not-allowed';
    } else {
      this.mRefWrapper.current.style.cursor = 'default';
    }
    const s = Object.assign({}, this.state);
    s.disabled = value;
    this.setState(s);
  }

  /**
   * Open menu
   * @function
   */
  open() {
    if (this.props.children) {
      this.stateDropMemu = true;
      this.mRefMenu.current.classList.add('drop-123-open');
      this.mRefPopup.current.style.position = 'relative';
      this.mRefPopup.current.style.visibility = "visible";
      const s = Object.assign({}, this.state);
      s.dropOpen = true;
      this.setState(s);
      if (this.props.onClick) {
        this.props.onClick(this.state.tag, this.mRefMenu.current, true);
      }
    }
  }

  /**
   * CloseMenu
   * @function
   */
  close() {
    this.stateDropMemu = false;
    this.mRefMenu.current.classList.remove('drop-123-open');
    this.mRefPopup.current.style.position = 'absolute';
    this.mRefPopup.current.style.visibility = "hidden";
    const s = Object.assign({}, this.state);
    s.dropOpen = false;
    this.setState(s);
    if (this.props.onClick) {
      this.props.onClick(this.state.tag, this.mRefMenu.current, false);
    }
  }

  /**
   * Change contents
   * @param  {any} contentLeft
   * @param {any} content
   * @param  {any} contentRich
   */
  setContent(contentLeft, content, contentRich) {
    const s = Object.assign({}, this.state);
    s.content = {
      contentLeft: contentLeft,
      content: content,
      contentRich: contentRich
    };
    this.setState(s);
  }

  /**
   * Change url
   * @param {string} url
   */
  setUrl(url) {
    const s = Object.assign({}, this.state);
    s.url = url;
    this.setState(s);
  }

  /**
   * Change tag
   * @param  {any} tag
   */
  setTag(tag) {
    const s = Object.assign({}, this.state);
    s.tag = tag;
    this.setState(s);
  }
  _getUrl() {
    if (this.props.positionPopup === 'dropDown') {
      if (this.state.url) {
        return this.state.url + "&state=" + this.stateDropMemu;
      }
    } else {
      return this.state.url;
    }
  }
  render() {
    return /*#__PURE__*/_react.default.createElement("object", null, /*#__PURE__*/_react.default.createElement("a", {
      href: this._getUrl(),
      "data-wrapper": true,
      ref: this.mRefWrapper
    }, /*#__PURE__*/_react.default.createElement("div", {
      ref: this.mRefMenu,
      onSelect: this.props.onSelect,
      style: this.props.style,
      id: this.props.id,
      onKeyUp: this.props.onKeyUp,
      onClick: this._click,
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
      onMouseMove: this._moveMenu,
      onMouseOut: this.props.onMouseOut,
      accessKey: this.props.accessKey,
      title: this.props.title,
      tabIndex: this.props.tabIndex,
      "data-menu-tag": this.state.tag,
      disabled: this.state.disabled,
      className: this.props.className
    }, this.props.buildContent({
      contentLeft: this.state.content.contentLeft,
      contentCenter: this.state.content.content,
      contentRight: this.state.content.contentRight,
      iconDropClose: this.props.iconDropClose,
      iconDropOpen: this.props.iconDropOpen,
      isOpenDrop: this.state.dropOpen,
      id: this.props.id,
      tag: this.state.tag
    })), /*#__PURE__*/_react.default.createElement("div", {
      "data-memu-poopup": this.state.tag,
      disabled: this.state.disabled,
      onMouseOut: this.props.onMouseOut,
      onMouseMove: this._movePopUp.bind(this),
      ref: this.mRefPopup,
      className: this.props.popupClassName
    }, this.props.children === undefined ? /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null) : /*#__PURE__*/_react.default.createElement(MyRootContext.Provider, {
      value: this.id
    }, this.props.children))));
  }
};
exports.MenuItem = MenuItem;
MenuItem.contextType = MyRootContext;
MenuItem.propTypes = {
  accessKey: _propTypes.default.string,
  buildContent: _propTypes.default.func,
  /**The submenu opening behavior can be 'move' or 'click'. (mov: mouse move) (click: mouse click) . Default 'move'*/
  behavior: _propTypes.default.oneOf(['move', 'click']),
  /**css class menu. default: 'menu-123-item'.*/
  className: _propTypes.default.string,
  children: _propTypes.default.node,
  /**The visual content of the menu consists of three horizontal areas: contentLeft - content - contentRight. Can be determined individually.*/
  content: _propTypes.default.any,
  /**The visual content of the menu consists of three horizontal areas: contentLeft - content - contentRight. Can be determined individually.*/
  contentLeft: _propTypes.default.any,
  /**The visual content of the menu consists of three horizontal areas: contentLeft - content - contentRight. Can be determined individually.*/
  contentRight: _propTypes.default.any,
  /**Sign of an disabled menu, boolean value, default: false*/
  disabled: _propTypes.default.bool,
  id: _propTypes.default.string,
  /**Only for menu where positionPopup='dropDown'.*/
  iconDropOpen: _propTypes.default.oneOfType([_propTypes.default.element, _propTypes.default.func]),
  /**Only for menu where positionPopup='dropDown'.*/
  iconDropClose: _propTypes.default.oneOfType([_propTypes.default.element, _propTypes.default.func]),
  //key: PropTypes.string,
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
  onSelect: _propTypes.default.func,
  onKeyUp: _propTypes.default.func,
  /**css class submenu panel. default:'popup-123'.*/
  popupClassName: _propTypes.default.string,
  /**Position of the sub menu panel, can take value: ['down', 'top', 'downLeft', 'downRight', 'topRight', 'topLeft', 'dropDown','middleLeft','middleLeft3','middleLeft4','middleLeft5','middleRight','middleRight3','middleRight4','middleRight5']. Default:'down'*/
  positionPopup: _propTypes.default.oneOf(['down', 'top', 'downLeft', 'downRight', 'topRight', 'topLeft', 'dropDown', 'middleLeft', 'middleLeft3', 'middleLeft4', 'middleLeft5', 'middleRight', 'middleRight3', 'middleRight4', 'middleRight5']),
  style: _reactStyleProptype.default,
  tabIndex: _propTypes.default.number,
  title: _propTypes.default.string,
  tag: _propTypes.default.any,
  url: _propTypes.default.string
};
MenuItem.defaultProps = {
  positionPopup: "down",
  disabled: false,
  behavior: 'move',
  popupClassName: 'popup-123',
  className: 'menu-123-item',
  buildContent: _contentBuilder.default
};
MenuItem.displayName = 'MenuItem';