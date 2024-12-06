import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UploadFileService } from './upload-file.service';

@Controller('upload-file')
@ApiTags('Uploads')
export class UploadFileController {
  constructor(private uploadFileService: UploadFileService) {}
}
