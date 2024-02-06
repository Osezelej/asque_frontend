import { useNavigate } from "react-router-dom"

export function EditProfileDetail(){
    const navigate = useNavigate();
    return <div className="profile-detail-main-container home-page-body">
        <div style={{overflowY:'scroll'}}>
        <div className="shop-header-container" style={{
                    minHeight:90
                }}>
                    <h2>Edit profile details</h2>
            </div>

            <div className="creator-album-main-container" style={{
                marginBottom:100
            }}>
                <h5>Creator{'>'}Profile details{'>'}Edit</h5>
                <div className="signup-field-container">
                    <div className="signup-label-input-container">
                        <p>Name</p>
                        <input type="text" name="name" placeholder="Enter your name"/>
                    </div>
                    <div className="signup-label-input-container" >
                        <p>Brief bio</p>
                        <input type="text" name="name" placeholder="Enter bio"/>
                        <p style={{textAlign:'right', color:'#E6A545', marginTop:6}}>less than 50 character</p>
                    </div>
                    <div className="signup-label-input-container">
                        <p>Website link</p>
                        <input type="text" name="name" placeholder="Enter website link"/>
                    </div>
                    <div className="signup-label-input-container">
                        <p>Social media handle</p>
                        <input type="text" name="name" placeholder="Enter social handles"/>
                        <p style={{textAlign:'right', color:'#E6A545', marginTop:6}}>Seperate each with a coma {"(,)"}</p>
                    </div>
                    <div className="signup-label-input-container">
                        <p>Bank</p>
                        <input type="text" name="name" placeholder="Enter your Bank name"/>
                    </div>
                    <div className="signup-label-input-container">
                        <p>Account number</p>
                        <input type="number" name="name" placeholder="Enter your account number"/>
                    </div>
                    <div className="signup-label-input-container">
                        <p>Account name</p>
                        <input type="text" name="name" placeholder="Enter your account name"/>
                    </div>
                </div>

            </div>
            <div className="add-to-cart-button-container add-to-cart-button-body">
                    <button onClick={()=>navigate('/profile-details')}>Save</button>
            </div>

        </div>
        
    </div>
}