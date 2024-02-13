import link from '../../assets/link.png';
import downArrow from '../../assets/downArrow.png';
import { useEffect, useState } from 'react';
import { CategoryDrawer } from '../../components/categoryDrawer';
import { SaleType } from '../../components/saleDrawer';
import { CurrencyExchangeRounded } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { resetCategory } from '../../store/category';
import { ClipLoader } from 'react-spinners';
import { Modal } from '@mui/material';
import { ErrorDialogComp } from '../../components/errorDialogComp';
import axios from 'axios';
import BACKEND_URL, { LOCALSTORAGEACCESSTOKENKEY } from '../../config';

export function CreatorSale(){
    
    const categoryState = useSelector(state=>state.category.category);
    const dispath = useDispatch();
    useEffect(()=>{
        dispath(resetCategory())
    }, [])

    const [openDrawerState, setOpenDrawerState]= useState(false);
    const [openSaleDrawerState, setOpenSaleDrawerState] = useState(false);
    const [text, setText] = useState(0);
    const [saleType, setSaleType] = useState('');
    const [filePath, setFilePath] = useState([]);

    const [openError, setOpenError] = useState(false);
    const [openModal, setOpenModal] = useState(false);
    const [errorMessage, setErrorMessage] = useState({
        title:"",
        content:"",
        keyword:"",
        type:"",
        command:[],

    })
    const [artData, setArtData] = useState({
        title:"",
        description:"",
        saleType:"",
        amount:0,
        attachPhotos:[]
        
    })
    const [imageFile, setImageFile] = useState([]);
    const [activityIndicator, setActivityIndicator] = useState();

    function handleSaleTypeSelectButton(e){
        let {innerText} = e.target;
        setSaleType(innerText);
        setOpenSaleDrawerState(false);

    }

    function handlePublishData(){
        //TODO:same the images 
        if(
            artData.title.length === 0 || 
            categoryState.length === 0 || 
            imageFile.length === 0 || 
            artData.amount === 0 || 
            artData.description.length === 0 || 
            saleType.length === 0 
            ){
                
        console.log(artData.title.length, categoryState.length, imageFile.length, artData.amount, artData.description.length, saleType.length)
             setErrorMessage({
                title:'Wrong Input',
                content:'check you input fields and ',
                keyword:'try again',
                type:'warning',
                command:['okay']
            })
            return setOpenError(true)
        }
        setActivityIndicator(true)
            try{
                UploadImages().then((value)=>{
                    uploadData(value).then((value)=>{

                    })
                }).finally(()=>{
                    setActivityIndicator(false)
                    setFilePath([])
                })
            }catch (e){
                setErrorMessage({
                    title:'Error',
                    content:'sorry an error occured, ',
                    keyword:'try again',
                    type:'warning',
                    command:['okay']
                })
                setOpenError(true)
            }
        

    }
    
    function handleSetArtData (fieldName, fieldValue){
        setArtData((prev)=>({...prev, [fieldName]:fieldValue}))
    }

    async function UploadImages(){
        let error = false;
        let filepath = [];
        for(let file of imageFile){
            // console.log(file.name)
            
            var formData = new FormData()
            formData.append('file', file)
            await axios.post(BACKEND_URL + '/upload/cloudinary/Artwork', formData, {headers:{
                "Content-Type":"multipart/form-data"
            }}).then((value)=>{
                filepath.push(value.data.fileDetails.path);
            }).catch((err)=>{
                error = true
            })

           
        }
        setErrorMessage({
                title:'Error',
                command:['okay'],
                content:'An error occured while trying to upload image',
                type:'warning'
        })
            return filepath;
 


    }


    async function uploadData(filepath){
        const accessToken = localStorage.getItem(LOCALSTORAGEACCESSTOKENKEY);
        await axios.post(BACKEND_URL + '/artwork', {
            title:artData.title,
            category:categoryState,
            description:artData.description,
            saleType:saleType.toUpperCase(),
            price:artData.amount,
            imageUris:filepath,
            quantity:text

        }, {
            headers:{
                Authorization:`Bearer ${accessToken}`
            }
        }).then((res)=>{
            console.log(res)
            setErrorMessage({
                title:'success',
                content:'artwork uploaded successfully',
                type:'success',
                command:['okay']
            })
            setOpenError(true);
        }).catch((err)=>{
            console.log(err)
        })
    }
    
    useEffect(()=>{
        if(imageFile.length > 20){
            setErrorMessage({
                title:'Error',
                content:'You cannot select more than 20 images',
                keyword:'try again',
                type:'warning',
                command:['okay']
            })
            setOpenError(true)
            setImageFile([])
        }
    }, [imageFile])

    return <div className="creator-sale-main-body home-page-body">
        <ErrorDialogComp
                commands={errorMessage.command}
                content={errorMessage.content}
                type={errorMessage.type}
                openModal={openError}
                setOpenModal={setOpenError}
                title={errorMessage.title}
                contentKeyword={errorMessage.keyword}
            />
        <Modal open={openModal} onClose={()=>setOpenModal(false)}>
            <div style={{
                height:'100%',
                width:'100%',
                display:'flex',
                justifyContent:'center',
                alignItems:"center"
            }}>
                <div style={{
                    height:'40%',
                    width:'80%',
                    backgroundColor:'white',
                    borderRadius:15
                }}>
                    <div style={{
                        display:'flex',
                        padding:'10px 10px',
                        justifyContent:'center',
                        alignItems:'center',
                        height:'15%'
                        }}>
                        <div ><h3>Upload image</h3></div>
                    </div>
                    <div 
                    style={{
                        display:'flex',
                        flexDirection:'column',
                        rowGap:10,
                        height:'85%',
                        alignItems:'center',
                        padding:'10px 10px'
                    }}>
                        <div 
                        style={{
                            margin:10,
                            borderWidth:1,
                            borderStyle:'solid',
                            borderColor:'grey',
                            height:45,
                            display:'flex',
                            alignItems:'center',
                            borderRadius:8,
                            width:'100%',
                            justifyContent:'center'
                        }} >
                             <input 
                             style={{width:'90%'}}
                              type="file" 
                              accept="image/*" 
                              multiple ={true}
                              onChange={(e)=>{
                            // console.log(e.target.files)
                        
                            setImageFile(e.target.files)
                        }}/>
                        </div>
                       <div className="add-to-cart-button-container" style={{width:'100%'}}>
                    <button onClick={()=>{
                      setOpenModal(false)
                        }}>okay </button>
            </div>
                    </div>
                </div>
            </div>
        </Modal>
        <CategoryDrawer 
        openDrawerState={openDrawerState} 
        closeFunction={()=>setOpenDrawerState(false)}

        />
        <SaleType 
        openSaleDrawer={openSaleDrawerState} 
        closeFunction={()=>setOpenSaleDrawerState(false)} 
        selectFunction={(e)=>handleSaleTypeSelectButton(e)}
        />
        <div style={{overflowY:'scroll'}}>
            <div className="shop-header-container" style={{
                    minHeight:90
                }}>
                    <h2>Post artwork</h2>
            </div>
    
            <div className="creator-album-main-container">
                <h5>Create{'>'}Artwork{'>'}for Sale</h5>
                <div className="signup-field-container">
                    <div className="signup-label-input-container">
                        <p>Category</p>
                        <div className="creator-input-div">
                            <p>select</p>
                            <div className='creator-input-image-container' onClick={()=>setOpenDrawerState(true)}>
                                <img src={downArrow}/>
                            </div>
                        </div>
                    </div>

                    <div className="signup-label-input-container">
                        <p>Title</p>
                        <input 
                        value={artData.title}
                        type="text" 
                        name="title" 
                        placeholder="Enter title"
                        onChange={(e)=>(handleSetArtData(e.target.name, e.target.value))}

                        />
                    </div>
                    <div className="signup-label-input-container">
                        <p>Description</p>
                        <textarea
                        value={artData.description}
                        type="text" 
                        name="description" 
                        placeholder="Enter Description"
                        style={{
                            height:120,
                            padding:'5px 15px',
                            borderRadius:'8px',
                            margin:'10px'
                        }}
                        onChange={(e)=>{handleSetArtData(e.target.name, e.target.value)}}
                        />
                    </div>

                    <div className="signup-label-input-container">
                        <p>Sale Type</p>
                        <div className="creator-input-div">
                            {saleType.length == 0 ? <p>select</p>: <p style={{color:'black'}}>{saleType.toUpperCase()}</p>}
                            <div className='creator-input-image-container' onClick={()=>setOpenSaleDrawerState(true)}>
                                <img src={downArrow}/>
                            </div>
                        </div>
                    </div>

                   { saleType.toLowerCase() == 'print' && <div className="signup-label-input-container">
                        <p>Number available</p>
                        <div className="number-available-input-div" style={{marginTop:15
                        }}>
                            <div style={{display:'flex', columnGap:15}}>
                                <button  style={{height:20, width:20, borderRadius:4, borderStyle:'solid',  backgroundColor:'white', fontSize:15}}
                                onClick={()=>{text != 0 && setText(text - 1)}}>-</button>
                                <p style={{fontSize:15}}>{text}</p>
                                <button style={{height:20, width:20, borderRadius:4, borderStyle:'solid',  backgroundColor:'white', fontSize:15}}
                                onClick={()=>{ setText(text + 1)}}>+</button>
                            </div>
                            <div>
                                 <button style={{
                                    width:100,
                                    height:25,
                                    backgroundColor:'white',
                                    color:'#BE774D',
                                    borderStyle:'solid',
                                    borderRadius:8,
                                    borderColor:'#BE774D',
                                    display:'none'
                                 }}>Unlimited</button> 
                            </div>
                        </div>
                    </div>}

                    <div className="signup-label-input-container">
                        <p>Amount</p>
                        <div className='search-icon-name-container' style={{
                            marginRight:10,
                            marginLeft:10
                        }}>
                            <CurrencyExchangeRounded style={{height:25.5, width:25.5}}/>
                            <input 
                            type='number' 
                            placeholder='amount' 
                            style={{
                                margin:0,
                            }}
                            value={artData.amount}
                            name = "amount"
                            onChange={(e)=>(handleSetArtData(e.target.name, e.target.value))}

                            />
                        </div>
                    </div>
                    <div className="signup-label-input-container">
                        <p>Attach photos</p>
                        <div className="creator-input-div">
                            <p>Select up to 20 photos</p>
                            <div className='creator-input-image-container'  onClick={()=>setOpenModal(true)}>
                                <img src={link} />
                            </div>
                        </div>
                    </div>

                </div>

               
                <div className="add-to-cart-button-container">
                    <button onClick={()=>{
                        if(activityIndicator){
                            return 
                        }
                        handlePublishData()
                    }}> {activityIndicator ? <ClipLoader color='white' size={25} />  :' Publish'}</button>
                </div>
            </div>
        </div>
    </div>
}