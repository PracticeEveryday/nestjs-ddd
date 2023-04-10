import { BadRequestException, Injectable, Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';

import { MulterConfigProvider } from './multer-config.provider';

type FileType = {
    filename: string;
};

@Injectable()
export class FileUtil {
    /**
     * 개수 재한 없이 파일 업로드 함수
     * @param files 파일
     * @returns 성공 메시지
     */
    public uploadFile(file: Express.Multer.File): FileType {
        const res: FileType = {
            filename: `${file.filename}`,
        };

        return res;
    }

    /**
     * 개수 재한 없이 파일 업로드 함수
     * @param files 파일 Array
     * @returns 성공 메시지
     */
    public uploadAnyFileList(files: Express.Multer.File[]): FileType[] {
        const result: FileType[] = [];
        files
            .filter((file) => file)
            .forEach((file) => {
                const res: FileType = {
                    // originalname: uuidv4() + path.extname(file.originalname),
                    filename: file.filename,
                };

                result.push(res);
            });
        if (files.length === result.length) {
            return result;
        } else {
            throw new BadRequestException('File Upload Fail');
        }
    }
}

@Module({
    imports: [
        MulterModule.registerAsync({
            useClass: MulterConfigProvider,
        }),
    ],
    providers: [FileUtil],
    exports: [FileUtil, MulterModule],
})
export class FileModule {}
