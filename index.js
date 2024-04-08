const express = require('express');
const dbConnect = require('./config/db');
const cookieParser = require('cookie-parser');
const urlRoutes = require('./routes/url');
const path = require('path');
const staticRoutes = require('./routes/staticRoutes');
const userRoutes = require('./routes/user');

const app = express();
const PORT = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.set('views', path.resolve('./views'))

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(urlRoutes);
app.use(staticRoutes);
app.use('/user', userRoutes);



app.listen(PORT, () => {
    console.log(`Server listen on port ${PORT}`);
});

dbConnect();