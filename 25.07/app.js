const express = require('express');
const productRouter = require('./routes/product.route');
const userRouter = require('./routes/user.route');
const PORT = 3001;

const app = express();

app.use(express.json());

app.use('/api/users', userRouter);
app.use('/api/products', productRouter);

app.listen(PORT, () => {
  console.log(`API was listen on port: ${PORT}`)
});