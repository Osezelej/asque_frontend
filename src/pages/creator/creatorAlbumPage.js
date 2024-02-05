import link from '../../assets/link.png';
import downArrow from '../../assets/downArrow.png';
import { CategoryDrawer } from '../../components/categoryDrawer';
import { useState } from "react";

export function CreatorAlbum(){
    const [openDrawerState, setOpenDrawerState]= useState(false);
    

    return <div className="creator-album-main-body home-page-body">
        <CategoryDrawer 
        openDrawerState={openDrawerState}
        closeFunction={()=>setOpenDrawerState(false)}
        />

        <div style={{overflowY:'scroll'}}>
            <div className="shop-header-container" style={{
                minHeight:90
            }}>
                <h2>Post Album</h2>
            </div>
            
            <div className="creator-album-main-container">
                <h5>Create{'>'}Artwork{'>'}Album</h5>
                <div className="signup-field-container">
                    <div className="signup-label-input-container">
                        <p>Title</p>
                        <input type="text" name="name" placeholder="Enter your name"/>
                    </div>
                    <div className="signup-label-input-container">
                        <p>Category</p>
                        <div className="creator-input-div">
                            <p>select</p>
                            <div className='creator-input-image-container' onClick={()=>setOpenDrawerState(true)}>
                                <img src={downArrow}/>
                            </div>
                        </div>
                    </div>
                    <div className="signup-label-input-container">
                        <p>Attach photos</p>
                        <div className="creator-input-div">
                            <p>Select up to 20 photos</p>
                            <div className='creator-input-image-container'>
                                <img src={link}/>
                            </div>
                        </div>
                    </div>
                    <div className="signup-label-input-container">
                        <p>Attach Text{'('}optional{')'}</p>
                        <input type="text" name="name" placeholder="Enter Text" height={134} />
                    </div>
                </div>
                     
                <div className="add-to-cart-button-container add-to-cart-button-body">
                    <button>Publish</button>
                </div>
            </div>

        </div>
        
    </div>
}