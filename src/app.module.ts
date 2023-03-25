import { ClassProvider, Module } from '@nestjs/common';
import { UserModule } from './module/user/user.module';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';
import Joi from 'joi';
import { APP_FILTER } from '@nestjs/core';
import { HttpExceptionFilter } from './libs/exceptions/http-exception.filter';

const filters: ClassProvider[] = [{ provide: APP_FILTER, useClass: HttpExceptionFilter }];

@Module({
    imports: [
        ConfigModule.forRoot({
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
        }),
        UserModule,
        DatabaseModule,
    ],
    controllers: [],
    providers: [...filters],
})
export class AppModule {}
