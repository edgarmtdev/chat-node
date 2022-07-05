const fs = require('fs');
const server = require('http').createServer()

// (function readFile() {
//     // readable stream
//     const file = fs.createReadStream('./file.txt') // When a file exists and I want to read it
//     file.pipe(process.stdout) // Consume stream
// })();

// (function writeFile() {
//     const file = fs.createWriteStream('./file.txt')
//     for (let index = 0; index < 100000; index++) {
//         file.write('Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum')
//     }
//     file.end()
// })();

server.on('request', (req, res) => {
    // req: readable
    // res: writable
    
    // fs.readFile('./file.txt', (err, data) => {
    //     if (err) {
    //         console.log(err);
    //     } else {
    //         res.end(data)
    //     }
    // })

    const file = fs.createReadStream('./file.txt')
    file.pipe(res)
})

server.listen(4000)