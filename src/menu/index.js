import './menu.css';
import React, {Children, Component} from "react";
import {v4 as uuidv4} from 'uuid';
import PropTypes from "prop-types";
import stylePropType from 'react-style-proptype';
import buildContent from "./contentBuilder";
import {ObserverItem, InstanceHub} from "./myObserver";
import {MapMenu} from "./resizeFactory";

const MyRootContext = React.createContext('superRoot')


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


/**
 * @extends {React.Component<Props, {}>}
 */


export const MenuItem = class extends Component {


    constructor(props) {
        super(props);
        this.id = uuidv4();
        this.mRefMenu = React.createRef();
        this.mRefWrapper = React.createRef();
        this.mRefPopup = React.createRef();
        this.onClick = this.props.onClick;


        this._MyMenu = {
            state: false
        }
        if (this.props.behavior === "move") {
            this._MyMenu.state = true;
        }
        this.state =
            {
                disabled: this.props.disabled,
                dropOpen: false
            }

    }

    _resizeWindows() {
        if (this.mRefPopup.current.style.visibility === "visible") {
            this._visibilityPane(true)

        }
    }

    _validateResizeRight(l) {
        const width = window.innerWidth
        const rect = this.mRefPopup.current.getBoundingClientRect();
        const res = width - (rect.left + this.mRefPopup.current.offsetWidth)

        if (res < 0) {
            const lt = l + parseInt(res)
            this.mRefPopup.current.style.left = `${lt}px`;
        }
    }


    _validateResizeLeft() {
        const rect = this.mRefPopup.current.getBoundingClientRect();
        const res = rect.left;//-this.mRefPopup.current.offsetWidth
        if (res < 0) {
            this.mRefPopup.current.style.left = `0px`;
        }
    }


    _visibilityPane(resizeWindows) {

        if (!resizeWindows) {
            if (!this.props.children) return
            if (this.mRefPopup.current.style.visibility === "visible") return;
        }
        switch (this.props.positionPopup) {
            case 'down': {
                const y = this.mRefMenu.current.offsetTop + this.mRefMenu.current.offsetHeight;
                this.mRefPopup.current.style.top = `${y}px`;
                this.mRefPopup.current.style.left = `${this.mRefMenu.current.offsetLeft}px`;
                break
            }
            case 'top': {
                const y = this.mRefMenu.current.offsetTop - this.mRefPopup.current.offsetHeight;
                this.mRefPopup.current.style.top = `${y}px`;
                this.mRefPopup.current.style.left = `${this.mRefMenu.current.offsetLeft}px`;
                break
            }
            case 'downRight': {
                const y = this.mRefMenu.current.offsetTop + 5;
                this.mRefPopup.current.style.top = `${y}px`;
                const l = this.mRefMenu.current.offsetLeft + this.mRefMenu.current.offsetWidth - 5
                this.mRefPopup.current.style.left = `${l}px`;
                this._validateResizeRight(l)
                break
            }
            case 'topRight': {
                const y = this.mRefMenu.current.offsetTop - this.mRefPopup.current.offsetHeight + this.mRefMenu.current.offsetHeight - 5;
                this.mRefPopup.current.style.top = `${y}px`;
                const l = this.mRefMenu.current.offsetLeft + this.mRefMenu.current.offsetWidth - 5;
                this.mRefPopup.current.style.left = `${l}px`;
                this._validateResizeRight(l)
                break
            }
            case 'downLeft': {
                const y = this.mRefMenu.current.offsetTop + 5;
                this.mRefPopup.current.style.top = `${y}px`;
                const l = this.mRefMenu.current.offsetLeft - this.mRefPopup.current.offsetWidth + 5
                this.mRefPopup.current.style.left = `${l}px`;
                this._validateResizeLeft(l)
                break
            }
            case 'topLeft': {
                const y = this.mRefMenu.current.offsetTop - this.mRefPopup.current.offsetHeight + this.mRefMenu.current.offsetHeight - 5;
                this.mRefPopup.current.style.top = `${y}px`;
                const l = this.mRefMenu.current.offsetLeft - this.mRefPopup.current.offsetWidth + 5
                this.mRefPopup.current.style.left = `${l}px`;
                break
            }

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
            if (this.state.dropOpen === false) {
                this.Open()
            } else if (this.state.dropOpen === true) {
                this.Close()
            }

            return;
        }
        if (Children.count(this.props.children) === 0) {
            MyHub.hub.ClickSelect(this.props.tag, this.mRefMenu.current, this.onClick)
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


    componentWillUnmount() {
        MapMenu.delete(this.id)
    }

    componentDidMount() {
        this.mRefPopup.current.style.display = "block"
        this.mRefPopup.current.style.position = 'absolute'
        this.mRefPopup.current.style.visibility = 'hidden'
        this.mRefPopup.current.style.zIndex = 2;
        this.mRefMenu.current.style.display = 'block'
        MapMenu.set(this.id, this)
    }

    SetDisabled(b) {
        if (b === true) {
            this.mRefWrapper.current.style.cursor = 'not-allowed'

        } else {
            this.mRefWrapper.current.style.cursor = 'default'
        }
        this.setState((state) => {
            return {counter: state.disabled = b};
        });
    }

    Open() {
        if (this.props.children) {

            this.mRefMenu.current.classList.add('drop-123-open')
            this.mRefPopup.current.style.position = 'relative'
            this.mRefPopup.current.style.visibility = "visible"
            this.setState((state) => {
                return {counter: state.dropOpen = true};
            });
            if (this.props.onClick) {
                this.props.onClick(this.props.tag, this.mRefMenu.current, true)
            }
        }
    }

    Close() {
        this.mRefMenu.current.classList.remove('drop-123-open')
        this.mRefPopup.current.style.position = 'absolute'
        this.mRefPopup.current.style.visibility = "hidden"
        this.setState((state) => {
            return {counter: state.dropOpen = false};
        });
        if (this.props.onClick) {
            this.props.onClick(this.props.tag, this.mRefMenu.current, false)
        }
    }


    render() {
        return (
            <div ref={this.mRefWrapper}>
                <div ref={this.mRefMenu}
                     disabled={this.state.disabled}
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
                     data-menu-tag={this.props.tag}
                     className={this.props.className}>
                    {

                        this.props.buildContent({
                            contentLeft: this.props.contentLeft,
                            contentCenter: this.props.content,
                            contentRight: this.props.contentRight,
                            iconDropClose: this.props.iconDropClose,
                            iconDropOpen: this.props.iconDropOpen,
                            isOpenDrop: this.state.dropOpen,
                            id: this.props.id,
                            tag: this.props.tag
                        })
                    }
                </div>
                <div
                    disabled={false}
                    onMouseOut={this.props.onMouseOut}
                    onMouseMove={this._movePopUp.bind(this)}
                    ref={this.mRefPopup}
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

MenuItem.contextType = MyRootContext;

MenuItem.propTypes = {


    accessKey: PropTypes.string,
    buildContent: PropTypes.func,
    /**The submenu opening behavior can be 'move' or 'click'. (mov: mouse move) (click: mouse click) . Default 'move'*/
    behavior: PropTypes.oneOf(['move', 'click']),
    /**css class menu. default: 'menu-123-item'.*/
    className: PropTypes.string,
    children: PropTypes.object,
    /**The visual content of the menu consists of three horizontal areas: contentLeft - content - contentRight. Can be determined individually.*/
    content: PropTypes.any,
    /**The visual content of the menu consists of three horizontal areas: contentLeft - content - contentRight. Can be determined individually.*/
    contentLeft: PropTypes.any,
    /**The visual content of the menu consists of three horizontal areas: contentLeft - content - contentRight. Can be determined individually.*/
    contentRight: PropTypes.any,
    /**Sign of an disabled menu, boolean value, default: false*/
    disabled: PropTypes.bool,
    id: PropTypes.string,
    /**Only for menu where positionPopup='dropDown'.*/
    iconDropOpen: PropTypes.oneOfType([
        PropTypes.element,
        PropTypes.func,
    ]),
    /**Only for menu where positionPopup='dropDown'.*/
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
    /**css class submenu panel. default:'popup-123'.*/
    popupClassName: PropTypes.string,
    /**Position of the sub menu panel, can take value: ['down', 'top', 'downLeft', 'downRight', 'topRight', 'topLeft', 'dropDown']. Default:'down'*/
    positionPopup: PropTypes.oneOf(['down', 'top', 'downLeft', 'downRight', 'topRight', 'topLeft', 'dropDown']),
    ref: PropTypes.element,
    style: stylePropType,
    tabIndex: PropTypes.number,
    title: PropTypes.string,
    tag: PropTypes.any,
};


MenuItem.defaultProps = {
    positionPopup: "down",
    disabled: false,
    behavior: 'move',
    popupClassName: 'popup-123',
    className: 'menu-123-item',
    buildContent: buildContent

};
MenuItem.displayName = 'MenuItem';

