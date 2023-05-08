const path = require('path');
const fp = require("fs/promises");
const  fs = require('fs');
const myPath = path.join(__dirname, 'template.html');
const  htmlDirectory= path.join(__dirname, 'components');



fs.mkdir(path.join(__dirname,"project-dist"), { recursive: true }, err => {
});

const helperPath=path.join(__dirname,"project-dist","index.html");
const writeStream = fs.createWriteStream(helperPath);

(async function foo()
{
     let data = await fp.readFile(myPath, 'utf8' );
    const initials = await fp.readdir(htmlDirectory, {withFileTypes:true});
    let count =1;
    for (const  initial of initials)
    {   
       
        const newPathToHtml=path.join(htmlDirectory,initial.name);
        fs.readFile(newPathToHtml, "utf8", 
        function(error,context){
        data  = data.replace(`{{${initial.name.split('.')[0]}}}`, context) ;
     
        if( count ===  initials.length) 
        {
            writeStream.write(data); 
        }
         else
         {
            count++;
         }
       
        });
        
       
    }
  
})()


const stylePath=path.join(__dirname,"project-dist","style.css");
const writeStyleStream = fs.createWriteStream(stylePath);
const mypath = path.join(__dirname,"styles");
(async function foo2()
{
    const lotdata = await fp.readdir(mypath, {withFileTypes:true});
    for (const data of lotdata)
    {
        if(data.isFile())
        {
            if((path.extname(data.name.toString()).replace(".",""))=="css")
            {
                const newpath = path.join(mypath,data.name);
                
                const origin = fs.createReadStream(newpath, {flags: 'r'});
                origin.on("data", data=> writeStyleStream.write(data+"\n")    );
              
            }
        }
    
    }
    
})()

const  copyOldPath = path.join(__dirname,"assets");
const copyNewPath=path.join(__dirname,"project-dist","assets");

async function foo3(src,dest) {
    const entries = await fp.readdir(src, {withFileTypes: true});
    await fp.mkdir(dest,{ recursive: true });
    for(let entry of entries) {
        const srcPath = path.join(src, entry.name);
        const destPath = path.join(dest, entry.name);
        if(entry.isDirectory()) {
            await foo3(srcPath, destPath);
        } else {
            await fp.copyFile(srcPath, destPath);
        }
    }
}
foo3(copyOldPath,copyNewPath);




