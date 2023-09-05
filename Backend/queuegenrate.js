const Queue = require('bee-queue');
const options = {
    isWorker: false,
    sendEvents: false,
    redis: {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        password: process.env.DB_PASS,
    },
}
const cookQueue = new Queue('cook', options);
const placeOrder = (order) => {
    return cookQueue.createJob(order).save();
};


const deletefileQueue = new Queue('deletefile', options);
const deletefile = (file) => {
    return deletefileQueue.createJob(file).save();

}
cookQueue.on("succeeded", (job) => {
    console.log(` ready to be served 😋`);
});
const getOrderStatus = (orderId) => {
    return cookQueue.getJob(orderId).then((job) => {
        return {
            progress: job.progress,
            status: job.status,
            order: job.data
        };
    });
}

module.exports = {
    placeOrder: placeOrder,
    getStatus: getOrderStatus,
    deletefile: deletefile
};
