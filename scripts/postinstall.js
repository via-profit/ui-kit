const path = require("node:path");
const fs = require("node:fs");
const { workspaces } = require("../package.json");

/**
 * Copy «.env» files
 */
workspaces.forEach((workspaceName) => {
  const sourceConfig = path.resolve(
    __dirname,
    "..",
    workspaceName,
    ".env.example"
  );
  const destinationConfig = path.resolve(
    __dirname,
    "..",
    workspaceName,
    ".env"
  );

  if (fs.existsSync(sourceConfig) && !fs.existsSync(destinationConfig)) {
    fs.copyFileSync(sourceConfig, destinationConfig);
  }
});

/**
 * Copy «.vscode/launch.json» file
 */
const sourceConfig = path.resolve(
  __dirname,
  "..",
  ".vscode",
  "launch.example.json"
);
const destinationConfig = path.resolve(
  __dirname,
  "..",
  ".vscode",
  "launch.json"
);

if (fs.existsSync(sourceConfig) && !fs.existsSync(destinationConfig)) {
  fs.copyFileSync(sourceConfig, destinationConfig);
}
