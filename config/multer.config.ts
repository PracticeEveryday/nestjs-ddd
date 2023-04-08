import fs from 'fs';
import { extname } from 'path';

import { Injectable } from '@nestjs/common';
import { MulterModuleOptions, MulterOptionsFactory } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

@Injectable()
export class MulterConfigService implements MulterOptionsFactory {
    createMulterOptions(): MulterModuleOptions {
        return {
            storage: diskStorage({
                destination: function (_req, _file, cb) {
                    const today = new Date();
                    const year = today.getFullYear();
                    const month = today.getMonth() + 1;

                    const savePath = process.env['ATTACH_SAVE_PATH'] || 'upload';
                    const dest = `${savePath}/${year}-${month.toString().padStart(2, '0')}/`;

                    if (!fs.existsSync(dest)) {
                        fs.mkdirSync(dest, { recursive: true });
                    }
                    cb(null, dest);
                },
                filename: (_req, file, cb) => {
                    // 업로드 후 저장되는 파일명을 랜덤하게 업로드 한다.(동일한 파일명을 업로드 됐을경우 오류방지)
                    const randomName = Array(32)
                        .fill(null)
                        .map(() => Math.round(Math.random() * 16).toString(16))
                        .join('');
                    return cb(null, `${randomName}${extname(file.originalname)}`);
                },
            }),
        };
    }
}
