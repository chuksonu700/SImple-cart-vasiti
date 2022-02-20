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
  const SqlQuery_get_single_Product = "SELECT* from products WHERE id=?";
  connection.query(SqlQuery_get_single_Product, [req.params.id], (err, rows) => {
    if (err) {
      console.log(err);
      res.status(500).send('internal server error');
    } else {
      res.status(201).send(rows)
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
          res.status(201).send('product added')
        }
      });
    }
  });
})

router.put('/product/:id',(req,res)=>{
  //delete varieties
})

module.exports = router;