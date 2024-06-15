import './index.css';
import React, { useState } from 'react';
function Card({ item ,setCheckoutPrize,checkoutPrize,objectForCheckout=()=>{}}) {
  const [count, setCount] = useState(0)
  const { id, title, prize, image } = item

  const increment=(itemPrize)=>{
    setCount(count+1)
    objectForCheckout(title)
    setCheckoutPrize(checkoutPrize+itemPrize)
  }
  const decrement=(itemPrize)=>{
    if(count > 0){
      setCount(count-1)
      setCheckoutPrize(checkoutPrize-itemPrize)
      objectForCheckout(title)
    }
  }
   
  return (

    <div className='item_card'>
      <span className={`${count !== 0 ? "card__badge" : "card__badge--hidden"}`}>
        {count}
      </span>
      <div className="image__container">
        <img src={image} alt='No Image Display' width={500} height={150}/>
        <div className="card__title">
          {title} <span className='card__prize'>{prize}</span>
        </div>
        <div className='btn-container'>

        <button className='btn__add'  type={'add'} onClick={()=>increment(prize)}>
        +</button>
        <button  className='btn__sub' type={'sub'} onClick={()=>decrement(prize)}>
        -</button>
        </div>
      
      </div>
    </div>

  );
}

export default Card;
