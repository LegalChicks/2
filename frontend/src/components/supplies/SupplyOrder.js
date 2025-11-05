// src/components/supplies/SupplyOrder.js
import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

// --- Product Card Component ---
const ProductCard = ({ product, addToCart }) => {
  return (
    <div className="product-card">
      <img src={product.imageUrl} alt={product.name} />
      <div className="product-info">
        <h3>{product.name}</h3>
        <p>{product.description}</p>
        <span className="product-price">
          ₱{product.price.toFixed(2)}
          <span className="product-unit"> / {product.unit}</span>
        </span>
        <button onClick={() => addToCart(product)} className="btn-add-cart">
          Add to Cart
        </button>
      </div>
    </div>
  );
};

// --- Cart Item Component ---
const CartItem = ({ item, updateQuantity, removeFromCart }) => {
  return (
    <div className="cart-item">
      <div className="cart-item-info">
        <h4>{item.name}</h4>
        <p>₱{item.price.toFixed(2)} / {item.unit}</p>
      </div>
      <div className="cart-item-actions">
        <input
          type="number"
          value={item.quantity}
          onChange={(e) => updateQuantity(item.product, parseInt(e.target.value))}
          min="1"
        />
        <button onClick={() => removeFromCart(item.product)}>Remove</button>
      </div>
      <div className="cart-item-total">
        ₱{(item.price * item.quantity).toFixed(2)}
      </div>
    </div>
  );
};

// --- Main Supply Order Page ---
const SupplyOrder = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [orderStatus, setOrderStatus] = useState(''); // 'success' or 'error'
  const navigate = useNavigate();

  // Fetch products on load
  useEffect(() => {
    const fetchProducts = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login');
        return;
      }
      const config = { headers: { 'x-auth-token': token } };

      try {
        const res = await axios.get('http://localhost:5000/api/products', config);
        setProducts(res.data);
      } catch (err) {
        handleApiError(err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [navigate]);

  const handleApiError = (err) => {
    console.error(err.response?.data?.msg || 'API Error');
    if (err.response?.status === 401) {
      localStorage.removeItem('token');
      navigate('/login');
    } else {
      setError('Could not load supplies. Please try again.');
    }
  };

  // --- Cart Management ---
  const addToCart = (product) => {
    setOrderStatus('');
    const existingItem = cart.find((item) => item.product === product._id);
    if (existingItem) {
      // If item exists, just increase quantity
      updateQuantity(product._id, existingItem.quantity + 1);
    } else {
      // Add new item to cart
      const newItem = {
        product: product._id,
        name: product.name,
        price: product.price,
        unit: product.unit,
        quantity: 1,
      };
      setCart([...cart, newItem]);
    }
  };

  const updateQuantity = (productId, quantity) => {
    if (quantity < 1) {
      removeFromCart(productId);
      return;
    }
    setCart(
      cart.map((item) =>
        item.product === productId ? { ...item, quantity: quantity } : item
      )
    );
  };

  const removeFromCart = (productId) => {
    setCart(cart.filter((item) => item.product !== productId));
  };

  const getCartTotal = () => {
    return cart
      .reduce((total, item) => total + item.price * item.quantity, 0)
      .toFixed(2);
  };

  // --- Order Submission ---
  const submitOrder = async () => {
    const token = localStorage.getItem('token');
    const config = { headers: { 'x-auth-token': token } };
    
    // Format order data for the API
    const orderData = {
      items: cart.map(({ product, name, quantity, price }) => ({
        product,
        name,
        quantity,
        price,
      })),
      totalPrice: getCartTotal(),
    };

    try {
      await axios.post('http://localhost:5000/api/orders', orderData, config);
      setOrderStatus('success');
      setCart([]); // Clear cart
    } catch (err) {
      setOrderStatus('error');
      handleApiError(err);
    }
  };

  if (loading) return <div className="container"><p>Loading supplies...</p></div>;

  return (
    <div className="container supply-page">
      <header className="page-header">
        <h1>Order Supplies</h1>
        <p>Exclusive member pricing and quality, guaranteed.</p>
        <Link to="/dashboard">&larr; Back to Dashboard</Link>
      </header>

      {/* --- Notices from Prompt  --- */}
      <div className="supply-notices">
        <div className="notice quality-notice">
          <strong>Quality Assurance:</strong> All chicks are 100% vaccinated from
          pure LCEN RIR genetics[cite: 422, 96]. All feeds are formulated for
          peak Cagayan Valley conditions.
        </div>
        <div className="notice hub-notice">
          <strong>Distribution Notice:</strong> Orders are consolidated for pickup
          at your assigned Barangay Distribution Hub. Our team will contact
          you with your schedule.
        </div>
      </div>

      <div className="supply-layout">
        {/* --- Product List --- */}
        <div className="product-list">
          <h2>Available Products</h2>
          {error && <p className="error-msg">{error}</p>}
          <div className="product-grid">
            {products.map((product) => (
              <ProductCard
                key={product._id}
                product={product}
                addToCart={addToCart}
              />
            ))}
          </div>
        </div>

        {/* --- Cart Sidebar --- */}
        <div className="cart-sidebar">
          <h2>Your Order</h2>
          {cart.length === 0 ? (
            <p>Your cart is empty.</p>
          ) : (
            <>
              {cart.map((item) => (
                <CartItem
                  key={item.product}
                  item={item}
                  updateQuantity={updateQuantity}
                  removeFromCart={removeFromCart}
                />
              ))}
              <div className="cart-total">
                <strong>Total:</strong>
                <strong>₱{getCartTotal()}</strong>
              </div>
              
              {/* --- Order Status Messages --- */}
              {orderStatus === 'success' && (
                <div className="status-msg success-msg">
                  Order Submitted! We will contact you to confirm pickup.
                </div>
              )}
              {orderStatus === 'error' && (
                <div className="status-msg error-msg">
                  Order failed. Please try again.
                </div>
              )}

              <button
                className="btn btn-primary btn-submit-order"
                onClick={submitOrder}
              >
                Submit Order
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default SupplyOrder;