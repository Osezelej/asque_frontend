import image1 from '../../../assets/image1.png';
import image2 from '../../../assets/image2.png';
import Delete from '../../../assets/delete.png';
import { Quantity } from '../../../components/quantity';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { LOCALSTORAGECARTKEY } from '../../../config';
import { addTocart, adjustItemPrice, removeFromCart } from '../../../store/cart';
import { ErrorDialogComp } from '../../../components/errorDialogComp';
import { ClipLoader } from 'react-spinners';


function CartItem({image, title, price, id,}){
    const [num, setNum] = useState(1)
    let [_price, setPrice] = useState(price);
    const dispatch = useDispatch();
    useEffect(()=>{
        setPrice(price * num)
        dispatch(adjustItemPrice({id, itemNum:num}))
        
    }, [num])

    return <div className="cartDetail-item-container">
                <div className="cart-image-detail-container">
                    <img src={image} height={75} width={75} />
                    <div className='detail-container'>
                        <p className='cart-title'>{title}</p>
                        {/* <p className='cart-size'>Size 40cm x 30cm</p> */}
                        <p className='cart-price' style={{
                            color:'#BE774C'
                        }} >${_price}</p>
                    </div>
                </div>
                <div className='quantity-delete-container'>
                <div className="quantity-container">
                        <button className="quantity-button" onClick={()=>{
                            (num > 1 && setNum (num- 1))
                           
                            } }>-</button>
                        <p>{num}</p>
                        <button className="quantity-button" onClick={()=>{

                            setNum(num+1)
                            }}>+</button>
                    </div>
                    <img src={Delete} onClick={()=>{
                        dispatch(removeFromCart({id}))
                    }}/>
                </div>
            </div>
}

export function Checkout(){
    const userAddress = useSelector(state=>state.user.address);
    const navigate = useNavigate();
    const cartData = useSelector(state=>state.cart.cartData)
    const dispatch = useDispatch();
    const [data_, setData_] = useState(0)
    const [total, setTotal] = useState(0)

    const [activityIndicator, setActivityIndicator] = useState(false)


    const [errorMessage, setErrorMessage] = useState({
        title:"",
        type:"",
        command:[],
        content:"",
        keyword:"",

    });
    const [openModal, setOpenModal] = useState(false);

    useEffect(()=>{
        
        if (cartData.length == 0){

            if(data_ == 0){
                let data = JSON.parse(localStorage.getItem(LOCALSTORAGECARTKEY));
                if(data){
                    data.forEach(element => {
                        dispatch(addTocart(element))
                    });
                }
                setData_(1)
                
            }
        }
        console.log(cartData)
        let amount = 0
        cartData.forEach((value)=>{
            amount += value.price * value.itemNum 
        })  
        setTotal(amount)
        
    }, [cartData])
    



    return <div className="checkout-main-container home-page-body">
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
            <h2>Checkout</h2>
        </div>
        <div className="order-item-container">
            {cartData.map((value, index)=>{
                return <CartItem 
                    key={index}
                    image={value.imageUris[0]}
                    title={value.title}
                    price={value.price}
                    id={value.id}
                />
                })}
        </div>
        <div className='address-summary-container'>
        {userAddress.addr.length == 0 && <div className='delivery-address-container'>
                <p className='title'>Enter your delivery Address</p>
                {/* <p className='address'>141 Grace street, Lekki, Lagos, Nigeria</p> */}
                <p className='change' onClick={()=>{
                    navigate('/market/pickupLocation')
                }}>Enter address here</p>
            </div>}
            {userAddress.addr.length > 0 && <div className='delivery-address-container'>
                <p className='title'>Delivery Address</p>
                <p className='address'>{`${userAddress.addr}, ${userAddress.city}, ${userAddress.country}.`}</p>
                <p className='change' onClick={()=>{
                    
                    navigate('/market/pickupLocation')
                }}>change address</p>
            </div>}
            
            <div className='summary-container'>
                <h5>Order Summary</h5>
                <div className='summary-details-container'>
                {[...cartData, {title:'Tax & fees', price:total, itemNum:1}].map((value, index)=><div key={index}>
                        <p>{value.title}</p>
                        <p>${value.price * value.itemNum}</p>
                    </div>)}
                </div>
            </div>
            <div className="add-to-cart-button-container">
            <button onClick={()=>{
                 if(userAddress.addr.length == 0){
                             setErrorMessage({
                                title:"No Address",
                                content:'no pick up location was entered. ',
                                keyword:'Enter a pickup location.',
                                type:'warning',
                                command:['okay']
                            })
                            return setOpenModal(true)
                        }
                        setActivityIndicator(true)
                        setTimeout(()=>{
                         navigate('/market/checkout')

                        }, 1200)}}>{activityIndicator ? <ClipLoader color='white' size={15} />:
                'Proceed'}</button>
        </div>
        </div>
        
    </div>
}