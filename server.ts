import express from 'express';

const app = express();

app.listen(3000, '192.168.0.220', () => {
console.log('Server running on http://192.168.0.220:3000');
});
