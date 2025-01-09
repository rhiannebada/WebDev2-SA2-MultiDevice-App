import React, { createContext, useMemo, useState, useCallback, useEffect } from "react";
import PropTypes from 'prop-types';

// Provide a default value for the context
const defaultContextValue = { all_product: [] };

export const ShopContext = createContext(defaultContextValue);

const getDefaultCart = () => {
    let cart = {};
    for (let index = 0; index < 300+1; index++) {
        cart[index] = 0;
    }
    return cart;
}

const ShopContextProvider = ({ children }) => {

    const [all_product, setAll_Product] = useState([]);
    const [cartItems, setCartItems] = useState(getDefaultCart());

    useEffect(() => {
        fetch('http://localhost:4000/allproducts')
       .then((response)=>response.json())
       .then((data)=>setAll_Product(data))

       if(localStorage.getItem('auth-token')) {
        fetch('http://localhost:4000/getcart', {
            method: 'POST',
            headers: {
                Accept: 'application/form-data',
                'auth-token': `${localStorage.getItem('auth-token')}`,
                'Content-Type': 'application/json',
            },
            body: "",
       }).then((response)=>response.json())
       .then((data) => setCartItems(data));
    }
    
}, []);

    const addToCart = useCallback((itemId) => {
        setCartItems((prev) => ({...prev, [itemId]: prev[itemId] + 1 }));
        if(localStorage.getItem('auth-token')) {
            fetch('http://localhost:4000/addtocart', {
                method: 'POST',
                headers: {
                    Accept: 'application/form-data',
                    'auth-token': `${localStorage.getItem('auth-token')}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({"itemId": itemId}),
            })
            .then((response) => response.json())
            .then((data) => console.log(data));
    }});   

    const removeFromCart = useCallback((itemId) => {
        setCartItems((prev) => ({...prev, [itemId]: prev[itemId] - 1 }));
        if(localStorage.getItem('auth-token')) {
            fetch('http://localhost:4000/removefromcart', {
                method: 'POST',
                headers: {
                    Accept: 'application/form-data',
                    'auth-token': `${localStorage.getItem('auth-token')}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({"itemId": itemId}),
            })
            .then((response) => response.json())
            .then((data) => console.log(data));
    }});   

    const getTotalCartAmount = useCallback(() => {
        let totalAmount = 0;
        for (const item in cartItems) {
            if (cartItems[item] > 0) {
                let itemInfo = all_product.find((product) => product.id === Number(item));
                totalAmount += itemInfo.new_price * cartItems[item];
            }
        }
        return totalAmount;
    }, [cartItems, all_product]);

    const getTotalCartItems = useCallback(() => {
        let totalItem = 0;
        for (const item in cartItems) {
            if (cartItems[item] > 0) {
                totalItem += cartItems[item];
            }
        }
        return totalItem;
    }, [cartItems]);

    const contextValue = useMemo(() => ({ 
        getTotalCartAmount, 
        getTotalCartItems, 
        all_product, 
        cartItems, 
        addToCart, 
        removeFromCart 
    }), [cartItems, getTotalCartAmount, getTotalCartItems, all_product, addToCart, removeFromCart]);

    return (
        <ShopContext.Provider value={contextValue}>
            {children}
        </ShopContext.Provider>
    );
};

ShopContextProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export default ShopContextProvider;