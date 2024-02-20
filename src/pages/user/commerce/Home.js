import { ShoppingBagOutlined, ShoppingBasketRounded } from "@mui/icons-material";
import { useState, useEffect } from "react";
import trending1 from '../../../assets/trending1.png';
import trending2 from '../../../assets/trending2.png';
import trending3 from '../../../assets/trending3.png';
import image1 from '../../../assets/image1.png';
import image2 from '../../../assets/image2.png';
import {ReactComponent as Profile} from '../../../assets/Profile 1.svg';
import {ReactComponent as Home} from '../../../assets/Home3.svg';
import {ReactComponent as Category} from '../../../assets/Category.svg';
import { BottomNavi } from "../../../components/bottomNavi";
import '../../../css/user.css';
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { profileThunk, resetProfile, resetUser } from "../../../store/user";
import { ErrorDialogComp } from "../../../components/errorDialogComp";
import { ClipLoader } from "react-spinners";
import { LOCALSTORAGEAUTHKEY } from "../../../config";


export function MarketHome(){
    const profileState = useSelector(state=>state.user.profile)
    const dispatch = useDispatch()

    const navigate = useNavigate();
    const [trendingData, setTrandingData] = useState([1,2,3,4,54,5,6,7,3,3]);
    const [errorMessage, setErrorMessage] = useState({
        title:'',
        content:'',
        command:[],
        keyword:'',
        type:''
    })
    const [openError, setOpenError] = useState()
    const iconTextArray =[
        {
            icon:Home,
            text:"Home",
            link:"/market/home",
            isActive:true
        },
        {
            icon:Category,
            text:"Shop",
            link:"/market/shop",
            isActive:false
        },
        {
            icon:Category,
            text:"Collection",
            link:"/collection",
            isActive:false
        },
        {
            icon:Profile,
            text:"Community",
            isActive:false,
            link:"/community/blessed",
        },
    ]

    const [artistProfileLoading, setArtistProfileLoading] = useState(true)
    const [loadingdata, setLoadingData] = useState(false);
    const userState = useSelector(state=>state.user.user)

    useEffect(()=>{
        console.log('first')
        console.log(profileState)
        if(!profileState.loading && !profileState.error && !profileState.fufilled){
            const userid = JSON.parse(localStorage.getItem(LOCALSTORAGEAUTHKEY));
            if(userid){
                
            dispatch(profileThunk(userid.id))
            }
        }
        if(profileState.error){
            console.log(profileState.fufilled)
            setErrorMessage({
                title:"Error!",
                content:"An error occured while trying to get profile details",
                keyword:", try signing in again",
                type:"warning",
                command:['okay'],
            })
            
            setOpenError(true)
        }
        if(!profileState.loading){
            setArtistProfileLoading(false)
        }

    }, [profileState])


    const imagesArray = [image1, image2, trending1, trending2, trending3,trending2, trending3, trending2];
    return <div className="home-page-body ">

     <ErrorDialogComp 
        content={errorMessage.content} 
        title={errorMessage.title}
        commands={errorMessage.command}
        openModal={openError}
        setOpenModal={setOpenError}
        contentKeyword={errorMessage.keyword}
        type={errorMessage.type}
        feedbackFunction={(e)=>{
            console.log(e.target.innerText)
            if(profileState.error){
                dispatch(resetProfile());
                dispatch(resetUser());
            }
        }}
    />
    <div style={{overflowY:'scroll'}}>
        <div className="home-header-container ">
            <div className="home-name-greeting-container">
                <h3>{profileState.name}</h3>
                <p>Good afternoon, welcome back</p>
            </div>
            <div className="home-cart-profile-pic-container">
                <div onClick={()=>navigate('/market/cart')}><ShoppingBagOutlined/></div>
                <p onClick={()=>navigate('/profile/blessed')}>{profileState.initials}</p>
            </div>
        </div>
        <div className="home-body-container">
            <div className="trending-artwork-container">
                <h4>Trending artworks</h4>
            </div>
            {loadingdata ? <div style={{   height:'100vh',
                        width:'98vw',
                        padding:'50px 0',
                        display:'flex',
                        justifyContent:'center'
                        }}>
                        <ClipLoader color="#BE774D" size={35}/>
                </div> :
            <div className="home-image-list-container">
            {
                trendingData.map((value, index)=> <div className="home-image-item-container" key={index}>
                    <div>
                        <img alt=""  src={trending1}/>
                        <p className="active" onClick={()=>navigate('/market/shop')} style={{fontSize:14, textAlign:'center'}}>view in shop</p>
                    </div>
                    <div>
                        <img alt=""  src={trending2}/>
                        <p className="active" onClick={()=>navigate('/market/shop')} style={{fontSize:14, textAlign:'center'}}>view in shop</p>
                    </div>
                    <div>   
                        <img alt=""  src={trending3}/>
                        <p className="active" onClick={()=>navigate('/market/shop')} style={{fontSize:14, textAlign:'center'}}>view in shop</p>
                    </div>
                </div>)
            }
            </div>}
            <div className="home-explore-main-section">
                <h3>Explore photo collector and story</h3>
                {loadingdata ? <div style={{   height:'100vh',
                        width:'98vw',
                        padding:'50px 0',
                        display:'flex',
                        justifyContent:'center'
                        }}>
                        <ClipLoader color="#BE774D" size={35}/>
                </div> :
                <div className="home-photo-mainbody">
                    {imagesArray.map((value)=> <div className="home-photo-mainbody-item">
                            <img src={value} alt={'text'}/>
                            <div className="text-structurecontainer">
                                <p>Walls of Kano</p>
                            </div>
                    </div>)}
                </div>}
            </div>
        </div>
    </div>
        
        <div className="shop-footer-container">
            <BottomNavi imageTextObjectArray={iconTextArray}/>
        </div>

</div>
} 