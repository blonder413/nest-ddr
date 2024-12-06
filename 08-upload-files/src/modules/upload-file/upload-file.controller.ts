import {
  Body,
  Controller,
  Get,
  Post,
  Response,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UploadFileService } from './upload-file.service';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('api/v1/uploads')
@ApiTags('Uploads')
export class UploadFileController {
  constructor(private uploadFileService: UploadFileService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    return this.uploadFileService.uploadFile(file);
  }

  @Get('download')
  downloadFile(@Response() res, @Body() body: any) {
    return this.uploadFileService.download(res, body.filename);
  }
}
