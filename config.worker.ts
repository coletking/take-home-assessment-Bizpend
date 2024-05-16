const fs = require('fs-extra');
const argv = process.argv;
const prod = argv.indexOf('-p') >= 0;
const sourcePath = `./src/config/config.${prod ? 'prod' : 'staging'}.ts`;
const destPath = `./src/config/main.config.ts`;
const content = fs.readFileSync(sourcePath).toString();
fs.writeFileSync(destPath, content);