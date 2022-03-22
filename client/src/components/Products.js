import React, {Component}from 'react';
import { connect } from 'react-redux';
import ProductVar from './ProductVar';

class Products extends Component{
    render(){
        return(
        <>
        {
            this.props.products.map((product,index)=>{
                return(
                        <ProductVar key={product.id,index} id ={product.id} title={product.title} desc={product.desc} product_varieties={product.product_varieties} />
                )
            })
        }
        </>)
    }
}

function mapStateToProps(state){
    return state
}

export default connect(mapStateToProps,null)(Products)