export function CardInput(){
    return <div className="cardInput-main-container home-page-body">
                <div className="" style={{ marginTop:20,
                marginBottom:10}}>
                    <h1>Make Payment</h1>
                </div>
                
                <div className="cardInput-top">
                    <div className="make-pament-header-container">
                        <h6>Checkout{'>'}Make Payment{'>'}Pay with Card</h6>
                        <div className="signup-field-container">
                        <div className="signup-label-input-container">
                            <p>Card Number</p>
                            <input type="text" name="card-number" placeholder="Enter your name"/>
                        </div>
                        <div className="signup-label-input-container">
                            <p>Expiry Date</p>
                            <input type="email" name="date" placeholder="Enter your email"/>
                        </div>
                        <div className="signup-label-input-container">
                            <p>cvv</p>
                            <input type="text" name="cvv" placeholder="Enter your name"/>
                        </div>
                    </div>
                </div>
            </div>
            <div className="add-to-cart-button-container">
                <button>Continue</button>
        </div>
        
    </div>
}