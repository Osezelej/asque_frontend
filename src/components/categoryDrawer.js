import { CheckboxText } from "./checkButtonComponenr";
import { Drawer, Paper, SwipeableDrawer } from '@mui/material';

import { CloseRounded } from '@mui/icons-material';
import '../css/creator.css'


export function CategoryDrawer({openDrawerState, closeFunction}){
 
    const checkBoxArray = ['Portrait', 'Wildlife', 'Landscape', 'Abstract', 'Culture', 'History', 'Heritage sites', 'Still-life']
    
    return  <SwipeableDrawer PaperProps={{square:false, elevation:0, style:{backgroundColor:'transparent'}}} anchor='bottom' open={openDrawerState} onClose={()=>closeFunction()}>
    
         <div className='bottom-drawer-main-body  home-page-body'>
        <div className='drawer-title-header-close-container'>
            <div style={{
                display:'flex',
                justifyContent:'space-between',
                alignItems:'center',
                width:'100%'
            }}>
                <div className='drawer-title-header-container'>
                    <p>Category</p>
                </div>
                <div className='close-conainer' onClick={()=>closeFunction()}>
                    <CloseRounded />
                </div>
            </div>
            
        </div>
        <div className='bottom-drawer-checkboxes-cotainer'>
        {checkBoxArray.map((value)=>{
            return <CheckboxText value={value} />
        })}
        </div>
        
    {/* <div className="add-to-cart-button-container">
        <button>Continue</button>
    </div> */}

    </div>
       
</SwipeableDrawer>
}