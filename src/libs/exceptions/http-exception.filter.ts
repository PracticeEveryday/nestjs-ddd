import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus } from '@nestjs/common';
import colors from 'colors';
import { Request, Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
    catch(exception: HttpException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest<Request>();
        let statusCode = exception.getStatus();
        let error: any;

        if (exception instanceof HttpException) {
            statusCode = exception.getStatus();
            error = exception.getResponse();
        } else {
            console.error(colors.red(`exception: ${exception}`));
            statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
            error = 'Internal server error';
        }

        const errorResponse = {
            timestamp: new Date(),
            path: request.url,
            method: request.method,
            error: error || null,
        };
        console.error(colors.red(`exception: ${exception}`));
        console.log(errorResponse);

        response.status(statusCode).json(errorResponse);
    }
}
