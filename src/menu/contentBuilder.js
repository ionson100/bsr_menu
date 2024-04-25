import './menu.css';
import React from "react";
import PropTypes from "prop-types";


const buildContent = ({content, icon, iconOpen, iconClose, positionImage: positionIcon, isOpenPanel}) => {


    if (iconOpen && iconClose) {
        if (isOpenPanel === true) {
            icon = iconOpen
        } else {
            icon = iconClose
        }

    }


    if (content && !icon) {
        return (
            <div className='container'>
                <div  className='vertical-center'>
                    <div className='content-123-text-center'>{content}</div>
                </div>
            </div>
        );
    }
    if (!content && icon) {
        return (
            <div className='container'>
                <div  className='center-icon'>
                    {icon}
                </div>
            </div>
        )
    }
    if (content && icon && positionIcon === 'left') {
        return (


            <div className='container'>
                <div  className='vertical-center'>
                    <div className='content-123-icon-left'>{icon}</div>
                    <div className='content-123-text-right'>{content}</div>
                </div>
            </div>


        )
    }
    if (content && icon && positionIcon === 'right') {
        return (
            <div className='container'>
                <div  className='vertical-center'>
                    <div className='content-123-text-left'>{content}</div>
                    <div className='content-123-icon-right'>{icon}</div>
                </div>
            </div>

    )
    }

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
