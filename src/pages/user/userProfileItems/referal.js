export function Referal(){
    return <div className="referal-main-container">
        <div className="referal-main-header-container">
            <h5>Referal & earning</h5>
            <div className="referal-num-money-container">
                <div className="referal-num-container">
                    <p>Total Successful referals</p>
                    <p>4</p>
                </div>
                <div className="referal-num-container">
                    <p>Commision earned</p>
                    <p>$400</p>
                </div>
            </div>
        </div>
        <div className="referal-mainbody-button-Container">
            <h5>Input acount details to withdraw</h5>
            <div className="signup-field-container">
                <div className="signup-label-input-container">
                    <p>Bank</p>
                    <input type="text" name="Bank" placeholder="Enter your bank name"/>
                </div>
                <div className="signup-label-input-container">
                    <p>Account number</p>
                    <input type="number" name="account number" placeholder="Enter your account number"/>
                </div>
                <div className="signup-label-input-container">
                    <p>Account name</p>
                    <input type="text" name="account name" placeholder="Enter your account name"/>
                </div>
            </div>
            <div className="add-to-cart-button-container">
                <button>Make withdrawal </button>
            </div>
        </div>

    </div>
}
