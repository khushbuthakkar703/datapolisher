
const fs = require('fs');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;

module.exports.TelephoneNumber = async (req, res, next) => {
    try {
        const { userid, tnList } = req.body;
        const data = [];
        await Array.isArray(tnList) && tnList.forEach(element => {
            data.push({
                account_id: userid,
                cli: element.tn,
                cld: element.tn,
                duration: 1,
                connect_time: new Date(),
                disconnect_time: new Date()
            })
        });
        await fs.stat('CdrFile/' + userid + '.csv', async (err, stat) => {
            if (err == null) {
                console.log('File exists');
                var csvWriter = await createCsvWriter({
                    path: "CdrFile/" + userid + '.csv',
                    append: true,
                    header: [
                        { id: 'account_id', title: 'account_id' },
                        { id: 'cli', title: 'cli' },
                        { id: 'cld', title: 'cld' },
                        { id: 'duration', title: 'duration' },
                        { id: 'connect_time', title: 'connect_time' },
                        { id: 'disconnect_time', title: 'disconnect_time' },
                    ]
                });
                await csvWriter.writeRecords(data).then(async () => {
                    return await res.status(200).json({ msg: "Success", Success: true, Status: 200 });
                }, async (err) => {
                    return await res.status(200).json({ msg: "Failed", Success: false, Status: 200 });

                });
            }
            else {
                var csvWriter = await createCsvWriter({
                    path: "CdrFile/" + userid + '.csv',
                    header: [
                        { id: 'account_id', title: 'account_id' },
                        { id: 'cli', title: 'cli' },
                        { id: 'cld', title: 'cld' },
                        { id: 'duration', title: 'duration' },
                        { id: 'connect_time', title: 'connect_time' },
                        { id: 'disconnect_time', title: 'disconnect_time' },

                    ]
                });
                await fs.writeFile("CdrFile/" + userid + '.csv', "", async (err) => {
                    if (err) {
                        return await res.status(200).json({ msg: "Failed", Success: false, Status: 200 });
                    }
                    else {
                        console.log("create success")
                        await csvWriter.writeRecords(data).then(async () => {
                            return await res.status(200).json({ msg: "Success", Success: true, Status: 200 });
                        }, async (err) => {
                            return await res.status(200).json({ msg: "Failed", Success: false, Status: 200 });
                        });
                    }
                });
            }
        });
    } catch (error) {
        return res.status(500).json({ msg: error.message, Status: 500 });
    }
};