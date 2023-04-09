import path from 'path';

import { ClassProvider, MiddlewareConsumer, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import Joi from 'joi';
import { WinstonModule, utilities as nestWinstonModuleUtilities } from 'nest-winston';
import winston from 'winston';
import DailyRotateFile from 'winston-daily-rotate-file';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HttpExceptionFilter } from './libs/exceptions/http-exception.filter';
import { HttpResponseInterceptor } from './libs/interceptors/http-response.interceptor';
import { LoggerMiddleware } from './libs/middleware/logger.middleware';
import { DatabaseModule } from './libs/module/database/database.module';
import { FileModule } from './libs/module/file/file.module';
import { UserModule } from './src/user/user.module';

const filters: ClassProvider[] = [{ provide: APP_FILTER, useClass: HttpExceptionFilter }];
const interceptors: ClassProvider[] = [{ provide: APP_INTERCEPTOR, useClass: HttpResponseInterceptor }];

const configOption = {
    envFilePath: [`config/.env.${process.env['NODE_ENV'] || 'local'}`],
    isGlobal: true,
    validationSchema: Joi.object({
        NODE_ENV: Joi.string().valid('development', 'production', 'test', 'local').default('prod'),
        PORT: Joi.number().default(8082),
        MONGO_URI: Joi.string(),
        JWT_SECRET: Joi.string(),
        SWAGGER_USER: Joi.string(),
        SWAGGER_PASSWORD: Joi.string(),
        REDIS_HOST: Joi.string(),
        REDIS_PORT: Joi.number(),
    }),
};

@Module({
    imports: [
        ConfigModule.forRoot(configOption),
        DatabaseModule,
        UserModule,
        FileModule,
        WinstonModule.forRoot({
            transports: [
                new winston.transports.Console({
                    format: winston.format.combine(
                        winston.format.timestamp(), // timestamp를 찍을거고
                        winston.format.ms(), // ms 단위로 찍을거야

                        nestWinstonModuleUtilities.format.nestLike('PracticeApp', {
                            colors: true,
                            prettyPrint: true,
                        })
                    ),
                }),
                new DailyRotateFile({
                    level: 'info',
                    maxFiles: 7,
                    maxSize: '10mb',
                    filename: '%DATE%.log',
                    datePattern: 'YYYY-MM-DD',
                    zippedArchive: true,
                    dirname: path.join(process.cwd(), './logs'),
                    format: winston.format.combine(
                        winston.format.timestamp({ format: 'YYYY-MM-DD hh:mm:ss' }),
                        winston.format.printf((info) => `[${info['timestamp']}] ${info.level}: ${info.message}`)
                    ),
                }),
                new DailyRotateFile({
                    level: 'error',
                    maxFiles: 7,
                    maxSize: '10mb',
                    zippedArchive: true,
                    datePattern: 'YYYY-MM-DD',
                    filename: `%DATE%.error.log`,
                    dirname: path.join(process.cwd(), './logs/error'),
                    format: winston.format.combine(
                        winston.format.timestamp({ format: 'YYYY-MM-DD hh:mm:ss' }),
                        winston.format.printf((info) => `[${info['timestamp']}] ${info.level}: ${info.message}`)
                    ),
                }),
            ],
        }),
    ],
    controllers: [AppController],
    providers: [...filters, ...interceptors, AppService],
})
export class AppModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(LoggerMiddleware).forRoutes('*');
    }
}
