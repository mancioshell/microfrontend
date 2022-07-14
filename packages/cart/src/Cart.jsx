import React, { useEffect, useState } from "react";

import { BrowserRouter as Router, useNavigate } from "react-router-dom";

const CartComponent = ({ count, totalPrice }) => {
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    navigate("/checkout");
  }

  return (
    <div className="card text-center">
      <div className="card-header">Carrello</div>
      <div className="card-body">
        <h5 className="card-title">Totale: {totalPrice} $</h5>
        <button onClick={handleSubmit} className="btn btn-primary mt-2">
          <i className="fas fa-shopping-cart"></i> Checkout
        </button>
      </div>
      <div className="card-footer text-muted">
        {" "}
        {count} Prodotti aggiunti al carrello
      </div>
    </div>
  );
};

const Cart = () => {
  const [products, setProducts] = useState([]);
  const [eventService, setEventService] = useState(undefined);

  useEffect(() => {
    async function getEventService() {
      const module = await import("utils/EventService");
      setEventService(module.EventService);
    }

    getEventService();
  }, []);

  useEffect(() => {
    const subscription = eventService?.onProductChange(
      (product) => {
        const founded = products.find((elem) => elem.id === product.id);
        if (founded) {

          let newProducts = products.map((elem) => elem.id === product.id ? { ...elem, count: elem.count + 1 } : elem)

          setProducts(newProducts);
        } else {
          setProducts(products.concat([product]));
        }
      },
      (product) => {
        setProducts(products.filter((elem) => elem.id === product.id));
      }
    );

    return () => subscription?.unsubscribe();
  }, [eventService, products]);

  useEffect(() => {
    async function getProducts() {
      const utils = await import("utils/AjaxService");
      const result = await utils.doAjax("GET", "/api/checkouts");
      setProducts(result.data);
    }
    getProducts();
  }, []);

  const count = products.reduce((curr, next) => curr + next.count, 0);
  const totalPrice = products.reduce(
    (curr, next) => curr + next.price * next.count,
    0
  );

  return (
    <Router>
      <CartComponent count={count} totalPrice={totalPrice}></CartComponent>
    </Router>
  );
};

export default Cart;
