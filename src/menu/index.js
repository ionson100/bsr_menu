import './menu.css';
import React, {Component} from "react";

import PropTypes from "prop-types";
// eslint-disable-next-line no-unused-vars
import stylePropType from 'react-style-proptype';

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


const isFunction = value => value ? (Object.prototype.toString.call(value) === "[object Function]" || "function" === typeof value || value instanceof Function) : false;

export const MenuItem = class extends Component {

    constructor(props) {
        super(props);



        this.position = this.props.position ?? 'down'
        this.content = this.props.content;
        this.mRefMenu = React.createRef();
        this.mRefWrapper=React.createRef();
        this.mRefPopup = React.createRef();
        this.width = this.props.width;
        this.icon = this.props.icon

        this.onClick = this.props.onClick;
        this.disabled=this.props.disabled;



        if (isFunction(this.content)) {
            this.content = this.content();
        }
        this._MyMenu = {
            state: false
        }
        if (this.props.behavior === "move") {
            this._MyMenu.state = true;
        }



    }

    visibilityPane() {

        if (this.position === "down") {
            const y = this.mRefMenu.current.offsetTop + this.mRefMenu.current.offsetHeight;
            this.mRefPopup.current.style.top = `${y}px`;
            this.mRefPopup.current.style.left = this.mRefMenu.current.offsetLeft + "px";
        }
        if (this.position === "top") {
            const y = this.mRefMenu.current.offsetTop - this.mRefPopup.current.offsetHeight;
            this.mRefPopup.current.style.top = `${y}px`;
            this.mRefPopup.current.style.left = this.mRefMenu.current.offsetLeft + "px";
        }
        if (this.position === "downRight") {
            const y = this.mRefMenu.current.offsetTop + 5;
            this.mRefPopup.current.style.top = `${y}px`;
            this.mRefPopup.current.style.left = this.mRefMenu.current.offsetLeft + this.mRefMenu.current.offsetWidth - 5 + "px";
        }
        if (this.position === "topRight") {
            const y = this.mRefMenu.current.offsetTop -this.mRefPopup.current.offsetHeight+this.mRefMenu.current.offsetHeight-5;
            this.mRefPopup.current.style.top = `${y}px`;
            this.mRefPopup.current.style.left = this.mRefMenu.current.offsetLeft + this.mRefMenu.current.offsetWidth - 5 + "px";
        }
        if (this.position === 'downLeft') {
            const y = this.mRefMenu.current.offsetTop + 5;
            this.mRefPopup.current.style.top = `${y}px`;
            this.mRefPopup.current.style.left = this.mRefMenu.current.offsetLeft - this.mRefPopup.current.offsetWidth + 5 + "px";
        }
        if (this.position === 'topLeft') {
            const y = this.mRefMenu.current.offsetTop -this.mRefPopup.current.offsetHeight+this.mRefMenu.current.offsetHeight-5;
            this.mRefPopup.current.style.top = `${y}px`;
            this.mRefPopup.current.style.left = this.mRefMenu.current.offsetLeft - this.mRefPopup.current.offsetWidth + 5 + "px";
        }

        if (this.props.children) {

            this.mRefPopup.current.style.visibility = "visible"
            this.mRefPopup.current.style.display = "block"
        }
    }

    click(e) {
        if (this.position !== 'details') {
            this._MyMenu.state = true;
            this.visibilityPane()
        } else {
            if (!this.mRefPopup.current.style.display || this.mRefPopup.current.style.display === 'none') {
                this.mRefPopup.current.style.display = 'block'

            } else {
                this.mRefPopup.current.style.display = 'none'

            }

        }


        if (this.onClick) {
            this.onClick(e)
        }


    }

    out(e) {


        if (this.props.position !== 'details') {

            this.mRefPopup.current.style.visibility = "hidden"

            if (this.props.behavior === "click") {
                setTimeout(() => {
                    this._MyMenu.state = false;
                }, 100)
            }
        }



        if (this.onMouseEnter) {
            this.onMouseEnter(e)
        }
    }

    move(e) {

        if (this._MyMenu.state === true) {
            this.visibilityPane()

        }
        if (this.onMouseMove) {
            this.onMouseMove(e)
        }
    }

    movePane() {

        this.mRefPopup.current.style.visibility = "visible"
    }


    renderInner() {
        if (this.content && !this.icon) {
            return this.content;
        }
        if (this.content && this.icon) {
            return (
                <div style={{display: "flex"}}>
                    {this.icon} {this.content}
                </div>
            )
        }
        if (!this.content && this.icon) {
            return this.icon
        }
    }

    componentDidMount() {
        this.mRefMenu.current.style.display='block'
        this.mRefPopup.current.style.width = `${this.width}px`;
        this.setDisabled(this.disabled,true)
    }
    setDisabled(b,force){
        this.disabled=b;
        if(b===true){
            this.mRefWrapper.current.style.cursor='not-allowed'

        }else{
            this.mRefWrapper.current.style.cursor='default'
        }
        if(!force){
            this.forceUpdate()
        }
    }
    open(){
        if(this.props.children){
            this.mRefPopup.current.style.visibility = "visible"
            this.mRefPopup.current.style.display = "block"
        }

    }
    close(){
        this.mRefPopup.current.style.visibility = "hidden"
        this.mRefPopup.current.style.display = "none"
    }


    render() {
        return (

            <div ref={this.mRefWrapper}>
                <div ref={this.mRefMenu}
                     disabled={this.disabled}
                     onSelect={this.props.onSelect}
                     style={this.props.style}
                     id={this.props.id}
                     key={this.props.key}
                     onKeyUp={this.props.onKeyUp}
                     onClick={this.click.bind(this)}
                     onMouseEnter={this.props.onMouseEnter}
                     onMouseDown={this.props.onMouseDown}
                     onMouseDownCapture={this.props.onMouseDownCapture}
                     onMouseLeave={this.props.onMouseLeave}
                     onMouseUp={this.props.onMouseUp}
                     onMouseOverCapture={this.props.onMouseOverCapture}
                     onMouseOutCapture={this.props.onMouseOutCapture}
                     onMouseMoveCapture={this.props.onMouseMoveCapture}
                     onMouseOver={this.onMouseOver}
                     onMouseUpCapture={this.props.onMouseUpCapture}
                     onMouseMove={this.move.bind(this)}
                     onMouseOut={this.out.bind(this)}
                     accessKey={this.props.accessKey}
                     title={this.props.title}
                     tabIndex={this.props.tabIndex}
                     className={this.props.className}>
                    {
                        this.renderInner()
                    }
                </div>
                <div
                    disabled={false}
                    onMouseOut={this.out.bind(this)}
                    onMouseMove={this.movePane.bind(this)}
                    ref={this.mRefPopup}  //editor-menu-pane
                    className={this.props.popupClassName}>
                    {
                        this.props.children === undefined ? (<></>) : this.props.children
                    }
                </div>
            </div>

        );
    }
}
MenuItem.propTypes = {
    children: PropTypes.object,
    content: PropTypes.object.isRequired,
    width: PropTypes.number,
    icon: PropTypes.object,
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
    style: stylePropType,
    ref: PropTypes.element,
    behavior: PropTypes.oneOf(['move', 'click']),
    accessKey:PropTypes.string,
    tabIndex:PropTypes.number,


    onSelect: PropTypes.func,
    id: PropTypes.string,
    key: PropTypes.string,
    onKeyUp: PropTypes.func,
    disabled:PropTypes.bool,
    title:PropTypes.string,
    timedOut:PropTypes.number,



    popupClassName: PropTypes.string,
    position: PropTypes.oneOf(['down','top', 'downLeft', 'downRight', 'topRight', 'topLeft', 'details']),


};
MenuItem.defaultProps = {
    timedOut:200,
    disabled:false,
    behavior: 'click',
    width: 200,
    popupClassName: 'menu-123-pane'
};
MenuItem.displayName = 'MenuItem';

