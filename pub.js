// impòrt libraries
const mqtt = require('mqtt');
const { SerialPort } = require('serialport')
const { ReadlineParser } = require('@serialport/parser-readline')

const port = new SerialPort({
    path: 'COM3',
    baudRate: 9600
});

// Parser config
const parser = port.pipe(new ReadlineParser({ delimiter: '\n' }))

// Publishead config
const pub = mqtt.connect("mqtt://localhost:9000");

pub.on('connect', () => {
    parser.on('data', (data) => {
        pub.publish('topic test', data)
    })

});