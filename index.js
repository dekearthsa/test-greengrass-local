const awsIot = require('aws-iot-device-sdk');

// docker run --name greengrass_service --restart unless-stopped --add-host='host.docker.internal:host-gateway' -v /home/pi/greengrass_certs:/usr/src/certs --network net -d 058264531773.dkr.ecr.ap-southeast-1.amazonaws.com/test-greengrass:latest
const device = awsIot.device({
    // keyPath: '/usr/src/certs/ef364047d9ab3d6090063fd44c2d23b914b92a20a3c04a3efe2306f059fcf57d-private.pem.key',
    // certPath: '/usr/src/certs/ef364047d9ab3d6090063fd44c2d23b914b92a20a3c04a3efe2306f059fcf57d-certificate.pem.crt',
    // caPath: '/usr/src/certs/AmazonRootCA_bundle.pem',
    keyPath: '/usr/src/certs/server.key',
    certPath: '/usr/src/certs/server.crt',
    caPath: '/usr/src/certs/ca.crt',
    clientId: 'service_wb',
    // host: "a1gixuw644r5m7-ats.iot.ap-southeast-1.amazonaws.com",
    // host: '192.168.1.42',
    host: 'host.docker.internal',
    port: 8883,
    protocol: 'mqtts',
    debug: true,
    keepalive: 300,
    reconnectPeriod: 1000,
    fastDisconnectDetection: true,
    resubscribe: false,
    requestCert: true,
    rejectUnauthorized: true
});

device.on('connect', () => {
    console.log('Service_gre connected to Greengrass Core');
    device.subscribe('topic/greengrass/pubsub');
});

device.on('message', (topic, payload) => {
    console.log('Received message from topic:', topic);
    console.log('Payload:', payload.toString());
});

device.on('error', (error) => {
    console.error('Error:', error);
});