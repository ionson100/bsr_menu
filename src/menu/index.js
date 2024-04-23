import './menu.css';
import React, {Component} from "react";

import PropTypes from "prop-types";
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
const _MyMenu={
    state:false
}




const isFunction = value => value ? (Object.prototype.toString.call(value) === "[object Function]" || "function" === typeof value || value instanceof Function) : false;

export const MenuItem = class extends Component {
    constructor(props) {
        super(props);
        this.position=this.props.position??'down'
        this.content = this.props.content;
        this.mRefBase = React.createRef();
        this.mRefPane = React.createRef();
        this.width = this.props.width;
        this.icon = this.props.icon
        this.className = this.props.className??'menu-123-item'
        this.onClick = this.props.onClick;
        this.onMouseEnter = this.props.onMouseEnter
        this.onMouseDown = this.props.onMouseDown
        this.onMouseDownCapture = this.props.onMouseDownCapture
        this.onMouseLeave = this.props.onMouseLeave
        this.onMouseUp = this.props.onMouseUp
        this.onMouseOverCapture = this.props.onMouseOverCapture
        this.onMouseOutCapture = this.props.onMouseOutCapture
        this.onMouseMoveCapture = this.props.onMouseMoveCapture
        this.onMouseOver = this.props.onMouseOver
        this.onMouseUpCapture = this.props.onMouseUpCapture
        this.onMouseMove = this.props.onMouseMove
        this.onMouseOut = this.props.onMouseOut
        this.onSelect = this.props.onSelect
        this.style = this.props.style
        this.id = this.props.id
        this.key = this.props.key
        this.onKeyUp = this.props.onKeyUp

        this.classNamePanel = this.props.classNamePanel;
        if (isFunction(this.content)) {
            this.content = this.content();
        }


    }

    visibilityPane() {

        if(this.position==="down"){
            const y = this.mRefBase.current.offsetTop + this.mRefBase.current.offsetHeight;
            this.mRefPane.current.style.top = `${y}px`;
            this.mRefPane.current.style.left = this.mRefBase.current.offsetLeft + "px";
        }
        if(this.position==="downRight"){
            const y = this.mRefBase.current.offsetTop;
            this.mRefPane.current.style.top = `${y}px`;
            this.mRefPane.current.style.left = this.mRefBase.current.offsetLeft+this.mRefBase.current.offsetWidth -5 + "px";
        }
        if(this.position==='downLeft'){
            const y = this.mRefBase.current.offsetTop;
            this.mRefPane.current.style.top = `${y}px`;
            this.mRefPane.current.style.left = this.mRefBase.current.offsetLeft-this.mRefPane.current.offsetWidth +5 + "px";
        }

        if (this.props.children) {
            this.mRefPane.current.style.visibility = "visible"
        }
    }

    click(e) {
        _MyMenu.state = true;
        this.visibilityPane()

        if (this.onClick) {
            this.onClick(e)
        }


    }

    out(e) {
        this.mRefPane.current.style.visibility = "hidden"
        if (this.onMouseEnter) {
            this.onMouseEnter(e)
        }
    }

    move(e) {
        if (_MyMenu.state === true) {
            this.visibilityPane()

        }
        if (this.onMouseMove) {
            this.onMouseMove(e)
        }
    }

    movePane() {
        this.mRefPane.current.style.visibility = "visible"
    }

    componentDidMount() {
        this.mRefPane.current.style.width = `${this.width}px`;
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


    render() {

        //alert(this.props.children)
        return (

            <>

                <div ref={this.mRefBase}
                     onSelect={this.onSelect}
                     style={this.style}
                     id={this.id}
                     key={this.key}
                     onKeyUp={this.onKeyUp}
                     onClick={this.click.bind(this)}
                     onMouseEnter={this.onMouseEnter}
                     onMouseDown={this.onMouseDown}
                     onMouseDownCapture={this.onMouseDownCapture}
                     onMouseLeave={this.onMouseLeave}
                     onMouseUp={this.onMouseUp}
                     onMouseOverCapture={this.onMouseOverCapture}
                     onMouseOutCapture={this.onMouseOutCapture}
                     onMouseMoveCapture={this.onMouseMoveCapture}
                     onMouseOver={this.onMouseOver}
                     onMouseUpCapture={this.onMouseUpCapture}
                     onMouseMove={this.move.bind(this)}
                     onMouseOut={this.out.bind(this)}
                     className={this.className}>
                    {
                        this.renderInner()
                    }
                </div>
                <div
                    onMouseOut={this.out.bind(this)}
                    onMouseMove={this.movePane.bind(this)}
                    ref={this.mRefPane}  //editor-menu-pane
                    className='menu-123-pane'>
                    {
                        this.props.children === undefined ? (<></>) : this.props.children
                    }
                </div>


            </>

        );
    }
}
MenuItem.propTypes = {
    children:PropTypes.object,
    content: PropTypes.object.isRequired | undefined,
    width: PropTypes.number | undefined,
    icon: PropTypes.object | undefined,
    className: PropTypes.string | undefined,
    onClick: PropTypes.func | undefined,
    onMouseEnter: PropTypes.func | undefined,
    onMouseDown: PropTypes.func | undefined,
    onMouseDownCapture: PropTypes.func | undefined,
    onMouseLeave: PropTypes.func | undefined,
    onMouseUp: PropTypes.func | undefined,
    onMouseOverCapture: PropTypes.func | undefined,
    onMouseOutCapture: PropTypes.func | undefined,
    onMouseMoveCapture: PropTypes.func | undefined,
    onMouseOver: PropTypes.func | undefined,
    onMouseUpCapture: PropTypes.func | undefined,
    onMouseMove: PropTypes.func | undefined,
    onMouseOut: PropTypes.func | undefined,
    style: stylePropType,
    onSelect: PropTypes.func | undefined,
    id: PropTypes.string | undefined,
    key: PropTypes.string | undefined,
    onKeyUp: PropTypes.func | undefined,


    classNamePanel: PropTypes.string | undefined,
    position:PropTypes.oneOf(['down', 'downLeft',"downRight"]),


};
MenuItem.defaultProps = {
    width: 200,
    classNamePanel:'menu-123-pane'
};
MenuItem.displayName = 'MenuItem';

