import express from 'express';

const app = express();

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(3000, '0.0.0.0', () => {
  console.log('App listening on http://10.152.8.211:3000');
});
