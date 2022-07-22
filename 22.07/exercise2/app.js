const express = require('express');
const { restart } = require('nodemon');
const mock = require('./products.json');
const PORT = 3001;

const [...products] = mock;

const app = express();

app.use(express.json());

app.post('/', (req, res) => {
  const content = req.body;
  products.push(content);
  res.status(201).json({ message: 'Created!' });
});

app.put('/:id', (req, res) => {
  const { id } = req.params;
  const content = req.body;
  const found = products.find((prod) => prod.id === Number(id));
  if (!found) {
    res.status(404).json({ message: 'Product not found' });
    return;
  }
  products[products.indexOf(found)] = content;
  res.status(200).json({ content });

});

app.delete('/:id', (req, res) => {
  const { id } = req.params;
  const found = products.find((prod) => prod.id === Number(id));
  if (!found) {
    res.status(404).json({ message: 'Product not found' });
    return;
  }
  products.splice(products.indexOf(found), 1);
  res.status(200).json({ message: 'deleted!' });
});

app.get('/', (_req, res) => {
  res.status(200).json({ products })
});

app.listen(PORT, () => {
  console.log(`API was runnng on: ${PORT}`);
});