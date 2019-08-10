

import { Router } from 'express';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const config = require('./../../config/config');

const router = Router();

const options = {
  swaggerDefinition: {
    // Like the one described here: https://swagger.io/specification/#infoObject
    info: {
      title: 'Escrowescrow API',
      version: '1.0.0',
      description: 'Escroescrow REST API',
    },
    securityDefinitions: {
        Bearer: {
            type: 'apiKey',
            name: 'x-access-token',
            in: 'header',
        },
    },
    host: `${config.swagger.baseName}:${config.apiPort}`,
    basePath: '/api',
  },
  // List of files to be processes. You can also set globs './routes/*.js'
  apis: [
    './routes/api/**/*.js',
    './models/*.js',
  ],
};

const specs = swaggerJsdoc(options);

router.get('/swagger.json', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(specs);
});

router.use('/', swaggerUi.serve, swaggerUi.setup(specs));

export default router;
