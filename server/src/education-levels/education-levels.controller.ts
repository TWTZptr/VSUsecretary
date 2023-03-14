import { Controller, Get, UseGuards } from '@nestjs/common';
import { EducationLevelsService } from './education-levels.service';
import { RoleGuard } from '../auth/guards/role-guard';
import { RequireRoles } from '../auth/decorators/role-auth.decorator';
import { SECRETARY } from '../users/constants';

@Controller('education-levels')
@UseGuards(RoleGuard)
@RequireRoles()
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
