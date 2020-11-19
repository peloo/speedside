const cronJobService = require('./service/cronJob/cronJobService');

async function main() {
    console.log('[START] main...');
    await cronJobService.runSpeedTest();
}

main()