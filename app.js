const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const path = require('path');

const newsRoutes = require('./routes/newsRoutes');
const journalsRoutes = require('./routes/journalsRoutes');
const adminRoutes = require('./routes/adminRoutes');
const authRoutes = require('./routes/authRoutes')

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: 'http://localhost:4200',
  credentials: true
}));

// Serve journals PDFs
app.use('/uploads/journals', express.static(path.join(__dirname, 'uploads/journals')));


// Routes
app.use('/news', newsRoutes);
app.use('/journals', journalsRoutes);
app.use('/admin', adminRoutes);
app.use('/auth', authRoutes);

module.exports = app;
