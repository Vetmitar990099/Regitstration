const crypto = require('crypto');
const fs = require('fs');

// const password = require("./password.txt");

function readFile(path, callback = () => {}){
    const fileName = path;
    const algorithm = 'aes-192-cbc';
    const password = 'dave';

    const key = crypto.scryptSync(password, 'salt', 24);
    const iv = Buffer.alloc(16, 0);
    const inFile = fs.createReadStream(fileName);
    const decrypt = crypto.createDecipheriv(algorithm, key, iv);

    console.log(inFile.pipe(decrypt).toString());

}

readFile(process.argv[2]);

