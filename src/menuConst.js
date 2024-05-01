// eslint-disable-next-line no-unused-vars
import {CloseMenu, MenuHorizontalBand, MenuItem, MenuVerticalBand} from "./menu";
// eslint-disable-next-line no-unused-vars
import {FaChevronRight} from "react-icons/fa";
import React, {Component, useState} from 'react';
// eslint-disable-next-line no-unused-vars


// eslint-disable-next-line no-unused-vars
import {FaAngleDoubleRight} from "react-icons/fa";
// eslint-disable-next-line no-unused-vars
import {FaAngleDoubleDown} from "react-icons/fa";


const styleRoot = {
    width: "200px"
}

function Content(name) {
    return (
        <div style={{display: "flex"}}>
            {<FaChevronRight style={{width: "20%", paddingTop: "2px"}}/>}
            <div style={{width: "80%"}}>{name}</div>
            {<FaChevronRight style={{width: "20%", paddingTop: "2px"}}/>}
        </div>
    )
}

function ContentBig() {
    return (
        <div className='big' onClick={(e) => {
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
            <button onClick={() => {
                CloseMenu(() => {
                    console.log("close menu")
                });
            }}> Close
            </button>
        </div>

    )
}

// eslint-disable-next-line no-unused-vars
let chech = true;

function CheckBox() {
    const [x, setX] = useState(chech);

    const soldCheckbox = ({target: {checked}}) => {
        // console.log(x, checked);
        setX(checked);
    };
    return (
        <div>
            <input type="checkbox" onClick={(e) => {
                e.stopPropagation()
            }} checked={x} onChange={soldCheckbox}/>
        </div>
    );
}

function Radio() {
    const [value, setValue] = useState(1);

    function chengeValue() {
        setValue(event.target.value);
    }

    return <div style={{width:"200px",display:"table",marginLeft:"-10px"}}  >

        <div style={{display:"table-row",margin:"10px"}}>
            <label style={{display:"table-cell",paddingLeft:"10px"}} >Regular 1</label>
            <input  style={{display:"table-cell",marginLeft:90}} type="radio" name="radio" value="1" onClick={(e) => {
                e.stopPropagation()
            }}
                   checked={value == '1' ? true : false}
                   onChange={chengeValue}/>
        </div>
        <div style={{display:"table-row"}}>
            <label  style={{display:"table-cell",paddingLeft:"10px"}} >Regular 2</label>
            <input   style={{display:"table-cell",marginLeft:90}} type="radio" name="radio" value="2" onClick={(e) => {
                e.stopPropagation()
            }}
                   checked={value == '2' ? true : false}
                   onChange={chengeValue}/>
        </div>









    </div>;
}


export class MenuConst extends Component {
    constructor(props) {
        super(props);
        this.mRefMenu = React.createRef();
        this.mRefMenuDisable = React.createRef();
        this.mRefMenuPop = React.createRef();
    }

    componentDidMount() {
        // console.log(this.mRefMenu)
    }

    render() {
        return (
            <div>

                <button onClick={() => {
                    this.mRefMenuDisable.current.SetDisabled(true)
                }}>Disabled
                </button>
                <button onClick={() => {
                    this.mRefMenuDisable.current.SetDisabled(false)
                }}>UnDisabled
                </button>

                <button onClick={() => {
                    this.mRefMenu.current.Open()
                }}>open
                </button>

                <button onClick={() => {
                    this.mRefMenu.current.Close()
                }}>close
                </button>

                <button onClick={() => {

                    this.mRefMenu.current.wrapper.style.display="none"
                }}>DysplayNot
                </button>

                <button onClick={() => {
                    this.mRefMenu.current.wrapper.style.display="block"
                }}>DysplayYes
                </button>


                <div className='editor-toolbar'>
                    <MenuItem ref={this.mRefMenu} style={styleRoot} behavior='click' tag={'23'} content={Content('File')}>
                        <MenuItem ref={this.mRefMenuDisable} positionPopup='downRight' behavior='move'
                                  content='Level 2-1' contentRight={<FaChevronRight/>}>
                            <MenuItem behavior='move' positionPopup='downRight' contentLeft=' ' o content='Level 3-1'>
                                <MenuItem className='big' content={ContentBig} tag='asss'>

                                </MenuItem>

                            </MenuItem>
                            <MenuItem contentLeft=' ' content='Level 2-2'>
                            </MenuItem>
                        </MenuItem>
                        <MenuItem positionPopup='downRight' behavior='move' contentLeft=' ' content='Level 2-1'
                                  contentRight=' '>
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
                        <MenuItem positionPopup='downLeft' behavior='move' content='Level 2-1'>
                            <MenuItem behavior='move' positionPopup='downLeft' content='Level 3-1'>
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
                            <MenuItem behavior='move' positionPopup='downLeft' content='Level 2-1'>
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
                    <MenuItem content="Test" positionPopup='dropDown' iconDropClose={<FaChevronRight/>}
                              iconDropOpen={<FaAngleDoubleDown/>}  behavior='click'>
                        <MenuHorizontalBand className='divWide'/>
                        <MenuItem content='test1' positionPopup='downRight' contentRight={<FaChevronRight/>} behavior='move'>
                            <MenuHorizontalBand className='divWide'/>
                            <MenuItem content='menu form' contentRight={<CheckBox/>} tag={3} onClick={() => {}}></MenuItem>
                            <MenuHorizontalBand/>
                            <MenuItem content='menu 1' positionPopup='downRight' contentRight={<FaChevronRight/>}>
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
                            <MenuHorizontalBand/>
                            <MenuItem  className='radio'
                                      content={<Radio/>}></MenuItem>
                        </MenuItem>
                        <MenuItem content='test2' contentRight={<FaChevronRight/>}></MenuItem>
                        <MenuItem content='test3' contentRight={<FaChevronRight/>}></MenuItem>
                        <MenuHorizontalBand/>
                        <MenuItem content='test4 check' onClick={() => {

                            alert(1)
                        }} contentRight={<CheckBox/>}></MenuItem>
                        <MenuHorizontalBand className='divWide'/>

                    </MenuItem>
                </div>

            </div>

        );
    }


}

export default MenuConst;
