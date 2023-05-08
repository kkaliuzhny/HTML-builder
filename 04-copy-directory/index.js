const path = require('path');
const  fs = require('fs');
const fp = require("fs/promises");


const mypath = path.join(__dirname,"files");
const copyPath=path.join(__dirname,"files-copy");

async function foo(src,dest) {
    const entries = await fp.readdir(src, {withFileTypes: true});
    await fp.mkdir(dest,{ recursive: true });
    for(let entry of entries) {
        const srcPath = path.join(src, entry.name);
        const destPath = path.join(dest, entry.name);
        if(entry.isDirectory()) {
            await foo(srcPath, destPath);
        } else {
            await fp.copyFile(srcPath, destPath);
        }
    }
}
foo(mypath,copyPath);