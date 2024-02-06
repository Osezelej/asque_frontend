import { HelpCenterRounded, Key, LogoutRounded, MenuBookRounded, Money, Person2Rounded } from "@mui/icons-material"
import { ProfileItem } from "../../components/profileItem"
export function Profile (){
    const iconArray = [
        {
            leadingIcon:Person2Rounded,
            title:'Profile detail',
            subText:'Check your account details',
            link:'/profile-details'
        },
        {
            leadingIcon:Key,
            title:'Change password',
            subText:'Password your account',
            link:'/auth/resetPassword'
        },
        {
            leadingIcon:HelpCenterRounded,
            title:'Support',
            subText:'Our support team is active 24/7',
            link:'/support'
        },
        {
            leadingIcon:MenuBookRounded,
            title:'Terms & Conditions',
            subText:'About our contract with you',
            link:'/TC'
        },
        {
            leadingIcon:Money,
            title:'Referal & earning',
            subText:'Share artwork with people and get paid',
            link:'/referal/osezele'
        
        },
      
    ]
    return <div className="home-page-body">
        <div className="profile-container">
            <div className="profile-icon-container">
                <p>BO</p>
            </div>
            <div className="profile-text-container">
                <p>Blessed Onuoha</p>
                <p>blesedchiamaka@gmail.com</p>
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
            <div className="logout-icon-text-container">
                <div className="logout-icon-text">
                    <LogoutRounded/>
                    <p>Logout</p>
                </div>
            </div>
        </div>
    </div>
}