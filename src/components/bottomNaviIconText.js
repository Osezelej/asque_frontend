import { useNavigate } from "react-router-dom"

export function BottomNaviIconText({isActive, Icon, text, link}){
    const navigate = useNavigate();
    return <div className="Bottom-navi-icon-text-container" onClick={()=>navigate(link)}>
       {isActive ? <Icon fill='#BE774C' stroke='#BE774C'/>:<Icon  stroke='#848F9F'/> } 
        {isActive ? <p style={{color: '#BE774C'}}>{text}</p> : <p>{text}</p>}
    </div>
}