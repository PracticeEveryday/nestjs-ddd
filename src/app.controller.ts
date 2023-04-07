import { Controller, MaxFileSizeValidator, ParseFilePipe, Post, UploadedFile, UploadedFiles } from '@nestjs/common';
import { ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { string } from 'joi';

import { ApiFileArray } from './libs/decorators/api-any-files.decorator';
import { ApiFile } from './libs/decorators/api-file.decorator';
import { FileUtil } from './libs/utils/file.utils';

@Controller()
@ApiTags('Root API')
export class AppController {
    constructor(private readonly fileUtil: FileUtil) {}

    @Post('/upload')
    @ApiOperation({
        summary: '파일 하나 업로드 API',
        description: '파일을 하나 올립니다.',
    })
    @ApiCreatedResponse({
        description: '파일 하나 업로드 성공',
        type: string,
    })
    @ApiFile('file')
    public uploadFile(
        @UploadedFile(
            new ParseFilePipe({
                validators: [new MaxFileSizeValidator({ maxSize: 100 * 1024 * 1024 })],
                fileIsRequired: false,
            })
        )
        file: Express.Multer.File
    ): string {
        return this.fileUtil.uploadFile(file);
    }

    @Post('/uploads')
    @ApiOperation({
        summary: '파일 여러개 업로드 API',
        description: '파일을 아무 개수나 올려도 됩니다.',
    })
    @ApiCreatedResponse({
        description: '파일 여러개 업로드 성공',
        type: string,
    })
    @ApiFileArray()
    public uploadAnyFileList(
        @UploadedFiles(
            new ParseFilePipe({
                validators: [new MaxFileSizeValidator({ maxSize: 100 * 1024 * 1024 })],
                fileIsRequired: false,
            })
        )
        files: Express.Multer.File[]
    ): string {
        return this.fileUtil.uploadAnyFileList(files);
    }
}
