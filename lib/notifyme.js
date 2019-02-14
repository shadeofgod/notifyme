const program = require('commander');
const notifier = require('node-notifier');
const ora = require('ora');

const { version, description } = require('../package.json');
const { isNumericInt } = require('./utils');

program.version(version).description(description);

program
  .command('in [sec]')
  .description('will notify you after given seconds, for example:\n\n`notifyme in 3` will notify you in 3 seconds with default title and message')
  .option('-t, --title [title]', 'set notification title')
  .option('-m, --message [message]', 'set notification message')
  .action(function(sec, options) {
    if (!isNumericInt(sec)) {
      console.log('given seconds should be a number!');
      return;
    }
    let seconds = parseInt(sec);
    const { message = 'Hey there!', title = 'Notify Me!' } = options;
    const spinner = ora(`will notify in ${seconds} seconds`).start();

    setTimeout(() => {
      spinner.clear();
      notifier.notify({ title, message, wait: true });
      process.exit(0);
    }, seconds * 1000);

    setInterval(() => {
      spinner.text = `will notify in ${--seconds} seconds`;
    }, 1000);
  });

program.parse(process.argv);
