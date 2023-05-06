const fs = require('node:fs');
const path = require('path');
const coolPath = path.join(__dirname, 'text.txt');
const rr = fs.createReadStream(coolPath,"utf-8");
rr.on("data", data=>console.log(data));