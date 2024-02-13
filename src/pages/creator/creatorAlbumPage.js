import link from '../../assets/link.png';
import downArrow from '../../assets/downArrow.png';
import { CategoryDrawer } from '../../components/categoryDrawer';
import { useEffect, useState } from "react";
import { Modal } from "@mui/material";
import { useDispatch, useSelector } from 'react-redux';
import { ErrorDialogComp } from '../../components/errorDialogComp';
import { ClipLoader } from 'react-spinners';
import axios from 'axios';
import BACKEND_URL, { LOCALSTORAGEACCESSTOKENKEY } from '../../config';
import { resetCategory } from '../../store/category';

export function CreatorAlbum(){
    const categoryState = useSelector(state=>state.category.category)
    const dispath = useDispatch()
    useEffect(()=>{
        dispath(resetCategory())
    }, [])
    const [activityIndicator, setActivityIndicator] = useState(false)
    const [openDrawerState, setOpenDrawerState]= useState(false);
    const [openModal, setOpenModal] = useState(false)
    const [imageFile, setImageFile] = useState([]);
    const [filePath, setFilePath] = useState([]);
    const [albumData, setAlbumData] = useState({
        title:"",
        attachText:""
    });

    const [openError, setOpenError] = useState(false);
    const [errorMessage, setErrorMessage] = useState({
        title:"",
        content:"",
        keyword:"",
        type:"",
        command:[],

    })

    async function UploadImages(){
        for(let file of imageFile){
            // console.log(file.name)
            
            var formData = new FormData()
            formData.append('file', file)
            await axios.post(BACKEND_URL + '/upload/cloudinary/Artwork', formData, {headers:{
                "Content-Type":"multipart/form-data"
            }}).then((value)=>{
                setFilePath((prev)=>{ 
                    return [...prev,  value.data.fileDetails.path]
                });
            }).catch((err)=>{
                console.log(err)
            })

        }

    }

   async function uploadData (){
    let returnData;
    let data = ''
        categoryState.forEach(element => {
            data += element + ','
        });
        const accessToken = localStorage.getItem(LOCALSTORAGEACCESSTOKENKEY);
        await axios.post(BACKEND_URL + '/album', {
            title: albumData.title,
            category:data,
            description:albumData.attachText,
            albumImageUris:filePath
        }, {
            headers:{
                Authorization:`Bearer ${accessToken}`
            }
        }).then((value)=>{
            returnData = true;
        }).catch((err)=>{console.log(err)
            setErrorMessage({
                title:'Error',
                content:err.response.data.message,
                type:'warning',
                command:['okay']
            })
            setOpenError(true)
        })
       return returnData
    }

    function handlePublishData(){
        //TODO:same the images 
        if(albumData.title.length == 0 || categoryState.length == 0 || imageFile.length == 0){
             setErrorMessage({
                title:'Wrong Input',
                content:'check you input fields and ',
                keyword:'try again',
                type:'warning',
                command:['okay']
            })
            return setOpenError(true)
        }
        
        setActivityIndicator(true);
            try{
                UploadImages().then(async(value)=>{
                    uploadData().then((value)=>{
                        if(value){
                            setErrorMessage({
                                title:'Success!',
                                content:'Upload successfull ',
                                type:'sucess',
                                command:['okay']
                            })
                            setOpenError(true)
                            setFilePath([])
                        }
                    }).finally(()=>{
                        setActivityIndicator(false);
                    })
                })
            }catch (e){
                setErrorMessage({
                    title:'Error',
                    content:'sorry an error occured, ',
                    keyword:'try again',
                    type:'warning',
                    command:['okay']
                })
            }
        // UploadImages()

    }
    return <div className="creator-album-main-body home-page-body">
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
                    <div style={{
                        display:'flex',
                        flexDirection:'column',
                        rowGap:10,
                        height:'85%',
                        alignItems:'center',
                        padding:'10px 10px'
                    }}>
                        <div style={{
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
                             <input style={{width:'90%'}} type="file" multiple={true} accept="image/*" onChange={(e)=>{
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

        <div style={{overflowY:'scroll'}}>
            <div className="shop-header-container" style={{
                minHeight:90
            }}>
                <h2>Post Album</h2>
            </div>
            
            <div className="creator-album-main-container">
                <h5>Create{'>'}Artwork{'>'}Album</h5>
                <div className="signup-field-container">
                    <div className="signup-label-input-container">
                        <p>Title</p>
                            <input 
                                value={albumData.title} 
                                type="text" 
                                name="title" 
                                placeholder="Enter your name"
                                onChange={(e)=>{
                                    setAlbumData((prev)=>{
                                        return {...prev, title:e.target.value}
                                    })
                                }}
                            />

                    </div>
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
                        <p>Attach photos</p>
                        <div className="creator-input-div" onClick={()=>setOpenModal(true)}>
                            <p>Select up to 20 photos</p>
                            <div className='creator-input-image-container'>
                                <img src={link}/>
                            </div>
                        </div>
                    </div>
                    <div className="signup-label-input-container">
                        <p>Attach Text{'('}optional{')'}</p>
                        <input 
                        value={albumData.attachText}
                        type="text" 
                        name="name" 
                        placeholder="Enter Text" 
                        height={134} 
                        onChange={(e)=>{
                                    setAlbumData((prev)=>{
                                        return {...prev,  attachText:e.target.value}
                                    })
                                }}
                        />
                    </div>
                </div>
                     
                <div className="add-to-cart-button-container add-to-cart-button-body">
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