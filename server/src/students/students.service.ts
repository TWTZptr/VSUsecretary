import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateStudentDto } from './dto/create-student.dto';
import { UNEXIST_DIRECTION_ID_MSG, UNEXIST_STUDENT_ID_MSG } from './constants';
import { Student } from './students.model';
import { UpdateStudentDto } from './dto/update-student.dto';
import { DirectionsService } from '../directions/directions.service';
import { FindOptions, Op } from 'sequelize';

@Injectable()
export class StudentsService {
  constructor(
    @InjectModel(Student) private studentRepository: typeof Student,
    private readonly directionsService: DirectionsService,
  ) {}

  async createStudent(dto: CreateStudentDto) {
    if (
      dto.directionId !== undefined &&
      (await this.directionsService.isDirectionExists(dto.directionId))
    ) {
      throw new BadRequestException(UNEXIST_DIRECTION_ID_MSG);
    }
    return this.studentRepository.create(dto);
  }

  getStudentById(id: number, attributes = null) {
    return this.studentRepository.findByPk(id, { attributes });
  }

  async updateStudent(dto: UpdateStudentDto) {
    if (
      dto.directionId &&
      (await this.directionsService.isDirectionExists(dto.directionId))
    ) {
      throw new BadRequestException(UNEXIST_DIRECTION_ID_MSG);
    }

    const [affectedCount] = await this.studentRepository.update(dto, {
      where: { id: dto.id },
    });

    if (!affectedCount) {
      throw new NotFoundException(UNEXIST_STUDENT_ID_MSG);
    }

    return this.studentRepository.findByPk(dto.id, {
      include: ['degreeWork'],
    });
  }

  async deleteStudentById(id: number) {
    const affectedCount = await this.studentRepository.destroy({
      where: { id },
    });
    if (!affectedCount) {
      throw new NotFoundException(UNEXIST_STUDENT_ID_MSG);
    }
  }

  async findStudentById(id: number) {
    const student = await this.studentRepository.findByPk(id, {
      include: ['degreeWork'],
    });
    if (!student) {
      throw new NotFoundException(UNEXIST_STUDENT_ID_MSG);
    }
    return student;
  }

  async isStudentExists(id: number) {
    return id && (await this.getStudentById(id));
  }

  async getAllStudents(year?: number) {
    const options: FindOptions<Student> = {
      order: ['index'],
      include: ['degreeWork'],
    };
    if (year) {
      options.where = { year };
    }
    return this.studentRepository.findAll(options);
  }

  getAllStudentsWithNoGraduateScript(year?: number) {
    const options: FindOptions<Student> = {
      order: ['index'],
      include: ['degreeWork'],
      where: {
        graduateScriptId: null,
        year,
      },
    };

    return this.studentRepository.findAll(options);
  }
}
