const User = require('../models/User');
const jwt = require('jsonwebtoken');
const SECRET_KEY = "Akash";
exports.signup = async (req, res) => { 
    try {
        const { name, email, password,role="Normal" } = req.body;
        if (!name || !email || !password) {
            res.status(402).json({
                success: false,
                message : "All fields required"
            })
            return res.redirect('/signup');
        }

        const checkUser = await User.findOne({ email });
        if (checkUser) {
            res.status(402).json({
                success: false,
                message : "user already registered!"
            })
            return res.redirect('/signup');
        }

        const user = await User.create({ email, name, password,role });
        console.log("user", user);
        return res.redirect('/login');
    } catch (err) {
        res.status(500).json({
            message: err.message,
            error: err,
        });
        return res.redirect('/signup');
    }
}

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            // res.render('Login', {
            //     error : "All fields are required"
            // });
            return res.redirect('/login');
        }

        const user = await User.findOne({ email });
        // console.log(user);
        if (!user) {
            return res.redirect('/login');
        }

        if (password === user?.password) {
            try {
                const payload = {
                    id: user?.id,
                    email: user?.email,
                    role : user?.role,
                };
                const token = jwt.sign(payload, SECRET_KEY);
                const options = {
                    httpOnly: true,
                    // exipre : Date.now() * 3 * 60 * 60 * 1000
                };
                return res.cookie('token', token, options).redirect(user?.role === "Admin" ? "/admin/url" : "/");
            } catch (err) {
                return res.redirect('/login').json({
                    message : "jwt token error",
                    error : err.message,
                });
            }            
        } else {
            return res.redirect('/login');
        }
    } catch (err) {
        res.status(501).json({
            message: err.message,
            error: err,
        });
        return res.redirect('/login');
    }
}