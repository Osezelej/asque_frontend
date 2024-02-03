import { BottomNaviIconText } from "./bottomNaviIconText";

export function BottomNavi({imageTextObjectArray}){

    return <div className="bottom-navigation-container">
        {imageTextObjectArray.map((value)=><BottomNaviIconText 
        Icon={value.icon}
        text={value.text} 
        link={value.link}
        isActive={value.isActive}
        />)}
    </div>
}