import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import './CSS/ShopCategory.css'
import { ShopContext } from '../Context/ShopContext'
import Item from '../Components/Item/Item';

const ShopCategory = ({ category, banner }) => {
    const { all_product = [] } = useContext(ShopContext);
    const filteredProducts = all_product.filter(item => item.category === category);

    return (
        <div className='shop-category'>
            <img className='shopcategory-banner' src={banner} alt={`${category} banner`} />
            <div className="shopcategory-indexSort">
                <p>
                    <span>Showing 1-{filteredProducts.length}</span> out of {filteredProducts.length} products
                </p>
            </div>
            <div className="shopCategory-products">
                {filteredProducts.map((item) => (
                    <Item 
                        key={item.id} 
                        id={item.id} 
                        name={item.name} 
                        image={item.image} 
                        new_price={item.new_price} 
                        old_price={item.old_price}
                    />
                ))}
            </div>
        </div>
    )
}

ShopCategory.propTypes = {
    category: PropTypes.string.isRequired,
    banner: PropTypes.string.isRequired,
};

export default ShopCategory;