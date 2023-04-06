import { Module } from '@nestjs/common';
import { GraduateMarksService } from './graduate-marks.service';
import { GraduateMarksController } from './graduate-marks.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { GraduateMarks } from './graduate-marks.model';
import { DegreeWorksModule } from '../degree-works/degree-works.module';

@Module({
  controllers: [GraduateMarksController],
  providers: [GraduateMarksService],
  imports: [SequelizeModule.forFeature([GraduateMarks]), DegreeWorksModule],
})
export class GraduateMarksModule {}
