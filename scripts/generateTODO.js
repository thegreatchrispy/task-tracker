// scripts/generateTODO.js

const fs = require("fs");
const path = require("path");

const foldersToScan = ["src", "tests"];
const todoFile = "TODO.md";

// Helper: recursively get all JS files in a folder
function getJsFiles(dir) {
    let files = [];
    const items = fs.readdirSync(dir, { withFileTypes: true });
    for (const item of items) {
        const fullPath = path.join(dir, item.name);
        if (item.isDirectory()) {
            files = files.concat(getJsFiles(fullPath));
        } else if (item.isFile() && fullPath.endsWith(".js")) {
            files.push(fullPath);
        }
    }
    return files;
}

// Clear previous TODO.md content
fs.writeFileSync(todoFile, "# TODOs\n\n");

// Scan files for TODO comments
foldersToScan.forEach(folder => {
    const jsFiles = getJsFiles(folder);
    jsFiles.forEach(file => {
        const lines = fs.readFileSync(file, "utf-8").split("\n");
        lines.forEach((line, index) => {
            if (line.includes("// TODO")) {
                fs.appendFileSync(todoFile, `- ${file}:${index + 1} - ${line.trim()}\n`);
            }
        });
    });
});

console.log(`TODO.md generated successfully.`);