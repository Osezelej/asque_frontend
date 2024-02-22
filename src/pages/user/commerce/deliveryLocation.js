import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { ErrorDialogComp } from "../../../components/errorDialogComp";
import { useNavigate } from "react-router-dom";
import { registerUserAddress } from "../../../store/user";

export function DeliveryLocation (){
    const navigate = useNavigate();
    const userAddressState = useSelector(state=>state.user.address)
    const [userAddress, setUserAddress] = useState(userAddressState);
    const [errorMessage, setErrorMessage] = useState({
        title:"",
        type:"",
        command:[],
        content:"",
        keyword:"",

    });
    const [openModal, setOpenModal] = useState(false);

    const dispatch = useDispatch();

    return <div className="home-page-body">
        <ErrorDialogComp
        content={errorMessage.content}
        title={errorMessage.title}
        commands={errorMessage.command}
        type={errorMessage.type}
        contentKeyword={errorMessage.keyword}
        openModal={openModal}
        setOpenModal={setOpenModal}
         />
         <div className="shop-header-container" style={{
            minHeight:80, 
            maxHeight:80
        }}>
            <h2>Enter pickup location</h2>
        </div>
        <div className="signUp-body" style={{justifyContent:'flex-start', }}>
                <div className="signup-field-container" style={{height:100, justifyContent:'flex-start', alignItems:'flex-start'}}>
                    <div className="signup-label-input-container" style={{height:'100%'}}>
                        <p>Enter Address</p>
                        <input 
                        type="text" 
                        name="Address" 
                        placeholder="Enter pickup Location" 
                        value = {userAddress}
                        style={{
                            height:60
                        }}
                        onChange={(e)=>{
                            setUserAddress(e.target.value)
                        }}
                        />
                    </div>
                </div>
                <div className="recover-bottom-comp-container">
                    <button className="auth-button" onClick={()=>{
                        if(userAddress.length == 0){
                             setErrorMessage({
                                title:"No Address",
                                content:'no pick up location was entered. ',
                                keyword:'Enter a pickup location.',
                                type:'warning',
                                command:['okay']
                            })
                            return setOpenModal(true)
                        }
                        dispatch(registerUserAddress(userAddress))
                        navigate(-1)
                        }}>
                        Submit
                    </button>
                </div>
            </div>
    </div>
}