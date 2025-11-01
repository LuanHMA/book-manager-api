import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { BookService } from "../services/books-service.js";
import z from "zod";

const bookService = new BookService()

export class BooksController {
    async listBooks(request: FastifyRequest, reply: FastifyReply) {
        const querySchema = z.object({
            page: z.coerce.number().optional(),
        })

        const { page } = querySchema.parse(request.query)

        const books = await bookService.listBooks({ currentPage: page ?? 1 })
        return reply.status(200).send({
            message: "Livros listados com sucesso",
            success: true,
            data: books
        })
    }

    async findUniqueBook(request: FastifyRequest, reply: FastifyReply) {
        const paramsSchema = z.object({
            id: z.coerce.number().min(1, "O campo 'id' é obrigatório"),
        })

        const { id } = paramsSchema.parse(request.params)

        const book = await bookService.findUniqueBook({ bookId: id })
        return reply.status(200).send({ message: "Livro encontrado com sucesso", success: true, data: book })
    }

    async createBook(request: FastifyRequest, reply: FastifyReply) {
        const bodySchema = z.object({
            title: z.string().min(1, "O campo 'title' é obrigatório"),
            author: z.string().min(1, "O campo 'author' é obrigatório"),
            release_year: z.number().min(1, "O campo 'release_year' é obrigatório"),
            genre: z.string().min(1, "O campo 'genre' é obrigatório"),
            pages: z.number().optional()
        })

        const { title, author, release_year, genre, pages } = bodySchema.parse(request.body)

        const book = await bookService.createBook({ title, author, release_year, genre, pages })
        return reply.status(201).send({ message: "Livro criado com sucesso", success: true, data: book })
    }

    async updateBook(request: FastifyRequest, reply: FastifyReply) {
        const paramsSchema = z.object({
            id: z.coerce.number().min(1, "O campo 'id' é obrigatório"),
        })

        const bodySchema = z.object({
            title: z.string(),
            author: z.string(),
            release_year: z.number(),
            genre: z.string(),
            pages: z.number(),
        })

        const { id } = paramsSchema.parse(request.params)
        const body = bodySchema.parse(request.body)

        const book = await bookService.updateBook({ id, ...body })
        return reply.status(200).send({ message: "Livro atualizado com sucesso", success: true, data: book })
    }

    async deleteBook(request: FastifyRequest, reply: FastifyReply) {
        const paramsSchema = z.object({
            id: z.coerce.number().min(1, "O campo 'id' é obrigatório"),
        })

        const { id } = paramsSchema.parse(request.params)

        const book = await bookService.deleteBook({ bookId: id })
        return reply.status(200).send({ message: "Livro deletado com sucesso", success: true, data: book })
    }
}