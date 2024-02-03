import { PasswordComp } from "../../components/paswordComp";
import { BottomAuthComp } from "../../components/bottomauthcomp";
import { useNavigate } from "react-router-dom";
export function SignIn(){
    const navigate = useNavigate();
    return (
        <div  className="signup-container">
            <div className="signUp-header">
                <h1>Welcome Back</h1>
            </div>
            <div className="signUp-body">
                <div className="signup-field-container">
                    <div className="signup-label-input-container">
                        <p>Your Email</p>
                        <input type="email" name="email" placeholder="Enter your email"/>
                    </div>
                    <PasswordComp labelText={'Enter password'}/>
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
                        actionText={"Sign up"}
                        actionTextDescription={"Don't have an account?"}
                        authButtonText={'Log in'}
                        outlineAuthButtonText={'Sign in with google'}
                        navigateFunction={()=>navigate('/market/home')}
                    />
                </div>
            </div>
    
        </div>)
}