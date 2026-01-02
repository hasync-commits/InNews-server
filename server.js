require('dotenv').config();
const connectDB = require('./configs/db');

const app = require('./app');
const port = process.env.PORT;

connectDB();

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
