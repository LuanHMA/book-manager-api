export interface UpdateBooksRequest {
    id: number
    title?: string;
    author?: string;
    release_year?: number;
    genre?: string;
    pages?: number;
}