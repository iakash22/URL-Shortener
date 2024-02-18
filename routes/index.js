const express = require('express');
const {redirectUrlId, generateShortUrl, getAnalytics} = require('../controllers/index');

const routes = express.Router();
routes.post('/', generateShortUrl);
routes.get('/:shortId', redirectUrlId);
routes.get('/analytics/:shortId', getAnalytics);


module.exports = routes;