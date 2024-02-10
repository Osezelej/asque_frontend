import { useLocation, useNavigate } from "react-router-dom"
import book from '../../assets/book.png';
import camera from '../../assets/Camera 2.png';
import { ProfileItem } from "../../components/profileItem";
import {ReactComponent as Profile} from '../../assets/Profile 1.svg';
import {ReactComponent as Category} from '../../assets/Category.svg';
import { BottomNavi } from "../../components/bottomNavi";
import '../../css/creator.css';
import { useEffect, useState } from "react";
import { ClipLoader } from "react-spinners";
import axios from "axios";
import BACKEND_URL, { LOCALSTORAGEACCESSTOKENKEY, LOCALSTORAGEPROFILEKEY } from "../../config";
import { useDispatch, useSelector } from "react-redux";
import { profileThunk } from "../../store/user";
import { ErrorDialogComp } from "../../components/errorDialogComp";

export function CreatorHome(){
    const profileState = useSelector(state=>state.user.profile)
    const dispatch = useDispatch()

    const navigate = useNavigate();
    
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search)
    const userid = searchParams.get('q')

    const [artistProfileLoading, setArtistProfileLoading] = useState(true)

    const iconArray = [
        {
            leadingIcon:camera,
            title:'Art works',
            subText:'List artwork for sale or simply share your great sights of Africa',
            link:'',
            from:'creator',
            isArtwork:true
        },
        {
            leadingIcon:book,
            title:'Stories',
            subText:'A global audience is eager to know, share thoughts',
            link:'/creator/submit/story',
            from:'creator',
            isArtwork:false
        },
      
    ]
    const iconTextArray =[

        {
            icon:Category,
            text:"Create",
            link:"/creator/home",
            isActive:true
        },
        {
            icon:Category,
            text:"View published",
            link:"/creator/published",
            isActive:false
        },
        {
            icon:Profile,
            text:"Profile",
            link:"/profile/creator",
            isActive:false
        },
    ]
    
    const [openError, setOpenError] = useState(false);
    const [errorMessage, setErrorMessage] = useState({
        title:"",
        content:"",
        keyword:"",
        type:"",
        command:[],

    })

    // a function that is getting the user profile
    
    async function refreshToken(){
        await axios.post(BACKEND_URL + '/auth/refresh-access-token/' + userid).then((value)=>{
           console.log(value)
            localStorage.setItem(LOCALSTORAGEACCESSTOKENKEY, value.data.message.accessToken);
        }).then((err)=>{
            console.log(err)
        })
    }
    useEffect(()=>{
        console.log(profileState)
        if(!profileState.loading && !profileState.error && !profileState.fufilled){
            dispatch(profileThunk(userid))
        }
        if(profileState.error){
            setOpenError(true)
            setErrorMessage({
                title:"Error!",
                content:"An error occured while trying to get profile details",
                keyword:", try signing in again",
                type:"warining",
                command:['okay'],
            })
            navigate('/auth/signin')
        }
        if(!profileState.loading){
            setArtistProfileLoading(false)
        }

    }, [profileState])

    return <div className="creator-home-main-body home-page-body">

        <ErrorDialogComp
                commands={errorMessage.command}
                content={errorMessage.content}
                type={errorMessage.type}
                openModal={openError}
                setOpenModal={setOpenError}
                title={errorMessage.title}
                contentKeyword={errorMessage.keyword}
        />

        {artistProfileLoading ? <div style={{'height':'100%', display:'flex', alignItems:'center', justifyContent:'center'}}>
            <ClipLoader color="#BE774D" size={35}/>
        </div> :<div style={{overflowY:'scroll'}}>
            <div className="home-header-container ">
                <div className="home-name-greeting-container">
                    <h3>{profileState.name}</h3>
                    <p>welcome back creator</p>
                </div>
                <div className="home-cart-profile-pic-container">
                    <p onClick={()=>navigate('/profile/' + profileState.name)}>{profileState.initials}</p>
                </div>
            </div>
            <div className="trending-artwork-container">
                    <h4>Create: List artwork and share stories</h4>
            </div>
            <div className="creator-detail-item-container">
            {
                iconArray.map((value)=><ProfileItem 
                    LeadingIcon={value.leadingIcon}
                    textTitle={value.title}
                    subTextTitle={value.subText}
                    link={value.link}
                    from = {value.from}
                    isArtwork={value.isArtwork}
                    handleClick={()=>navigate('/creator/submit/story')}
                    key={value.title}
                />)
            }
            </div>
        </div>}
        <div className="shop-footer-container">
            <BottomNavi imageTextObjectArray={iconTextArray}/>
        </div>

    </div>
}