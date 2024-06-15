import './index.css';
import data from '../../db/db';
import Card from '../../Components/card';
import Cart from '../../Components/cart'
import { useState } from 'react';
const food = data();
function Items({payInNow=()=>{}}) {
  const [checkoutPrize, setCheckoutPrize]= useState(0)
  const [item, setItems]= useState([])
  const checkoutNow = () => {
    // console.log('mmmmmmmmmmm');
    payInNow(item,checkoutPrize)
  };
  const objectForCheckout = (title) => {
    setItems((prevItems) => {
      // Check if the item already exists in the array
      if (prevItems.includes(title)) {
        return prevItems; // Return the previous state if item is a duplicate
      }
      return [...prevItems, title]; // Add new item if it's not a duplicate
    });
  };
  return (
    <div className='Itemcontainer '  >
      <h3 className='title'> Order Food Now!</h3>
      <Cart prize={checkoutPrize} checkoutNow={checkoutNow}/>
      <div className='.card__container' style={{ display:'flex'}}>
      {food.map((item, index) => {
        return <Card item={item}  key={index} setCheckoutPrize={setCheckoutPrize} checkoutPrize={checkoutPrize} objectForCheckout={objectForCheckout}/>;
      })}
      </div>
       
    </div>
  );
}

export default Items;
