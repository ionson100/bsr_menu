import './menu.css';
import React from "react";
import PropTypes from "prop-types";


const isFunction = value => value ? (Object.prototype.toString.call(value) === "[object Function]" || "function" === typeof value || value instanceof Function) : false;

const buildContent = ({contentLeft, contentCenter, contentRight}) => {

    if (isFunction(contentLeft)) {
        contentLeft = contentLeft();
    }
    if (isFunction(contentCenter)) {
        contentCenter = contentCenter();
    }
    if (isFunction(contentRight)) {
        contentRight = contentRight();
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

                <div className='box'>
                    <div className='content-123-left-10'>{contentLeft}</div>
                    <div className='content-123-center-90 t-over'>{contentCenter}</div>
                </div>

        )
    }
    if (contentLeft && contentCenter && contentRight) {
        return (

                <div className='box'>
                    <div className='content-123-left-10'>{contentLeft}</div>
                    <div className='content-123-center-80 t-over'>{contentCenter}</div>
                    <div className='content-123-right-10'>{contentRight}</div>
                </div>

        )
    }
    if (!contentLeft && contentCenter && contentRight) {
        return (

                <div className='box'>
                    <div   className='  content-123-center-90 t-over'>{contentCenter}</div>
                    <div className='content-123-right-10'>{contentRight}</div>

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
}

buildContent.propTypes = {
    content: PropTypes.object,
    contentLeft: PropTypes.object,
    contentRight: PropTypes.object,
}
export default buildContent;
