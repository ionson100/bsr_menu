// eslint-disable-next-line no-unused-vars
import {MenuHorizontalBand, MenuItem, MenuVerticalBand} from "./menu";
// eslint-disable-next-line no-unused-vars
import {FaChevronRight} from "react-icons/fa";
import React, {Component} from 'react';

// eslint-disable-next-line no-unused-vars
import {FaAngleDoubleRight} from "react-icons/fa";
// eslint-disable-next-line no-unused-vars
import {FaAngleDoubleDown} from "react-icons/fa";


const styleRoot = {
    width: "100px"
}

export class MenuConst extends Component {
    constructor(props) {
        super(props);
        this.mRefMenu = React.createRef();
        this.mRefMenuPop = React.createRef();
    }

    componentDidMount() {
        // console.log(this.mRefMenu)
    }

    render() {
        return (
            <div>
                <button onClick={() => {
                    this.mRefMenu.current.setDisabled(true)
                }}>Disabled
                </button>
                <button onClick={() => {
                    this.mRefMenu.current.setDisabled(false)
                }}>UnDisabled
                </button>

                <button onClick={() => {
                    this.mRefMenu.current.open()
                }}>open
                </button>

                <button onClick={() => {
                    this.mRefMenu.current.close()
                }}>close
                </button>

                <button onClick={() => {
                    this.mRefMenuPop.current.open()
                }}>openPopUp
                </button>

                <button onClick={() => {
                    this.mRefMenuPop.current.close()
                }}>closePopUp
                </button>


                <div className='editor-toolbar'>
                    <MenuItem style={styleRoot} behavior='click' content='SuperRoot'>
                        <MenuItem positionPopup='downRight' behavior='move' content='Level 2-1'>
                            <MenuItem behavior='move' positionPopup='downRight' content='Level 3-1'>
                                <MenuItem content='Level 4-1 click' tag='asss' onClick={(t)=>{

                                    alert(t)
                                }}>
                                </MenuItem>
                                <MenuItem content='Level 4-2'>
                                </MenuItem>
                            </MenuItem>
                            <MenuItem content='Level 2-2'>
                            </MenuItem>
                        </MenuItem>
                        <MenuItem positionPopup='downRight' behavior='move' content='Level 2-1'>
                            <MenuItem behavior='move' positionPopup='downRight' content='Level 2-1'>
                                <MenuItem content='Level 4-1 list' onClick={()=>{

                                }}>
                                </MenuItem>
                                <MenuItem content='Level 4-2'>
                                </MenuItem>
                            </MenuItem>
                            <MenuItem content='Level 2-2'>
                            </MenuItem>
                        </MenuItem>
                    </MenuItem>
                    <MenuItem style={styleRoot} behavior='click' content='SuperRoot'>
                        <MenuItem positionPopup='downRight' behavior='move' content='Level 2-1'>
                            <MenuItem behavior='move' positionPopup='downRight' content='Level 3-1'>
                                <MenuItem content='Level 4-1 list' onClick={()=>{

                                }}>
                                </MenuItem>
                                <MenuItem content='Level 4-2'>
                                </MenuItem>
                            </MenuItem>
                            <MenuItem content='Level 2-2'>
                            </MenuItem>
                        </MenuItem>
                        <MenuItem positionPopup='downRight' behavior='move' content='Level 2-1'>
                            <MenuItem behavior='move' positionPopup='downRight' content='Level 2-1'>
                                <MenuItem content='Level 4-1 list' onClick={()=>{

                                }}>
                                </MenuItem>
                                <MenuItem content='Level 4-2'>
                                </MenuItem>
                            </MenuItem>
                            <MenuItem content='Level 2-2'>
                            </MenuItem>
                        </MenuItem>
                    </MenuItem>
                </div>
            </div>

        );
    }


}

export default MenuConst;
