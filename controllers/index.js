const URL = require('../models/url');
const shortid = require('shortid');


exports.generateShortUrl = async (req, res) => {
    try {
        const { url } = req.body;
        if (!url) {
            return res.status(401).json({
                success: false,
                message: "field is required"
            })
        }
        const shortId = shortid();
        const data = await URL.create({ shortId, redirectUrl: url, visitHistory: [] });

        return res.status(201).json({
            success: true,
            message: "Your url id created",
            id: shortId,
        })
    } catch (err) {
        console.log('error occurred while generate url id', err);
        return res.status(501).json({
            success: false,
            message: err.message
        })
    }
}

exports.redirectUrlId = async (req, res) => {
    try {
        const shortId = req.params.shortId
        // console.log('shortId : ', shortId);

        const entry = await URL.findOneAndUpdate(
            { shortId },
            {
                $push: {
                    visitHistory: { timestamp: Date.now() }
                }
            }
        );

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

        const data = await URL.findOne({shortId}, {visitHistory : true}).exec();
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