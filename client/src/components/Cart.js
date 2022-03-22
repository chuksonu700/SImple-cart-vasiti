import { useState,useEffect, Component } from "react";
import { connect } from "react-redux"
import CartItem from "./CartItem";

class Cart extends Component{

     calcTotal(){
        let Total=0;
        this.props.carts.forEach(prod => {
            let getNumber=parseInt(prod.variety.price)
            Total += getNumber;
        });
        return Total;
    }
    // makePayment(cash) {
    //     FlutterwaveCheckout({
    //       public_key: "FLWPUBK_TEST-0d4e54a6400afbaf9b3b6c5d4c8ae101-X",
    //       tx_ref: "titanic-48981487343MDI0NzMx",
    //       amount: cash,
    //       currency: "NGN",
    //       payment_options: "card, banktransfer, ussd",
    //       redirect_url: "https://glaciers.titanic.com/handle-flutterwave-payment",
    //       meta: {
    //         consumer_id: 23,
    //         consumer_mac: "92a3-912ba-1192a",
    //       },
    //       customer: {
    //         email: "rose@unsinkableship.com",
    //         phone_number: "08102909304",
    //         name: "Rose DeWitt Bukater",
    //       },
    //       customizations: {
    //         title: "The Titanic Store",
    //         description: "Payment for an awesome cruise",
    //         logo: "https://www.logolynx.com/images/logolynx/22/2239ca38f5505fbfce7e55bbc0604386.jpeg",
    //       },
    //     });
    //   }
    render(){
    return(
        <>
            <div className="row"> 
                <div className="col-md-10 mx-auto mb-4">
                    <h4 className="d-flex justify-content-between align-items-center mb-3">
                        <span className="text-muted">Your cart</span>
                        <span className="badge badge-secondary badge-pill">3</span>
                    </h4>  
                    <ul className="list-group   mb-3">
 
                {
                    this.props.carts.map(prod=>{

                        return(
                            <div key={Math.round(Math.random()*10000+1)+(prod.id+prod.variety._id)}>
                                <CartItem prod={prod}/>
                            </div>
                        )
                    })
                }
                    <li className="list-group-item d-flex justify-content-between">
                    <span>Total (USD)</span>
                     <strong>${this.calcTotal()}</strong>
                    </li>
                </ul>
                <button className="btn btn-primary btn-lg btn-block" onClick={this.makePayment(this.calcTotal())}>Continue to checkout</button>
                 </div>
                 </div>
        </>
    )
            }       
}
 function mapStateToProps(state){
     return state
 }

export default connect(mapStateToProps,null)(Cart);