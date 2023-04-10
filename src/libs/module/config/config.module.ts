import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import Joi from 'joi';

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
    imports: [ConfigModule.forRoot(configOption)],
    exports: [ConfigModule],
})
export class CustomConfigModule {}
