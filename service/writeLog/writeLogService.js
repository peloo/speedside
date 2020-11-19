async function whriteDataOnFile(jsonSpeedResult, fileNmae) {
    return new Promise(async (resolve, reject) => {
        try {
            let log = require('simple-node-logger').createSimpleLogger({
                logFilePath: 'log/' + fileNmae,
                timestampFormat: 'YYYY-MM-DD HH:mm:ss.SSS'
            });

            await log.info(jsonSpeedResult);
            resolve(true);
        } catch (error) {
            console.error(error);
            reject(false);
        }
    });
}

module.exports = { whriteDataOnFile };