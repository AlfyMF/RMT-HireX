import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { Express } from 'express';

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'HireX API Documentation',
      version: '1.0.0',
      description: 'API documentation for HireX Recruiter Portal - Job Requisition Management System',
      contact: {
        name: 'API Support',
        email: 'support@hirex.com',
      },
    },
    servers: [
      {
        url: 'http://localhost:3001',
        description: 'Development server',
      },
    ],
    tags: [
      {
        name: 'Job Requisitions',
        description: 'Job requisition management endpoints',
      },
      {
        name: 'Master Data',
        description: 'Master data endpoints for dropdowns and reference data',
      },
    ],
  },
  apis: ['./src/routes/*.ts', './dist/routes/*.js'],
};

const swaggerSpec = swaggerJsdoc(options);

export function setupSwagger(app: Express) {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, {
    customCss: '.swagger-ui .topbar { display: none }',
    customSiteTitle: 'HireX API Documentation',
  }));

  app.get('/api-docs.json', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerSpec);
  });

  console.log('📚 Swagger documentation available at http://localhost:3001/api-docs');
}
