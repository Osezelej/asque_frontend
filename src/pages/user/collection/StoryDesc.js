import image1 from '../../../assets/image1.png';
import share from '../../../assets/Share.png';
import like from '../../../assets/Vector.png';
import { useState, useEffect } from "react";
import { ClipLoader } from "react-spinners";
import {  useLocation, useNavigate } from 'react-router-dom';
import BACKEND_URL, {LOCALSTORAGEACCESSTOKENKEY} from '../../../config';
import axios from 'axios';
import { ErrorDialogComp } from '../../../components/errorDialogComp';

export function StoryDesc(){
    const navigate = useNavigate();
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search)
    const storyid = searchParams.get('sid');
    console.log(storyid)
    const month = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec']

    const [loadingState, setLoadingState] = useState(false);
    const [artDetail, setArtDetail] = useState(false);
        
   const [errorMessage, setErrorMessage] = useState({
    title:"",
    content:"",
    command:[],
    type:"",
    keyword:""
   })
   const [openError, setOpenError] = useState(false);


    async function getArtworkItem(artworid){
        setLoadingState(true);
        let accessToken = localStorage.getItem(LOCALSTORAGEACCESSTOKENKEY);
    
        await axios.get(BACKEND_URL + '/story/' + artworid, {
            headers:{
                Authorization:`Bearer ${accessToken}`
            }
        })
        .then((value)=>{
            console.log(value.data.message.blog)
            setArtDetail(value.data.message.blog)
        })
        .catch((err)=>{
            console.log(err);
            if (err.response.status == 401){
                navigate('/auth/signin')
            }
            setErrorMessage({
                title:'Error',
                content:err.message,
                type:'warning',
                command:['Okay']
            })
            setOpenError(true)
        })
        .finally((err)=>{
            
        })
        }

        useEffect(()=>{
            getArtworkItem(storyid).finally(()=>{
                setLoadingState(false)
            });
    
        }, [])

        const date = new Date(artDetail.updatedAt);
    return <div className="story-desc-body-page home-page-body">
                <ErrorDialogComp 
                     content={errorMessage.content} 
                    title={errorMessage.title}
                    commands={errorMessage.command}
                    openModal={openError}
                    setOpenModal={setOpenError}
                    contentKeyword={errorMessage.keyword}
                    type={errorMessage.type}
                    />
       {loadingState && <div style={{
            height:'100vh',
            width:'99vw',
            display:'flex',
            justifyContent:'center',
            alignItems:'center',
        }}>
            <ClipLoader color='#BE774C' size={35}/>
        </div>}

        {!loadingState && artDetail  &&  <div style={{overflowY:'scroll'}}>
        <div className="collection-main-header">
                      
                      </div>
            <div className="story-image-container">
                <img src={artDetail.firstImage} alt=''/>
            </div>
            <div className='title-like-share-container'>
                    <div className='title-name-publiser-container'>
                        <p className='title'>{artDetail.title}</p>
                        <p className='creator'>creator: {artDetail.profile.name}</p>
                        <p className='publish'>published:  {month[date.getMonth()] +' '+ date.getDay() + ', ' + date.getFullYear()}</p>
                    </div>
                    <div className='like-share-button-container'>
                        <button className='like-button'>
                            <img src={like} height={15} width={17}/>
                        </button>
                        <button className='share-button'>
                            <img src={share} alt=''/>
                        </button>
                    </div>
            </div>
            <div className="description-text-container">
                <p>{artDetail.content}</p>
            </div>
            <h3>More photo</h3>
            <div className="story-image-container">
                <img src={artDetail.secondImage} alt=''/>
            </div>
            <div className="story-image-container">
                <img src={artDetail.thirdImage} alt=''/>
            </div>
        </div>}
    </div>
}