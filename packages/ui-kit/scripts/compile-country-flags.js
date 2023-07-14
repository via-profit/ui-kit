/* eslint-disable */

const fs = require('node:fs');
const path = require('node:path');
const { ESLint } = require('eslint');

const transform = (sourceContent, componentName) => {
  const template = `
import * as React from 'react';

const ${componentName}: React.ForwardRefRenderFunction<SVGSVGElement, React.SVGProps<SVGSVGElement>> = (
  props,
  ref,
) => (
  ${sourceContent
      // inject ref and the props  
      .replace(/\<svg(.*?)\>/gm, '<svg$1 width="1.5em" height="1em" {...props} ref={ref}>')
      // camelcase
      .replace(/(?<=\s{0,})([a-z-A-Z]+)(?==)/gmi, matches => matches.replace(/-./g, x => x[1].toUpperCase()))
      // class -> className
      .replace(/(class)=\"(.*?)\"/gmi, 'className="$2"')
      // styles
      .replace(/\<style\>(.*?)\<\/style\>/, '<style>{"$1"}</style>')
    }
);

export default React.forwardRef(${componentName});
    
`;

  return template;
}

const compileSync = (sourceFile, destinationFile) => {
  const sourceContent = fs.readFileSync(sourceFile, { encoding: 'utf8' });
  const componentName = path.basename(sourceFile).split('.')[0].replace(/[^a-zA-Z]+/, '').toUpperCase();
  const outputContent = transform(sourceContent, componentName);

  const outputDir = path.dirname(destinationFile);
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  fs.writeFileSync(destinationFile, outputContent, { encoding: 'utf8' })
}

const lint = async (files) => {
  const eslint = new ESLint({ fix: true });
  const results = await eslint.lintFiles(files);

  await ESLint.outputFixes(results);
}

const bootstrap = async () => {
  const svgPath = path.resolve('./assets/country-flags-3x2');
  const outPath = path.resolve('./src/CountryFlags');
  const files = fs.readdirSync(svgPath);

  files.forEach((countryCode) => {
    const componentName = countryCode.split('.')[0].replace(/[^a-zA-Z]+/, '').toUpperCase();
    const sourceFilename = path.resolve(svgPath, countryCode);
    const outFilename = path.resolve(outPath, `${componentName}.tsx`);

    compileSync(
      path.resolve(sourceFilename),
      path.resolve(outFilename),
    );
  });

  await lint(['./src/CountryFlags/*.tsx']);

}

bootstrap();
