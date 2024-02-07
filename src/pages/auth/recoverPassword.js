import { useNavigate } from "react-router-dom"
import { AuthHeader } from "../../components/authHeader";
export function RecoverPassword(){
    const navigate = useNavigate()
    return (
        <div  className="signup-container">
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
                        <input type="email" name="email" placeholder="Enter your email"/>
                    </div>
                </div>
                <div className="recover-bottom-comp-container">
                    <button className="auth-button" onClick={()=>navigate('/auth/resetpassword')}>
                        Request password reset
                    </button>
                </div>
            </div>
    
        </div>)
}