import { useLocation, useNavigate } from 'react-router-dom';
import { BottomAuthComp } from '../../components/bottomauthcomp.js';
import {PasswordComp} from '../../components/paswordComp.js';
import '../../css/signup.css';
import { AuthHeader } from '../../components/authHeader.js';
import { useEffect, useState } from 'react';
import axios from 'axios';
import BACKEND_URL from '../../config.js';
import { ErrorDialogComp } from '../../components/errorDialogComp.js';

export function SignUp(){
    let {pathname} = useLocation();
    let role = pathname.split('/')[3];
    const [userData, setUserData] = useState({
        username:"",
        email:"",
        password:"",
        referalCode:"",
        
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
    
    const navigate = useNavigate();
    // the purpose of this function is to handle user sign up
    async function handleSignUp(userData, activityStateSetter){
        activityStateSetter(true);
        
        await axios.post(BACKEND_URL + '/auth/register', userData.referalCode.length > 0 ? {
            name:userData.username,
            email:userData.email,
            type: (role === 'creator' ? "ARTIST":"USER"),
            referralCode:userData.referalCode,
            password:userData.password
        }:  {
            name:userData.username,
            email:userData.email,
            type: (role === 'creator' ? "ARTIST":"USER"),
            password:userData.password
        }).then((data)=>{
            setErrorMessage((prev)=>{
                return {
                    command:['okay'],
                    content:"Sign up successfuly",
                    keyword:"",
                    type:"success",
                    title:"Success!"
                }
            })
            setOpenError(true)
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
            setOpenError(true)

        }).finally(()=>{
            activityStateSetter(false)
        })
    }

    
    useEffect(()=>{
        if (!openError){
            if(errorMessage.type === 'success'){
                navigate('/auth/signin')
            }
        }
         // eslint-disable-next-line 
    }, [openError])
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
                        minHeight:130,
                        padding:15
                    }}>
                        <AuthHeader from={'signup'}/>
                        <h2 style={{marginTop:15}}>Sign up</h2>
                </div>     
        <div className="signUp-body">
            <div className="signup-field-container">
                <div className="signup-label-input-container">
                    <p>Your name</p>
                    <input 
                    type="text" 
                    name="username" 
                    placeholder="Enter your name"
                    value={userData.username}
                    onChange={(e)=>{handleUserData(e.target.name, e.target.value)}}
                    
                    />
                </div>
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
                <div className="signup-label-input-container">
                    <p>Referal code{"(optional)"}</p>
                    <input 
                    type="text" 
                    name="referalCode" 
                    placeholder="Enter referal code"
                    value={userData.referalCode}
                    onChange={(e)=>{handleUserData(e.target.name, e.target.value)}}
                    />
                </div>
                <PasswordComp  
                labelText={'Create password'} 
                fieldName="password"
                value={userData.password}
                changeHandler={(e)=>{handleUserData(e.target.name, e.target.value)}}
                />
            </div>
            <div className='body-footer'>
                <BottomAuthComp 
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
                        if(userData.email.length > 0 && userData.password.length > 0 && userData.username.length > 0 )
                        {
                           
                           return handleSignUp(userData, setActivityIndicator);
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
                    actionText={"Log in"}
                    actionTextDescription={'Already have  an account?'}
                    authButtonText={'Sign up'}
                    outlineAuthButtonText={'Sign up with google'}
                    activityIndicator={activityIndicator}
                />
            </div>
        </div>

    </div>)
}