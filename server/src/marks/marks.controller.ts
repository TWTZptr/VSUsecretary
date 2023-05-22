import { Controller, Get } from '@nestjs/common';
import { MarksService } from './marks.service';

@Controller('marks')
export class MarksController {
  constructor(private readonly marksService: MarksService) {}

  @Get()
  getAllMarks() {
    return this.marksService.getAllMarks();
  }
}
