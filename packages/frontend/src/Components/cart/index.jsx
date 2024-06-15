import './index.css';
import React from 'react';
import Button from '../Button';
function Cart({prize,checkoutNow=()=>{}}) {
  
  return (
    <div className='cart__container'>
     Total Prize : $ {prize}
     <br/>
     <Button type={"checkout"}title={"Checkout"} disable={prize == 0 ? true : false} onClick={checkoutNow}/>
    </div>

  );
}

export default Cart;
