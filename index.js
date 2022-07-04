const taskName = process.argv[2];
if (!taskName) {
  throw new Error(`empty taskName`);
}
const { cosmiconfig } = require('cosmiconfig');
const explorer = cosmiconfig('nodemon');
const path = require('path');
explorer
  .search(path.join(__dirname, `./tasks/${taskName}`))
  .then((result) => {
    console.log('success', result);
    const nodemon = require('nodemon');
    nodemon({
      ...result.config
    });

    nodemon
      .on('start', function () {
        console.log('App has started');
      })
      .on('quit', function () {
        console.log('App has quit');
        process.exit();
      })
      .on('restart', function (files) {
        console.log('App restarted due to: ', files);
      });
  })
  .catch((error) => {
    console.error('error', error);
  });
