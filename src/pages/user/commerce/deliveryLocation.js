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

    return <div className="home-page-body" style={{
        height:'110vh'
    }}>
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
        <div className="signUp-body" style={{justifyContent:'flex-start', paddingTop:0 }}>
                <div className="signup-field-container" style={{height:100, justifyContent:'flex-start', alignItems:'flex-start'}}>
                    <div className="signup-label-input-container" style={{height:'100%'}}>
                        <p>Address</p>
                        <input 
                        type="text" 
                        name="Address" 
                        placeholder="Enter recipient pickup Location" 
                        value = {userAddress.addr}
                        style={{
                            height:50
                        }}
                        onChange={(e)=>{
                            setUserAddress({...userAddress, addr:e.target.value})
                        }}
                        />
                    </div>
                    <div className="signup-label-input-container" style={{height:'100%'}}>
                        <p>city</p>
                        <input 
                        type="text" 
                        name="Address" 
                        placeholder="Enter recipient city" 
                        value = {userAddress.city}
                        style={{
                            height:50
                        }}
                        onChange={(e)=>{
                            
                            setUserAddress({...userAddress, city:e.target.value})
                        }}
                        />
                    </div>
                    <div className="signup-label-input-container" style={{height:'100%'}}>
                        <p>ZIP code{'(optional)'}</p>
                        <input 
                        type="number" 
                        name="Address" 
                        placeholder="Enter recipient ZIP code" 
                        value = {userAddress.zip}
                        style={{
                            height:50
                        }}
                        onChange={(e)=>{
                            
                            setUserAddress({...userAddress, zip:e.target.value})
                        }}
                        />
                    </div>
                    <div className="signup-label-input-container" style={{height:'100%'}}>
                        <p>referrer code{'(optional)'}</p>
                        <input 
                        type="number" 
                        name="Address" 
                        placeholder="Enter referrer code(optional)" 
                        value = {userAddress.referrerCOde}
                        style={{
                            height:50
                        }}
                        onChange={(e)=>{
                            
                            setUserAddress({...userAddress, referrerCOde:e.target.value})
                        }}
                        />
                    </div>
                    <div className="signup-label-input-container" style={{height:'100%', marginBottom:50}}>
                        <p>Country</p>
                        <input 
                        type="text" 
                        name="Address" 
                        placeholder="Enter recipient Country" 
                        value = {userAddress.country}
                        style={{
                            height:50
                        }}
                        onChange={(e)=>{
                            
                            setUserAddress({...userAddress, country:e.target.value})
                        }}
                        />
                    </div>
                </div>
                
            </div>
            <div className="add-to-cart-button-container add-to-cart-button-body">
                    <button className="auth-button" onClick={()=>{
                        if(userAddress.addr.length == 0 || userAddress.city.length == 0 || userAddress.country.length == 0){
                             setErrorMessage({
                                title:"Invalid Address",
                                content:'Please fill all the required field',
                                keyword:'',
                                type:'warning',
                                command:['okay']
                            })
                            return setOpenModal(true)
                        }
                        // console.log(userAddress)
                        dispatch(registerUserAddress(userAddress))
                        navigate(-1)
                        }}>
                        Submit
                    </button>
                </div>
    </div>
}