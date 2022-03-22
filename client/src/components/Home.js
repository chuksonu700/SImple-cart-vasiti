import {useState,useEffect} from "react";
import Products from "./Products";
import Navbar from "./Navbar";
import { connect, Connect } from "react-redux";

function Home(props) {
    const [count, setCount] = useState(0);

  useEffect(() => {
    setTimeout(() => {
      setCount((count) => {
          if (props.carts.length>0) {
              count =props.carts.length;
              return count
          }
          else{
              return count
          }
      });
    }, 1000);
  });

        return(
            <>
                <div className="row">
                <div className="col-md-12 d-flex justify-content-end m-1">
                    <button className="btn btn-lg btn-warning p-2"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-cart3" viewBox="0 0 16 16">
                    <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .49.598l-1 5a.5.5 0 0 1-.465.401l-9.397.472L4.415 11H13a.5.5 0 0 1 0 1H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l.84 4.479 9.144-.459L13.89 4H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
                </svg> Cart
                    {
                        count
                    }
                </button>
                </div>
                </div>

                 <div className="row card-deck">     
                  <Products />
                 </div>
            </>
        )
    
}
function mapStateToProps(state){
    return state;
}

export default connect(mapStateToProps,null)(Home);