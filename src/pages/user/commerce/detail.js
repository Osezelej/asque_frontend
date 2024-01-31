import image1 from '../../../assets/image1.png';
import image2 from '../../../assets/image2.png';
import share from '../../../assets/Share.png'
import {ReactComponent as Bag} from '../../../assets/Bag 6.svg'
import { Quantity } from '../../../components/quantity';
import { ShoppingBagOutlined } from '@mui/icons-material';

export function Details (){
    const imagesArray = [image1, image2, image1, image2]
    return <div className="detail-main-body  home-page-body">
        <div  className="shop-header-container">
            <div className="basket-section">
                <ShoppingBagOutlined/>
            </div>
            <div className="page-name-search-section">
                    <h1>Walls of Kano</h1>
            </div>
        </div>

        <div className="detail-image-container">
            <img src={image1}/>
        </div>

        <div className="title-share-desc-container">
            <div className="title-share">
                <h4>Walls of Kano</h4>
                <button>
                    <img src={share}/>
                    <p>share</p>
                </button>
            </div>
            <div className="detail-description">
                <p>Walls of Kano our one stop place for everything art, ranging from albums, to art purchase...and everything Walls of Kano our one stop place for everything art, ranging from albums, to art purchase...and everything.</p>
            </div>
        </div>
        
        <div className="detail-fact-item-container">
            <div className="detail-fact-item">
                <p>Size</p>
                <p>40cm x 30cm</p>
            </div>
            <div className="detail-fact-item">
                <p>Artist</p>
                <p>Onuoha Favour</p>
            </div>
            <div className="detail-fact-item">
                <p>Availability</p>
                <p>Unlimited</p>
            </div>
            <div className="detail-fact-item">
                <p>Price</p>
                <p>$112 </p>
            </div>
            <div className="detail-fact-item">
                <p>Quantity</p>
                <Quantity/>
            </div>
        </div>
        <div className="add-to-cart-button-container">
            <button>Add to Cart</button>
        </div>
        <div className="footer-detail-container">
            <p className="footer-detail-title">
                Art related to Walls of Kano
            </p>
            <div style={{
                display:'flex', 
                overflowX:'scroll', 
                columnGap: 10,
            }}>
                {
                    imagesArray.map((value, index)=><div className='shop-body-content-item-container' key={index} style={{justifyContent:'start'}}>
                            <div className='image-section'>
                                <img src={value} alt='photo'/>
                            </div>
                            <div className='item-name-text-price-container'>
                                <div className='item-name-text-container'>
                                    <p className='title'>
                                        Walls of Kano
                                    </p>
                                    <p className='text'>
                                        The Ancient kano city walls
                                    </p>
                                </div>
                            </div>
                        </div>)
                }
            </div>
          
        </div>


    </div>
}
