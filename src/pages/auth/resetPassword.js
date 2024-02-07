import { useNavigate } from "react-router-dom"
import { PasswordComp } from "../../components/paswordComp"
import { AuthHeader } from "../../components/authHeader";
export function ResetPassword(){
    const navigate = useNavigate()
    return (
        <div  className="signup-container">
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
                        <p>Your name</p>
                        <input type="text" name="name" placeholder="Enter your name"/>
                    </div>
                    <div className="signup-label-input-container">
                        <p>Your email</p>
                        <input type="email" name="email" placeholder="Enter your email"/>
                    </div>
                    <PasswordComp labelText={'New password'}/>
                    <PasswordComp labelText={'Confirm new password'}/>
                </div>
                <div className="recover-bottom-comp-container">
                    <button className="auth-button" onClick={()=>navigate('/auth/signin')}>
                        Change password
                    </button>
                </div>
            </div>
    
        </div>)
}