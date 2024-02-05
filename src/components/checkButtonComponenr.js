import { useState } from "react";
import '../css/creator.css'
import { Check } from "@mui/icons-material";
export function CheckboxText({value}){
    const [isChecked, setIsChecked] = useState(false);
    return  <div className='checkbox-container'>
       {!isChecked ? <div style={{
            height:20,
            width:20,
            borderWidth:1,
            borderStyle:'solid',
            borderColor:'#BE774D',
            borderRadius:6
        }} onClick={()=>setIsChecked(true)}></div> :
        <div style={{
            height:20,
            width:20,
            borderWidth:1,
            borderStyle:'solid',
            borderColor:'#BE774D',
            borderRadius:6,
            backgroundColor:'#BE774D',
            display:'flex',
            justifyContent:'center',
            alignItems:'center'
        }} onClick={()=>setIsChecked(false)} >
            <Check style={{fill:'#ffff'}} fontSize="10"/>
        </div>}
        <p>{value}</p>
</div>
}