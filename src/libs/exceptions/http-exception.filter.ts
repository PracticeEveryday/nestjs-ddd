import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus, Inject } from '@nestjs/common';
import colors from 'colors';
import { Request, Response } from 'express';
import { WINSTON_MODULE_PROVIDER, WinstonLogger } from 'nest-winston';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
    constructor(@Inject(WINSTON_MODULE_PROVIDER) private readonly logger: WinstonLogger) {}

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
            this.logger.log('error', `exception: ${exception}`);
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
        this.logger.log('error', `exception: ${exception}`);
        console.log(errorResponse);
        this.logger.log('error', `Error.stack: ${exception.stack}`);

        response.status(statusCode).json(errorResponse);
    }
}
