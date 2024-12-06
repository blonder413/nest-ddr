import {
  Body,
  Controller,
  Get,
  Post,
  Response,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UploadFileService } from './upload-file.service';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('api/v1/uploads')
@ApiTags('Uploads')
export class UploadFileController {
  constructor(private uploadFileService: UploadFileService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  @ApiOperation({ description: 'Sube un archivo' })
  @ApiResponse({ status: 201, description: 'Se ha subido correctamente' })
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    return this.uploadFileService.uploadFile(file);
  }

  @Get('download')
  @ApiOperation({ description: 'Descarga un archivo' })
  @ApiResponse({ status: 200, description: 'Se ha descargado correctamente' })
  @ApiResponse({ status: 409, description: 'No existe el archivo' })
  downloadFile(@Response() res, @Body() body: any) {
    return this.uploadFileService.download(res, body.filename);
  }
}
