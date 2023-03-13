import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateStudentDto } from './dto/create-student.dto';
import { UNEXIST_GROUP_ID_MSG, UNEXIST_STUDENT_ID_MSG } from './constants';
import { Student } from './students.model';
import { UpdateStudentDto } from './dto/update-student.dto';
import { DirectionsService } from '../directions/directions.service';

@Injectable()
export class StudentsService {
  constructor(
    @InjectModel(Student) private studentRepository: typeof Student,
    private readonly directionsService: DirectionsService,
  ) {}

  async createStudent(dto: CreateStudentDto) {
    //FIXME: dto.groupId ===  0 не пройдет проверку
    if (
      dto.directionId &&
      (await this.directionsService.isDirectionExists(dto.directionId))
    ) {
      throw new BadRequestException(UNEXIST_GROUP_ID_MSG);
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
      throw new BadRequestException(UNEXIST_GROUP_ID_MSG);
    }

    const [affectedCount] = await this.studentRepository.update(dto, {
      where: { id: dto.id },
    });

    if (!affectedCount) {
      throw new NotFoundException(UNEXIST_STUDENT_ID_MSG);
    }

    return this.studentRepository.findByPk(dto.id);
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
    const student = await this.getStudentById(id);
    if (!student) {
      throw new NotFoundException(UNEXIST_STUDENT_ID_MSG);
    }
    return student;
  }

  async isStudentExists(id: number) {
    return id && (await this.getStudentById(id));
  }

  async getAllStudents() {
    const students = this.studentRepository.findAll({
      order: ['lastname'],
    });
    return students;
  }
}
