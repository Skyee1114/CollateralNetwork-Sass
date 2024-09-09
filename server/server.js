const express = require('express');
const passport = require('passport');
const session = require('express-session');
const connectDB = require('./config/db');
const cors = require('cors');
const app = express();

app.use(cors());

// Connect Database
connectDB();

// Init Middleware
app.use(express.json({ extended: false }));

app.use(session({
  secret: process.env.JWT_SECRET,
  resave: true,
  saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());

app.get('/', (req, res) => {
  res.send('API running');
});

app.use('/api/register', require('./routes/api/register'));
app.use('/api/verify', require('./routes/api/verify'));
app.use('/api/login', require('./routes/api/login'));
app.use('/api/loaduser', require('./routes/api/loaduser'));
app.use('/api/profile', require('./routes/api/profile'));
app.use('/api/google', require('./routes/api/google'));
app.use('/api/nft', require('./routes/api/nft'));
app.use('/api/collection', require('./routes/api/collection'));
app.use('/api/notification', require('./routes/api/notification'));
app.use('/api/admin', require('./routes/api/admin'));
app.use('/api/ico', require('./routes/api/ico'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));