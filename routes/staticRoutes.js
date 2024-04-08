const express = require('express');
const URL = require('../models/url');
const { auth,openRoute,normalUser,adminUser} = require('../middlewares/auth');
const router = express.Router();

router.get('/', auth, normalUser, async (req, res) => {
    const userId = req?.user?.id;
    if (!userId) {
        return res.redirect("/login").json({ error: "UserId is missing" });
    }

    const data = await URL.find({createdBy : userId});
    // console.log("Home", data);
    if (!data || data.length == 0) {
        return res.render('Home', { data: [] });
    }
    return res.render('Home', { data });
});

router.get('/admin/url', auth, adminUser, async (req, res) => {
    const data = await URL.find({}).populate("createdBy").exec();
    // console.log("Home", data[0]['redirectUrl'], data);
    if (!data || data.length == 0) {
        return res.render('Home', { data: [] });
    }
    return res.render('Home', {data, createdBy : data?.createdBy});
});

router.get('/login',openRoute, async (req, res) => {
    res.render('Login');
})
router.get('/signup',openRoute, async (req, res) => {
    res.render('Signup');
})

module.exports = router;