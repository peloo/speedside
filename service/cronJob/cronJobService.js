const cronJob = require('cron').CronJob;
const converter = require('../util/converter');
const writeLogService = require('../writeLog/writeLogService');
const speedTestServie = require('../speedTest/speedTestService');

async function runSpeedTest() {
    // var job = new cronJob('0 0 */1 * * *', async function () {
    var job = new cronJob('*/20 * * * * *', async function() {
        console.log('[START] speedtest-script...');

        let nameFile = getNameFile();
        console.log(nameFile);
        let jsonSpeedtest = await speedTestServie.runSpeedTest();

        if (jsonSpeedtest != false) {
            if (!await writeLogService.whriteDataOnFile(composeSpeedTestInfos(jsonSpeedtest), nameFile)) {
                console.log('[ERROR] impossibile to whrite data on file...');
            }

        } else {
            console.log('[ERROR] speedtest not work correctly...');
        }
    });
    job.start();
}

function getNameFile() {
    let date = new Date();
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();

    if (month < 10) {
        month = '0' + month;
    }

    if (day < 10) {
        day = '0' + day;
    }

    return year + '-' + month + '-' + day + '_speedtest.log';
}

function composeSpeedTestInfos(jsonSpeedtest) {
    return jsonSpeedResult = {
        downloadSpeed: converter.convertByteToMbps(jsonSpeedtest.download.bandwidth),
        uploadSpeed: converter.convertByteToMbps(jsonSpeedtest.upload.bandwidth),
        ping: jsonSpeedtest.ping,
        isp: jsonSpeedtest.isp,
        serverName: jsonSpeedtest.server.name,
        serverLocation: jsonSpeedtest.server.location,
        dateTime: jsonSpeedtest.timestamp
    }
}

module.exports = { runSpeedTest };