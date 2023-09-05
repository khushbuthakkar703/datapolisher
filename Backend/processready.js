const Queue = require('bee-queue');
const options = {
    redis: {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        password: process.env.DB_PASS,
    },
}
const axios = require("axios");
const cookQueue = new Queue('cook', options);
cookQueue.process(3, async (job, done) => {
    var body = {
        "file_name": job.data.filename,
        "file_tag": "",
        "file_folder": "",
        "app_name": "",
        "expire_time": "",
        "file_fullsize": "18000000",
        "compression_type": ""
    }
    await axios.post(process.env.SYNIVERSE_API_FILEUPLOAD, body, { headers: { "Authorization": `Bearer ${process.env.SYNIVERSE_API_Token}` } })
        .then(async (response) => {
            if (response.status == 201) {
                await axios.post(response.data.file_uri, job.data.file, { headers: { "Authorization": `Bearer ${process.env.SYNIVERSE_API_Token}`, 'Content-Type': 'application/json', 'int-companyid': response.data['company-id'] } })
                    .then(async (response) => {
                        job.reportProgress(100);
                        done();
                    })
                    .catch((error) => {
                        job.reportProgress(100);
                        done();
                    });
            }
            else {
                job.reportProgress(100);
                done();
            }
            // return res.status(200).json({ msg: "Created successful !", Success: true, Status: 200, data: response.data });
        })
        .catch((error) => {
            return res.status(400).json({ msg: error.message, Success: false, Status: 400 });
        });
});

const deletefileQueue = new Queue('deletefile', options);
deletefileQueue.process(3, async (job, done) => {
    await axios.delete(process.env.SYNIVERSE_API_FILEUPLOAD + "/" + job.data.fileid, { headers: { "Authorization": `Bearer ${process.env.SYNIVERSE_API_Token}`, 'Content-Type': 'application/json', 'int-companyid': job.data.companyid } }).then(async (response) => {
        job.reportProgress(100);
        done();
    }).catch((error) => {
        job.reportProgress(100);
        done();
    })
});