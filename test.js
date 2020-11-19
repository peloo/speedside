const speedTestService = require('./service/speedTest/speedTestService');

async function main() {
    console.log('[START] main...');
    let test = await speedTestService.runSpeedTest();

    console.log(test);
    console.log('download speed: ' + (test.download.bandwidth * 0.000008));
    console.log('upload speed: ' + (test.upload.bandwidth * 0.000008));
}

main()