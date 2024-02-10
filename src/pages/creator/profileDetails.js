import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom"

export function ProfileDetails (){
    const navigate = useNavigate();
    const profileState = useSelector(state=>state.user.profile);
    return <div className="profile-detail-main-container home-page-body">
        <div style={{overflowY:'scroll'}}>
            <div className="shop-header-container" style={{
                    minHeight:90
                }}>
                    <h2>Profile details</h2>
            </div>
            <div className="creator-album-main-container">
                <h5>Creator{'>'}profile details</h5>
                <div className="profile-details-item-container">
                    <div className="profile-detail-item">
                        <p>Name</p>
                        <p>{profileState.name}</p>
                    </div>
                    <div className="profile-detail-item">
                        <p>Brief bio</p>
                        <p>{profileState.briefBio}</p>
                    </div>
                    <div className="profile-detail-item">
                        <p>Website link</p>
                        <p><a>{profileState.websiteUrl}</a></p>
                    </div>
                    <div className="profile-detail-item">
                        <p>Social media handle</p>
                        <p></p>
                    </div>
                    <div className="profile-detail-item">
                        <p>Bank account details</p>
                        <div>
                            <p>{profileState.accountNumber}</p>
                            <p>{profileState.accountName}</p>
                            <p>{profileState.bank}</p>
                        </div>
                    </div>
                </div>
                      
                <div className="add-to-cart-button-container add-to-cart-button-body">
                    <button onClick={()=>navigate('/profile-details/edit')}>Edit</button>
                </div>
            </div>
        </div>
        

    </div>
}