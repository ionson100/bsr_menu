// eslint-disable-next-line no-unused-vars
import {CloseMenu, MenuHorizontalBand, MenuItem, MenuVerticalBand} from "./menu";
// eslint-disable-next-line no-unused-vars
import {FaChevronRight} from "react-icons/fa";
import React, {Component} from 'react';
// eslint-disable-next-line no-unused-vars


// eslint-disable-next-line no-unused-vars
import {FaAngleDoubleRight} from "react-icons/fa";
// eslint-disable-next-line no-unused-vars
import {FaAngleDoubleDown} from "react-icons/fa";



const styleRoot = {
    width: "200px"
}
function Content(name){
    return(
        <div style={{display:"flex"}}>
            {<FaChevronRight style={{width:"20%",paddingTop:"2px"}}/>}
            <div style={{width:"80%"}}>{name}</div>
            {<FaChevronRight style={{width:"20%",paddingTop:"2px"}}/>}
        </div>
    )
}
function ContentBig(){
    return(
        <div className='big' onClick={(e)=>{
            e.stopPropagation()
        }}>
            <table>
                <tr>
                    <th>Company</th>
                    <th>Contact</th>
                    <th>Country</th>
                </tr>
                <tr>
                    <td>Alfreds Futterkiste</td>
                    <td>Maria Anders</td>
                    <td>Germany</td>
                </tr>
                <tr>
                    <td>Centro comercial Moctezuma</td>
                    <td>Francisco Chang</td>
                    <td>Mexico</td>
                </tr>
            </table>
            <button onClick={()=>{
                CloseMenu(()=>{
                    console.log("close menu")
                });
            }}> Close</button>
        </div>

    )
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
                    <MenuItem style={styleRoot} behavior='click' content={Content('File')}>
                        <MenuItem positionPopup='downRight' behavior='move'  content='Level 2-1' contentRight={<FaChevronRight/>}>
                            <MenuItem behavior='move' positionPopup='downRight' contentLeft=' ' o content='Level 3-1'>
                                <MenuItem className='big' content={ContentBig}  tag='asss' >

                                </MenuItem>

                            </MenuItem>
                            <MenuItem contentLeft=' ' content='Level 2-2'>
                            </MenuItem>
                        </MenuItem>
                        <MenuItem positionPopup='downRight' behavior='move' contentLeft=' '  content='Level 2-1' contentRight=' '>
                            <MenuItem behavior='move' positionPopup='downRight' content='Level 2-1'>
                                <MenuItem content='Level 4-1 list' onClick={() => {

                                }}>
                                </MenuItem>
                                <MenuItem content='Level 4-2'>
                                </MenuItem>
                            </MenuItem>
                            <MenuItem content='Level 2-2'>
                            </MenuItem>
                        </MenuItem>
                    </MenuItem>
                    <MenuItem style={styleRoot} behavior='click' contentRight='SuperRoot'>
                        <MenuItem positionPopup='downRight' behavior='move' content='Level 2-1'>
                            <MenuItem behavior='move' positionPopup='downRight' content='Level 3-1'>
                                <MenuItem content='Level 4-1 list' onClick={() => {

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
                                <MenuItem content='Level 4-1 list' onClick={() => {

                                }}>
                                </MenuItem>
                                <MenuItem content='Level 4-2'>
                                </MenuItem>
                            </MenuItem>
                            <MenuItem content='Level 2-2'>
                            </MenuItem>
                        </MenuItem>
                    </MenuItem>
                    <MenuItem content="Test" positionPopup='details'>
                        <MenuItem content='sdsd'></MenuItem>
                        <MenuItem content='sdsd'></MenuItem>
                        <MenuItem content='sdsd'></MenuItem>
                        <MenuItem content='sdsd'></MenuItem>

                    </MenuItem>
                </div>

            </div>

        );
    }


}

export default MenuConst;
