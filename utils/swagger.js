
const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'iltezam API',
    description: 'API for managing organizations and sending OTP',
  },
  host: 'localhost:3000',
  schemes: ['http'],
};

const outputFile = './swagger-output.json';
const endpointsFiles = ['./app.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);



 