import {ReactComponent as Profile} from '../../../assets/Profile 1.svg';
import {ReactComponent as Home} from '../../../assets/Home3.svg';
import {ReactComponent as Category} from '../../../assets/Category.svg';
import {BottomNavi} from '../../../components/bottomNavi';
import share from '../../../assets/Share.png';
import { SearchRounded, ShoppingBagOutlined } from '@mui/icons-material';
import { json, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { ClipLoader } from 'react-spinners';
import axios from 'axios';
import BACKEND_URL, { FRONTEND_URL, LOCALSTORAGEACCESSTOKENKEY, LOCALSTORAGECARTKEY } from '../../../config';
import { ErrorDialogComp } from '../../../components/errorDialogComp';
import { useDispatch, useSelector } from 'react-redux';
import { addNum, addTocart, resetCartData } from '../../../store/cart';
import { SnackBar } from '../../../components/snackBar';


function ShopButtonComp({handleClick}){
    const [activityIndicator, setActivityIndicator] = useState(false);
    return  <button className='shopnow-button' onClick={()=>{handleClick(activityIndicator, setActivityIndicator)}}>{activityIndicator ? <ClipLoader color='white' size={15}/>: 'Shop now'}</button>
}

export function Shop(){
   const [snackState, setSnackState] = useState(false);
   const cartData = useSelector(state=>state.cart.cartData);
   const cartLen  = useSelector(state=>state.cart.cartLen);
   const dispatch = useDispatch();
   const navigate = useNavigate();
   const [ imagesArray, setImagesArray ] = useState([]);
   const [loadingState, setLoadingState] = useState(false);
   const [activityIndicator, setActivityIndicator] = useState(false);
   const [categoryData, setCategoryData] = useState({
    contentType:'',
    page:1
   })
   const [errorMessage, setErrorMessage] = useState({
    title:"",
    content:"",
    command:[],
    type:"",
    keyword:""
   })
   const [openError, setOpenError] = useState(false);
   const [itemToAdd, setItemToAdd] = useState(0);



   async function getArtwork(page){
    setLoadingState(true)
    const accessToken = localStorage.getItem(LOCALSTORAGEACCESSTOKENKEY)
    await axios.get(BACKEND_URL + '/artwork/all' + `?page=${page}&pageSize=${25}`, {headers:{
        Authorization:`Bearer ${accessToken}`
    }}).then((value)=>{
        console.log(value.data.data)
        setImagesArray(value.data.data.data) 

        
    }).catch((err)=>{
        console.log(err)
        if(err.message == 'Network Error'){
            setErrorMessage({
                title:'Network error',
                content:'No ',
                keyword:'Internet connection',
                command:['okay'],
                type:'warning'
            });
            return setOpenError(true);

        }
        setErrorMessage({
            title:'Error',
            content:err.response.data.message,
            type:'warning',
            command:['okay']
        })
        setOpenError(true)
    }).finally(()=>{
        setLoadingState(false)
    })
   }


   useEffect(()=>{
    if (!loadingState){
        getArtwork(categoryData.page)
    }
   }, [categoryData.page])

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
    if(cartData.length == 0){
        return 
    }
    if(itemToAdd !== 1){
        return ;
    }
    localStorage.setItem(LOCALSTORAGECARTKEY, JSON.stringify(cartData));
   }, [cartData]);

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
            isActive:true
        },
        {
            icon:Category,
            text:"Collection",
            link:"/collection",
            isActive:false,
        },
        {
            icon:Profile,
            text:"Community",
            isActive:false,
            link:"/community/blessed",
        },
    ]
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

    useEffect(()=>{
        if(snackState){
            setTimeout(()=>{
                setSnackState(false)
            }, 1000)
        }
    }, [snackState])
  
    return <div className="shop-main-body home-page-body">
         <SnackBar text={'Url coppied'} onState={snackState} closeState={()=>setSnackState(false)}/>
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
                height:80
            }}>
                <div className="basket-section" onClick={()=>{
                    // console.log(JSON.parse(localStorage.getItem(LOCALSTORAGECARTKEY)))
                    if(JSON.parse(localStorage.getItem(LOCALSTORAGECARTKEY)) === null){
                        return ;
                    }
                    if (JSON.parse(localStorage.getItem(LOCALSTORAGECARTKEY))?.length === 0){
                    return ;
                }
                    navigate('/market/cart')}}>
                    <ShoppingBagOutlined/>
                    <div style={{
                            padding:2,
                            height:15,
                            width:15,
                            borderRadius:20,
                            position:'absolute',
                            top:10,
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
                    <h1>Marketplace</h1>
                    {/* <div className='search-icon-name-container'>
                        <SearchRounded style={{
                            height:25.5,
                            width:25.5
                        }}/>
                        <input type='text' placeholder='Search'/>
                    </div> */}
                </div>
            </div>
            
           { loadingState ? <div  style={{
        height:'100vh',
        display:'flex',
        justifyContent:'center',
        paddingTop:50,
        width:'97vw'
     }}> <ClipLoader color='#BE774C' size={30}/> </div>: <div className="home-photo-main-body"  style={{
        
        display:'flex',
        justifyContent:'center',
        height:'100vh',
        flexWrap:'wrap',
        rowGap:25,
        columnGap:10}}>

{
    imagesArray.map((value, index)=><div className='shop-body-content-item-container' key={index} >
                        <div className='image-section' style={{
                                    width:'100%',
                                    height:'60%',
                                    display:'flex',
                                    'justifyContent':'center',
                                    alignItems:'center'
                                }} onClick={()=>{
                                    // console.log(value.id)
                                    navigate('/market/detail/artwork' + '?pid='+value.id)
                                    
                                    }}>
                                <img src={value.imageUris[0]} alt='' style={{
                                    objectFit:'contain',
                                    height:'100%',
                                    width:'80%',
                                    alignSelf:'center'
                                }}/>
            </div>
            <div className='item-name-text-price-container'>
                <div className='item-name-text-container'>
                    <p className='title'>
                        {value.title}
                    </p>
                    <p className='text'>
                        {value.description.substring(0, 25)}
                        {value.description.length > 25 && '...'}
                    </p>
                </div>
                <p className='price'>${value.price}</p>
            </div>
            <div className='share-shopnow-button-container'>
                <button className='share-button' onClick={()=>{
                    const textToCopy = FRONTEND_URL + '/market/detail/artwork?sid=' +  value.id;
                    copyToClipboard(textToCopy);
                }}>
                    <img src={share} alt="" />
                </button>
                <ShopButtonComp 
                    handleClick={(activity, setActivity)=>{
                        if(activity){
                            return ;
                        }
                        setActivity(true);
                        let data = false;
                        for (let item of cartData){
                            if (value.id === item.id){
                                data = true;
                            }
                        }
                        if(data){
                            
                        setActivity(false)
                            setErrorMessage({
                                title: 'Duplicate item',
                                content:value.title + ' have been added to cart ',
                                keyword:'already',
                                command:['okay'],
                                type:'warning'
                            })
                            return  setOpenError(true);
                            
                        }

                        setItemToAdd( 1)
                        dispatch(addTocart({...value, itemNum:1}))
                        setTimeout(()=>{
                            setActivity(false);
                        }, 600)


                    }}
                />
            </div>

    </div>)
}
{imagesArray.length === 25 && <div className="add-to-cart-button-container" style={{width:'100%'}}>
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