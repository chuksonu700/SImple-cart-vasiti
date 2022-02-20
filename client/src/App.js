import React, { Component } from 'react';
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Navbar from './components/Navbar'
import Products from './components/Home'
// import Cart from './components/Cart'

class App extends Component {
  render() {
    return (
       <BrowserRouter>
       
        <div className="App">
            <Routes>
              <Route path="/" element={<Navbar />}>
                 <Route index element={<Products />} />
                  {/* <Route path="/cart" element={<Cart />} /> */}
              </Route>
            </Routes>
         </div>
      </BrowserRouter>
      
    );
  }
}

export default App;
