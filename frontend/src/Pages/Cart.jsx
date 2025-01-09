import React, { useContext } from 'react';
import { ShopContext } from '../Context/ShopContext';
import CartItems from '../Components/CartItems/CartItems';

const Cart = () => {
    const { cartItems, all_product } = useContext(ShopContext);

    return (
        <div>
            <CartItems cartItems={cartItems} all_product={all_product} />
        </div>
    )
};

export default Cart;