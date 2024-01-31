import { SuccessText } from "../../components/successText";
import SuccesReciept from "../../assets/successReceipt.png";
export function Success(){
    let successTextArray = ['Payment processing, tracking and delivery information would be sent to your mail once payment is confirmed', ]
    return <div className="success-main-body">
                   <div className="success-icon-text-container">
                    <img src={SuccesReciept}/>
                    <p>Successful!</p>
                    <SuccessText text={successTextArray[0]}/>
                   </div>
                   <div className="success-container">
                    <button>Go Back</button>
                   </div>
    </div>
}