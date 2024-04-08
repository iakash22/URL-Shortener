const URL = require('../models/url');
const shortid = require('shortid');


exports.generateShortUrl = async (req, res) => {
    try {
        // console.log(req.body);
        const { url } = req.body;
        const user = req.user;
        if (!url || !user) {
            // return res.status(401).json({
            //     success: false,
            //     message: "field is required"
            // })
            return res.redirect('/');
        }
        const shortId = shortid();
        await URL.create({ shortId, redirectUrl: url, visitHistory: [], createdBy : user.id});

        return res.render('Home', {id : shortId});
    } catch (err) {
        console.log('error occurred while generate url id', err);
        // return res.status(501).json({
        //     success: false,
        //     message: err.message
        // });
        return res.redirect('/');
    }
}

exports.redirectUrlId = async (req, res) => {
    try {
        const shortId = req.params.shortId
        // console.log('shortId : ', shortId);
        if (!shortId) {
            return res.status(403).json({
                success: false,
                message: "ShortId is missing!"
            });
        }

        const entry = await URL.findOneAndUpdate(
            { shortId },
            {
                $push: {
                    visitHistory: { timestamp: Date.now() }
                }
            }
        );

        if (!entry) {
            return res.status(404).json({
                success: false,
                message: "ShortId is invalid!",
            });
        }
        return res.redirect(entry.redirectUrl);
    }catch(err){
        console.log('error occurred while redirect url', err);
        return res.status(501).json({
            success : false,
            message: err.message
        })
    }
}

exports.getAnalytics = async (req,res) => {
    try{
        const shortId = req.params.shortId;
        if (!shortId) {
            return res.status(403).json({
                success: false,
                message: "ShortId is missing!"
            });
        }
        const data = await URL.findOne({shortId}, {visitHistory : true}).exec();
        if (!data) {
            return res.status(404).json({
                success: false,
                message: "ShortId is invalid!",
            });
        }
        return res.status(200).json({
            success : true,
            message : 'data fetch',
            data : {
                totalClicks : data?.visitHistory.length,
                analytics : data?.visitHistory
            }
        });
    }catch(err){
        console.log('error occurred while fetch analytics data', err);
        return res.status(501).json({
            success : false,
            message: err.message
        })
    }
}