import { useState } from "react";
import '../css/creator.css'
import { Check } from "@mui/icons-material";
import {useDispatch } from "react-redux";
import { addCategory, removeCategory } from "../store/category";
export function CheckboxText({value, }){
    const [isChecked, setIsChecked] = useState(false);
    const dispatch = useDispatch();
    return  <div className='checkbox-container'>
       {!isChecked ? <div style={{
            height:20,
            width:20,
            borderWidth:1,
            borderStyle:'solid',
            borderColor:'#BE774D',
            borderRadius:6
        }} onClick={()=>{ 
            dispatch(addCategory(value))
        setIsChecked(true)}}></div> :
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
        }} onClick={()=>{  
            dispatch(removeCategory(value))
         setIsChecked(false)}} >
            <Check style={{fill:'#ffff'}} fontSize="10"/>
        </div>}
        <p>{value}</p>
</div>
}