import { UseInterceptors, applyDecorators } from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiConsumes } from '@nestjs/swagger';

export function ApiFileArray() {
    return applyDecorators(
        UseInterceptors(
            FileFieldsInterceptor([
                { name: 'file1', maxCount: 1 },
                { name: 'file2', maxCount: 1 },
                { name: 'file3', maxCount: 1 },
            ])
        ),
        ApiConsumes('multipart/form-data'),
        ApiBody({
            schema: {
                type: 'object',
                properties: {
                    file1: {
                        type: 'string',
                        format: 'binary',
                    },
                    file2: {
                        type: 'string',
                        format: 'binary',
                    },
                    file3: {
                        type: 'string',
                        format: 'binary',
                    },
                },
                // required: ['file1', 'file2', 'file3'],
            },
        })
    );
}
