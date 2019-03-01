const Users = require('../models/users');

const extractProduct = (user) => {
  const product = {};
  product.id = user.products.id;
  product.qty = user.products.qty;

  return product;
}

// CAN I MUTATE and SAVE my QUERY RETURNED DOCUMENT?

// if user is logged in, retrieve all cart products from database
const getAllProducts = (req, res) => {
  // if (!req.user) return res.status(401).json({ error: 'Unauthorized' });
  const userId = req.user._id;

  return Users.findById(userId)
              .then(user => {
                if (user.products.id !== undefined) {
                  const product = extractProduct(user);
                  console.log('GET all product', product);

                  return product;
                }
                console.log('user.products.id', user.products.id);
              })
              .then(product => res.status(200).json(product))
              .catch(err => res.status(400).json({ err }));
}

// if user is logged in n adds a product, add the product in database
const addOneProduct = (req, res) => {
  // if (!req.user) return res.status(401).json({ error: 'Unauthorized' });
  const userId = req.user._id;
  const productId = req.params.id;

  // Check if the product already exists in the user
  return Users.findById(userId)
              .then(user => {
                if (user.products.id[productId]) {
                  throw new Error('Product already exists');
                } 
                user.products.id.push(productId);
                user.products.qty.push(1);
                return user.save();
              })
              .then(user => {
                const product = extractProduct(user);
                console.log('ADD one product', product);
                return res.status(200).json(product);
              })
              .catch(error => res.status(400).json({ error }));
}

// if user is logged in n changes the qty of a product, update the qty in database
const updateOneProduct = (req, res) => {
  // if (!req.user) return res.status(401).json({ error: 'Unauthorized' });
  const userId = req.user._id;
  const event = req.body.event;
  const productId = req.body.id;
  console.log('updateOneProduct', req.body);

  return Users.findById(userId)
              .then(user => {
                let index = user.products.id.indexOf(productId);
                if (index === -1) {
                  throw new Error(`Product doesn't exist!`);
                }

                const regex = /^[0-9\b]+$/;

                if (event === 'plus') {
                  user.products.qty[index] += 1;
                } else if (event === 'minus') {
                  user.products.qty[index] -= 1;
                } else if (regex.test(event) && event !== '0') {
                  user.products.qty[index] = Number(event);
                }

                return user.save();
              })
              .then(user => {
                const product = extractProduct(user);
                console.log('UPDATE one product', product);
                return res.status(200).json(product);
              })
              .catch(error => res.status(400).json({ error }));
}

// if user is logged in n deletes a product, remove the product in database
const deleteOneProduct = (req, res) => {
  // if (!req.user) return res.status(401).json({ error: 'Unauthorized' });
  const userId = req.user._id;
  const productId = req.params.id;

  return Users.findById(userId)
              .then(user => {
                const index = user.products.id.indexOf(productId);
                if (index === -1) {
                  throw new Error(`Product doesn't exist!`);
                }

                user.products.id.splice(index, 1);
                user.products.qty.splice(index, 1);
                return user.save();
              })
              .then(user => {
                const product = extractProduct(user);
                console.log('DELETE one product', product);
                return res.status(200).json(product);
              })
              .catch(error => res.status(400).json({ error }));
}

module.exports = {
  getAllProducts,
  addOneProduct,
  updateOneProduct,
  deleteOneProduct
}