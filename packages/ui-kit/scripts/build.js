/* eslint-disable */

const fs = require('node:fs');
const path = require('node:path');
const { exec } = require('node:child_process');

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

  const files = ['README.md', 'CHANGELOG.md', 'LICENSE', 'package.json'];

  await buildPackage().catch(err => console.error(err));

  files.forEach(filename => {
    fs.copyFileSync(path.resolve(packagePath, filename), path.resolve(buildPath, filename));
  });
};

build();
