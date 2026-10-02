/* eslint-disable */

const path = require('node:path');
const { exec } = require('node:child_process');
const fs = require('fs-extra');


const buildPackage = (tsconfig = 'tsconfig.json') =>
  new Promise((resolve, reject) => {
    // Build the project
    const process = exec(`npx tsc -p ${tsconfig}`);

    process.stdout.on('data', data => {
      console.log(Buffer.from(data).toString());
    });

    // The result is decided by the exit code, stderr may contain just warnings
    process.stderr.on('data', data => {
      console.error(`stderr ${data}`);
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

/**
 * Every module of the package: `Button/ButtonContainer` for every file
 * and `Button` for the folders with the index file
 */
const collectModules = (dir, base = '') =>
  fs.readdirSync(dir, { withFileTypes: true }).flatMap(entry => {
    const relative = base ? `${base}/${entry.name}` : entry.name;
    if (entry.isDirectory()) {
      return entry.name === 'esm' && !base ? [] : collectModules(path.resolve(dir, entry.name), relative);
    }

    return entry.name.endsWith('.js') ? [relative.replace(/\.js$/, '')] : [];
  });

/**
 * The «exports» map: the same import paths as before (`@via-profit/ui-kit/Button`,
 * `@via-profit/ui-kit/Button/ButtonContainer`), the ES modules for `import`, CommonJS for `require`
 */
const createExports = buildPath => {
  const exportsMap = {};
  collectModules(buildPath)
    .sort()
    .forEach(modulePath => {
      const target = {
        types: `./${modulePath}.d.ts`,
        import: `./esm/${modulePath}.js`,
        require: `./${modulePath}.js`,
      };
      exportsMap[modulePath === 'index' ? '.' : `./${modulePath}`] = target;
      if (modulePath.endsWith('/index')) {
        exportsMap[`./${modulePath.replace(/\/index$/, '')}`] = target;
      }
    });
  exportsMap['./package.json'] = './package.json';

  return exportsMap;
};

const build = async () => {
  const packagePath = path.resolve(__dirname, '..');
  const buildPath = path.resolve(packagePath, './dist');

  // The files of the removed modules from the previous builds must not get into the package
  fs.removeSync(buildPath);

  process.stdout.write('\nBuild CommonJS...');
  await buildPackage('tsconfig.json');
  process.stdout.write('\r\x1b[K');
  process.stdout.write('Build CommonJS...Done');

  process.stdout.write('\nBuild ES modules...');
  await buildPackage('tsconfig.esm.json');
  process.stdout.write('\r\x1b[K');
  process.stdout.write('Build ES modules...Done');

  process.stdout.write('\nCopy files...');
  ['README.md', 'CHANGELOG.md', 'LICENSE'].forEach(filename => {
    fs.copyFileSync(path.resolve(packagePath, filename), path.resolve(buildPath, filename));
  });

  // The published package.json: the entry points and the exports map of the build
  const { scripts, devDependencies, ...packageJson } = fs.readJsonSync(
    path.resolve(packagePath, 'package.json'),
  );
  fs.writeJsonSync(
    path.resolve(buildPath, 'package.json'),
    {
      ...packageJson,
      main: './index.js',
      module: './esm/index.js',
      types: './index.d.ts',
      // No module of the kit does anything on import: the bundlers may drop the unused ones
      sideEffects: false,
      exports: createExports(buildPath),
    },
    { spaces: 2 },
  );
  process.stdout.write('\r\x1b[K');
  process.stdout.write('Copy files...Done');
  process.stdout.write('\n\nComplete\n\n');
};

// Fail the process, otherwise a broken build could be published
build().catch(err => {
  console.error('\nBuild failed:', err);
  process.exit(1);
});
