import { Controller, MaxFileSizeValidator, ParseFilePipe, Post, UploadedFiles } from '@nestjs/common';
import { ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

import { AnyFileArray } from './libs/decorators/any-file.decorators';
import { FileUtil } from './libs/utils/file.utils';

@Controller()
@ApiTags('Root API')
export class AppController {
    constructor(private readonly fileUtil: FileUtil) {}

    @Post('/uploads')
    @ApiOperation({
        summary: '파일 여러개 업로드 API',
        description: '파일을 아무 개수나 올려도 됩니다.',
    })
    @ApiCreatedResponse({
        description: '파일 여러개 업로드 성공',
    })
    @AnyFileArray()
    public async postMms(
        @UploadedFiles(
            new ParseFilePipe({
                validators: [new MaxFileSizeValidator({ maxSize: 100 * 1024 * 1024 })],
                fileIsRequired: false,
            })
        )
        files: Express.Multer.File[]
    ) {
        return this.fileUtil.fileUploads(files);
    }
}
