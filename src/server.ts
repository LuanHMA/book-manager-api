import 'dotenv/config';
import Fastify from 'fastify';
import { ZodTypeProvider } from 'fastify-type-provider-zod';
import { booksRoutes } from './routes/books-routes.js';
import { globalErrorHandler } from './errors/globalErrorHandler.js';

const app = Fastify().withTypeProvider<ZodTypeProvider>();

app.setErrorHandler(globalErrorHandler);

app.register(booksRoutes, { prefix: "/api/books" })

app.listen({ port: 3000 }).then(() => {
  console.log('Server running at http://localhost:3000');
});
