import PaperPlane from '../../../assets/PaperPlaneTilt (1).svg';
import Card from '../../../assets/Icon.svg';
export function MakePayment(){
    return <div className="make-payment-main-container home-page-body">
        <div className="" style={{ marginTop:20,
        marginBottom:10}}>
            <h1>Make Payment</h1>
        </div>
        <div className="make-pament-header-container">
            <h6>checkout{'>'}Make Payment</h6>
        </div>
        <div className="make-payment-body-container">
            <div className="makepayment-option-container">
                <div className="make-payment-option">
                    <div className="top">
                        <img  src={PaperPlane} alt='paperplane'/>
                        <div className="option-text-desc">
                            <p>Pay with USSD</p>
                            <p>Pay via mobile or internet banking</p>
                        </div>
                    </div>
                    <div className="bottom">
                        <p>Wema Bank/Blessed Onuoha</p>
                        <p>2019820166</p>
                    </div>
                </div>
                <div className="make-payment-option">
                <div className="top">
                        <img src={Card} alt='card'/>
                        <div className="option-text-desc">
                            <p>Pay with USSD</p>
                            <p>Pay via mobile or internet banking</p>
                        </div>
                    </div>
                   
                </div>
            </div>
        </div>
    </div>
}