import { Controller } from '@nestjs/common';
import { NamesService } from './names.service';

@Controller('api/v1/names')
export class NamesController {
  constructor(private namesService: NamesService) {}
}
