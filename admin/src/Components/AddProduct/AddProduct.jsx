import React, { useState } from 'react';
import './AddProduct.css';
import upload_area from '../../assets/upload_area.png';

const AddProduct = () => {
  const [image, setImage] = useState(null); // Initialize as null
  const [productDetails, setProductDetails] = useState({
    name: '',
    image: '',
    category: 'books',
    new_price: '',
    old_price: '',
  });

  const imageHandler = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setProductDetails({ ...productDetails, image: file ? file.name : '' });
  };

  const changeHandler = (e) => {
    setProductDetails({ ...productDetails, [e.target.name]: e.target.value });
  };

  const Add_Product = async () => {
    console.log('Product Details Before Upload:', productDetails);
    let responseData;
    let product = productDetails;

    let formData = new FormData();
    formData.append('product', image);

    // Upload Image to the server
    await fetch('http://localhost:4000/upload', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
      },
      body: formData,
    })
      .then((resp) => resp.json())
      .then((data) => {
        console.log('Upload Response:', data); // Debugging response from upload
        responseData = data;
      })
      .catch((err) => {
        console.error('Error uploading image:', err);
        alert('Image upload failed.');
        return;
      });

    if (responseData && responseData.success) {
      product.image = responseData.image_url;
      console.log('Product after image upload:', product);

      // Add Product after uploading image
      await fetch('http://localhost:4000/addproduct', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(product),
      })
        .then((resp) => resp.json())
        .then((data) => {
          console.log('Add Product Response:', data); // Debugging response from add product
          if (data.success) {
            alert('Product added successfully');
          } else {
            alert('Failed to add product');
          }
        })
        .catch((err) => {
          console.error('Error adding product:', err);
          alert('Failed to add product');
        });
    } else {
      alert('Image upload failed or was not successful');
    }
  };

  return (
    <div className="addproduct">
      <div className="addproduct-itemfield">
        <p>Product Title</p>
        <input
          value={productDetails.name}
          onChange={changeHandler} // Ensure this is bound correctly
          type="text"
          name="name"
          placeholder="Type here"
        />
      </div>
      <div className="addproduct-price">
        <div className="addproduct-itemfield">
          <p>Price</p>
          <input
            value={productDetails.old_price}
            onChange={changeHandler}
            type="text"
            name="old_price"
            placeholder="Type here"
          />
        </div>
        <div className="addproduct-itemfield">
          <p>Offer Price</p>
          <input
            value={productDetails.new_price}
            onChange={changeHandler}
            type="text"
            name="new_price"
            placeholder="Type here"
          />
        </div>
      </div>
      <div className="addproduct-itemfield">
        <p>Product Category</p>
        <select
          value={productDetails.category}
          onChange={changeHandler}
          name="category"
          className="add-product-selector"
        >
          <option value="books">Books</option>
          <option value="merch">Merch</option>
          <option value="albums">Albums</option>
        </select>
      </div>
      <div className="addproduct-itemfield">
        <label htmlFor="file-input">
          <img
            src={image ? URL.createObjectURL(image) : upload_area}
            className="addproduct-thumbnail-img"
            alt="Upload Preview"
          />
        </label>
        <input
          onChange={imageHandler}
          type="file"
          name="image"
          id="file-input"
          hidden
        />
      </div>
      <button onClick={Add_Product} className="addproduct-btn">
        ADD
      </button>
    </div>
  );
};

export default AddProduct;
