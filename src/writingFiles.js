// const fs = require('fs');
const fsPromises = require('fs').promises;
const path = require('path');

const fileOps = async () => {
    try {
        const data = await fsPromises.readFile(path.join(__dirname,'files','renametest.txt'),'utf8');
        console.log(data);  
        await fsPromises.unlink(path.join(__dirname,'files','renametest.txt'));
        await fsPromises.appendFile(path.join(__dirname,'files','renametest.txt'),'Hello append');
        await fsPromises.rename(path.join(__dirname,'files','renametest.txt'),path.join(__dirname,'files','renametestnew.txt'));

       const newdata=  await fsPromises.readFile(path.join(__dirname,'files','renametestnew.txt'),'utf8');
       console.log(newdata);
    } catch (err){
        console.error(err);
    }
}

fileOps()

// fs.readFile(path.join(__dirname, 'files', 'starter.txt'), 'utf8', (err, data) => {
//     if (err) throw err;
//     console.log(data.toString());
// })
// fs.writeFile(path.join(__dirname, 'files', 'reply.txt'), 'Nice to meet you', (err) => {
//     if (err) throw err;
//     console.log('Writing Complete');

//     fs.appendFile(path.join(__dirname, 'files', 'test.txt'), 'yes it is', (err) => {
//         if (err) throw err;
//         console.log('Append Complete');
//         fs.rename(path.join(__dirname, 'files', 'reply.txt'), path.join(__dirname, 'files', 'rename.txt'), (err) => {
//             if (err) throw err;
//             console.log('Rename Complete');
//         })
//     }
//     )
// })

// console.log('Heloo');

process.on('uncaughtException', err => {
    console.error(`There was an uncaught error: ${err}`);
    process.exit(1);
})