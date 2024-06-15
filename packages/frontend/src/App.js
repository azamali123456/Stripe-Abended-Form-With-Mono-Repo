import { useState } from 'react';
import './App.css';
import PayNow from './pages/checkout/index';
import Items from './pages/item';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/css/bootstrap.min.css'
function App() {
  const [itemForCheckout, setItemForCheckout]=useState([])
  const checkoutNow = (item,TotalPrize) => {
     console.log(item,TotalPrize,'mmmmmmmmmmm');
     const data= { product : item.join(', '), prize:TotalPrize }
     setItemForCheckout(data)
  };
  return (
    <div>
      <Items  payInNow={checkoutNow}/>
      {itemForCheckout.length == 0 ?  "":
      
      <PayNow itemForCheckout={itemForCheckout}/>
       }  
    </div>
  );
}

export default App;
