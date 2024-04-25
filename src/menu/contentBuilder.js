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

            <table>
                <td className='content-123-text'>{content}</td>
            </table>
        );
    }
    if (!content && icon) {
        return (
            <table>
                <td className='content-123-icon'>{icon}</td>
            </table>
        )
    }
    if (content && icon && positionIcon === 'left') {
        return (

            <table>
                <td className='content-123-icon'>{icon}</td>
                <td className='content-123-text'>{content}</td>
            </table>

        )
    }
    if (content && icon && positionIcon === 'right') {
        return (
            <table>

                <td className='content-123-text'>{content}</td>
                <td className='content-123-icon'>{icon}</td>


            </table>
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
