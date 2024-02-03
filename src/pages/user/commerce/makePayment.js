import PaperPlane from '../../../assets/PaperPlaneTilt (1).svg';
import Card from '../../../assets/Icon.svg';
import { useNavigate } from 'react-router-dom';
export function MakePayment(){
    const navigate = useNavigate();
    return <div className="make-payment-main-container home-page-body">
        <div className="" style={{ marginTop:20,
        marginBottom:10}}>
            <h2>Make Payment</h2>
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
                        <div className="option-text-desc" onClick={()=>navigate('/3000/cardInput')}>
                            <p>Pay with Card</p>
                            <p>Pay with bank card</p>
                        </div>
                    </div>
                   
                </div>
            </div>
        </div>
    </div>
}