import { count } from "console";
import { UpdateBooksRequest } from "../@types/books.js";
import { db } from "../config/database.js";
import { Books } from "../models/books-model.js"

// Repositorio: Camada de comunicação com o banco de dados
export class BooksRepository {
    async findAllBooks({ currentPage = 1 }: { currentPage?: number }) {
        const limit = 10
        const offset = (currentPage - 1) * limit;

        const [books]: any = await db.query(
            "SELECT * FROM books ORDER BY id DESC LIMIT ? OFFSET ?",
            [limit, offset]
        );

        console.log(books)

        const [countRows]: any = await db.execute("SELECT COUNT(*) as count FROM books")

        const total = (countRows as any)[0].count;
        const totalPages = Math.ceil(total / limit);

        return {
            data: books as Books[],
            pagination: {
                limit,
                currentPage,
                totalPages,
                totalBooks: total,
            }
        }
    }

    async findBookById(id: number) {
        const [rows]: any = await db.execute("SELECT * FROM books WHERE id = ?", [id])
        return rows[0] as Books
    }

    async findBookByTitle(title: string) {
        const [rows]: any = await db.execute("SELECT * FROM books WHERE title = ?", [title])
        return rows[0] as Books
    }

    async createBook(book: Omit<Books, "id" | "created_at" | "updated_at">) {
        const pages = book.pages ?? null

        await db.execute(`
            INSERT INTO books (title, author, release_year, genre, pages) VALUES (?, ?, ?, ?, ?)`, [
            book.title,
            book.author,
            book.release_year,
            book.genre,
            pages
        ])
    }

    async updateBook(book: UpdateBooksRequest) {
        const pages = book.pages ?? null

        await db.execute(`
            UPDATE books SET title = ?, author = ?, release_year = ?, genre = ?, pages = ? WHERE id = ?
        `, [
            book.title,
            book.author,
            book.release_year,
            book.genre,
            pages,
            book.id
        ])
    }

    async deleteBook(id: number) {
        await db.execute("DELETE FROM books WHERE id = ?", [id])
    }
}


