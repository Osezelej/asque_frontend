import { VisibilityOffRounded, VisibilityRounded } from "@mui/icons-material";
import { useState } from "react";

export function PasswordComp({labelText}){
    const [visibility, setVisibility] = useState(false)
    return<div className ="signup-label-input-container">
    <p>{labelText}</p>
    <div className="password-container">
        {visibility? <input type="text" name="name" placeholder="Enter your password"/>:<input type="password" name="name" placeholder="Enter your password"/>}
        <div className="visibility-icon-container" onClick={()=>setVisibility(!visibility)}>
        {visibility?<VisibilityRounded/>:<VisibilityOffRounded/>}
        </div>
    </div>
    
</div>
}