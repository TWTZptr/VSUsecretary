import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { EmployeesService } from 'src/employees/employees.service';
import { UNEXIST_STUDENT_ID_MSG } from 'src/students/constants';
import { StudentsService } from 'src/students/students.service';
import {
  UNEXIST_DEGREE_WORK_ID_MSG,
  UNEXIST_SUPERVISOR_ID_MSG,
} from './constants';
import { DegreeWork } from './degree-work.model';
import { CreateDegreeWorkDto } from './dto/create-degree-work.dto';
import { UpdateDegreeWorkDto } from './dto/update-degree-work.dto';
import { Student } from '../students/students.model';

@Injectable()
export class DegreeWorksService {
  constructor(
    @InjectModel(DegreeWork) private degreeWorkRepository: typeof DegreeWork,
    private studentsService: StudentsService,
    private employeesService: EmployeesService,
  ) {}

  getDegreeWorkById(id: number) {
    return this.degreeWorkRepository.findByPk(id);
  }

  async checkForeignKeys(dto: CreateDegreeWorkDto | UpdateDegreeWorkDto) {
    if (
      dto.studentId &&
      !(await this.studentsService.isStudentExists(dto.studentId))
    ) {
      throw new BadRequestException(UNEXIST_STUDENT_ID_MSG);
    }

    if (
      dto.supervisorId &&
      !(await this.employeesService.isEmployeeExists(dto.supervisorId))
    ) {
      throw new BadRequestException(UNEXIST_SUPERVISOR_ID_MSG);
    }
  }

  async createDegreeWork(dto: CreateDegreeWorkDto) {
    await this.checkForeignKeys(dto);

    return this.degreeWorkRepository.create(dto);
  }

  async updateDegreeWork(dto: UpdateDegreeWorkDto) {
    await this.checkForeignKeys(dto);

    const [affectedCount] = await this.degreeWorkRepository.update(dto, {
      where: { id: dto.id },
    });

    if (!affectedCount) {
      throw new NotFoundException(UNEXIST_DEGREE_WORK_ID_MSG);
    }

    return this.getDegreeWorkById(dto.id);
  }

  async deleteDegreeWork(id: number) {
    const affectedCount = await this.degreeWorkRepository.destroy({
      where: { id },
    });
    if (!affectedCount) {
      throw new NotFoundException(UNEXIST_DEGREE_WORK_ID_MSG);
    }
  }

  async findDegreeWorkById(id: number) {
    const degreeWork = await this.getDegreeWorkById(id);
    if (!degreeWork) {
      throw new NotFoundException(UNEXIST_DEGREE_WORK_ID_MSG);
    }
    return degreeWork;
  }

  getAllDegreeWorks(year?: number) {
    return this.degreeWorkRepository.findAll({
      order: ['theme'],
      where: {
        '$student.year$': year,
      },
      include: [
        {
          model: Student,
          as: 'student',
        },
      ],
    });
  }

  getAllDegreeWorksByGraduateScriptId(graduateScriptId: number) {
    return this.degreeWorkRepository.findAll({
      order: ['$student.lastname$', '$student.name$'],
      include: [
        {
          model: Student,
          as: 'student',
        },
      ],
      where: {
        '$student.graduateScriptId$': graduateScriptId,
      },
    });
  }
}
