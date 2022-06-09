import { BrowserRouter } from 'react-router-dom';
import './App.scss';
import React from "react";
import Footer from './components/Footer';
import Login from './components/Login';
import Register from './components/Register';
import Product from './components/Product';
import Header from './components/Header';
import Home from './components/home/Home';
import { Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './Store/store';

function App() {
  return (
    <>
      <Provider store={store}>
        <BrowserRouter>
          <Header/>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<Register />}/>
            <Route path="/signin" element={<Login/>}/>
            <Route path="/product" element={<Product/>}/>
            <Route path="/product/:id" element={<Product/>}/>
          </Routes>
        </BrowserRouter>
      </Provider>
      <Footer/>
    </>
  );
}

export default App;
