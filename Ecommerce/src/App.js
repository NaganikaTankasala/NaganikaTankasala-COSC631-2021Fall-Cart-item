import React, { useState, useEffect } from 'react';
import { commerce } from './lib/commerce';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Products from './components/Products/Products';
import Navbar from './components/Navbar/Navbar';
import Addtocart from './components/Add-to-cart/Addtocart';
import Checkout from './components/Checkout/Checkout';
import ProductDetail from './components/Products/ProductDetail';

const App = () => {
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    // commerce.products.list().then((response) => console.log(response.data));
    const { data } = await commerce.products.list();
    setProducts(data);
  };

  useEffect(() => {
    fetchProducts();
  }, []);
  return (
    <BrowserRouter>
      <Navbar />
      <Switch>
        <Route path='/product/:id' component={ProductDetail} />
        <Route path='/checkout/:id' component={Checkout} />
        <Route path='/cart' component={Addtocart} />
        <Route path='/' component={() => <Products products={products} />} />
      </Switch>
    </BrowserRouter>
  );
};

export default App;
