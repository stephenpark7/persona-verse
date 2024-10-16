// Tool for scaffolding a new module in a package

import { argv, exit } from 'process';
import { promises as fs } from 'fs';

const args = argv.slice(2);

if (args.length < 2) {
  console.error(
    '[ERROR] Failed to run the generate-module script.\nPlease provide a package name and a module name.',
  );
  exit(1);
}

const packageName = args[0];
const directoryName = args[1];
const moduleName = args.slice(2);

const basePath = `../${packageName}`;

console.log(`Generating module: ${moduleName} in package: ${packageName}`);

// Create a directory for the module if it doesn't exist
const dirPath = `${basePath}/src/${directoryName}`;
fs.mkdir(dirPath, { recursive: true });

// Create a file for the module (.ts/.tsx)
const filePath = `${basePath}/src/${directoryName}/${moduleName}.ts`;
fs.writeFile(filePath, '')
  .then(() => console.log(`File created successfully at ${filePath}`))
  .catch((err) => console.error('Error creating file:', err));

// Create a index file that exports that module (barrel file)
const indexFilePath = `${basePath}/src/${directoryName}/index.ts`;
const indexFileContent = `export * from './${moduleName}';`;
fs.writeFile(indexFilePath, indexFileContent)
  .then(() => {
    console.log(`Index file created successfully at ${indexFilePath}`);
  })
  .catch((err) => console.error('Error creating index file:', err));

// TODO: If there are parent directories, those should import the index file

// Create a spec file for the module
const specFilePath = `${basePath}/src/${directoryName}/${moduleName}.spec.ts`;
fs.writeFile(specFilePath, '')
  .then(() => {
    console.log(`Spec file created successfully at ${specFilePath}`);
  })
  .catch((err) => {
    console.error('Error creating spec file:', err);
  });
