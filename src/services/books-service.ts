// Services: Camada de lógica de negócio, deve conter validações e regras de negocio, não ter interação com o banco de dados ou com a requisição

import { UpdateBooksRequest } from "../@types/books.js"
import { BadRequestError, ConflictError, NotFoundError } from "../errors/domain-errors.js"
import { Books } from "../models/books-model.js"
import { BooksRepository } from "../repositories/books-repository.js"

const booksRepository = new BooksRepository()

export class BookService {
    async listBooks({ currentPage }: { currentPage?: number }) {
        const books = await booksRepository.findAllBooks({ currentPage })
        return books
    }

    async findUniqueBook({ bookId }: { bookId: number }) {
        const book = await booksRepository.findBookById(bookId)

        if (!book) {
            throw new NotFoundError("Livro não encontrado")
        }

        return book
    }

    async createBook(book: Omit<Books, "id" | "created_at" | "updated_at">) {
        const bookAlreadyExists = await booksRepository.findBookByTitle(book.title)

        if (bookAlreadyExists) {
            throw new ConflictError("O Livro já está cadastrado")
        }

        const currentYear = new Date().getFullYear()

        if (book.release_year > currentYear) {
            throw new BadRequestError("O ano de lançamento não pode ser maior que o ano atual")
        }

        return await booksRepository.createBook(book)
    }

    async updateBook(book: UpdateBooksRequest) {
        const bookExists = await booksRepository.findBookById(book.id)

        if (!bookExists) {
            throw new NotFoundError("Livro não encontrado")
        }

        return await booksRepository.updateBook(book)
    }

    async deleteBook({ bookId }: { bookId: number }) {
        const bookExists = await booksRepository.findBookById(bookId)

        if (!bookExists) {
            throw new NotFoundError("Livro não encontrado")
        }

        return await booksRepository.deleteBook(bookId)
    }
}

