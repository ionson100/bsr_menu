# Menu

<table>
    <tr>
        <th>Name</th>
        <th>Type</th>
        <th>Default</th>
        <th>Description</th>
    </tr>
    <tr>
        <td>content</td>
        <td>string|element|number|fun</td>
        <td>string</td>
        <td>Text menu</td>
    </tr>
    <tr>
        <td>positionPopup</td>
        <td>string (['down','top', 'downLeft', 'downRight', 'topRight', 'topLeft', 'details'])</td>
        <td> 'down' </td>
        <td>Position  panel sub menu</td>
    </tr>
    <tr>
        <td>icon</td>
        <td>element</td>
        <td> undefined </td>
        <td>Icon menu</td>
    </tr>
    <tr>
        <td>iconOpen</td>
        <td>element</td>
        <td> undefined </td>
        <td>Icon for menu only positionPopup = detail, state open </td>
    </tr>
    <tr>
        <td>iconClose</td>
        <td>element</td>
        <td> undefined </td>
        <td>Icon for menu only positionPopup = detail, state close </td>
    </tr>
    <tr>
        <td>positionIcon</td>
        <td>string(['left', 'right'])</td>
        <td> 'right' </td>
        <td>position of the icon on the menu</td>
    </tr>
    <tr>
        <td>widthPopup</td>
        <td>number</td>
        <td>undefined</td>
        <td>submenu panel width only for not positionPopup:detail</td>
    </tr>
    <tr>
        <td>onOpenPopup</td>
        <td>callback fun (param ItemMenu)</td>
        <td>undefined</td>
        <td>the event occurs when the sub menu panel is opened,
         only for positionPopup:detail
   </td>
    </tr>
    <tr>
        <td>onClosePopup</td>
        <td>callback fun (param ItemMenu)</td>
        <td>undefined</td>
        <td>the event occurs when the sub menu panel is closed, 
only for positionPopup:detail</td>
    </tr>
    <tr>
        <td>behavior</td>
        <td>string (['move', 'click'])</td>
        <td>'click'</td>
        <td>initializer for opening a submenu.
         move - mouse over, click - click on menu</td>
    </tr>
    <tr>
        <td>disabled</td>
        <td>bool</td>
        <td>false</td>
        <td>State disable menu</td>
    </tr>
<tr>
        <td>className</td>
        <td>string</td>
        <td>'menu-123-item'</td>
        <td>css class menu</td>
    </tr>
    <tr>
        <td>popupClassName only positionPopup:detail</td>
        <td>string</td>
        <td>'detail-123-popup'</td>
        <td>css class for submenu panel</td>
    </tr>
    <tr>
        <td>popupClassName other</td>
        <td>string</td>
        <td>'menu-123-pane' </td>
        <td>css class for submenu panel</td>
    </tr>
    <tr>
        <td>open()</td>
        <td>MenuItem type object function</td>
        <td></td>
        <td> open submenu panel</td>
    </tr>
    <tr>
        <td>close()</td>
        <td>MenuItem type object function</td>
        <td></td>
        <td> close submenu panel</td>
    </tr>
     <tr>
        <td>setDisabled(bool)</td>
        <td>MenuItem type object function</td>
        <td></td>
        <td>disabled state switching function</td>
    </tr>
</table>




```javascript
 <MenuItem content='right' className='editor-menu-root' position='downRight'>
    <MenuItem content='Menu1' className='editor-menu-item' position='downRight'>
        <MenuItem content='Sub Menu1' className='editor-menu-item'/>
        <MenuHorizontalBand/>
        <MenuItem content='Sub Menu2' className='editor-menu-item'/>
        <MenuHorizontalBand/>
        <MenuItem content='Sub Menu3' className='editor-menu-item'/>
        <MenuHorizontalBand/>
        <MenuItem content='Sub Menu4' className='editor-menu-item'/>
    </MenuItem>
    <MenuHorizontalBand/>
    <MenuItem content='Menu2' className='editor-menu-item'/>
    <MenuHorizontalBand/>
    <MenuItem content='Menu3' className='editor-menu-item'/>
    <MenuHorizontalBand/>
    <MenuItem content='Menu4' className='editor-menu-item'/>
</MenuItem>
<MenuHorizontalBand/>
```

