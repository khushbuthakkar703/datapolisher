const multer = require('multer')

const upload = multer({

    fileFilter: (req, file, callback) => {
        // if (
        //     file.mimetype == "image/jpeg" ||
        //     file.mimetype == "image/png"
        // ) {
        callback(null, true)
        // }
        // else {
        //     console.log("only jpg and png supported");
        //     callback(null, false)
        // }
    }
})

module.exports = upload;