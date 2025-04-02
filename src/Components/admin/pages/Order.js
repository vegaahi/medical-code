import React from "react";

const Order = () => {
  const orders = []; // Example: No orders yet

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col">
          <h1 className="text-center">Order Page</h1>
        </div>
      </div>
      <div className="row mt-4">
        {orders.length === 0 ? (
          <div className="col">
            <div className="card text-center">
              <div className="card-body">
                <h5 className="card-title">No Orders Yet</h5>
                <p className="card-text">
                  You currently have no orders. Please check back later.
                </p>
                {/* <a href="#" className="btn btn-primary">
                  Go to Shop
                </a> */}
              </div>
            </div>
          </div>
        ) : (
          orders.map((order, index) => (
            <div className="col-md-4" key={index}>
              <div className="card mb-4">
                <div className="card-body">
                  <h5 className="card-title">Order #{order.id}</h5>
                  <p className="card-text">{order.description}</p>
                  <a href="#" className="btn btn-success">
                    View Details
                  </a>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Order;
