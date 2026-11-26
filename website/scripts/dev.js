const { fork } = require('node:child_process');
const path = require('node:path');
const { once } = require('node:events');
const webpack = require('webpack');
const config = require('../webpack/webpack.config');

let server;
let restart = Promise.resolve();
let closing = false;
const entry = path.resolve(__dirname, '../build/server.cjs');

const stopServer = async () => {
  if (server?.exitCode === null && server.signalCode === null) {
    const exited = once(server, 'exit');
    server.kill();
    await exited;
  }
};

const watcher = webpack(config).watch({}, (error, stats) => {
  if (error) {
    console.error(error);
    return;
  }

  console.log(stats.toString({ preset: 'errors-warnings' }));
  if (!stats.hasErrors()) {
    restart = restart.then(async () => {
      await stopServer();
      if (!closing) {
        server = fork(entry);
      }
    });
  }
});

const close = async () => {
  closing = true;
  watcher.close(() => {});
  await restart;
  await stopServer();
};

process.once('SIGINT', close);
process.once('SIGTERM', close);
