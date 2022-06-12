// impòrt libraries
const mosca = require('mosca');

// server config
const broker = new mosca.Server({
    port: 9000
});

broker.on('ready', ()  => {
    console.log("Server ready")
});

broker.on('clientConnected', (client)  => {
    console.log("New client connected " + client.id)
});

broker.on('published', (packet)  => {
    console.log(packet.payload.toString())
});
