import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { EmployeesService } from 'src/employees/employees.service';
import { UNEXIST_STUDENT_ID_MSG } from 'src/students/constants';
import { StudentsService } from 'src/students/students.service';
import { UNEXIST_TAKEDAY_ID_MSG } from 'src/take-days/constants';
import { TakeDaysService } from 'src/take-days/take-days.service';
import {
  UNEXIST_DEGREE_WORK_ID_MSG,
  UNEXIST_REWIEVER_ID_MSG,
  UNEXIST_SUPERVISOR_ID_MSG,
} from './constants';
import { DegreeWork } from './degree-work.model';
import { CreateDegreeWorkDto } from './dto/create-degree-work.dto';
import { UpdateDegreeWorkDto } from './dto/update-degree-work.dto';

@Injectable()
export class DegreeWorksService {
  constructor(
    @InjectModel(DegreeWork) private degreeWorkRepository: typeof DegreeWork,
    private studentsService: StudentsService,
    private employeesService: EmployeesService,
    private takeDaysService: TakeDaysService,
  ) {}

  async getDegreeWorkById(id: number) {
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

    if (
      dto.reviewerId &&
      !(await this.employeesService.isEmployeeExists(dto.reviewerId))
    ) {
      throw new BadRequestException(UNEXIST_REWIEVER_ID_MSG);
    }

    if (
      dto.takeDayId &&
      !(await this.takeDaysService.isTakeDayExists(dto.takeDayId))
    ) {
      throw new BadRequestException(UNEXIST_TAKEDAY_ID_MSG);
    }
  }

  async createDegreeWork(dto: CreateDegreeWorkDto) {
    await this.checkForeignKeys(dto);

    const degreeWork = await this.degreeWorkRepository.create(dto);
    return degreeWork;
  }

  async updateDegreeWork(dto: UpdateDegreeWorkDto) {
    await this.checkForeignKeys(dto);

    const [affectedCount] = await this.degreeWorkRepository.update(dto, {
      where: { id: dto.id },
    });

    if (!affectedCount) {
      throw new NotFoundException(UNEXIST_DEGREE_WORK_ID_MSG);
    }

    const degreeWork = this.getDegreeWorkById(dto.id);
    return degreeWork;
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

  async getAllDegreeWorks() {
    const degreeWorks = await this.degreeWorkRepository.findAll({
      order: ['theme'],
    });
    return degreeWorks;
  }
}
