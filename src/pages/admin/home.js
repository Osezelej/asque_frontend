import trending1 from '../../assets/trending1.png';
import trending2 from '../../assets/trending2.png';
import trending3 from '../../assets/trending3.png';
import image1 from '../../assets/image1.png';
import image2 from '../../assets/image2.png';
import { useState, useEffect } from 'react';
import { SearchRounded } from '@mui/icons-material';
import '../../css/admin.css';
import { ErrorDialogComp } from '../../components/errorDialogComp';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { profileThunk } from '../../store/user';
import { ClipLoader } from 'react-spinners';
import axios from 'axios';
import BACKEND_URL, {LOCALSTORAGEACCESSTOKENKEY} from '../../config';

export function AdminHome(){
    const profileState = useSelector(state=>state.user.profile)
    const dispatch = useDispatch()

    const navigate = useNavigate();
    
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search)
    const userid = searchParams.get('q')

    const [artistProfileLoading, setArtistProfileLoading] = useState(true)
     const [loadingdata, setLoadingData] = useState(false);

    async function getPublishedData( category, page ){
        setLoadingData(true);
        let data;
        if(!navigator.onLine){
            setErrorMessage({
                title:'Network Error',
                content:'you do not have an ',
                command:['okay'],
                type:'warning'
            });
            return setOpenModal(true)
        }
        let accessToken = localStorage.getItem(LOCALSTORAGEACCESSTOKENKEY);
        await axios.get(BACKEND_URL + `/${category}/all` + `?page=${page}&pageSize=${10}`, {
            headers:{
                Authorization:`Bearer ${accessToken}`
            }
        }).then((value)=>{
            console.log(value.data.data)
            data = value.data.data;
        }).catch((err)=>{
            console.log(err)
            setErrorMessage({
                title:'Error',
                content:'An error occured ',
                command:['okay'],
                type:'warning'
            });
            setOpenModal(true)
        }).finally(()=>{
            setLoadingData(false)
        })
        if(data){
            return data;
        }
        else{
            return false
        }
    }
    async function handleDeleteData(category, itemId){
        const accessToken = localStorage.getItem(LOCALSTORAGEACCESSTOKENKEY);
        await axios.delete(BACKEND_URL + `/${category}/${itemId}`, {
            headers:{
                Authorization:`Bearer ${accessToken}`
            }
        }).then((value)=>{
            console.log(value.data);
        }).catch((err)=>{
            console.log(err)
        });
        
    }

    const [errorMessage, setErrorMessage] = useState({
        title:"",
        content:"",
        keyword:"",
        type:"",
        command:[],

    })

    const [trendingData, setTrandingData] = useState([1,2,3,4,54,5,6,7,3,3]);
    let [imagesArray , setImageArray]= useState([]);
    const [albumContent, setAlbumContent] = useState([]);
    const [storyContent, setStoriesContent] = useState([]);
    const [categoryData, setCategoryData] = useState({
        category:'artwork',
        page:1
    });
    const imageArray = [image1, image2, trending1, trending2, trending3]
    let [chosenContent, SetChosenContent] = useState({
        store:true,
        album:false,
        stories:false,
    });
    let [openModal, setOpenModal] = useState(false)


    useEffect(()=>{
        if(!profileState.loading && !profileState.error && !profileState.fufilled){
            console.log(profileState)
            dispatch(profileThunk(userid))
        }
        if(profileState.error){
            setOpenModal(true)
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


    useEffect(()=>{
        if(chosenContent.store){
            
        getPublishedData('artwork', categoryData.page).then((value)=>{
            if (value){
                console.log(value.data)
                setImageArray(value.data)
            }
        })

        }else if (chosenContent.album){

            getPublishedData('album', categoryData.page).then((value)=>{
                if (value){
                    console.log(value.data)
                    setAlbumContent(value.data)
                }
            })

        }else{
            
            getPublishedData('story', categoryData.page).then((value)=>{
                if (value){
                    console.log(value.blogs)
                    setStoriesContent(value.blogs)
                }
            })
        }
    }, [categoryData.page, chosenContent]);
    


    return <div className="home-page-body">
    <ErrorDialogComp 
        content={errorMessage.content} 
        title={errorMessage.title}
        commands={errorMessage.command}
        openModal={openModal}
        setOpenModal={setOpenModal}
        contentKeyword={errorMessage.keyword}
        type={errorMessage.type}
    />
   
     {artistProfileLoading ? <div style={{
        height:'100vh',
        display:'flex',
        justifyContent:'center',
        paddingTop:50,
        width:'97vw'
     }}>
        <ClipLoader color='#BE774C' size={30}/>
     </div> : <div style={{overflowY:'scroll'}}>
            <div className="home-header-container ">
                <div className="home-name-greeting-container">
                    <h3>{profileState.name}</h3>
                    <p>Good afternoon, welcome back </p>
                </div>
                
            </div>
            <div className="home-body-container">
            <div className="trending-artwork-container">
                <h4>Edit collections</h4>
                <p className="active">see all</p>
            </div>
            
            <div >
            { loadingdata ? <div style={{
                        height:'100%',
                        width:'100%',
                        padding:'50px 0',
                        display:'flex',
                        justifyContent:'center'
                        
                    }}>
                        <ClipLoader color="#BE774C" size={30} />
                    </div>:
            <div className="home-image-list-container">
            
           {trendingData.map((value, index)=> <div className="home-image-item-container" key={index}>
                    <div>
                        <img alt="artwork"  src={trending1}/>
                    </div>
                    <div>
                        <img alt=""  src={trending2}/>
                    </div>
                    <div>   
                        <img alt=""  src={trending3}/>
                    </div>
                </div>)
            } 
            </div>}
            </div>

            <div className="home-explore-main-section">
                <h3>Delete Item</h3>

                <div className='admin-navigation-header'>
                    {chosenContent.store ? <p  style={{
                                    color:'#BE774C', 
                                    fontWeight:'bold', 
                                    borderBottomWidth: 2, 
                                    borderBottomStyle:'solid',
                                    paddingBottom:5,

                                    }}>Store</p>:<p onClick={()=>SetChosenContent((prev)=>{return {album:false, store:true, stories:false}})}>Store</p>
                                    
                    }
                    {chosenContent.album ? <p style={{
                                    color:'#BE774C', 
                                    fontWeight:'bold', 
                                    borderBottomWidth: 2, 
                                    borderBottomStyle:'solid',
                                    paddingBottom:5,

                                    }}>Album</p>:<p onClick={()=>SetChosenContent((prev)=>{return {album:true, store:false, stories:false}})} >Album</p>
                                    
                    }
                    {chosenContent.stories? <p   style={{
                                    color:'#BE774C', 
                                    fontWeight:'bold', 
                                    borderBottomWidth: 2, 
                                    borderBottomStyle:'solid',
                                    paddingBottom:5,

                                    }}>Stories</p>:<p onClick={()=>SetChosenContent((prev)=>{return {album:false, store:false, stories:true}})}>Stories</p>
                                    
                    }
                </div>
                <div className='search-icon-name-container'>
                        <SearchRounded style={{
                            height:25.5,
                            width:25.5
                        }}/>
                        <input type='text' placeholder='Search'/>
                    </div>
                    { loadingdata && <div style={{
                        height:'100vh',
                        width:'98vw',
                        padding:'50px 0',
                        display:'flex',
                        justifyContent:'center'
                        
                    }}>
                        <ClipLoader color="#BE774C" size={30} />
                    </div>
                }
                {(chosenContent.store && ! loadingdata) && <div className="home-photo-mainbody" style={{rowGap:25}}>
                    {imagesArray.map((value, index)=> <div className='shop-body-content-item-container' key={index}>
                            <div className='image-section' style={{
                                    width:'5%',
                                    height:'60%'
                                }}>
                                <img src={value.imageUris[0]} alt='' style={{
                                    objectFit:'contain',
                                    height:'100%'
                                }}/>
                            </div>
                            <div className='item-name-text-price-container'>
                                <div className='item-name-text-container'>
                                    <p className='title'>
                                       {value.title}
                                    </p>
                                    <p className='text'>
                                        {value.description.substring(0, 25)}
                                    </p>
                                </div>
                                <p className='price'>${value.price}</p>
                            </div>
                            <div className='share-shopnow-button-container'>
                                
                                <button 
                                    className='shopnow-button' 
                                    style={{width:'100%'}} 
                                    onClick={()=>{
                                        handleDeleteData('artwork', value.id).then((value)=>{
                                            getPublishedData('artwork', 1).then((value)=>{
                                                if (value){
                                                    console.log(value.data)
                                                    setImageArray(value.data)
                                                }
                                            })
                                        })
                                }}>
                                Delete Now 
                                </button>
                            </div>

                    </div>)
                    }
                </div>
                }
               
                {(chosenContent.album && ! loadingdata)&& <div className="home-photo-mainbody" style={{rowGap:25}}>
                    {albumContent.map((value, index)=> <div className='shop-body-content-item-container' key={index}>
                            <div className='image-section'>
                                <img src={value} alt='photo'/>
                            </div>
                            <div className='item-name-text-price-container'>
                                <div className='item-name-text-container'>
                                    <p className='title'>
                                        Walls of Kano
                                    </p>
                                    <p className='text'>
                                        The Ancient kano city walls
                                    </p>
                                </div>
                                <p className='price'></p>
                            </div>
                            <div className='share-shopnow-button-container'>
                                
                                <button className='shopnow-button' style={{width:'100%'}}>Delete Now </button>
                            </div>

                    </div>)
                    }
                </div>}
                {(chosenContent.stories && ! loadingdata) &&  <div className='Stories-body-container'>
                            {storyContent.map((value)=><div>
                                <div className='stories-item-container'>

                                    <div className='text-container'>
                                        <p className='title'>Kanuri Castle</p>
                                        <p style={{fontSize:14, width:251}}>Lets make your comfort zone memorable, Order for a product Above 50,000 naira and get a free Shipping. </p>
                                    </div>
                                    <div className='story-image-containe'>
                                        <img src={value} height={55} width={55}/>
                                    </div>
                                </div>
                                <div className='share-shopnow-button-container'>
                                    <button className='shopnow-button' style={{width:'100%'}} onClick={()=>{
                                        setErrorMessage({
                                            content:"Are you sure you want to delete",
                                            title:"Confirm delete",
                                            command:["No,back", "Yes"],
                                            keyword:"Kanuri castle?",
                                            type:'warning'
                                        })
                                        
                                        setOpenModal(true)}} >Delete Now </button>
                                </div>
                            </div>)}
                        </div>}
            </div>
        </div>
        </div> }   


    </div>
}