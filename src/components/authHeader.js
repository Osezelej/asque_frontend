import africa from '../assets/africa 1.png';

export function AuthHeader({from}){
    return <div className="auth-header-container">
        <div className="auth-header-image-container">
            {/* <img src={africa} alt='africa'/> */}
        </div>
        {from === 'signup' && <p style={{color:'black'}}> <span style={{textDecoration:'underline', fontWeight:'bold'}}>Enter an invite code</span>  Or</p>}
    </div>
}