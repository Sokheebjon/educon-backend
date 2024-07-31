import {
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';

import { FileService } from './file.service';
import { Public } from '@edufin-back/common/decorators';

@ApiTags('File api collection')
@Controller()
export class FileController {
  constructor(private readonly fileService: FileService) {}
  @Post()
  @UseInterceptors(FileInterceptor('file'))
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Upload a file',
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  uploadFile(@UploadedFile() file) {
    if (!file) {
      throw new HttpException('File is required', HttpStatus.BAD_REQUEST);
    }
    return this.fileService.create(file);
  }
  @Get('info/:idOrPath')
  findOneWithInfo(@Param('idOrPath') idOrPath: string) {
    return this.fileService.findOneWithInfo(idOrPath);
  }
  @Public()
  @Get(':idOrPath')
  findOne(@Param('idOrPath') idOrPath: string, @Res() res: Response) {
    return this.fileService.findOne(idOrPath, res);
  }

  @Public()
  delete(@Param('idOrPath') idOrPath: string) {
    return this.fileService.delete(idOrPath);
  }
}
