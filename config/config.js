

const fs = require('fs');

const env = process.env.NODE_ENV || 'development';
let config;
try {
  if (fs.existsSync('./config/config.json')) {
    config = require('./config.json'); // eslint-disable-line global-require
    if (env in config) {
      config = config[env];
    } else {
      console.error(`Can not find the env ${env} in /config/config.json`);
      process.exit(1);
    }
  } else {
    console.error('Missing config.json file. Please create own config/config.json file');
    process.exit(1);
  }
} catch (err) {
  console.error(err);
}

module.exports = config;
