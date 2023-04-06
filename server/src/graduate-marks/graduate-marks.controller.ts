import { Body, Controller, Patch, Post } from '@nestjs/common';
import { GraduateMarksService } from './graduate-marks.service';
import { CreateGraduateMarksDto } from './dto/create-graduate-marks.dto';
import { UpdateGraduateMarksDto } from './dto/update-graduate-marks.dto';

@Controller('graduate-marks')
export class GraduateMarksController {
  constructor(private readonly graduateMarksService: GraduateMarksService) {}

  @Post()
  createGraduateMarks(@Body() graduateMarksDto: CreateGraduateMarksDto) {
    return this.graduateMarksService.createGraduateMarks(graduateMarksDto);
  }

  @Patch()
  updateGraduateMarks(@Body() graduateMarksDto: UpdateGraduateMarksDto) {
    return this.graduateMarksService.updateGraduateMarks(graduateMarksDto);
  }
}
