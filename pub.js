// impòrt libraries
const mqtt = require('mqtt');
const { SerialPort } = require('serialport')
const { DelimiterParser } = require('@serialport/parser-delimiter')

const port = new SerialPort({
    path: '/dev/ttyACM0',
    baudRate: 9600
});

// Parser config
const parser = port.pipe(new DelimiterParser({ delimiter: '\n' }))

// Publishead config
const pub = mqtt.connect("mqtt://localhost:9000");

parser.on('data', console.log)

pub.on('connect', () => {
    parser.on('data', (data) => {
        pub.publish('topic test', data)
    })

});