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
     
        if( count ===  initials.length) {
         console.log('cvbcvbcvbc-b') ;   
            writeStream.write(data); 
        }
         else
         {
            count++;
         }
       
        /*
        console.log(newData+"\n");
        console.log("\n"initial.name+"\n")
        */
        });
        
       
    }
  
})()