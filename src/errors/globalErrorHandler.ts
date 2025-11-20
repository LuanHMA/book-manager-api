import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { ZodError } from "zod";
import { DomainError } from "./domain-errors.js";

interface ErrorResponse {
    message: string;
    details?: unknown;
}

export function globalErrorHandler(error: Error, request: FastifyRequest, reply: FastifyReply) {
    let statusCode: number;
    let responseBody: ErrorResponse;

    // Erros de Domínio
    if (error instanceof DomainError) {
        statusCode = error.status;
        responseBody = {
            message: error.message,
            details: error.details,
        };
        request.log.warn(`[DOMAIN ERROR] ${error.name}: ${error.message}`);

        // Erros de Validação (ZOD)
    } else if (error instanceof ZodError) {
        statusCode = 400;
        const zodDetails = error.issues.map(issue => ({
            field: issue.path.join('.'),
            message: issue.message,
        }));

        responseBody = {
            message: "Dados de entrada inválidos. Verifique os detalhes.",
            details: zodDetails,
        };

        request.log.info(`[VALIDATION ERROR] Zod: ${JSON.stringify(zodDetails)}`);

        //Outros Erros
    } else {
        statusCode = 500;
        responseBody = {
            message: "Ocorreu um erro interno inesperado no servidor.",
        };
        request.log.error(`[UNEXPECTED ERROR] ${error}`);
    }

    console.log(error)

    return reply.status(statusCode).send({ ...responseBody, success: false });
}