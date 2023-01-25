const crypto = require('crypto');
const fs = require('fs');

// const password = require("./password.txt");

export default function readFile(path, callback = ([]) => {}){
    console.group("importer/decryptor (Nathan)");
    
    
    const fileName = path;
    const algorithm = 'aes-192-cbc';
    const password = 'dave';

    const key = crypto.scryptSync(password, 'salt', 24);
    const iv = Buffer.alloc(16, 0);
    const inFile = fs.createReadStream(fileName);
    const decrypt = crypto.createDecipheriv(algorithm, key, iv);

    console.log("starting decryption.");
    const decrypter = inFile.pipe(decrypt);


    let data = "";
    decrypter.on("data", (chunk) => {
        data += chunk;
    });

    let output;
    decrypter.once("end", () => {
        console.log("done decrypting.");
        
        try {
            console.log("attempting JSON.parse");
            output = JSON.parse(data);
        } catch (error) {
            console.error("JSON.parse failed");
            console.groupEnd("importer/decryptor (Nathan)");
            throw error;
        }
        console.groupEnd("importer/decryptor (Nathan)");
        callback(output);
    })

    // callback(object);
}

if(false && "usage:"){   
    readFile(process.argv[2], (data) => {
        console.log("done");
        console.log(data);
    });
}

