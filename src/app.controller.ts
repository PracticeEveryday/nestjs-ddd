import { BadRequestException, Controller, MaxFileSizeValidator, ParseFilePipe, Post, UploadedFile, UploadedFiles } from '@nestjs/common';
import { ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { string } from 'joi';

import { ApiFileArray } from './libs/decorators/api-any-files.decorator';
import { ApiFile } from './libs/decorators/api-file.decorator';
import { FileUtil } from './libs/module/file/file.module';

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
                fileIsRequired: true,
            })
        )
        file: Express.Multer.File
    ) {
        if (!file) throw new BadRequestException('파일이 존재하지 않습니다.');

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
    ) {
        return this.fileUtil.uploadAnyFileList(files);
    }
}
