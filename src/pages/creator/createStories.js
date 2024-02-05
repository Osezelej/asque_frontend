import '../../css/creator.css';
import link from '../../assets/link.png';
import downArrow from '../../assets/downArrow.png';
export function CreateStories(){
    return <div className="create-stories-main-body-container home-page-body">
        <div style={{overflowY:'scroll'}}>
            <div className="shop-header-container" style={{
                    minHeight:90
                }}>
                    <h2>Post Story</h2>
            </div>
            <div className="creator-album-main-container">
                <h5>Create{'>'}Artwork{'>'}for Sale</h5>
                
                <div className="signup-field-container">
                    <div className="signup-label-input-container">
                            <p>Title</p>
                            <input type="text" name="name" placeholder="Enter your name"/>
                    </div>
                    <div className="signup-label-input-container">
                            <p>Write text</p>
                            <textarea type="text" name="name" placeholder="Write story here" style={{
                                height:140,
                                padding:10,
                                marginLeft:10,
                                marginRight:10,
                                marginTop:5,
                                marginBottom:5,
                                borderRadius:8
                            }}/>
                    </div>
                    <div className="signup-label-input-container">
                        <p>Attach display picture</p>
                        <div className="creator-input-div">
                            <p>Select up to 20 photos</p>
                            <div className='creator-input-image-container'>
                                <img src={link}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="add-to-cart-button-container add-to-cart-button-body">
                <button>Publish</button>
            </div>
        </div>
       
    </div>
}