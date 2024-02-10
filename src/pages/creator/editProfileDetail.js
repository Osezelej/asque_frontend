import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import BACKEND_URL, { LOCALSTORAGEACCESSTOKENKEY, LOCALSTORAGEPROFILEKEY } from "../../config";
import axios from "axios";
import { ClipLoader } from "react-spinners";
import { ErrorDialogComp } from "../../components/errorDialogComp";
import { registerUserProfile } from "../../store/user";

export function EditProfileDetail(){
    const navigate = useNavigate();
    const profileState = useSelector(state=>state.user.profile);
    const dispatch = useDispatch();
    
    useEffect(()=>{
        
        if(profileState.name.length == 0){
        let username = JSON.parse(localStorage.getItem(LOCALSTORAGEPROFILEKEY)).name
        navigate('/profile/' + username)
        }
    }, [])
    const [userData, setUserData] = useState({
        name:profileState.name,
        briefBio:profileState.briefBio,
        websiteLink:profileState.websiteUrl,
        bank:profileState.bank,
        socialMediaHandle:"",
        accountNumber:profileState.accountNumber,
        accountName:profileState.accountName,
    });
    const [newUserData, setNewUserData] = useState("");
    const [openError, setOpenError] = useState(false);
    const [errorMessage, setErrorMessage] = useState({
        title:"",
        content:"",
        keyword:"",
        type:"",
        command:[],

    })

    const [savingActivity, setSavingActivity] = useState(false);
    function handleuserData (fieldName, value){
        setUserData((prev)=>({...prev, [fieldName]:value}))
    }
    async function updateUserProfile(){
        setSavingActivity(true);
        const accessToken = localStorage.getItem(LOCALSTORAGEACCESSTOKENKEY);
        console.log(accessToken)
        await axios.patch(BACKEND_URL + '/profile/update-profile', {
            name:userData.name,
            briefBio:userData.briefBio,
            websiteLink:userData.websiteLink,
            bank:userData.bank,
            accountNumber:userData.accountNumber,
            accountName:userData.accountName
        },
        {
            headers:{
                Authorization:`Bearer ${accessToken}`
            }
        } 
        ).then((value)=>{
            setNewUserData(value.data.data)
            localStorage.setItem(LOCALSTORAGEPROFILEKEY, JSON.stringify(value.data.data))
            setErrorMessage({
                title:'Success!', 
                command:['okay'],
                content:value.data.message,
                type:'sucess',
            })
            setOpenError(true)
        }).catch((error)=>{
            console.log(error)
            if(error.response.status == 401){
                alert('session time out, please loging again.')
                navigate('/auth/signin')
                localStorage.clear()
            }
        }).finally(()=>{
            setSavingActivity(false)
        })
    }
    useEffect(()=>{
        if(newUserData.length > 0){
            dispatch(registerUserProfile(newUserData))
        }
        return ;
    }, [newUserData])
    return <div className="profile-detail-main-container home-page-body">
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
                    minHeight:90
                }}>
                    <h2>Edit profile details</h2>
            </div>

            <div className="creator-album-main-container" style={{
                marginBottom:100
            }}>
                <h5>Creator{'>'}Profile details{'>'}Edit</h5>
                <div className="signup-field-container">
                    <div className="signup-label-input-container">
                        <p>Name</p>
                        <input 
                            type="text" 
                            name="name" 
                            placeholder="Enter your name"
                            value={userData.name}
                            onChange={(e)=>{
                                handleuserData(e.target.name, e.target.value)
                            }}
                        />
                    </div>
                    <div className="signup-label-input-container" >
                        <p>Brief bio</p>
                        <input 
                            type="text" 
                            name="briefBio" 
                            placeholder="Enter bio"
                            value={userData.briefBio}
                            onChange={(e)=>{
                                if(e.target.value.length < 50)
                                handleuserData(e.target.name, e.target.value)
                            }}
                        />
                        <p style={{textAlign:'right', color:'#E6A545', marginTop:6}}>less than 50 character</p>
                    </div>
                    <div className="signup-label-input-container">
                        <p>Website link</p>
                        <input 
                            type="text" 
                            name="websiteLink" 
                            placeholder="Enter website link"
                            value={userData.websiteLink}
                            onChange={(e)=>{
                                handleuserData(e.target.name, e.target.value)
                            }}
                        />
                    </div>
                    <div className="signup-label-input-container">
                        <p>Social media handle</p>
                        <input 
                        type="text" 
                        name="socialMediaHandle" 
                        placeholder="Enter social handles"
                        value={userData.socialMediaHandle}
                        onChange={(e)=>{
                            console.log(e.target.value)
                                handleuserData(e.target.name, e.target.value)
                            }}
                        />
                        <p style={{textAlign:'right', color:'#E6A545', marginTop:6}}>Seperate each with a coma {"(,)"}</p>
                    </div>
                    <div className="signup-label-input-container">
                        <p>Bank</p>
                        <input 
                        type="text" 
                        name="bank" 
                        placeholder="Enter your Bank name"
                        value={userData.bank}
                        onChange={(e)=>{
                                handleuserData(e.target.name, e.target.value.toUpperCase())
                            }}
                        />
                    </div>
                    <div className="signup-label-input-container">
                        <p>Account number</p>
                        <input 
                        type="number" 
                        name="accountNumber" 
                        placeholder="Enter your account number"
                        value={userData.accountNumber}
                        onChange={(e)=>{
                                handleuserData(e.target.name, e.target.value)
                            }}
                        />
                    </div>
                    <div className="signup-label-input-container">
                        <p>Account name</p>
                        <input 
                        type="text" 
                        name="accountName" 
                        placeholder="Enter your account name"
                        value={userData.accountName}
                        onChange={(e)=>{
                                handleuserData(e.target.name, e.target.value)
                            }}
                        />
                    </div>
                </div>

            </div>
            <div className="add-to-cart-button-container add-to-cart-button-body">
                    <button onClick={()=>{
                        if(savingActivity){
                            return 
                        }
                        updateUserProfile()
                        // navigate('/profile-details')
                        }}>{savingActivity ? <ClipLoader color="white" size={25} /> : 'Save'} </button>
            </div>

        </div>
        
    </div>
}