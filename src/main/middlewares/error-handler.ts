// src/main/middlewares/error-handler.ts
import type { NextFunction, Request, Response } from 'express';
import { ZodError } from 'zod';
import { AppError } from '../../domain/error/app-error';
import { env } from '../../infra/zod/env';

function isZodError(err: unknown): err is ZodError {
    return err instanceof ZodError;
}

export function errorHandler(err: unknown, req: Request, res: Response, _next: NextFunction) {
    if (isZodError(err)) {
        const details = err.issues.map((i) => ({
            path: i.path.join('.'),
            message: i.message,
            code: i.code,
        }));

        return res.status(400).json({
            error: {
                message: 'Erro de validação',
                code: 'VALIDATION_ERROR',
                details,
            },
        });
    }

    if (err instanceof AppError) {
        return res.status(err.statusCode).json({
            error: {
                message: err.message,
                code: err.code,
                ...(err.details ? { details: err.details } : {}),
            },
        });
    }

    const isProd = env.NODE_ENV === 'prd';

    if (!isProd) {
        console.error('[UNHANDLED_ERROR]', err);
    } else {
        console.error('[UNHANDLED_ERROR]', (err as any)?.message ?? err);
    }

    return res.status(500).json({
        error: {
            message: 'Erro interno do servidor',
            code: 'INTERNAL_SERVER_ERROR',
        },
    });
}