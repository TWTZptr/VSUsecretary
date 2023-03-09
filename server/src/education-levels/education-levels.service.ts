import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { EducationLevel } from './education-levels.model';

@Injectable()
export class EducationLevelsService {
  constructor(
    @InjectModel(EducationLevel)
    private educationLevelRepository: typeof EducationLevel,
  ) {}

  getAllEducationLevels() {
    return this.educationLevelRepository.findAll();
  }
}
