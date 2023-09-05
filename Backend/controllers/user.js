const User = require("../model/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const saltRounds = 10;
const nodemailer = require("nodemailer");
const Email = require('email-templates');
const { isValidObjectId } = require("mongoose");
const generateApiKey = require('generate-api-key');

module.exports.login = async (req, res, next) => {
    const { name, password } = req.body;
    try {
        if (!name || !password)
            return res.status(400).json({ msg: "Please fill the all feild", Status: 400, Success: false });
        const user = await User.findOne({ name });
        if (!user) return res.status(400).json({ msg: "Username and password invalid !", Status: 400, Success: false });
        const ismatch = await bcrypt.compare(password, user.password);
        if (!ismatch) return res.status(400).json({ msg: "Username and password invalid !" });
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
        res.status(200).json({
            token,
            user: {
                id: user._id,
                email: user.email,
                name: user.name
            },
            Status: 200,
            Success: true,
            msg: "Login Successfully",
        });

    } catch (error) {
        return res.status(500).json({ msg: error.message, Status: 500 });
    }
};
module.exports.register = async (req, res, next) => {
    try {
        const { email, name, password, usertype, confirmpassword } = req.body;
        if (!email || !password || !name || !usertype || !confirmpassword)
            return res.status(400).json({ msg: "Please fill the all feild", Status: 400, Success: false });
        var paswd = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{7,15}$/;
        if (!password.match(paswd)) {
            return res.status(400).json({ msg: "Please enter strong password !", Status: 400, Success: false });
        }
        if (password != confirmpassword) {
            return res.status(400).json({ msg: "Password and Confirm password don't match !", Status: 400, Success: false });
        }
        const existingUsername = await User.findOne({ name });
        if (existingUsername)
            return res
                .status(400)
                .json({ msg: "This User name already exist", Status: 400, Success: false });
        const existingUser = await User.findOne({ email });
        if (existingUser)
            return res
                .status(400)
                .json({ msg: "This email address already exist", Status: 400, Success: false });
        const salt = await bcrypt.genSalt(saltRounds);
        const passwordHash = await bcrypt.hash(password, salt);
        const newUser = new User({
            email,
            password: passwordHash,
            name,
            usertype,
            apikey: generateApiKey({ method: 'string', min: 20, max: 30 })
        });
        const response = await newUser.save();
        res
            .status(200)
            .json({ msg: "User add Successful !", Status: 200, Success: true, data: response });
    }
    catch (error) {
        return res.status(500).json({ msg: error.message, Status: 500 });
    }

};
module.exports.forgotpasswordmail = async (req, res, next) => {
    const { email } = req.body;
    const existingUsername = await User.findOne({ email });
    if (existingUsername) {
        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'maheshmaniya000@gmail.com',
                pass: 'Mahesh@000'
            }
        });
        var randomChars = '123456789011121314151617181920122232425';
        var result = '';
        for (var i = 0; i < 6; i++) {
            result += randomChars.charAt(Math.floor(Math.random() * randomChars.length));
        }
        const emailset = new Email({
            transport: transporter,
            send: true,
            preview: false,
        });
        emailset.send({
            template: 'hello',
            message: {
                from: 'maheshmaniya000@gmail.com',
                to: 'maheshmaniya000@gmail.com',
            },
            locals: {
                fname: existingUsername.name,
                link: "http://localhost:4200/",
                Code: result
            }
        }).then(async () => {
            const set = await User.findByIdAndUpdate(existingUsername._id.toString(), { authcode: result.toString(), updated_date: new Date(), authcodeexp: new Date() }, {
                new: true,
            });
            await res.status(200).json({ msg: "Please check your mail sent authentication code !", Success: true, Status: 200 });
        }, err => {
            res.status(500).json({ msg: "Email not  sent successfully", Success: false, Status: 500 });

        });
    }
    else {
        res.status(404).json({ msg: "User not found", Status: 400 });
    }

}
module.exports.getuser = async (req, res, next) => {
    const { email } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ msg: "User not found", Status: 400, Success: false });
        res.status(200).json({
            user: user,
            Status: 200,
            Success: true,
            msg: "User found",
        });

    } catch (error) {
        return res.status(500).json({ msg: error.message, Status: 500 });
    }
};
module.exports.confirmcode = async (req, res, next) => {
    const { email, password, confirmpassword, code } = req.body;
    try {
        var paswd = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{7,15}$/;
        if (!password.match(paswd)) {
            return res.status(400).json({ msg: "Please enter strong password !", Status: 400, Success: false });
        }
        if (password != confirmpassword) {
            return res.status(400).json({ msg: "Password and Confirm password don't match !", Status: 400, Success: false });
        }
        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ msg: "Invalid User", Status: 404, Success: false });
        if (user.authcode && user.authcodeexp) {
            var date1 = new Date(user.authcodeexp);
            var date2 = new Date();
            var diffMs = (date2 - date1);
            var diffMins = Math.round(((diffMs % 86400000) % 3600000) / 60000);
            if (diffMins <= 30) {
                if (user.authcode.toString() == code.toString()) {

                    const set = await User.findByIdAndUpdate(user._id.toString(), { password: password, authcode: "", updated_date: new Date(), authcodeexp: "" }, {
                        new: true,
                    });
                    await res.status(200).json({
                        Status: 200,
                        Success: true,
                        msg: "Forgot password successful !",
                    });
                }
                else {
                    res.status(400).json({
                        Status: 400,
                        Success: false,
                        msg: "Your authentication code is Invalid",
                    });
                }
            }
            else {
                res.status(400).json({
                    Status: 400,
                    Success: false,
                    msg: "Your authentication code is exprice",
                });
            }
        }
        else {
            res.status(404).json({
                Status: 404,
                Success: false,
                msg: "Invalid user",
            });
        }
    } catch (error) {
        return res.status(500).json({ msg: error.message, Success: false, Status: 500 });
    }
};
module.exports.forgotUsernamemail = async (req, res, next) => {
    const { email } = req.body;
    const existingUsername = await User.findOne({ email });
    if (existingUsername) {
        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'maheshmaniya000@gmail.com',
                pass: 'Mahesh@000'
            }
        });
        var randomChars = '123456789011121314151617181920122232425';
        var result = '';


        for (var i = 0; i < 6; i++) {
            result += randomChars.charAt(Math.floor(Math.random() * randomChars.length));
        }
        const emailset = new Email({
            transport: transporter,
            send: true,
            preview: false,
        });
        emailset.send({
            template: 'hello',
            message: {
                from: 'maheshmaniya000@gmail.com',
                to: 'maheshmaniya000@gmail.com',
            },
            locals: {
                fname: existingUsername.name,
                link: "http://localhost:4200/",
                Code: result
            }
        }).then(async () => {
            const set = await User.findByIdAndUpdate(existingUsername._id.toString(), { authusercode: result.toString(), updated_date: new Date(), authusercodeexp: new Date() }, {
                new: true,
            });
            await res.status(200).json({ msg: "Please check your mail sent authentication code !", Success: true, Status: 200 });
        }, err => {
            res.status(500).json({ msg: "Email not  sent successfully", Status: 500 });

        });
    }
    else {
        res.status(404).json({ msg: "User not found", Status: 400 });
    }
}
module.exports.confirmusercode = async (req, res, next) => {
    const { email, name, code } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ msg: "Invalid User", Status: 404, Success: false });
        if (user.authusercode && user.authusercodeexp) {
            var date1 = new Date(user.authusercodeexp);
            var date2 = new Date();
            var diffMs = (date2 - date1);
            var diffMins = Math.round(((diffMs % 86400000) % 3600000) / 60000);
            if (diffMins <= 30) {
                if (user.authusercode.toString() == code.toString()) {
                    const alredy_username = await User.findOne({ name });

                    if (alredy_username && alredy_username.email != email) {
                        res.status(400).json({
                            Status: 400,
                            Success: false,
                            msg: "Please try another username!",
                        });
                    }
                    else {
                        const set = await User.findByIdAndUpdate(user._id.toString(), { name: name, authusercode: "", updated_date: new Date(), authusercodeexp: "" }, {
                            new: true,
                        });
                        await res.status(200).json({
                            Status: 200,
                            Success: true,
                            msg: "Forgot username successful !",
                        });
                    }
                }
                else {
                    res.status(400).json({
                        Status: 400,
                        Success: false,
                        msg: "Your authentication code is Invalid",
                    });
                }
            }
            else {
                res.status(400).json({
                    Status: 400,
                    Success: false,
                    msg: "Your authentication code is exprice",
                });
            }
        }
        else {
            res.status(400).json({
                Status: 400,
                Success: false,
                msg: "Invalid user",
            });
        }
    } catch (error) {
        return res.status(500).json({ msg: error.message, Success: false, Status: 500 });
    }
};
module.exports.changepassword = async (req, res, next) => {
    const { id, currentpassword, Newpassword, confirmpassword } = req.body;
    try {
        if (!currentpassword || !Newpassword || !confirmpassword)
            return res.status(400).json({ msg: "Please fill the all feild", Status: 400, Success: false });
        var paswd = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{7,15}$/;
        if (!Newpassword.match(paswd)) {
            return res.status(400).json({ msg: "Please enter strong password !", Status: 400, Success: false });
        }
        if (Newpassword != confirmpassword) {
            return res.status(400).json({ msg: "New Password and Confirm New Password don't match !", Status: 400, Success: false });
        }
        const existingUsername = await User.findOne({ id });
        const ismatch = await bcrypt.compare(currentpassword, existingUsername.password);
        if (!ismatch) return res.status(400).json({ msg: "Your current password invalid !", Status: 400 });
        if (existingUsername) {
            const salt = await bcrypt.genSalt(saltRounds);
            const passwordHash = await bcrypt.hash(Newpassword, salt);
            const set = await User.findByIdAndUpdate(existingUsername._id.toString(), { updated_date: new Date(), password: passwordHash, apikey: generateApiKey({ method: 'string', min: 20, max: 30 }) }, {
                new: true,
            });
            await res.status(200).json({ msg: "Change password successful!", Success: true, Status: 200 });
        }
        else {
            res.status(404).json({ msg: "User not found", Status: 400 });
        }
    } catch (error) {
        return res.status(500).json({ msg: error.message, Success: false, Status: 500 });
    }
};

