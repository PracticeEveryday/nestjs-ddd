import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory, Reflector } from '@nestjs/core';
import cookieParser from 'cookie-parser';

import { AppModule } from './app.module';
import { setupSwagger } from './swagger';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    app.enableCors({ origin: true, credentials: true });

    app.useGlobalPipes(
        new ValidationPipe({
            transform: true,
            transformOptions: { enableImplicitConversion: true },
        })
    );

    app.use(cookieParser());

    app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));
    setupSwagger(app);
    const configService = app.get(ConfigService);
    const PORT = configService.get('PORT');

    if (PORT && typeof PORT === 'number') {
        await app.listen(PORT);
        console.log(`Application is running on: ${await app.getUrl()}`);
    }
}

bootstrap();
