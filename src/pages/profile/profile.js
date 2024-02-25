import {  HelpCenterRounded, Key, LogoutRounded, MenuBookRounded, Money, Person2Rounded } from "@mui/icons-material"
import { ProfileItem } from "../../components/profileItem"
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react";
import { LOCALSTORAGEAUTHKEY, LOCALSTORAGEPROFILEKEY } from "../../config";
import { useNavigate } from "react-router-dom";
import { registerUser, registerUserProfile, resetProfile, resetUser } from "../../store/user";
export function Profile (){
    const profileState = useSelector(state=>state.user.profile);
    const userState = useSelector(state=>state.user.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const iconArray = [
        {
            leadingIcon:Person2Rounded,
            title:'Profile detail',
            subText:'Check your account details',
            link:'/profile-details',
            type:'c'

        },
        // {
        //     leadingIcon:Key,
        //     title:'Change password',
        //     subText:'Password your account',
        //     link:'/auth/resetPassword',
        //     type:'a'
        // },
        {
            leadingIcon:HelpCenterRounded,
            title:'Support',
            subText:'Our support team is active 24/7',
            link:'/support',
            type:'a'
        },
        {
            leadingIcon:MenuBookRounded,
            title:'Terms & Conditions',
            subText:'About our contract with you',
            link:'https://www.notion.so/Asque-Terms-of-Service-faaf9765478048bf83014b1eb3183b6f',
            type:'a'
        },
        {
            leadingIcon:Money,
            title:'Referal & earning',
            subText:'Share artwork with people and get paid',
            link:'/referal/osezele',
            type:'u'
        
        },
      
    ]

    console.log(userState)
    useEffect(()=>{
        console.log(profileState)
        if (profileState.name.length > 0){
            if(userState.role.length == 0){
                let userRole = JSON.parse(localStorage.getItem(LOCALSTORAGEAUTHKEY))
                
                if(userRole === null || userRole === undefined){
                    localStorage.clear()
                    navigate('/auth/signin')
                }else{
                    dispatch(registerUser(userRole))
                }
            }
            return 
        }else{
            let userProfile = JSON.parse(localStorage.getItem(LOCALSTORAGEPROFILEKEY));
            console.log(userProfile)
            if (userProfile === null || userProfile === undefined){
                localStorage.clear()
                navigate('/auth/signin')
                
            }else{
                dispatch(registerUserProfile(userProfile))
            }
        }
    }, [profileState])
    return <div className="home-page-body">
        
        <div className="profile-container">
            <div className="profile-icon-container">
                <p>{profileState.initials}</p>
            </div>
            <div className="profile-text-container">
                <p>{profileState.name}</p>
                <p>{userState.email}</p>
            </div>
            
        </div>
        <div className="profile-detail-item-container">
            
            {
                iconArray.map((value)=>{
                    if(value.type == 'a'){
                        return <ProfileItem 
                    LeadingIcon={value.leadingIcon}
                    textTitle={value.title}
                    subTextTitle={value.subText}
                    link={value.link}
                />
                    }
                    if (value.type == 'c' && userState.role === 'ARTIST'){
                        return <ProfileItem 
                    LeadingIcon={value.leadingIcon}
                    textTitle={value.title}
                    subTextTitle={value.subText}
                    link={value.link}
                />
                    }
                    if(userState.role === 'USER' && value.type === 'u'){
                        
                    return <ProfileItem 
                    LeadingIcon={value.leadingIcon}
                    textTitle={value.title}
                    subTextTitle={value.subText}
                    link={value.link}
                />
                    }
                    } )
            }
            <div className="logout-icon-text-container">
                <div className="logout-icon-text" onClick={()=>{
                    let res = window.confirm('Are you sure you want to log out?')
                    if (res){
                        localStorage.clear();
                        
                        dispatch(resetUser());
                        dispatch(resetProfile());
                        navigate('/auth/signin');
                    }
                    return
                }}>
                    <LogoutRounded/>
                    <p>Logout</p>
                </div>
            </div>
        </div>
    </div>
}