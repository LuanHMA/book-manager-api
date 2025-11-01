import { FastifyInstance } from 'fastify';
import { BooksController } from '../controllers/books-controller.js';

const booksController = new BooksController();

export async function booksRoutes(app: FastifyInstance) {
    app.get('/', booksController.listBooks.bind(booksController));
    app.get("/:id", booksController.findUniqueBook.bind(booksController));
    app.post('/', booksController.createBook.bind(booksController));
    app.put('/:id', booksController.updateBook.bind(booksController));
    app.delete('/:id', booksController.deleteBook.bind(booksController));
}