import path from 'path';

import { BadRequestException, Injectable, Module } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';

type FileType = {
    originalname: string;
    filename: string;
};

@Injectable()
export class FileUtil {
    /**
     * 파일 업로드 함수
     * @param files 파일 Array
     * @returns 파일 이름과 본래 파일 객체
     */
    public fileUploads(files: Express.Multer.File[]): string {
        const result: FileType[] = [];
        files.forEach((file) => {
            const res: FileType = {
                originalname: uuidv4() + path.extname(file.originalname),
                filename: file.filename,
            };

            result.push(res);
        });
        if (files.length === result.length) {
            return 'File Upload Succ';
        } else {
            throw new BadRequestException('File Upload Fail');
        }
    }
}

@Module({
    providers: [FileUtil],
    exports: [FileUtil],
})
export class FileModule {}
