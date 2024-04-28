import './menu.css';
import React, {Children, Component} from "react";
import uuid from 'react-uuid';
import PropTypes from "prop-types";
import stylePropType from 'react-style-proptype';
import buildContent from "./contentBuilder";
import {ObserverItem, InstanceHub} from "./myObserver";

export function MenuHorizontalBand({className}) {
    return (
        <div className={className ? className : 'hr-123'}/>
    )
}

MenuHorizontalBand.propTypes = {
    className: PropTypes.string
}

export function MenuVerticalBand({className}) {
    return (
        <div className={className ? className : 'hr-123_vert'}/>
    )
}

MenuVerticalBand.propTypes = {
    className: PropTypes.string
}


const MyHub = {
    hub: InstanceHub
}

export function CloseMenu(callback) {
    MyHub.hub.clearClick(callback)
}

document.addEventListener("click", () => {
    MyHub.hub.clearClick()
});

const MyRootContext = React.createContext('superRoot')


export const MenuItem = class extends Component {
    static contextType = MyRootContext;

    constructor(props) {
        super(props);
        this.id = uuid();
        this.mRefMenu = React.createRef();
        this.mRefWrapper = React.createRef();
        this.mRefPopup = React.createRef();
        this.onClick = this.props.onClick;
        this.disabled = this.props.disabled;

        this._MyMenu = {
            state: false
        }
        if (this.props.behavior === "move") {
            this._MyMenu.state = true;
        }
        this.dropOpen = false;
    }

    _visibilityPane() {

        if (this.props.positionPopup === "down") {
            const y = this.mRefMenu.current.offsetTop + this.mRefMenu.current.offsetHeight;
            this.mRefPopup.current.style.top = `${y}px`;
            this.mRefPopup.current.style.left = this.mRefMenu.current.offsetLeft + "px";
        }
        if (this.props.positionPopup === "top") {
            const y = this.mRefMenu.current.offsetTop - this.mRefPopup.current.offsetHeight;
            this.mRefPopup.current.style.top = `${y}px`;
            this.mRefPopup.current.style.left = this.mRefMenu.current.offsetLeft + "px";
        }
        if (this.props.positionPopup === "downRight") {
            const y = this.mRefMenu.current.offsetTop + 5;
            this.mRefPopup.current.style.top = `${y}px`;
            this.mRefPopup.current.style.left = this.mRefMenu.current.offsetLeft + this.mRefMenu.current.offsetWidth - 5 + "px";
        }
        if (this.props.positionPopup === "topRight") {
            const y = this.mRefMenu.current.offsetTop - this.mRefPopup.current.offsetHeight + this.mRefMenu.current.offsetHeight - 5;
            this.mRefPopup.current.style.top = `${y}px`;
            this.mRefPopup.current.style.left = this.mRefMenu.current.offsetLeft + this.mRefMenu.current.offsetWidth - 5 + "px";
        }
        if (this.props.positionPopup === 'downLeft') {
            const y = this.mRefMenu.current.offsetTop + 5;
            this.mRefPopup.current.style.top = `${y}px`;
            this.mRefPopup.current.style.left = this.mRefMenu.current.offsetLeft - this.mRefPopup.current.offsetWidth + 5 + "px";
        }
        if (this.props.positionPopup === 'topLeft') {
            const y = this.mRefMenu.current.offsetTop - this.mRefPopup.current.offsetHeight + this.mRefMenu.current.offsetHeight - 5;
            this.mRefPopup.current.style.top = `${y}px`;
            this.mRefPopup.current.style.left = this.mRefMenu.current.offsetLeft - this.mRefPopup.current.offsetWidth + 5 + "px";
        }

        if (this.props.children) {
            MyHub.hub.Add(new ObserverItem(
                {
                    id: this.id,
                    element: this.mRefPopup.current,
                    idRoot: this.context,
                    elementMenu: this.mRefMenu.current,
                    tag: this.props.tag
                }
            ))
            this.mRefPopup.current.style.visibility = "visible"
            this.mRefPopup.current.style.display = "block"
        }
    }


    _click(e) {
        e.stopPropagation()
        if (this.props.positionPopup === 'dropDown') {
            if (this.dropOpen === false) {
                this.open()
            } else if (this.dropOpen === true) {
                this.close()
            }
            this.forceUpdate()
            return;
        }
        if (Children.count(this.props.children) === 0) {
            MyHub.hub.ClickSelect(this.props.tag, this.onClick)
            return;
        }
        this._MyMenu.state = true;
        this._visibilityPane()
    }

    _moveMenu(e) {

        MyHub.hub.MoveMenu(new ObserverItem(
            {
                id: this.id,
                element: this.mRefPopup.current,
                idRoot: this.context,
                elementMenu: this.mRefMenu.current,
                tag: this.props.tag
            }
        ));

        if (this._MyMenu.state === true) {
            this._visibilityPane()
        }

        if (this.props.onMouseMove) {
            this.props.onMouseMove(e)
        }
    }

    _movePopUp() {
        this.mRefPopup.current.style.visibility = "visible"
    }


    componentDidMount() {
        this.mRefPopup.current.style.display = "block"
        this.mRefPopup.current.style.position = 'absolute'
        this.mRefPopup.current.style.visibility = 'hidden'
        this.mRefPopup.current.style.zIndex = 2;
        this.mRefMenu.current.style.display = 'block'
        this.setDisabled(this.disabled, true)
    }

    setDisabled(b, force) {
        this.disabled = b;
        if (b === true) {
            this.mRefWrapper.current.style.cursor = 'not-allowed'

        } else {
            this.mRefWrapper.current.style.cursor = 'default'
        }
        if (!force) {
            this.forceUpdate()
        }
    }

    open() {
        if (this.props.children) {

            this.mRefMenu.current.classList.add('drop-123-open')
            this.mRefPopup.current.style.position = 'relative'
            this.mRefPopup.current.style.visibility = "visible"
            this.dropOpen = true;
        }
    }

    close() {
        this.mRefMenu.current.classList.remove('drop-123-open')
        this.mRefPopup.current.style.position = 'absolute'
        this.mRefPopup.current.style.visibility = "hidden"
        this.dropOpen = false;
    }


    render() {
        return (
            <div ref={this.mRefWrapper}>
                <div ref={this.mRefMenu}
                     disabled={this.disabled}
                     onSelect={this.props.onSelect}
                     style={this.props.style}
                     id={this.props.id}
                     onKeyUp={this.props.onKeyUp}
                     onClick={this._click.bind(this)}
                     onMouseEnter={this.props.onMouseEnter}
                     onMouseDown={this.props.onMouseDown}
                     onMouseDownCapture={this.props.onMouseDownCapture}
                     onMouseLeave={this.props.onMouseLeave}
                     onMouseUp={this.props.onMouseUp}
                     onMouseOverCapture={this.props.onMouseOverCapture}
                     onMouseOutCapture={this.props.onMouseOutCapture}
                     onMouseMoveCapture={this.props.onMouseMoveCapture}
                     onMouseOver={this.props.onMouseOver}
                     onMouseUpCapture={this.props.onMouseUpCapture}
                     onMouseMove={this._moveMenu.bind(this)}
                     onMouseOut={this.props.onMouseOut}
                     accessKey={this.props.accessKey}
                     title={this.props.title}
                     tabIndex={this.props.tabIndex}
                     className={this.props.className}>
                    {
                        buildContent(
                            {
                                contentLeft: this.props.contentLeft,
                                contentCenter: this.props.content,
                                contentRight: this.props.contentRight,
                                iconDropClose: this.props.iconDropClose,
                                iconDropOpen: this.props.iconDropOpen,
                                openDrop: this.dropOpen
                            })
                    }
                </div>
                <div
                    disabled={false}
                    onMouseOut={this.props.onMouseOut}
                    onMouseMove={this._movePopUp.bind(this)}
                    ref={this.mRefPopup}  //editor-menu-pane
                    className={this.props.popupClassName}>
                    {
                        this.props.children === undefined ? (<></>) : (
                            <MyRootContext.Provider value={this.id}>
                                {this.props.children}
                            </MyRootContext.Provider>
                        )
                    }
                </div>
            </div>

        );
    }
}


MenuItem.propTypes = {


    accessKey: PropTypes.string,
    behavior: PropTypes.oneOf(['move', 'click']),
    className: PropTypes.string,
    children: PropTypes.object,
    content: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
        PropTypes.element,
        PropTypes.func,
    ]),
    contentLeft: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
        PropTypes.element,
        PropTypes.func,
    ]),
    contentRight: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
        PropTypes.element,
        PropTypes.func,
    ]),
    disabled: PropTypes.bool,
    id: PropTypes.string,
    iconDropOpen: PropTypes.oneOfType([
        PropTypes.element,
        PropTypes.func,
    ]),
    iconDropClose: PropTypes.oneOfType([
        PropTypes.element,
        PropTypes.func,
    ]),
    key: PropTypes.string,
    onClick: PropTypes.func,
    onMouseEnter: PropTypes.func,
    onMouseDown: PropTypes.func,
    onMouseDownCapture: PropTypes.func,
    onMouseLeave: PropTypes.func,
    onMouseUp: PropTypes.func,
    onMouseOverCapture: PropTypes.func,
    onMouseOutCapture: PropTypes.func,
    onMouseMoveCapture: PropTypes.func,
    onMouseOver: PropTypes.func,
    onMouseUpCapture: PropTypes.func,
    onMouseMove: PropTypes.func,
    onMouseOut: PropTypes.func,
    onSelect: PropTypes.func,
    onKeyUp: PropTypes.func,
    popupClassName: PropTypes.string,
    positionPopup: PropTypes.oneOf(['down', 'top', 'downLeft', 'downRight', 'topRight', 'topLeft', 'dropDown']),
    ref: PropTypes.element,
    style: stylePropType,
    tabIndex: PropTypes.number,
    title: PropTypes.string,
    tag: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
        PropTypes.element,
        PropTypes.func,]),
};


MenuItem.defaultProps = {
    positionPopup: "down",
    disabled: false,
    behavior: 'move',
    popupClassName: 'popup-123',
    className: 'menu-123-item'
};
MenuItem.displayName = 'MenuItem';

