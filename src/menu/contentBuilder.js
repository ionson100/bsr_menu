import './menu.css';
import React from "react";
import PropTypes from "prop-types";


const isFunction = value => value ? (Object.prototype.toString.call(value) === "[object Function]" || "function" === typeof value || value instanceof Function) : false;

const buildContent = ({contentLeft, contentCenter, contentRight, iconOpen, iconClose, isOpenPanel}) => {


    if (isFunction(contentLeft)) {
        contentLeft = contentLeft();
    }
    if (isFunction(contentCenter)) {
        contentCenter = contentCenter();
    }
    if (isFunction(contentRight)) {
        contentRight = contentRight();
    }
    if (isFunction(iconOpen)) {
        iconOpen = iconOpen();
    }
    if (isFunction(iconClose)) {
        iconClose = iconClose();
    }
    if (iconOpen && iconClose) {
        if (isOpenPanel === true) {
            contentRight = iconOpen
        } else {
            contentRight = iconClose
        }

    }
    if (!contentLeft && contentCenter && !contentRight) {
        return (
            <div className='container'>
                <div className='vertical-center'>
                    <div className='content-123-center-100'>{contentCenter}</div>
                </div>
            </div>
        )
    }
    if (contentLeft && contentCenter && !contentRight) {
        return (
            <div className='container'>
                <div className='vertical-center'>
                    <div className='content-123-left-10'>{contentLeft}</div>
                    <div className='content-123-center-90 t-over'>{contentCenter}</div>
                </div>
            </div>
        )
    }
    if (contentLeft && contentCenter && contentRight) {
        return (
            <div className='container'>
                <div className='vertical-center'>
                    <div className='content-123-left-10'>{contentLeft}</div>
                    <div className='content-123-center-80 t-over'>{contentCenter}</div>
                    <div className='content-123-right-10'>{contentRight}</div>
                </div>
            </div>
        )
    }
    if (!contentLeft && contentCenter && contentRight) {
        return (
            <div className='container'>
                <div className='vertical-center'>
                    <div className='content-123-center-90 t-over'>{contentCenter}</div>
                    <div className='content-123-right-10'>{contentRight}</div>
                </div>
            </div>
        )
    }
    if (contentLeft && !contentCenter && !contentRight) {
        return (
            <div className='container'>
                <div className='center-icon'>
                    <div className='content-123-left-100'>{contentLeft}</div>
                </div>
            </div>
        )
    }

    if (!contentLeft && !contentCenter && contentRight) {
        return (
            <div className='container'>
                <div className='center-icon'>
                    <div className='content-123-right-100'>{contentRight}</div>
                </div>
            </div>
        )
    }


    // if (contentCenter && !contentLeft) {
    //     return (
    //         <div className='container'>
    //             <div className='vertical-center'>
    //                 <div className='content-123-text-center t-over'>{contentCenter}</div>
    //             </div>
    //         </div>
    //     );
    // }
    // if (!contentCenter && contentLeft) {
    //     return (
    //         <div className='container'>
    //             <div className='center-icon'>
    //                 {contentLeft}
    //             </div>
    //         </div>
    //     )
    // }
    // if (contentCenter && contentLeft) {
    //     return (
    //
    //
    //         <div className='container'>
    //             <div className='vertical-center'>
    //                 <div className='content-123-icon-left'>{contentLeft}</div>
    //                 <div className='content-123-text-right t-over'>{contentCenter}</div>
    //             </div>
    //         </div>
    //
    //
    //     )
    // }
    // if (contentCenter && contentLeft) {
    //     return (
    //         <div className='container'>
    //             <div className='vertical-center'>
    //                 <div className='content-123-text-left t-over'>{contentCenter}</div>
    //                 <div className='content-123-icon-right'>{contentLeft}</div>
    //             </div>
    //         </div>
    //
    //     )
    // }

}
buildContent.propTypes = {
    content: PropTypes.object,
    icon: PropTypes.element,
    iconOpen: PropTypes.element,
    iconClose: PropTypes.element,
    positionImage: PropTypes.oneOf(['left', 'right']),
    isOpenPanel: PropTypes.bool
}
export default buildContent;
