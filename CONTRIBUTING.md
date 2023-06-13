# UI kit

## Publishing in NPM

1. Bump the package version
2. Build the package
3. Go to `packages/ui-kit/dist` directory and run publish command


All in once without bumping:

```bash
$ npm run build && cd ./packages/ui-kit/dist && npm publish && cd ../../..
```
