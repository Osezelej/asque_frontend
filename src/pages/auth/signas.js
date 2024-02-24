import { CameraAltRounded, Person2Rounded } from "@mui/icons-material";
import { AuthHeader } from "../../components/authHeader";
import { ProfileItem } from "../../components/profileItem";
export function Signas(){
    const iconArray = [
       
        {
            leadingIcon:Person2Rounded,
            title:'A user',
            subText:'Discover stories and artwork',
            link:'/auth/signup/user'
        },
        {
            leadingIcon:CameraAltRounded,
            title:'A Creator',
            subText:'Sign up as a creator',
            link:'/auth/signup/creator'
        },
      
    ]
    return <div className="signas-main-body-container home-page-body">
        <div style={{overflowY:'scroll'}}>
                <div className="shop-header-container" style={{
                        minHeight:150
                    }}>
                        <AuthHeader />
                        <h2 style={{marginTop:15}}>Sign up as</h2>
                </div>      
        </div>
        <div className="profile-detail-item-container">
            {
                iconArray.map((value)=><ProfileItem 
                    LeadingIcon={value.leadingIcon}
                    textTitle={value.title}
                    subTextTitle={value.subText}
                    link={value.link}
                />)
            }
            </div>

    </div>
}