const axios = require("axios");
var qs = require('qs');
var querystring = require('querystring');
module.exports.NeonToken = async (req, res, next) => {
    const { code, redirect_url } = req.body;
    try {
        if (!code || !redirect_url)
            return res.status(400).json({ msg: "Please fill the all feild", Status: 400, Success: false });
        var data = {
            "code": code,
            "redirect_url": redirect_url,
            "grant_type": "authorization_code",
            'client_id': process.env.NEON_CLIENT_ID,
            'client_secret': process.env.NEON_CLIENT_SECRET,
        }
        axios.post(`${process.env.NEON_API_URL}token`, data)
            .then(async (response) => {
                return res.status(200).json(response.data);
            })
            .catch((error) => {
                return res.status(error.response.status).json({ msg: error.message, Success: false, Status: error.response.status });
            });

    } catch (error) {
        return res.status(500).json({ msg: error.message, Status: 500 });
    }
};
module.exports.NeonRefreshToken = async (req, res, next) => {
    const { refresh_token } = req.body;
    try {
        if (!refresh_token)
            return res.status(400).json({ msg: "Please fill the all feild", Status: 400, Success: false });


        axios.post(`${process.env.NEON_API_URL}token'`, querystring.stringify({
            'grant_type': 'refresh_token',
            'client_id': process.env.NEON_CLIENT_ID,
            'client_secret': process.env.NEON_CLIENT_SECRET,
            'refresh_token': refresh_token
        }), {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            }
        })
            .then(async (response) => {
                return res.status(200).json(response.data);
            })
            .catch((error) => {
                console.log("error", error)
                return res.status(500).json({ msg: error, Success: false, Status: 500 });
            });

    } catch (error) {
        return res.status(500).json({ msg: error.message, Status: 500 });
    }
};

module.exports.GetAllAccount = async (req, res, next) => {
    const { url, token } = req.body;
    try {
        if (!url || !token)
            return res.status(400).json({ msg: "Please fill the all feild", Status: 400, Success: false });
        axios.get(url, { headers: { "Authorization": `Bearer ${token}` } })
            .then(async (response) => {
                return res.status(200).json({ msg: "Get all account success", Success: true, Status: 200, data: response.data });
            })
            .catch((error) => {
                return res.status(error.response.status).json({ msg: error.message, Success: false, Status: error.response.status });
            });

    } catch (error) {
        return res.status(500).json({ msg: error.message, Status: 500 });
    }
};
module.exports.GetAllInvoice = async (req, res, next) => {
    const { url, token } = req.body;
    try {
        if (!page_number || !url || !token)
            return res.status(400).json({ msg: "Please fill the all feild", Status: 400, Success: false });
        axios.get(url, { headers: { "Authorization": `Bearer ${token}` } })
            .then(async (response) => {
                return res.status(200).json({ msg: "Get all Invoice success", Success: true, Status: 200, data: response.data });
            })
            .catch((error) => {
                return res.status(error.response.status).json({ msg: error.message, Success: false, Status: error.response.status });
            });

    } catch (error) {
        return res.status(500).json({ msg: error.message, Status: 500 });
    }
};

module.exports.GetAllPayment = async (req, res, next) => {
    const { url, token } = req.body;
    try {
        if (!url || !token)
            return res.status(400).json({ msg: "Please fill the all feild", Status: 400, Success: false });
        axios.get(url, { headers: { "Authorization": `Bearer ${token}` } })
            .then(async (response) => {
                return res.status(200).json({ msg: "Get all payment success", Success: true, Status: 200, data: response.data });
            })
            .catch((error) => {
                return res.status(error.response.status).json({ msg: error.message, Success: false, Status: error.response.status });
            });

    } catch (error) {
        return res.status(500).json({ msg: error.message, Status: 500 });
    }
};
module.exports.GetAllSubscription = async (req, res, next) => {
    const { url, token } = req.body;
    try {
        if (!url || !token)
            return res.status(400).json({ msg: "Please fill the all feild", Status: 400, Success: false });
        axios.get(url, { headers: { "Authorization": `Bearer ${token}` } })
            .then(async (response) => {
                return res.status(200).json({ msg: "Get all subscription success", Success: true, Status: 200, data: response.data });
            })
            .catch((error) => {
                return res.status(error.response.status).json({ msg: error.message, Success: false, Status: error.response.status });
            });

    } catch (error) {
        return res.status(500).json({ msg: error.message, Status: 500 });
    }
};
module.exports.GetAllPaymentMethodProfile = async (req, res, next) => {


}