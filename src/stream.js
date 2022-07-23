const fs = require('fs')

const rs = fs.createReadStream('./files/loren.txt',{encoding:'utf8'});

const ws = fs.createWriteStream('./files/newpipeloren.txt');

// Listen
// rs.on('data', (dataChunk) => {
//     ws.write(dataChunk);
// });

//  Pipe
rs.pipe(ws);