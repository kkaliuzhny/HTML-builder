const fs = require("fs");
const fp = require("fs/promises");
const path = require('path');
const mypath = path.join(__dirname, "secret-folder");
const getFileSize = (mypath, cb) => {
    fs.stat(mypath, (err, stats) => {
        if (err) {
           
            console.log(err)
            return
        }

        cb(stats.size)
    })
}
(async function foo()
{
    const lotdata = await fp.readdir(mypath, {withFileTypes:true});
    for (const data of lotdata)
    {
        if(data.isFile())
        {
            getFileSize(mypath+"/"+data.name, (fileSize) => {
                console.log((data.name).replace(path.extname(data.name.toString()),"") + " - "+ (path.extname(data.name.toString()).replace(".",""))+" - "+fileSize*0.001+"kb");
            })  
        }
        
    }
})()