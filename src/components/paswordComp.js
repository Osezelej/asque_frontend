import { VisibilityOffRounded, VisibilityRounded } from "@mui/icons-material";
import { useState } from "react";

export function PasswordComp({labelText, fieldName, value, changeHandler}){
    const [visibility, setVisibility] = useState(false)
    return<div className ="signup-label-input-container">
    <p>{labelText}</p>
    <div className="password-container">
        {visibility? <input 
        type="text" 
        name={fieldName} 
        placeholder="Enter your password"
        value={value}
        onChange={(e)=>changeHandler(e)}
        />:<input 
        type="password" 
        name={fieldName} 
        placeholder="Enter your password"
        value={value}
        onChange={(e)=>changeHandler(e)}
        />}
        <div className="visibility-icon-container" onClick={()=>setVisibility(!visibility)}>
        {visibility?<VisibilityRounded/>:<VisibilityOffRounded/>}
        </div>
    </div>
    
</div>
}