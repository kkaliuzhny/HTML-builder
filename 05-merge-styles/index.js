const path = require('path');
const mypath = path.join(__dirname,"styles");
const fp = require("fs/promises");
const  fs = require('fs');
const helper = path.join(__dirname,"project-dist");
const newFilePath=path.join(helper,"bundle.css");

const writeStream = fs.createWriteStream(newFilePath);
let matrixStyles=[];



(async function foo()
{
    const lotdata = await fp.readdir(mypath, {withFileTypes:true});
    for (const data of lotdata)
    {
        if(data.isFile())
        {
            if((path.extname(data.name.toString()).replace(".",""))=="css")
            {
                const newpath = path.join(mypath,data.name);
                //console.log(newpath);
                const origin = fs.createReadStream(newpath, {flags: 'r'});
                origin.on("data", data=> writeStream.write(data)    );
              
            }
        }
    
    }
    
  
    



})()
