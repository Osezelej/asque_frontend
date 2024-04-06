import { useEffect, useState } from "react";
import {ReactComponent as Profile} from '../../assets/Profile 1.svg';
import {ReactComponent as Category} from '../../assets/Category.svg';
import { BottomNavi } from "../../components/bottomNavi";
import rafki from '../../assets/rafiki.png';
import { ClipLoader } from "react-spinners";
import BACKEND_URL, { LOCALSTORAGEACCESSTOKENKEY } from "../../config";
import axios from "axios";
import { ErrorDialogComp } from '../../components/errorDialogComp';

export function ViewedPublished(){
    const [loadingdata, setLoadingData] = useState(false);
    const [categoryData, setCategoryData] = useState({
        category:'artwork',
        page:1
    });
    const [activityIndicator, setActivityIndicator] = useState(false);

    let [chosenContent, SetChosenContent] = useState({
        store:true,
        album:false,
        stories:false,
    });
    const [errorMessage, setErrorMessage] = useState({
        title:"",
        content:"",
        keyword:"",
        type:"",
        command:[],

    })
    const [openError, setOpenError] = useState(false)
    let [albumContent, setAlbumContent] = useState([]);
    let [storiesContent, setStoriesContent] = useState([]);

    const [imageArray, setImageArray] = useState([
       
    ]);

    const iconTextArray =[

        {
            icon:Category,
            text:"Create",
            link:"/creator/home",
            isActive:false
        },
        {
            icon:Category,
            text:"View published",
            link:"/creator/published",
            isActive:true
        },
        {
            icon:Profile,
            text:"Profile",
            link:"/profile/creator",
            isActive:false
        },
    ]

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
            return setOpenError(true)
        }
        let accessToken = localStorage.getItem(LOCALSTORAGEACCESSTOKENKEY);
        await axios.get(BACKEND_URL + `/${category}/own?page=${page}&pageSize=${10}`, {
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
            setOpenError(true)
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


    useEffect(()=>{
        if(chosenContent.store){
            
        getPublishedData('artwork', categoryData.page).then((value)=>{
            if (value){
                
                setImageArray(value.data)
            }
        }).finally(()=>{
            setActivityIndicator(false)
        })

        }else if (chosenContent.album){

            getPublishedData('album', categoryData.page).then((value)=>{
                if (value){
                    console.log(value.data)
                    setAlbumContent(value.data)
                }
            }).finally(()=>{
                setActivityIndicator(false)
            })

        }else{
            
            getPublishedData('story', categoryData.page).then((value)=>{
                if (value){
                    console.log(value.blogs)
                    setStoriesContent(value.blogs)
                }
            }).finally(()=>{
                setActivityIndicator(false)
            })
        }
    }, [categoryData.page, chosenContent]);


    return <div className="view-published-main-container home-page-body">
    <ErrorDialogComp
                commands={errorMessage.command}
                content={errorMessage.content}
                type={errorMessage.type}
                openModal={openError}
                setOpenModal={setOpenError}
                title={errorMessage.title}
                contentKeyword={errorMessage.keyword}
            />
      <div style={{overflowY:'scroll'}}>
            <div className="shop-header-container" style={{
                        minHeight:50,
                        display:'flex',
                        justifyContent:'space-between',
                        flexDirection:'row',
                        alignItems:'flex-end',
                        marginBottom:48,
                        borderBottomWidth:0.5,
                        borderBottomStyle:'solid',
                        borderBottomColor:'#c4c4c4ae'
                    }}>
                        {chosenContent.store ? <p  style={{
                                        color:'#BE774C', 
                                        fontWeight:'bold', 
                                        borderBottomWidth: 2, 
                                        borderBottomStyle:'solid',
                                        paddingBottom:5,

                                        }}
                                        onClick={()=>{
                                            setCategoryData({
                                                ...categoryData, 
                                                page:1
                                            })
                                        }}>Listed artwork</p>:<p onClick={()=>{
                                            setCategoryData({
                                                ...categoryData, 
                                                page:1
                                            })
                                            SetChosenContent((prev)=>{
                                                return {
                                                    album:false, 
                                                    store:true, 
                                                    stories:false
                                                    }
                                                    }
                                                    )
                                                    
                                                    }}>Listed artwork</p>
                                        
                        }
                        {chosenContent.album ? <p style={{
                                        color:'#BE774C', 
                                        fontWeight:'bold', 
                                        borderBottomWidth: 2, 
                                        borderBottomStyle:'solid',
                                        paddingBottom:5,

                                        }}
                                        onClick={()=>{
                                            setCategoryData({
                                                ...categoryData, 
                                                page:1
                                            })
                                        }}>Album</p>:<p onClick={()=>{
                                            setCategoryData({
                                                ...categoryData, 
                                                page:1
                                            })
                                            SetChosenContent((prev)=>{return {album:true, store:false, stories:false}})
                                            }} >Album</p>
                                        
                        }
                        {chosenContent.stories? <p   style={{
                                        color:'#BE774C', 
                                        fontWeight:'bold', 
                                        borderBottomWidth: 2, 
                                        borderBottomStyle:'solid',
                                        paddingBottom:5,

                                        }}
                                        onClick={()=>{
                                            setCategoryData({
                                                ...categoryData, 
                                                page:1
                                            })
                                        }}>Stories</p>:<p onClick={()=>{
                                            setCategoryData({
                                                ...categoryData, 
                                                page:1
                                            })
                                            SetChosenContent((prev)=>{return {album:false, store:false, stories:true}})}}>Stories</p>
                                        
                        }
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
                {(chosenContent.store && ! loadingdata) && <div className="creator-detail-item-container">
                {imageArray.length === 0 && <div className="empty-content-display-container"  style={{width:'100%', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', marginTop:20}}>
                        <div className="empty-content-image-container">
                                <img src={rafki} alt=""/>
                        </div>
                        <p>You haven't published anything yet.</p>

                    </div>}
                    {
                        imageArray.map((value, index)=>{
                            return  <div className="artwork-collection-container" style={{marginTop:25, marginBottom:25}}>
                            <div className="artwork-image-container">
                                {value.imageUris.length > 0 && <img alt="" src={value.imageUris[0]} style={{
                                    width:'100%',
                                    height:200,
                                    objectFit:'cover',
                                    borderRadius:20
                                }}/>}
                            </div>
                            <div className="artwork-text-price-container" style={{display:'flex', justifyContent:'space-between', marginTop:12}}>
                                <div>
                                    <p className="title" style={{fontWeight:'bold'}}>
                                        {value.title}
                                    </p>
                                    {value.status === 'sold' ? <div style={{color:'#45A14D', display:'flex', columnGap:10, alignItems:'center', marginTop:6}} >
                                        <div style={{height:4, width:4, borderRadius:10, backgroundColor:'#45A14D'}} ></div>
                                        <p style={{color:'#45A14D'}}>sold out</p>
                                    </div>: <div style={{color:'#E6A545', display:'flex', columnGap:10, alignItems:'center', marginTop:6}}>
                                        <div style={{height:4, width:4, borderRadius:10, backgroundColor:'#E6A545'}}></div>
                                        <p style={{color:'#E6A545'}}>still in stock</p>
                                    </div>}
                                </div>
                                <p className="active"> $ {value.price}</p>
                            </div>
                            
                        </div>})
                    }
                    {imageArray.length === 10 && <div className="add-to-cart-button-container" style={{width:'100%'}}>
                        <button onClick={()=>{
                        if(activityIndicator){
                            return 
                        }
                        setActivityIndicator(true)
                        setCategoryData({...categoryData, page:categoryData.page + 1})
                    }}> {activityIndicator ? <ClipLoader color='white' size={25} />  :' See more'}</button>
                </div>}
                </div>}
                {(chosenContent.album && ! loadingdata) && <div 
                className="creator-detail-item-container">
                    {albumContent.length === 0 && <div 
                    className="empty-content-display-container" 
                    style={{
                        width:'100%', 
                        display:'flex', 
                        flexDirection:'column', 
                        alignItems:'center', 
                        justifyContent:'center', 
                        marginTop:20,
                        }}>

                        <div className="empty-content-image-container">
                                <img src={rafki} alt=""/>
                        </div>
                        <p>You haven't published anything yet.</p>

                    </div>}
                    {
                        albumContent.map ((value)=><div className='collection-item-container' >
                                <div className='title-link-container'>
                                    <p className='title'>{value.title}</p>
                                    {/* <p className='active' onClick={()=>navigate('/collection/' + value.id)}>View</p> */}
                                </div>
                                <div className='image-container'>
                                    <img src={value.albumImageUris[0]} loading="lazy"  alt=""/>
                                </div>
                            </div>)
                    }
                    {albumContent.length === 10 && <div className="add-to-cart-button-container" style={{width:'100%'}}>
                        <button onClick={()=>{
                        if(activityIndicator){
                            return 
                        }
                        setActivityIndicator(true)
                        setCategoryData({...categoryData, page:categoryData.page + 1})
                    }}> {activityIndicator ? <ClipLoader color='white' size={25} />  :' See more'}</button>
                </div>}
                </div>}
                {(chosenContent.stories && ! loadingdata )&& <div className="creator-detail-item-container">
                
                {storiesContent.length === 0 && <div className="empty-content-display-container" style={{width:'100%', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', marginTop:20}}>
                        <div className="empty-content-image-container">
                                <img src={rafki} alt=""/>
                        </div>
                        <p>You haven't published anything yet.</p>

                    </div>}

                    {
                        storiesContent.map((value, index)=>{
                            return <div className='stories-item-container ' >
                                <div className='text-container'>
                                    <p className='title'>{value.title}</p>
                                    <p style={{fontSize:14, width:251}}>{value.content.substring(0, 120)}</p>
                                </div>
                                <div className='story-image-containe'>
                                    <img src={value.firstImage} height={55} width={55} alt=""/>
                                </div>
                                
                            </div>
                        })
                    }
                    {storiesContent.length === 10 && <div className="add-to-cart-button-container" style={{width:'100%'}}>
                        <button onClick={()=>{
                        if(activityIndicator){
                            return 
                        }
                        setActivityIndicator(true)
                        setCategoryData({...categoryData, page:categoryData.page + 1})
                    }}> {activityIndicator ? <ClipLoader color='white' size={25} />  :' See more'}</button>
                </div>}
                </div>}

        </div>
        
        <div className="shop-footer-container">
            <BottomNavi imageTextObjectArray={iconTextArray}/>
        </div>
    </div>
}