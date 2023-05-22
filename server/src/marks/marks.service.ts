import { Injectable } from '@nestjs/common';
import { Mark } from './marks.model';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class MarksService {
  constructor(
    @InjectModel(Mark) private readonly marksRepository: typeof Mark,
  ) {}

  getAllMarks() {
    return this.marksRepository.findAll();
  }
}
