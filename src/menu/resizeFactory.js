
export  const MapMenu=new Map();
window.addEventListener('resize', function() {
 MapMenu.forEach((value,key)=>{
     if(value){
        value._resizeWindows(key)
     }
 })
}, true);


