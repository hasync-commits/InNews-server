require('dotenv').config();
const connectDB = require('./configs/db');

const app = require('./app');
const port = process.env.PORT || 3500;

connectDB();

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
