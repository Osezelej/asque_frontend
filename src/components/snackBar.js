import { SwipeableDrawer } from "@mui/material"
export function SnackBar({text, onState, closeState}){
    return <SwipeableDrawer PaperProps={{square:false, elevation:0, style:{backgroundColor:'transparent'}}} anchor='bottom' open={onState} onClose={()=>{closeState()}}>
    <div style={{
        width:'99vw',
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        marginBottom:25
    }}>
        <div style={{
            width:'50%',
            backgroundColor:'#4343438e',
            paddingTop:10,
            paddingBottom:10,
            borderRadius:100,
            display:'flex',
            'alignItems':'center',
            justifyContent:'center'
        }}>
            <p style={{
            color:'white',}}>{text}</p>
        </div>
    </div>
</SwipeableDrawer>
}