import { PasswordComp } from "../../components/paswordComp";
import { BottomAuthComp } from "../../components/bottomauthcomp";
import { useNavigate } from "react-router-dom";
import { AuthHeader } from "../../components/authHeader";
import { useEffect, useState } from 'react';
import axios from 'axios';
import BACKEND_URL, { LOCALSTORAGEACCESSTOKENKEY } from '../../config.js';
import { ErrorDialogComp } from '../../components/errorDialogComp.js';
import { useDispatch, useSelector } from "react-redux";
import { userThunk } from "../../store/user.js";

export function SignIn(){
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const userState = useSelector((state)=>state.user.user)
    const [userData, setUserData] = useState({
        email:"",
        password:"",
        
    });
    const [openError, setOpenError] = useState(false);
    const [errorMessage, setErrorMessage] = useState({
        title:"",
        content:"",
        keyword:"",
        type:"",
        command:[],

    })
    function handleUserData(fieldName, value){
        
        setUserData((prev)=>({...prev, [fieldName]:value}))
        
    }
    const [activityIndicator, setActivityIndicator] = useState(false);
    

    async function handleSignIn(userData, activityStateSetter){
        activityStateSetter(true);
        
        await axios.post(BACKEND_URL + '/auth/login', {
           
            email:userData.email,
            password:userData.password
        }).then((data)=>{
            localStorage.setItem(LOCALSTORAGEACCESSTOKENKEY, data.data.data.accessToken)
            dispatch(userThunk(data.data.data.accessToken))
        }).catch((error)=>{
            console.log(error)
            setErrorMessage((prev)=>{
                return {
                    command:['okay'],
                    content:error.response.data.statusCode < 500 ? error.response.data.message : "Sorry an error occourd",
                    keyword:"",
                    type:"warning",
                    title:"Error!"
                }
            })
            localStorage.clear();
            setOpenError(true)

        }).finally(()=>{
            activityStateSetter(false)
        })
    }

    useEffect(()=>{
        if (!openError){
            if(errorMessage.type === 'success'){
                // navigate('/market/home')
            }
        }

         // eslint-disable-next-line 
    }, [openError])

    useEffect(()=>{
        console.log(userState)
        if(userState.fufiled){
            if(userState.role === 'ADMIN'){
                return navigate ('/admin?q=' + userState.userid)
            }
            if(userState.role === 'ARTIST'){
                return navigate('/creator/home?q=' + userState.userid)
            }else{
                    
            navigate('/market/home?q=' + userState.userid)
            }
        }

         // eslint-disable-next-line 
    },[userState])

    return (
        <div  className="signup-container">
            <ErrorDialogComp
                commands={errorMessage.command}
                content={errorMessage.content}
                type={errorMessage.type}
                openModal={openError}
                setOpenModal={setOpenError}
                title={errorMessage.title}
                contentKeyword={errorMessage.keyword}
            />
            <div className="shop-header-container" style={{
                        minHeight:150,
                        padding:15
                    }}>
                        <AuthHeader />
                        <h2 style={{marginTop:15}}>Welcome back</h2>
            </div>     
            <div className="signUp-body">
                <div className="signup-field-container">
                    <div className="signup-label-input-container">
                        <p>Your Email</p>
                        <input 
                        type="email" 
                        name="email" 
                        placeholder="Enter your email"
                        value={userData.email}
                        onChange={(e)=>{handleUserData(e.target.name, e.target.value)}}
                        />
                    </div>
                    <PasswordComp labelText={'Enter password'}
                        fieldName={'password'}
                        value={userData.password}
                        changeHandler={(e)=>handleUserData(e.target.name, e.target.value)}

                    />

                    <div className="signup-label-check-container">
                     <div style={{display:'flex'}}>
                        <input type="checkbox" name="remember"/>
                        <p style={{
                            marginLeft:5,
                        }}>Remember me</p>
                     </div>
                        <p className="forgot-password-active" onClick={()=>{navigate('/auth/recoverpassword')}}>forgot password?</p>
                    </div>
                </div>

                <div className='body-footer'>
                    <BottomAuthComp 
                    activityIndicator={activityIndicator}
                        actionText={"Sign up"}
                        actionTextDescription={"Don't have an account?"}
                        authButtonText={'Log in'}
                        outlineAuthButtonText={'Sign in with google'}
                        navigateFunction={()=>{
                            
                        if(!(navigator.onLine)){
                         setErrorMessage((prev)=>{
                                return {
                                    command:['okay'], 
                                    title:"Network error", 
                                    content:"check your network connection and", 
                                    keyword:"try again",
                                    type:"warning",

                                    }
                            })
                            return setOpenError(true)
                            
                        }
                        if(activityIndicator){
                            return ;
                        }
                        if(userData.email.length > 0 && userData.password.length > 0)
                        {
                           
                           return handleSignIn(userData, setActivityIndicator);
                        }
                        setErrorMessage((prev)=>{
                                return {
                                    command:['okay'], 
                                    title:"Bad request", 
                                    content:"you field in the check your data and", 
                                    keyword:"try again",
                                    type:"warning",

                                    }
                            })
                        setOpenError(true)
                        }}
                    />
                </div>
            </div>
    
        </div>)
}