import './menu.css';
import React, {Children, Component} from "react";
import uuid from 'react-uuid';
import PropTypes from "prop-types";
// eslint-disable-next-line no-unused-vars
import stylePropType from 'react-style-proptype';
import buildContent from "./contentBuilder";
import {ObserverItem, MyObserver} from "./myObserver";

export const MenuHorizontalBand = () => {
    return (
        <div className='hr-123'/>
    )
}
export const MenuVerticalBand = () => {
    return (
        <div className='hr-123_vert'/>
    )
}



const MyHub={
    hub:new MyObserver('#c9c9c9')
}

document.addEventListener("click", () => {
    MyHub.hub.clearClick()
});
console.log('*************init**********')
const MyRootContext = React.createContext(undefined)

const isFunction = value => value ? (Object.prototype.toString.call(value) === "[object Function]" || "function" === typeof value || value instanceof Function) : false;

export const MenuItem = class extends Component {
    static contextType = MyRootContext;

    constructor(props) {
        super(props);
        this.id = uuid();


        this.content = this.props.content;
        this.mRefMenu = React.createRef();
        this.mRefWrapper = React.createRef();
        this.mRefPopup = React.createRef();

        this.icon = this.props.icon
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
        }
        if (this.props.behavior === "move") {
            this._MyMenu.state = true;
        }
        this.isOpenDetails = false;



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
                    elementMenu:this.mRefMenu.current,
                    tag:this.props.tag

                }
            ))
            this.mRefPopup.current.style.visibility = "visible"
            this.mRefPopup.current.style.display = "block"
        }
    }

    // eslint-disable-next-line no-unused-vars
    _click(e) {
        e.stopPropagation()
        if (Children.count(this.props.children) === 0) {
            MyHub.hub.ClickSelect(this.props.tag, this.onClick)
            return;
        }
        if (this.props.positionPopup !== 'details') {
            this._MyMenu.state = true;
            this._visibilityPane()
        } else {
            if (!this.mRefPopup.current.style.display || this.mRefPopup.current.style.display === 'none') {
                this.mRefPopup.current.style.display = 'block'
                this.isOpenDetails = true;

            } else {
                this.mRefPopup.current.style.display = 'none'
                this.isOpenDetails = false;
            }
            if (this.isOpenDetails === true && this.props.onOpenPopup) {
                this.props.onOpenPopup(this)
            }
            if (this.isOpenDetails === false && this.props.onClosePopup) {
                this.props.onClosePopup(this)
            }
            if (this.props.iconClose && this.props.iconOpen) {
                this.forceUpdate()
            }

        }


    }

    out(e) {


        if (this.props.positionPopup !== 'details') {

            // if(MyHub.hasLast(this.id)===true){
            //     //this.mRefPopup.current.style.visibility = "hidden"
            //
            //     if (this.props.behavior === "click") {
            //         setTimeout(() => {
            //             this._MyMenu.state = false;
            //         }, 100)
            //     }
            // }

        }
        if (this.props.onMouseOut) {
            this.props.onMouseOut(e)
        }
    }


    // eslint-disable-next-line no-unused-vars
    _moveMenu(e) {

        MyHub.hub.MoveMenu(new ObserverItem(
            {
                id: this.id,
                element: this.mRefPopup.current,
                idRoot: this.context,
                elementMenu:this.mRefMenu.current,
                tag:this.props.tag
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
        if (this.props.positionPopup === 'details') {
            this.mRefPopup.current.style.display = "none"
        } else {
            this.mRefPopup.current.style.display = "block"
            this.mRefPopup.current.style.position = 'absolute'
            this.mRefPopup.current.style.visibility = 'hidden'
            this.mRefPopup.current.style.zIndex = 2;
        }

        this.mRefMenu.current.style.display = 'block'
        this.setDisabled(this.disabled, true)
        //console.log(this.context)


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
            this.mRefPopup.current.style.visibility = "visible"
            this.mRefPopup.current.style.display = "block"
            this.isOpenDetails = true;
            if (this.props.onOpenPopup) {
                this.props.onOpenPopup(this)
            }
            if (this.props.iconClose && this.props.iconOpen) {
                this.forceUpdate()
            }
        }

    }

    close() {
        this.mRefPopup.current.style.visibility = "hidden"
        this.mRefPopup.current.style.display = "none"
        this.isOpenDetails = false;

        if (this.props.onClosePopup) {
            this.props.onClosePopup(this)
        }
        if (this.props.iconClose && this.props.iconOpen) {
            this.forceUpdate()
        }
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
                     onMouseOut={this.out.bind(this)}
                     accessKey={this.props.accessKey}
                     title={this.props.title}
                     tabIndex={this.props.tabIndex}
                     className={this.props.className}>
                    {
                        buildContent(
                            {
                                icon: this.icon,
                                content: this.content,
                                positionImage: this.props.positionIcon,
                                iconClose: this.props.iconClose,
                                iconOpen: this.props.iconOpen,
                                isOpenPanel: this.isOpenDetails
                            })
                    }
                </div>
                <div
                    disabled={false}
                    onMouseOut={this.out.bind(this)}
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
    children: PropTypes.object,
    content: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
        PropTypes.element,
        PropTypes.func,
    ]),
    icon: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
        PropTypes.element,
        PropTypes.func,
    ]),
    iconOpen: PropTypes.element,
    iconClose: PropTypes.element,
    className: PropTypes.string,
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
    onOpenPopup: PropTypes.func,
    onClosePopup: PropTypes.func,

    style: stylePropType,
    ref: PropTypes.element,
    behavior: PropTypes.oneOf(['move', 'click']),
    accessKey: PropTypes.string,
    tabIndex: PropTypes.number,
    positionIcon: PropTypes.oneOf(['left', 'right']),


    onSelect: PropTypes.func,
    id: PropTypes.string,
    key: PropTypes.string,
    onKeyUp: PropTypes.func,
    disabled: PropTypes.bool,
    title: PropTypes.string,
    tag:PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
        PropTypes.element,
        PropTypes.func,]),


    popupClassName: PropTypes.string,
    positionPopup: PropTypes.oneOf(['down', 'top', 'downLeft', 'downRight', 'topRight', 'topLeft', 'details']),


};


MenuItem.defaultProps = {
    positionPopup: "down",
    positionIcon: "left",

    disabled: false,
    behavior: 'move',
    popupClassName: 'popup-123',
    className: 'menu-123-item'
};
MenuItem.displayName = 'MenuItem';

