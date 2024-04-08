const jwt = require('jsonwebtoken');
const SECRET_KEY = "Akash"
exports.auth = async (req, res, next) => {
    try {
        // console.log(req?.cookies);
        const { token } = req?.cookies;
        if (!token) return res.redirect('/login');
        const user = jwt.verify(token, SECRET_KEY);
        if (!user) {
            return res.redirect('/login');
        }
        req.user = user;
        next();
    } catch (err) {
        console.log('Error occurred middleware of auth', err);
        return res.redirect('/login');
    }
}

exports.normalUser = async (req, res, next) => {
    try {
        const user = req?.user;
        if (!user || !user?.role) return res.end("Unauthorized");
        if (user.role !== "Normal") {
            return res.end("Unauthorized");
        }
        next();
    } catch (err) {
        return res.redirect('/login');
    }
}
exports.adminUser = async (req, res, next) => {
    try {
        const user = req?.user;
        if (!user || !user?.role) return res.end("Unauthorized");
        if (user.role !== "Admin") {
            return res.end("Unauthorized");
        }
        next();
    } catch (err) {
        return res.redirect('/login');
    }
}

exports.openRoute = async (req, res, next) => {
    try {
        const { token } = req?.cookies;
        if (token) return res.redirect('/');
        next();
    } catch (err) {
        res.redirect('/login');
    }
}