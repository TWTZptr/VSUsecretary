import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { StudentsService } from './students.service';
import { RoleGuard } from '../auth/guards/role-guard';
import { RequireRoles } from '../auth/decorators/role-auth.decorator';

@Controller('students')
@UseGuards(RoleGuard)
@RequireRoles()
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

  @Get('no-graduate-script')
  getStudentsWithNoGraduateScript(@Query('year', ParseIntPipe) year: number) {
    return this.studentsService.getAllStudentsWithNoGraduateScript(year);
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
  getAllStudents(@Query('year', ParseIntPipe) year: number) {
    return this.studentsService.getAllStudents(year);
  }
}
