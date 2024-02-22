import { useNavigate } from "react-router-dom"
import { AuthHeader } from "../../components/authHeader";
import { useState } from "react";
import { ErrorDialogComp } from "../../components/errorDialogComp";
import { ClipLoader } from "react-spinners";
import axios from "axios";
import BACKEND_URL from "../../config";
export function RecoverPassword(){
    const navigate = useNavigate()
    const [email, setEmail] = useState('');
    const [errorMessage, setErrorMessage] = useState({
        title:"",
        content:"",
        command:[],
        keyword:"",
        type:""
    });
    const [openError, setOpenError] = useState(false);
    const [activityIndicator, setActivityIndicator] = useState(false);

    async function verifyEmail(){
        setActivityIndicator(true)
        await axios.post(BACKEND_URL + '/auth/request-password-reset', {
            email
        })
        .then((value)=>{
            console.log(value)
            
            navigate('/auth/resetpassword')
        })
        .catch((err)=>{
            console.log(err)
        })
        .finally(()=>{
            setActivityIndicator(false)
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
                        <h2 style={{marginTop:15}}>Welcome back</h2>
            </div>   
            <div className="signUp-body" style={{justifyContent:'flex-start', }}>
                <div className="signup-field-container" style={{height:100, justifyContent:'flex-start', alignItems:'flex-start'}}>
                    <div className="signup-label-input-container" style={{height:'100%'}}>
                        <p>Your Email</p>
                        <input 
                        type="email" 
                        name="email" 
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e)=>{
                            setEmail(e.target.value);
                        }}
                        />
                    </div>
                </div>
                <div className="recover-bottom-comp-container">
                    <button className="auth-button" onClick={()=>{
                        if(activityIndicator){
                            return ;
                        }
                        if (email.length == 0){
                            return ;
                        }
                        verifyEmail().then(()=>{
                        });
                        }}>
                        {activityIndicator ? <ClipLoader color="white" size={15} /> : 'Request password reset'}
                        
                    </button>
                </div>
            </div>
    
        </div>)
}