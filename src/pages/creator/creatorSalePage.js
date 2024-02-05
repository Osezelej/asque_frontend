import link from '../../assets/link.png';
import downArrow from '../../assets/downArrow.png';
import { useState } from 'react';
import { CategoryDrawer } from '../../components/categoryDrawer';
import { SaleType } from '../../components/saleDrawer';
import { CurrencyExchangeRounded } from '@mui/icons-material';
export function CreatorSale(){

    const [openDrawerState, setOpenDrawerState]= useState(false);
    const [openSaleDrawerState, setOpenSaleDrawerState] = useState(false);
    const [text, setText] = useState(0);
    const [saleType, setSaleType] = useState('');
    function handleSaleTypeSelectButton(e){
        let {innerText} = e.target
        setSaleType(innerText);
        setOpenSaleDrawerState(false);
    }

    return <div className="creator-sale-main-body home-page-body">

        <CategoryDrawer 
        openDrawerState={openDrawerState} 
        closeFunction={()=>setOpenDrawerState(false)}

        />
        <SaleType 
        openSaleDrawer={openSaleDrawerState} 
        closeFunction={()=>setOpenSaleDrawerState(false)} 
        selectFunction={(e)=>handleSaleTypeSelectButton(e)}
        />
        <div style={{overflowY:'scroll'}}>
            <div className="shop-header-container" style={{
                    minHeight:90
                }}>
                    <h2>Post artwork</h2>
            </div>
    
            <div className="creator-album-main-container">
                <h5>Create{'>'}Artwork{'>'}for Sale</h5>
                <div className="signup-field-container">
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
                        <p>Title</p>
                        <input type="text" name="name" placeholder="Enter your name"/>
                    </div>

                    <div className="signup-label-input-container">
                        <p>Sale Type</p>
                        <div className="creator-input-div">
                            {saleType.length == 0 ? <p>select</p>: <p style={{color:'black'}}>{saleType}</p>}
                            <div className='creator-input-image-container' onClick={()=>setOpenSaleDrawerState(true)}>
                                <img src={downArrow}/>
                            </div>
                        </div>
                    </div>

                   { saleType.toLowerCase() == 'print' && <div className="signup-label-input-container">
                        <p>Number available</p>
                        <div className="number-available-input-div" style={{marginTop:15
                        }}>
                            <div style={{display:'flex', columnGap:15}}>
                                <button  style={{height:20, width:20, borderRadius:4, borderStyle:'solid',  backgroundColor:'white', fontSize:15}}
                                onClick={()=>{text != 0 && setText(text - 1)}}>-</button>
                                <p style={{fontSize:15}}>{text}</p>
                                <button style={{height:20, width:20, borderRadius:4, borderStyle:'solid',  backgroundColor:'white', fontSize:15}}
                                onClick={()=>{ setText(text + 1)}}>+</button>
                            </div>
                            <div>
                                 <button style={{
                                    width:100,
                                    height:25,
                                    backgroundColor:'white',
                                    color:'#BE774D',
                                    borderStyle:'solid',
                                    borderRadius:8,
                                    borderColor:'#BE774D'
                                 }}>Unlimited</button> 
                            </div>
                        </div>
                    </div>}

                    <div className="signup-label-input-container">
                        <p>Amount</p>
                        <div className='search-icon-name-container' style={{
                            marginRight:10,
                            marginLeft:10
                        }}>
                            <CurrencyExchangeRounded style={{height:25.5, width:25.5}}/>
                            <input type='text' placeholder='Search' style={{
                                margin:0,
                            }}/>
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

                </div>

               
                <div className="add-to-cart-button-container">
                    <button>Publish</button>
                </div>
            </div>
        </div>
    </div>
}