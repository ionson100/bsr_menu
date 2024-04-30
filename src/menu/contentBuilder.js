import React from "react";



const isFunction = value => value ? (Object.prototype.toString.call(value) === "[object Function]" || "function" === typeof value || value instanceof Function) : false;


// eslint-disable-next-line no-unused-vars
const buildContent = ({contentLeft, contentCenter, contentRight,iconDropOpen,iconDropClose,isOpenDrop,id,tag}) => {

    if (isFunction(contentLeft)) {
        contentLeft = contentLeft();
    }
    if (isFunction(contentCenter)) {
        contentCenter = contentCenter();
    }
    if (isFunction(contentRight)) {
        contentRight = contentRight();
    }
    if (isFunction(iconDropOpen)) {
        iconDropOpen = iconDropOpen();
    }
    if (isFunction(iconDropClose)) {
        iconDropClose = iconDropClose();
    }
    if(iconDropClose&&iconDropOpen){
        if(isOpenDrop===true){
            contentRight=iconDropOpen;
        }else if(isOpenDrop===false){
            contentRight=iconDropClose;
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


export default buildContent;
