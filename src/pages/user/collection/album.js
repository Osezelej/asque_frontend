import {ReactComponent as Profile} from '../../../assets/Profile 1.svg';
import {ReactComponent as Home} from '../../../assets/Home3.svg';
import {ReactComponent as Category} from '../../../assets/Category.svg';
import { BottomNavi } from "../../../components/bottomNavi";
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import BACKEND_URL, { LOCALSTORAGEACCESSTOKENKEY } from '../../../config';
import axios from 'axios';
import { ClipLoader } from 'react-spinners';

export function Album(){
    const [imageArray, setImageArray] = useState([]);
    const iconTextArray =[
        {
            icon:Home,
            text:"Home",
            link:"/market/home",
            isActive:false
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
            isActive:true
        },
        {
            icon:Profile,
            text:"Community",
            isActive:false,
            link:"/community/blessed",
        },
    ]
    
    const [isStory, setIsStory] = useState(false);
    const navigate = useNavigate();
    const [loadingData, setLoadingData] = useState(false);
    const [albumContent, setAlbumContent] = useState([]);
    const [storyContent, setStoriesContent] =  useState([]);
    const [errorMessage, setErrorMessage] = useState({
        title:"",
        content:"",
        type:"",
        command:[],
        keyword:""
    });
    const [openModal, setOpenModal] = useState(false);
    const [categoryData, setCategoryData] = useState({
        category:'artwork',
        page:1
    });
    const [activityIndicator, setActivityIndicator] = useState(false);


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
        await axios.get(BACKEND_URL + `/${category}/all?page=${page}&pageSize=${25}`, {
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




    useEffect(()=>{
        if (!isStory){

            getPublishedData('album', categoryData.page).then((value)=>{
                if (value){
                    console.log(value.data)
                    setAlbumContent(value.data)
                }
            }).finally(()=>{
                setLoadingData(false)
            })

        }else{
            
            getPublishedData('story', categoryData.page).then((value)=>{
                if (value){
                    console.log(value.blogs)
                    setStoriesContent(value.blogs)
                }
            }).finally(()=>{
                setLoadingData(false)
            })
        }
         // eslint-disable-next-line 
        }, [categoryData.page, isStory]);
    

    return <div className="collection-main-page home-page-body">
            {loadingData ? <div 
            style={{
                height:'100vh',
                width:'99vw',
                display:'flex',
                justifyContent:'center',
                alignItems:'center'
            }}
            >
                <ClipLoader color='#BE774C' size={35} />
            </div>:<div style={{overflowY:'scroll', marginBottom:0}}>
                        <div className="collection-main-header">
                            <div className="menu-title">
                                {!isStory ? <p onClick={()=>setIsStory(false)} style={{
                                    color:'#BE774C', 
                                    fontWeight:'bold', 
                                    borderBottomWidth: 2, 
                                    borderBottomStyle:'solid',
                                    paddingBottom:5,

                                    }}>Album</p>:<p onClick={()=>setIsStory(false)}>Album</p>}
                            </div>
                            <div className="menu-title">
                                  {isStory ? <p onClick={()=>setIsStory(true)} style={{
                                    color:'#BE774C', 
                                    fontWeight:'bold', 
                                    borderBottomWidth: 2, 
                                    borderBottomStyle:'solid',
                                    paddingBottom:5,
                                    
                                    }}>Stories</p>:<p onClick={()=>setIsStory(true)}>Stories</p>}
                            </div>
                        </div>
                       {!isStory && <div className='collention-body'>
                            {albumContent.map((value)=><div className='collection-item-container' >
                                <div className='title-link-container'>
                                    <p className='title'>{value.title}</p>
                                    <p className='active' onClick={()=>navigate('/collection/album?aid=' + value.id )}>View</p>
                                </div>
                                <div className='image-container'>
                                    <img src={value.albumImageUris[0]} />
                                </div>
                            </div>)}
                        </div>} 
                       {isStory && <div className='Stories-body-container creator-detail-item-container '>
                            {storyContent.map((value)=><div className='stories-item-container ' onClick={()=>{

                                navigate('/collection/story/' + value.title + '?sid=' +value.id)
                                }}>

                                <div className='text-container'>
                                    <p className='title'>{value.title}</p>
                                    
                                    <p style={{fontSize:14, width:251}}> {value.content.substring(0, 120)}
                                    {value.content.length > 120 && '...'}</p>
                                    
                                </div>
                                <div className='story-image-containe'>
                                    <img src={value.firstImage} height={55} width={55}/>
                                </div>
                            </div>)}
                        </div> } 
                        {albumContent.length === 25 && <div className="add-to-cart-button-container" style={{width:'100%'}}>
                        <button onClick={()=>{
                        if(activityIndicator){
                            return 
                        }
                        setActivityIndicator(true)
                        setCategoryData({...categoryData, page:categoryData.page + 1})
                    }}> {activityIndicator ? <ClipLoader color='white' size={25} />  :' See more'}</button>
                </div>}

                </div>}
                

                <div className="shop-footer-container">
                    <BottomNavi imageTextObjectArray={iconTextArray}/>
                </div>
            
    </div>
}
