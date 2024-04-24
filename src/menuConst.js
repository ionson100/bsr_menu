import {MenuHorizontalBand, MenuItem, MenuVerticalBand} from "./menu";
import {FaChevronRight} from "react-icons/fa";
import React, {Component} from 'react';


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
    }

    componentDidMount() {
       // console.log(this.mRefMenu)
    }

    render() {
        return (
            <div>
                <button onClick={()=>{
                    this.mRefMenu.current.setDisabled(true)
                }}>Disabled</button>
                <button onClick={()=>{
                    this.mRefMenu.current.setDisabled(false)
                }}>UnDisabled</button>

                <button onClick={()=>{
                    this.mRefMenu.current.open()
                }}>open</button>

                <button onClick={()=>{
                    this.mRefMenu.current.close()
                }}>close</button>

                <div className='editor-toolbar'>
                    <MenuItem

                        disabled={false}
                        accessKey='s'
                        behavior='move'
                        ref={this.mRefMenu}
                        style={{ width: "400px"}}
                        content='asasdddddddddddd'
                        className='editor-menu-root'>
                        <MenuItem
                            accessKey='x'
                            behavior='move'
                            position='downRight'
                            content={Add(<FaChevronRight size={15} className='editor-icon'/>, 'Testing')}
                            className='editor-menu-item'>
                            <MenuItem content='Sub Menu' className='editor-menu-item'/>
                            <MenuHorizontalBand/>
                            <MenuItem content='Sub Menu' className='editor-menu-item'/>
                            <MenuHorizontalBand/>
                            <MenuItem content='Sub Menu' className='editor-menu-item'/>
                            <MenuHorizontalBand/>
                            <MenuItem content='Sub Menu' className='editor-menu-item'/>
                        </MenuItem>
                        <MenuHorizontalBand/>

                    </MenuItem>
                    <MenuVerticalBand/>
                    <MenuItem content="File" className='editor-menu-root'>
                        <MenuItem
                            position='downRight'
                            content={Add(<FaChevronRight size={15} className='editor-icon'/>, 'Testing')}>
                            <MenuItem content='Sub Menu' className='editor-menu-item'/>
                            <MenuHorizontalBand/>
                            <MenuItem content='Sub Menu' className='editor-menu-item'/>
                            <MenuHorizontalBand/>
                            <MenuItem content='Sub Menu' className='editor-menu-item'/>
                            <MenuHorizontalBand/>
                            <MenuItem content='Sub Menu' className='editor-menu-item'/>

                        </MenuItem>
                        <MenuHorizontalBand/>
                        <MenuItem
                            position='downRight'
                            content={Add(<FaChevronRight size={15} className='editor-icon'/>, 'Testing')}>
                            <MenuItem content='Sub Menu' className='editor-menu-item'/>
                            <MenuHorizontalBand/>
                            <MenuItem content='Sub Menu' className='editor-menu-item'/>
                            <MenuHorizontalBand/>
                            <MenuItem content='Sub Menu' className='editor-menu-item'/>
                            <MenuHorizontalBand/>
                            <MenuItem content='Sub Menu' className='editor-menu-item'/>

                        </MenuItem>
                        <MenuHorizontalBand/>
                        <MenuItem
                            position='downRight'
                            content={Add(<FaChevronRight size={15} className='editor-icon'/>, 'Testing')}>
                            <MenuItem content='Sub Menu' className='editor-menu-item'/>
                            <MenuHorizontalBand/>
                            <MenuItem content='Sub Menu' className='editor-menu-item'/>
                            <MenuHorizontalBand/>
                            <MenuItem content='Sub Menu' className='editor-menu-item'/>
                            <MenuHorizontalBand/>
                            <MenuItem content='Sub Menu' className='editor-menu-item'/>

                        </MenuItem>
                        <MenuHorizontalBand/>
                        <MenuItem
                            position='downRight'
                            content={Add(<FaChevronRight size={15} className='editor-icon'/>, 'Testing')}>
                            <MenuItem content='Sub Menu' className='editor-menu-item'/>
                            <MenuHorizontalBand/>
                            <MenuItem content='Sub Menu' className='editor-menu-item'/>
                            <MenuHorizontalBand/>
                            <MenuItem content='Sub Menu' className='editor-menu-item'/>
                            <MenuHorizontalBand/>
                            <MenuItem content='Sub Menu' className='editor-menu-item'/>

                        </MenuItem>

                    </MenuItem>
                    <MenuVerticalBand/>
                    <MenuItem content='test' className='editor-menu-root'>


                    </MenuItem>
                    <MenuVerticalBand/>
                </div>
                <div style={{width: "200px", background: "#faf7f7", marginLeft: "300px", border: " 1px solid #dedcdc"}}>

                    <MenuItem
                        width={190}
                        content='test'
                        position='details'
                        className='editor-menu-root-2'
                        popupClassName="detail-pane">
                        <MenuItem

                            behavior='move'
                            position='downRight'
                            content={Add(<FaChevronRight size={15} className='editor-icon'/>, 'Testing')}
                            className='editor-menu-item'>
                            <MenuItem content='Sub Menu' className='editor-menu-item'/>
                            <MenuHorizontalBand/>
                            <MenuItem content='Sub Menu' className='editor-menu-item'/>
                            <MenuHorizontalBand/>
                            <MenuItem content='Sub Menu' className='editor-menu-item'/>
                            <MenuHorizontalBand/>
                            <MenuItem content='Sub Menu click' className='editor-menu-item' onClick={() => {
                                alert(1212)
                            }}/>


                        </MenuItem>
                        <MenuHorizontalBand/>
                        <MenuItem content='Sub Menu' className='editor-menu-item'></MenuItem>
                        <MenuHorizontalBand/>
                        <MenuItem content='Sub Menu' className='editor-menu-item'></MenuItem>
                        <MenuHorizontalBand/>
                        <MenuItem content='Sub Menu move' className='editor-menu-item'>
                            asausiasuusu
                        </MenuItem>
                    </MenuItem>
                    <MenuItem content='left' position='downLeft' className='editor-menu-root-2'/>

                </div>

                <div style={{
                    width: "200px",
                    background: "#faf7f7",
                    marginLeft: "300px",
                    marginTop: "300px",
                    border: " 1px solid #dedcdc"
                }}>

                    <MenuItem
                        width={190}
                        content='test'
                        position='details'
                        className='editor-menu-root-2'
                        popupClassName="detail-pane">
                        <MenuItem

                            behavior='move'
                            position='downRight'
                            content={Add(<FaChevronRight size={15} className='editor-icon'/>, 'Testing')}
                            className='editor-menu-item'>
                            <MenuItem content='Sub Menu' className='editor-menu-item'/>
                            <MenuHorizontalBand/>
                            <MenuItem content='Sub Menu' className='editor-menu-item'/>
                            <MenuHorizontalBand/>
                            <MenuItem content='Sub Menu' className='editor-menu-item'/>
                            <MenuHorizontalBand/>
                            <MenuItem content='Sub Menu click' className='editor-menu-item' onClick={() => {
                                alert(1212)
                            }}/>
                        </MenuItem>
                        <MenuHorizontalBand/>
                        <MenuItem content='Sub Menu' className='editor-menu-item'></MenuItem>
                        <MenuHorizontalBand/>
                        <MenuItem content='Sub Menu' className='editor-menu-item'></MenuItem>
                        <MenuHorizontalBand/>
                        <MenuItem content='Sub Menu move' className='editor-menu-item'>

                        </MenuItem>
                    </MenuItem>
                    <MenuItem content='left' position='downLeft' className='editor-menu-root-2'/>

                </div>

                <div style={{marginTop: "300px"}} className='editor-toolbar'>
                    <MenuItem


                        content="test assa" style={{width:"300px"}}
                        className='editor-menu-root'
                        position='top'>
                        <MenuItem content="subTest" position='topRight' className='editor-menu-item'>
                            <MenuItem content='Sub Menu' className='editor-menu-item'/>
                            <MenuHorizontalBand/>
                            <MenuItem content='Sub Menu' className='editor-menu-item'/>
                            <MenuHorizontalBand/>
                            <MenuItem content='Sub Menu' className='editor-menu-item'/>
                            <MenuHorizontalBand/>
                            <MenuItem content='Sub Menu click' className='editor-menu-item' onClick={() => {
                                alert(1212)
                            }}/>
                        </MenuItem>
                        <MenuHorizontalBand/>
                        <MenuItem content="subTest" className='editor-menu-item'>

                        </MenuItem>
                        <MenuHorizontalBand/>
                        <MenuItem content="subTest" className='editor-menu-item'>

                        </MenuItem>
                    </MenuItem>
                    <MenuItem content="test" style={{width:"300px"}} className='editor-menu-root' position='top'>
                        <MenuItem
                            content="subTest"
                            position='topLeft'
                            className='editor-menu-item'>
                            <MenuItem content='Sub Menu' className='editor-menu-item'/>
                            <MenuHorizontalBand/>
                            <MenuItem content='Sub Menu' className='editor-menu-item'/>
                            <MenuHorizontalBand/>
                            <MenuItem content='Sub Menu' className='editor-menu-item'/>
                            <MenuHorizontalBand/>
                            <MenuItem content='Sub Menu click' className='editor-menu-item' onClick={() => {
                                alert(1212)
                            }}/>
                        </MenuItem>
                        <MenuHorizontalBand/>
                        <MenuItem content="subTest" className='editor-menu-item'>

                        </MenuItem>
                        <MenuHorizontalBand/>
                        <MenuItem content="subTest" className='editor-menu-item'>

                        </MenuItem>
                    </MenuItem>
                </div>
            </div>
        );
    }


}

export default MenuConst;
