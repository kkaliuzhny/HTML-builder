const process= require("process");
const fs = require('node:fs');
const path = require('path');
const fileToWrite=path.join(__dirname, 'couttext.txt');
const writeStream = fs.createWriteStream(fileToWrite);

function bye()
{
    console.log("Goodbye, user");
    process.exit();
}

process.stdout.write("Hello, user\n");
process.on('SIGINT', bye);

process.stdin.on("data", data=>
{

    if(data.toString().trim()=="exit")
    {
        bye();
       
    }
    else
    {
        writeStream.write(data);
    }
    
 
});

    