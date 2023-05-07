const path = require('path');
const  fs = require('fs');
const fp = require("fs/promises");
fs.mkdir(path.join(__dirname,'files-copy'), { recursive: true }, err => {
});

const mypath = path.join(__dirname,"files");

(async function foo()
{
    const lotdata = await fp.readdir(mypath, {withFileTypes:true});
    for (const data of lotdata)
    {
        let a ="files/"+data.name;
        let b ='files-copy/'+data.name;
        const filePath = path.join(__dirname, a);
        const fileCopyPath=path.join(__dirname,b );
        fs.copyFile(filePath, fileCopyPath);
    }

})()