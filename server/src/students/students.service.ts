import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateStudentDto } from './dto/create-student.dto';
import { UNEXIST_STUDENT_ID_MSG, USED_STUDENT_MSG } from './constants';
import { Student } from './students.model';
import { UpdateStudentDto } from './dto/update-student.dto';
import { FindOptions } from 'sequelize';
import { DegreeWork } from '../degree-works/degree-work.model';

@Injectable()
export class StudentsService {
  constructor(
    @InjectModel(Student) private studentRepository: typeof Student,
  ) {}

  async createStudent(dto: CreateStudentDto) {
    return this.studentRepository.create(dto);
  }

  getStudentById(id: number, attributes = null) {
    return this.studentRepository.findByPk(id, { attributes });
  }

  async updateStudent(dto: UpdateStudentDto) {
    const [affectedCount] = await this.studentRepository.update(dto, {
      where: { id: dto.id },
    });

    if (!affectedCount) {
      throw new NotFoundException(UNEXIST_STUDENT_ID_MSG);
    }

    return this.studentRepository.findByPk(dto.id, {
      include: { model: DegreeWork, include: ['mark'] },
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

  async getStudentsByOptions(options: FindOptions<Student>) {
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

  getStudentsByGraduateScriptId(graduateScriptId: number) {
    return this.studentRepository.findAll({
      where: { graduateScriptId },
      include: { model: DegreeWork, include: ['mark'] },
    });
  }

  async tryDeleteStudent(studentId: number) {
    const student = await this.studentRepository.findByPk(studentId);
    if (student.graduateScriptId) {
      throw new BadRequestException(USED_STUDENT_MSG);
    }

    const degreeWork = await student.$get('degreeWork');
    if (degreeWork) {
      await degreeWork.destroy();
    }

    return student.destroy();
  }
}
