import {TbWorldUpload} from "react-icons/tb";
import {MenuHorizontalBand, MenuItem, MenuVerticalBand} from "./menu";
import { FaChevronRight } from "react-icons/fa";
import React  from 'react';


const Add = (image, text) => {
    return (
        <div style={{display: "flex"}}>
            <span style={{width:"100%"}}>{text}</span>{image}
        </div>
    );
}

function MenuConst() {
    return (
        <div>

            <div className='editor-toolbar'>
                <MenuItem content="File"
                          icon={<TbWorldUpload size={15} className='editor-icon'/>}
                          className='editor-menu-root'

                >
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
            <div style={{width:"60px",background:"#faf7f7",marginLeft:"300px",border:" 1px solid #dedcdc"}}>
                <MenuItem content='left' position='downLeft' className='editor-menu-root'>
                    <MenuItem content='Sub Menu' className='editor-menu-item'/>
                    <MenuHorizontalBand/>
                    <MenuItem content='Sub Menu' className='editor-menu-item'/>
                    <MenuHorizontalBand/>
                    <MenuItem content='Sub Menu' className='editor-menu-item'/>
                    <MenuHorizontalBand/>
                    <MenuItem content='Sub Menu' className='editor-menu-item'/>
                </MenuItem>
                <MenuHorizontalBand/>
                <MenuItem content='right' className='editor-menu-root' position='downRight' >
                    <MenuItem content='Sub Menu' className='editor-menu-item' position='downRight'>
                        <MenuItem content='Sub Menu' className='editor-menu-item'/>
                        <MenuHorizontalBand/>
                        <MenuItem content='Sub Menu' className='editor-menu-item'/>
                        <MenuHorizontalBand/>
                        <MenuItem content='Sub Menu' className='editor-menu-item'/>
                        <MenuHorizontalBand/>
                        <MenuItem content='Sub Menu' className='editor-menu-item'/>
                    </MenuItem>
                    <MenuHorizontalBand/>
                    <MenuItem content='Sub Menu' className='editor-menu-item'/>
                    <MenuHorizontalBand/>
                    <MenuItem content='Sub Menu' className='editor-menu-item'/>
                    <MenuHorizontalBand/>
                    <MenuItem content='Sub Menu' className='editor-menu-item'/>
                </MenuItem>
                <MenuHorizontalBand/>
                <MenuItem content='test' className='editor-menu-root'>
                </MenuItem>
                <MenuHorizontalBand/>
                <MenuItem content='test' className='editor-menu-root'>
                </MenuItem>
            </div>
        </div>
    );
}

export default MenuConst;
