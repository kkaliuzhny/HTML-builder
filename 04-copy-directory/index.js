const path = require('path');
const  fs = require('fs');
const fp = require("fs/promises");


const mypath = path.join(__dirname,"files");
const copyPath=path.join(__dirname,"files-copy");


async function foo1(src) 
{
    await fp.mkdir(copyPath,{ recursive: true });
    const lotdata = await fp.readdir(src, {withFileTypes: true});
    for (let file of lotdata) 
    {
        const initialPath = path.join(src, file.name);
        if(file.isDirectory())
        {
            await foo(initialPath);
           
        }
        else
        {
            await fp.unlink(initialPath);
           
        }
    }
}
foo1(copyPath);
async function foo(src,dest) {
    const lotdata = await fp.readdir(src, {withFileTypes: true});
   

    await fp.mkdir(dest,{ recursive: true });
    for(let data of lotdata) {
        const initialPath = path.join(src, data.name);
        const destPath = path.join(dest, data.name);
        if(data.isDirectory()) 
        {
            await foo(initialPath, destPath);
        } 
        else 
        {
            await fp.copyFile(initialPath, destPath);
        }
    }
}
foo(mypath,copyPath);