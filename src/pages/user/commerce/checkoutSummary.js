export function CheckoutSummary(){
    return <div className="checkout-summary-main-container home-page-body">
        <div className="" style={{ marginTop:20,
        marginBottom:10}}>
            <h1>Checkout</h1>
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
            <button>Make Payment</button>
        </div>
        </div>
    </div>
}