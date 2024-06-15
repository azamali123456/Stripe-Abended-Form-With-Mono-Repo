import './index.css';
import React from 'react';
function Button({type,title, disable ,onClick=()=>{}}) {
  return (
    <button onClick={onClick} disabled={disable} className={` btn ${ (type === 'add' && 'add') || (type === 'remove' && 'remove') || (type === 'checkout' && 'checkout')}`}>
      {title}
    </button>

  );
}

export default Button;
