const { Router } = require('express');
const productsFile = require('../products.json');

const [...products] = productsFile;

const productRouter = Router();

productRouter.post('/', (req, res, next) => {
  try {
    const product = req.body;
    const index = products.length ? products[products.length - 1].id + 1 : 1;
    const created = {
      id: index,
      ...product,
    }
    products.push(created);
    return res.status(201).json(created);
  } catch (e) {
    next(e)
  }
});

productRouter.put('/:id', (req, res, next) => {
  try {
    const { id } = req.params;
    const user = req.body;
    const found = products.find((user) => user.id === Number(id));
    if (!found) {
      return res.status(404).json({ error: 'Product not found' })
    }
    products[products.indexOf(found)] = user;
    return res.status(200).json(user);
  } catch (e) {
    next(e)
  }
});

productRouter.delete('/:id', (req, res, next) => {
  try {
    const { id } = req.params;
    const found = products.find((user) => user.id === Number(id));
    if (!found) {
      return res.status(404).json({ error: 'Product not found' })
    }
    products.splice(products.indexOf(found), 1)
    return res.status(200).json({ message: 'Deleted!' });
  } catch (e) {
    next(e);
  }
});

productRouter.get('/:id', (req, res, next) => {
  try {
    const { id } = req.params;
    const found = products.find((user) => user.id === Number(id));
    if (!found) {
      return res.status(404).json({ error: 'Product not found' })
    }
    return res.status(200).json(found);
  } catch (e) {
    next(e)
  }
});

productRouter.get('/', (_req, res, next) => {
  try {
    return res.status(200).json(products);
  } catch (e) {
    next(e)
  }
});

module.exports = productRouter;
