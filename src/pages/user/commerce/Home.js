import { ConstructionRounded, ShoppingBagOutlined, ShoppingBasketRounded } from "@mui/icons-material";
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
import { profileThunk, resetProfile, resetUser, } from "../../../store/user";
import { ErrorDialogComp } from "../../../components/errorDialogComp";
import { ClipLoader } from "react-spinners";
import BACKEND_URL, { LOCALSTORAGEACCESSTOKENKEY, LOCALSTORAGEAUTHKEY, LOCALSTORAGECARTKEY } from "../../../config";
import axios from "axios";
import { resetCartData, addTocart } from "../../../store/cart";






export function MarketHome(){
    const profileState = useSelector(state=>state.user.profile)
    // const cartData = useSelector(state=>state.cart.cartData);
    // const cartLen  = useSelector(state=>state.cart.cartLen);
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

    const [artistProfileLoading, setArtistProfileLoading] = useState(true);
    const [loadingdata, setLoadingData] = useState(true);
    const userState = useSelector(state=>state.user.user)
    
    const [imagesArray, setImagesArray] = useState([]);
    const [isDone, setIsDone] = useState(false)


    async function getArtwork(){
        setLoadingData(true);
        const accessToken = localStorage.getItem(LOCALSTORAGEACCESSTOKENKEY);
        await axios.get(BACKEND_URL + '/artwork/newest', {
            headers:{
                Authorization:`Bearer ${accessToken}`
            }
        }).then((value)=>{
            // console.log(value.data.data);
            setTrandingData(value.data.data);
            
        }).catch((err)=>{
            console.log(err)
            setErrorMessage({
                title:"Error!",
                content:"An error occured while trying to get artWork",
                keyword:", try signing in again",
                type:"warning",
                command:['okay'],
            })
            setOpenError(true)
            dispatch(resetUser())
            dispatch(resetProfile())
            localStorage.clear()
            navigate('/auth/signin')
        })
    }

    async function getAlbum(){
        
        setLoadingData(true);
        const accessToken = localStorage.getItem(LOCALSTORAGEACCESSTOKENKEY);
        await axios.get(BACKEND_URL + '/album/newest', {
            headers:{
                Authorization:`Bearer ${accessToken}`
            }
        }).then((value)=>{
            console.log(value.data.data)
            setImagesArray([...imagesArray, ...value.data.data])
            setIsDone(true)
        }).catch((err)=>{
            console.log(err)
            dispatch(resetUser())
            dispatch(resetProfile())
            localStorage.clear()
            navigate('/auth/signin')
        })
    }


    async function getStory(){
        
        setLoadingData(true);
        const accessToken = localStorage.getItem(LOCALSTORAGEACCESSTOKENKEY);
        await axios.get(BACKEND_URL + '/story/newest', {
            headers:{
                Authorization:`Bearer ${accessToken}`
            }
        }).then((value)=>{
            // console.log(value.data.data)
            
            setImagesArray([...imagesArray, ...value.data.data])
        }).catch((err)=>{
            console.log(err)
            dispatch(resetUser())
            dispatch(resetProfile())
            localStorage.clear()
            navigate('/auth/signin')
        }).finally(()=>{
            setLoadingData(false)
            setIsDone(false)
        })
    }

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
        if(profileState.fufilled){
            getArtwork()
            
            getAlbum()
        }

    }, [profileState])


    useEffect(()=>{
        if(isDone){
            getStory()
        }
    } , [imagesArray])





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
                navigate('/auth/signin')
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
                       {!loadingdata && <img alt=""  src={value.imageUris[0]} height={137} width={125} style={{
                        borderRadius:6
                       }}/>} 
                        <p className="active" onClick={()=>navigate('/market/shop')} style={{fontSize:14, textAlign:'center'}}>view in shop</p>
                    </div>
                    {/* <div>
                        <img alt=""  src={trending2}/>
                        <p className="active" onClick={()=>navigate('/market/shop')} style={{fontSize:14, textAlign:'center'}}>view in shop</p>
                    </div>
                    <div>   
                        <img alt=""  src={trending3}/>
                        <p className="active" onClick={()=>navigate('/market/shop')} style={{fontSize:14, textAlign:'center'}}>view in shop</p>
                    </div> */}
                </div>)
            }
            </div>}
            <div className="home-explore-main-section">
                <h3>Explore photo Collection and story</h3>
                {loadingdata ? <div style={{   height:'100vh',
                        width:'98vw',
                        padding:'50px 0',
                        display:'flex',
                        justifyContent:'center'
                        }}>
                        <ClipLoader color="#BE774D" size={35}/>
                </div> :
                <div className="home-photo-mainbody">
                    {imagesArray.map((value)=> {
                        return <div className="home-photo-mainbody-item">
                            {!loadingdata && value.albumImageUris !== undefined && <img style={{borderRadius:7}} src={value.albumImageUris[0]} width={156} height={190} alt='' onClick={()=>{navigate('/collection/album?aid=' + value.id)}}/>}
                            {!loadingdata && value.albumImageUris === undefined && <img style={{borderRadius:7}} src={value.secondImage} width={156} height={190} alt='' onClick={()=>{navigate('/collection/story/' + value.title + '?sid=' +value.id)}}s/>}
                            <div className="text-structurecontainer">
                                <p>{value.title}</p>
                            </div>
                    </div>})}
                </div>}
            </div>
        </div>
    </div>
        
        <div className="shop-footer-container">
            <BottomNavi imageTextObjectArray={iconTextArray}/>
        </div>

</div>
} 