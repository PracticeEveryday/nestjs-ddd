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
     * 개수 재한 없이 파일 업로드 함수
     * @param files 파일
     * @returns 성공 메시지
     */
    public uploadFile(file: Express.Multer.File): string {
        const result: FileType[] = [];
        const 확장자 = file.mimetype.split('/')[1];
        const 파일이름 = file.originalname.split('.')[0];

        const res: FileType = {
            originalname: uuidv4() + path.extname(file.originalname),
            filename: `${file.filename}_${파일이름}.${확장자}`,
        };

        result.push(res);
        return 'File Upload Succ';
    }

    /**
     * 개수 재한 없이 파일 업로드 함수
     * @param files 파일 Array
     * @returns 성공 메시지
     */
    public uploadAnyFileList(files: Express.Multer.File[]): string {
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

    // private generateFileKey(path: string, filename: string, extname: string): string {
    //     return `${path}/${filename}-${uuidv4()}${extname}`;
    // }
}

@Module({
    providers: [FileUtil],
    exports: [FileUtil],
})
export class FileModule {}
