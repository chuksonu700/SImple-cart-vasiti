import React,{useState,useEffect} from "react";
import { connect } from "react-redux";
import {Link, Outlet} from "react-router-dom";
import img from './bootstrap-solid.svg'

function Navbar(props) {

        return(
     <>
        <nav className="navbar navbar-light bg-light justify-content-between p-2">
             <a className="navbar-brand" href="/">
            <img src={img} width="30" height="30" className="d-inline-block align-top" alt="Logo" />
                      Products</a>
                <div className="">
                     <Link to="/" className="p-2 text-muted">Home </Link>
                        <Link to="/admin" className="p-2 text-muted">Admin </Link>
                         <Link to="/carts" className="p-2 text-muted">Cart </Link>
                </div>
        </nav>
        <Outlet />
     </>
        )
    }

function mapStateToProps(state){
    return state
}

export default connect(mapStateToProps,null)(Navbar);