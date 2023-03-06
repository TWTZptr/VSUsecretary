import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { StudentsService } from './students.service';

@Controller('students')
export class StudentsController {
  constructor(private readonly studentsService: StudentsService) {}

  @Post()
  createStudent(@Body() studentDto: CreateStudentDto) {
    return this.studentsService.createStudent(studentDto);
  }

  @Patch()
  updateStudent(@Body() studentDto: UpdateStudentDto) {
    return this.studentsService.updateStudent(studentDto);
  }

  @Get(':id')
  getStudentById(@Param('id') id: number) {
    return this.studentsService.findStudentById(id);
  }

  @Delete(':id')
  deleteStudentById(@Param('id', ParseIntPipe) id: number) {
    return this.studentsService.deleteStudentById(id);
  }

  @Get()
  getAllStudents() {
    return this.studentsService.getAllStudents();
  }
}
