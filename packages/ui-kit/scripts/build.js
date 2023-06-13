/* eslint-disable */

const path = require('node:path');
const { exec } = require('node:child_process');
const fs = require('fs-extra');

const buildPackage = () =>
  new Promise((resolve, reject) => {
    // Build the project
    const process = exec('npx tsc');

    process.stdout.on('data', data => {
      console.log(Buffer.from(data).toString());
    });

    process.stderr.on('data', data => {
      console.error(`stdout ${data}`);
      reject(data);
    });

    process.on('close', code => {
      if (code === 0) {
        resolve(0);

        return;
      }

      console.error(`child process exited with code ${code}`);
      reject(`child process exited with code ${code}`);
    });
  });

const build = async () => {
  const packagePath = path.resolve(__dirname, '..');
  const buildPath = path.resolve(packagePath, './dist');
  const typesPath = path.resolve(packagePath, './@types');

  await buildPackage().catch(err => console.error(err));

  ['README.md', 'CHANGELOG.md', 'LICENSE', 'package.json'].forEach(filename => {
    fs.copyFileSync(path.resolve(packagePath, filename), path.resolve(buildPath, filename));
  });

  fs.copySync(typesPath, buildPath, {
    overwrite: true,
    filter: src => {
      return path.basename(src) !== 'emotion.d.ts';
    },
  });
};

build();
