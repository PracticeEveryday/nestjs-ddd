import path from 'path';

import { Injectable, Module } from '@nestjs/common';
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
    public fileUploads(files: Express.Multer.File[]): FileType[] {
        const result: FileType[] = [];
        files.forEach((file) => {
            const res: FileType = {
                originalname: uuidv4() + path.extname(file.originalname),
                filename: file.filename,
            };

            result.push(res);
        });
        return result;
    }
}

@Module({
    providers: [FileUtil],
    exports: [FileUtil],
})
export class FileModule {}
