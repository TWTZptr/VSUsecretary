import { Controller, Get, UseGuards } from '@nestjs/common';
import { EducationLevelsService } from './education-levels.service';
import { RoleGuard } from '../auth/role-guard';
import { RequireRole } from '../auth/decorators/role-auth.decorator';
import { SECRETARY } from '../users/constants';

@Controller('education-levels')
export class EducationLevelsController {
  constructor(
    private readonly educationLevelsService: EducationLevelsService,
  ) {}

  @UseGuards(RoleGuard)
  @Get('')
  getAllEducationLevels() {
    return this.educationLevelsService.getAllEducationLevels();
  }
}
