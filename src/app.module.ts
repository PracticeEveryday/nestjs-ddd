import { ClassProvider, MiddlewareConsumer, Module } from '@nestjs/common';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HttpExceptionFilter } from './libs/exceptions/http-exception.filter';
import { HttpResponseInterceptor } from './libs/interceptors/http-response.interceptor';
import { LoggerMiddleware } from './libs/middleware/logger.middleware';
import { AuthModule } from './libs/module/auth/auth.module';
import { CustomConfigModule } from './libs/module/config/config.module';
import { DatabaseModule } from './libs/module/database/database.module';
import { FileModule } from './libs/module/file/file.module';
import { CustomWinstonModule } from './libs/module/winston/winston.module';
import { UserModule } from './src/user/user.module';

const filters: ClassProvider[] = [{ provide: APP_FILTER, useClass: HttpExceptionFilter }];
const interceptors: ClassProvider[] = [{ provide: APP_INTERCEPTOR, useClass: HttpResponseInterceptor }];

@Module({
    imports: [CustomConfigModule, DatabaseModule, UserModule, FileModule, CustomWinstonModule, AuthModule],
    controllers: [AppController],
    providers: [...filters, ...interceptors, AppService],
})
export class AppModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(LoggerMiddleware).forRoutes('*');
    }
}
