import {MenuHorizontalBand, MenuItem, MenuVerticalBand} from "./menu";
import {FaChevronRight} from "react-icons/fa";
import React, {Component} from 'react';

import {FaAngleDoubleRight} from "react-icons/fa";
import {FaAngleDoubleDown} from "react-icons/fa";


const Add = (image, text) => {
    return (
        <div style={{display: "flex"}}>
            <span style={{width: "100%"}}>{text}</span>{image}
        </div>
    );
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
                    <MenuItem
                        className='m200'
                        accessKey='s'
                        behavior='move'
                        ref={this.mRefMenu}
                        style={{width: "50px",padding:"0"}}
                        icon={(<span>File</span>)}
                    >
                        <MenuItem

                            style={{width:"200px"}}
                            accessKey='x'
                            icon={<FaChevronRight size={10}/>}
                            positionIcon='right'
                            behavior='move'
                            positionPopup='downRight'
                            content='testing'
                        >
                            <MenuItem content='Sub Menu' />
                            <MenuHorizontalBand/>
                            <MenuItem content='Sub Menu' />
                            <MenuHorizontalBand/>
                            <MenuItem content='Sub Menu' />
                            <MenuHorizontalBand/>
                            <MenuItem content='Sub Menu' />
                        </MenuItem>
                        <MenuHorizontalBand/>

                    </MenuItem>
                    <MenuVerticalBand/>
                    <MenuItem

                        style={{width:"50px"}}
                        content={(<div style={{width: "auto", textAlign: "center"}}>File</div>)}
                    >
                        <MenuItem

                            positionPopup='details'
                            positionIcon='left'
                            icon={<FaChevronRight size={15}/>}
                            content='test125'>
                            <MenuItem content='Sub Menu3' />
                            <MenuHorizontalBand/>
                            <MenuItem content='Sub Menu3' />
                            <MenuHorizontalBand/>
                            <MenuItem content='Sub Menu3' />
                            <MenuHorizontalBand/>
                            <MenuItem content='Sub Menu3' />

                        </MenuItem>
                        <MenuHorizontalBand/>
                        <MenuItem
                            positionPopup='downRight'
                            content={Add(<FaChevronRight size={15} className='editor-icon'/>, 'Testing')}>
                            <MenuItem content='Sub Menu'/>
                            <MenuHorizontalBand/>
                            <MenuItem content='Sub Menu image' icon={<FaAngleDoubleDown size={12}/>}/>
                            <MenuHorizontalBand/>
                            <MenuItem content='Sub Menu'/>
                            <MenuHorizontalBand/>
                            <MenuItem content='Sub Menu'/>

                        </MenuItem>
                        <MenuHorizontalBand/>
                        <MenuItem
                            positionPopup='downRight'
                            content={Add(<FaChevronRight size={15} className='editor-icon'/>, 'Testing')}>
                            <MenuItem content='Sub Menu'/>
                            <MenuHorizontalBand/>
                            <MenuItem content='Sub Menu'/>
                            <MenuHorizontalBand/>
                            <MenuItem content='Sub Menu'/>
                            <MenuHorizontalBand/>
                            <MenuItem content='Sub Menu'/>

                        </MenuItem>
                        <MenuHorizontalBand/>
                        <MenuItem
                            positionPopup='downRight'
                            content={Add(<FaChevronRight size={15} className='editor-icon'/>, 'Testing')}>
                            <MenuItem content='Sub Menu'/>
                            <MenuHorizontalBand/>
                            <MenuItem content='Sub Menu'/>
                            <MenuHorizontalBand/>
                            <MenuItem content='Sub Menu'/>
                            <MenuHorizontalBand/>
                            <MenuItem content='Sub Menu'/>

                        </MenuItem>

                    </MenuItem>
                    <MenuVerticalBand/>
                    <MenuItem
                        style={{width:"50px",padding:"0"}}
                        icon={(<div>File</div>)}
                        content={undefined}
                    >
                    </MenuItem>
                    <MenuVerticalBand/>
                </div>
                <div style={{width: "213px", background: "#faf7f7", marginLeft: "300px", border: " 1px solid #dedcdc"}}>

                    <MenuItem

                        // onOpenPopup={()=>{
                        //     alert('open')
                        // }}
                        // onClosePopup={()=>{
                        //     alert('close')
                        // }}

                        ref={this.mRefMenuPop}
                        iconClose={<FaAngleDoubleRight size={12}/>}
                        iconOpen={<FaAngleDoubleDown size={12}/>}
                        positionIcon='right'

                        content='test popUp'
                        positionPopup='details'

                    >
                        <MenuItem content='Sub Menu'></MenuItem>
                        <MenuHorizontalBand/>
                        <MenuItem
                            positionIcon='right'
                            icon={<FaAngleDoubleRight size={12}/>}
                            behavior='move'
                            positionPopup='downRight'
                            content='sdsdsd'

                        >
                            <MenuItem content='Sub Menu'/>
                            <MenuHorizontalBand/>
                            <MenuItem content='Sub Menu'/>
                            <MenuHorizontalBand/>
                            <MenuItem content='Sub Menu'/>
                            <MenuHorizontalBand/>
                            <MenuItem content='Sub Menu click' onClick={() => {
                                alert(1212)
                            }}/>


                        </MenuItem>
                        <MenuHorizontalBand/>

                        <MenuItem content='Sub Menu'></MenuItem>
                        <MenuHorizontalBand/>
                        <MenuItem content='Sub Menu move'>

                        </MenuItem>
                    </MenuItem>
                    <MenuItem content='left' positionPopup='downLeft'/>

                </div>

                <div style={{
                    textAlign:"center",
                    width: "213px",
                    background: "#faf7f7",
                    marginLeft: "300px",
                    marginTop: "300px",
                    border: " 1px solid #dedcdc"
                }}>

                    <MenuItem
                        content='test 24'
                        positionPopup='details'

                    >
                        <MenuItem

                            positionIcon='right'
                            icon={<FaChevronRight size={12}/>}
                            behavior='move'
                            positionPopup='downRight'
                            content="testing"
                        >
                            <MenuItem content='Sub Menu'/>
                            <MenuHorizontalBand/>
                            <MenuItem content='Sub Menu'/>
                            <MenuHorizontalBand/>
                            <MenuItem content='Sub Menu'/>
                            <MenuHorizontalBand/>
                            <MenuItem content='Sub Menu click' onClick={() => {
                                alert(1212)
                            }}/>
                        </MenuItem>
                        <MenuHorizontalBand/>
                        <MenuItem content='Sub Menu'></MenuItem>
                        <MenuHorizontalBand/>
                        <MenuItem content='Sub Menu'></MenuItem>
                        <MenuHorizontalBand/>
                        <MenuItem content='Sub Menu move'>

                        </MenuItem>
                    </MenuItem>
                    <MenuItem content='left' positionPopup='downLeft'/>

                </div>

                <div style={{marginTop: "300px"}} className='editor-toolbar'>
                    <MenuItem


                        content="test assa" style={{width: "300px"}}

                        positionPopup='top'>
                        <MenuItem content="subTest" positionPopup='topRight'>
                            <MenuItem content='Sub Menu'/>
                            <MenuHorizontalBand/>
                            <MenuItem content='Sub Menu'/>
                            <MenuHorizontalBand/>
                            <MenuItem content='Sub Menu'/>
                            <MenuHorizontalBand/>
                            <MenuItem content='Sub Menu click' onClick={() => {
                                alert(1212)
                            }}/>
                        </MenuItem>
                        <MenuHorizontalBand/>
                        <MenuItem content="subTest">

                        </MenuItem>
                        <MenuHorizontalBand/>
                        <MenuItem content="subTest">

                        </MenuItem>
                    </MenuItem>
                    <MenuItem content="test" style={{width: "300px"}} positionPopup='top'>
                        <MenuItem
                            content="subTest"
                            positionPopup='topLeft'
                        >
                            <MenuItem content='Sub Menu'/>
                            <MenuHorizontalBand/>
                            <MenuItem content='Sub Menu'/>
                            <MenuHorizontalBand/>
                            <MenuItem content='Sub Menu'/>
                            <MenuHorizontalBand/>
                            <MenuItem content='Sub Menu click' onClick={() => {
                                alert(1212)
                            }}/>
                        </MenuItem>
                        <MenuHorizontalBand/>
                        <MenuItem content="subTest">

                        </MenuItem>
                        <MenuHorizontalBand/>
                        <MenuItem content="subTest">
                        </MenuItem>
                    </MenuItem>
                </div>
            </div>
        );
    }


}

export default MenuConst;
