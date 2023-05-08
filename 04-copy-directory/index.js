const path = require('path');
const  fs = require('fs');
const fp = require("fs/promises");
fs.mkdir(path.join(__dirname,'files-copy'), { recursive: true }, err => {
});

const mypath = path.join(__dirname,"files");
const copyPath=path.join(__dirname,"files-copy");

(async function foo()
{
    const lotdata = await fp.readdir(mypath, {withFileTypes:true});
    for (const data of lotdata)
    {
       
      
        const newpath = path.join(mypath,data.name);
        const newpathCopy= path.join(copyPath,data.name);

        const origin = fs.createReadStream(newpath, {flags: 'r'});
        const destination = fs.createWriteStream(newpathCopy, {flags: 'w+'});    
        origin.pipe(destination);
    }

})()