import React,{Component} from "react";
import { displayProduct } from "./actions";
import {connect} from 'react-redux';
import Products from "./Components/Products";
import Navbar from "./Components/Navbar";
import Home from "./Components/Home";
import Cart from "./Components/Cart";
import Checkout from "./Components/Checkout";
import Admin from "./Components/Admin/Admin";
import {BrowserRouter,Routes,Route} from 'react-router-dom'

class App extends Component{

    componentDidMount(){
        let urlGood = 'http://localhost:3040/products'
         //fetching Data
         fetch(urlGood,{method:'GET'})
         .then(response=>response.json())
         .then((json)=>{
            this.props.displayProduct(json)
         })
 }
    render(){
        return(
            <>
            <div className="container">
            <BrowserRouter>
                <Routes>
                     <Route path="/" element={<Navbar />}>  
                        <Route index element={<Home />} />
                        <Route path="admin"  element={<Admin />} />
                        <Route path="carts"  element={<Cart />} />
                        <Route path="checkout"  element={<Checkout />} />
                     </Route>
                </Routes>
            </BrowserRouter>
            </div>
                
            </>
        )
    }
}
export default connect(null,{displayProduct})(App);