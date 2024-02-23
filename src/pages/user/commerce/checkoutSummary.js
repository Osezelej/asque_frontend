import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import axios from 'axios';
import BACKEND_URL, { LOCALSTORAGEACCESSTOKENKEY, LOCALSTORAGECARTKEY } from "../../../config";
import { ClipLoader } from "react-spinners";
import { ErrorDialogComp } from "../../../components/errorDialogComp";
import { resetCartData } from "../../../store/cart";


export function CheckoutSummary(){
    const navigate = useNavigate()
    const cartData = useSelector(state=>state.cart.cartData)
    const [total, setTotal] = useState(0);
    const userAddress = useSelector(state=>state.user.address)
    const [activityIndicator, setActivityIndicator] = useState(false)
    const [amount, setAmount] = useState(0);
    const [orderId, setOrderId] = useState('');
    const dispatch = useDispatch();
    

    const [errorMessage, setErrorMessage] = useState({
        title:"",
        type:"",
        command:[],
        content:"",
        keyword:"",
        link:''

    });
    const [openModal, setOpenModal] = useState(false);

    useEffect(()=>{
        let amount = 0
        cartData.forEach((value)=>{
            amount += value.price * value.itemNum 
        })  
        setTotal(amount)
    }, [cartData])


    async function registerCartOrder(){
        setActivityIndicator(true);
        let option = {};
        let accessToken = localStorage.getItem(LOCALSTORAGEACCESSTOKENKEY);
        let orderItems = cartData.map((value)=>{
            return {
                artworkId:value.id,
                quantity:value.itemNum,
                price:value.price
            }
        }) 
        if(orderItems.length == 0){
            alert('an error happend.')
            return navigate(-1);
        }
        Object.keys(userAddress).forEach((value)=>{
            if (userAddress[value].length !== 0){
                if(value === 'addr'){
                   return option['address'] = userAddress[value];
                }
                return option[value] = userAddress[value]
            }
        });
        
        option['orderItems'] = orderItems;
        console.log(option)


        await axios.post(BACKEND_URL + '/orders/add-order-items',option, {
            headers:{
                Authorization:`Bearer ${accessToken}`
            }
        }).then((value)=>{
            console.log(value.data.data.orderItem[0].orderId, value.data.data.totalPrice + (parseInt(value.data.data.totalPrice) * 0.2))
       setOrderId(value.data.data.orderItem[0].orderId);
       setAmount(parseInt(value.data.data.totalPrice) + (parseInt(value.data.data.totalPrice) * 0.2));

        }).catch((err)=>{
            console.log(err)
        }).finally(()=>{
        })
    }

    async function makePayment(amount, orderId){
        const accessToken = localStorage.getItem(LOCALSTORAGEACCESSTOKENKEY)
        await axios.post(BACKEND_URL + '/payment', {
            amount,
            orderId
        }, {
            headers:{
                Authorization:`Bearer ${accessToken}`
            }
        }).then((value)=>{
            console.log(value.data.data.redirectUrl)
            setErrorMessage({
                title:'Successfully ',
                type:'success',
                content:'To pay for your order, order ID: #' + orderId,
                link:value.data.data.redirectUrl,
                command:['okay']
            })
            setOpenModal(true)
        }).catch((err)=>{
            console.log(err)
        }).finally(()=>{

            setActivityIndicator(false)
        })

    }

    useEffect(()=>{
        if(amount > 0 && orderId.length != 0){
            makePayment(amount, orderId)
            
        }
    }, [amount, orderId])

    return <div className="checkout-summary-main-container home-page-body">
    <ErrorDialogComp
        content={errorMessage.content}
        title={errorMessage.title}
        commands={errorMessage.command}
        type={errorMessage.type}
        contentKeyword={errorMessage.keyword}
        openModal={openModal}
        setOpenModal={setOpenModal}
        link={errorMessage.link}
        feedbackFunction={()=>{
            
            localStorage.removeItem(LOCALSTORAGECARTKEY)
            dispatch(resetCartData())
            navigate('/market/shop')
        }}
         />
        <div className="" style={{ marginTop:20,
        marginBottom:10}}>
            <h2>Checkout</h2>
        </div>

         <div className='address-summary-container'>
         <div className='delivery-address-container'>
                <p className='title'>Delivery Address</p>
                <p className='address'>{`${userAddress.addr}, ${userAddress.city}, ${userAddress.country}.`}</p>
                <p className='change' onClick={()=>{
                    
                    navigate('/market/pickupLocation')
                }}>change address</p>
            </div>
            <div className='summary-container'>
                <h5>Order Summary</h5>
                <div className='summary-details-container'>
                {[...cartData, {title:'Tax & fees', price: total + (total * 0.2), itemNum:1}].map((value, index)=>{
                    return  <div  key={index}>
                        <p>{value.title}</p>
                        <p>${value.price * value.itemNum}</p>
                    </div>
                })}
                   
                   
                </div>
            </div>
            <div className="add-to-cart-button-container">
            <button onClick={()=>{
                registerCartOrder()
                // navigate('/market/pay/300')
                }}>{ activityIndicator?<ClipLoader color="white" size={15} /> : 'Make Payment'}</button>
        </div>
        </div>
    </div>
}