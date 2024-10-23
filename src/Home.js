import React from "react";
import "./Home.css";

class Home extends React.Component {
  render() {
    return (
      <section>
        <h2>Featured Products</h2>
        <div className="product-list">
          <div className="product-item">
            <img
              src="https://images.unsplash.com/photo-1721332153521-120cb0cd02d9?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxMXx8fGVufDB8fHx8fA%3D%3D"
              alt="Product 1"
            />
            <h3>Product 1</h3>
            <p>$29.99</p>
          </div>
          <div className="product-item">
            <img
              src="https://images.unsplash.com/photo-1729326688022-865844a8baa9?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw0fHx8ZW58MHx8fHx8"
              alt="Product 2"
            />
            <h3>Product 2</h3>
            <p>$49.99</p>
          </div>
          <div className="product-item">
            <img
              src="https://images.unsplash.com/photo-1729173078273-3ee243b9273b?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw1fHx8ZW58MHx8fHx8"
              alt="Product 3"
            />
            <h3>Product 3</h3>
            <p>$19.99</p>
          </div>
        </div>
      </section>
    );
  }
}

export default Home;
