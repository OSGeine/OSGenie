import * as cron from 'node-cron';

cron.schedule('5 * * * *', () => {
  console.log('running a task every 5 seconds');
});