import GoogleIcon from '../assets/google.png';
import { useNavigate } from 'react-router-dom';
import { ClipLoader } from 'react-spinners';

export function BottomAuthComp({activityIndicator,navigateFunction,actionTextDescription,actionText, authButtonText, outlineAuthButtonText}){
    
    const navigate = useNavigate()
    return <div className="bottom-comp-container">
        <button className="auth-button" onClick={()=>navigateFunction()}>
                {activityIndicator ? <ClipLoader color='white' size={25}/> :authButtonText}
        </button>
        <button className="outline-auth-button-container" style={{
            display:'flex',
            justifyContent:'center',
            alignItems:'center'
        }}>
            <img src={GoogleIcon} height={16} width={16} style={{marginRight:5}}/>
            {outlineAuthButtonText}
        </button>
        <div className="action-text-container">
            <p>{actionTextDescription}</p>
            <p className="active" onClick={()=>{navigate(actionText == 'Log in' ? '/auth/signin': '/auth/signup')}}>{actionText}</p>
        </div>
    </div>
}