import { useNavigate } from 'react-router-dom';
import { BottomAuthComp } from '../../components/bottomauthcomp.js';
import {PasswordComp} from '../../components/paswordComp.js';
import '../../css/signup.css';
export function SignUp(){
    const navigate = useNavigate()
    return (
    <div  className="signup-container">
        <div className="signUp-header">
            <h1>Sign up</h1>
        </div>
        <div className="signUp-body">
            <div className="signup-field-container">
                <div className="signup-label-input-container">
                    <p>Your name</p>
                    <input type="text" name="name" placeholder="Enter your name"/>
                </div>
                <div className="signup-label-input-container">
                    <p>Your Email</p>
                    <input type="email" name="email" placeholder="Enter your email"/>
                </div>
                <PasswordComp labelText={'Create password'}/>
            </div>
            <div className='body-footer'>
                <BottomAuthComp 
                    navigateFunction={()=>navigate('/auth/signin')}
                    actionText={"Log in"}
                    actionTextDescription={'Already have  an account?'}
                    authButtonText={'Sign up'}
                    outlineAuthButtonText={'Sign up with google'}
                />
            </div>
        </div>

    </div>)
}