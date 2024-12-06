import fastify, { FastifyInstance } from 'fastify';
import { logger } from '../utils/logger';
import queueRoutes from './routes/queues';

export async function createServer(): Promise<FastifyInstance> {
  const server = fastify({
    logger: false // We'll use our own logger
  });

  // Register routes
  await server.register(queueRoutes);

  // Error handler
  server.setErrorHandler((error, request, reply) => {
    logger.error('File: server.ts ❌, Line: 14, Function: errorHandler;', {
      error,
      path: request.url,
      method: request.method
    });
    reply.status(500).send({ error: 'Internal Server Error' });
  });

  // Not found handler
  server.setNotFoundHandler((request, reply) => {
    logger.warn('File: server.ts ⚠️, Line: 24, Function: notFoundHandler;', {
      path: request.url,
      method: request.method
    });
    reply.status(404).send({ error: 'Route not found' });
  });

  return server;
}

export async function startServer(port: number = 3001): Promise<void> {
  try {
    const server = await createServer();
    
    await server.listen({ port, host: '0.0.0.0' });
    logger.info('File: server.ts 🚀, Line: 39, Function: startServer;', {
      message: `Server listening on port ${port}`
    });
  } catch (error) {
    logger.error('File: server.ts ❌, Line: 43, Function: startServer;', {
      error,
      message: 'Failed to start server'
    });
    process.exit(1);
  }
} 

startServer();