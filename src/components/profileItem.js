import { ArrowDownwardRounded, ArrowForwardIosRounded } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import arrowDown from '../assets/arrow-down-sign-to-navigate.png';
import { useState } from "react";

export function ProfileItem({LeadingIcon, textTitle, subTextTitle, link, from, isArtwork}){
    const [click, setClick] = useState(false);
    const navigate = useNavigate();
    return (from != 'creator' ? <div className="Profile-item-container"   onClick={()=>{
        navigate(link)
    }}>
        <div className="icon-text-container">
            <div className="icon-container">
                <LeadingIcon />
            </div>
            <div className="text-title-subtext-container">
                <p className="title">{textTitle}</p>
                <p className="sub-text">{subTextTitle}</p>
            </div>
        </div>
        <div className="next-icon-container">
            <ArrowForwardIosRounded/>
        </div>
    </div>:(isArtwork ?<div>
        <div className="Profile-item-container" >
        <div className="icon-text-container">
            <div className="icon-container">
                <img src={LeadingIcon} />
            </div>
            <div className="text-title-subtext-container">
                <p className="title">{textTitle}</p>
                <p className="sub-text">{subTextTitle}</p>
            </div>
        </div>
        <div className="next-icon-container" >
            {click?<img src={arrowDown} height={20} width={19} style={{transform:'rotate(180deg)'}} onClick={()=>setClick(false)}/>: <img src={arrowDown} height={20} width={20} onClick={()=>setClick(true)}/>}
        </div>
        
    </div>
    {
            click && <div>
                <p style={{marginBottom:10,fontWeight:'bold'}}>Album</p>
                <p style={{ fontWeight:'bold'}}>For sale</p>
            </div>
        }
    </div> : <div className="Profile-item-container" >
        <div className="icon-text-container">
            <div className="icon-container">
                <img src={LeadingIcon} />
            </div>
            <div className="text-title-subtext-container">
                <p className="title">{textTitle}</p>
                <p className="sub-text">{subTextTitle}</p>
            </div>
        </div>
        <div className="next-icon-container">
            <ArrowForwardIosRounded/>
        </div>
    </div>))
}