import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { Employee } from './employees.model';
import {
  EMPLOYEE_USED_IN_GRADUATE_SCRIPT_MSG,
  UNEXIST_EMPLOYEE_ID_MSG,
} from './constants';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { GraduateScript } from '../graduate-scripts/graduate-scripts.model';
import { FindOptions } from 'sequelize';
import { EmployeeGraduateScript } from '../employees-graduate-scripts/employees-graduate-scripts.model';
import { EmployeesGraduateScriptsService } from '../employees-graduate-scripts/employees-graduate-scripts.service';

@Injectable()
export class EmployeesService {
  constructor(
    @InjectModel(Employee) private employeeRepository: typeof Employee,
    private readonly employeeGraduateScriptService: EmployeesGraduateScriptsService,
  ) {}

  createEmployee(dto: CreateEmployeeDto) {
    return this.employeeRepository.create(dto);
  }

  async findEmployeeById(id: number, options: FindOptions<Employee> = {}) {
    const employee = await this.getEmployeeById(id, options);
    if (!employee) {
      throw new NotFoundException(UNEXIST_EMPLOYEE_ID_MSG);
    }

    return employee;
  }

  async getEmployeeById(id: number, options: FindOptions<Employee> = {}) {
    return this.employeeRepository.findByPk(id, options);
  }

  async updateEmployee(dto: UpdateEmployeeDto) {
    const [affectedCount] = await this.employeeRepository.update(dto, {
      where: { id: dto.id },
    });

    if (!affectedCount) {
      throw new NotFoundException(UNEXIST_EMPLOYEE_ID_MSG);
    }
    return this.getEmployeeById(dto.id);
  }

  async tryToDeleteEmployeeById(id: number) {
    const employeesGraduateScripts =
      await this.employeeGraduateScriptService.getEmployeeGraduateScriptByOptions(
        { where: { employeeId: id } },
      );

    if (employeesGraduateScripts) {
      throw new BadRequestException(EMPLOYEE_USED_IN_GRADUATE_SCRIPT_MSG);
    }

    await this.deleteEmployeeById(id);
  }

  async deleteEmployeeById(id: number) {
    const affectedCount = await this.employeeRepository.destroy({
      where: { id },
    });
    if (!affectedCount) {
      throw new NotFoundException(UNEXIST_EMPLOYEE_ID_MSG);
    }
  }

  async addGraduateScriptToEmployee(
    employee: Employee,
    graduateScript: GraduateScript,
  ) {
    await employee.$add('graduateScripts', graduateScript);
    return this.getEmployeeById(employee.id);
  }

  async removeEmployeeGraduateScript(
    employee: Employee,
    graduateScript: GraduateScript,
  ) {
    const employeeGraduateScripts = await employee.$get(
      'employeeGraduateScripts',
      { where: { graduateScriptId: graduateScript.id } },
    );

    await Promise.all(employeeGraduateScripts.map((egs) => egs.destroy()));

    return this.getEmployeeById(employee.id);
  }

  async isEmployeeExists(id: number) {
    return id && (await this.getEmployeeById(id));
  }

  async getEmployeeGraduateScripts(employeeId: number) {
    const employee = await this.findEmployeeById(employeeId);
    const employeeGraduateScripts = await employee.$get(
      'employeeGraduateScripts',
    );
    return Promise.all(
      employeeGraduateScripts.map((egs) => egs.$get('graduateScript')),
    );
  }

  async getAllEmployees() {
    const employees = this.employeeRepository.findAll({
      order: ['lastname'],
    });
    return employees;
  }

  findEmployeeByIdWithGraduateScriptInfo(
    employeeId: number,
    graduateScriptId: number,
  ) {
    return this.employeeRepository.findOne({
      where: {
        '$graduateScripts.graduateScriptId$': graduateScriptId,
        id: employeeId,
      },
      include: [
        {
          model: EmployeeGraduateScript,
          as: 'graduateScripts',
        },
      ],
    });
  }
}
