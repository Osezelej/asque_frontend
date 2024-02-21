import share from '../../../assets/Share.png'
import { ShoppingBagOutlined } from '@mui/icons-material';
import BACKEND_URL, { LOCALSTORAGEACCESSTOKENKEY, LOCALSTORAGECARTKEY } from '../../../config';
import { useLocation, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { ClipLoader } from 'react-spinners';
import { useDispatch, useSelector } from 'react-redux';
import { resetCartData, addTocart} from '../../../store/cart';
import { ErrorDialogComp } from '../../../components/errorDialogComp';
import { SnackBar } from '../../../components/snackBar';
import { FRONTEND_URL } from '../../../config';


export function Details (){
    const navigate = useNavigate();
    const [snackState, setSnackState] = useState(false);
    const [imagesArray, setImagesArray] = useState([]); 
    const cartData = useSelector(state=>state.cart.cartData);
    const cartLen  = useSelector(state=>state.cart.cartLen);
    const dispatch = useDispatch();


    const location = useLocation();
    const searchParams = new URLSearchParams(location.search)
    const productid = searchParams.get('pid')
    
    const [loadingState, setLoadingState] = useState(false);
    const [artistProfileId, setArtistProfileId] = useState('');
    const [artDetail, setArtDetail] = useState('');
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


    async function getArtworkItem(artworid){
        setLoadingState(true);
        let accessToken = localStorage.getItem(LOCALSTORAGEACCESSTOKENKEY);
        let artwork
        console.log(productid)
        await axios.get(BACKEND_URL + '/artwork/' + artworid, {
            headers:{
                Authorization:`Bearer ${accessToken}`
            }
        })
        .then((value)=>{
            console.log(value.data.data)
            setArtistProfileId(value.data.data.artistProfileId)
            setArtDetail(value.data.data)
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

    async function getArtistProfileDetails(){
        await axios.get(BACKEND_URL + '/')
    }

    useEffect(()=>{
        dispatch(resetCartData())
        const dataLen = JSON.parse(localStorage.getItem(LOCALSTORAGECARTKEY))
        if(dataLen){ 
            dataLen.forEach(element => {
                dispatch(addTocart(element))
            });
        }
       }, [])

    useEffect(()=>{
        getArtworkItem(productid).finally(()=>{
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
     
   useEffect(()=>{
    if(cartData.length == 0){
        return ;
    }
    if(itemToAdd !== 1){
        return ;
    }
    localStorage.setItem(LOCALSTORAGECARTKEY, JSON.stringify(cartData));
   }, [cartData]);




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


    return <div className="detail-main-body  home-page-body">
    <SnackBar text={'URl coppied'} onState={snackState} closeState={()=>{setSnackState(false)}}/>
            <ErrorDialogComp
                commands={errorMessage.command}
                content={errorMessage.content}
                type={errorMessage.type}
                openModal={openError}
                setOpenModal={setOpenError}
                title={errorMessage.title}
                contentKeyword={errorMessage.keyword}
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
      { !loadingState && <div  className="shop-header-container"  style={{
       maxHeight:80,
       minHeight:80,
      }}>
            <div className="basket-section" onClick={()=>{
                if (JSON.parse(localStorage.getItem(LOCALSTORAGECARTKEY)).length === 0){
                    return ;
                }
                navigate('/market/cart')
            }}>
                <ShoppingBagOutlined/>
                <div style={{
                            padding:2,
                            height:15,
                            width:15,
                            borderRadius:20,
                            position:'absolute',
                            top:19,
                            right:10,
                            backgroundColor:'#BE774C',
                            display:'flex',
                            justifyContent:'center',
                            alignItems:'center'
                    }}>
                        <p style={{
                            fontWeight:'bold',
                            color:'white',
                            fontSize:10
                        }}>{cartLen}</p>
                    </div>
            </div>
            <div className="page-name-search-section">
                    <h1>{artDetail.title}</h1>
            </div>
        </div>}  

        {!loadingState && <div className="detail-image-container">
            {artDetail && <img src={artDetail.imageUris[0]} style={{
                width:'100%'
            }}/>}
        </div>}

        {!loadingState && <div className="title-share-desc-container">
            <div className="title-share">
                <h4>{artDetail.title}</h4>
                <button onClick={()=>{
                    const textToCopy = FRONTEND_URL + '/market/detail/artwork?sid=' +  productid;
                    copyToClipboard(textToCopy);
                    }}>
                    <img src={share}/>
                    <p>share</p>
                </button>
            </div>
            <div className="detail-description">
                <p>{artDetail.description}</p>
            </div>
        </div> }
        {!loadingState && <div className="detail-fact-item-container">
            {/* <div className="detail-fact-item">
                <p>Size</p>
                <p>40cm x 30cm</p>
            </div> */}
            <div className="detail-fact-item">
                <p>Artist</p>
                <p>Onuoha Favour</p>
            </div>
            <div className="detail-fact-item">
                <p>Availability</p>
                <p>{artDetail.purchaseStatus}</p>
            </div>
            <div className="detail-fact-item">
                <p>Price</p>
                <p>${artDetail.price}</p>
            </div>
            {/* <div className="detail-fact-item">
                <p>Quantity</p>
                <Quantity/>
            </div> */}
        </div> }
        
        {!loadingState && <div className="add-to-cart-button-container">
            <button onClick={()=>{
                if(activityIndicator){
                    return ;
                }

                setActivityIndicator(true)
                        let data = false;
                        for (let item of cartData){
                            if (artDetail.id === item.id){
                                data = true;
                            }
                        }
                        if(data){
                            
                            setActivityIndicator(false)
                            setErrorMessage({
                                title: 'Duplicate item',
                                content:artDetail.title + ' have been added to cart ',
                                keyword:'already',
                                command:['okay'],
                                type:'warning'
                            })
                            return  setOpenError(true);
                        }

                        setItemToAdd( 1)
                        dispatch(addTocart({...artDetail, itemNum:1}))
                setTimeout(()=>{
                    setActivityIndicator(false)
                }, 1000)
            }}> {activityIndicator ? <ClipLoader color='white' size={25} />: 'Add to Cart' } </button>
        </div>}

       {!loadingState && <div className="footer-detail-container">
            {/* <p className="footer-detail-title">
                Art related to <b>{artDetail.title}</b>
            </p> */}
            <div style={{
                display:'flex', 
                overflowX:'scroll', 
                columnGap: 10,
            }}>
                {
                    imagesArray.map((value, index)=><div className='shop-body-content-item-container' key={index} style={{justifyContent:'start'}}>
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
                            </div>
                        </div>)
                }
            </div>
          
        </div>} 


    </div>
}
