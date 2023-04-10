import path from 'path';

import { Module } from '@nestjs/common';
import { WinstonModule, utilities as nestWinstonModuleUtilities } from 'nest-winston';
import winston from 'winston';
import DailyRotateFile from 'winston-daily-rotate-file';

const dailyOptions = (level: string) => {
    return {
        level,
        datePattern: 'YYYY-MM-DD',
        dirname: path.join(process.cwd(), `./logs/${level}`),
        filename: `%DATE%.${level}.log`,
        maxFiles: 30, //30일치 로그파일 저장,
        maxSize: '10mb',
        zippedArchive: true, // 로그가 쌓이면 압축하여 관리
        format: winston.format.combine(
            winston.format.timestamp({ format: 'YYYY-MM-DD hh:mm:ss' }),
            winston.format.printf((info) => `[${info['timestamp']}] ${info.level}: ${info.message}`)
        ),
    };
};

const winstonOptions = {
    transports: [
        new winston.transports.Console({
            level: process.env['NODE_ENV'] === 'production' ? 'http' : 'silly',
            format: winston.format.combine(
                winston.format.timestamp(), // timestamp를 찍을거고
                winston.format.ms(), // ms 단위로 찍을거야

                nestWinstonModuleUtilities.format.nestLike('PracticeApp', {
                    colors: true,
                    prettyPrint: true,
                })
            ),
        }),
        new DailyRotateFile(dailyOptions('info')),
        new DailyRotateFile(dailyOptions('error')),
        new DailyRotateFile(dailyOptions('warn')),
    ],
};

@Module({
    imports: [WinstonModule.forRoot(winstonOptions)],
    exports: [WinstonModule],
})
export class CustomWinstonModule {}
