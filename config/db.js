const mongoose = require('mongoose');

const dbConnect = () => {
    mongoose.connect('mongodb://localhost:27017/short-url', {
        // useNewUrlParser: true,
        // useUnifiedTopology: true,
    })
    .then(() => console.log('Database connect successfull'))
    .catch((err) => {
        console.log('Database not connected', err);
        process.exit(1);
    })
}

module.exports = dbConnect;