import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"

export function CheckoutSummary(){
    const navigate = useNavigate()
    const cartData = useSelector(state=>state.cart.cartData)
    const [total, setTotal] = useState(0)
    useEffect(()=>{
        let amount = 0
        cartData.forEach((value)=>{
            amount += value.price * value.itemNum 
        })  
        setTotal(amount)
    }, [cartData])
    return <div className="checkout-summary-main-container home-page-body">
        <div className="" style={{ marginTop:20,
        marginBottom:10}}>
            <h2>Checkout</h2>
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
                {[...cartData, {title:'Tax & fees', price:total, itemNum:1}].map((value, index)=>{
                    return  <div  key={index}>
                        <p>{value.title}</p>
                        <p>${value.price * value.itemNum}</p>
                    </div>
                })}
                   
                   
                </div>
            </div>
            <div className="add-to-cart-button-container">
            <button onClick={()=>navigate('/market/pay/300')}>Make Payment</button>
        </div>
        </div>
    </div>
}