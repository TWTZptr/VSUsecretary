import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { GraduateMarks } from './graduate-marks.model';
import { CreateGraduateMarksDto } from './dto/create-graduate-marks.dto';
import { UpdateGraduateMarksDto } from './dto/update-graduate-marks.dto';
import { DegreeWorksService } from '../degree-works/degree-works.service';
import { INVALID_DEGREE_WORK_ID_MSG } from '../degree-works/constants';
import {
  DEGREE_WORK_ID_IS_NOT_UNIQUE_MSG,
  UNEXIST_GRADUATE_MARKS_ID_MSG,
} from './constants';

@Injectable()
export class GraduateMarksService {
  constructor(
    @InjectModel(GraduateMarks)
    private readonly graduateMarksRepository: typeof GraduateMarks,
    private readonly degreeWorksService: DegreeWorksService,
  ) {}

  getGraduateMarksById(id: number) {
    return this.graduateMarksRepository.findByPk(id);
  }

  async createGraduateMarks(dto: CreateGraduateMarksDto) {
    const existGraduateMarks = await this.getGraduateMarksByDegreeWorkId(
      dto.degreeWorkId,
    );

    if (existGraduateMarks) {
      throw new BadRequestException(DEGREE_WORK_ID_IS_NOT_UNIQUE_MSG);
    }

    return this.graduateMarksRepository.create(dto);
  }

  async updateGraduateMarks(dto: UpdateGraduateMarksDto) {
    if (dto.degreeWorkId) {
      const degreeWork = await this.degreeWorksService.findDegreeWorkById(
        dto.degreeWorkId,
      );

      if (!degreeWork) {
        throw new BadRequestException(INVALID_DEGREE_WORK_ID_MSG);
      }
    }

    const [affectedCount] = await this.graduateMarksRepository.update(dto, {
      where: { id: dto.id },
    });

    if (!affectedCount) {
      throw new BadRequestException(UNEXIST_GRADUATE_MARKS_ID_MSG);
    }

    return this.getGraduateMarksById(dto.id);
  }

  getGraduateMarksByDegreeWorkId(degreeWorkId: number) {
    return this.graduateMarksRepository.findOne({ where: { degreeWorkId } });
  }
}
