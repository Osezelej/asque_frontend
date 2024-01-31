import { useState } from "react";
export function Quantity (){
    const [num, setNum] = useState(1);
    return <div className="quantity-container">
        <button className="quantity-button" onClick={()=>(num > 1 && setNum (num- 1))}>-</button>
        <p>{num}</p>
        <button className="quantity-button" onClick={()=>(setNum(num+1))}>+</button>
    </div>
}