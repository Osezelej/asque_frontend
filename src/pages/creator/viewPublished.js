import { useEffect, useState } from "react";
import {ReactComponent as Profile} from '../../assets/Profile 1.svg';
import {ReactComponent as Category} from '../../assets/Category.svg';
import { BottomNavi } from "../../components/bottomNavi";
import image1 from '../../assets/image1.png';
import image2 from '../../assets/image2.png';
import rafki from '../../assets/rafiki.png';
import { ClipLoader } from "react-spinners";
import BACKEND_URL, { LOCALSTORAGEACCESSTOKENKEY, LOCALSTORAGEPROFILEKEY } from "../../config";
import axios from "axios";

export function ViewedPublished(){
    const [loadingdata, setLoadingData] = useState(false)

    let [chosenContent, SetChosenContent] = useState({
        store:true,
        album:false,
        stories:false,
    });
    let albumContent = []
    let storiesContent = []

    const imageArray = [
        {
            image:image1,
            title:'Walls of Kano',
            price:'112',
            status:'sold'
        },
        {
            image:image2,
            title:'Walls of Kano',
            price:'112',
            status:'pending purchase'
        }
    ]

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
    async function getPublishedData(){
        let profileId = JSON.parse(localStorage.getItem(LOCALSTORAGEPROFILEKEY)).id
        let accessToken = localStorage.getItem(LOCALSTORAGEACCESSTOKENKEY);
        await axios.get(BACKEND_URL + '/story/own' + `?profileId=${profileId}&currentPage={2}`, {
            headers:{
                Authorization:`Bearer ${accessToken}`
            }
        }).then((value)=>{
            console.log(value)
        }).catch((err)=>{
            console.log(err)
        })
    }
    useEffect(()=>{
        getPublishedData()
    }, [])
    return <div className="view-published-main-container home-page-body">
        { loadingdata ? <div style={{
            height:'100%',
            width:'100vw',
            padding:'30px 0',
            display:'flex',
            justifyContent:'center'
            
        }}>
            <ClipLoader color="#BE774C" size={30} />
        </div>: <div style={{overflowY:'scroll'}}>
            <div className="shop-header-container" style={{
                        minHeight:50,
                        display:'flex',
                        justifyContent:'space-between',
                        flexDirection:'row',
                        alignItems:'flex-end'
                    }}>
                        {chosenContent.store ? <p  style={{
                                        color:'#BE774C', 
                                        fontWeight:'bold', 
                                        borderBottomWidth: 2, 
                                        borderBottomStyle:'solid',
                                        paddingBottom:5,

                                        }}>Listed artwork</p>:<p onClick={()=>SetChosenContent((prev)=>{return {album:false, store:true, stories:false}})}>Listed artwork</p>
                                        
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
                {chosenContent.store && <div className="creator-detail-item-container">
                {imageArray.length == 0 && <div className="empty-content-display-container"  style={{width:'100%', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', marginTop:20}}>
                        <div className="empty-content-image-container">
                                <img src={rafki}/>
                        </div>
                        <p>You haven't published anything yet.</p>

                    </div>}
                    {
                        imageArray.map((value)=><div className="artwork-collection-container" style={{marginTop:10, marginBottom:10}}>
                            <div className="artwork-image-container">
                                <img src={value.image} style={{
                                    width:'100%',
                                    height:200,
                                    objectFit:'cover',
                                    borderRadius:20
                                }}/>
                            </div>
                            <div className="artwork-text-price-container" style={{display:'flex', justifyContent:'space-between'}}>
                                <div>
                                    <p className="title" style={{fontWeight:'bold'}}>
                                        {value.title}
                                    </p>
                                    {value.status.toLowerCase() == 'sold' ? <div style={{color:'#45A14D', display:'flex', columnGap:10, alignItems:'center'}} >
                                        <div style={{height:4, width:4, borderRadius:10, backgroundColor:'#45A14D'}} ></div>
                                        <p style={{color:'#45A14D'}}>{value.status}</p>
                                    </div>: <div style={{color:'#E6A545', display:'flex', columnGap:10, alignItems:'center'}}>
                                        <div style={{height:4, width:4, borderRadius:10, backgroundColor:'#E6A545'}}></div>
                                        <p style={{color:'#E6A545'}}>{value.status}</p>
                                    </div>}
                                </div>
                                <p className="active"> $ {value.price}</p>
                            </div>
                        </div>)
                    }
                </div>}
                {chosenContent.album && <div className="creator-detail-item-container">
                    {albumContent.length == 0 && <div className="empty-content-display-container" style={{width:'100%', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', marginTop:20}}>
                        <div className="empty-content-image-container">
                                <img src={rafki}/>
                        </div>
                        <p>You haven't published anything yet.</p>

                    </div>}
                </div>}
                {chosenContent.stories && <div className="creator-detail-item-container">
                {storiesContent.length == 0 && <div className="empty-content-display-container" style={{width:'100%', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', marginTop:20}}>
                        <div className="empty-content-image-container">
                                <img src={rafki}/>
                        </div>
                        <p>You haven't published anything yet.</p>

                    </div>}
                </div>}

        </div>}
        
        <div className="shop-footer-container">
            <BottomNavi imageTextObjectArray={iconTextArray}/>
        </div>
    </div>
}