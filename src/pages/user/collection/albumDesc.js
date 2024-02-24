import image1 from '../../../assets/image1.png';
import image2 from '../../../assets/image2.png';
import trending1 from '../../../assets/trending1.png';
import trending2 from '../../../assets/trending2.png';
import trending3 from '../../../assets/trending3.png';
import Carousel from 'react-material-ui-carousel';
import like from '../../../assets/Vector.png';
import share from '../../../assets/Share.png';
import { useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { ClipLoader } from 'react-spinners';
import BACKEND_URL, { LOCALSTORAGEACCESSTOKENKEY } from '../../../config';
import axios from 'axios';
import { ErrorDialogComp } from '../../../components/errorDialogComp';
import { SnackBar } from '../../../components/snackBar';
import { FRONTEND_URL } from '../../../config';

export function AlbumDesc(){
    const imageArray = [image1, image2, trending1, trending2, trending3];
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search)
    const albumid = searchParams.get('aid');
    const month = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec']

    const [loadingState, setLoadingState] = useState(false);
    const [artistProfileId, setArtistProfileId] = useState('');
    const [artDetail, setArtDetail] = useState(false);
    const [activityIndicator, setActivityIndicator] = useState('');
    const [itemToAdd, setItemToAdd] = useState(0);
    
   const [errorMessage, setErrorMessage] = useState({
    title:"",
    content:"",
    command:[],
    type:"",
    keyword:""
   })
   const [openError, setOpenError] = useState(false);
   const [snackState, setSnackState] = useState(false)

   function copyToClipboard(text) {
    navigator.clipboard.writeText(text)
        .then(() => {
            console.log('Text copied to clipboard:', text);
            setSnackState(true)
        })
        .catch(err => {
            console.error('Failed to copy text:', err);
        });
}

   
   const date = new Date(artDetail.updatedAt);
   async function getArtworkItem(artworid){
    setLoadingState(true);
    let accessToken = localStorage.getItem(LOCALSTORAGEACCESSTOKENKEY);

    await axios.get(BACKEND_URL + '/album/' + artworid, {
        headers:{
            Authorization:`Bearer ${accessToken}`
        }
    })
    .then((value)=>{
        console.log(value.data.data)
        setArtistProfileId(value.data.data.album.ProfileId)
        setArtDetail(value.data.data.album)
    })
    .catch((err)=>{
        console.log(err);
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
        getArtworkItem(albumid).finally(()=>{
            setLoadingState(false)
        });

    }, [])

    
    useEffect(()=>{
        if(snackState){
            setTimeout(()=>{
                setSnackState(false)
            }, 1000)
        }
    }, [snackState])


    return <div className='detail-desc-main-container home-page-body'>
    
    <SnackBar text={'Url coppied'} onState={snackState} closeState={()=>setSnackState(false)}/>
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
                {!loadingState && artDetail  && <div style={{overflowY:'scroll', paddingBottom:100}}>
                    <div className="collection-main-header">
                      
                    </div>
                    <div className='collection-main-body'>
                        {artDetail && <Carousel 
                        autoPlay={false}
                        animation='slide'
                        navButtonsAlwaysVisible = {true}
                        navButtonsProps={{
                            style:{
                                color:'white',
                                backgroundColor:'white'
                            }
                        }}

                        >
                            {
                                artDetail.albumImageUris.map((value, index)=><div className='collection-detail-image-container' key={index}>
                                    <img src={value} alt=''/>
                                </div>)
                            }
                        </Carousel>}
                    </div>
                    <div className='title-like-share-container'>
                        <div className='title-name-publiser-container'>
                            <p className='title'>{artDetail.title}</p>
                            <p className='creator'>creator:{artDetail.profile.name}</p>
                            <p className='publish'>published: {month[date.getMonth()] +' '+ date.getDay() + ', ' + date.getFullYear()}</p>
                        </div>
                        <div className='like-share-button-container' style={{justifyContent:'flex-end'}}>
                            {/* <button className='like-button'>
                            <img src= {like} height={14} width={17}/>
                            </button> */}
                            <button className='share-button' onClick={()=>{
                                const textToCopy = FRONTEND_URL + '/collection/album?aid=' + artDetail.id;
                                copyToClipboard(textToCopy);
                                
                            }}>
                                <img src={share} height={15}
                                    width={15}

                                />
                            </button>
                        </div>
                    </div>
                    <div className='description-container'>
                        <p>{artDetail.description}</p>
                    </div>

                </div>}

    </div>
}