const express = require('express');
const dbConnect = require('./config/db');
const routes = require('./routes/index');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(routes);

app.listen(PORT, () => {
    console.log(`Server listen on port ${PORT}`);
})

dbConnect();