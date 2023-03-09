import { Controller, Get } from '@nestjs/common';
import { EducationLevelsService } from './education-levels.service';

@Controller('education-levels')
export class EducationLevelsController {
  constructor(
    private readonly educationLevelsService: EducationLevelsService,
  ) {}

  @Get('')
  getAllEducationLevels() {
    return this.educationLevelsService.getAllEducationLevels();
  }
}
