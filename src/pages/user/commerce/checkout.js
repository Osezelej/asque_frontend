import image1 from '../../../assets/image1.png';
import image2 from '../../../assets/image2.png';
import Delete from '../../../assets/delete.png';
import { Quantity } from '../../../components/quantity';


export function Checkout(){
    
    const cartDetail = [image1, image2, image1, image2]
    return <div className="checkout-main-container home-page-body">
        <div className="shop-header-container">
            <h1>Checkout</h1>
        </div>
        <div className="order-item-container">
            {cartDetail.map((value)=><div className="cartDetail-item-container">
                <div className="cart-image-detail-container">
                    <img src={value} height={75} width={75} />
                    <div className='detail-container'>
                        <p className='cart-title'>Arthdal Chronicles</p>
                        <p className='cart-size'>Size 40cm x 30cm</p>
                        <p className='cart-price'>$2398</p>
                    </div>
                </div>
                <div className='quantity-delete-container'>
                    <Quantity/>
                    <img src={Delete}/>
                </div>
            </div>)}
        </div>
        <div className='address-summary-container'>
            <div className='delivery-address-container'>
                <p className='title'>Delivery Address</p>
                <p className='address'>141 Grace street, Lekki, Lagos, Nigeria</p>
                <p className='change'>change address</p>
            </div>
            <div className='summary-container'>
                <h5>Order Summary</h5>
                <div className='summary-details-container'>
                    <div>
                        <p>Arthdal Chronicles</p>
                        <p>$2398</p>
                    </div>
                    <div>
                        <p>Arthdal Chronicles</p>
                        <p>$2398</p>
                    </div>
                    <div>
                        <p>Arthdal Chronicles</p>
                        <p>$1345</p>
                    </div>
                    <div>
                        <p>Tax & fees</p>
                        <p>$10,300</p>
                    </div>
                </div>
            </div>
            <div className="add-to-cart-button-container">
            <button>Proceed</button>
        </div>
        </div>
        
    </div>
}