const express = require('express');
const {redirectUrlId, generateShortUrl, getAnalytics} = require('../controllers/url');
const { auth } = require('../middlewares/auth');

const routes = express.Router();
routes.post('/url', auth, generateShortUrl);
routes.get('/url/:shortId', redirectUrlId);
routes.get('/analytics/:shortId', getAnalytics);


module.exports = routes;