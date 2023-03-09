import { Module } from '@nestjs/common';
import { EducationLevelsService } from './education-levels.service';
import { EducationLevelsController } from './education-levels.controller';
import { SeederModule } from 'nestjs-sequelize-seeder';
import { EducationLevelsSeed } from './education-levels.seed';
import { SequelizeModule } from '@nestjs/sequelize';
import { EducationLevel } from './education-levels.model';
import { AuthModule } from '../auth/auth.module';

@Module({
  controllers: [EducationLevelsController],
  providers: [EducationLevelsService],
  imports: [
    SequelizeModule.forFeature([EducationLevel]),
    SeederModule.forFeature([EducationLevelsSeed]),
    AuthModule,
  ],
})
export class EducationLevelsModule {}
