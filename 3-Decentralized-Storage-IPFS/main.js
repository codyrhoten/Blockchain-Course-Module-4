const ipfsAPI = require('ipfs-http-client');
const ipfs =  new ipfsAPI('localhost', '5001', { protocol: 'http' });
// Add a file
const file = 'My awesome file!';
ipfs.add(Buffer.from(file), (err, fileInfo) => {
    if (err) console.log(err);
    console.log('Hash: ' + fileInfo[0].hash);
    // Get a file
    ipfs.cat(fileInfo[0].hash, (err, data) => {
        if (err) console.log(err);
        console.log('File Content: ' + data.toString());
    });
});