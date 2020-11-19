const speedTest = require('speedtest-net');

async function runSpeedTest() {
    return new Promise(async (resolve, reject) => {
        try {
            const options = {
                acceptGdpr: true,
                acceptLicense: true,
                serverId: "6901"
            }
            resolve(await speedTest(options));
        } catch (error) {
            console.error(error);
            reject(false);
        }
    })
}

module.exports = { runSpeedTest };