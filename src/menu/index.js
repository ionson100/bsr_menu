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
        this.stateDropMemu=false;


        this._MyMenu = {
            state: false
        }
        if (this.props.behavior === "move") {
            this._MyMenu.state = true;
        }
        this.state =
            {
                disabled: this.props.disabled,
                dropOpen: false,
                content:{
                    contentLeft:this.props.contentLeft,
                    content:this.props.content,
                    contentRight:this.props.contentRight
                },
                url:this.props.url,
                tag:this.props.tag
            }
    }

    get menu(){
        return this.mRefMenu.current
    }
    set menu( value){
         this.mRefMenu.current=value
    }

    get popUp(){
        return this.mRefPopup.current;
    }
    set popUp(value){
         this.mRefPopup.current=value;
    }

    get wrapper(){
        return this.mRefWrapper.current;
    }
    set wrapper(value){
        this.mRefWrapper.current=value;
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
                    tag: this.state.tag
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
                this.open()
            } else if (this.state.dropOpen === true) {
                this.close()
            }

            return;
        }
        if (Children.count(this.props.children) === 0) {
            MyHub.hub.ClickSelect(this.state.tag, this.mRefMenu.current, this.onClick)
            return;
        }
        this._MyMenu.state = true;
        this._visibilityPane()
    }

    _moveMenu(e) {

        const myThis=this;
        function inner(){
            if (myThis._MyMenu.state === true) {
                myThis._visibilityPane()
            }
        }


        MyHub.hub.MoveMenu(new ObserverItem(
            {
                id: this.id,
                element: this.mRefPopup.current,
                idRoot: this.context,
                elementMenu: this.mRefMenu.current,
                tag: this.state.tag
            }
        ),inner);



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


    /**
     * Change show
     * @param value {boolean} true-show, false-not show
     */
    setShow(value){

        if(value===false){
            this.mRefWrapper.current.style.display="none"
        }
        if(value===true){
            this.mRefWrapper.current.style.display="inline"
        }
    }

    /**
     * Change disabled
     * @param value {boolean} true-disable, false- not disable
     */
    setDisabled(value) {
        if (value === true) {
            this.mRefWrapper.current.style.cursor = 'not-allowed'
        } else {
            this.mRefWrapper.current.style.cursor = 'default'
        }
        const s=Object.assign({}, this.state)
        s.disabled=value;
        this.setState(s);

    }

    open() {
        if (this.props.children) {

            this.stateDropMemu=true;
            this.mRefMenu.current.classList.add('drop-123-open')
            this.mRefPopup.current.style.position = 'relative'
            this.mRefPopup.current.style.visibility = "visible"
            const s=Object.assign({}, this.state)
            s.dropOpen = true;
            this.setState(s);
            if (this.props.onClick) {
                this.props.onClick(this.state.tag, this.mRefMenu.current, true)
            }
        }
    }

    close() {
        this.stateDropMemu=false;
        this.mRefMenu.current.classList.remove('drop-123-open')
        this.mRefPopup.current.style.position = 'absolute'
        this.mRefPopup.current.style.visibility = "hidden"
        const s=Object.assign({}, this.state)
        s.dropOpen = false;
        this.setState(s);
        if (this.props.onClick) {
            this.props.onClick(this.state.tag, this.mRefMenu.current, false)
        }
    }

    /**
     * Change contents
     * @param contentLeft {any}
     * @param content {any}
     * @param contentRich {any}
     */
    setContent(contentLeft, content, contentRich){
        const s=Object.assign({}, this.state)
        s.content= {
            contentLeft:contentLeft,
            content:content,
            contentRich:contentRich
        };
        this.setState(s);
    }

    /**
     * Change url
     * @param url {string}
     */
    setUrl(url){
        const s=Object.assign({}, this.state)
        s.url=url;
        this.setState(s);
    }

    /**
     * Change tag
     * @param tag {any}
     */
    SetTag(tag){
        const s=Object.assign({}, this.state)
        s.tag=tag;
        this.setState(s);
    }


    _getUrl(){
        if(this.props.positionPopup==='dropDown'){

            if(this.state.url){
                return this.state.url+"&state="+this.stateDropMemu
            }
        }else{
            return this.state.url;
        }
    }


    render() {

        return (
            <object>
                <a href={this._getUrl()} data-wrapper ref={this.mRefWrapper}>
                    <div ref={this.mRefMenu}

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
                         data-menu-tag={this.state.tag}
                         disabled={this.state.disabled}
                         className={this.props.className}>
                        {

                            this.props.buildContent({
                                contentLeft: this.state.content.contentLeft,
                                contentCenter: this.state.content.content,
                                contentRight: this.state.content.contentRight,
                                iconDropClose: this.props.iconDropClose,
                                iconDropOpen: this.props.iconDropOpen,
                                isOpenDrop: this.state.dropOpen,
                                id: this.props.id,
                                tag: this.state.tag
                            })
                        }
                    </div>
                    <div
                        data-memu-poopup={this.state.tag}
                        disabled={this.state.disabled}
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
                </a>
            </object>


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
    children: PropTypes.node,
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
    //key: PropTypes.string,
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

    style: stylePropType,
    tabIndex: PropTypes.number,
    title: PropTypes.string,
    tag: PropTypes.any,
    url:PropTypes.string
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

