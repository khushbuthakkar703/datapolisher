const axios = require("axios");
const { response } = require("express");
const { placeOrder, deletefile } = require("../queuegenrate");
module.exports.createfilepath = async (req, res, next) => {
    const { filename } = req.body;
    try {
        var body = {
            "file_name": filename,
            "file_tag": "",
            "file_folder": "",
            "app_name": "",
            "expire_time": "",
            "file_fullsize": "18000000",
            "compression_type": ""
        }
        await axios.post(process.env.SYNIVERSE_API_FILEUPLOAD, body, { headers: { "Authorization": `Bearer ${process.env.SYNIVERSE_API_Token}` } })
            .then(async (response) => {
                console.log("response", response)
                return res.status(200).json({ msg: "Created successful !", Success: true, Status: 200, data: response.data });
            })
            .catch((error) => {
                return res.status(400).json({ msg: error.message, Success: false, Status: 400 });
            });

    } catch (error) {
        return res.status(500).json({ msg: error.message, Success: false, Status: 500 });
    }
};
module.exports.fileuplaodset = async (req, res, next) => {
    const { companyid, file, type, file_uri } = req.body;


    try {
        await axios.post(file_uri, file, { headers: { "Authorization": `Bearer ${process.env.SYNIVERSE_API_Token}`, 'Content-Type': 'application/json', 'int-companyid': companyid } })
            .then(async (response) => {
                return res.status(200).json({ msg: "file upload success !", Success: true, Status: 200, data: response.data });
            })
            .catch((error) => {
                return res.status(400).json({ msg: error.message, Success: false, Status: 400 });
            });

    } catch (error) {
        return res.status(500).json({ msg: error.message, Success: false, Status: 500 });
    }
};
module.exports.createschedules = async (req, res, next) => {
    const { inputFileId, name } = req.body;
    var body = {
        "schedule":
        {
            "jobId": "NIS-Scrub-v3-fs5",
            "name": name,
            "inputFileId": inputFileId,
            "fileRetentionDays": 7,
            "scheduleRetentionDays": 7,
            "outputFileNamingExpression": ".txt",
            "outputFileFolder": "",
            "outputFileTag": " tag",
            "jobRuntimeContext": {}
        }
    }
    try {
        await axios.post(process.env.SYNIVERSE_API_SCHEDULES, body, { headers: { "Authorization": `Bearer ${process.env.SYNIVERSE_API_Token}`, 'Content-Type': 'application/json' } }).then(async (response) => {
            return res.status(200).json({ msg: "Schedule create success !", Success: true, Status: 200, data: response.data });
        }).catch((error) => {
            return res.status(400).json({ msg: error.message, Success: false, Status: 400 });
        });

    } catch (error) {
        return res.status(500).json({ msg: error.message, Success: false, Status: 500 })
    }
}
module.exports.createexecutions = async (req, res, next) => {
    const { fileurl } = req.body;
    try {
        axios.get(fileurl, { headers: { "Authorization": `Bearer ${process.env.SYNIVERSE_API_Token}`, 'Content-Type': 'application/json' } }).then(async (response) => {
            return res.status(200).json({ msg: "Executions create success !", Success: true, Status: 200, data: response.data })
        }).catch((error) => {
            return res.status(400).json({ msg: error.message, Success: false, Status: 400 });
        })
    } catch (error) {
        return res.status(500).json({ msg: error.message, Success: false, Status: 500 })
    }
}
module.exports.downloadcontent = async (req, res, next) => {
    const { fileurl, companyid } = req.body;
    try {

        axios.get(fileurl, { headers: { "Authorization": `Bearer ${process.env.SYNIVERSE_API_Token}`, 'int-companyid': companyid } }).then(async (response) => {
            console.log("89----", response)
            return res.status(200).json({ msg: "download success !", Success: true, Status: 200, data: response.data })
        }).catch((error) => {
            return res.status(400).json({ msg: error.message, Success: false, Status: 400 });
        })
    }
    catch (error) {
        return res.status(500).json({ msg: error.message, Success: false, Status: 500 })
    }
}
module.exports.listallfile = async (req, res, next) => {
    try {
        axios.get(process.env.SYNIVERSE_API_FILEUPLOAD, { headers: { "Authorization": `Bearer ${process.env.SYNIVERSE_API_Token}`, 'Content-Type': 'application/json' } }).then(async (response) => {
            return res.status(200).json({ msg: "file list success !", Success: true, Status: 200, data: response.data })
        }).catch((error) => {
            return res.status(400).json({ msg: error.message, Success: false, Status: 400 })
        })
    }
    catch (error) {
        return res.status(500).json({ msg: error.message, Success: false, Status: 500 })
    }
}
module.exports.deletefile = async (req, res, next) => {
    const { fileid, companyid } = req.body;
    try {
        deletefile({ "fileid": fileid, "companyid": companyid })
            .then((job) => {
                setTimeout(() => {
                    res.json({
                        Success: true,
                        Status: 200,
                        order: job.id,
                        message: "File deleted successs"
                    })
                }, 2000);

            })
            .catch(() => res.json({
                Success: false,
                Status: 400,
                message: "File deleted error"
            }));
        // axios.delete(process.env.SYNIVERSE_API_FILEUPLOAD + "/" + fileid, { headers: { "Authorization": `Bearer ${process.env.SYNIVERSE_API_Token}`, 'Content-Type': 'application/json', 'int-companyid': companyid } }).then(async (response) => {
        //     return res.status(200).json({ msg: "Delete success !", Success: true, Status: 200, data: response.data })
        // }).catch((error) => {
        //     return res.status(400).json({ msg: error.message, Success: false, Status: 400 })
        // })
    }
    catch (error) {
        return res.status(500).json({ msg: error.message, Success: false, Status: 500 })
    }
}
module.exports.fileuploaddetails = async (req, res, next) => {
    try {
        if (req.file) {
            placeOrder({ "file": req.file, "filename": req.body.filename, "companyid": req.body.companyid })
                .then((job) => {
                    setTimeout(() => {
                        res.json({
                            Success: true,
                            Status: 200,
                            order: job.id,
                            message: "File upload successs"
                        })
                    }, 2000);

                })
                .catch(() => res.json({
                    Success: false,
                    Status: 400,
                    message: "File upload error"
                }));
        }
        else {
            res.status(400).json({ msg: 'file not found', Success: false, Status: 400 })

        }
    } catch (error) {
        res.status(400).send("backend errrrrrrr");
        next(error);
    }
}
module.exports.reassignedgenerateupload = async (req, res, next) => {
    const { filedata, uri } = req.body;
    try {
        await axios.put(uri, { data: filedata }, {
            headers: {
                'Content-Type': 'text/csv'
            }
        }).then(async (response) => {
            return res.status(200).json({ msg: "Created successful !", Success: true, Status: 200, data: response.data });
        }).catch((error) => {
            return res.status(400).json({ msg: error.message, Success: false, Status: 400 });
        });

    } catch (error) {
        return res.status(500).json({ msg: error.message, Success: false, Status: 500 });
    }
};