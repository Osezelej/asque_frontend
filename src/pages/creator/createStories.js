import '../../css/creator.css';
import link from '../../assets/link.png';
import { useState, useEffect } from 'react';
import { ClipLoader } from 'react-spinners';
import BACKEND_URL, {LOCALSTORAGEACCESSTOKENKEY} from '../../config';
import axios from 'axios';
import { Modal } from '@mui/material';
import { ErrorDialogComp } from '../../components/errorDialogComp';

export function CreateStories(){
    const [filePath, setFilePath] = useState([]);
    const [activityIndicator, setActivityIndicator] = useState(false)
    const [storyData, setStoryData] = useState({
        title:'',
        content:''
    })


    
    const [openError, setOpenError] = useState(false);
    const [openModal, setOpenModal] = useState(false);
    const [errorMessage, setErrorMessage] = useState({
        title:"",
        content:"",
        keyword:"",
        type:"",
        command:[],

    })

    const [imageFile, setImageFile] = useState([]);

    function handlePublishData(){
        //TODO:same the images 
        if(
            storyData.title.length === 0 || 
            storyData.content.length === 0 || 
            imageFile.length === 0 
            ){
                
       
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

    async function uploadData(filePath){
        const accessToken = localStorage.getItem(LOCALSTORAGEACCESSTOKENKEY);
        await axios.post(BACKEND_URL + '/story', {
            title:storyData.title,
            content: storyData.content,
            firstImage: filePath[0],
            secondImage: filePath[1],
            thirdImage: filePath[2]
           
        }, {
            headers:{
                Authorization:`Bearer ${accessToken}`
            }
        }).then((res)=>{
            console.log(res.data)
            setErrorMessage({
                title:'Success',
                content:'Your story have been sucessfully ',
                keyword:'Uploaded',
                command:['okay'],
                type:'success'
            })
            setOpenError(true)
        }).catch((err)=>{
            console.log(err)
        })
    }

    async function UploadImages(){
        let filepath = [];
        for(let file of imageFile){
            // console.log(file.name)
            
            var formData = new FormData()
            formData.append('file', file)
            await axios.post(BACKEND_URL + '/upload/cloudinary/Artwork', formData, {headers:{
                "Content-Type":"multipart/form-data"
            }}).then((value)=>{
                filepath.push(value.data.fileDetails.path)
            }).catch((err)=>{
                console.log(err)
            })

        }
        return filepath;
    }


    useEffect(()=>{
        if(imageFile.length > 3){
            setErrorMessage({
                title:'Error',
                content:'You cannot select more than  3 images',
                keyword:'try again',
                type:'warning',
                command:['okay']
            })
            setOpenError(true)
            setImageFile([])
        }
    }, [imageFile])

 
    return <div className="create-stories-main-body-container home-page-body">
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
        <div style={{overflowY:'scroll'}}>
            <div className="shop-header-container" style={{
                    minHeight:90
                }}>
                    <h2>Post Story</h2>
            </div>
            <div className="creator-album-main-container">
                <h5>Create{'>'}Artwork{'>'}for Sale</h5>
                
                <div className="signup-field-container">
                    <div className="signup-label-input-container">
                            <p>Title</p>
                            <input 
                            type="text" 
                            name="title" 
                            placeholder="Enter your name"
                            value={storyData.title}
                            onChange={(e)=>{
                                setStoryData((prev)=>({...prev, title:e.target.value}))
                            }}
                            />
                    </div>
                    <div className="signup-label-input-container">
                            <p>Write text</p>
                            <textarea 
                            type="text" 
                            name="content" 
                            placeholder="Write story here" 
                            style={{
                                height:140,
                                padding:10,
                                marginLeft:10,
                                marginRight:10,
                                marginTop:5,
                                marginBottom:5,
                                borderRadius:8
                            }}
                            value={storyData.content}
                            onChange={(e)=>{
                                setStoryData((prev)=>({...prev, content:e.target.value}))
                            }}
                            />
                    </div>
                    <div className="signup-label-input-container">
                        <p>Attach display picture</p>
                        <div className="creator-input-div">
                            <p>Select up to 3 photos</p>
                            <div className='creator-input-image-container'   onClick={()=>setOpenModal(true)}>
                                <img src={link}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="add-to-cart-button-container add-to-cart-button-body">
                <button
                 onClick={()=>{
                        if(activityIndicator){
                            return 
                        }
                        handlePublishData()
                    }}
                >{activityIndicator ? <ClipLoader color='white' size={25} />  :' Publish'}</button>
            </div>
        </div>
       
    </div>
}