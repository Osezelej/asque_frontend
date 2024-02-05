import { Drawer, SwipeableDrawer } from "@mui/material";
import { CloseRounded } from "@mui/icons-material";

export function SaleType({openSaleDrawer, closeFunction, selectFunction}){
    return <SwipeableDrawer anchor="bottom" open={openSaleDrawer} onClose={()=>closeFunction()}>
        <div className='bottom-drawer-main-body'>
            <div className='drawer-title-header-close-container'>
                <div className='drawer-title-header-container'>
                    <p>Sale Type</p>
                </div>
                <div className='close-conainer' onClick={()=>closeFunction()}>
                    <CloseRounded />
                </div>
            </div>
            <div className="bottom-drawer-container-main-body home-page-body"> 
                <p style={{
                    marginTop:10,
                    marginBottom:10
                }} 
                onClick={(e)=>{selectFunction(e)}}>Original</p>
                <p style={{
                    marginTop:10,
                    marginBottom:10
                }} 
                onClick={(e)=>{selectFunction(e)}}>Print</p>
            </div>
        </div>
    </SwipeableDrawer>
}