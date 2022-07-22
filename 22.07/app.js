const app = require('express')();

app.get('/', (_req, res) => {
  res.send('Hello World!');
})

app.listen(3001, () => {
  console.log('API is running on door: 3001')
})