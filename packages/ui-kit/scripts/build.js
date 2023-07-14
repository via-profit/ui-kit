/* eslint-disable */

const path = require('node:path');
const { exec } = require('node:child_process');
const fs = require('fs-extra');


const buildCountryFlags = async () => new Promise((resolve, reject) => {
  // Build the project
  const process = exec('node ./scripts/compile-country-flags.js');

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
  // const typesPath = path.resolve(packagePath, './@types');

  process.stdout.write('\nBuild country flags...');
  await buildCountryFlags().catch(err => console.error(err));
  process.stdout.write("\r\x1b[K");
  process.stdout.write('Build country flags...Done');

  process.stdout.write('\nBuild package...');
  await buildPackage().catch(err => console.error(err));
  process.stdout.write("\r\x1b[K");
  process.stdout.write('Build package...Done');



  process.stdout.write('\nCopy files...');
  ['README.md', 'CHANGELOG.md', 'LICENSE', 'package.json'].forEach(filename => {
    fs.copyFileSync(path.resolve(packagePath, filename), path.resolve(buildPath, filename));
  });
  process.stdout.write("\r\x1b[K");
  process.stdout.write('Copy files...Done');
  process.stdout.write('\n\nComplete\n\n');


  // fs.copySync(typesPath, buildPath, {
  //   overwrite: true,
  //   filter: src => {
  //     return path.basename(src) !== 'emotion.d.ts';
  //   },
  // });
};

build();
