var router = require('express').Router();
const mysql = require('mysql');
const Connection = require('mysql/lib/Connection');

//starting connection
const db = require('../helpers/db');
const connection = mysql.createConnection({
  host: "localhost",
  user: 'root',
  password: '',
  database: 'vasiti-store'
});

/* GET home page. */
router.get('/products', function (req, res, next) {
  console.log(" vas")
  const SqlQuery_get_single_Product = "SELECT id, product_name, product_description,product_varieties from products LIMIT 20";
  connection.query(SqlQuery_get_single_Product, (err, rows) => {
    if (err) {
      console.log(err);
      res.status(500).send('internal server error');
    } else {
      let products =[];
      for (let i = 0; i < rows.length; i++) {
        let  product = {
              id: rows[i].id,
              title: rows[i].product_name,
              desc: rows[i].product_description,
              product_varieties: JSON.parse(rows[i].product_varieties)
          };
          products.push(product)
      }
      res.status(201).send(products);
    }
  });
});

// adding new products
router.post('/products', (req, res, next) => {
  // console.log(req.body);
  const {
    product_name,
    product_description,
    product_varieties
  } = req.body;
  const str_product_varieties = JSON.stringify(product_varieties);
  const SqlQuery_add_Product = "INSERT INTO products(product_name, product_description,product_varieties) values(?,?,?)";
  connection.query(SqlQuery_add_Product, [product_name, product_description, str_product_varieties], (err, rows) => {
    if (err) {
      console.log(err);
      res.status(500).send('internal server error');
    } else {
      res.status(201).send('product added')
    }
  });
});

router.get('/products/:id', (req, res, next) => {
  const SqlQuery_get_single_Product = "SELECT id,product_name,product_description,product_varieties from products WHERE id=?";
  connection.query(SqlQuery_get_single_Product, [req.params.id], (err, rows) => {
    if (err) {
      console.log(err);
      res.status(500).send('internal server error');
    } else {
      let products =[];
        let variety= JSON.parse(rows[0].product_varieties);
        let  product =  {
              id: rows[0].id,
              title: rows[0].product_name,
              desc: rows[0].product_description,
              product_varieties: variety
          };
          products.push(product)
        
      res.status(201).send(products)
    }
  });
})
router.put('/products/:id', (req, res, next) => {
  const SqlQuery_get_single_Product = "SELECT * from products WHERE id=?";
  connection.query(SqlQuery_get_single_Product, [req.params.id], (err, rows) => {
    if (err) {
      console.log(err);
      res.status(500).send('internal server error');
    } else {
      const {
        product_name,
        product_description,
        product_varieties
      } = req.body;
      const str_product_varieties = JSON.stringify(product_varieties);
      const date_edit = new Date()
      const SqlQuery_update_Product = "UPDATE products set product_name =?, product_description =?,product_varieties=?, date_edit=? WHERE id=?";
      connection.query(SqlQuery_update_Product, [product_name, product_description, str_product_varieties,date_edit,req.params.id], (err, rows) => {
        if (err) {
          console.log(err);
          res.status(500).send('internal server error');
        } else {
          res.status(201).send('product Edited')
        }
      });
    }
  });
})

router.put('/product/:id',(req,res)=>{
  //delete varieties
})

router.get('/product-var',(req,res)=>{
  const SqlQuery_get_single_Product = "SELECT id,product_name,product_description,product_varieties from products WHERE id=?";
  connection.query(SqlQuery_get_single_Product, [req.query.pro], (err, rows) => {
    if (err) {
      console.log(err);
      res.status(500).send('internal server error');
    } else {
      let products =[];
        let variety=JSON.parse(rows[0].product_varieties);
        let  product = {
              id: rows[0].id,
              title: rows[0].product_name,
              desc: rows[0].product_description,
              product_varieties: variety.filter(productVariety=>productVariety._id==req.query.var)
          };
          products.push(product)
        
      res.status(201).send(products)
    }
  });
});

router.put('/product-var-del/:id/:var',(req,res,next)=>{
  const SqlQuery_get_single_Product = "SELECT product_varieties from products WHERE id=?";
  connection.query(SqlQuery_get_single_Product, [req.params.id], (err, rows) => {
    if (err) {
      console.log(err);
      res.status(500).send('internal server error');
    } else {
        let variety=JSON.parse(rows[0].product_varieties);
        //return the other variety and stringify them
        let new_product_varieties = JSON.stringify(variety.filter(productVariety=>productVariety._id!=req.params.var));
        const SqlQuery_delete_variety = "Update products set product_varieties=? WHERE id=?";
        connection.query(SqlQuery_delete_variety, [new_product_varieties,req.params.id], (err, rows) => {
          if (err){
            console.log(err);
            res.status(500).send('internal server error');
          } else {
            let Response ={
              done:true,
              Comment:"variety deleted"
            }
            res.status(201).send(Response)
          }
        })
    }
  });
})
module.exports = router;