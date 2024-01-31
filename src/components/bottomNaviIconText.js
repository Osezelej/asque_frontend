import { useNavigate } from "react-router-dom"

export function BottomNaviIconText({Icon, text, link}){
    const navigate = useNavigate();
    return <div className="Bottom-navi-icon-text-container" onClick={()=>navigate(link)}>
        <Icon/>
        <p>{text}</p>
    </div>
}