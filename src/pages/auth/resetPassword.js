import { useNavigate } from "react-router-dom"
import { PasswordComp } from "../../components/paswordComp"
import { AuthHeader } from "../../components/authHeader";
import { useState } from "react";
import { ErrorDialogComp } from "../../components/errorDialogComp";
import { ClipLoader } from "react-spinners";
import axios from "axios";
import BACKEND_URL from "../../config";
export function ResetPassword(){
    const navigate = useNavigate()
    const [resetData, setResetData] = useState({
        otp:"",
        email:"",
        newPassword:"",
        confirmNewPassword:""
    });
    
    const [errorMessage, setErrorMessage] = useState({
        title:"",
        content:"",
        command:[],
        keyword:"",
        type:""
    });
    const [openError, setOpenError] = useState(false);
    const [activityIndicator, setActivityIndicator] = useState(false);
    
    async function resetPassword(){
        setActivityIndicator(true);
        await axios.post(BACKEND_URL +'/auth/reset-password', {
            email:resetData.email,
            otp:resetData.otp,
            newPassword:resetData.newPassword,
            confirmNewPassword:resetData.confirmNewPassword
        }).then((value)=>{
            console.log(value.data)
            navigate('/auth/signin')
        }).catch((err)=>{
            console.log(err)
        }).finally(()=>{
            setActivityIndicator(false);
        })
    }
    
    return (
        <div  className="signup-container">
        <ErrorDialogComp 
                title={errorMessage.title}
                content={errorMessage.content}
                commands={errorMessage.command}
                contentKeyword={errorMessage.keyword}
                type={errorMessage.type}
                openModal={openError}
                setOpenModal={setOpenError}
            />
           <div className="shop-header-container" style={{
                        minHeight:150,
                        padding:15
                    }}>
                        <AuthHeader />
                        <h2 style={{marginTop:15}}>Reset your password</h2>
            </div>   
            <div className="signUp-body" style={{justifyContent:'flex-start'}}>
                <div className="signup-field-container">
                    <div className="signup-label-input-container">
                        <p>OTP</p>
                        <input 
                        type="number" 
                        name="otp" 
                        placeholder="Enter otp"
                        value={resetData.otp}  
                        onChange={(e)=>{
                            setResetData({...resetData, otp:e.target.value})
                        }}                      
                        />
                    </div>
                    <div className="signup-label-input-container">
                        <p>Your email</p>
                        <input 
                        type="email" 
                        name="email" 
                        placeholder="Enter your email"
                        value={resetData.email}
                        onChange={(e)=>{
                            setResetData({...resetData, email:e.target.value})
                        }} 
                        />
                    </div>
                    <PasswordComp 
                    labelText={'New password'} 
                    value={resetData.newPassword}                    
                    changeHandler={(e)=>{
                        setResetData({...resetData, newPassword:e.target.value})
                    }}
                    />
                    <PasswordComp 
                    labelText={'Confirm new password'} 
                    value={resetData.confirmNewPassword}
                    changeHandler={(e)=>{
                        setResetData({...resetData, confirmNewPassword:e.target.value})
                    }}
                    />
                </div>
                <div className="recover-bottom-comp-container">
                    <button className="auth-button" onClick={()=>{
                        if(activityIndicator){
                            return ;
                        }
                        if(resetData.confirmNewPassword !== resetData.newPassword){
                            setErrorMessage({
                                title:'Error',
                                content:'password and confirm password does not match',
                                type:'warning',
                                command:['okay'],
                                keyword:"",
                            });
                            return setOpenError(true);
                        }
                        if(resetData.confirmNewPassword.length == 0 || resetData.email.length == 0 || resetData.newPassword.length == 0 || resetData.otp.length == 0){
                            return ;
                        }

                        resetPassword().then(()=>{
                            
                        

                        })}}
                        >
                        {activityIndicator ? <ClipLoader color="white" size={15} />: 'Change password'}
                        
                    </button>
                </div>
            </div>
    
        </div>)
}